import { AddClass, RemoveClass, HasClass } from "mgn-utility";

const Easing = {

    "linear" : function(t, b, c, d) {
        t /= d;
        return c*t + b;
    },

    //Cubic
    "easeInCubic": function(t, b, c, d) {
        t /= d;
        return c*t*t*t + b;
    },
    "easeOutCubic": function(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c*(t*t*t + 1) + b;
    },
    "easeInOutCubic": function(t, b, c, d) {
        t /= d/2.0;
        if (t < 1) {
            return c/2.0*t*t*t + b;
        } else {
            t = t - 2;
            return c/2.0 * (t*t*t + 2) + b;
        }
    },

    //Quartic
    "easeInQuart": function(t, b, c, d) {
        t /= d;
        return c*t*t*t*t + b;
    },
    "easeOutQuart": function(t, b, c, d) {
        t /= d;
        t = t - 1;
        return -c*(t*t*t*t - 1) + b;
    },
    "easeInOutQuart": function(t, b, c, d) {
        t /= d/2.0;
        if (t < 1) {
            return c/2.0*t*t*t*t + b;
        } else {
            t = t - 2;
            return -c/2.0 * (t*t*t*t - 2) + b;
        }
    },

    //Quintic
    "easeInQuint": function(t, b, c, d) {
        t /= d;
        return c*t*t*t*t*t + b;
    },
    "easeOutQuint": function(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c*(t*t*t*t*t + 1) + b;
    },
    "easeInOutQuint": function(t, b, c, d) {
        t /= d/2.0;
        if (t < 1) {
            return c/2.0*t*t*t*t*t + b;
        } else {
            t = t - 2;
            return c/2.0 * (t*t*t*t*t + 2) + b;
        }
    }

};

function Align(num) {
    if ( num >= 1000000000 && num < 10000000000 ) {
        // console.log("0.000GB");
        return {
            unit: "GB",
            divisorNum: 1000000000,
            fixNum: 3
        }
    } else if ( num >= 10000000000 && num < 100000000000 ) {
        // console.log("00.00GB");
        return {
            unit: "GB",
            divisorNum: 1000000000,
            fixNum: 2
        }
    } else if ( num >= 100000000000 && num < 1000000000000 ) {
        // console.log("000.0GB");
        return {
            unit: "GB",
            divisorNum: 1000000000,
            fixNum: 1
        }
    } else if ( num >= 1000000000000 && num < 10000000000000 ) {
        // console.log("0.000TB");
        return {
            unit: "TB",
            divisorNum: 10000000000000,
            fixNum: 3
        }
    } else if ( num >= 10000000000000 ) {
        // console.log("00.00TB");
        return {
            unit: "TB",
            divisorNum: 10000000000000,
            fixNum: 2
        }
    }
};

function TimeCountUp( timeStr, speed, elm, easingType = "easeOutQuint" ) {

    const digits = timeStr.length;
    let padding = "";
    for ( let i = 0; i < digits; i++ ) {
        padding += "0";
    };

    var POSITION = Number(timeStr);

    var SCROLL_VAL = 0;

    var DIFF = POSITION - SCROLL_VAL;
    var num = SCROLL_VAL;

    var START_TIME = new Date().getTime();　//描画開始時刻を取得
    var render;
    var numPrev = SCROLL_VAL;

    var Loop;

    var LoopAnim = function() {

        render = requestAnimationFrame( Loop );

        var CURRENT_TIME = new Date().getTime();　//経過時刻を取得
        var STATUS = (CURRENT_TIME - START_TIME) // 描画開始時刻から経過時刻を引く

        var MOVE_Y = Math.round( Easing[easingType](STATUS, SCROLL_VAL, Math.abs(DIFF), speed) );

        if( DIFF > 0 ) {
            num += MOVE_Y - numPrev;
        } else {
            num +=  - ( MOVE_Y - numPrev );
        }

        // window.scroll( 0, num );
        elm.innerText = (padding + num).slice(-digits);

        numPrev = MOVE_Y;

        if( STATUS >= speed ) {

            cancelAnimationFrame( render );
            // window.scroll( 0, POSITION );
            elm.innerText = (padding + POSITION).slice(-digits);

        }
    }

    Loop = LoopAnim;
    Loop();

}

function SizeCountUp( size, speed, elm, unitElm, easingType = "easeOutQuint" ) {

    const { unit, divisorNum, fixNum } = Align(size);
    unitElm.innerText = unit;

    var POSITION = size;

    var SCROLL_VAL = 0;

    var DIFF = POSITION - SCROLL_VAL;
    var num = SCROLL_VAL;

    var START_TIME = new Date().getTime();　//描画開始時刻を取得
    var render;
    var numPrev = SCROLL_VAL;

    var Loop;

    var LoopAnim = function() {

        render = requestAnimationFrame( Loop );

        var CURRENT_TIME = new Date().getTime();　//経過時刻を取得
        var STATUS = (CURRENT_TIME - START_TIME) // 描画開始時刻から経過時刻を引く

        var MOVE_Y = Math.round( Easing[easingType](STATUS, SCROLL_VAL, Math.abs(DIFF), speed) );

        if( DIFF > 0 ) {
            num += MOVE_Y - numPrev;
        } else {
            num +=  - ( MOVE_Y - numPrev );
        }

        // window.scroll( 0, num );
        elm.innerText = ( num / divisorNum ).toFixed(fixNum);

        numPrev = MOVE_Y;

        if( STATUS >= speed ) {

            cancelAnimationFrame( render );
            // window.scroll( 0, POSITION );
            elm.innerText = ( POSITION / divisorNum ).toFixed(fixNum);

        }
    }

    Loop = LoopAnim;
    Loop();

}

function TitleCountUp( str, speed, elm, easingType = "linear" ) {

    var POSITION = str.length;

    var SCROLL_VAL = 0;

    var DIFF = POSITION - SCROLL_VAL;
    var num = SCROLL_VAL;

    var START_TIME = new Date().getTime();　//描画開始時刻を取得
    var render;
    var numPrev = SCROLL_VAL;

    var Loop = function() {

        render = requestAnimationFrame( Loop );

        var CURRENT_TIME = new Date().getTime();　//経過時刻を取得
        var STATUS = (CURRENT_TIME - START_TIME) // 描画開始時刻から経過時刻を引く

        var MOVE_Y = Math.round( Easing[easingType](STATUS, SCROLL_VAL, Math.abs(DIFF), speed) );

        if( DIFF > 0 ) {
            num += MOVE_Y - numPrev;
        } else {
            num +=  - ( MOVE_Y - numPrev );
        }

        elm.innerText = str.substring(0,num)

        numPrev = MOVE_Y;

        if( STATUS >= speed ) {

            cancelAnimationFrame( render );
            elm.innerText = str
        }
    }

    Loop();
}

const Meter = () => {

    // console.log("/top/sections/_meter.js");
    if ( !document.getElementById('meter') ) {
        return;
    }

    const TITLE  = document.getElementById("meterTitle");
    const HOUR   = document.getElementById("meterHours");
    const MINUTE = document.getElementById("meterMinutes");
    const SECOND = document.getElementById("meterSeconds");
    const MB     = document.getElementById("meterMBs");
    const UNIT   = document.getElementById("meterUnit");

    window.addEventListener("DOMContentLoaded", () => {

        fetch('https://app.recoris.jp/api/total-usage')
            .then( response => response.json())
            .then((response) => {

                const callback = (entries) => {
                    entries.forEach(entry => {

                        if ( entry.isIntersecting ) {

                            if ( !HasClass( entry.target, 'on') ) {
                                AddClass( entry.target, 'on');

                                // console.log("ONになりました")
                                TitleCountUp( TITLE.dataset.title, 2000, TITLE);
                                setTimeout(() => {
                                    [].slice.call( document.querySelectorAll('.p-meter_list'), 0).forEach(v => {
                                        AddClass(v, 'on');
                                    });
                                }, 500);
                                setTimeout(() => {
                                    TimeCountUp( response.time.split(":")[0], 2000, HOUR);
                                    TimeCountUp( response.time.split(":")[1], 2000, MINUTE);
                                    TimeCountUp( response.time.split(":")[2], 2000, SECOND);
                                }, 1000);
                                setTimeout(() => {
                                    SizeCountUp( response.size, 2000, MB, UNIT );
                                }, 3000);
            
                                observer.unobserve(entry.target);
                            }

                        }
            
                      });
                }
                const observer = new IntersectionObserver(callback, {
                    threshold: [ 0.75 ]
                });
            
                observer.observe(document.getElementById('meter'));
            })
            .catch( error => {
                console.log("取得できません。", error)
            })

    }, false)

};

export default Meter;