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
import { BuildingModel } from './building.model';

@Entity({ name: 'locations' })
export class LocationModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  location_name: string;

  @Column({ length: 100 })
  location_number: string;

  @Column('decimal')
  location_area: number;

  @ManyToOne(() => BuildingModel, (building) => building.locations)
  @JoinColumn({ name: 'building_id' })
  @Column({ type: 'uuid', nullable: true })
  building: BuildingModel;

  @Column({ type: 'ltree' })
  location_path: string;

  // Read Only field
  @Column({ type: 'uuid', nullable: true, default: null })
  building_id: string;
}
