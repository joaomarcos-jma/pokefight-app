export default {
    cpf: (value) => {
        const firstNineDigits = value.substring(0, 9);
        const checker = value.substring(9, 11);
        if (value.length !== 11) {
            return false;
        }
        for (let i = 0; i < 10; i++) {
            const j = i + '';
            if ('' + firstNineDigits + checker === Array(12).join(j)) {
                return false;
            }
        }
        let sum = null;
        for (let j = 0; j < 9; ++j) {
            sum += firstNineDigits.toString().charAt(j) * (10 - j);
        }
        const lastSumChecker1 = sum % 11;
        const checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;
        sum = null;
        const cpfWithChecker1 = firstNineDigits + checker1;
        for (let k = 0; k < 10; ++k) {
            sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
        }
        const lastSumChecker2 = sum % 11;
        const checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;
        if (checker.toString() === checker1.toString() + checker2.toString()) {
            return true;
        }
        return false;
    },
    cnpj: (value) => {
        if (/^([0-9])\1*$/.test(value)) {
            return false;
        }
        let length = value.length - 2;
        let numbers = value.substring(0, length);
        const digits = value.substring(length);
        let sum = 0;
        let pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== Number(digits.charAt(0))) {
            return false;
        }
        length = length + 1;
        numbers = value.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== Number(digits.charAt(1))) {
            return false;
        }
        return true;
    }
}
