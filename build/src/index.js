"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const model_1 = __importDefault(require("./model"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const Role = model_1.default.role;
app.get("/", (req, res) => {
    res.send("Hello World!, New");
});
function initial() {
    Role.create({
        id: 1,
        name: "user",
    });
    Role.create({
        id: 2,
        name: "moderator",
    });
    Role.create({
        id: 3,
        name: "admin",
    });
}
// routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
