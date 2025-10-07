import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {StaffsService} from 'src/staffs/staffs.service'
import {Response} from 'express'
import {PermisionService} from 'src/permision/permision.service'
@Injectable()
export class AuthGuard2 implements CanActivate {
  constructor (
    private staffsService: StaffsService,
    private permisionService: PermisionService,
    private reflector: Reflector,
  ) {}
  async canActivate (context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    if (isPublic) {
      console.log(isPublic);
      return true
    }
    const role_admin = this.reflector.get<boolean>('role_admin', context.getHandler())
    const permision = this.reflector.get<boolean>('permision', context.getHandler())
    const request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()
    const token = request.cookies['token']
    // Nếu endpoint là public, cho phép truy cập
    // Kiểm tra quyền truy cập với token
    if (!token) {
      return this.redirectToLogin(response, 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại')
    }
    try {
      // Kiểm tra payload token
      const payload = await this.staffsService.payload(token)
      let checkPhanQuyen = true
      if (permision) {
        checkPhanQuyen = await this.permisionService.checkPermision(payload.id, +permision)
      }
      const checkStatusStaff = await this.staffsService.checkStatus(payload.id)
      // Nếu yêu cầu role_admin và token không có quyền admin
      if ((role_admin && payload.role_admin == 0) || !checkPhanQuyen || !checkStatusStaff) {
        this.redirectToLogin(response, 'Bạn không có quyền truy cập vào tài nguyên này')
        return false
      }
      // Nếu token hợp lệ và không cần quyền admin
      if (payload) {
        return true
      }
    } catch (error) {
      // Nếu có lỗi khi giải mã token (ví dụ: token hết hạn)
    console.log(error)

      return this.redirectToLogin(response, 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại')
    console.log(token)

    }
    // Trả về false nếu không hợp lệ
    return this.redirectToLogin(response, 'Đã xảy ra lỗi, vui lòng đăng nhập lại')
  }
  // Hàm tiện ích để chuyển hướng và hiển thị thông báo lỗi
  private redirectToLogin (response: Response, message: string) {
    response.render('login', {
      message: message,
      status: 'error',
    })
    return false
  }
}
