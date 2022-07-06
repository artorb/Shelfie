import {Popover, Transition} from "@headlessui/react";
import {observer} from "mobx-react-lite";
import {Fragment} from "react";
import {useStore} from "../../stores/store";
import {colorizeTag} from "../dashboard/Dashboard";
import {Link} from "react-router-dom";
import {formatDistanceToNow} from "date-fns";

export default observer(function NotificationDropdown() {
    const {ingredientStore} = useStore();
    const {expiringIngredients} = ingredientStore;

    return (
        <div className="hidden md:block focus:outline-none">
            <Popover className="relative inline-block">
                {({open}) => (
                    <>
                        <Popover.Button
                            aria-label={`notification-button`}
                            className="inline-flex justify-center
                                            rounded-full outline-2 px-1.5 py-1.5 mx-4 text-sm font-medium text-white bg-sky-200 bg-opacity-20
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <svg
                                className={`${expiringIngredients.length === 0 ? 'text-gray-200' : 'animate-pulse text-amber-100 dark:text-indigo-300 dark:group-hover:text-indigo-100 group-hover:text-amber-200'} w-10 h-10 stroke-current transition-colors duration-200`}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="fixed z-10 mt-8 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="relative h-[786px] lg:h-96 overflow-scroll scrollbar-hide grid gap-8 bg-gray-200 dark:bg-primary_dark-100 p-7 grid-cols-1 lg:grid-cols-2">
                                        {expiringIngredients.map((item) => (
                                            <Link to={`ingredients/${item.id}`}
                                                  key={item?.id}
                                                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-300 dark:hover:bg-primary_dark-200/30 focus:outline-none focus-visible:ring focus-visible:ring-primary-100/20 focus-visible:ring-opacity-50"
                                            >
                                                <div
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200 flex">
                                                        {item?.name}
                                                        <p
                                                            className={`${colorizeTag(item.colorTag)} rounded-full my-auto ml-2 w-3 h-3`}>
                                                        </p>
                                                    </p>
                                                    <p className="text-sm mt-1 text-gray-500 dark:text-gray-200">
                                                        <p className="">{formatDistanceToNow(item.expirationDate) + ' left'}</p>
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div
                                        className="bg-gray-300 dark:bg-primary_dark-100 dark:border-gray-100/10 border-t-2 border-gray-400/20 p-4">
                                        <div
                                            className="flow-root hover:cursor-default rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-400/20 dark:hover:bg-primary_dark-200/30  focus:outline-none"
                                        >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          Soon to be expired
                        </span>
                      </span>
                                            <span className="block text-sm text-gray-500 dark:text-gray-200">
                        These edibles have 30 or less days until the expiration date.
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
})
