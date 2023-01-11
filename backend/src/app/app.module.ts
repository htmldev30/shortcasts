// Minio part of code adapted from GitHub user djedlajn's package nestjs-minio-client under the MIT License
// https://github.com/djedlajn/nestjs-minio-client
import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common'
import { AuthenticationMiddleware } from '../common/authentication.middleware'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

// Customs
import keys from '../config/keys'
import { UserModule } from 'src/user/user.module'
import { UserPodcastModule } from '../user-podcast/user-podcast.module'
import { MinioClientModule } from '../minio-client/minio-client.module'
import { ExploreModule } from 'src/explore/explore.module'

@Module({
    imports: [
        MinioClientModule,
        UserPodcastModule,
        ExploreModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(`${keys.MONGO_DB_URI}`, {
            useNewUrlParser: true,
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer
            .apply(AuthenticationMiddleware)
            .exclude(
                { method: RequestMethod.GET, path: '/' },
                { method: RequestMethod.GET, path: '/explore' },
                { method: RequestMethod.GET, path: '/user' },
            )
        //.forRoutes('*')
    }
}
