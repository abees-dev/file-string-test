import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('auth')
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    unique: true,
  })
  user_id: number;

  @Column({
    type: 'varchar',
    default: '',
  })
  access_token: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  refresh_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
