import {Request, Response} from "express";
import {ActivityService} from "activity/activityService";

export class AdminRouter {

    readonly activityService: ActivityService;

    constructor(activityService: ActivityService) {
        this.activityService = activityService;
    }

    public routes(app): void {
        app.route('/admin/generateData')
            .get(async (req: Request, res: Response) => {
                this.activityService.generateData()
            })
        app.route('/admin/deleteData')
            .get(async (req: Request, res: Response) => {
                this.activityService.deleteData()
            })
    }
}


