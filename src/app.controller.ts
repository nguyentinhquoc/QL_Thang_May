import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  SetMetadata
} from '@nestjs/common'
import { AppService } from './app.service'
import { LoginDto } from './staffs/dto/create-staff-logindto'
import { StaffsService } from './staffs/staffs.service'
import { Response, Request } from 'express'
import { MailerService } from '@nestjs-modules/mailer'
import { SendMailService } from './send-mail/send-mail.service'
import { ProjectEditService } from './project_edit/project_edit.service'
import { MaintenanceService } from './maintenance/maintenance.service'
import { ProjectStaffService } from './project_staff/project_staff.service'
import { ProjectService } from './project/project.service'
@Controller()
export class AppController {
  constructor (
    private staffsService: StaffsService,
    private projectEditService: ProjectEditService,
    private maintenanceService: MaintenanceService,
    private projectService: ProjectService
  ) {}
  // @Get('sendmail')
  // @SetMetadata('isPublic', true)
  // sendMail () {
  //   const contentSendMail = this.sendMailService.forgotPassword(
  //     'Nguyễn Tình',
  //     'nguyentinh201004@gmail.com',
  //     '123456',
  //   )
  //   this.mailerService
  //     .sendMail(contentSendMail)
  //     .then(() => {
  //       console.log('Email sent successfully')
  //     })
  //     .catch(error => {
  //       console.error('Error sending email:', error)
  //       return { message: 'Gửi mail thất bại!', error: error.message }
  //     })
  // }
  @Get()
  @SetMetadata('role_admin', true)
  @Render('admin/index')
  async renderIndexadmin () {
    const projectEdits = await this.projectEditService.findAll()
    const maintenanceComing =
      await this.maintenanceService.findAllMaintenanceComing()
    const maintenanceYc = await this.maintenanceService.maintenanceYc()
    const maintenanceYcHt = await this.maintenanceService.maintenanceYcHt()
    const countProject = await this.projectService.countProjectByMonth()

    console.log('🔱  WaveBear  ------------------------------------------------------------------------------------🔱  WaveBear ')
    console.log('🔱  WaveBear  ~ AppController ~ renderIndexadmin ~ countProject⚡ ⚡ ⚡  :', countProject)
    console.log('🔱  WaveBear  ------------------------------------------------------------------------------------🔱  WaveBear ')

    return {
      projectEdits,
      activeMenu: 'home',
      maintenanceComing,
      maintenanceYc,
      maintenanceYcHt,
      countProject
    }
  }
  @Get('/login')
  @SetMetadata('isPublic', true)
  @Render('login')
  loginRender () {
    return {}
  }
  @Get('/logout')
  @SetMetadata('isPublic', true)
  @Render('login')
  logout (@Res() res: Response) {
    res.clearCookie('token')
    return { message: 'Đăng xuất thành công!', status: 'success' }
  }

  @Post('login')
  @SetMetadata('isPublic', true)
  async login (
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const token = await this.staffsService.login(loginDto)
    if (!token) {
      res.render('login', {
        message: 'Email hoặc mật khẩu không hợp lệ!',
        status: 'error'
      })
    } else {
      res.cookie('token', token)
      const payload = await this.staffsService.payload(token)
      if (payload.role_admin) {
        res.redirect('/')
      } else {
        res.redirect('/client/list-task')
      }
    }
  }
}
