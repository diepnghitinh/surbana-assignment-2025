import { Injectable } from '@nestjs/common';
import {
  SelectQueryBuilder,
  Repository,
  FindOptionsWhere,
  FindManyOptions,
} from 'typeorm';
import { PaginationOptions } from '../interfaces/pagination.options';
import { PaginationResponse } from '../interfaces/pagination.response';
import * as url from 'url';

export const MAX_LIMIT = 1000;
export const DEFAULT_LIMIT = 25;

@Injectable()
export class PaginationService {
  private _total: number;
  private _options: PaginationOptions;

  public async paginate<T>(
    repo: SelectQueryBuilder<T> | Repository<T>,
    options: PaginationOptions,
    findParams?: FindOptionsWhere<T> | FindManyOptions<T>,
  ): Promise<PaginationResponse<T>> {
    let results = [];
    let total = 0;
    this._options = this._prepareOptions(options);

    if (repo instanceof SelectQueryBuilder) {
      [results, total] = await this._paginateQueryBuilder<T>(repo, findParams);
    } else {
      [results, total] = await this._paginateRepository(repo, findParams);
    }
    this._total = total;

    return {
      results,
      ...this._paginationMeta
    };
  }

  private _prepareOptions(options: PaginationOptions): PaginationOptions {
    if (typeof options.skip === 'string') {
      options.skip = parseInt(options.skip);
    }
    if (typeof options.limit === 'string') {
      options.limit = parseInt(options.limit);
    }
    let limit: number = options.limit || DEFAULT_LIMIT;
    if (options.limit > MAX_LIMIT) {
      limit = MAX_LIMIT;
    }

    return {
      ...options,
      limit,
      skip: options.skip < 1 ? 0 : options.skip,
    };
  }

  private async _paginateQueryBuilder<T>(
    qb: SelectQueryBuilder<T>,
    findParams?: FindOptionsWhere<T> | FindManyOptions<T>,
  ) {
    return qb
      .limit(this._options.limit)
      .offset(this._offset)
      .setFindOptions(findParams)
      .getManyAndCount();
  }

  private async _paginateRepository<T>(
    repo: Repository<T>,
    findParams?: FindOptionsWhere<T> | FindManyOptions<T>,
  ) {
    return repo.findAndCount({
      skip: this._offset,
      take: this._options.limit,
      ...findParams,
    });
  }

  private get _offset() {
    if (this._options.skip < 1) {
      return 0;
    }

    return this._options.skip;
  }

  private get _paginationMeta() {
    return {
      offset: +this._options.skip || 0,
      limit: +this._options.limit,
      total_items: +this._total,
    };
  }
}
