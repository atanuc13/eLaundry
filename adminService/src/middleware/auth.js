const url = process.env.USER_URL;
const role = process.env.USER_ROLE
const axios = require("axios");

const authFunc = async(req, resp, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        await axios.get(url + "/" + role, { headers: { Authorization: `Bearer ${token}` } })
        next();
    } catch (e) {
        console.log(e);
        resp.status(401).send({ error: 'unable to authenticate!' });
    }
}

module.exports = authFunc;