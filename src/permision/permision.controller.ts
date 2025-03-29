import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisionService } from './permision.service';
import { CreatePermisionDto } from './dto/create-permision.dto';
import { UpdatePermisionDto } from './dto/update-permision.dto';

@Controller('permision')
export class PermisionController {
  constructor(private readonly permisionService: PermisionService) {}

  @Post()
  create(@Body() createPermisionDto: CreatePermisionDto) {
    return this.permisionService.create(createPermisionDto);
  }

  @Get()
  findAll() {
    return this.permisionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permisionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermisionDto: UpdatePermisionDto) {
    return this.permisionService.update(+id, updatePermisionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisionService.remove(+id);
  }
}
