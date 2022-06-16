const FormData = require('form-data');

import { connectToDatabase, getRandomId } from 'utils';
import { DOCUMENT_SERVICE_UPLOAD_API } from 'consts/routesApi';


const bannerPanelBase = async (req, res) => {
    const {body, method, query} = req

    switch (method) {
        case 'GET':
            try {
                const {db} = await connectToDatabase();
                const limitArray = JSON.parse(query.range);
                const sort = JSON.parse(query.sort);
                const {resource} = JSON.parse(query.filter);
                const sortKey = sort[0];
                const sortValue = sort[1]

                const count = await db.collection("bannerPanel").count()
                const banners = await db
                    .collection("bannerPanel")
                    .find(resource ? {resource} : {})
                    .limit(limitArray[1])
                    .sort({ [sortKey]: sortValue})
                    .toArray();

                res.setHeader('Content-Range', `${limitArray[0]}-${limitArray[1]}/${count}`);
                res.status(200).json(banners);
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const { newBanner, name, description, active, resource, alt, link, author } = body;

                if (![newBanner, name, resource, alt, link].every(Boolean)) {
                    res.status(400).json({
                        success: false,
                        reason: '1',
                    })
                    return;
                }

                const originalFilename = newBanner.title;
                let buff = Buffer.from(newBanner.src.replace(/^data:image\/png;base64,/, ""), 'base64');
                const form = new FormData();
                form.append('file', buff, originalFilename);

                const request = new Request(DOCUMENT_SERVICE_UPLOAD_API, {
                    method: 'POST',
                    body: form
                });
                const response = await fetch(request)
                const responseJSON = await response.json()

                if (responseJSON) {
                    const { data: { uid }} = responseJSON;
                    const {db} = await connectToDatabase();
                    const {insertedId} = await db.collection("bannerPanel").insertOne(
                        {
                            id: getRandomId(),
                            name,
                            description,
                            active,
                            resource,
                            alt,
                            link,
                            author,
                            fileLink: `${DOCUMENT_SERVICE_UPLOAD_API}/${uid}`,
                            publicationDate: new Date().toLocaleDateString(),
                        }
                    );

                    if (insertedId) {
                        res.status(200).json(body);
                    } else {
                        res.status(400).json({
                            success: false,
                            reason: 'no insertion ID was provided from mongo',
                        })
                    }
                } else {
                    res.status(400).json({
                        success: false,
                        reason: 'no data from document_service',
                    })
                }
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

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
}

export default bannerPanelBase
