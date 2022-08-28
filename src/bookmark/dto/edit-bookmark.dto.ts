import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  link?: string;
}
