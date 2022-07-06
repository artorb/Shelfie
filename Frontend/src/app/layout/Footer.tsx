export default function Footer() {
    return (
        <>
            <footer
                className="flex flex-col flex-shrink-0 text-center bg-[#2F3E46] dark:bg-[#111827] bottom-0 inset-x-0">
                <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex justify-center space-x-6">
                            <a
                                className="text-[#84A98C] dark:text-indigo-200 text-opacity-80 hover:text-opacity-100"
                                href="/github.com/artorb"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </a>

                            <a
                                className="text-[#84A98C] dark:text-indigo-200 text-opacity-80 hover:text-opacity-100"
                                href="/linkedin"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="w-8 h-8 bi bi-linkedin" viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                </svg>
                            </a>
                        </div>

                        <div className="">
                            <nav
                                className="flex flex-wrap justify-center gap-8 p-4 text-sm border-2 border-[#CAD2C5]/[0.1] dark:border-gray-800/30 rounded-xl">
                                <a
                                    className="hover:opacity-100 opacity-80 text-[#CAD2C5] dark:text-indigo-200"
                                    href="mailto:arty@gmail.com FIXME"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="w-6 h-6 inline-block mr-2 align-center" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    Email
                                </a>

                                <a
                                    className="hover:opacity-100 opacity-80 text-[#CAD2C5] dark:text-indigo-200"
                                    href="https://github.com/artorb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="w-6 h-6 inline-block mr-2 align-center" fill="none"
                                         stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                                    </svg>
                                    Repository
                                </a>
                            </nav>
                        </div>

                        <p className="max-w-lg mx-auto text-xs text-[#84A98C] dark:text-indigo-200">
                            This app stores and tracks your groceries. Annual statistics and recipes features included!
                        </p>

                        <p className="text-md text-[#CAD2C5] dark:text-indigo-200 font-medium">2022 Artem Zhylieiev</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
