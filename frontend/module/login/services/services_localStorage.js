getyourcar.factory('services_localStorage', function() {
    let service = {setSession: setSession, clearSession: clearSession};
    return service;

    function setSession(secureSession, jwt) {
        localStorage.setItem('secureSession', secureSession);
        localStorage.setItem('token', jwt);
    }// end_setSession

    function clearSession() {
        localStorage.removeItem('secureSession');
        localStorage.removeItem('token');
    }// end_clearSession
});