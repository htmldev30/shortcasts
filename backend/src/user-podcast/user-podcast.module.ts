import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPodcastController } from './user-podcast.controller'
import { UserPodcastSchema } from './schemas/user-podcast.schema'
import { UserPodcastService } from './user-podcast.service'
import { MinioClientModule } from 'src/minio-client/minio-client.module'
@Module({
    imports: [
        MinioClientModule,
        MongooseModule.forFeature([
            { name: 'UserPodcast', schema: UserPodcastSchema },
        ]),
    ],
    providers: [UserPodcastService],
    controllers: [UserPodcastController],
})
export class UserPodcastModule {}
