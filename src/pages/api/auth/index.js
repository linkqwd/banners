import { AUTH_API_SERVICE } from 'consts/routesApi';


const auth = async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { method, params } = JSON.parse(req.body);
                const body = {
                    "jsonrpc": "2.0",
                    "id": 3241,
                    method,
                    params,
                }

                const request = new Request(AUTH_API_SERVICE, {
                    method: 'POST',
                    body: JSON.stringify(body),
                });
                const response = await fetch(request);
                const responseJSON = await response.json();
                const {status} = response;
                res.status(status).json(responseJSON)
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
};

export default auth
