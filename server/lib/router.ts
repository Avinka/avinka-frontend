import {Request, Response} from "express";
import {DashboardSchema} from "./models/dashboard";
import * as mongoose from "mongoose";


export class Routes {
    Dashboard = mongoose.model('Dashboard', DashboardSchema);

    constructor() {
        let newDashboard = new this.Dashboard({name: "test"});
        newDashboard.save()
    }

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            });
        app.route('/dashboard')
            .get(async (req: Request, res: Response) => {
                let result = await this.Dashboard.find().exec();
                res.status(200).send(result.toString())
            });
    }
}