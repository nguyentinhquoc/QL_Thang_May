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
} from '@nestjs/common'
import { DepartmensService } from './departmens.service'
import { CreateDepartmenDto } from './dto/create-departmen.dto'
import { UpdateDepartmenDto } from './dto/update-departmen.dto'
import { Response } from 'express'
@Controller('departmens')
export class DepartmensController {
  constructor (private readonly departmensService: DepartmensService) {}
  @Post()
  @SetMetadata('role_admin', true)
  async create (
    @Body() createDepartmenDto: CreateDepartmenDto,
    @Res() res: Response,
  ) {
    const createDepartmens = await this.departmensService.create(
      createDepartmenDto,
    )
    if (createDepartmens) {
      const departmens = await this.departmensService.findAll()
      return res.render('admin/departmens/departmens', {
        departmens,
        message: 'Thêm phòng ban thành công!',
        status: 'success',
      })
    } else {
      const departmens = await this.departmensService.findAll()
      return res.render('admin/departmens/departmens', {
        departmens,
        message: 'Thêm phòng ban thất bại!',
        status: 'error',
      })
    }
  }
  @Get()
  @SetMetadata('role_admin', true)
  @Render('admin/departmens/departmens')
  async findAll () {
    const departmens = await this.departmensService.findAll()
    return {
      departmens,
      activeMenu: 'staff',
    }
  }
  @Patch()
  @SetMetadata('role_admin', true)
  async update (
    @Body('id') id: string,
    @Body() updateDepartmenDto: UpdateDepartmenDto,
    @Res() res: Response,
  ) {
    await this.departmensService.update(+id, updateDepartmenDto)
    return res.redirect('/departmens')
  }
  @Delete()
  @SetMetadata('role_admin', true)
  remove (@Body('id') id: string) {
    return this.departmensService.remove(+id)
  }
}
