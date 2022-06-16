export const getCookie = (cname) => {
    // Get name followed by anything except a semicolon
    const cookieString = RegExp(cname + "=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, "") : "");
}

export const setCookie = (cname, cvalue) => {
    document.cookie = cname + '=' + cvalue + '; Path=/;';
}

export const deleteCookie = (cname) => {
    document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const parseCookie = str => str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
