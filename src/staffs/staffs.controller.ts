import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UploadedFile,
  UseInterceptors,
  Res,
  SetMetadata,
  Req,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { StaffsService } from './staffs.service'
import { CreateStaffDto } from './dto/create-staff.dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { PositionsService } from 'src/positions/positions.service'
import { DepartmensService } from 'src/departmens/departmens.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { SendMailService } from 'src/send-mail/send-mail.service'
import { MailerService } from '@nestjs-modules/mailer'
import { ProjectStepsService } from 'src/project_steps/project_steps.service'
import * as bcrypt from 'bcrypt'
import { ProjectStaffService } from 'src/project_staff/project_staff.service'
@Controller('staffs')
export class StaffsController {
  constructor (
    private readonly staffsService: StaffsService,
    private readonly positionsService: PositionsService,
    private readonly departmensService: DepartmensService,
    private readonly sendMailService: SendMailService,
    private mailerService: MailerService,
    private projectStepsService: ProjectStepsService,
  ) {}


  @Get('busines')
  @Render('admin/staff/busines')
  async findBusinesList () {
    const staffsBusiness = await this.staffsService.findAllBusines()
    return { staffsBusiness }
  }
  @Get('/detailAccount')
  @Render('admin/staff/detail')
  async detailAccount (@Req() req: Request) {
    const token = req.cookies['token']
    if (token) {
      const payload = await this.staffsService.payload(token)
      const Staff = await this.staffsService.findOne(payload.id)
      return {
        Staff,
        activeMenu: 'staff',
      }
    }
  }
  @Get('/add')
  @SetMetadata('role_admin', true)
  @Render('admin/staff/add')
  async renderAdd () {
    const positions = await this.positionsService.findAll()
    const departmens = await this.departmensService.findAll()
    return {
      positions,
      departmens,
      activeMenu: 'staff',
    }
  }
  @Post('/add')
  @SetMetadata('role_admin', true)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images/avatar',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname)
          callback(null, file.fieldname + '-' + uniqueSuffix)
        },
      }),
    }),
  )
  async postAdd (
    @UploadedFile() file: Express.Multer.File,
    @Body() createStaffDto: CreateStaffDto,
    @Res() res: Response,
  ) {
    if (file) {
      createStaffDto.avatar = file.filename
    }
    const kyTu =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?'
    let matKhau = ''
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * kyTu.length)
      matKhau += kyTu[randomIndex]
    }
    await this.staffsService.create(createStaffDto, matKhau)
    const contentSendMail = await this.sendMailService.notificationCreateStaff(
      matKhau,
      createStaffDto.full_name,
      createStaffDto.email,
      'Thông báo tạo tài khoản !!!',
      '<p>Chúng tôi muốn thông báo rằng email của bạn vừa được đang ký tài khoản tại <strong>Thang Máy Tesla</strong>.</p>',
    )
    this.mailerService
      .sendMail(contentSendMail)
      .then(() => {})
      .catch(error => {
        return { message: 'Gửi mail thất bại!', error: error.message }
      })
    return res.redirect('/staffs')
  }
  @Get('changePass')
  @Render('admin/staff/changePass')
  async changePass () {
    return {}
  }
  @Patch('changePass')
  async changePassPatch (
    @Res() res: Response,
    @Req() req: Request,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
    @Body('confirmPassword') confirmPassword: string,
  ) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.render('admin/staff/changePass', {
        message: 'Vui lòng nhập đầy đủ thông tin!',
        status: 'error',
      })
    }
    if (currentPassword === newPassword) {
      return res.render('admin/staff/changePass', {
        message: 'Mật khẩu mới không được trùng với mật khẩu hiện tại!',
        status: 'error',
      })
    }
    const token = req.cookies['token']
    if (token) {
      const payload = await this.staffsService.payload(token)
      const Staff = await this.staffsService.findOne(payload.id)
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        Staff.password,
      )
      if (isPasswordValid) {
        if (newPassword === confirmPassword) {
          await this.staffsService.update(payload.id, {
            password: newPassword,
          })
          res.render('login', {
            message: 'Đổi mật khẩu thành công vui lòng đang nhập lại !',
            status: 'success',
          })
          return res.clearCookie('token')
        } else {
          return res.render('admin/staff/changePass', {
            message: 'Mật khẩu mới và mật khẩu xác nhận không khớp!',
            status: 'error',
          })
        }
      } else {
        return res.render('admin/staff/changePass', {
          message: 'Mật khẩu cũ không chính xác !',
          status: 'error',
        })
      }
    }
    return {}
  }
  @Get('payroll')
  @SetMetadata('role_admin', true)
  @Render('admin/staff/payroll')
  async findAllPayroll () {
    const staffs = await this.staffsService.findAllPayroll()
    return {
      staffs,
      activeMenu: 'staff',
    }
  }
  @Get()
  @SetMetadata('role_admin', true)
  @Render('admin/staff/staff')
  async findAll () {
    const staffs = await this.staffsService.findAll()
    return {
      staffs,
      activeMenu: 'staff',
    }
  }
  @Get(':id')
  @SetMetadata('role_admin', true)
  findOne (@Param('id') id: string) {
    return this.staffsService.findOne(+id)
  }
  @Get('/payroll/:id')
  @Render('admin/staff/payroll_detail')
  @SetMetadata('role_admin', true)
  async findPayrollDetail (@Param('id') id: string) {
    const infoStaffs = await this.staffsService.findPayrollWStaff(+id)
    const staff = await this.staffsService.findOne(+id)
    return {
      staff,
      infoStaffs,
      activeMenu: 'staff',
    }
  }
  @Patch(':id')
  @SetMetadata('role_admin', true)
  update (@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto)
  }
  @Patch('changeStatus/:id')
  @SetMetadata('role_admin', true)
  async changeStatus (@Param('id') id: string) {
    return await this.staffsService.changeStatus(+id)
  }
  @Delete()
  @SetMetadata('role_admin', true)
  remove (@Body('id') id: string) {
    return this.staffsService.remove(+id)
  }
}
