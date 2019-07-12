import { AddClass, RemoveClass, HasClass } from "mgn-utility";
import mgnSmoothScroll from 'mgn-smooth-scroll';
import mgnForm from "../libs/mgnform";

const SVG = () => {
    if ( !window.Snap ) {
        return;
    }

    const SVGs = [].slice.call(document.querySelectorAll('.j-dots'), 0);

    const DURATION = 200;

    SVGs.forEach( v => {

        const SVG = Snap(v);       
        const RECTS = SVG.selectAll('rect');

        RECTS.forEach( rect => {
            const fnAnimation = () => {
                rect.animate({
                    'opacity': 0
                }, DURATION, () => {
                    rect.animate({
                        'opacity': 1
                    }, DURATION, () => {
                        fnAnimation();
                    });
                });
            };

            setTimeout(fnAnimation, Math.random()*1000);
            
        });

    });
};

const HeaderFunc = () => {
    // console.log("/top/common/index.js");

    // Sticky Header
    window.addEventListener("DOMContentLoaded", () => {

        // Smooth Scroll
    const HEADER = document.querySelector("#staticHeader > div");
    const CLONE_HEADER = HEADER.cloneNode(true);

    document.querySelector("#stickyHeader").appendChild(CLONE_HEADER);

    const callback = (entries) => {
        entries.forEach(entry => {
            
            if ( entry.isIntersecting ) {
                if ( HasClass( CLONE_HEADER, 'on') ) {
                    RemoveClass( CLONE_HEADER, 'on');
                }
            } else {
                if ( !HasClass( CLONE_HEADER, 'on') ) {
                    AddClass( CLONE_HEADER, 'on');
                }
            }

          });
    }
    const observer = new IntersectionObserver(callback, {
        threshold: [ 0 ]
    });

    observer.observe(HEADER.querySelector(".side"));

    const SP_MENU = CLONE_HEADER.querySelector(".side");
    const TOGGLE_BUTTON = CLONE_HEADER.querySelector("a.toggle");
    TOGGLE_BUTTON.addEventListener("click", (e) => {

        e.preventDefault();

        if ( HasClass( SP_MENU, "on") ) {
            RemoveClass( SP_MENU, "on" )
        } else {
            AddClass( SP_MENU, "on" ) 
        }

        if ( HasClass( TOGGLE_BUTTON, "on") ) {
            RemoveClass( TOGGLE_BUTTON, "on" )
        } else {
            AddClass( TOGGLE_BUTTON, "on" ) 
        }

    }, false);

    [].slice.call( SP_MENU.querySelectorAll("a.j-smooth-scroll"), 0 ).forEach( v => {
        v.addEventListener("click", () => {

            if ( HasClass( SP_MENU, "on") ) {
                RemoveClass( SP_MENU, "on" )
            } else {
                AddClass( SP_MENU, "on" ) 
            }

            if ( HasClass( TOGGLE_BUTTON, "on") ) {
                RemoveClass( TOGGLE_BUTTON, "on" )
            } else {
                AddClass( TOGGLE_BUTTON, "on" ) 
            }

        });
    });

    let scroll = new mgnSmoothScroll(
        "a.j-smooth-scroll",
        {
            easing: "easeOutQuint",
            ignore: ".ignore",
            posFix: 60,
            blank: true,
        }
    );

    }, false);
};

const agreementPrivacyPolicy = () => {

    if ( !document.getElementById('contact') ) {
        return;
    }

    new mgnForm();

    document.getElementById("agreement").addEventListener("change", e => {
        console.log(e)
        if ( e.target.checked ) {
            document.getElementById('submitButton').removeAttribute('disabled');
        } else {
            document.getElementById('submitButton').setAttribute('disabled', '');
        }
    })

}

const Common = () => {
    // console.log("/common/index.js");
    // SVG();
    HeaderFunc();
    agreementPrivacyPolicy();
};

export default Common;