import {Client, CreateDocumentResponse, SearchResponse} from "elasticsearch";
import {v4 as uuid} from 'uuid';
import {Activity} from "./activity";

export class ActivityService {

    readonly client: Client;
    readonly indexName;
    readonly indexType = 'activity';

    constructor(client: Client, indexName) {
        this.client = client;
        this.indexName = indexName;
    }

    async get(query: string): Promise<Array<Activity>> {
        try {
            return (await this.client.search<Activity>({
                index: this.indexName,
                type: this.indexType,
                body: query
            })).hits.hits.map(a => a._source);
        } catch (err) {
            //TODO error handling
            console.log(err)
        }
    }

    async create(activity: Activity): Promise<Activity> {
        if (!activity.id) {
            activity.id = uuid();
        }
        if (!activity.published) {
            activity.published = new Date();
        }
        try {
            await this.client.create({
                index: this.indexName,
                id: activity.id,
                type: this.indexType,
                body: activity
            });
        } catch (err) {
            //TODO error handling
            console.log(err)
        }
        return activity;
    }
}
