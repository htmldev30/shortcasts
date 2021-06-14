import { Formik, Form } from 'formik'
import { InputField } from '../../components/form-fields/InputField'
import Button from '../../components/UIComponents/Button'

interface CreatePodcastFormProps {
    data?: {
        name: string
        description: string
        file: string
    }
    closeShowModal: () => void
}
const CreatePodcastForm = ({
    data,
    closeShowModal,
}: CreatePodcastFormProps) => {
    return (
        <>
            {/* podcastData ? podcastData : name: '' ...  */}
            <Formik<{
                name: string
                description: string
                file: string
            }>
                initialValues={
                    data
                        ? data
                        : {
                              name: '',
                              description: '',
                              file: '',
                          }
                }
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
                                                    name="name"
                                                    label="Name"
                                                    type="text"
                                                    placeholder="a super awesome title"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            'name',
                                                            e.target.value
                                                        )
                                                    }}
                                                    value={values.name}
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
                                                    label="a super awesome podcast file"
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    file={true}
                                                    value={values.file}
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
                                        type="button"
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

export default CreatePodcastForm
