import {Client, CreateDocumentResponse} from "elasticsearch";
import {uuidv1} from "uuid/v1";

class ActivityService {

    client: Client = new Client({hosts: ["127.0.0.1:9200:9200"]});

    get(query: string): Array<Activity> {
        return [];
    }

    async save(activity: Activity): Promise<void> {
        await this.client.create({
            index: 'active-objects-current',
            id: uuidv1(),
            type: 'doc',
            body: activity.toString()
        });
    }
}
