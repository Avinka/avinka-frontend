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
        app.route('/dashboard/:id')
            .get(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dashboard.find({_id: id}).exec();
                res.status(200).send(result.toString())
            })
            .delete(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dashboard.deleteOne({_id: id}).exec();
                res.status(200).send(result.toString())
            })
            .put(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dashboard.updateOne({_id: id}, req.body).exec();
                res.status(200).send(result.toString())
            });
    }
}