export class Activity {
    id?: string
    published?: Date;
    type: string;
    actor?: Object;
    object?: Object;
    target?: Object;
}

export class EntityResult<A> {
    readonly result: Array<A>;

    constructor(result: Array<A>) {
        this.result = result;
    }

}
