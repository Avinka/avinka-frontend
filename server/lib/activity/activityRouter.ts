import {Request, Response} from "express";
import {Client} from "elasticsearch";
import {ActivityService} from "./ActivityService";
import {EntityResult} from "./activity";

export class ActivityRouter {

    activityService = new ActivityService(new Client({hosts: ["127.0.0.1:9200"]}), 'active-objects-current');

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
