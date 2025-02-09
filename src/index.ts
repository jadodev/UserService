import express from "express";
import { UserRepository } from "./infrastructure/repository/UserRepository";
import { UserServiceDomain } from "./domain/service/UserServiceDomain";
import { UserApplicationService } from "./application/service/UserApplication";
import { UserController } from "./infrastructure/controller/UserController";


const app = express();
const PORT = 9000;

app.use(express.json());

const userRepository = new UserRepository();
const userServiceDomain = new UserServiceDomain(userRepository);
const userServiceApplication = new UserApplicationService(userServiceDomain);
const userController = new UserController(userServiceApplication);

app.use("/", userController.getRouter());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});