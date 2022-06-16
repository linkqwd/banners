import restProvider from 'ra-data-simple-rest';


const dataProvider = restProvider('http://localhost:3000/api');

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });


const putHandler = (resource, params) => {
    if (resource !== 'bannerPanel') {
        // fallback to the default implementation
    }

    const newPicture = params.data.newBanner && params.data.newBanner.rawFile instanceof File
    if (newPicture) {
        return Promise.resolve(convertFileToBase64(params.data.newBanner))
            .then((base64Pictures) => {
                    return {
                        src: base64Pictures,
                        title: `${params.data.newBanner.title}`,
                    }
                }
            )
            .then(transformedNewPictures =>
                dataProvider.update(resource, {
                    id: params.id,
                    data: {
                        ...params.data,
                        newBanner: transformedNewPictures,
                    },
                })
            );
    }
    return Promise.resolve().then(() => {
        return dataProvider.update(resource, params);
    })
}

const postHandler = (resource, params) => {
    if (resource !== 'bannerPanel') {
        // fallback to the default implementation
        return dataProvider.create(resource, params);
    }

    const newPicture = params.data.newBanner && params.data.newBanner.rawFile instanceof File

    if (newPicture) {
        return Promise.resolve(convertFileToBase64(params.data.newBanner))
            .then((base64Pictures) => {
                    return {
                        src: base64Pictures,
                        title: `${params.data.newBanner.title}`,
                    }
                }
            )
            .then(transformedNewPictures => {
                return dataProvider.create(resource, {
                    data: {
                        ...params.data,
                        newBanner: transformedNewPictures,
                    },
                })}
            );

    }
    return Promise.resolve().then(() => {
        return dataProvider.create(resource, params);
    })
}

export const CustomDataProvider = {
    ...dataProvider,
    create: postHandler,
    // update: putHandler,
};
