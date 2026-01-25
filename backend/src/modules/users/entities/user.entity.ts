import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { RentAgreement } from '../../rent/entities/rent-contract.entity'; // Verifica esta ruta

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  permissions: any;

  // ESTO ES LO QUE FALTA:
  @OneToMany(() => RentAgreement, (contract) => contract.user)
  contracts: RentAgreement[];

  @CreateDateColumn()
  createdAt: Date;
}