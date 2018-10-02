import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {DashboardSchema} from "./dashboard";


export class DashboardRouter {
    Dashboard = mongoose.model('Dashboard', DashboardSchema);

    public routes(app): void {
        app.route('/dashboard')
            .get(async (req: Request, res: Response) => {
                let result = await this.Dashboard.find().exec();
                res.status(200).send(result.toString())
            })
            .post(async (req: Request, res: Response) => {
                // TODO add validation
                let result = await this.Dashboard.create(req.body);
                res.status(200).send(result.toString())
            });
    }
}