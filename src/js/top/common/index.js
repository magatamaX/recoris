import { AddClass, RemoveClass, HasClass } from "mgn-utility";

const Common = () => {

    // console.log("/top/common/index.js");

    // Sticky Header
    window.addEventListener("DOMContentLoaded", () => {

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

    }, false);

};

export default Common;