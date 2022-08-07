import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bmService: BookmarkService) {}
  @Get()
  getList(@GetUser('id') userId: number) {
    return this.bmService.getList(userId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bmService.createBookmark(userId, dto);
  }

  @Get(':id')
  getById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bmId: number,
  ) {
    return this.bmService.getById(userId, bmId);
  }

  @Patch(':id')
  editById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bmId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bmService.editById(userId, bmId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bmId: number,
  ) {
    return this.bmService.deleteById(userId, bmId);
  }
}
