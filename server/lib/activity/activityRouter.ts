import {Request, Response} from "express";


export class ActivityRouter {

    public routes(app): void {
        app.route('/activity')
            .get(async (req: Request, res: Response) => {
                res.status(200).send("")
            });
    }
}
