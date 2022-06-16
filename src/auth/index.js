import { auth_token } from 'consts/cookie';
import { AUTH_API } from 'consts/routesApi';
import { setCookie, deleteCookie, getCookie } from 'utils/cookies';


export const authProvider = {
    login: async ({ username, password }) => {
        const request = new Request(AUTH_API, {
            method: 'POST',
            body: JSON.stringify({
                "method": "login",
                "params": {
                    "email": username,
                    "passwd": password,
                },
            }),
        });

        const { result } = await fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(() => {
                throw new Error('Виникла помилка під час авторизації, перевірте та пароль, або спробуйте пізніше')
            });

        if (result) {
            setCookie(auth_token, result)
            return Promise.resolve()
        } else {
            return Promise.reject();
        }
    },
    checkAuth: async () =>  {
        const authCookie = getCookie(auth_token)

        if (!authCookie) {
            return Promise.reject();
        }

        const request = new Request(AUTH_API, {
            method: 'POST',
            body: JSON.stringify({
                "method": "check",
                "params": {
                    "auth_token": authCookie,
                },
            }),
        });

        const { result } = await fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(() => {
                throw new Error('Помилка підтвердження авторизації')
            });

        const employeeName = result.employee && result.employee.data.full_name

        if (result) {
            localStorage.setItem('username', employeeName);
            return Promise.resolve()
        } else {
            return Promise.reject();
        }
    },
    logout: () => {
        localStorage.removeItem('username');
        deleteCookie(auth_token)
        return Promise.resolve();
    },
    getIdentity: () =>
        Promise.resolve({
            fullName: localStorage.getItem('username'),
        }),
    getPermissions: () => Promise.resolve(''),
    // checkError:  (error) => {
        // const status = error.status;
        // if (status === 401 || status === 403) {
        //     localStorage.removeItem('username');
        //     return Promise.reject();
        // }
        // other error code (404, 500, etc): no need to log out
        // return Promise.resolve();
    // },
};
