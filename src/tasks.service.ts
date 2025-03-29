import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // Chạy mỗi 10 giây (Interval)
  @Interval(1000)
  handleInterval() {
    // this.logger.debug('Tự động run sau để nhắc thông báo bỏ qua');
  }
  // Cron chạy vào 9 giờ sáng mỗi ngày
  @Cron('0 9 * * *')
  handleDailyCron() {
    this.logger.log('Task Cron chạy lúc 9 giờ sáng mỗi ngày');
  }
}
