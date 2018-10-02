export class EntityResult<A> {
    readonly result: Array<A>;

    constructor(result: Array<A>) {
        this.result = result;
    }

}
