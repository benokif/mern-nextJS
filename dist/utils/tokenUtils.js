import jwt from 'jsonwebtoken';
export const createJWT = function (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, //process.env.JWT_SECRET,
    {
        expiresIn: '1d', //process.env.JWT_LIFETIME,
    });
};
export const verifyJWT = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};
