import { Test, TestingModule } from '@nestjs/testing';
import { UserPodcastService } from './user-podcast.service';

describe('UserPodcastService', () => {
  let service: UserPodcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPodcastService],
    }).compile();

    service = module.get<UserPodcastService>(UserPodcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
