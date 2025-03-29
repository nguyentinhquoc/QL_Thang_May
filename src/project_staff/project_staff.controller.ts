import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common'
import { ProjectStaffService } from './project_staff.service'
import { CreateProjectStaffDto } from './dto/create-project_staff.dto'
import { UpdateProjectStaffDto } from './dto/update-project_staff.dto'
import { TargetBusinesService } from 'src/target_busines/target_busines.service'
@Controller('project-staff')
export class ProjectStaffController {
  constructor (
    private readonly projectStaffService: ProjectStaffService,
    private readonly targetBusinesService: TargetBusinesService
  ) {}
  @Post()
  create (@Body() createProjectStaffDto: CreateProjectStaffDto) {
    return this.projectStaffService.create(createProjectStaffDto)
  }

  @Get('busines/:idStaff')
  @Render('admin/staff/busines_detail')
  async findBusinesDeatil (@Param('idStaff') id: string) {
    const dealineBusines =  await this.targetBusinesService.findAllWStaff(+id)

    console.log(dealineBusines)
    const staffsBusines =
      await this.projectStaffService.findProjectStaffByMonth(+id)
    return { staffsBusines: staffsBusines.monthlyDetails, dealineBusines, staffId:id}
  }
  @Get()
  @Render('admin/staff/business')
  async findAllList () {
    const staffsBusiness = await this.projectStaffService.findAllList()
    return { staffsBusiness }
  }
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.projectStaffService.findOne(+id)
  }
  @Patch(':id')
  update (
    @Param('id') id: string,
    @Body() updateProjectStaffDto: UpdateProjectStaffDto,
  ) {
    return this.projectStaffService.update(+id, updateProjectStaffDto)
  }
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.projectStaffService.remove(+id)
  }
}
