import { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../components/";
import AddNewSection from "../dashboard/AddNewSection";
import IngredientDashboard from "../dashboard/IngredientDashboard";
import { useStore } from "../../stores/store";
import TagSection from "../dashboard/TagSection";
import { Ingredient } from "../../models/ingredient";

export default observer(function DashboardPage() {
  const { ingredientStore, storageStore } = useStore();
  const {
    termFilter,
    setStringFilter,
    filteredByTerm,
    loading,
    loadingInit,
    loadIngredients,
    error,
  } = ingredientStore;

  const { loadStorages } = storageStore;

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    filteredByTerm || []
  );

  useEffect(() => {
    loadStorages();
    loadIngredients();
  }, []);

  useEffect(() => {
    setIngredients(filteredByTerm);
  }, [filteredByTerm, ingredients]);

  const ingredientData = ingredients ? (
    <IngredientDashboard ingredients={ingredients} />
  ) : null;

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const term: string = e.target.value;
    setStringFilter(term);
  };

  if (error)
    return (
      <p className={`min-h-screen text-center text-red-500 mt-20 text-xl`}>
        Something went wrong...
      </p>
    );
  if (loading || loadingInit) return <LoadingComponent />;

  return (
    <>
      <div className="text-white min-h-screen flex items-center">
        <div className="container -mt-0 mx-auto justify-center p-4 flex relative flex-wrap items-center">
          <div
            className={`dark:bg-blue-900/10 bg-white/50 shadow dark:shadow-none max-w-3xl p-4 my-4 mx-1 rounded w-full items-center flex flex-col`}
          >
            <AddNewSection />
            <label htmlFor={"search-bar"} hidden={true}></label>
            <input
              type={"text"}
              id={"search-bar"}
              className={`w-full rounded-xl my-4 placeholder-primary-100 font-inter dark:placeholder-indigo-300 py-2.5 dark:bg-primary_dark-100/50 dark:text-gray-200 leading-relaxed text-lg pr-4 font-semibold focus:outline-none border-0 focus:ring-2 focus:ring-primary-100/50 ring-2 ring-primary-100/50 dark:ring-indigo-700/50 text-primary-300`}
              value={termFilter}
              placeholder="Start typing to search..."
              onChange={handleFilter}
            />
            <div className="w-full border-2 border-white/70 dark:border-2 rounded dark:border-indigo-900/20 py-6 max-w-6xl">
              <div
                className={`grid grid-flow-col justify-evenly shrink auto-cols-max gap-4 grid-rows-2 md:grid-rows-1`}
              >
                <TagSection />
              </div>
            </div>
          </div>
          {ingredientData}
        </div>
      </div>
    </>
  );
});
