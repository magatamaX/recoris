const Simulation = () => {

    // console.log("/top/sections/_simulation.js");

    if ( !document.getElementById("simulation") ) {
        return;
    }


    const getPricePerHour = (hour) => {
        if ( hour <= 100 ) {
            return 50000;
        } else if ( hour > 100 && hour <= 200) {
            return 80000;
        } else if ( hour > 200 && hour <= 1000 ) {
            return 380000;
        } else if ( hour > 1000 && hour <= 2500 ) {
            return 900000;
        } else if ( hour > 2500 && hour <= 5000 ) {
            return 1750000;
        } else {
            return 0;
        }
    };

    const getPricePerGB = (GB) => {
        if ( GB <= 10 ) {
            return 10000;
        } else if ( GB > 10 && GB <= 100 ) {
            return 80000;
        } else if ( GB > 100 && GB <= 1000 ) {
            return 200000;
        } else if ( GB > 1000 && GB <= 2000 ) {
            return 300000;
        } else if ( GB > 2000 && GB <= 3000 ) {
            return 360000;
        } else {
            return 0;
        }
    };

    const calculate = () => {
        const people = Number(document.getElementById('people').value) || 0;
        const days = Number(document.getElementById('days').value) || 0;
        const hours = Number(document.getElementById('hours').value) || 0;

        document.getElementById('pricePerHour').innerText = getPricePerHour(hours*days*people);
        document.getElementById('pricePerGB').innerText = getPricePerGB(days);
        document.getElementById('totalPrice').innerText = getPricePerHour(hours*days*people) + getPricePerGB(days);
    }

    const FORM = document.getElementById('simulationForm');

    FORM.addEventListener("keyup", calculate, false);
    FORM.addEventListener("change", calculate, false);

};

export default Simulation;