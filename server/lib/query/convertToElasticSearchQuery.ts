import {ISelector} from "./selector";

export function convertToElasticSearchQuery(selector: ISelector): Query {
    const operator = selector.operator;
    switch (operator) {
        case "=": {
            return new MatchQuery(selector.key, selector.value);
        }
        default: {
            throw new Error('Invalid selector type')
        }
    }
}

export interface Query {
    toJSON(): string
}

export class MatchQuery implements Query {
    key: string;
    value: any;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }

    toJSON(): string {
        let pair = {};
        pair[this.key] = this.value;
        const json = {
            'match' : pair
        }
        return JSON.stringify(json);
    }
}

