export interface Query {
}

export class MatchQuery implements Query {
    match: {};

    constructor(key: string, value: any) {
        this.match = {[key]: value}
    }
}

export class RangeQuery implements Query {
    range: {};

    constructor(key: string, value: any, operator: string) {
        this.range = {[key]: {[operator]: value}}
    }
}
