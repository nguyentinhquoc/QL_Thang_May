import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common'
import { MaintenanceActionsService } from './maintenance_actions.service'
import { CreateMaintenanceActionDto } from './dto/create-maintenance_action.dto'
import { UpdateMaintenanceActionDto } from './dto/update-maintenance_action.dto'
import { MaintenanceService } from 'src/maintenance/maintenance.service'
import { StaffsService } from 'src/staffs/staffs.service'
import { Response, Request } from 'express'
import { NotificationService } from 'src/notification/notification.service'
import { Project } from 'src/project/entities/project.entity'
import { ProjectService } from 'src/project/project.service'
import { SendMailService } from 'src/send-mail/send-mail.service'
import { MailerService } from '@nestjs-modules/mailer'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
@Controller('maintenance-actions')
export class MaintenanceActionsController {
  constructor (
    private readonly maintenanceActionsService: MaintenanceActionsService,
    readonly maintenanceService: MaintenanceService,
    readonly staffsService: StaffsService,
    readonly notificationService: NotificationService,
    readonly projectService: ProjectService,
    readonly sendMailService: SendMailService,
    readonly mailerService: MailerService,
  ) {}
  @Post(':id')
  async create (
    @Param('id') id: string,
    @Body() createMaintenanceActionDto: CreateMaintenanceActionDto,
    @Res() res: Response,
  ) {
    if (+id == 0) {
      await this.maintenanceActionsService.create(createMaintenanceActionDto)
      const Maintenance = await this.maintenanceService.findOne(
        +createMaintenanceActionDto.maintenance,
      )
      const Staff = await this.staffsService.findOne(
        +createMaintenanceActionDto.staff,
      )
      await this.notificationService.create({
        title: 'Thông báo về nhiệm vụ mới của bạn !!!',
        message: `Bảo trì tại công trình :${Maintenance.projectName}`,
        staff: Staff,
        project: null,
      })
      const contentSendMail = await this.sendMailService.notificationNewJob(
        Staff.full_name,
        Staff.email,
        'Thông báo nhiệm vụ mới !!!',
        `Chúng tôi xin thông báo về nhiệm vụ mới của bạn tại <strong>Thang máy Tesla </strong> <br> <div class="password">Bạn cần bảo trì tại công trình :${Maintenance.projectName}</div> `,
      )
      this.mailerService
        .sendMail(contentSendMail)
        .then(() => {})
        .catch(error => {
          console.error('Error sending email:', error)
          return { message: 'Gửi mail thất bại!', error: error.message }
        })
    } else {
      await this.maintenanceActionsService.create(createMaintenanceActionDto)
      const Project = await this.projectService.findOne(+id)
      const Staff = await this.staffsService.findOne(
        +createMaintenanceActionDto.staff,
      )
      await this.notificationService.create({
        title: 'Thông báo về nhiệm vụ mới của bạn !!!',
        message: `Bảo trì tại công trình :${Project.full_name}`,
        staff: Staff,
        project: Project,
      })
      const contentSendMail = await this.sendMailService.notificationNewJob(
        Staff.full_name,
        Staff.email,
        'Thông báo nhiệm vụ mới !!!',
        `Chúng tôi xin thông báo về nhiệm vụ mới của bạn tại <strong>Thang máy Tesla </strong> <br> <div class="password">Bạn cần bảo trì tại công trình :${Project.full_name}</div> `,
      )
      this.mailerService
        .sendMail(contentSendMail)
        .then(() => {})
        .catch(error => {
          console.error('Error sending email:', error)
          return { message: 'Gửi mail thất bại!', error: error.message }
        })
    }
    return res.redirect('back')
  }
  @Post('/confirmSuccessMaintenace/:id')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './public/images/project',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname)
          callback(null, file.fieldname + '-' + uniqueSuffix)
        },
      }),
    }),
  )
  async SuccessJob (
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body('feedback') feedback: string,
  ) {
    const token = req.cookies['token']
    if (token) {
      const images = files.map(file => file.filename)
      const image = JSON.stringify(images)
      this.maintenanceActionsService.update(+id, {
        status: new Date(),
        feedback,
        image,
      })
      res.redirect('back')
    } else {
      res.redirect('back')
    }
  }
  @Get()
  findAll () {
    return this.maintenanceActionsService.findAll()
  }
  @Patch(':id')
  update (
    @Param('id') id: string,
    @Body() updateMaintenanceActionDto: UpdateMaintenanceActionDto,
  ) {
    return this.maintenanceActionsService.update(
      +id,
      updateMaintenanceActionDto,
    )
  }
}
