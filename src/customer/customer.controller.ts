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
  UseGuards
} from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { Response, Request } from 'express'
import { BusinessGuard } from 'src/guards/auth/busines.guard'

@Controller('customer')
export class CustomerController {
  constructor (private readonly customerService: CustomerService) {}

  @Post()
  async create (
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto
  ) {
    await this.customerService.create(createCustomerDto)
    return res.redirect('/customer/infor')
  }
  @Get('add')
  @Render('admin/customer/add')
  async addCustomer () {
    const customers = await this.customerService.findAll()
    return { customers }
  }
  @Get('infor')
  @UseGuards(BusinessGuard)
  @Render('admin/customer/infor')
  async findAll () {
    const customers = await this.customerService.findAll()
    return { customers }
  }

  @Get(':id')
  @Render('admin/customer/detail')
  async findOne (@Param('id') id: string) {
    const customer = await this.customerService.findOne(+id)
    return { customer }
  }

  @Patch(':id')
  async update (
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    await this.customerService.update(+id, updateCustomerDto)
    return res.redirect(`/customer/${id}`)
  }

  @Delete(':id')
  async remove (@Res() res: Response, @Param('id') id: string) {
    await this.customerService.remove(+id)
    return res.redirect(`/customer/infor`)
  }
}
