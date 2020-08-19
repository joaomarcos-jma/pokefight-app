export default {
    removeNullFields: (obj) => {
        Object.entries(obj).forEach(([key, val]) =>
            (val && typeof val === 'object') && this.removeNullFields(val) ||
            (val === null || val === "") && delete obj[key]
        );
        return obj;
    },
    leftZero(num, size) {
        const s = `000000000${num}`;
        return s.substr(s.length - size);
    },
    isNumeric(x) {
        return parseInt(x)
    },
    addParameter(param, value) {
        let regexp = new RegExp("(\\?|\\&)" + param + "\\=([^\\&]*)(\\&|$)");
        if (regexp.test(document.location.search))
            return (document.location.search.toString().replace(regexp, function (a, b, c, d) {
                return (b + param + "=" + value + d);
            }));
        else
            return document.location.search + param + "=" + value;
    },
    objParams(obj) {
        let params = {}
        Object.keys(obj).forEach(res => {
            if (res === 'field' && obj[res]) {
                params.name = !this.isNumeric(obj[res]) ? this.addParameter(res, obj[res]).replace('field', 'name') : ''
                params.cpf = this.isNumeric(obj[res]) ? this.addParameter(res, obj[res]).replace('field', 'cpf') : ''
            }
            params[res] = this.addParameter(res, obj[res]) + "&"
            delete params.field;
        })
        return params
    },
    trimString: (string, length) => {
        if (string) {
            return string.length > length ?
                string.substring(0, length) + '...' :
                string;
        }
    },
    // goTo(path) {
    //     return router.push(path)
    // }
}