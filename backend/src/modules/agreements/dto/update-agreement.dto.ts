import { PartialType } from '@nestjs/mapped-types';
import { CreateAgreementDto } from './create-agreement.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { AgreementStatus } from '../../rent/entities/rent-contract.entity';

export class UpdateAgreementDto extends PartialType(CreateAgreementDto) {
  @IsOptional()
  @IsEnum(AgreementStatus)
  status?: AgreementStatus;
}
