import {useStore} from "../../stores/store";
import {useEffect, useState} from "react";
import {IStatistic} from "../../models/statistics";
import LoadingComponent from "../LoadingComponent";
import {observer} from "mobx-react-lite";

export default observer(function Statistics() {
    const {statisticStore} = useStore();
    const {statisticsArray, loadStatistics, statisticRegistry, loadingInit} = statisticStore;

    const [statistics, setStatistics] = useState<IStatistic[]>([]);

    useEffect(() => {
        if (statisticRegistry.size <= 1) {
            const statisticArray = async () => {
                await loadStatistics();
            }

            statisticArray().catch(er => {
                throw new Error(er)
            });
        }
        setStatistics(statisticsArray);
    }, [loadStatistics, statisticRegistry.size, statisticsArray])

    if (loadingInit) return <LoadingComponent/>

    return (
        <>
            <div className="min-h-screen flex flex-row items-center justify-center py-2 px-2 sm:px-6 lg:px-8">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table
                        className="w-full text-sm table-auto font-semibold max-w-screen-2xl text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-12 py-8">
                                Storage
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Total amount
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Red
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Fuchsia
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Blue
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Sky
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Green
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Amber
                            </th>
                            <th scope="col" className="px-6 py-8">
                                Slate
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {statistics.map(({
                                             amber,
                                             blue,
                                             fuchsia,
                                             green,
                                             red,
                                             sky,
                                             slate,
                                             storageName,
                                             totalAmount,
                                             storageId
                                         }) => {
                            return (
                                <tr key={storageId}
                                    className="bg-white dark:bg-primary_dark-100 border-b dark:bg-gray-800/90 dark:border-gray-700">
                                    <th scope="row"
                                        className="px-6 py-6 font-semibold text-gray-900 dark:text-gray-300 whitespace-nowrap">
                                        {storageName}
                                    </th>
                                    <td className="px-6 py-6 text-center">
                                        {totalAmount}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        {red}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        {fuchsia}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        {blue}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        {sky}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        {green}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        {amber}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        {slate}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
    // return (
    //     <>
    //         <div className="min-h-screen flex flex-row items-center justify-center py-2 px-2 sm:px-6 lg:px-8">
    //             <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    //                 <table
    //                     className="w-full text-sm table-auto font-semibold max-w-screen-2xl text-left text-gray-500 dark:text-gray-400">
    //                     <thead
    //                         className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //                     <tr>
    //                         <th scope="col" className="px-12 py-3">
    //                             Storage
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Total amount
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Red
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Fuchsia
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Blue
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Sky
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Green
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Amber
    //                         </th>
    //                         <th scope="col" className="px-6 py-3">
    //                             Slate
    //                         </th>
    //                     </tr>
    //                     </thead>
    //                     <tbody>
    //                     {statistics.map(({
    //                                          amber,
    //                                          blue,
    //                                          fuchsia,
    //                                          green,
    //                                          red,
    //                                          sky,
    //                                          slate,
    //                                          storageName,
    //                                          totalAmount,
    //                                          storageId
    //                                      }) => {
    //                         return (
    //                             <tr key={storageId}
    //                                 className="bg-white dark:bg-primary_dark-100 border-b dark:bg-gray-800 dark:border-gray-700">
    //                                 <th scope="row"
    //                                     className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-300 whitespace-nowrap">
    //                                     {storageName}
    //                                 </th>
    //                                 <td className="px-6 py-3">
    //                                     {totalAmount}
    //                                 </td>
    //                                 <td className="px-6 py-3">
    //                                     {red}
    //                                 </td>
    //                                 <td className="px-6 py-3">
    //                                     {fuchsia}
    //                                 </td>
    //                                 <td className="px-6 py-3">
    //                                     {blue}
    //                                 </td>
    //                                 <td className="px-6 py-3">
    //                                     {sky}
    //                                 </td>
    //                                 <td className="px-6 py-3">
    //                                     {green}
    //                                 </td>
    //                                 <td className="px-6 py-3">
    //                                     {amber}
    //                                 </td>
    //                                 <td className="px-6 py-3">
    //                                     {slate}
    //                                 </td>
    //                             </tr>
    //                         )
    //                     })}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </>
    // );
})
