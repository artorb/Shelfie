import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";

interface DropdownMenuItemProps {
  text: string;
  to: string;
  icon?: JSX.Element;
  key?: string;
  onClick?: () => void;
}

export const DropdownMenuItem = ({
  text,
  to,
  icon,
  key,
  onClick,
}: DropdownMenuItemProps) => {
  return (
    <>
      <Menu.Item key={key}>
        {({ active }) => (
          <Link
            to={to}
            onClick={onClick}
            className={`${
              active
                ? "bg-primary-100 dark:bg-primary_dark-200 text-white"
                : "text-gray-200"
            } flex rounded-md items-center w-full px-3 py-3 dark:text-gray-300 text-lg`}
          >
            {icon ?? null}
            {text}
          </Link>
        )}
      </Menu.Item>
    </>
  );
};
