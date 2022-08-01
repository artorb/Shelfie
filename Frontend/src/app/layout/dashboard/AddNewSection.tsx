import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { CreateButton } from "../../components/";
import FormIngredient from "../ingredient/Forms/FormIngredient";
import FormStorage from "../storage/Forms/FormStorage";

export default observer(function AddNewSection() {
  const { modalStore } = useStore();
  const { openModal } = modalStore;

  const onClickHandlerIngredient = () => {
    openModal(<FormIngredient />);
  };
  const onClickHandlerStorage = () => {
    openModal(<FormStorage />);
  };

  return (
    <>
      <div className="flex w-full justify-between max-w-6xl">
        <CreateButton onClick={onClickHandlerStorage} text={"New storage"} />
        <CreateButton
          onClick={onClickHandlerIngredient}
          text={"New ingredient"}
        />
      </div>
    </>
  );
});
