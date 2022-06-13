import { IsEmail, IsNumber, IsPositive, MinLength } from "class-validator";
import { Timestamp } from 'src/generics/timestamp.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';
import { Organism } from 'src/organism/entities/organism.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from '../enums/roles.enum';
import { Enrollment } from "../../enrollment/entities/enrollment.entity";

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    length: 8,
  })
  cin: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.INDIVIDUAL,
  })
  role: RolesEnum; // should be an array but mysql does not support it!!

  @Column( {
    nullable:true
  })
  profileImage : string
  @Column()
  @MinLength(8)
  password: string;

  @OneToOne(() => Organism, (organism) => organism.contactPerson)
  organism: Organism;


  @OneToOne(() => Instructor, (instructor) => instructor.user)
  instructor: Instructor;

  @OneToMany(()=>Enrollment , (e)=>e.user )
  enrolled :Enrollment[]
  

}
