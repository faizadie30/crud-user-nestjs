import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import '../config/env';

@Injectable()
export class GlobalHelper {
  convertToNumber(value: string | number): number {
    if (typeof value === 'string') {
      return Number(value);
    } else if (typeof value === 'number') {
      return value;
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  generatePagination(
    serviceName: string,
    page: number,
    limit: number,
    totalPages: number,
    totalItems: number,
    customParam: any,
  ): object {
    return {
      first: `${process.env.BASE_URL}/${serviceName}?limit=${limit}&page=1${
        customParam && '&'
      }${customParam}`,
      previous:
        page > 1
          ? `${process.env.BASE_URL}/${serviceName}?limit=${limit}&page=${
              page - 1
            }${customParam && '&'}${customParam}`
          : null,
      current: `${
        process.env.BASE_URL
      }/${serviceName}?limit=${limit}&page=${page}${
        customParam && '&'
      }${customParam}`,
      next:
        page < totalPages
          ? `${process.env.BASE_URL}/${serviceName}?limit=${limit}&page=${
              page + 1
            }${customParam && '&'}${customParam}`
          : null,
      last: `${
        process.env.BASE_URL
      }/${serviceName}?limit=${limit}&page=${totalPages}${
        customParam && '&'
      }${customParam}`,
      itemsPerPage: this.convertToNumber(limit),
      totalItems,
      currentPage: page,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
      lastPage: totalPages,
    };
  }
}
