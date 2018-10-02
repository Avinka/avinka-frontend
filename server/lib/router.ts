import {Request, Response} from "express";
import {DashboardRouter} from "./dashboard/dashboardRouter";
import {GraphRouter} from "./graph/graphRouter";
import {DataseriesRouter} from "./dataseries/dataseriesRouter";

export class Router {

    public dashboardRouter: DashboardRouter = new DashboardRouter();
    public graphRouter: GraphRouter = new GraphRouter();
    public dataSeriesRouter: DataseriesRouter = new DataseriesRouter();

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            });

        this.dashboardRouter.routes(app);
        this.graphRouter.routes(app);
        this.dataSeriesRouter.routes(app);
    }
}