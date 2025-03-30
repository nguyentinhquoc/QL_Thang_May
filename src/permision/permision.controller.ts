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

}
