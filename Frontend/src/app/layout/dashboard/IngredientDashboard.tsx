import { observer } from "mobx-react-lite";
import { Ingredient } from "../../models/ingredient";
import ModalContainer from "../modals/ModalContainer";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "../../stores/store";
import { colorizeTag } from "../util";
import FormIngredient from "../ingredient/Forms/FormIngredient";

interface Props {
  ingredients?: Ingredient[];
}

export default observer(function IngredientDashboard({ ingredients }: Props) {
  const { modalStore } = useStore();
  const { openModal } = modalStore;

  const { ingredientStore } = useStore();
  const { selectIngredient, cancelSelectedIngredient } = ingredientStore;

  const handleClick = (ingredient?: Ingredient) => {
    if (ingredient === null) {
      cancelSelectedIngredient();
      openModal(<FormIngredient />);
    } else {
      selectIngredient(ingredient.id);
      openModal(<FormIngredient />);
    }
  };

  const getFormattedDate = (date: Date): string => {
    const distance = formatDistanceToNow(date);
    return date.getTime() < Date.now()
      ? `Expired ${distance} ago`
      : `Expires in ${distance}`;
  };

  return (
    <>
      <ul className="w-full shadow-md h-[820px] border-collapse overflow-auto backdrop-blur backdrop-filter dark:bg-primary_dark-100 dark:bg-opacity-50 px-2 mx-auto bg-gray-300/60 rounded-2xl max-w-3xl">
        <ModalContainer />
        {ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.id}
              className="flex bg-gray-200/90 shadow-sm ring-2 dark:ring-0 ring-opacity-20 ring-gray-100 hover:bg-gray-100 hover:bg-opacity-60 rounded-lg my-2 dark:bg-primary_dark-200/50 dark:hover:bg-primary_dark-200 flex-col h-28 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 focus-visible:ring-opacity-75"
            >
              <button
                onClick={() => handleClick(ingredient)}
                className="h-full rounded-t-lg"
                key={`Edit ingredient`}
                type={`button`}
              >
                <div className="h-1/2 flex justify-between align-middle w-full">
                  <div className="p-4 ml-2 sm:ml-10 my-2 text-gray-500 dark:text-gray-400 font-semibold text-lg">
                    <p className="">{ingredient.name}</p>
                  </div>
                  <div
                    className={`${colorizeTag(
                      ingredient.colorTag
                    )} inline-block rounded-full my-4 mx-4 px-2 py-1 mt-6 mr-4 sm:mr-12`}
                  ></div>
                </div>
                <div className="w-full flex flex-nowrap justify-between h-1/2">
                  <p className="text-sm bg-primary-200 font-dosis dark:bg-indigo-100/[0.1] rounded-lg mx-6 mt-4 sm:mx-14 px-2 py-0.5 h-6 text-gray-100 dark:text-gray-400">
                    {ingredient.storage?.name ?? "No storage"}
                  </p>
                  <p className="mx-4 sm:mx-12 shrink-0 py-2 text-sm font-dosis dark:text-gray-400 text-gray-600 mt-2">
                    {getFormattedDate(ingredient.expirationDate)}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
});
