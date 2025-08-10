import {Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common'
import {Response, Request} from 'express'
import {TargetBusinesService} from './target_busines.service'
import {CreateTargetBusineDto} from './dto/create-target_busine.dto'
import {UpdateTargetBusineDto} from './dto/update-target_busine.dto'
import {StaffsService} from 'src/staffs/staffs.service'
import * as request from 'supertest'

@Controller('target-busines')
export class TargetBusinesController {
  constructor (
    private readonly targetBusinesService: TargetBusinesService,
    private readonly staffsService: StaffsService,
  ) {}

  @Post()
  async create (@Res() res: Response, @Body() createTargetBusineDto: CreateTargetBusineDto) {
    const staffId = createTargetBusineDto.staff
    const staff = await this.staffsService.findOne(+staffId)
    createTargetBusineDto.staff = staff
    await this.targetBusinesService.create(createTargetBusineDto)
    return res.redirect('back')
  }
}
