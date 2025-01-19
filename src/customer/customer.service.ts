import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Customer } from './entities/customer.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CustomerService {
  constructor (
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  create (createCustomerDto: CreateCustomerDto) {
    return this.customersRepository.save(createCustomerDto)
  }

  findAll () {
    return this.customersRepository.find()
  }

  findOne (id: number) {
    return this.customersRepository.findOneBy({ id })
  }

  update (id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customersRepository.update(id, updateCustomerDto)
  }

  remove (id: number) {
    return this.customersRepository.delete(id)
  }
}
