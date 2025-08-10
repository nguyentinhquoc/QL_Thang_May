import {Injectable, Logger} from '@nestjs/common'
import {Cron} from '@nestjs/schedule'
import {StaffsService} from './staffs/staffs.service'
import {SendMailService} from './send-mail/send-mail.service'
import {MaintenanceService} from './maintenance/maintenance.service'
import {MailerService} from '@nestjs-modules/mailer'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)
  constructor (
    private readonly sendMailService: SendMailService,
    private readonly mailerService: MailerService,
    private readonly staffsService: StaffsService,
    private readonly maintenanceService: MaintenanceService,
  ) {}
  @Cron('0 5 * * *')
  async thongBaoBaoTri () {
    const staffId = await this.staffsService.findNhanTBBaoTri()
    const maintenance = await this.maintenanceService.findByNotifycation()
    maintenance.forEach(async (maintenance) => {
      staffId.forEach(async (staff) => {
        console.log(
          'GỬI TỚI : ',
          staff.full_name,
          staff.email,
          maintenance.time.toString(),
          maintenance.project.full_name,
        )
        const contentSendMail = await this.sendMailService.notificationThongBaoBaoTriGanNhat(
          staff.full_name,
          staff.email,
          maintenance.time.toString(),
          maintenance.project.full_name,
        )
        this.mailerService
          .sendMail(contentSendMail)
          .then(() => {})
          .catch((error) => {
            console.error('Error sending email:', error)
            return {message: 'Gửi mail thất bại!', error: error.message}
          })
      })
    })
  }
}
