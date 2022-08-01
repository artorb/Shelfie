import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useDark } from "./darkmode";

export const DarkmodeButton = () => {
  const { dark } = useDark();
  const { isDark, setDark } = dark;

  const [darkmode, setDarkmode] = useState(isDark);
  useEffect(() => {
    setDark(darkmode);
  }, [darkmode]);

  return (
    <>
      <button
        className="hidden px-1.5 py-1.5 rounded-full bg-sky-200 bg-opacity-20 text-gray-200 transition-colors duration-200 transform md:block dark:text-gray-400 hover:text-indigo-300 dark:hover:text-yellow-200 focus:text-indigo-400 dark:focus:text-yellow-200 focus:outline-none"
        aria-label="show notifications"
        onClick={() => setDarkmode(!darkmode)}
      >
        {darkmode ? (
          <SunIcon className={`w-10 h-10`} />
        ) : (
          <MoonIcon className={`w-10 h-10`} />
        )}
      </button>
    </>
  );
};
