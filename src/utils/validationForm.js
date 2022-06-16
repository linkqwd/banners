export const validateBannerCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Назва банеру обов\'язкова';
    }
    if (!values.resource || (values.resource && values.resource.length === 0)) {
        errors.resource = 'Ресурс для публікації обов\'язкове поле';
    }
    if (!values.newBanner && !values.fileLink) {
        errors.newBanner = 'Необхідно додати банер';
    }
    if (!values.alt) {
        errors.alt = 'Необхідно додати альтернативний опис';
    }
    if (!values.link) {
        errors.link = 'Необхідно додати посилання на банер';
    } else {
        const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        // Will match the following cases
        // http://www.foufos.gr
        // http://www.foufos.gr/kino
        // http://werer.gr
        // Will NOT match the following
        // www.foufos
        // http://www.foufos
        // http://foufos
        // www.mp3#.com
        if (!expression.test(values.link)) {
            errors.link = 'Вкажіть коректне посилання';
        }
    }
    return errors
};
