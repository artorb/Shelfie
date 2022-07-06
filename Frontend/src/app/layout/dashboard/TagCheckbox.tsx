import {IIngredient} from "../../models/ingredient";
import {useEffect, useState} from "react";
import {useStore} from "../../stores/store";

interface Props {
    ingredients: IIngredient[],
}

const TagCheckbox = ({ingredients}: Props) => {
    const [checked, setChecked] = useState(false);
    const {ingredientStore} = useStore();
    const {filterByColor, filterByName, ingredientsByDate} = ingredientStore;

    const [ingredientArr, setIngredientArr] = useState(ingredients);

    useEffect(() => {
        return () => {
            setIngredientArr(ingredients);
        };
    }, [ingredients]);


    const handleChange = () => {
        setIngredientArr(filterByColor('red'))
        console.log(ingredientArr);

        setChecked(true);
    }
    return (
        <>
            <div>
                <input checked={checked} onChange={handleChange} type={`checkbox`}/>
            </div>
        </>
    )
}
export default TagCheckbox;