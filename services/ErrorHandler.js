import nf from "@/helpers/notification"
export default class ErrorHandler {
    errorHandler(response) {
        switch (response.status) {
            case 400:
                nf.notify('Ops!', "Servidor não entendeu a requisição", "error")
                break;
            case 401:
                nf.notify('Houve um problema!', "Cliente não autorizado!", "error")
                break;
            case 403:
                nf.notify('Desculpe!', "Você não tem permissão para acessar esse conteúdo", "error")
                break;
            case 404:
                nf.notify('Houve um problema!', "O servidor não pode encontrar o recurso solicitado!", "error")
                break;
            case 406:
                nf.notify('Descuple!', "No momento essa operação não é possível!", "error")
                break;
            case 422:
                nf.notify('Desculpe!', "Verifique os campos informados e tente novamente!", "error")
                break;
            case 429:
                nf.notify('Aguarde um momento e tente novamente!', "Você enviou muitas requisições nesse instante!", "error")
            case 500:
                nf.notify('Desculpe!', "O servidor encontrou uma situação com a qual não sabe lidar.", "error")
            case 522:
                nf.notify('Desculpe!', "Houve um erro desconhecido", "error")
        }
    }
}