import { HttpException, HttpStatus } from '@nestjs/common'
import BadPodcastFilesError from '../shared/file-errors'
export const fileFilter = (coverFile, audioFile) => {
    // if it doesn't match these, file is not an image
    let errors = []

    if (
        coverFile.mimetype === 'image/jpg' ||
        coverFile.mimetype === 'image/jpeg' ||
        coverFile.mimetype === 'image/png'
    ) {
    } else {
        errors.push('Cover file type is not supported')
    }

    if (coverFile.size > 1048576) {
        errors.push('Cover file size is too large')
    }

    if (
        audioFile.mimetype === 'audio/mpeg' ||
        audioFile.mimetype === 'audio/vnd.wav' ||
        audioFile.mimetype === 'audio/mp4' ||
        audioFile.mimetype === 'audio/x-aiff'
    ) {
    } else {
        errors.push('Audio file type is too large')
    }

    if (audioFile.size > 31752000) {
        errors.push('Audio file size is too large')
    }

    if (errors.length !== 0) {
        throw new BadPodcastFilesError(errors)
    }
}
