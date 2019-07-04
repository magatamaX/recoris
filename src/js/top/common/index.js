import { AddClass, RemoveClass, HasClass } from "mgn-utility";
import mgnSmoothScroll from 'mgn-smooth-scroll';

const Common = () => {

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
    
        observer.observe(HEADER);

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

export default Common;