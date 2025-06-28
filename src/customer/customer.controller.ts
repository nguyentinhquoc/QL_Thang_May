import {Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, SetMetadata} from '@nestjs/common'
import {CustomerService} from './customer.service'
import {CreateCustomerDto} from './dto/create-customer.dto'
import {UpdateCustomerDto} from './dto/update-customer.dto'
import {Response} from 'express'

@Controller('customer')
export class CustomerController {
  constructor (private readonly customerService: CustomerService) {}

  @Post()
  async create (@Res() res: Response, @Body() createCustomerDto: CreateCustomerDto) {
    if (createCustomerDto.address) {
      createCustomerDto.address = `${createCustomerDto.city}, ${createCustomerDto.district},${createCustomerDto.ward}, ${createCustomerDto.address}`
    } else {
      createCustomerDto.address = `${createCustomerDto.city}, ${createCustomerDto.district},${createCustomerDto.ward}`
    }
    await this.customerService.create(createCustomerDto)
    return res.redirect('/customer/infor')
  }
  @Get('add')
  @Render('admin/customer/add')
  async addCustomer () {
    const customers = await this.customerService.findAll()
    return {customers}
  }
  @SetMetadata('permision', '5')
  @Get('infor')
  @Render('admin/customer/infor')
  async findAll () {
    const customers = await this.customerService.findAll()
    return {customers}
  }

  @Get(':id')
  @Render('admin/customer/detail')
  async findOne (@Param('id') id: string) {
    const customer = await this.customerService.findOne(+id)
    return {customer}
  }

  @Patch(':id')
  async update (@Res() res: Response, @Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    if (updateCustomerDto.address) {
      updateCustomerDto.address = `${updateCustomerDto.city}, ${updateCustomerDto.district},${updateCustomerDto.ward}, ${updateCustomerDto.address}`
    } else {
      updateCustomerDto.address = `${updateCustomerDto.city}, ${updateCustomerDto.district},${updateCustomerDto.ward}`
    }
    const {city, district, ward, ...newUpdateCustomerDto} = updateCustomerDto

    await this.customerService.update(+id, newUpdateCustomerDto)
    return res.redirect(`/customer/${id}`)
  }

  @Delete(':id')
  async remove (@Res() res: Response, @Param('id') id: string) {
    await this.customerService.remove(+id)
    return res.redirect(`/customer/infor`)
  }
}
