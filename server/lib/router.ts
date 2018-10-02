import {Request, Response} from "express";
import {DashboardRouter} from "./dashboard/dashboardRouter";
import {GraphRouter} from "./graph/graphRouter";
import {DataseriesRouter} from "./dataseries/dataseriesRouter";
import {ActivityRouter} from "./activity/activityRouter";

export class Router {

    public dashboardRouter: DashboardRouter = new DashboardRouter();
    public graphRouter: GraphRouter = new GraphRouter();
    public dataSeriesRouter: DataseriesRouter = new DataseriesRouter();
    public activityRouter: ActivityRouter = new ActivityRouter();

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
        this.activityRouter.routes(app);
    }
}
