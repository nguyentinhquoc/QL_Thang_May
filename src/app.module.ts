import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DepartmensModule } from './departmens/departmens.module'
import { StaffsModule } from './staffs/staffs.module'
import { Staff } from './staffs/entities/staff.entity'
import { Department } from './departmens/entities/departmen.entity'
import { PositionsModule } from './positions/positions.module'
import { Position } from './positions/entities/position.entity'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { MailerModule } from '@nestjs-modules/mailer'
import { SendMailService } from './send-mail/send-mail.service'
import { WorkflowsModule } from './workflows/workflows.module'
import { Workflow } from './workflows/entities/workflow.entity'
import { StepsModule } from './steps/steps.module'
import { Step } from './steps/entities/step.entity'
import { WorkflowStepsModule } from './workflow_steps/workflow_steps.module'
import { WorkflowStep } from './workflow_steps/entities/workflow_step.entity'
import { ProjectModule } from './project/project.module'
import { Project } from './project/entities/project.entity'
import { ProjectStepsModule } from './project_steps/project_steps.module'
import { ProjectStep } from './project_steps/entities/project_step.entity'
import { GlobalVariablesMiddleware } from './GlobalVariablesMiddleware'
import { AuthGuard2 } from './guards/auth/auth.guard'
import { ClientModule } from './client/client.module'
import { ProjectEdit } from './project_edit/entities/project_edit.entity'
import { ProjectEditModule } from './project_edit/project_edit.module'
import { NotificationModule } from './notification/notification.module'
import { Notification } from './notification/entities/notification.entity'
import { Maintenance } from './maintenance/entities/maintenance.entity'
import { MaintenanceModule } from './maintenance/maintenance.module'
import { MaintenanceActionsModule } from './maintenance_actions/maintenance_actions.module'
import { MaintenanceAction } from './maintenance_actions/entities/maintenance_action.entity'
import { ProjectStaffModule } from './project_staff/project_staff.module'
import { ProjectStaff } from './project_staff/entities/project_staff.entity'
import { CustomerModule } from './customer/customer.module'
import { Customer } from './customer/entities/customer.entity'
import { DepartmentsStepsModule } from './departments_steps/departments_steps.module'
import { DepartmentsStep } from './departments_steps/entities/departments_step.entity'
import { TargetBusinesModule } from './target_busines/target_busines.module'
import { TargetBusine } from './target_busines/entities/target_busine.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Staff,
          Department,
          Position,
          Workflow,
          Step,
          WorkflowStep,
          Project,
          ProjectStep,
          ProjectEdit,
          Notification,
          Maintenance,
          MaintenanceAction,
          ProjectStaff,
          Customer,
          DepartmentsStep,
          TargetBusine,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('MAIL_HOST'),
            port: configService.get<number>('MAIL_PORT'),
            secure: false,
            auth: {
              user: configService.get<string>('MAIL_USER'),
              pass: configService.get<string>('MAIL_PASS'),
            },
          },
        }
      },
      inject: [ConfigService],
    }),
    DepartmensModule,
    StaffsModule,
    PositionsModule,
    WorkflowsModule,
    StepsModule,
    WorkflowStepsModule,
    ProjectModule,
    ProjectStepsModule,
    ClientModule,
    ProjectEditModule,
    MaintenanceModule,
    MaintenanceActionsModule,
    NotificationModule,
    ProjectStaffModule,
    CustomerModule,
    DepartmentsStepsModule,
    TargetBusinesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard2,
    },
    SendMailService,
  ],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*')
    consumer.apply(cookieParser()).forRoutes('*')
    consumer
      .apply(GlobalVariablesMiddleware)
      .exclude({ path: 'login', method: RequestMethod.ALL })
      .forRoutes('*')
  }
}
