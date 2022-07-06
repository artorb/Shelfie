import {Dialog, Transition} from "@headlessui/react";
import {observer} from "mobx-react-lite";
import {ChangeEvent, Fragment, useState} from "react";
import {IIngredient} from "../../models/ingredient";
import {useStore} from "../../stores/store";

export default observer(function IngredientModal() {
    let [isOpen, setIsOpen] = useState(false)

    const {ingredientStore} = useStore();
    const {
        closeForm,
        selectedIngredient,
        createIngredient,
        updateIngredient,
    } = ingredientStore;

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const initState: IIngredient = selectedIngredient ?? {
        name: '',
        amountUnits: 0,
        colorTag: 'slate',
        carbs: 0,
        fats: 0,
        proteins: 0,
        weight: 0,
        calories: 0,
        expirationDate: null,
        storage: null,
        type: '',
        picture: '',
    }

    const [ingredient, setIngredient] = useState(initState);

    function handleSubmit() {
        ingredient.id ? updateIngredient(ingredient) : createIngredient(ingredient);
    }

    function handleInputChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const {name, value} = event.target;
        setIngredient({...ingredient, [name]: value});
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-100 dark:bg-indigo-400 shadow-xl rounded-2xl">
                                <div className="flex justify-between ">
                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg font-semibold capitalize leading-6 text-sky-500 dark:text-indigo-200"
                                    >
                                        Create Ingredient
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="inline-block justify-center px-2 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                        onClick={closeModal}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div
                                    className="flex flex-col mt-8 my-4 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                                    <form onSubmit={handleSubmit} autoComplete="off">
                                        <input id="ingredientName"
                                               name="name"
                                               type="text"
                                               placeholder="Name"
                                               value={ingredient.name}
                                               onChange={handleInputChange}
                                               className="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 dark:bg-indigo-500 dark:text-indigo-200 dark:placeholder-indigo-200 dark:border-indigo-700 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-40"/>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center tracking-wide capitalize px-4 py-2.5 text-sm font-medium text-sky-900 bg-sky-100 dark:bg-indigo-600 dark:text-indigo-100 border border-transparent rounded-md hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            Done
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
})
