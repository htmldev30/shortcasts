import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUserPodcast } from 'src/user-podcast/interfaces/user-podcast.interface'
@Injectable()
export class ExploreService {
    constructor(
        @InjectModel('UserPodcast')
        private readonly userPodcastModel: Model<IUserPodcast>,
    ) {}

    async getAllPodcasts(): Promise<IUserPodcast[]> {
        try {
            const allUserPodcasts = await this.userPodcastModel.find()

            return allUserPodcasts
        } catch (error) {
            return error
        }
    }
}
