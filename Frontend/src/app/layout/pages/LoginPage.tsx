import { ErrorMessage, Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import ModalContainer from "../modals/ModalContainer";
import * as Yup from "yup";
import { runInAction } from "mobx";
import { useState } from "react";
import { SpinnerIcon } from "../../components";
import RegisterForm from "../account/Forms/RegisterForm";

interface LoginInitValues {
  email: string;
  password: string;
  error: any;
}

export default observer(function LoginPage() {
  const { modalStore, userStore } = useStore();

  const [successStatus, setSuccessStatus] = useState(false);

  const loginSubmit = async (values: LoginInitValues) => {
    try {
      await modalStore.sleep(500);
      runInAction(() => {
        userStore.login(values).then(() => setSuccessStatus(true));
      });
    } catch (er) {
      setSuccessStatus(false);
      throw new Error(er);
    }
  };

  const initValues: LoginInitValues = {
    email: "",
    password: "",
    error: null,
  };

  const validationSchemaLogin = Yup.object({
    email: Yup.string().email().required("Required to have an email"),
    password: Yup.string().required().min(6).max(15),
  });

  return (
    <>
      <div className="min-h-screen dark:bg-slate-900 bg-opacity-80 flex flex-row  justify-center">
        <div className="flex bg-[url('/src/assets/grains.avif')] shadow-lg dark:shadow-none shadow-teal-900/[.3] dark:bg-[url('/src/assets/grains-dark2.avif')] sm:mt-16 mb-4 mt-4 bg-cover w-full md:w-full h-full p-12 flex-col shadow-xl">
          <div className="mx-auto text-center">
            <section className="text-gray-600 body-font">
              <div className="container px-5 sm:h-full py-12 sm:py-24 mx-auto flex flex-wrap flex-col w-full lg:flex-row items-center">
                <div className="xl:1/3 lg:w-1/2 md:w-3/5 w-4/5 md:mb-6 bg-black rounded-md dark:bg-slate-900 dark:bg-opacity-40 bg-opacity-70 lg:pr-2">
                  <h1 className="title-font p-2 font-medium text-3xl text-gray-200 dark:text-gray-200">
                    An app that keeps an eye on your goodies.
                  </h1>
                  <p className="leading-relaxed mt-4 p-4 text-gray-300 dark:text-gray-300 text-md">
                    Begin keeping track on your edibles the smart way!
                  </p>
                </div>
                <div className="xl:w-1/3 lg:w-1/2 md:w-3/5 bg-gray-100 bg-opacity-90 dark:bg-slate-900 rounded-md p-6 flex flex-col md:ml-auto w-full xs:w-4/5 mx-auto mt-10 md:mt-0">
                  <svg
                    className="mx-auto w-auto h-16 text-gray-700 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <h2 className="text-gray-700 dark:text-gray-400 text-3xl font-medium title-font mb-5">
                    Sign in
                  </h2>
                  <div className="mb-4">
                    <Formik
                      validationSchema={validationSchemaLogin}
                      initialValues={initValues}
                      //   initialValues={{ email: "", password: "", error: null }}
                      onSubmit={(values: LoginInitValues, { setErrors }) =>
                        loginSubmit(values).catch((error) =>
                          setErrors({ error: "Invalid email or password" })
                        )
                      }
                    >
                      {({
                        handleSubmit,
                        isSubmitting,
                        errors,
                        status,
                        setStatus,
                      }) => (
                        <Form className="grid grid-row" onSubmit={handleSubmit}>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          ></Field>
                          <ErrorMessage
                            name="email"
                            render={(error) => (
                              <p
                                className={`${
                                  error == null ? "hidden" : "visible"
                                } text-xs py-2 px-1 font-thin text-red-600`}
                              >
                                {error}
                              </p>
                            )}
                          ></ErrorMessage>
                          <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full mt-1 bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 dark:text-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          ></Field>
                          <ErrorMessage
                            name="password"
                            render={(error) => (
                              <p
                                className={`${
                                  error == null ? "hidden" : "visible"
                                } text-xs py-2 px-1 font-thin text-red-600`}
                              >
                                {error}
                              </p>
                            )}
                          ></ErrorMessage>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-4 md:py-2 px-4 border border-transparent text-sm mt-2 font-medium rounded-md text-white dark:text-indigo-200 bg-[#354F52] hover:bg-teal-700 dark:bg-indigo-600 dark:active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 dark:focus:ring-indigo-500"
                          >
                            {isSubmitting ? <SpinnerIcon /> : "Login"}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="flex justify-between">
                    <ModalContainer />
                    <p className="text-xs text-gray-500 my-4">
                      Don't have an account?
                    </p>

                    <button
                      className="px-2 py-2 my-2 dark:text-slate-400 text-xs underline-offset-4 hover:underline"
                      onClick={() => modalStore.openModal(<RegisterForm />)}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
});
