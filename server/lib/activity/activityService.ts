import {Client} from "elasticsearch";
import {v4 as uuid} from 'uuid';
import {Activity} from "./activity";

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

    async create(activity: Activity): Promise<Activity> {
        if (!activity.id) {
            activity.id = uuid();
        }
        if (!activity.published) {
            activity.published = new Date();
        }
        await this.client.create({
            index: this.indexName,
            id: activity.id,
            type: this.indexType,
            body: activity
        });
        return activity;
    }
}
