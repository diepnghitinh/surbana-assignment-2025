import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export class BaseModel extends TypeOrmBaseEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ length: 100, nullable: true })
  version_id: string;

  name: string;
}
