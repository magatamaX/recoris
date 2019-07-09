import { AddClass, RemoveClass } from "mgn-utility";

function Align(num) {
    if ( num >= 1000000000 && num < 10000000000 ) {
        return ( num / 1000000 ).toFixed(0)
    } else if ( num >= 10000000000 && num < 100000000000 ) {
        return ( num / 10000000000 ).toFixed(3)
    } else if ( num >= 100000000000 && num < 1000000000000 ) {
        return ( num / 10000000000 ).toFixed(2)
    } else if ( num >= 1000000000000 && num < 10000000000000 ) {
        return ( num / 10000000000 ).toFixed(1)
    } else if ( num >= 10000000000000 ) {
        return ( num / 10000000000 ).toFixed(0)
    }
};

function CountUp( target, num, callback ) {

    var time = 2000;
    var START_TIME = new Date().getTime();　//描画開始時刻を取得

    var Loop = setInterval( function(){

        var CURRENT_TIME = new Date().getTime(); //経過時刻を取得
        var STATUS = CURRENT_TIME - START_TIME; // 描画開始時刻から経過時刻を引く

        var val = easeOutQuint(STATUS, 0, num, time);
            val = Math.round(val);
            val = String(val).split(""); //1の位と10の位に分割

        for (var i = 0; i < val.length; i++) {
            var place = (target.length - val.length) + i;
            target[place].style.opacity = 1;
            val[i] == 1 ? AddClass( target[place], "one" ) : RemoveClass( target[place], "one" );
            target[place].innerHTML = val[i];
        }

        if( STATUS >= time ) {
            clearInterval( Loop );
            if(callback) callback();
        }

    }, 33);

    function easeOutQuint(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c*(t*t*t + 1) + b;
    }

}

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
                MB.innerText = String(Align(response.size)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            })
            .catch( error => {
                console.log("取得できません。", error)
            })

    }, false)

};

export default Meter;