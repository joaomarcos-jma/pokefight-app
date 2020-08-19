import moment from 'moment'
export default {
    telFormat: (rawValue) => {
        const REGEX_OITO_DIGITOS = '####-####';
        const REGEX_NOVE_DIGITOS = '# ####-####';
        const rawValueLength = rawValue.replace(/[^\d]/g, '').length;
        return rawValueLength < 9 ? REGEX_OITO_DIGITOS : REGEX_NOVE_DIGITOS;
    },
    dateFormatBackEnd: (date) => {
        return moment(String(date)).format(`DD/MM/YYYY`)
    },
    dateFormatHh: (date) => {
        return moment(String(date)).format(`DD/MM/YYYY - HH:mm`)
    },
    hourFormat: (date) => {
        return moment(String(date)).format(`HH:mm:ss`)
    },
    phoneFormat: (rawValue) => {
        const REGEX_OITO_DIGITOS = '(##) ####-####';
        const REGEX_NOVE_DIGITOS = '(##) # ####-####';
        const rawValueLength = rawValue.replace(/[^\d]/g, '').length;
        return rawValueLength < 11 ? REGEX_OITO_DIGITOS : REGEX_NOVE_DIGITOS;
    },
    cpfFormat: () => {
        return '###.###.###-##'
    },
    cnpjFormat: () => {
        return '##.###.###/####-##'
    },
    cepFormat: () => {
        return '#####-###'
    },
    unmask: (value) => {
        return value.replace(/\D+/g, '')
    },
    maskCnpjOrCpf(rawValue) {
        const CPF = this.cpfFormat();
        const CNPJ = this.cnpjFormat();
        if (rawValue) {
            const rawValueLength = rawValue.replace(/\D+/g, '').length;
            return rawValueLength > 11 ? CNPJ : CPF;
        }
        return CPF;
    },
}
