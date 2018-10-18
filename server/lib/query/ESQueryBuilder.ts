import {ISelector, Selector} from "./selector";
import {MatchQuery, ESQuery, RangeQuery} from "./esquery";
import {Query} from "../datapoint/Query";

export class EsQueryBuilder {

    static buildFromQuery(query: Query): ESQuery {
        if (query.isEmpty()) {
            return {"match_all": {}}
        }
        let filters = query.selectors.map(x => this.buildFromSelector(x));

        if (query.since) {
            filters.push(new RangeQuery("published", new Date(query.since).toISOString(), 'gte'));
        }
        if (query.until) {
            filters.push(new RangeQuery("published", new Date(query.until).toISOString(), 'lte'));
        }
        return {
            "bool": {
                "must": [
                    {"match_all": {}}
                ],
                "filter": filters
            }
        }
    }

    static buildFromSelector(selector: ISelector): ESQuery {
        switch (selector.operator) {
            case "=": {
                return new MatchQuery(selector.key, selector.value);
            }
            case ">": {
                return new RangeQuery(selector.key, selector.value, 'gt');
            }
            case ">=": {
                return new RangeQuery(selector.key, selector.value, 'gt');
            }
            case "<": {
                return new RangeQuery(selector.key, selector.value, 'lt');
            }
            case "<=": {
                return new RangeQuery(selector.key, selector.value, 'lte');
            }
            default: {
                throw new Error('Invalid selector type');
            }
        }
    }
}
