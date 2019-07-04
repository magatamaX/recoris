import Glide from '@glidejs/glide';

const Feature = () => {

    // console.log("/top/sections/_feature.js");
    if ( !document.getElementById("feature") ) {
        return;
    }

    const Slide = () => {

        const commonOptions = {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            autoplay: false,
            gap: 0,
            animationDuration: 500,
            animationTimingFunc: 'ease',
            classes: {
                activeNav: 'active',
            }
        };
    
    

        const glide__glide__slide1 = new Glide('.glide__glide__slide1', {
            ...commonOptions,
            autoplay: 2000,
            animationDuration: 1000,
        });
        const glide__glide__slide2 = new Glide('.glide__glide__slide2', {
            ...commonOptions,
            autoplay: 1500,
            animationDuration: 800,
        });

        glide__glide__slide1.mount();
        glide__glide__slide2.mount();
    
    }

    Slide();

};

export default Feature;