import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllUser {
  @ApiProperty({
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'keyword harus berupa string' })
  keyword: string;

  @ApiProperty({
    example: 1,
    required: false,
    type: 'number',
  })
  @IsOptional()
  page: string;

  @ApiProperty({
    example: 10,
    required: false,
    type: 'number',
  })
  @IsOptional()
  limit: string;
}
