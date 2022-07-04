import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import StorageForm from "../storage/StorageForm";
import IngredientForm from "../ingredient/IngredientForm";
import CreateButton from "./CreateButton";

export default observer(function AddNewSection() {
    const {modalStore} = useStore();
    const {openModal} = modalStore;

    const onClickHandlerIngredient = () => {
        openModal(<IngredientForm/>)
    }
    const onClickHandlerStorage = () => {
        openModal(<StorageForm/>)
    }

    return (
        <>
            <div className="flex w-full justify-between max-w-6xl">
                <CreateButton onClick={onClickHandlerStorage} text={'New storage'}/>
                <CreateButton onClick={onClickHandlerIngredient} text={'New ingredient'}/>
            </div>
        </>
    )
})