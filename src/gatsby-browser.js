exports.onClientEntry = () => {
    window.page = window.page || {};
    window.page.path = window.location.pathname;
}