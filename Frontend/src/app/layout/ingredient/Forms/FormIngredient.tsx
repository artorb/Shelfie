import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import { runInAction } from "mobx";
import { useStore } from "../../../stores/store";
import { Ingredient } from "../../../models/ingredient";
import { SpinnerIcon } from "../../../components/";

interface IngredientFormInitValues {
  storageId: string;
  id: string;
  name: string;
  amountUnits: number;
  colorTag: string;
  carbs: number;
  fats: number;
  proteins: number;
  weight: number;
  calories: number;
  expirationDate: string;
  type: string;
  error: any;
}

export default observer(function FormIngredient() {
  const validationSchemaIngredient = Yup.object({
    storageId: Yup.string(),
    name: Yup.string().required("Name is required"),
    amountUnits: Yup.number().min(0, "Cannot be negative"),
    colorTag: Yup.string(),
    carbs: Yup.number().min(0, "Cannot be negative").max(1000),
    fats: Yup.number().min(0, "Cannot be negative").max(1000),
    proteins: Yup.number().min(0, "Cannot be negative").max(1000),
    weight: Yup.number().min(0, "Cannot be negative"),
    calories: Yup.number().min(0, "Cannot be negative").max(10000),
    expirationDate: Yup.date(),
    type: Yup.string(),
  });

  const { storageStore, ingredientStore, modalStore } = useStore();

  const {
    createIngredient,
    updateIngredient,
    deleteIngredient,
    selectedIngredient: ingredient,
    cancelSelectedIngredient,
  } = ingredientStore;

  const { closeModal } = modalStore;
  const { storagesByDate, error, storageRegistry } = storageStore;

  const storages = storagesByDate ? storagesByDate : [];

  const handleClose = () => {
    cancelSelectedIngredient();
    closeModal();
  };

  const handleDeleteButton = async (id: string) => {
    try {
      runInAction(() => {
        deleteIngredient(id);
        handleClose();
      });
    } catch (er) {
      throw new Error(er);
    }
  };

  const handleSubmitButton = async (values: IngredientFormInitValues) => {
    try {
      const storage = storageRegistry.get(values.storageId);
      const formIngredient: Ingredient = {
        name: values.name,
        storageId: values.storageId,
        storage: storage,
        amountUnits: values.amountUnits,
        calories: values.calories,
        carbs: values.carbs,
        colorTag: values.colorTag,
        fats: values.fats,
        proteins: values.proteins,
        type: values.type,
        expirationDate: new Date(values.expirationDate),
        weight: values.weight,
      };
      runInAction(() => {
        if (ingredient?.id) {
          formIngredient.id = ingredient.id;
          updateIngredient(formIngredient);
          handleClose();
        } else {
          createIngredient(formIngredient);
          handleClose();
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const initValues: IngredientFormInitValues = {
    storageId: ingredient?.storage?.id ?? storages[0]?.id,
    id: ingredient?.id ?? "",
    name: ingredient?.name ?? "",
    amountUnits: ingredient?.amountUnits ?? 0,
    colorTag: ingredient?.colorTag ?? "slate",
    carbs: ingredient?.carbs ?? 0,
    fats: ingredient?.fats ?? 0,
    proteins: ingredient?.proteins ?? 0,
    weight: ingredient?.weight ?? 0,
    calories: ingredient?.calories ?? 0,
    expirationDate: ingredient?.expirationDate
      ? new Date(ingredient?.expirationDate).toISOString().slice(0, 10)
      : format(new Date(), "yyyy-MM-dd"),
    type: ingredient?.type ?? "",
    error: null,
  };

  if (error)
    return (
      <p className={`flex justify-center align-middle`}>
        Something went wrong...
      </p>
    );
  //   if (loading) return <SpinnerIcon />;

  return (
    <>
      <div className="bg-gray-100 bg-opacity-90 dark:bg-slate-900 rounded-md p-2 flex flex-col md:ml-auto w-full xs:w-4/5 mx-auto mt-2 md:mt-0">
        <h2 className="text-gray-700 text-center dark:text-gray-400 text-3xl font-medium title-font mb-6">
          {ingredient?.id ? "Edit ingredient" : "Create ingredient"}
        </h2>
        <div className="relative mb-4">
          <Formik
            validationSchema={validationSchemaIngredient}
            initialValues={initValues}
            onSubmit={async (
              values: IngredientFormInitValues,
              { setErrors }
            ) => {
              handleSubmitButton(values).catch((error) => {
                setErrors({ error: "Error creating/updating" });
              });
            }}
          >
            {({ handleSubmit, isSubmitting, errors }) => (
              <Form
                className={``}
                onSubmit={handleSubmit}
                onAbort={handleClose}
                onSuspend={handleClose}
                onReset={handleClose}
              >
                <div className={`flex flex-col`}>
                  <label className={`mb-1 text-sm`}>Name</label>
                  <Field
                    type={`text`}
                    name={`name`}
                    required
                    className="w-full rounded bg-white border border-gray-300 dark:bg-slate-800 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></Field>
                  <ErrorMessage
                    name="name"
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
                </div>
                <div className={`flex my-2 flex-col`}>
                  <label className={`mb-1 text-sm`}>Amount of units</label>
                  <Field
                    type={`number`}
                    name={`amountUnits`}
                    className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></Field>
                  <ErrorMessage
                    name="amountUnits"
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
                </div>
                <div className={`grid grid-cols-3 gap-4`}>
                  <div className={``}>
                    <label className={`text-xs`}>Carbs</label>
                    <Field
                      type={`number`}
                      name={`carbs`}
                      className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></Field>
                    <ErrorMessage
                      name="carbs"
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
                  </div>
                  <div>
                    <label className={`text-xs`}>Fats</label>
                    <Field
                      type={`number`}
                      name={`fats`}
                      className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></Field>
                    <ErrorMessage
                      name="fats"
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
                  </div>
                  <div>
                    <label className={`text-xs`}>Proteins</label>
                    <Field
                      type={`number`}
                      name={`proteins`}
                      className="w-full p-4 bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></Field>
                    <ErrorMessage
                      name="proteins"
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
                  </div>
                </div>
                <div className={`grid grid-cols-2 gap-8`}>
                  <div className={``}>
                    <label className={`text-sm mb-1`}>Calories</label>
                    <Field
                      type={`number`}
                      name={`calories`}
                      className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></Field>
                    <ErrorMessage
                      name="calories"
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
                  </div>
                  <div>
                    <label className={`text-sm mb-1`}>Weight</label>
                    <Field
                      type={`number`}
                      name={`weight`}
                      className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></Field>
                    <ErrorMessage
                      name="weight"
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
                  </div>
                </div>
                <label className={`text-sm mb-1`}>Type</label>
                <Field
                  type={`text`}
                  name={`type`}
                  className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Field>
                <ErrorMessage
                  name="type"
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
                <label className={`text-sm mb-1`}>Expiration date</label>
                <Field
                  type={`date`}
                  name={`expirationDate`}
                  className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Field>
                <ErrorMessage
                  name="expirationDate"
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

                <label className={`text-sm mb-1`}>Storage</label>
                <Field
                  as={"select"}
                  name={`storageId`}
                  className="w-full bg-white dark:bg-slate-800 rounded border dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  {storages.map((storage) => {
                    return (
                      <option
                        key={storage.id}
                        value={storage.id}
                        defaultChecked={ingredient?.storage?.id === storage.id}
                      >
                        {storage.name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="storageId"
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
                <label className={`text-sm mb-1`}>Color tag</label>
                <Field
                  as={"div"}
                  type={`text`}
                  name={`colorTag`}
                  className="w-full flex justify-between align-middle h-full bg-white dark:bg-slate-800 border-0 dark:border-slate-700 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-indigo-900 text-base outline-none dark:text-gray-400 text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <div>
                    <input
                      type={"radio"}
                      defaultChecked={
                        ingredient?.colorTag === "sky" || !ingredient
                      }
                      name={"colorTag"}
                      value={"sky"}
                      className={
                        "bg-sky-400 checked:bg-sky-400 checked:hover:bg-sky-400 indeterminate:bg-sky-400 focus:bg-sky-400 hover:bg-sky-400 border-0 h-6 w-6"
                      }
                    ></input>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      defaultChecked={ingredient?.colorTag === "amber"}
                      name={"colorTag"}
                      value={"amber"}
                      className={
                        "bg-amber-400 border-0 checked:bg-amber-400 checked:hover:bg-amber-400 indeterminate:bg-amber-400 focus:bg-amber-400 hover:bg-amber-400 h-6 w-6"
                      }
                    ></input>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      defaultChecked={ingredient?.colorTag === "blue"}
                      name={"colorTag"}
                      value={"blue"}
                      className={
                        "bg-blue-400 checked:bg-blue-400 checked:hover:bg-blue-400 indeterminate:bg-blue-400 focus:bg-blue-400 hover:bg-blue-400  border-0 h-6 w-6"
                      }
                    ></input>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      defaultChecked={ingredient?.colorTag === "green"}
                      name={"colorTag"}
                      value={"green"}
                      className={
                        "bg-green-400 checked:bg-green-400 checked:hover:bg-green-400 indeterminate:bg-green-400 focus:bg-green-400 hover:bg-green-400  border-0 h-6 w-6"
                      }
                    ></input>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      defaultChecked={ingredient?.colorTag === "slate"}
                      name={"colorTag"}
                      value={"slate"}
                      className={
                        "bg-slate-400 checked:bg-slate-400 checked:hover:bg-slate-400 indeterminate:bg-slate-400 focus:bg-slate-400 hover:bg-slate-400  border-0 h-6 w-6"
                      }
                    ></input>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      defaultChecked={ingredient?.colorTag === "fuchsia"}
                      name={"colorTag"}
                      value={"fuchsia"}
                      className={
                        "bg-fuchsia-400 checked:bg-fuchsia-400 checked:hover:bg-fuchsia-400 indeterminate:bg-fuchsia-400 focus:bg-fuchsia-400 hover:bg-fuchsia-400  border-0 h-6 w-6"
                      }
                    ></input>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      defaultChecked={ingredient?.colorTag === "red"}
                      name={"colorTag"}
                      value={"red"}
                      className={
                        "bg-red-400 checked:bg-red-400 checked:hover:bg-red-400 indeterminate:bg-red-400 focus:bg-red-400 hover:bg-red-400 border-0 h-6 w-6"
                      }
                    ></input>
                  </div>
                </Field>
                <ErrorMessage
                  name="type"
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
                <hr className={`mt-4 w-full`} />
                <button
                  type="submit"
                  className="w-full btn-primary flex justify-center  py-4 px-4 border border-transparent text-sm text-center mt-4 font-semibold rounded-md text-white dark:text-indigo-200 bg-[#354F52] hover:bg-teal-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 dark:focus:ring-indigo-500"
                >
                  {isSubmitting ? (
                    <SpinnerIcon />
                  ) : ingredient?.id ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </button>
                {ingredient?.id ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteButton(ingredient?.id)}
                    className="w-full btn-primary bg-red-900 flex justify-center  py-4 px-4 border border-transparent text-sm text-center mt-4 font-semibold rounded-md text-white dark:text-indigo-200 hover:bg-red-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-indigo-500"
                  >
                    {isSubmitting ? <SpinnerIcon /> : "Delete"}
                  </button>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
});
