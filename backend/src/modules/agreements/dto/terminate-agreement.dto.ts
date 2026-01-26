import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class TerminateAgreementDto {
  @IsNotEmpty()
  @IsString()
  terminationReason: string;

  @IsOptional()
  @IsString()
  terminationNotes?: string;
}
