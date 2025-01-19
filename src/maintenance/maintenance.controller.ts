import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  SetMetadata,
  UseInterceptors,
  UploadedFiles,
  Req
} from '@nestjs/common'
import { MaintenanceService } from './maintenance.service'
import { CreateMaintenanceDto } from './dto/create-maintenance.dto'
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto'
import { ProjectService } from 'src/project/project.service'
import { StaffsService } from 'src/staffs/staffs.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { Response, Request } from 'express'
import { MaintenanceActionsService } from 'src/maintenance_actions/maintenance_actions.service'

@Controller('maintenance')
export class MaintenanceController {
  constructor (
    private readonly maintenanceService: MaintenanceService,
    readonly projectService: ProjectService,
    readonly maintenanceActionsService: MaintenanceActionsService,
    readonly staffsService: StaffsService
  ) {}
  @Post('add2')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './public/images/project',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname)
          callback(null, file.fieldname + '-' + uniqueSuffix)
        }
      })
    })
  )
  async createYc2 (
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body('feedback') feedback: string,
    @Body('weight') weight: number,
    @Body('reason') reason: string,
    @Body('projectName') projectName: string,
    @Body('project') project: number
  ) {
    const token = req.cookies['token']
    if (token) {
      const confirmSuccess = false
      const images = files.map(file => file.filename)
      const image = JSON.stringify(images)
      var today = new Date()
      const payload = await this.staffsService.payload(token)
      if (+project == 0) {
        project = null
        const maintenance = await this.maintenanceService.create2(
          {
            project: null,
            time: today,
            projectName: projectName,
            reason: reason
          },
          confirmSuccess
        )
        await this.maintenanceService.create3({
          weight: weight,
          staff: payload.id,
          status: new Date(),
          maintenance: maintenance,
          feedback: feedback,
          image: image
        })
      } else {
        const Project = await this.projectService.findOne(+project)
        const maintenance = await this.maintenanceService.create2(
          {
            project: Project,
            time: today,
            projectName: null,
            reason: reason
          },
          confirmSuccess
        )
        await this.maintenanceService.create3({
          weight: weight,
          staff: payload.id,
          status: new Date(),
          maintenance: maintenance,
          feedback: feedback,
          image: image
        })
      }

      res.redirect('back')
    } else {
      res.redirect('back')
    }
  }
  @Post('add')
  async createYc (
    @Res() res: Response,
    @Body() createMaintenanceDto: CreateMaintenanceDto
  ) {
    let confirmSuccess = false
    if (createMaintenanceDto.confirmSuccess == true) {
      confirmSuccess = true
    }
    console.log(confirmSuccess)
    if (+createMaintenanceDto.project === 0) {
      createMaintenanceDto.project = null
      await this.maintenanceService.create2(
        {
          project: null,
          ...createMaintenanceDto
        },
        confirmSuccess
      )
    } else {
      await this.maintenanceService.create2(
        createMaintenanceDto,
        confirmSuccess
      )
    }
    return res.redirect('back')
  }
  @Delete('confirmEr')
  async confirmEr (@Res() res: Response, @Body('id') id: string) {
    const numericId = parseInt(id, 10)
    await this.maintenanceActionsService.ConfirmDelete(+numericId)
    await this.maintenanceService.ConfirmDelete(+numericId)
    return res.status(200).json({ success: true, message: 'Success' })
  }
  @Patch('confirm')
  async confirm (@Res() res: Response, @Body('id') id: string) {
    const numericId = parseInt(id, 10)
    await this.maintenanceService.updateConfirmSuccess(+numericId)
    await this.maintenanceActionsService.updateConfirmSuccess(+numericId)
    return res.status(200).json({ success: true, message: 'Success' })
  }
  @Post()
  async create (
    @Res() res: Response,
    @Body() createMaintenanceDto: CreateMaintenanceDto
  ) {
    await this.maintenanceService.create(createMaintenanceDto)
    return res.redirect('back')
  }
  @Get()
  @Render('admin/maintenance/maintenance')
  async findAll (@Req() req: Request) {
    const token = req.cookies['token']
    const payload = await this.staffsService.payload(token)
    const inforAccount = await this.staffsService.findOne(payload.id)
    let maintenanceWProjects = null
    let projects = null
    if (inforAccount.role_admin || (inforAccount.department.id == 1 && inforAccount.position.id == 1)) {
      maintenanceWProjects = await this.maintenanceService.findAll()
       projects = await this.projectService.findAll()
    } else {
      maintenanceWProjects = await this.maintenanceService.findAllByBusiness(
        inforAccount.id
      )
       projects = await this.projectService.findAllByBusines(
        inforAccount.id
      )
    }
    const staffs = await this.staffsService.findAll()
    return { maintenanceWProjects, activeMenu: 'maintenance', staffs, projects }
  }
  @Get('project/:idProject')
  @Render('admin/maintenance/maintenance_w_project')
  async findAllWProject (@Param('idProject') idProject: string) {
    const maintenanceWProjects = await this.maintenanceService.findAllWProject(
      +idProject
    )
    const staffs = await this.staffsService.findAll()
    const project = await this.projectService.findOne(+idProject)
    return { staffs, project, maintenanceWProjects, activeMenu: 'maintenance' }
  }
  @Post('project/:idProject')
  @Render('admin/maintenance/maintenance_w_project')
  async addMaintenance (
    @Param('idProject') idProject: string,
    @Res() res: Response,
    @Body() body: any
  ) {
    const Project = await this.projectService.findOne(+idProject)
    const { timeMaintenance, reason } = body
    for (let i = 0; i < timeMaintenance.length; i++) {
      await this.maintenanceService.create({
        project: Project,
        time: timeMaintenance[i],
        reason: reason[i]
      })
    }
    return res.redirect('back')
  }
}
