import { LoadingComponent } from "../../components/";
import { observer } from "mobx-react-lite";
import StorageDashboard from "../dashboard/StorageDashboard";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { Storage } from "../../models/storage";

export default observer(function StoragesPage() {
  const { storageStore } = useStore();
  const { error, loadingInit, loading, storagesByDate, loadStorages } =
    storageStore;
  // const {storages, loading, error, refetch} = useStorageFetcher();

  const [storages, setStorages] = useState<Storage[]>(storagesByDate || []);

  useEffect(() => {
    loadStorages();
  }, []);

  useEffect(() => {
    setStorages(storagesByDate);
  }, [storagesByDate]);

  // const storageData = storages ? storages : [];

  if (error)
    return (
      <p className={`min-h-screen text-center text-red-500 mt-20 text-xl`}>
        Something went wrong...
      </p>
    );
  if (loadingInit || loading) return <LoadingComponent />;

  return (
    <>
      <div className="text-white min-h-screen flex items-start py-4 sm:p-0 sm:items-center">
        <div className="container overflow-x-hidden mx-auto justify-center p-4 flex flex-wrap">
          <StorageDashboard storages={storages} />
        </div>
      </div>
    </>
  );
});
