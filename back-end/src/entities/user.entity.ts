import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  nick_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  full_name: string;

  @Column({
    type: 'int',
    default: 0,
    enum: [0, 1, 2, 3],
  })
  gender: number;

  @Column({
    type: 'int',
    default: 0,
  })
  is_verified: number;

  @Column({
    type: 'date',
    default: null,
  })
  day_of_birth: Date;

  @Column({
    type: 'varchar',
    default: '',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  hashPassword() {
    console.log(this.password);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
}
