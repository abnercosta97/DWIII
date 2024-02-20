import { Response, Request } from "express";

class CarController {
  VW(req: Request, res: Response) {
    res.send("Fusca");
  }

  FIAT = (req: Request, res: Response) => res.send("Elba");
}

export default new CarController();

//
