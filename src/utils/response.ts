import { Response } from "express";

class Responses {
    static normal(res: Response, msg: string, data?: any) {
        return res.send({
            msg,
            data
        });
    }

    static error(res: Response, msg: string, status = 400, data?: any) {
        return res.status(status).send({
            msg,
            data
        });
    }
}

export default Responses;