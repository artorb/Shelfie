export default function LoadingComponent() {
    return (
        <>
            <div
                className={`bg-gradient-to-b from-primary-100 to-transparent dark:from-primary_dark-100/50 dark:to-transparent backdrop-blur backdrop-filter bg-opacity-50 w-full h-screen flex items-center justify-center`}>
                <svg className="h-20 w-20 animate-spin text-gray-100 dark:text-indigo-300"
                     xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {/*<svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"*/}
                {/*     viewBox="0 0 24 24">*/}
                {/*    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"*/}
                {/*            strokeWidth="4"></circle>*/}
                {/*    <path className="opacity-75" fill="currentColor"*/}
                {/*          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>*/}
                {/*</svg>*/}
            </div>
        </>
    )
}