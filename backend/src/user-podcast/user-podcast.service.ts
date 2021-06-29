import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUserPodcast } from './interfaces/user-podcast.interface'
import { CreateUserPodcastDto } from './dto/create-user-podcast.dto'
import { v4 as uuid } from 'uuid'
import { MinioClientService } from '../minio-client/minio-client.service'
import { BufferedFile } from '../minio-client/file.model'
@Injectable()
export class UserPodcastService {
    constructor(
        @InjectModel('UserPodcast')
        private readonly userPodcastModel: Model<IUserPodcast>,
        private minioClientService: MinioClientService,
    ) {}

    async getAllUserPodcast(userId: string): Promise<IUserPodcast[]> {
        try {
            const allUserPodcasts = await this.userPodcastModel.find({
                creatorId: userId,
            })

            return allUserPodcasts
        } catch (error) {
            return error
        }
    }

    async getOneUserPodcast(
        userId: string,
        podcastId: string,
    ): Promise<IUserPodcast> {
        try {
            const oneUserPodcast = await this.userPodcastModel.findOne({
                creatorId: userId,
                podcastId: podcastId,
            })
            return oneUserPodcast
        } catch (error) {
            return error
        }
    }
    async createUserPodcast(
        createUserPodcastDto: CreateUserPodcastDto,
        coverFile: BufferedFile,
        audioFile: BufferedFile,
    ): Promise<IUserPodcast> {
        try {
            const uploaded_files = await this.minioClientService.uploadPodcast(
                coverFile,
                audioFile,
            ) /// saving coverFile then responding
            const { podcastCoverFile, podcastAudioFile } = uploaded_files
            const newUserPodcast = await new this.userPodcastModel({
                title: createUserPodcastDto.title,
                description: createUserPodcastDto.description,
                episode: createUserPodcastDto.episode,
                podcastCoverFile: podcastCoverFile.url,
                podcastAudioFile: podcastAudioFile.url,
                podcastId: uuid(),
                creatorId: createUserPodcastDto.creatorId,
            }).save()
            return newUserPodcast
        } catch (error) {
            return error
        }
    }
}
