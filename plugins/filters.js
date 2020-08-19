import Vue from "vue"
Vue.filter('cpfOrCnpj', function (value) {
    if (value && value.length === 14) {
        // eslint-disable-next-line no-useless-escape
        return value.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
            "$1.$2.$3/$4-$5"
        );
    } else if (value && value.length === 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }
})

Vue.filter('phone', function (tel) {
    let value = tel
        .toString()
        .trim()
        .replace(/^\+/, "");
    let city, number;
    switch (value.length) {
        case 10:
            city = value.slice(0, 2);
            number = value.slice(2);
            break;

        case 11:
            city = value.slice(0, 2);
            number = value.slice(2);
            break;

        default:
            return tel;
    }
    value.length > 10
        ? (number = number.slice(0, 5) + "-" + number.slice(5))
        : (number = number.slice(0, 4) + "-" + number.slice(4));

    return ("(" + city + ") " + number).trim();
})
