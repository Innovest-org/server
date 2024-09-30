const AuthMiddleware = () => {
    return (req, res, next) => {
        if (req.cookies === undefined) {
            res.status(401).json({ message: 'Unauthorized' });
        }else {
            if (req.cookies.token) {
                next();
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        }
    };
};

module.exports = AuthMiddleware ;
