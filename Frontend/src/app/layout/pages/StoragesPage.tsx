import Dashboard from "../dashboard/Dashboard";
import StorageForm from "../storage/StorageForm";
import {useStore} from "../../stores/store";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../LoadingComponent";
import {IStorage} from "../../models/storage";

export default observer(function StoragesPage() {
    const {storageStore} = useStore();
    const {getStorages, loadingInit, storageRegistry, loadStorages} = storageStore;


    const [storages, setStorages] = useState<IStorage[]>([])
    useEffect(() => {
        if(storageRegistry.size <= 1) {
            const storageArray = async () => loadStorages();

            storageArray().catch(er => {
                throw new Error(er);
            })
        }
        setStorages(getStorages);
    }, [getStorages, loadStorages, storageRegistry.size]);


    if(loadingInit) return <LoadingComponent/>

    return (
        <>
            <div className="text-white min-h-screen flex items-center">
                <div
                    className="container overflow-x-hidden -mt-0 mx-auto justify-center p-4 flex flex-wrap items-center">
                    <Dashboard isLoading={loadingInit} modal={<StorageForm/>} storages={storages}/>
                </div>
            </div>
        </>
    )
        ;
});