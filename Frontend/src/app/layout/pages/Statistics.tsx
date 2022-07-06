import {useStore} from "../../stores/store";
import {useEffect, useState} from "react";
import {IStatistic} from "../../models/statistics";
import LoadingComponent from "../LoadingComponent";
import {observer} from "mobx-react-lite";

export default observer(function Statistics() {
    const {statisticStore} = useStore();
    const {statisticsArray, loadStatistics, statisticRegistry, loadingInit} =
        statisticStore;

    const [statistics, setStatistics] = useState<IStatistic[]>([]);

    useEffect(() => {
        if (statisticRegistry.size <= 1) {
            const statisticArray = async () => {
                await loadStatistics();
            };

            statisticArray().catch((er) => {
                throw new Error(er);
            });
        }
        setStatistics(statisticsArray);
    }, [loadStatistics, statisticRegistry.size, statisticsArray]);

    if (loadingInit) return <LoadingComponent/>;

    return (
        <>
            <div
                className="min-h-screen flex flex-row items-start mt-20 sm:mt-0 sm:items-center justify-center py-2 px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-4 w-full">
                    <div
                        className="relative col-start-1 col-span-4 2xl:col-start-2 2xl:col-span-2 overflow-x-auto shadow-md rounded-lg">
                        <table
                            className="text-sm w-full table-auto font-semibold text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xxs sm:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="text-center py-2 sm:py-8">
                                    Storage
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-center">
                                    Amount
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-red-400 text-center">
                                    Red
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-fuchsia-400 text-center">
                                    Fuchsia
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-blue-400 text-center">
                                    Blue
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-sky-400 text-center">
                                    Sky
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-green-400 text-center">
                                    Green
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-amber-400 text-center">
                                    Amber
                                </th>
                                <th scope="col" className="py-2 sm:py-8 text-slate-400 text-center">
                                    Slate
                                </th>
                            </tr>
                            </thead>
                            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700`}>
                            {statistics.map(
                                ({
                                     amber,
                                     blue,
                                     fuchsia,
                                     green,
                                     red,
                                     sky,
                                     slate,
                                     storageName,
                                     totalAmount,
                                     storageId,
                                 }) => {
                                    return (
                                        <tr
                                            key={storageId}
                                            className="bg-white dark:bg-primary_dark-100 border-collapse border dark:bg-gray-800/90 dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="py-2 sm:py-4 lg:py-6 text-center text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-300 whitespace-nowrap"
                                            >
                                                {storageName}
                                            </th>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{totalAmount}</td>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{red}</td>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{fuchsia}</td>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{blue}</td>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{sky}</td>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{green}</td>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{amber}</td>
                                            <td className="px-4 text-center text-xs whitespace-nowrap sm:text-sm">{slate}</td>
                                        </tr>
                                    );
                                }
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
});
