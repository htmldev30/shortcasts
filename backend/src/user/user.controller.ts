import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Res,
} from '@nestjs/common'
import { CreateUserProfileDto } from './dto/create-user-profile.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async createUserProfile(
        @Res() res,
        @Body() createUserProfileDto: CreateUserProfileDto,
    ) {
        const newUserProfile = await this.userService.createUserProfile(
            createUserProfileDto,
        )
        return res.status(HttpStatus.OK).json({
            userProfile: newUserProfile,
        })
    }

    @Put('/:userId')
    async updateUserProfile(
        @Res() res,
        @Param('userId', new ParseUUIDPipe()) userId: string,
        @Body() updateUserProfile: CreateUserProfileDto,
    ) {
        const updatedUserProfile = await this.userService.updateUserProfile(
            userId,
            updateUserProfile,
        )
        if (!updatedUserProfile) {
            throw new NotFoundException('User Does Not Exist!')
        }
        return res.status(HttpStatus.OK).json({
            userProfile: updatedUserProfile,
        })
    }
}
