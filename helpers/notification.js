import Swal from "sweetalert2";
export default {
    notify(title, message, icon) {
        Swal.fire({
            icon: icon,
            title: title,
            text: message,
        })
    }
}