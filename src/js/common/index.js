// import Snap from "../libs/snap.svg";

const Common = () => {
    // console.log("/common/index.js");

    if ( !window.Snap ) {
        return;
    }

    const SVGs = [].slice.call(document.querySelectorAll('.j-dots'), 0);

    const DURATION = 800;

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

export default Common;