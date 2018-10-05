import {Client} from "elasticsearch";
import {v4 as uuid} from 'uuid';
import {Activity} from "./activity";
import {create} from "domain";

export class ActivityService {

    readonly client: Client;
    readonly indexName;
    readonly indexType;

    constructor(client: Client, indexName: string, indexType: string) {
        this.client = client;
        this.indexName = indexName;
        this.indexType = indexType;
    }

    async get(query: string): Promise<Array<Activity>> {
        return (await this.client.search<Activity>({
            index: this.indexName,
            type: this.indexType,
            body: query
        })).hits.hits.map(a => a._source);
    }

    async create(a: Activity): Promise<Activity> {
        const activity = this.preProcess(a);
        await this.client.create({
            index: this.indexName,
            id: activity.id,
            type: this.indexType,
            body: activity
        });
        return activity;
    }

    async delete(query: string): Promise<void> {
        (await this.client.deleteByQuery({
            index: this.indexName,
            type: this.indexType,
            body: query
        }));
    }

    preProcess(a: Activity): Activity {
        if (!a.id) {
            a.id = uuid();
        }
        if (!a.published) {
            //a.published = new Date().toISOString()
        }
        return a;
    }

    async generateData(): Promise<void> {
        for (let i = 0; i < 10000; i++) {

            let activity: Activity = new Activity();
            activity.actor = {'id': 'P:123', 'type': 'Person'};
            activity.object = {'id': 'Bot:123', 'type': 'Bot'};
            activity.type = 'Login';

            const randomIntHour = getRandomInt(1, 23);
            const hour = randomIntHour < 10 ? '0' + randomIntHour : randomIntHour;

            const randomIntMinute = getRandomInt(1, 59);
            const minute = randomIntMinute < 10 ? '0' + randomIntMinute : randomIntMinute;

            const randomIntSecond = getRandomInt(1, 59);
            const second = randomIntSecond < 10 ? '0' + randomIntSecond : randomIntSecond;
            const dateString = '2018-06-01T' + hour + ':' + minute + ':' + second;
            activity.published = dateString;
            //activity.published = new Date(dateString);
            //TODO use bulk api
            await this.create(activity)
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    async deleteData(): Promise<void> {
        this.delete('{ "query": { "match_all": {}}}')
    }

}
