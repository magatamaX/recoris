const Kv = () => {

    // console.log("/top/sections/_kv.js");
    if ( !document.getElementById('kvVideo')) {
        return;
    }

    const VIDEO = document.getElementById('kvVideo').querySelector('video');
    const BUTTON = document.getElementById('kvVideo').querySelector('button');

    BUTTON.addEventListener('click', function () {
        if(VIDEO.muted){
            VIDEO.muted = false;
            BUTTON.className = "on";
        }else{
            VIDEO.muted = true;
            BUTTON.className = "off";
        }
    });

};

export default Kv;