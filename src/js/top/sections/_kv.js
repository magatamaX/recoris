const Kv = () => {

    // console.log("/top/sections/_kv.js");
    if ( !document.getElementById('kvVideo')) {
        return;
    }

    const VIDEO = document.getElementById('kvVideo').querySelector('video');
    const BUTTON = document.getElementById('kvVideo').querySelector('button');
    const LOADING_ICON = document.getElementById('kvVideo').querySelector('.loading');

    VIDEO.addEventListener("loadeddata", e => {
        ( async ()=> {

            const Sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

            VIDEO.play();
            await Sleep(700);
            LOADING_ICON.className = await "loading loaded";
            await Sleep(500);
            LOADING_ICON.className = await "loading loaded off";

        })();
    })

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