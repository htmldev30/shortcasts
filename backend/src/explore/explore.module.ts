import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPodcastSchema } from 'src/user-podcast/schemas/user-podcast.schema'
import { ExploreController } from './explore.controller'
import { ExploreService } from './explore.service'
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'UserPodcast', schema: UserPodcastSchema },
        ]),
    ],
    providers: [ExploreService],
    controllers: [ExploreController],
})
export class ExploreModule {}
