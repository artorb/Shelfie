import {observer} from "mobx-react-lite";
import {IIngredient} from "../../models/ingredient";
import {useStore} from "../../stores/store";
import ModalContainer from "../modals/ModalContainer";
import LoadingComponent from "../LoadingComponent";
import {IStorage} from "../../models/storage";
import {formatDistanceToNow} from "date-fns";
import {useEffect, useState} from "react";
import {Disclosure} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/solid";
import {ListGroup} from "react-bootstrap";

export const colorizeTag = (color: string) => {
    switch (color) {
        case "green":
            return "bg-green-400";
        case "amber":
            return "bg-amber-400";
        case "fuchsia":
            return "bg-fuchsia-400";
        case "sky":
            return "bg-sky-400";
        case "red":
            return "bg-red-400";
        case "blue":
            return "bg-blue-400";
        case "slate":
            return "bg-slate-400";
    }
};

interface Props {
    isLoading: boolean;
    storages?: IStorage[];
    ingredients?: IIngredient[];
    modal: JSX.Element;
}

export default observer(function Dashboard({
                                               isLoading,
                                               ingredients,
                                               storages,
                                               modal,
                                           }: Props) {
        const {ingredientStore, modalStore, storageStore} = useStore();

        const openModal = (id?: string) => {
            if (id === null) {
                modalStore.openModal(modal);
            } else {
                if (ingredients) {
                    ingredientStore.selectIngredient(id);
                    modalStore.openModal(modal);
                } else {
                    storageStore.selectStorage(id);
                    modalStore.openModal(modal);
                }
            }
        };

        const getFormattedDate = (date: Date): string => {
            const distance = formatDistanceToNow(date);
            return date.getTime() < Date.now()
                ? `Expired ${distance} ago`
                : `Expires in ${distance}`;
        };

        if (isLoading)
            return (
                <>
                    <LoadingComponent/>
                </>
            );
        if (storages) {
            return (
                <>
                    <div className="w-full container max-w-3xl mx-4 pt-16">
                        <ModalContainer/>
                        <div
                            className="mx-auto w-full max-w-3xl mb-10 rounded-2xl backdrop-blur backdrop-filter bg-gray-300/60 dark:bg-primary_dark-100 dark:bg-opacity-50 p-2">
                            {storages.map((storage) => {
                                return (
                                    <Disclosure key={storage.id}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                    className="flex w-full my-2 justify-between rounded-2xl bg-primary-100 dark:bg-primary_dark-200/50 px-4 py-4 text-left text-md font-dosis text-gray-100 dark:text-gray-400 hover:bg-primary-200 dark:hover:bg-primary_dark-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 focus-visible:ring-opacity-75">
                                                    <span>{storage?.name}</span>
                                                    <ChevronUpIcon
                                                        className={`${
                                                            open ? "rotate-180 transform duration-300" : ""
                                                        } h-5 w-5 text-gray-300 transform duration-300`}
                                                    />
                                                </Disclosure.Button>
                                                {storage.ingredients?.length > 0 ?
                                                    <Disclosure.Panel
                                                        className="px-4 pt-4 pb-2 text-sm flex flex-col items-center text-gray-500">
                                                        {storage.ingredients?.map((ingredient) => {
                                                            return (
                                                                <div
                                                                    key={ingredient.id}
                                                                    className={`space-y-2 flex items-center justify-center text-center w-full`}>
                                                                    <p key={ingredient.id}
                                                                       className="py-3 text-primary-300 dark:text-gray-400 font-extrabold border-b-2 border-gray-500/40 dark:border-primary_dark-100/40 w-full text-lg">{ingredient.name}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </Disclosure.Panel>
                                                    : null
                                                }
                                            </>
                                        )}
                                    </Disclosure>
                                );
                            })}
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <ul className="w-full shadow-md border-collapse overflow-hidden backdrop-blur backdrop-filter dark:bg-primary_dark-100 dark:bg-opacity-50 px-2 mx-auto bg-gray-300/60 rounded-2xl max-w-3xl">
                    <ModalContainer/>
                    {ingredients.map((ingredient) => {
                        return (
                            <li
                                key={ingredient.id}
                                className="flex bg-gray-200/90 shadow-sm ring-2 dark:ring-0 ring-opacity-20 ring-gray-100 hover:bg-gray-100 hover:bg-opacity-60 rounded-lg my-2 dark:bg-primary_dark-200/50 dark:hover:bg-primary_dark-200 flex-col h-28 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 focus-visible:ring-opacity-75"
                            >
                                <button
                                    onClick={() => openModal(ingredient.id)}
                                    className="h-full rounded-t-lg"
                                    key={`Edit ingredient`}
                                    type={`button`}
                                >
                                    <div className="h-1/2 flex justify-between align-middle w-full">
                                        <div
                                            className="p-4 ml-2 sm:ml-10 my-2 text-gray-500 dark:text-gray-400 font-semibold text-lg">
                                            <p className="">{ingredient.name}</p>
                                        </div>
                                        <div
                                            className={`${colorizeTag(
                                                ingredient.colorTag
                                            )} inline-block rounded-full my-4 mx-4 px-3 py-3 mt-6 mr-4 sm:mr-12`}
                                        ></div>
                                    </div>
                                    <div className="w-full flex flex-nowrap justify-between h-1/2">
                                        <p className="text-sm bg-primary-200 font-dosis dark:bg-indigo-100/[0.1] rounded-lg mx-6 mt-4 sm:mx-14 px-2 py-0.5 h-6 text-gray-100 dark:text-gray-400">
                                            {/*//FIX ME - ?*/}
                                            {ingredient.storage?.name ?? "No storage"}
                                        </p>
                                        <p className="mx-4 sm:mx-12 shrink-0 py-2 text-sm font-dosis dark:text-gray-400 text-gray-600 mt-2">
                                            {getFormattedDate(ingredient.expirationDate)}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
);
