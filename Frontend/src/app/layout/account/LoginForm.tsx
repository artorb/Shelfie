import LockClosedIcon from "@heroicons/react/solid/LockClosedIcon";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <>
      <div className="flex flex-row items-center justify-center py-2 px-2 sm:px-6 lg:px-8">
        <div className="max-w-md bg-[#cadfd3]/[0.1] dark:bg-[#131138] rounded-xl p-4 w-full space-y-12">
          <div className="">
            <svg
              className="mx-auto w-auto h-16 text-[#354F52] dark:text-indigo-600"
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#354F52] dark:text-indigo-700">
              Sign in to your account
            </h2>
          </div>

          <Formik
            initialValues={{ email: "", password: "", error: null }}
            onSubmit={(values, { setErrors }) =>
              userStore
                .login(values)
                .catch((error) =>
                  setErrors({ error: "Invalid email or password" })
                )
            }
          >
            {({ handleSubmit, isSubmitting, errors }) => (
              <Form className="" onSubmit={handleSubmit}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="appearance-none rounded-b-none rounded-t-md relative block w-full px-3 py-2 border dark:border-indigo-500 dark:bg-indigo-600 border-gray-300 placeholder-gray-500 dark:placeholder-indigo-200 text-gray-900 dark:text-indigo-200 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-500 focus:z-10 sm:text-sm"
                ></Field>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border dark:border-indigo-500 dark:bg-indigo-600 border-gray-300 placeholder-gray-500 dark:placeholder-indigo-200 text-gray-900 dark:text-indigo-200 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-500 focus:z-10 sm:text-sm"
                ></Field>

                  {/* FIXME react-tostify */}
                  <div id="toast-danger" className="flex mt-4 mx-auto items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </div>
    <div className="ml-8 text-sm font-normal">Incorrect email or password</div>
</div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white dark:text-indigo-200 bg-[#354F52] hover:bg-emerald-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 dark:focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-emerald-500 dark:text-indigo-300 group-emerald:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Sign in
                  </button>


                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
});
