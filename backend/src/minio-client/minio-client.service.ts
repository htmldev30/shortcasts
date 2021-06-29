import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { MinioService } from 'nestjs-minio-client'
import { BufferedFile } from './file.model'
import { fileFilter } from './other/file-filter'

import { renameFile } from './other/rename-file'

@Injectable()
export class MinioClientService {
    constructor(private readonly minio: MinioService) {
        this.logger = new Logger('MinioService')

        // THIS IS THE POLICY
        const podcastCoverPolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: ['arn:aws:s3:::podcast-cover'], // Change this according to your bucket name
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:PutObject',
                        's3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:GetObject',
                        's3:ListMultipartUploadParts',
                    ],
                    Resource: ['arn:aws:s3:::podcast-cover/*'], // Change this according to your bucket name
                },
            ],
        }
        const podcastAudioPolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: ['arn:aws:s3:::podcast-audio'], // Change this according to your bucket name
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:PutObject',
                        's3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:GetObject',
                        's3:ListMultipartUploadParts',
                    ],
                    Resource: ['arn:aws:s3:::podcast-audio/*'], // Change this according to your bucket name
                },
            ],
        }
        this.client.setBucketPolicy(
            process.env.MINIO_PODCAST_COVER_BUCKET_NAME,
            JSON.stringify(podcastCoverPolicy),
            function (err) {
                if (err) throw err

                console.log('Podcast Cover Bucket Policy Set')
            },
        )
        this.client.setBucketPolicy(
            process.env.MINIO_PODCAST_AUDIO_BUCKET_NAME,
            JSON.stringify(podcastAudioPolicy),
            function (err) {
                if (err) throw err

                console.log('Podcast Audio Bucket Policy Set')
            },
        )
    }

    private readonly logger: Logger
    private readonly podcastCoverBucketName =
        process.env.MINIO_PODCAST_COVER_BUCKET_NAME

    private readonly podcastAudioBucketName =
        process.env.MINIO_PODCAST_AUDIO_BUCKET_NAME
    public get client() {
        return this.minio.client
    }

    public async uploadPodcast(
        coverFile: BufferedFile,
        audioFile: BufferedFile,
        podcastCoverBucketName: string = this.podcastCoverBucketName,
        podcastAudioBucketName: string = this.podcastAudioBucketName,
    ) {
        fileFilter(coverFile, audioFile)
        const podcastCoverFile = renameFile(coverFile)

        const podcastAudioFile = renameFile(audioFile)

        // We need to append the extension at the end otherwise Minio will save it as a generic file
        const coverFileName =
            podcastCoverFile.hashedFileName + podcastCoverFile.extension

        const audioFileName =
            podcastAudioFile.hashedFileName + podcastAudioFile.extension
        this.client.putObject(
            podcastCoverBucketName,
            coverFileName,
            coverFile.buffer,
            podcastCoverFile.metaData,
            function (err, res) {
                if (err) {
                    throw new HttpException(
                        'Error uploading file',
                        HttpStatus.BAD_REQUEST,
                    )
                }
            },
        )

        this.client.putObject(
            podcastAudioBucketName,
            audioFileName,
            audioFile.buffer,
            podcastAudioFile.metaData,
            function (err, res) {
                if (err) {
                    throw new HttpException(
                        'Error uploading file',
                        HttpStatus.BAD_REQUEST,
                    )
                }
            },
        )

        const files = {
            podcastCoverFile: {
                original_name: `${coverFileName}`,
                url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_PODCAST_COVER_BUCKET_NAME}/${coverFileName}`,
            },
            podcastAudioFile: {
                original_name: `${audioFileName}`,
                url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_PODCAST_AUDIO_BUCKET_NAME}/${audioFileName}`,
            },
        }
        return files
    }

    async delete(
        objetName: string,
        podcastCoverBucketName: string = this.podcastCoverBucketName,
    ) {
        this.client.removeObject(
            podcastCoverBucketName,
            objetName,
            function (err, res) {
                if (err)
                    throw new HttpException(
                        'An error occurred when deleting!',
                        HttpStatus.BAD_REQUEST,
                    )
            },
        )
    }
}
