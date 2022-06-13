import { Timestamp } from 'src/generics/timestamp.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Instructor extends Timestamp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  cv: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
  @Column({ type: 'text' })
  professionalImage: string;

  @OneToOne(() => User, (user) => user.instructor, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'text' })
  resume: string;

  @OneToMany(() => Course, (e) => e.instructedBy)
  courses: Course[];
}
