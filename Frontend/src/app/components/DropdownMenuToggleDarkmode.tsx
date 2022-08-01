import { Menu, Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDark } from "./darkmode";

interface Props {
  key?: string;
}

export const DropdownMenuToggleDarkmode = ({ key }: Props) => {
  const { dark } = useDark();
  const { isDark, setDark } = dark;

  const [darkmode, setDarkmode] = useState(isDark);
  useEffect(() => {
    setDark(darkmode);
  }, [darkmode, setDark]);

  const handleChange = () => {
    setDarkmode(!darkmode);
  };
  return (
    <>
      <Menu.Item key={key}>
        <div className={`flex h-16 items-center justify-center`}>
          <label
            htmlFor={"darkMode"}
            className={`text-white text-md flex w-full justify-between mx-4 items-center`}
          >
            Darkmode
            <Switch
              checked={darkmode}
              onChange={() => handleChange()}
              className={`${
                darkmode ? "dark:bg-primary_dark-300" : "bg-primary-300"
              }
          relative inline-flex items-center  h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${darkmode ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </label>
        </div>
      </Menu.Item>
    </>
  );
};
