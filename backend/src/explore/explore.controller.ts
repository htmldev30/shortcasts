import { Controller, Get, Res, HttpStatus } from '@nestjs/common'
import { errorFormatter } from 'src/user/others/error.formatter'
import { ExploreService } from './explore.service'
@Controller('explore')
export class ExploreController {
    constructor(private exploreService: ExploreService) {}
    @Get()
    async getAllPodcasts(@Res() res) {
        const allPodcasts = await this.exploreService.getAllPodcasts()

        if (allPodcasts instanceof Error) {
            const formattedError = errorFormatter(allPodcasts)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).send({ allPodcasts: allPodcasts })
    }
}
