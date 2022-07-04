import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {useStore} from "../../stores/store";
import {IStorage} from "../../models/storage";

export default function StorageListBox() {
    const {storageStore, ingredientStore} = useStore();
    const {getStorages, selectStorage, selectedStorage} = storageStore;

    const {selectedIngredient} = ingredientStore;

    const [selected, setSelected] = useState(selectedIngredient?.storage|| getStorages[0])


    const [storageSelected, setStorageSelected] = useState(selectedStorage);

    // const handleEditOrCreate = () => {
    //     if(selectedIngredient?.id) {
    //         selectStorage(selectedIngredient.storage.id);
    //     } else {
    //         selectStorage(getStorages[0].id);
    //     }
    // }

    useEffect(() => {
        return () => {
            if(selectedIngredient?.id) {
                selectStorage(selectedIngredient?.storage.id);
                setStorageSelected(selectedIngredient.storage);
            } else {
                selectStorage(getStorages[0].id);
                setStorageSelected(getStorages[0]);
            }
            setSelected(selectedIngredient?.storage || getStorages[0]);
        };
    }, [getStorages, selectStorage, selectedIngredient?.id, selectedIngredient?.storage]);

    const handleSelected = (storage: IStorage) => {
        selectStorage(storage.id);
        setStorageSelected(storage);
        setSelected(storage);
    }

    return (
        <>
            <div className="w-full">
                {/*<Listbox value={selected} onChange={(storage) => setSelected(storage)}>*/}
                {/*<Listbox value={selected} onChange={setSelected}>*/}
                <Listbox value={storageSelected} onChange={setStorageSelected}>
                    <div className="relative mt-1">
                        <Listbox.Button
                            className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            {/*className="relative w-full cursor-default rounded border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">*/}
                            <span className="block truncate">{selected?.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute mt-1 max-h-32 w-full overflow-auto scrollbar-hide rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {getStorages.map((storage) => (
                                    <Listbox.Option
                                        key={storage.id}
                                        onClick={() => handleSelected(storage)}
                                        as={"div"}
                                        className={({active}) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-primary-200/80 text-gray-200' : 'text-gray-900'
                                            }`
                                        }
                                        value={storage.name}
                                    >
                                        {({selected}) => (
                                            <>
                                               <span
                                                   className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                   {storage.name}
                                               </span>
                                                {selected ? (
                                                    <span
                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </>
    )
}