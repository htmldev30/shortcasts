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
                          }
                }
                validationSchema={podcastValidationSchema}
                onSubmit={async ({
                    title,
                    description,
                    episode,
                }: IPodcastValues) => {
                    const formData = {
                        title,
                        description,
                        episode,
                    }

                    const allData = new FormData()

                    allData.append('title', title)
                    allData.append('description', description)
                    allData.append('episode', episode)

                    const token = await getAccessTokenSilently()
                    const response = await axios({
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            authorization: `Bearer ${token}`,
                        },
                        method: 'put',
                        url: `http://127.0.0.1:3001/user-podcast/${podcastData.creatorId}/${podcastData.podcastId}`,
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
                                            Update Podcast
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
