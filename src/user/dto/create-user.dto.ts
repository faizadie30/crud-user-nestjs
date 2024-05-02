import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { StrongPassword } from '../../decorator/password.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'jajang suyono',
    required: true,
  })
  @IsNotEmpty({ message: 'nama wajib di isi' })
  @IsString({ message: 'nama harus berupa format string' })
  name: string;

  @ApiProperty({
    example: 'jasuke@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'harus berformat email' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    example: 'Test123',
    required: true,
  })
  @StrongPassword({
    message:
      'Kata sandi minimal 8 karakter, harus di sertai huruf besar, kecil dan angka!',
  })
  password: string;
}
