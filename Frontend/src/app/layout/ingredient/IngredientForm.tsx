import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {useStore} from "../../stores/store";
import {useEffect, useState} from "react";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import {IIngredient} from "../../models/ingredient";
import {format} from "date-fns";
import StorageListBox from "../storage/StorageListBox";
import SpinnerIcon from "../SpinnerIcon";

export default observer(function IngredientForm() {
    const {ingredientStore, modalStore, storageStore} = useStore();

    const {selectedIngredient, cancelSelectedIngredient} = ingredientStore;
    const [ingredient, setIngredient] = useState<IIngredient>(selectedIngredient || null);

    const {getStorages, selectedStorage} = storageStore;

    useEffect(() => {
        setIngredient(ingredientStore.selectedIngredient);
    }, [ingredientStore])

    const validationSchemaIngredient = Yup.object({
        storageId: Yup.string(),
        name: Yup.string().required('Name is required'),
        amountUnits: Yup.number().min(0, 'Cannot be negative'),
        colorTag: Yup.string(),
        carbs: Yup.number().min(0, 'Cannot be negative').max(1000),
        fats: Yup.number().min(0, 'Cannot be negative').max(1000),
        proteins: Yup.number().min(0, 'Cannot be negative').max(1000),
        weight: Yup.number().min(0, 'Cannot be negative'),
        calories: Yup.number().min(0, 'Cannot be negative').max(10000),
        expirationDate: Yup.date(),
        type: Yup.string(),
    })


    const handleClose = () => {
        ingredientStore.cancelSelectedIngredient();
        storageStore.cancelSelectedStorage();
        setIngredient(null);
        modalStore.closeModal();
    }

    const handleSubmitButton = async (values) => {
        try {
            runInAction(() => {
                if (ingredient?.id) {
                    ingredientStore.updateIngredient(values);
                    handleClose();
                } else {
                    setIngredient(null);
                }
            })
        } catch (err) {
            throw new Error(err);
        }
    }

    let x = format(new Date(), 'yyyy-MM-dd');


    return (
        <>
            <div
                className="bg-gray-100 bg-opacity-90 dark:bg-slate-900 rounded-md p-2 flex flex-col md:ml-auto w-full xs:w-4/5 mx-auto mt-2 md:mt-0">
                <h2 className="text-gray-700 text-center dark:text-gray-400 text-3xl font-medium title-font mb-6">
                    {(ingredient?.id) ? 'Edit ingredient' : 'Create ingredient'}
                </h2>
                <div className="relative mb-4">
                    <Formik
                        validationSchema={validationSchemaIngredient}
                        initialValues={{
                            // storageId: ingredient?.storage.id ?? getStorages[0].id,
                            storageId: ingredient?.storage.id ?? selectedStorage?.id,
                            id: ingredient?.id ?? '',
                            name: ingredient?.name ?? '',
                            amountUnits: ingredient?.amountUnits ?? 0,
                            colorTag: ingredient?.colorTag ?? 'slate',
                            carbs: ingredient?.carbs ?? 0,
                            fats: ingredient?.fats ?? 0,
                            proteins: ingredient?.proteins ?? 0,
                            weight: ingredient?.weight ?? 0,
                            calories: ingredient?.calories ?? 0,
                            expirationDate: (ingredient?.expirationDate) ? new Date(ingredient?.expirationDate).toISOString().slice(0, 10) : format(new Date(), 'yyyy-MM-dd'),
                            type: ingredient?.type ?? '',
                            error: null
                        }}
                        onSubmit={async (values, {setErrors}) => {
                            await modalStore.sleep(500);
                            handleSubmitButton(values).catch((error) => {
                                setErrors({error: 'Error'});
                            })
                        }
                        }
                    >
                        {({handleSubmit, isSubmitting, errors}) => (
                            <Form className={``} onSubmit={handleSubmit} onAbort={handleClose} onSuspend={handleClose}
                                  onReset={handleClose}>
                                <div className={`flex flex-col`}>
                                    <label className={`mb-1 text-sm`}>Name</label>
                                    <Field
                                        type={`text`}
                                        name={`name`}
                                        required
                                        className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                    </Field>
                                    <ErrorMessage name='name' render={error => <p
                                        className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                </div>
                                <div className={`flex my-2 flex-col`}>
                                    <label className={`mb-1 text-sm`}>Amount of units</label>
                                    <Field
                                        type={`number`}
                                        name={`amountUnits`}
                                        className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                    </Field>
                                    <ErrorMessage name='amountUnits' render={error => <p
                                        className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                </div>
                                <div className={`grid grid-cols-3 gap-4`}>
                                    <div className={``}>
                                        <label className={`text-xs`}>Carbs</label>
                                        <Field
                                            type={`number`}
                                            name={`carbs`}
                                            className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        </Field>
                                        <ErrorMessage name='carbs' render={error => <p
                                            className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                    </div>
                                    <div>
                                        <label className={`text-xs`}>Fats</label>
                                        <Field
                                            type={`number`}
                                            name={`fats`}
                                            className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        </Field>
                                        <ErrorMessage name='fats' render={error => <p
                                            className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                    </div>
                                    <div>
                                        <label className={`text-xs`}>Proteins</label>
                                        <Field
                                            type={`number`}
                                            name={`proteins`}
                                            className="w-full p-4 bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        </Field>
                                        <ErrorMessage name='proteins' render={error => <p
                                            className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                    </div>
                                </div>
                                <div className={`grid grid-cols-2 gap-8`}>
                                    <div className={``}>
                                        <label className={`text-sm mb-1`}>Calories</label>
                                        <Field
                                            type={`number`}
                                            name={`calories`}
                                            className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        </Field>
                                        <ErrorMessage name='calories' render={error => <p
                                            className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                    </div>
                                    <div>
                                        <label className={`text-sm mb-1`}>Weight</label>
                                        <Field
                                            type={`number`}
                                            name={`weight`}
                                            className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        </Field>
                                        <ErrorMessage name='weight' render={error => <p
                                            className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                    </div>
                                </div>
                                <label className={`text-sm mb-1`}>Type</label>
                                <Field
                                    type={`text`}
                                    name={`type`}
                                    className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                </Field>
                                <ErrorMessage name='type' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                <label className={`text-sm mb-1`}>Color tag</label>
                                <Field
                                    type={`text`}
                                    name={`colorTag`}
                                    className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                </Field>
                                <ErrorMessage name='type' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                <label className={`text-sm mb-1`}>Expiration date</label>
                                <Field
                                    type={`date`}
                                    name={`expirationDate`}
                                    className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                </Field>
                                <ErrorMessage name='expirationDate' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>

                                <label className={`text-sm mb-1`}>Storage</label>
                                <Field
                                    component={StorageListBox}
                                    name={`storageId`}
                                    className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                </Field>
                                <ErrorMessage name='storageId' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                <hr className={`mt-4 w-full`}/>
                                <button
                                    type="submit"
                                    className="w-full btn-primary flex justify-center  py-4 px-4 border border-transparent text-sm text-center text-base mt-4 font-semibold rounded-md text-white dark:text-indigo-200 bg-[#354F52] hover:bg-teal-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 dark:focus:ring-indigo-500"
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
})