import jwt from "jsonwebtoken"

const genToken = (userId, isAdmin = false) => {
    try {
        const payload = { userId, isAdmin: Boolean(isAdmin) };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export default genToken