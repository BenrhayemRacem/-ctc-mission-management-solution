import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { OrganismNautreEnum } from '../enums/organism-nature.enum';
import { Timestamp } from 'src/generics/timestamp.entity';

@Entity()
export class Organism  extends  Timestamp{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  activity: string;

  @Column({
    unique: true,
  })
  taxRegistrationNumber: string;

  @Column()
  contactPersonPosition: string;

  @Column({
    type: 'enum',
    enum: OrganismNautreEnum,
  })
  nature: OrganismNautreEnum;

  @Column({
    nullable: true,
    type: 'bigint',
  })
  numberOfEmployees: number;

  @Column({
    nullable: true,
  })
  subsidiary: string;

  @Column({
    nullable: true,
  })
  trainingNeeds: string;

  @OneToOne(() => User, (user) => user.organism, {
    eager: true,
  })
  @JoinColumn()
  contactPerson: User;
}
