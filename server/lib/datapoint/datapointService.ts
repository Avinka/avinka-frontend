import {Client, SearchResponse} from "elasticsearch";
import {Activity} from "../activity/activity";
import {Dataseries, IDataseries} from "../dataseries/dataseries";
import {DataPoints} from "./datapoints";
import {ESQuery} from "../query/ESQuery";
import {Query} from "./Query";
import {ESQueryBuilder} from "../query/ESQueryBuilder";

export class DatapointService {

    readonly client: Client;
    readonly indexName;
    readonly indexType;

    constructor(client: Client, indexName: string, indexType: string) {
        this.client = client;
        this.indexName = indexName;
        this.indexType = indexType;
    }

    async get(query: Query): Promise<DataPoints> {
        const esQuery = ESQueryBuilder.buildFromQuery(query)
        const agg = this.buildAggregation(query);
        const body = {
            'query': esQuery,
            '_source': false,
            'aggregations': agg
        };
        const response = await this.client.search<Activity>({
            index: this.indexName,
            type: this.indexType,
            body: body
        });
        return  this.buildDataPoints(response);
    }

    buildDataPoints(response: SearchResponse<Activity>): DataPoints {
        const buckets = response.aggregations.grouping.buckets;
        let counts = {};
        buckets.map(x => {
            const date = x['key_as_string'];
            const value = x['doc_count'];
            counts[date] = value;
        });
        let result = new DataPoints();
        result.data = counts;
        return result;
    }

    buildAggregation(query: Query): Object {
        return {
            'grouping': {
                'date_histogram': {
                    'field': 'published',
                    'interval': query.agg_interval || '1h',
                    'offset': 0,
                    'order': {'_key': 'asc'},
                    'keyed': false,
                    'min_doc_count': 0
                }
            }
        };
    }
}
