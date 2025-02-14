import { BeforeInsert } from 'typeorm';
import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';

export class BuildingsSerializer {
  @Expose()
  id: string;

  @Expose()
  building_name: string;
}
