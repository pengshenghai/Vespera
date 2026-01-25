import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditStatus, AuditLevel } from '../audit/entities/audit-log.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly auditService: AuditService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      await this.auditService.log({
        action: AuditAction.LOGIN,
        entityType: 'User',
        status: AuditStatus.FAILURE,
        level: AuditLevel.SECURITY,
        errorMessage: 'User not found',
        metadata: { email, reason: 'user_not_found' },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    // In a real implementation, you'd verify the password hash
    if (user.password !== password) {
      await this.usersService.logLoginAttempt(email, false);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      await this.auditService.log({
        action: AuditAction.LOGIN,
        entityType: 'User',
        entityId: user.id,
        status: AuditStatus.FAILURE,
        level: AuditLevel.SECURITY,
        errorMessage: 'User account is inactive',
        metadata: { email, reason: 'account_inactive' },
      });
      throw new UnauthorizedException('Account is inactive');
    }

    await this.usersService.logLoginAttempt(email, true);
    return user;
  }

  async login(user: any, ipAddress?: string, userAgent?: string) {
    const payload = { email: user.email, sub: user.id };

    await this.auditService.log({
      action: AuditAction.LOGIN,
      entityType: 'User',
      entityId: user.id,
      performedBy: user.id,
      ipAddress,
      userAgent,
      status: AuditStatus.SUCCESS,
      level: AuditLevel.INFO,
      metadata: {
        email: user.email,
        loginSuccessful: true,
      },
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async logout(user: any, ipAddress?: string, userAgent?: string) {
    await this.auditService.log({
      action: AuditAction.LOGOUT,
      entityType: 'User',
      entityId: user.id,
      performedBy: user.id,
      ipAddress,
      userAgent,
      status: AuditStatus.SUCCESS,
      level: AuditLevel.INFO,
      metadata: {
        email: user.email,
      },
    });
  }
}