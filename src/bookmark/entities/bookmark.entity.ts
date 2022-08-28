import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Bookmark } from '@prisma/client';

export class BookmarkEntity implements Bookmark {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  userId: number;
}
