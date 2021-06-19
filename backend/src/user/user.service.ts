import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUserProfile } from './interfaces/user-profile.interface'
import { CreateUserProfileDto } from './dto/create-user-profile.dto'
@Injectable()
export class UserService {
    constructor(
        @InjectModel('UserProfile')
        private readonly userProfileModel: Model<IUserProfile>,
    ) {}

    // returning from DB so, it's an interface of userProfile
    async createUserProfile(
        createUserProfileDto: CreateUserProfileDto,
    ): Promise<IUserProfile> {
        const userProfileExists = await this.userProfileModel.findOne({
            userId: createUserProfileDto.userId,
        })
        if (userProfileExists) {
            return userProfileExists
        }

        const newUserProfile = await new this.userProfileModel(
            createUserProfileDto,
        )

        return newUserProfile.save()
    }

    async updateUserProfile(
        userId: string,
        updateUserProfile: CreateUserProfileDto,
    ): Promise<IUserProfile> {
        const updatedUserProfile = await this.userProfileModel.findOneAndUpdate(
            { userId: userId },
            updateUserProfile,
            { new: true },
        )

        return updatedUserProfile
    }
}
