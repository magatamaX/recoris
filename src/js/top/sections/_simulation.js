const Simulation = () => {

    // console.log("/top/sections/_simulation.js");

    if ( !document.getElementById("simulation") ) {
        return;
    }


    const getPricePerHour = (hour) => {
        if ( hour <= 100 ) {
            return 50000;
        } else if ( hour > 100 && hour <= 200) {
            return hour * 400;
        } else if ( hour > 200 && hour <= 1000 ) {
            return hour * 380;
        } else if ( hour > 1000 && hour <= 2500 ) {
            return hour * 360;
        } else if ( hour > 2500 && hour <= 5000 ) {
            return hour * 350;
        } else {
            throw Error('金額が大きすぎます。');
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
            throw Error('金額が大きすぎます。');
        }
    };

    const calculate = () => {
        const people = Number(document.getElementById('people').value) || 0;
        const days   = Number(document.getElementById('days').value)   || 0;
        const hours  = Number(document.getElementById('hours').value)  || 0;

        try {
            document.getElementById('pricePerHour').innerText = String(getPricePerHour( hours*days*people )).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            document.getElementById('pricePerGB').innerText   = String(getPricePerGB( 0.015*hours*days*people )).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            document.getElementById('totalPrice').innerText   = String(getPricePerHour( hours*days*people ) + getPricePerGB( 0.015*hours*days*people )).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        } catch (e) {
            console.log(e);
            document.getElementById('pricePerHour').innerText = '---';
            document.getElementById('pricePerGB').innerText   = '---';
            document.getElementById('totalPrice').innerText   = '---';
        };
    }

    const FORM = document.getElementById('simulationForm');

    FORM.addEventListener("keyup", calculate, false);
    FORM.addEventListener("change", calculate, false);

};

export default Simulation;