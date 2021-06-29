import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    HttpStatus,
    Res,
    Body,
    UseInterceptors,
    UploadedFile,
    Param,
    ParseUUIDPipe,
    UploadedFiles,
} from '@nestjs/common'

import {
    FileFieldsInterceptor,
    FileInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express'

import { errorFormatter } from 'src/user/others/error.formatter'
import { CreateUserPodcastDto } from './dto/create-user-podcast.dto'
import { UserPodcastService } from './user-podcast.service'
import { Helper } from './shared/helpers/helper'
import { BufferedFile } from '../minio-client/file.model'

@Controller('user-podcast')
export class UserPodcastController {
    constructor(private userPodcastService: UserPodcastService) {}

    @Get('/:userId')
    async getAllUserPodcast(
        @Res() res,
        @Param('userId', new ParseUUIDPipe()) userId: string,
    ) {
        const allUserPodcasts = await this.userPodcastService.getAllUserPodcast(
            userId,
        )

        if (allUserPodcasts instanceof Error) {
            const formattedError = errorFormatter(allUserPodcasts)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: allUserPodcasts }) // ! Changed! from allUserPodcasts
        }
        return res
            .status(HttpStatus.OK)
            .send({ allUserPodcasts: allUserPodcasts })
    }

    @Get('/:userId/:podcastId')
    async getOneUserPodcast(
        @Res() res,
        @Param('userId') userId: string,
        @Param('podcastId') podcastId: string,
    ) {
        const oneUserPodcast = await this.userPodcastService.getOneUserPodcast(
            userId,
            podcastId,
        )

        if (oneUserPodcast instanceof Error) {
            const formattedError = errorFormatter(oneUserPodcast)
            return res
                .status(HttpStatus.OK)
                .send({ oneUserPodcast: formattedError })
        }

        return res
            .status(HttpStatus.OK)
            .send({ oneUserPodcast: oneUserPodcast })
    }
    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'coverFile', maxCount: 1 },
            { name: 'audioFile', maxCount: 1 },
        ]),
    )
    async createUserPodcast(
        @Res() res,
        @Body() createUserPodcast: CreateUserPodcastDto,
        @UploadedFiles() files,
    ) {
        const { coverFile, audioFile } = files

        if (!coverFile || !audioFile) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: 'Cover file and audio file are both required' })
        }
        // [0] cause of object within array stuff. console.log(files)
        const newUserPodcast = await this.userPodcastService.createUserPodcast(
            createUserPodcast,
            coverFile[0],
            audioFile[0],
        )

        if (newUserPodcast instanceof Error) {
            const formattedError = errorFormatter(newUserPodcast)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }

        return res
            .status(HttpStatus.OK)
            .send({ message: 'Podcast created successfully' })
    }
}
