import { Test, TestingModule } from '@nestjs/testing';
import { PermisionController } from './permision.controller';
import { PermisionService } from './permision.service';

describe('PermisionController', () => {
  let controller: PermisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermisionController],
      providers: [PermisionService],
    }).compile();

    controller = module.get<PermisionController>(PermisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
