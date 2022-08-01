import { observer } from "mobx-react-lite";
import ModalContainer from "../modals/ModalContainer";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Storage } from "../../models/storage";

interface Props {
  storages?: Storage[];
}

export default observer(function StorageDashboard({ storages }: Props) {
  return (
    <>
      <div className="w-full container grid grid-cols-4 mx-4">
        <ModalContainer />
        <div className="mx-auto w-full rounded-2xl col-span-4 col-start-1 xl:col-span-2 xl:col-start-2 backdrop-blur backdrop-filter bg-gray-300/60 dark:bg-primary_dark-100 dark:bg-opacity-50 p-2">
          {storages.map((storage) => {
            return (
              <Disclosure key={storage.id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center col-span-2 my-2 justify-between rounded-2xl bg-primary-100 dark:bg-primary_dark-200/50 px-8 py-2 md:py-4 text-left text-md text-gray-100 dark:text-gray-400 hover:bg-primary-200 dark:hover:bg-primary_dark-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 focus-visible:ring-opacity-75">
                      <span className={`text-sm sm:text-lg`}>
                        {storage?.name}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform duration-300" : ""
                        } h-5 w-5 text-gray-300 transform duration-300`}
                      />
                    </Disclosure.Button>
                    {storage.ingredients?.length > 0 ? (
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm flex flex-col items-center text-gray-500">
                        {storage.ingredients?.map((ingredient) => {
                          return (
                            <div
                              key={ingredient.id}
                              className={`space-y-2 flex items-center justify-center text-center w-full`}
                            >
                              <p
                                key={ingredient.id}
                                className="py-3 text-[#1a1110] dark:text-gray-400 border-b-2 border-gray-500/40 dark:border-primary_dark-100/40 w-full text-xs sm:text-md lg:text-lg"
                              >
                                {ingredient.name}
                              </p>
                            </div>
                          );
                        })}
                      </Disclosure.Panel>
                    ) : null}
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    </>
  );
});
