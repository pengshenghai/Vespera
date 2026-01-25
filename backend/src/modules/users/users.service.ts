import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction, AuditLevel, AuditStatus } from '../audit/entities/audit-log.entity';
import { AuditLog } from '../audit/decorators/audit-log.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly auditService: AuditService,
  ) {}

  @AuditLog({
    action: AuditAction.CREATE,
    entityType: 'User',
    level: AuditLevel.INFO,
    includeNewValues: true,
    sensitive: true,
  })
  async create(createUserDto: CreateUserDto, performedBy?: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      await this.auditService.log({
        action: AuditAction.CREATE,
        entityType: 'User',
        performedBy,
        status: AuditStatus.FAILURE,
        level: AuditLevel.WARN,
        errorMessage: 'User with this email already exists',
        metadata: { email: createUserDto.email },
      });
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      isActive: true,
    });

    const savedUser = await this.userRepository.save(user);

    // Audit log is handled by decorator
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['contracts'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contracts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['contracts'],
    });
  }

  @AuditLog({
    action: AuditAction.UPDATE,
    entityType: 'User',
    level: AuditLevel.INFO,
    includeOldValues: true,
    includeNewValues: true,
    sensitive: true,
  })
  async update(id: string, updateUserDto: UpdateUserDto, performedBy?: string): Promise<User> {
    const user = await this.findOne(id);

    const oldValues = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };

    // Check for sensitive changes
    const sensitiveChanges = [];
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      sensitiveChanges.push('email');
    }
    if (updateUserDto.password) {
      sensitiveChanges.push('password');
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    // Additional audit for sensitive changes
    if (sensitiveChanges.length > 0) {
      await this.auditService.log({
        action: AuditAction.DATA_ACCESS,
        entityType: 'User',
        entityId: id,
        performedBy,
        level: AuditLevel.SECURITY,
        metadata: {
          sensitiveFields: sensitiveChanges,
          operation: 'update_sensitive_data',
        },
      });
    }

    return updatedUser;
  }

  @AuditLog({
    action: AuditAction.PERMISSION_CHANGE,
    entityType: 'User',
    level: AuditLevel.SECURITY,
    includeOldValues: true,
    includeNewValues: true,
  })
  async updatePermissions(id: string, permissions: any, performedBy?: string): Promise<User> {
    const user = await this.findOne(id);
    const oldPermissions = user.permissions || {};

    user.permissions = { ...oldPermissions, ...permissions };
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }

  @AuditLog({
    action: AuditAction.DELETE,
    entityType: 'User',
    level: AuditLevel.WARN,
    includeOldValues: true,
  })
  async remove(id: string, performedBy?: string): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);
  }

  @AuditLog({
    action: AuditAction.LOGIN,
    entityType: 'User',
    level: AuditLevel.INFO,
  })
  async logLoginAttempt(email: string, success: boolean, ipAddress?: string, userAgent?: string): Promise<void> {
    const user = await this.findByEmail(email);

    await this.auditService.log({
      action: success ? AuditAction.LOGIN : AuditAction.LOGIN,
      entityType: 'User',
      entityId: user?.id,
      ipAddress,
      userAgent,
      status: success ? AuditStatus.SUCCESS : AuditStatus.FAILURE,
      level: success ? AuditLevel.INFO : AuditLevel.SECURITY,
      metadata: {
        email,
        loginAttempt: true,
        success,
      },
    });
  }

  @AuditLog({
    action: AuditAction.PASSWORD_CHANGE,
    entityType: 'User',
    level: AuditLevel.SECURITY,
    sensitive: true,
  })
  async changePassword(id: string, newPassword: string, performedBy?: string): Promise<void> {
    const user = await this.findOne(id);

    // In a real implementation, you'd hash the password here
    user.password = newPassword;
    await this.userRepository.save(user);
  }

  @AuditLog({
    action: AuditAction.DATA_ACCESS,
    entityType: 'User',
    level: AuditLevel.SECURITY,
  })
  async logSensitiveDataAccess(userId: string, accessedBy: string, dataType: string, ipAddress?: string): Promise<void> {
    await this.auditService.log({
      action: AuditAction.DATA_ACCESS,
      entityType: 'User',
      entityId: userId,
      performedBy: accessedBy,
      ipAddress,
      level: AuditLevel.SECURITY,
      metadata: {
        dataType,
        accessType: 'sensitive_data_view',
      },
    });
  }
}