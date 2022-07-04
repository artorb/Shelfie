import Dashboard from "../dashboard/Dashboard";
import AddNewSection from "../dashboard/AddNewSection";
import {useStore} from "../../stores/store";
import IngredientForm from "../ingredient/IngredientForm";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../LoadingComponent";
import Colortag from "../dashboard/Colortag";
import {IIngredient} from "../../models/ingredient";

export default observer(function DashboardPage() {
    const {ingredientStore} = useStore();
    const {
        filterByColor,
        filterByName,
        ingredientsByDate,
        loadIngredients,
        ingredientRegistry,
        loadingInit
    } = ingredientStore;
    // const [ingredients, setIngredients] = useState<IIngredient[]>(filterByName(''));
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (ingredientRegistry.size <= 1) {
            const ingredientArray = async () => loadIngredients();

            ingredientArray().catch(er => {
                throw new Error(er)
            });
        }
        setIngredients(filterByName(''))
        // const loadedIngredients = async () => {
        //     await loadIngredients().then(() => setLoaded(true));
        // }
        //
        // loadedIngredients()
        //     .catch(er => {
        //         setLoaded(false);
        //         throw new Error(er);
        //     });
    }, [filterByName, ingredientRegistry.size, loadIngredients])

    const handleColorFilter = (color: string) => {
        // color
        //     ? setIngredients(
        //         ingredients.filter(ingredient => {
        //             return ingredient.colorTag === color;
        //         })
        //     )
        //     : setIngredients(ingredientsByDate);
        setIngredients(filterByColor(color));
    }

    const handleFilter = (text?: string) => {
        setQuery(text);

        if (text === '') {
            setIngredients(ingredientsByDate);
        } else {
            const fuse = new Fuse(ingredients, {
                minMatchCharLength: 1,
                useExtendedSearch: true,
                keys: [
                    {
                        name: 'name',
                        getFn: (ingredient) => ingredient.name,
                        weight: 0.7
                    },
                    {
                        name: 'storage',
                        getFn: (ingredient) => ingredient.storage.name,
                        weight: 0.3
                    },
                    {
                        name: 'colorTag',
                        getFn: (ingredient) => ingredient.colorTag,
                        weight: 0.1
                    }
                ]
            });

            const inputQuery = {$or: [{name: `'${text}`}, {storage: `'${text}`}, {colorTag: `'${text}`}]}

            const result = fuse.search(inputQuery);
            const arr = Array.from(result.map(res => {
                return res.item;
            }));
            setIngredients(arr);
        }
        // setIngredients(filterByName(text))
    }

    if (loadingInit) return <LoadingComponent/>

    return (
        <>
            <div className="text-white min-h-screen flex items-center">
                <div
                    className="container -mt-0 mx-auto justify-center p-4 flex relative flex-wrap items-center">
                    <div
                        className={`dark:bg-blue-900/10 bg-white/50 shadow dark:shadow-none max-w-3xl p-4 my-4 mx-1 rounded w-full items-center flex flex-col`}>
                        <AddNewSection/>
                        <label htmlFor={'search-bar'} hidden={true}></label>
                        <input type={'text'}
                               id={'search-bar'}
                               className={`w-full rounded-xl my-4 py-4 dark:bg-primary_dark-100/50 dark:text-gray-200 leading-6 text-lg pr-4 font-semibold focus:outline-none border-0 focus:ring-2 focus:ring-primary-100/50 ring-2 ring-primary-100/50 dark:ring-indigo-700/50 text-primary-300`}
                               value={query}
                               onChange={e => handleFilter(e.target.value)}
                        ></input>
                        {/*<SearchSection/>*/}
                        <div
                            className="w-full border-2 border-white/70 dark:border-2 rounded dark:border-indigo-900/20 py-6 max-w-6xl">
                            <div
                                className={`grid grid-flow-col justify-evenly shrink auto-cols-max gap-4 grid-rows-2 md:grid-rows-1`}>
                                <button
                                    onClick={() => handleColorFilter('')}
                                    className="bg-gradient-to-b from-indigo-400 via-fuchsia-300 to-violet-300 inline-block my-4 px-4 py-4 mx-4 rounded-full">
                                </button>
                                <Colortag onClick={() => handleColorFilter('red')} color={'red'}/>
                                <Colortag onClick={() => handleColorFilter('sky')} color={'sky'}/>
                                <Colortag onClick={() => handleColorFilter('blue')} color={'blue'}/>
                                <Colortag onClick={() => handleColorFilter('green')} color={'green'}/>
                                <Colortag onClick={() => handleColorFilter('slate')} color={'slate'}/>
                                <Colortag onClick={() => handleColorFilter('amber')} color={'amber'}/>
                                <Colortag onClick={() => handleColorFilter('fuchsia')} color={'fuchsia'}/>
                            </div>
                        </div>
                    </div>
                    {/*{!loadingInit ? <Dashboard isLoading={false} modal={<IngredientForm/>} ingredients={ingredients}/> : <LoadingComponent/>}*/}
                        <Dashboard isLoading={loadingInit} modal={<IngredientForm/>} ingredients={ingredients}/>
                </div>
            </div>
        </>
    );
})
