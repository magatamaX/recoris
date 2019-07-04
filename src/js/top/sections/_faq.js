import mgnAccordion from 'mgn-accordion';

const Faq = () => {

    // console.log("/top/sections/_faq.js");

    if ( !document.getElementById("faq") ) {
        return;
    }

    let accordion = new mgnAccordion(
        ".j-accordion",
        {
            toggleSpeed: 200,
        }
    );
    let accordion2 = new mgnAccordion(
        ".j-accordion2",
        {
            toggleSpeed: 200,
            btnElm: ".j-accordion2_btn",
            detailElm: ".j-accordion2_detail"
        }
    );
    let accordion3 = new mgnAccordion(
        ".j-accordion3",
        {
            toggleSpeed: 200,
            btnElm: ".j-accordion3_btn",
            detailElm: ".j-accordion3_detail"
        }
    );

};

export default Faq;