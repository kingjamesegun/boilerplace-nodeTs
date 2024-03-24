import authJwt from "./authjwt";
import verifySignUp from "./verifySingUp";

const middleware = { authJwt, verifySignUp };
export default middleware;
