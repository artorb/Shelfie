import { Link } from "react-router-dom";

interface Props {
  text: string;
  id: string;
  to: string;
}

export const HeaderLink = ({ id, to, text }: Props) => {
  return (
    <>
      <Link
        id={id}
        to={to}
        className="px-3 py-2 mx-2 mt-2 text-xl font-inter font-semibold text-gray-200 transition-colors duration-200 dark:duration-500 transform rounded-md md:mt-0 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-emerald-100/[0.1] dark:hover:bg-primary_dark-100/[0.4]"
      >
        {text}
      </Link>
    </>
  );
};
