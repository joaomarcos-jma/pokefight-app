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
    objParams(obj, nameFieldNumeric) {
        let params = {}
        Object.keys(obj).forEach(res => {
            if (res === 'field' && obj[res]) {
                params.name = !this.isNumeric(obj[res]) ? this.addParameter(res, obj[res] + '&').replace('field', 'name') : ''
                params[nameFieldNumeric] = this.isNumeric(obj[res]) ? this.addParameter(res, obj[res] + '&').replace('field', nameFieldNumeric) : ''
            }
            params[res] = this.addParameter(res, obj[res]) + "&"
            delete params.field;
        })
        this.removeNullFields(params)
        params = Object.values(params).reduce((prev, curr) => prev + curr);
        return params.substr(0, params.length - 1)
    },
    trimString: (string, length) => {
        if (string) {
            return string.length > length ?
                string.substring(0, length) + '...' :
                string;
        }
    }
}
