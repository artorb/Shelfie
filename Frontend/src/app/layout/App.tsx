import {useEffect, useState} from "react";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import Header from "./header/Header";
import Footer from "./Footer";
import {useDark} from "./dashboard/darkmode";
import {Route, Routes,} from "react-router-dom";
import RecipesPage from "./pages/RecipesPage";
import Statistics from "./pages/Statistics";
import ErrorPage from "./pages/ErrorPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StoragesPage from "./pages/StoragesPage";

function App() {
    const {ingredientStore, storageStore, commonStore, userStore, statisticStore, modalStore} = useStore();

    const {loadIngredients} = ingredientStore;
    const {loadStorages} = storageStore;
    const {loadStatistics} = statisticStore;

    const {dark} = useDark();
    const {darkStatus} = dark;
    const [darkmode, setDarkmode] = useState(darkStatus);

    const {isLoggedIn} = userStore;

    const [logged, setLogged] = useState<boolean>(false);
    useEffect(() => {
        setLogged(isLoggedIn);
    }, [])

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    useEffect(() => {
        setDarkmode(darkStatus);
    }, [darkStatus])

    return (
        <>
            <div className={`${darkmode ? 'dark' : 'light'}`}>
                <div
                    className="min-h-full bg-cover bg-[url('assets/wave-h.svg')] dark:bg-cover dark:bg-[url('assets/wave-d.svg')]">
                    <Header/>

                    <Routes>
                        <Route path="/" element={userStore.isLoggedIn ? <DashboardPage/> : <LoginPage/>}/>
                        <Route path="/*" element={<ErrorPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/dashboard"
                               element={<DashboardPage/>}/>
                        <Route path="/storage" element={<StoragesPage/>}/>
                        <Route path="/settings" element={<AccountPage/>}/>
                        <Route path="/recipes" element={<RecipesPage/>}/>
                        <Route path="/statistics" element={<Statistics/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default observer(App);
