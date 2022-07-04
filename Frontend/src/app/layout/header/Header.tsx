import UserMenuDropdown from "./UserMenuDropdown";

import logo from "./../../../assets/carrot.png"
import NotificationDropdown from "./NotificationDropdown";
import HeaderLink from "./HeaderLink";
import DarkmodeButton from "./DarkmodeButton";
import HamburgerMenu from "./HamburgerMenu";
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <>
            <div className="container z-30 sticky top-0 max-w-full">
                <header className="shadow-md bg-opacity-60 w-full h-full">
                    <nav
                        className="shadow bg-gradient-to-l bg-metallic-500 dark:from-gray-900 dark:to-[#131138] dark:bg-indigo-900">
                        <div className="container px-8 pt-6 sm:py-6 mx-auto">
                            <div className="xs:flex xs:flex-wrap xs:items-center xs:justify-between">
                                <div className="flex items-center justify-between w-full">
                                    <Link to={'/'} className={`mb-2 flex group font-chakra font-semibold text-4xl sm:text-5xl text-gray-100 dark:text-gray-300 hover:text-white hover: hover:duration-500 dark:hover:text-gray-100`}>
                                        <img src={logo} alt="logo"
                                             className="inline-block group-hover:opacity-100 dark:invert opacity-80 transition-opacity duration-300 align-baseline h-10 w-10 mr-2"></img>
                                        Hylla
                                    </Link>

                                    {/*<div className="flex justify-end w-full max-w-sm mb-2 md:hidden">*/}
                                    {/*    <HamburgerMenu/>*/}
                                    {/*</div>*/}

                                    <div
                                        className="flex-1 sm:hidden md:flex md:items-center justify-end lg:justify-end ">
                                        <div
                                            className="flex hidden lg:block flex-col -mx-4 md:flex-row md:items-center md:mx-8">
                                            <HeaderLink text={'Dashboard'} id={'navbar-dashboard'} to={'/dashboard'}/>
                                            <HeaderLink text={'Storage'} id={'navbar-storages'} to={'/storage'}/>
                                            <HeaderLink text={'Recipes'} id={'navbar-recipes'} to={'/recipes'}/>
                                            <HeaderLink text={'Statistics'} id={'navbar-statistics'}
                                                        to={'/statistics'}/>
                                        </div>

                                        <div className="flex items-center mt-4 md:mt-0">
                                            <DarkmodeButton/>
                                            <NotificationDropdown/>
                                            <UserMenuDropdown/>
                                        </div>
                                    </div>

                                    <div className="flex justify-end max-w-sm mb-2 md:hidden">
                                        <HamburgerMenu/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}