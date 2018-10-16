import {Client} from "elasticsearch";
import {Activity} from "../activity/activity";
import {Dataseries, IDataseries} from "../dataseries/dataseries";
import {DataPoints} from "./datapoints";
import {convertToElasticSearchQuery} from "../query/convertToElasticSearchQuery";

export class DatapointService {

    readonly client: Client;
    readonly indexName;
    readonly indexType;

    constructor(client: Client, indexName: string, indexType: string) {
        this.client = client;
        this.indexName = indexName;
        this.indexType = indexType;
    }

    async get(dataseries: IDataseries): Promise<Object> {
        let query;
        if (dataseries.selectors && dataseries.selectors.length > 0) {
            const filters: Array<string> = dataseries.selectors.map(x => convertToElasticSearchQuery(x).toJSON());
            query = {
                    "match_all": {},
                'filter': filters
            }
        } else {
            query = {
                    "match_all": {}
            }
        }
        const agg = {
            'grouping': {
                'date_histogram': {
                    'field': 'published',
                    'interval': 3600000,
                    'offset': 0,
                    'order': {'_key': 'asc'},
                    'keyed': false,
                    'min_doc_count': 0
                }
            }
        };
        const body = {
            'query': query,
            '_source': false,
            'aggregations': agg
        };
        const aggregation = await this.client.search<Activity>({
            index: this.indexName,
            type: this.indexType,
            body: body
        });
        //TODO return undefined if there is no result
        const buckets = aggregation.aggregations.grouping.buckets;
        let counts = {};
        buckets.map(x => {
            const date = x['key_as_string'];
            const value = x['doc_count'];
            counts[date] = value;
        });
        let result = new DataPoints();
        result.dataseriesId = dataseries._id;
        result.name = dataseries.name || 'default';
        result.data = counts;
        return result;
    }
}
