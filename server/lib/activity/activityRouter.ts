import {Request, Response} from "express";
import {ActivityService} from "./ActivityService";
import {EntityResult} from "./activity";

export class ActivityRouter {

    readonly activityService;

    constructor(activityService: ActivityService) {
        this.activityService = activityService;
    }

    public routes(app): void {
        app.route('/activity')
            .get(async (req: Request, res: Response) => {
                try {
                    let result = await this.activityService.get(req.body);
                    res.status(200).send(new EntityResult(result))
                } catch (err) {
                    res.status(400).send(err.toString());
                }
            })
            .post(async (req: Request, res: Response) => {
                try {
                    let result = await this.activityService.create(req.body);
                    res.status(200).send(result)
                } catch (err) {
                    res.status(400).send(err.toString());
                }
            });
    }
}
