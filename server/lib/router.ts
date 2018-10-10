import {Request, Response} from "express";
import {DashboardRouter} from "./dashboard/dashboardRouter";
import {GraphRouter} from "./graph/graphRouter";
import {DataseriesRouter} from "./dataseries/dataseriesRouter";
import {ActivityRouter} from "./activity/activityRouter";
import {ActivityService} from "./activity/activityService";
import {Client} from "elasticsearch";
import {AdminRouter} from "./admin/adminRouter";
import {Model} from "mongoose";
import {DataseriesSchema, IDataseriesModel} from "./dataseries/dataseries";
import * as mongoose from "mongoose";
import {DatapointService} from "./datapoint/datapointService";
import {DatapointRouter} from "./datapoint/datapointRouter";
import {SelectorRouter} from "./query/selectorRouter";

export class Router {
    //TODO move this into an own class
    readonly indexName = 'active-objects-current';
    readonly indexType = 'activity';
    readonly elasticSearchClient: Client = new Client({hosts: ["127.0.0.1:9200"]});
    readonly Dataseries: Model<IDataseriesModel> = mongoose.model<IDataseriesModel>('Dataseries', DataseriesSchema);

    readonly activityService = new ActivityService(this.elasticSearchClient, this.indexName, this.indexType);
    readonly datapointService = new DatapointService(this.elasticSearchClient, this.indexName, this.indexType);

    readonly activityRouter: ActivityRouter = new ActivityRouter(this.activityService);
    readonly adminRouter: AdminRouter = new AdminRouter(this.activityService);
    readonly datapointRounter: DatapointRouter = new DatapointRouter(this.datapointService);
    readonly dashboardRouter: DashboardRouter = new DashboardRouter();
    readonly graphRouter: GraphRouter = new GraphRouter();
    readonly dataSeriesRouter: DataseriesRouter = new DataseriesRouter(this.datapointService);
    readonly selectorRouter: SelectorRouter = new SelectorRouter();

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
        this.datapointRounter.routes(app);
        this.selectorRouter.routes(app);
    }
}
