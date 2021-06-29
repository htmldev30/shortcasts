import { Test, TestingModule } from '@nestjs/testing'
import { UserPodcastController } from './user-podcast.controller'

describe('UserPodcastController', () => {
    let controller: UserPodcastController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserPodcastController],
        }).compile()

        controller = module.get<UserPodcastController>(UserPodcastController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
