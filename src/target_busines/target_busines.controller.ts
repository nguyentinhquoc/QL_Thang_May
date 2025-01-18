import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TargetBusinesService } from './target_busines.service';
import { CreateTargetBusineDto } from './dto/create-target_busine.dto';
import { UpdateTargetBusineDto } from './dto/update-target_busine.dto';

@Controller('target-busines')
export class TargetBusinesController {
  constructor(private readonly targetBusinesService: TargetBusinesService) {}

  @Post()
  create(@Body() createTargetBusineDto: CreateTargetBusineDto) {
    return this.targetBusinesService.create(createTargetBusineDto);
  }

  @Get()
  findAll() {
    return this.targetBusinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.targetBusinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTargetBusineDto: UpdateTargetBusineDto) {
    return this.targetBusinesService.update(+id, updateTargetBusineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.targetBusinesService.remove(+id);
  }
}
