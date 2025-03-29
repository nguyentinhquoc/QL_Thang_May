import { Test, TestingModule } from '@nestjs/testing';
import { PermisionService } from './permision.service';

describe('PermisionService', () => {
  let service: PermisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermisionService],
    }).compile();

    service = module.get<PermisionService>(PermisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
