import { Formik, Form } from 'formik'
import { useContext, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import * as Yup from 'yup'
import React from 'react'
import { InputField } from '../../components/form-fields/InputField'
import Button from '../../components/UIComponents/Button'
import axios from 'axios'
import { UserProfileContext } from '../../hooks/context/UserProfileProvider'

interface IUserProfileValues {
    username: string
    displayName: string
    bio: string
}
const AccountEditForm = ({ userProfile }) => {
    const { setUserUpdated } = useContext(UserProfileContext)
    const [fieldChanged, setFieldChanged] = useState(false)
    const [funcExecuted, setFuncExecuted] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)
    const [errors, setErrors] = useState(null)
    const { getAccessTokenSilently } = useAuth0()
    const existingUserProfileValues: IUserProfileValues = {
        username: userProfile.username,
        displayName: userProfile.displayName,
        bio: userProfile.bio,
    }
    const checkFieldChange = () => {
        if (!funcExecuted) {
            setFieldChanged(true)
            return setFuncExecuted(true)
        }
        return null
    }
    const userProfileValidationSchema = Yup.object({
        username: Yup.string()
            .lowercase()
            .matches(/^[ A-Za-zñáéíóúü0-9_.-]*$/, 'You may only use _ . - ')
            .matches(/^(?![0-9_.-]+$)/, 'Letters are required') // if matches regex
            .min(6, 'Username must be longer than 6 characters')
            .max(32, 'Username is too long')
            .required('Username cannot be left blank'),
        displayName: Yup.string().max(16, 'Display name is too long.'),
        bio: Yup.string().max(64, 'Bio is too long'),
    })

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={
                    userProfile
                        ? existingUserProfileValues
                        : { username: '', displayName: '', bio: '' }
                }
                validationSchema={userProfileValidationSchema}
                onSubmit={async ({
                    username,
                    displayName,
                    bio,
                }: IUserProfileValues) => {
                    const data = { username, displayName, bio }

                    const token = await getAccessTokenSilently()
                    const response = await axios({
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            authorization: `Bearer ${token}`,
                        },
                        method: 'put',
                        url: `http://127.0.0.1:3001/user/${userProfile.userId}`,
                        data: {
                            username: data.username,
                            displayName: data.displayName,
                            bio: data.bio,
                        },
                    })
                        .then(function (response) {
                            setResponseMessage(response.data.message)
                            setErrors(false)
                            setUserUpdated(true)
                        })
                        .catch(function (error) {
                            setResponseMessage(error.response.data.error)
                            setErrors(true)
                        })

                    setFieldChanged(false)
                    setFuncExecuted(false)
                }}
            >
                {/* Can access values because under formik Component, if not, then it would be, formik.values.username || FORMIK props*/}
                {({ setFieldValue, values, isSubmitting, handleSubmit }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                    >
                        {responseMessage && errors ? (
                            <h3 className="text-red-500">
                                📛{responseMessage}
                            </h3>
                        ) : responseMessage && !errors ? (
                            <h3 className="text-green-500">
                                ✅{responseMessage}
                            </h3>
                        ) : null}
                        <div className="mb-1 sm:mb-2 text-left">
                            <InputField
                                label="Username"
                                name="username"
                                value={values.username}
                                onChange={(e) => {
                                    setFieldValue('username', e.target.value)
                                    checkFieldChange()
                                }}
                            />
                        </div>

                        <div className="mb-1 sm:mb-2 text-left">
                            <InputField
                                label="Display Name"
                                name="displayName"
                                value={values.displayName}
                                onChange={(e) => {
                                    setFieldValue('displayName', e.target.value)
                                    checkFieldChange()
                                }}
                            />
                        </div>
                        <div className="mb-1 sm:mb-2 text-left">
                            <InputField
                                label="Bio"
                                name="bio"
                                value={values.bio}
                                onChange={(e) => {
                                    setFieldValue('bio', e.target.value)
                                    checkFieldChange()
                                }}
                            />
                        </div>

                        <div className="mb-1 sm:mb-2 text-left mt-2">
                            <div className="sm:flex sm:flex-row-reverse">
                                {fieldChanged ? (
                                    <>
                                        <Button
                                            loading={isSubmitting}
                                            type="submit"
                                        >
                                            Save Changes
                                        </Button>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AccountEditForm
