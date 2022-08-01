import { Menu, Transition } from "@headlessui/react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useStore } from "../../stores/store";
import { DropdownMenuItem } from "../../components/";
import { CogIcon, LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import RegisterForm from "../account/Forms/RegisterForm";

export default observer(function UserMenuDropDown() {
  const { userStore, modalStore } = useStore();
  const { logout } = userStore;

  const userInfo = useLocalObservable(() => ({
    logged: false,
    setLogged(value: boolean) {
      this.logged = value;
    },
  }));

  useEffect(() => {
    userInfo.setLogged(userStore.isLoggedIn);
  }, [userInfo, userStore.isLoggedIn]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="hidden md:block flex items-center transition-color duration-200 focus:outline-none">
      <Menu as="div" className="relative inline-block text-left">
        <div className="group">
          <Menu.Button
            aria-label={`user-dropdown-menu`}
            className="inline-flex justify-center
                    rounded-full outline-2 px-1.5 py-1.5 text-sm font-medium text-white bg-sky-200 bg-opacity-20 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <svg
              className="w-10 h-10 stroke-current group-hover:text-white transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-200 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
          <Menu.Items className="absolute right-0 center-block w-48 mt-2 origin-top-right bg-metallic-200 shadow-inner dark:bg-gray-800 divide-y-2 divide-gray-100/10 dark:divide-gray-600/20 rounded-md shadow-lg ring-2 ring-primary-100/50 dark:ring-indigo-700/50 focus:outline-none">
            {userInfo.logged && (
              <div>
                <div className="px-2 py-2 bg-metallic-400 dark:bg-primary_dark-100 rounded-t-md">
                  <DropdownMenuItem
                    text={"Settings"}
                    to={"/settings"}
                    icon={<CogIcon className="w-6 h-6 mr-1" />}
                  />
                </div>
                <div className="px-2 py-2 bg-metallic-400 dark:bg-primary_dark-100 rounded-b-md">
                  <DropdownMenuItem
                    text={"Logout"}
                    to={"/login"}
                    icon={<LogoutIcon className="w-6 h-6 mr-1" />}
                    onClick={handleLogout}
                  />
                </div>
              </div>
            )}
            {!userInfo.logged && (
              <div className="px-2 py-2 bg-metallic-400 dark:bg-primary_dark-100 rounded-b-md">
                <DropdownMenuItem
                  text={"Sign up"}
                  to={"/login"}
                  icon={<LoginIcon className="w-6 h-6 mr-1" />}
                  onClick={() => modalStore.openModal(<RegisterForm />)}
                />
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
});
