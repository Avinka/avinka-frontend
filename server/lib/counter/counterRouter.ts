import {Request, Response} from "express";
import {Result} from "../util/result";
import {CounterService} from "./counterService";

export class CounterRouter {

    readonly counterService: CounterService;

    constructor(counterService: CounterService) {
        this.counterService = counterService;
    }

    public routes(app): void {
        app.route('/counter')
            .get(async (req: Request, res: Response) => {
                try {
                    let result = await this.counterService.get(req.body);
                    res.status(200).send(new Result(result));
                } catch (err) {
                    res.status(400).send(err.toString());
                }
            })
    }
}
