import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {IStatistic} from "../models/statistics";

export default class StatisticStore {
    statisticRegistry = new Map<string, IStatistic>();
    statistic: IStatistic[] = [];
    loadingInit: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    get statisticsArray() {
        return Array.from(this.statisticRegistry.values()).sort((a, b) => a.storageName.localeCompare(b.storageName));
    }

    loadStatistics = async () => {
        try {
            const statistics = await agent.Statistics.list();
            runInAction(() => {
                statistics.forEach((statistic) => {
                    this.statisticRegistry.set(statistic.storageId, statistic);
                });
            })
            this.setLoadingInit(false);
        } catch (er) {
            console.log(er);
            this.setLoadingInit(false);
        }
    }

    setLoadingInit = (state: boolean) => {
        this.loadingInit = state;
    }
}