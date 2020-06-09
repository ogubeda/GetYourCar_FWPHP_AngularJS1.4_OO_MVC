getyourcar.factory('services_shop', function() {
    let service = {setArray: setArray};
    return service;

    function setArray(obj) {
        let arr = [];

        for (row in obj) {
            arr.push(obj[row].carPlate);
        }// end_for

        return arr;
    }// end_setArray
    
});