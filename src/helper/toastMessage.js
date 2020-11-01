import toastr from 'toastr';

const options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

class ToastMessage {
    constructor(props) {
        
    };

    static showSuccess({ title, message }) {
        toastr.options = options;
        toastr.clear()
        toastr.success(message, title);
    };
    static showInfo({ title, message }) {
        toastr.options = options;
        toastr.clear()
        toastr.info(message, title);
    };
    static showWarning({ title, message }) {
        toastr.options = options;
        toastr.clear();
        toastr.warning(message, title);
    };
    static showError({ title, message }) {
        toastr.options = options;
        toastr.clear();
        toastr.error(message, title);
    };
};

export default ToastMessage;