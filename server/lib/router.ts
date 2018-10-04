import {Request, Response} from "express";
import {DashboardRouter} from "./dashboard/dashboardRouter";
import {GraphRouter} from "./graph/graphRouter";
import {DataseriesRouter} from "./dataseries/dataseriesRouter";
import {ActivityRouter} from "./activity/activityRouter";
import {ActivityService} from "./activity/activityService";
import {Client} from "elasticsearch";
import {AdminRouter} from "./admin/adminRouter";

export class Router {

    activityService = new ActivityService(
        new Client({hosts: ["127.0.0.1:9200"]}),
        'active-objects-current',
        "activity");

    public activityRouter: ActivityRouter = new ActivityRouter(this.activityService);
    public adminRouter: AdminRouter = new AdminRouter(this.activityService);
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

        this.activityRouter.routes(app);
        this.adminRouter.routes(app);
        this.dashboardRouter.routes(app);
        this.dataSeriesRouter.routes(app);
        this.graphRouter.routes(app);
    }
}
