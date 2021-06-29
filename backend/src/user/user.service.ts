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

    async getUserProfile(userProfileId): Promise<IUserProfile> {
        try {
            const userProfile = await this.userProfileModel
                .findOne(
                    {
                        userId: userProfileId,
                    },
                    'username displayName avatar isVerified userId',
                )
                .exec()

            return userProfile
        } catch (error) {
            return error
        }
    }
    // returning from DB so, it's an interface of userProfile
    async createUserProfile(
        createUserProfileDto: CreateUserProfileDto,
    ): Promise<IUserProfile> {
        try {
            const userProfileExists = await this.userProfileModel
                .findOne({
                    userId: createUserProfileDto.userId,
                    // isVerified: createUserProfileDto.isVerified,
                })
                .exec()
            if (userProfileExists) {
                return userProfileExists
            }

            //  upsert = true option creates the object if it doesn't exist. defaults to false.
            const newUserProfile = await this.userProfileModel.findOneAndUpdate(
                {
                    userId: createUserProfileDto.userId,
                },
                createUserProfileDto,
                { new: true, upsert: true },
            )

            return newUserProfile
        } catch (err) {
            return err
        }
    }

    async updateUserProfile(
        userId: string,
        updateUserProfile: CreateUserProfileDto,
    ): Promise<IUserProfile> {
        // Makes sure it doesn't return a 500 and crash the server

        try {
            const updatedUserProfile =
                await this.userProfileModel.findOneAndUpdate(
                    { userId: userId },
                    updateUserProfile,
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                    },
                )

            return updatedUserProfile
        } catch (err) {
            // makes sure its an instance of error
            return err
        }
    }
}
