import { Formik, Form } from 'formik'
import { InputField } from '../../components/form-fields/InputField'
import Button from '../../components/UIComponents/Button'

const EditPodcastForm = ({
    podcastName,
    podcastDescription,
    podcastFile,
    closeShowModal,
}) => {
    return (
        <>
            {/* podcastData ? podcastData : podcastName: '' ...  */}
            <Formik
                initialValues={{
                    podcastName: '',
                    podcastDescription: '',
                    podcastFile: '',
                }}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {/* Can access values because under formik Component, if not, then it would be, formik.values.username || FORMIK props*/}
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium text-text-500">
                                            Edit Podcast
                                        </h3>

                                        <div className="mt-2">
                                            <div className="mb-1 sm:mb-2 text-left">
                                                <InputField
                                                    name="podcastName"
                                                    label="Name"
                                                    type="text"
                                                    placeholder="a super awesome title"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'podcastName',
                                                            e.target.value
                                                        )
                                                    }}
                                                    value={values.podcastName}
                                                />
                                            </div>
                                            <div className="mb-1 sm:mb-2 text-left">
                                                <InputField
                                                    name="podcastDescription"
                                                    label="Description"
                                                    type="text"
                                                    placeholder="a super awesome description"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'podcastDescription',
                                                            e.target.value
                                                        )
                                                    }}
                                                    value={
                                                        values.podcastDescription
                                                    }
                                                />
                                            </div>
                                            <div className="mb-1 sm:mb-2 text-left">
                                                <InputField
                                                    label="a super awesome podcast file"
                                                    id="podcastFile"
                                                    name="podcastFile"
                                                    type="file"
                                                    file={true}
                                                    value={values.podcastFile}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1 sm:mb-2 text-left mt-5">
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <Button type="submit">Save Changes</Button>
                                    <Button
                                        onClick={closeShowModal}
                                        color="gray"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditPodcastForm
