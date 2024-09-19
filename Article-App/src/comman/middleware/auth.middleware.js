import passport from "passport";
import UnauthorisedException from "../exceptions/unAuthorizedException";

export default (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        try {
           
            if (err) {
                throw new UnauthorisedException((info || info.message) || "Invalid token.")
            }
            req.user = user;
            return next();
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}