"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./useCases/createUser/CreateUserController");
const router = (0, express_1.Router)();
exports.router = router;
const createUserController = new CreateUserController_1.CreateUserController();
router.post("/users", createUserController.handle);
