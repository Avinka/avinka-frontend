import {ISelector} from "./selector";
import {MatchQuery, Query, RangeQuery} from "./query";

export function convertToElasticSearchQuery(selector: ISelector): Query {
    switch (selector.operator) {
        case "=": {
            return new MatchQuery(selector.key, selector.value);
        }
        case ">": {
            return new RangeQuery(selector.key, selector.value, selector.operator);
        }
        case "<": {
            return new RangeQuery(selector.key, selector.value, selector.operator);
        }
        default: {
            throw new Error('Invalid selector type');
        }
    }
}


