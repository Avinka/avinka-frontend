import {Request, Response} from "express";
import {DatapointService} from "./datapointService";

export class DatapointRouter {

    readonly dataPointService: DatapointService;

    constructor(dataPointService: DatapointService) {
        this.dataPointService = dataPointService;
    }

    public routes(app): void {
        app.route('/datapoint')
            .get(async (req: Request, res: Response) => {
                try {
                    const decoded = decodeURIComponent(req.query.query);
                    const query = JSON.parse(decoded);
                    let result = await this.dataPointService.get(query);
                    res.status(200).send(result);
                } catch (err) {
                    res.status(400).send(err.toString());
                }
            })
    }
}
