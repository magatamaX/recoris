const Meter = () => {

    // console.log("/top/sections/_meter.js");
    if ( !document.getElementById('meter') ) {
        return;
    }

    const HOUR = document.getElementById("meterHours");
    const MINUTE = document.getElementById("meterMinutes");
    const SECOND = document.getElementById("meterSeconds");
    const MB = document.getElementById("meterMBs");

    window.addEventListener("DOMContentLoaded", () => {

        fetch('https://app.recoris.jp/api/total-usage')
            .then( response => response.json())
            .then( response => {               
                HOUR.innerText = response.time.split(":")[0];
                MINUTE.innerText = response.time.split(":")[1];
                SECOND.innerText = response.time.split(":")[2];
                MB.innerText = String(Math.round(response.size / 1048576)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            })
            .catch( error => {
                console.log("取得できません。", error)
            })

    }, false)

};

export default Meter;