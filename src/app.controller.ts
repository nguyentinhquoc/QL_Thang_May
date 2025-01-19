import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  SetMetadata,
  UseGuards
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
import { BusinessGuard } from './guards/auth/busines.guard'
import { WorkflowStepsService } from './workflow_steps/workflow_steps.service'
@Controller()
export class AppController {
  constructor (
    private staffsService: StaffsService,
    private projectEditService: ProjectEditService,
    private maintenanceService: MaintenanceService,
    private projectService: ProjectService,
    private workflowStepsService: WorkflowStepsService
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
  @Get('quy-trinh-lam-viec')
  @Render('client/quytrinhmau')
  async quytrinhmau() {
    const allWorkflowSteps = await this.workflowStepsService.findAll()
    const workflowSteps = allWorkflowSteps.reduce((acc, workflowStep) => {
      const workflow = workflowStep.workflow
      const id = workflow.id
      if (!acc[id]) {
        acc[id] = {
          name: workflow.name,
          steps: []
        }
      }
      acc[id].steps.push(workflowStep)
      return acc
    }, {})

    console.log('🔱  WaveBear  ---------------------------------------------------------------------------------🔱  WaveBear ')
    console.log('🔱  WaveBear  ~ AppController ~ quytrinhmau ~ workflowSteps⚡ ⚡ ⚡  :', workflowSteps)
    console.log('🔱  WaveBear  ---------------------------------------------------------------------------------🔱  WaveBear ')
    return { workflowSteps }

  }

  @Get()
  @UseGuards(BusinessGuard)
  @Render('admin/index')
  async renderIndexadmin (@Req() req: Request) {
    const token = req.cookies['token']
    const payload = await this.staffsService.payload(token)
    const inforAccount = await this.staffsService.findOne(payload.id)
    let projectEdits = null
    let maintenanceComing = null
    let maintenanceYc = null
    let maintenanceYcHt = null
    let countProject = null
    if (
      inforAccount.role_admin ||
      (inforAccount.department.id == 1 && inforAccount.position.id == 1)
    ) {
      projectEdits = await this.projectEditService.findAll()
      maintenanceComing =
        await this.maintenanceService.findAllMaintenanceComing()
      maintenanceYc = await this.maintenanceService.maintenanceYc()
      maintenanceYcHt = await this.maintenanceService.maintenanceYcHt()
      countProject = await this.projectService.countProjectByMonth()
    } else {
      projectEdits = await this.projectEditService.findProjectEditByBusines(
        +inforAccount.id
      )
      maintenanceComing =
        await this.maintenanceService.findAllMaintenanceComingByBusines(
          +inforAccount.id
        )
      maintenanceYc = await this.maintenanceService.maintenanceYcByBusines(
        +inforAccount.id
      )
      maintenanceYcHt = await this.maintenanceService.maintenanceYcHtByBusines(
        +inforAccount.id
      )
      countProject = await this.projectService.countProjectByMonthByBusines(
        +inforAccount.id
      )
    }
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
