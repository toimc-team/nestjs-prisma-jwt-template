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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

@UseGuards(JwtGuard)
@Controller('bookmarks')
@ApiTags('Bookmark')
@ApiBearerAuth()
export class BookmarkController {
  constructor(private bmService: BookmarkService) {}
  @Get()
  @ApiOkResponse({ type: BookmarkEntity, isArray: true })
  getList(@GetUser('id') userId: number) {
    return this.bmService.getList(userId);
  }

  @ApiCreatedResponse({ type: BookmarkEntity })
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bmService.createBookmark(userId, dto);
  }

  @ApiOkResponse({ type: BookmarkEntity })
  @Get(':id')
  getById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bmId: number,
  ) {
    return this.bmService.getById(userId, bmId);
  }

  @ApiOkResponse({ type: BookmarkEntity })
  @Patch(':id')
  editById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bmId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bmService.editById(userId, bmId, dto);
  }

  @ApiOkResponse({ type: BookmarkEntity })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bmId: number,
  ) {
    return this.bmService.deleteById(userId, bmId);
  }
}
