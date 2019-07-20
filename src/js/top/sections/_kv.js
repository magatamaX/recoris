import mgnUa from "mgn-ua";

const Kv = () => {

    // console.log("/top/sections/_kv.js");
    if ( !document.getElementById('kvVideo')) {
        return;
    }

    const VIDEO = document.getElementById('kvVideo').querySelector('video');
    const SRC = "/assets/video/video.mp4?v=20190721";
    const BUTTON = document.getElementById('kvVideo').querySelector('button');
    const LOADING_ICON = document.getElementById('kvVideo').querySelector('.loading');

    const Ua = new mgnUa();

    const PlayVideo = async () => {
        const Sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
        await Sleep(700);
        LOADING_ICON.className = await "loading loaded";
        await Sleep(500);
        LOADING_ICON.className = await "loading loaded off";
    }

    if ( Ua.isSp ) {

        // console.log("SP");
        const VIDEO_HOLDER = document.querySelector('.p-kv_video_element');
        VIDEO_HOLDER.innerHTML = "";

        const NEW_VIDEO = document.createElement('video');
        VIDEO_HOLDER.appendChild(NEW_VIDEO);
        
        NEW_VIDEO.muted = true;
        NEW_VIDEO.setAttribute("playsinline", "");
        NEW_VIDEO.setAttribute("webkit-playsinline", "");
        NEW_VIDEO.autoplay = true;
        NEW_VIDEO.addEventListener("play", () => {
            PlayVideo();
        }, false);
        NEW_VIDEO.src = VIDEO_HOLDER.dataset.src;

        BUTTON.addEventListener('click', function () {
            if(NEW_VIDEO.muted){
                NEW_VIDEO.muted = false;
                BUTTON.className = "on";
            }else{
                NEW_VIDEO.muted = true;
                BUTTON.className = "off";
            }
        });

    } else {

        // console.log("Not SP");

        VIDEO.addEventListener("loadeddata", () => {
            VIDEO.play();
            PlayVideo();
        }, false);

        BUTTON.addEventListener('click', function () {
            if(VIDEO.muted){
                VIDEO.muted = false;
                BUTTON.className = "on";
            }else{
                VIDEO.muted = true;
                BUTTON.className = "off";
            }
        });

    }

};

export default Kv;