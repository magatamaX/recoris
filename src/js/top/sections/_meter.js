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

function SecToHour (time) {
    const sec = (time % 60) % 60;
    const min = Math.floor(time / 60) % 60;
    const hour = Math.floor(time / 3600);

    return {
      hour: hour,
      min: min,
      sec: sec
    }
};

function TimeCountUp( second, speed, hourElm, minElm, secElm, easingType = "easeOutQuint" ) {

    var POSITION = second;

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

        hourElm.innerText = String(SecToHour(num)['hour']);
        minElm.innerText = (`${"00"}${String(SecToHour(num)['min'])}`).slice(-2);
        secElm.innerText = (`${"00"}${String(SecToHour(num)['sec'])}`).slice(-2);

        numPrev = MOVE_Y;

        if( STATUS >= speed ) {

            cancelAnimationFrame( render );
            hourElm.innerText = (`${"000"}${String(SecToHour(num)['hour'])}`).slice(-3);
            minElm.innerText = (`${"00"}${String(SecToHour(num)['min'])}`).slice(-2);
            secElm.innerText = (`${"00"}${String(SecToHour(num)['sec'])}`).slice(-2);
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

const Meter = () => {

    // console.log("/top/sections/_meter.js");
    if ( !document.getElementById('meter') ) {
        return;
    }

    const API_PATH = 'https://app.recoris.jp/api/total-usage';

    const TITLE  = document.getElementById("meterTitle");
    const HOUR   = document.getElementById("meterHours");
    const MINUTE = document.getElementById("meterMinutes");
    const SECOND = document.getElementById("meterSeconds");
    const MB     = document.getElementById("meterMBs");
    const UNIT   = document.getElementById("meterUnit");

    const Sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    const Fetch = async (url) => {
        const result = await fetch(url)
            .then( res => res.json() )
            .then( res => ({
                duration: res.duration,
                size: res.size
            }))
            .catch( error => {
                console.log("取得できません。", error);
                throw new Error(error)
            })
        return result
    };
    const Reload = (url, timeout) => {
        const repeat = () => {
            // console.log('更新します。')
            Fetch(url)
                .then(({ duration, size }) => {
                    const { unit, divisorNum, fixNum } = Align(size);
                    HOUR.innerText = SecToHour(duration)['hour'];
                    MINUTE.innerText = (`${"00"}${String(SecToHour(duration)['min'])}`).slice(-2);
                    SECOND.innerText = (`${"00"}${String(SecToHour(duration)['sec'])}`).slice(-2);
                    MB.innerText = ( size / divisorNum ).toFixed(fixNum);
                    UNIT.innerText = unit;
                })
                .catch(e => {
                    HOUR.innerText = "-";
                    MINUTE.innerText = "--";
                    SECOND.innerText = "--";
                    MB.innerText = "----";
                });
        }
        setInterval(repeat, timeout);
    }

    const callback = (entries) => {
        entries.forEach(entry => {

            if ( entry.isIntersecting ) {

                if ( !HasClass( entry.target, 'on') ) {
                    AddClass( entry.target, 'on');

                    (async () => {

                        await Sleep(500);
                        await [].slice.call( document.querySelectorAll('.p-meter_list'), 0).forEach(v => {
                            AddClass(v, 'on');
                        });
                        await Sleep(500)
                        await Fetch(API_PATH)
                            .then(({ duration, size }) => {
                                TimeCountUp( duration, 2000, HOUR, MINUTE, SECOND);
                                SizeCountUp( size, 2000, MB, UNIT );
                            })
                            .catch(e => {
                                HOUR.innerText = "---";
                                MINUTE.innerText = "--";
                                SECOND.innerText = "--";
                                MB.innerText = "----";
                            });
                        await Sleep(8000);
                        await Reload(API_PATH, 5000);
                        await observer.unobserve(entry.target);

                    })();
                    
                }

            }

          });
    }
    const observer = new IntersectionObserver(callback, {
        threshold: [ 0.75 ]
    });

    observer.observe(document.getElementById('meter'));

};

export default Meter;