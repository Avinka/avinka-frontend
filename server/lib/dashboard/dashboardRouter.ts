import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {DashboardSchema, IDashboardModel} from "./dashboard";
import {Model} from "mongoose";


export class DashboardRouter {

    readonly Dashboard: Model<IDashboardModel> = mongoose.model<IDashboardModel>('Dashboard', DashboardSchema);

    public routes(app): void {
        app.route('/dashboard')
            .get(async (req: Request, res: Response) => {
                let result = await this.Dashboard.find().exec();
                res.status(200).send(result)
            })
            .post(async (req: Request, res: Response) => {
                // TODO add validation
                let result = await this.Dashboard.create(req.body);
                res.status(200).send(result)
            });
        app.route('/dashboard/:id')
            .get(async (req: Request, res: Response) => {
                const id = req.params.id;
                let findOne = this.Dashboard.findOne({_id: id});
                if(req.query.full === 'true') {
                    findOne = findOne.populate('graphs')
                }
                let result = await findOne.exec();
                res.status(200).send(result)
            })
            .delete(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dashboard.deleteOne({_id: id}).exec();
                res.status(200).send(result)
            })
            .put(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dashboard.updateOne({_id: id}, req.body).exec();
                res.status(200).send(result)
            });
        app.route('/dashboard/:id/graph')
            .post(async (req: Request, res: Response) => {
                // TODO add validation
                const dashboardId = req.params.id;
                let result = await this.Dashboard.findOne({_id: dashboardId});
                // @ts-ignore
                result.graphs.push(req.body.graphId);
                await result.save();
                res.status(201).send(result)
            })
            .get(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dashboard.findOne({_id: id}).populate('graphs').exec();
                // @ts-ignore
                res.status(200).send(result.graphs)
            });

    }
}
