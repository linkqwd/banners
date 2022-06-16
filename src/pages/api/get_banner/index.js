import { connectToDatabase } from "utils";
import { DOCUMENT_SERVICE_API } from "../../../consts/routesApi";


const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


const getBanner = async (req, res) => {
    const {method, query} = req;

    switch (method) {
        case 'GET':
            try {
                const {db} = await connectToDatabase();
                const {resource} = query;

                const banners = await db
                    .collection("bannerPanel")
                    .find(resource ? {resource, active: true} : {})
                    .toArray();

                if (banners.length === 0) {
                    res.status(200).json({
                        success: false,
                        randomBannerIndex: null,
                        totalActiveBanners: banners.length,
                        banner: null,
                    });
                }

                const randomBannerIndex = getRandomIntInclusive(0, banners.length)
                const totalActiveBanners = banners.length;

                if (!resource) {
                    res.status(200).json({
                        success: false,
                        randomBannerIndex,
                        totalActiveBanners,
                        banners,
                    });

                } else {
                    res.status(200).json({
                        success: true,
                        randomBannerIndex,
                        totalActiveBanners,
                        banner: banners[randomBannerIndex],
                    });
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

export default getBanner
