import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {useStore} from "../../stores/store";
import {runInAction} from "mobx";
import {IStorage} from "../../models/storage";
import {useEffect, useState} from "react";
import SpinnerIcon from "../SpinnerIcon";

export default function StorageForm() {
    const {storageStore, modalStore} = useStore();

    const {selectedStorage, cancelSelectedStorage} = storageStore;
    const [storage, setStorage] = useState<IStorage>(selectedStorage || null);

    const validationSchemaStorage = Yup.object({
        name: Yup.string().required('Storage has to have a name').min(4).max(20)
    })

    useEffect(() => {
        setStorage(storageStore.selectedStorage);
    }, [storageStore])

    const handleClose = () => {
        storageStore.cancelSelectedStorage();
        setStorage(null);
        modalStore.closeModal();
    }

    const handleSubmitButton = async (values) => {
        try {
            runInAction(() => {
                if (storage?.id) {
                    storageStore.updateStorage(values);
                    handleClose();
                } else {
                    storageStore.createStorage(values);
                    storageStore.cancelSelectedStorage();
                    setStorage(null);
                }
            })
        } catch (err) {
            throw new Error(err);
        }
    }
    return (
        <>
            <div
                className="bg-gray-100 bg-opacity-90 dark:bg-slate-900 rounded-md p-2 flex flex-col md:ml-auto w-full xs:w-4/5 mx-auto mt-4 md:mt-0">
                <h2 className="text-gray-700 text-center mt-2 dark:text-gray-400 text-3xl font-medium title-font mb-5">
                    {(storage?.id) ? 'Edit storage' : 'Create storage'}
                </h2>
                <div className="relative mb-4">
                    <Formik
                        validationSchema={validationSchemaStorage}
                        initialValues={{id: storage?.id ?? '', name: storage?.name ?? '', error: null}}
                        onSubmit={async (values, {setErrors}) => {
                            await modalStore.sleep(500);
                            handleSubmitButton(values).catch((error) => {
                                setErrors({error: error})
                            })
                        }
                        }
                    >
                        {({handleSubmit, isSubmitting, errors}) => (
                            <Form className={``} onSubmit={handleSubmit} onAbort={handleClose} onSuspend={handleClose}
                                  onReset={handleClose}>
                                <Field
                                    type={`text`}
                                    name={`name`}
                                    placeholder={`Storage name`}
                                    required
                                    className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                </Field>
                                <ErrorMessage name='name' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                <hr className={`mt-4`}/>
                                <button
                                    type="submit"
                                    className="w-full btn-primary flex justify-center py-4 px-4 border border-transparent text-sm text-center text-base mt-4 font-semibold rounded-md text-white dark:text-indigo-200 bg-[#354F52] hover:bg-teal-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 dark:focus:ring-indigo-500"
                                >
                                    {isSubmitting ? <SpinnerIcon/> : 'Submit'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}