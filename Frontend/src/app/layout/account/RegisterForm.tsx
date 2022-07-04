import {ErrorMessage, Field, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store";
import * as Yup from 'yup';
import {useRef} from "react";

export default observer(function RegisterForm() {
    const {userStore} = useStore();

    const validationSchemaRegistration = Yup.object({
        username: Yup.string().required('Required to have a username').min(4).max(20),
        email: Yup.string().email().required('Required to have an email'),
        password: Yup.string().required().min(6).max(15)
    })

    return (
        <>
            <div
                className="bg-gray-100 bg-opacity-90 dark:bg-slate-900 rounded-md p-6 flex flex-col md:ml-auto w-full xs:w-4/5 mx-auto mt-10 md:mt-0">
                <svg
                    className="mx-auto w-auto h-16 text-gray-700 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                </svg>
                <h2 className="text-gray-700 text-center mt-2 dark:text-gray-400 text-3xl font-medium title-font mb-5">
                    Sign up
                </h2>
                <div className="relative mb-4">
                    <Formik
                        validationSchema={validationSchemaRegistration}
                        initialValues={{username: '', email: '', password: '', error: null}}
                        onSubmit={(values, {setErrors}) =>
                            userStore
                                .register(values)
                                .catch((error) =>
                                    setErrors({error: "FIXME Invalid email or password"})
                                )
                        }
                    >
                        {({handleSubmit, isSubmitting, errors}) => (
                            <Form className="" onSubmit={handleSubmit}>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                ></Field>
                                <ErrorMessage name='username' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="w-full bg-white mt-1 dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                ></Field>
                                <ErrorMessage name='email' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="w-full mt-1 bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 dark:text-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                ></Field>
                                <ErrorMessage name='password' render={error => <p
                                    className={`${error == null ? 'hidden' : 'visible'} text-xs py-2 px-1 font-thin text-red-600`}>{error}</p>}></ErrorMessage>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm mt-2 font-medium rounded-md text-white dark:text-indigo-200 bg-[#354F52] hover:bg-teal-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 dark:focus:ring-indigo-500"
                                >
                                    Create an account
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
});
