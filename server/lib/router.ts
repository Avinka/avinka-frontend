import {Request, Response} from "express";
import {DashboardRouter} from "./dashboard/dashboardRouter";
import {GraphRouter} from "./graph/graphRouter";
import {DataseriesRouter} from "./dataseries/dataseriesRouter";
import {ActivityRouter} from "./activity/activityRouter";
import {ActivityService} from "./activity/activityService";
import {Client} from "elasticsearch";
import {AdminRouter} from "./admin/adminRouter";
import {CounterRouter} from "./counter/counterRouter";
import {CounterService} from "./counter/counterService";
import {DataseriesService} from "dataseries/dataseriesService";
import {Model} from "mongoose";
import {DataseriesSchema, IDataseriesModel} from "./dataseries/dataseries";
import * as mongoose from "mongoose";

export class Router {
    //TODO move this into an own class
    readonly indexName = 'active-objects-current';
    readonly indexType = 'activity'
    readonly elasticSearchClient: Client = new Client({hosts: ["127.0.0.1:9200"]})

    readonly Dataseries: Model<IDataseriesModel> = mongoose.model<IDataseriesModel>('Dataseries', DataseriesSchema);

    readonly activityService = new ActivityService(this.elasticSearchClient, this.indexName, this.indexType);
    readonly counterService = new CounterService(this.elasticSearchClient, this.indexName, this.indexType);
    readonly dataSeriesService = new DataseriesService(this.Dataseries, this.counterService);

    readonly activityRouter: ActivityRouter = new ActivityRouter(this.activityService);
    readonly adminRouter: AdminRouter = new AdminRouter(this.activityService);
    readonly counterRouter: CounterRouter = new CounterRouter(this.counterService);
    readonly dashboardRouter: DashboardRouter = new DashboardRouter();
    readonly graphRouter: GraphRouter = new GraphRouter();
    readonly dataSeriesRouter: DataseriesRouter = new DataseriesRouter(this.dataSeriesService);

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
        this.counterRouter.routes(app);
    }
}
