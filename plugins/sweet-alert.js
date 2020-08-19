import Swal from "sweetalert2";

export default (context, inject) => {
    inject("swal", Swal);
};
