const FormData = require('form-data');

import { connectToDatabase } from "utils";
import { DOCUMENT_UPLOAD_SERVICE_API } from "consts/routesApi";


const bannerPanelId =  async (req, res) => {
    const { query: { id }, body = {}, method } = req

    switch (method) {
        case 'GET':
            try {
                const {db} = await connectToDatabase();
                const banner = await db.collection("bannerPanel").findOne({id: id});

                res.setHeader('Content-Range', '');
                res.status(200).json(banner);
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const { newBanner, name, description, active, resource, alt, link, fileLink } = body;

                if (![name, resource, alt, link].every(Boolean)) {
                    res.status(400).json({
                        success: false,
                        reason: 'no documents were created, some fields were not fulfilled',
                    })
                    return;
                }

                let replacedFields = {
                    name,
                    description,
                    active,
                    resource,
                    alt,
                    link,
                    lastUpdateDate: new Date().toLocaleDateString(),
                };

                if (newBanner) {
                    const originalFilename = newBanner.title;
                    let buff = Buffer.from(newBanner.src.replace(/^data:image\/png;base64,/, ""), 'base64');
                    const form = new FormData();
                    form.append('file', buff, originalFilename);

                    const request = new Request(DOCUMENT_UPLOAD_SERVICE_API, {
                        method: 'POST',
                        body: form
                    });
                    const response = await fetch(request)
                    const responseJSON = await response.json()
                    console.log(responseJSON)
                    if (responseJSON) {
                        const { data: {uid} } = responseJSON;
                        replacedFields.fileLink = `${DOCUMENT_UPLOAD_SERVICE_API}/${uid}`;
                    }
                }

                const {db} = await connectToDatabase();
                const {modifiedCount} = await db.collection("bannerPanel").updateOne(
                    {id: id},
                    {$set: replacedFields}
                );

                if (modifiedCount > 0) {
                    res.status(200).json(body);
                } else {
                    throw new Error('no documents were updated')
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const {db} = await connectToDatabase();
                const {deletedCount} = await db.collection("bannerPanel").deleteOne(
                    {id: id},
                );

                if (deletedCount > 0) {
                    res.status(200).json(body);
                } else {
                    throw new Error('no documents were deleted')
                }
            } catch (error) {
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

export default bannerPanelId
