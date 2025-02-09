import express, { Request, Response } from "express";
import { UserApplicationService } from "../../application/service/UserApplication";

export class UserController {
    constructor( private readonly userservice: UserApplicationService){
        this.router = express.Router();
        this.inicializeRoutes();
    }

    private async create(req:Request, res: Response){
        try {
            const user = await this.userservice.execute(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: "Error"})
        }
    }

    private async getUserById(req:Request, res: Response){
        try {
            const id = req.params.id;
            const user = await this.userservice.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: "User Not Found"})
        }
    }

    private router: express.Router;

    private inicializeRoutes(){
        this.router.post("/", this.create.bind(this));
        this.router.get("/:id", this.getUserById.bind(this));
    }

    public getRouter(){
        return this.router;
    }
}