import Dashboard from "../dashboard/Dashboard";
import StorageForm from "../storage/StorageForm";
import {useStore} from "../../stores/store";
import {useEffect, useState} from "react";
import LoadingComponent from "../LoadingComponent";
import {observer} from "mobx-react-lite";
import {IStorage} from "../../models/storage";

export default observer(function StoragesPage() {
    const {storageStore} = useStore();
    const {getStorages, loadingInit, storageRegistry, loadStorages} = storageStore;


    const [storages, setStorages] = useState<IStorage[]>([])
    useEffect(() => {
        if (storageRegistry.size <= 1) {
            const storageArray = async () => loadStorages();

            storageArray().catch(er => {
                throw new Error(er);
            })
        }
        setStorages(getStorages);
    }, [getStorages, loadStorages, storageRegistry.size]);


    if (loadingInit) return <LoadingComponent/>

    return (
        <>
            <div className="text-white min-h-screen flex items-start py-4 sm:p-0 sm:items-center">
                <div
                    className="container overflow-x-hidden mx-auto justify-center p-4 flex flex-wrap">
                    <Dashboard modal={<StorageForm/>} storages={storages}/>
                </div>
            </div>
        </>
    );
});