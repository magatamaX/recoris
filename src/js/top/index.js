import Common from "./common/";
import Sections from "./sections/"

const Top = () => {

    if ( !document.getElementById('top') ) {
        return;
    }
    
    console.log("/top/index.js");
    Common();
    Sections();

};

export default Top;