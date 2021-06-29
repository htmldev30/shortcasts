import { Formik, Form, Field } from 'formik'
import { InputField } from '../../components/form-fields/InputField'
import Button from '../../components/UIComponents/Button'
import * as Yup from 'yup'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserProfileContext } from '../../hooks/context/UserProfileProvider'
import { PodcastsContext } from '../../hooks/context/PodcastsProvider'

interface IPodcastValues {
    title: string
    description: string
    episode: number
    coverFile: string
    audioFile: string
}
const CreatePodcastForm = ({ podcastData, closeShowModal }: IPodcastValues) => {
    const { getAccessTokenSilently } = useAuth0()
    const { userProfile } = useContext(UserProfileContext)
    const { setUserPodcastsUpdated } = useContext(PodcastsContext)
    const [responseMessage, setResponseMessage] = useState(null)
    const [errors, setErrors] = useState(null)

    const [selectedCoverFile, setSelectedCoverFile] = useState({
        coverFile: undefined,
        coverPreviewURI: undefined,
    })

    const [selectedAudioFile, setSelectedAudioFile] = useState({
        audioFile: undefined,
        audioPreviewURI: undefined,
    })

    if (podcastData) {
        const existingPodcastValues: IPodcastValues = {
            title: podcastData.title,
            description: podcastData.description,
            episode: podcastData.episode,
            coverFile: podcastData.coverFile,
            audioFile: podcastData.audioFile,
        }
    }

    const COVER_FILE_SIZE = 1048576 // 1mb
    const COVER_FILE_SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/png',
    ]
    const AUDIO_FILE_SIZE = 31752000 // 31.752mb
    const AUDIO_FILE_SUPPORTED_FORMATS = [
        'audio/mpeg',
        'audio/vnd.wav',
        'audio/mp4',
        'audio/x-aiff',
    ]

    const podcastValidationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Podcast must have a title')
            .matches(/^[ A-Za-zñáéíóúü0-9_.&-]*$/, 'You may only use _ . - ')
            .matches(/^(?![0-9_.-]+$)/, 'Letters are required')
            .max(32, 'Title is too long'),
        description: Yup.string().max(64, 'Description is too long'),
        episode: Yup.string()
            .matches(/^\d+$/, 'You must specify a number only')
            .typeError('A number must be specified'),
        coverFile: Yup.mixed()
            .required('A cover file is required')
            .test(
                'coverFileSize',
                'File size too large, max file size is  1 Mb',
                (file) => (file ? file.size <= COVER_FILE_SIZE : true)
            )
            .test('coverFileType', 'Only .JPG, .JPEG, .PNG accepted', (file) =>
                file ? COVER_FILE_SUPPORTED_FORMATS.includes(file.type) : true
            ),
        audioFile: Yup.mixed()
            .required('An audio file is required')
            .test(
                'audioFileSize',
                'File size too large, max file size is 31 Mb',
                (file) => (file ? file.size <= AUDIO_FILE_SIZE : true)
            )
            .test(
                'audioFileType',
                'Only .MP3, .WAV, .X-AIFF, audio/mp4 accepted',
                (file) =>
                    file
                        ? AUDIO_FILE_SUPPORTED_FORMATS.includes(file.type)
                        : true
            ),
    })

    const responseMessageHandler = () => {
        if (Array.isArray(responseMessage)) {
            return (
                <>
                    {responseMessage.map(function (message, index) {
                        return (
                            <>
                                <h3 key={index} className="text-red-500">
                                    {message}
                                </h3>
                            </>
                        )
                    })}
                </>
            )
        } else {
            return <h3 className="text-red-500">{responseMessage}</h3>
        }
    }

    return (
        <>
            {/* podcastData ? podcastData : name: '' ...  */}
            <Formik
                enableReinitialize={true}
                initialValues={
                    podcastData
                        ? podcastData
                        : {
                              title: '',
                              description: '',
                              episode: 0,
                              coverFile: undefined,
                              audioFile: undefined,
                          }
                }
                validationSchema={podcastValidationSchema}
                onSubmit={async ({
                    title,
                    description,
                    episode,
                    coverFile,
                    audioFile,
                }: IPodcastValues) => {
                    const formData = {
                        title,
                        description,
                        episode,
                        coverFile,
                        audioFile,
                    }

                    const allData = new FormData()

                    allData.append('coverFile', coverFile) // name of file for interception
                    allData.append('audioFile', audioFile)
                    allData.append('title', title)
                    allData.append('description', description)
                    allData.append('episode', episode)
                    allData.append('creatorId', userProfile.userId)
                    const token = await getAccessTokenSilently()
                    const response = await axios({
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            authorization: `Bearer ${token}`,
                        },
                        method: 'post',
                        url: `http://127.0.0.1:3001/user-podcast`,
                        data: allData,
                    })
                        .then(function (response) {
                            setUserPodcastsUpdated(true)
                            closeShowModal(true)
                        })
                        .catch(function (error) {
                            setErrors(true)
                            setResponseMessage(error.response.data.error)
                        })
                }}
            >
                {/* Can access values because under formik Component, if not, then it would be, formik.values.username || FORMIK props*/}
                {({
                    setFieldValue,
                    values,
                    isSubmitting,
                    handleSubmit,
                    handleBlur,
                    errors,
                }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                        encType="multipart/form-data"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium text-text-500">
                                            New Podcast
                                        </h3>

                                        {responseMessage && errors
                                            ? responseMessageHandler()
                                            : null}
                                        <div className="mt-2">
                                            <div className="mb-1 sm:mb-2 text-left">
                                                <InputField
                                                    name="title"
                                                    label="Title"
                                                    type="text"
                                                    placeholder="a super awesome title"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'title',
                                                            e.target.value
                                                        )
                                                    }}
                                                    value={values.title}
                                                />
                                            </div>
                                            <div className="mb-1 sm:mb-2 text-left">
                                                <InputField
                                                    name="description"
                                                    label="Description"
                                                    type="text"
                                                    placeholder="a super awesome description"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'description',
                                                            e.target.value
                                                        )
                                                    }}
                                                    value={values.description}
                                                />
                                            </div>
                                            <div className="mb-1 sm:mb-2 text-left">
                                                <InputField
                                                    name="episode"
                                                    label="Episode"
                                                    type="number"
                                                    min="0"
                                                    placeholder="a super awesome episode"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'episode',
                                                            e.target.value
                                                        )
                                                    }}
                                                    value={values.episode}
                                                />
                                            </div>

                                            <div className="mb-1 sm:mb-2 text-left">
                                                <label className="inline-block mb-1 font-medium text-sm">
                                                    Podcast Cover
                                                </label>
                                                <br />

                                                <input
                                                    id="coverFile"
                                                    name="coverFile"
                                                    type="file"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        const selectedCoverFile =
                                                            e.currentTarget
                                                                .files[0]
                                                        const coverFileReader =
                                                            new FileReader()
                                                        if (selectedCoverFile) {
                                                            coverFileReader.onloadend =
                                                                () => {
                                                                    setSelectedCoverFile(
                                                                        {
                                                                            coverFile:
                                                                                selectedCoverFile,
                                                                            coverPreviewURI:
                                                                                coverFileReader.result,
                                                                        }
                                                                    )
                                                                    coverFileReader.readAsDataURL(
                                                                        selectedCoverFile
                                                                    )
                                                                }
                                                        }
                                                        setFieldValue(
                                                            'coverFile',
                                                            selectedCoverFile
                                                        )
                                                    }}
                                                    multiple={true}
                                                    accept=".png,.jpg,.jpeg"
                                                />
                                                <br />
                                                {errors.coverFile ? (
                                                    <span className="text-xs text-red-500">
                                                        {errors.coverFile}
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="mb-1 sm:mb-2 text-left">
                                                <label className="inline-block mb-1 font-medium text-sm">
                                                    Podcast File
                                                </label>
                                                <br />
                                                <input
                                                    id="audioFile"
                                                    name="audioFile"
                                                    onBlur={handleBlur}
                                                    type="file"
                                                    onChange={(e) => {
                                                        const selectedAudioFile =
                                                            e.currentTarget
                                                                .files[0]
                                                        const audioFileReader =
                                                            new FileReader()
                                                        if (selectedAudioFile) {
                                                            audioFileReader.onloadend =
                                                                () => {
                                                                    setSelectedAudioFile(
                                                                        {
                                                                            audioFile:
                                                                                selectedAudioFile,
                                                                            audioPreviewURI:
                                                                                audioFileReader.result,
                                                                        }
                                                                    )
                                                                    audioFileReader.readAsDataURL(
                                                                        selectedAudioFile
                                                                    )
                                                                }
                                                        }
                                                        setFieldValue(
                                                            'audioFile',
                                                            selectedAudioFile
                                                        )
                                                    }}
                                                    multiple={true}
                                                    accept=".mp3,.wav,.x-aiff,audio/mp4"
                                                />
                                                <br />
                                                {errors.audioFile ? (
                                                    <span className="text-xs text-red-500">
                                                        {errors.audioFile}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1 sm:mb-2 text-left mt-5">
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <>
                                        <Button
                                            loading={isSubmitting}
                                            type="submit"
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            onClick={closeShowModal}
                                            color="gray"
                                            type="button"
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CreatePodcastForm
