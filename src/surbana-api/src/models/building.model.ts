import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { BaseModel } from './base.model';
import { LocationModel } from './location.model';

@Entity({ name: 'buildings' })
export class BuildingModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  building_name: string;

  @OneToMany(() => LocationModel, (location) => location.building)
  locations: LocationModel[];
}
