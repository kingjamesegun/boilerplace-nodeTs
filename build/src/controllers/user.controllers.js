"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderatorContent = exports.adminContent = exports.userContent = exports.allAcess = void 0;
const allAcess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.allAcess = allAcess;
const userContent = (req, res) => {
    res.send(200).send("User content");
};
exports.userContent = userContent;
const adminContent = (req, res) => {
    res.send(200).send("Admin content");
};
exports.adminContent = adminContent;
const moderatorContent = (req, res) => {
    res.send(200).send("Moderator content");
};
exports.moderatorContent = moderatorContent;
