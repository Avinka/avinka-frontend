import {Client, CreateDocumentResponse, SearchResponse} from "elasticsearch";
import {v4 as uuid} from 'uuid';
import {Activity} from "./activity";
import {ApplicationError} from "../util/error";

export class ActivityService {

    readonly client: Client;
    readonly indexName;
    readonly indexType = 'activity';

    constructor(client: Client, indexName) {
        this.client = client;
        this.indexName = indexName;
    }

    async get(query: string): Promise<Array<Activity>> {
            const result = await this.client.search<Activity>({
                index: this.indexName,
                type: this.indexType,
                body: query
            });
            return result.hits.hits.map(a => a._source);
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
            throw new ApplicationError("Cannot create activity for " + activity.toString(), 500);
        }
        return activity;
    }
}
