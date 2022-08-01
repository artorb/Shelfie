import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { DropdownMenuItem } from "../../components/";
import { CogIcon, LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import { useStore } from "../../stores/store";
import { useLocalObservable } from "mobx-react-lite";
import RegisterForm from "../account/Forms/RegisterForm";
import { DropdownMenuToggleDarkmode } from "../../components/";

const HamburgerMenu = () => {
  const { userStore, modalStore } = useStore();

  const userInfo = useLocalObservable(() => ({
    logged: false,
    setLogged(value: boolean) {
      this.logged = value;
    },
  }));

  useEffect(() => {
    userInfo.setLogged(userStore.isLoggedIn);
  }, [userInfo, userStore.isLoggedIn]);

  return (
    <>
      <div className="flex items-center transition-color duration-200 focus:outline-none">
        <Menu as="div" className="relative inline-block text-left">
          <div className="group">
            <Menu.Button
              aria-label={`user-menu`}
              className="inline-flex justify-center
                    rounded-full outline-2 px-0.5 py-0.5 text-sm font-medium text-white bg-gray-200 bg-opacity-20
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <svg
                aria-hidden="true"
                className="w-10 h-10 stroke-current group-hover:text-white transition-colors duration-200 text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 center-block w-64 mt-2 origin-top-right bg-metallic-100 divide-y-2 divide-gray-500/50 dark:divide-gray-600/20 rounded-md shadow-lg ring-2 ring-primary-100/50 dark:ring-indigo-700/50 focus:outline-none">
              <div className="px-2 py-2 bg-metallic-400 dark:bg-primary_dark-100 rounded-t-md">
                <DropdownMenuToggleDarkmode />
                {userInfo.logged && (
                  <div>
                    <DropdownMenuItem text={"Dashboard"} to={"/dashboard"} />
                    <DropdownMenuItem text={"Storages"} to={"/storage"} />
                    <DropdownMenuItem text={"Recipes"} to={"/recipes"} />
                    <DropdownMenuItem text={"Statistics"} to={"/statistics"} />
                  </div>
                )}
              </div>
              <div className="dark:bg-primary_dark-100/90 bg-metallic-300 rounded-b-md dark:divide-y-2 dark:divide-gray-600/20">
                {userInfo.logged && (
                  <div>
                    <div className="px-2 py-2">
                      <DropdownMenuItem
                        text={"Settings"}
                        to={"/settings"}
                        icon={<CogIcon className="w-6 h-6 mr-1" />}
                      />
                    </div>

                    <div className="px-2 py-2">
                      <DropdownMenuItem
                        text={"Logout"}
                        to={"/"}
                        icon={<LogoutIcon className="w-6 h-6 mr-1" />}
                      />
                    </div>
                  </div>
                )}
                {!userInfo.logged && (
                  <div className="px-2 py-2">
                    <DropdownMenuItem
                      text={"Sign up"}
                      to={"/login"}
                      icon={<LoginIcon className="w-6 h-6 mr-1" />}
                      onClick={() => modalStore.openModal(<RegisterForm />)}
                    />
                  </div>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default HamburgerMenu;
