import { Formik, Form } from 'formik'
import React from 'react'
import { InputField } from '../../components/form-fields/InputField'
import Button from '../../components/UIComponents/Button'

const AccountEditForm = ({ userProfile }) => {
    return (
        <>
            <Formik
                initialValues={
                    userProfile
                        ? userProfile
                        : { username: '', displayName: '', avatar: '' }
                }
                validateOnChange={false}
                validateOnBlur={false}
            >
                {/* Can access values because under formik Component, if not, then it would be, formik.values.username || FORMIK props*/}
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form>
                        <div className="mb-1 sm:mb-2 text-left">
                            <InputField
                                label="Display Name"
                                name="displayName"
                                values={values.displayName}
                                onChange={(e) => {
                                    setFieldValue('displayName', e.target.value)
                                }}
                                disabled
                            />
                        </div>
                        <div className="mb-1 sm:mb-2 text-left">
                            <InputField
                                label="Username"
                                name="username"
                                values={values.username}
                                onChange={(e) => {
                                    setFieldValue('username', e.target.value)
                                }}
                                disabled
                            />
                        </div>
                        <div className="mb-1 sm:mb-2 text-left">
                            <InputField
                                label="Avatar Url"
                                name="avatar"
                                values={values.avatar}
                                onChange={(e) => {
                                    setFieldValue('avatar', e.target.value)
                                }}
                                disabled
                            />
                        </div>

                        <div className="mb-1 sm:mb-2 text-left mt-2">
                            <div className="sm:flex sm:flex-row-reverse">
                                <Button type="submit">Save Changes</Button>

                                <Button
                                    type="button"
                                    className="mt-2"
                                    color="gray"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AccountEditForm
