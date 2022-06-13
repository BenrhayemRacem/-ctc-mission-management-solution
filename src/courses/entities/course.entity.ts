import { timeStamp } from 'src/shared/time-stamp';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { dummyInstructor } from './dummyInstructor.entity';
import { dummyManager } from './dummyManger.entity';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { User } from '../../user/entities/user.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';

@Entity()
export class Course extends timeStamp {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  address: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column()
  capacity: number;
  @JoinColumn()
  @ManyToOne(() => Instructor, (e) => e.courses, {
    //options to review
    eager: true,
    nullable: true,
  })
  instructedBy: Instructor;
  @JoinColumn()
  @ManyToOne(() => User, {
    //options to review
    eager: true,
    nullable: true,
  })
  plannedBy: User;

  @Column()
  mainImage: string;

  @JoinColumn()
  @OneToMany(() => Enrollment, (e) => e.course)
  enrollments: Enrollment[];

  @Column()
  placesAvailable: number;

  @Column()
  preview: string;
}
