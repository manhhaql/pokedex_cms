import Cookie from 'js-cookie';
class Cookies {
    constructor() { };

    static set(name, value, options) {
        Cookie.set(name, value, options);
    };
    static get(name) {
        return Cookie.get(name);
    };
    static remove(name) {
        Cookie.remove(name);
    };
};

export default Cookies;