import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store";
import React, {Fragment} from 'react';
import {Dialog, Transition,} from "@headlessui/react";
import {runInAction} from "mobx";

export default observer(function ModalContainer() {
    const {modalStore, storageStore, ingredientStore} = useStore();

    const {selectedIngredient, cancelSelectedIngredient} = ingredientStore;
    const {cancelSelectedStorage} = storageStore;

    const closeModal = async () => {
        try {
            runInAction(() => {
                cancelSelectedIngredient();
                cancelSelectedStorage();
                modalStore.closeModal();
            });
        } catch (er) {
            throw new Error(er);
        }
    };

    return (
        <>
            <Transition.Root appear show={modalStore.modal.open} as={Fragment}>
                <Dialog as="div" className="relative z-40" open={modalStore.modal.open} onClose={closeModal}>
                    {/*<Dialog as="div" className="relative z-40" onClose={() => console.log('CLIEKR')}>*/}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-gray-900 backdrop-filter backdrop-blur dark:bg-indigo-500 bg-opacity-30"/>
                    </Transition.Child>

                    <div className="fixed z-40 inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-start sm:items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="relative w-full max-w-md dark:bg-indigo-800 transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <div className={`flex justify-between`}>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-5 text-gray-900"
                                        >
                                            {modalStore.modal.title}
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            className="inline-block justify-center px-2 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                            onClick={() => modalStore.closeModal()}
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
                                    {modalStore.modal.body}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
})