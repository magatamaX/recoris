/*

MeganeTemplate

Version: 5.0.0
Website: http://megane-template.com/
License: Dentsu Isobar All Rights Reserved.

*/
export default class mgnForm {

    constructor() {

        this.selector = '.f-form_label label';
        this.selectorElm = document.querySelectorAll(this.selector);

		this.setProp();

	}

	setProp() {

        const TARGET = this.selector;

        const AddedElmHandler = ( elm, callback, handler ) => {
            const HANDLER = !handler ? "click" : handler;
            document.addEventListener( HANDLER, (e) => {
                let hit = false,
                    t;
                if ( elm.split(".")[1] ) {
                    t = elm.split(".")[1];
                } else if ( elm.split("#")[1] ) {
                    t = elm.split("#")[1];
                } else {
                    t = elm;
                }
                if( e.target.tagName.toLowerCase() == t ) {
                    hit = true;
                } else {
                    if( e.target.className ) {
                        if( e.target.className.match( t ) ) hit = true;
                    } else if( e.target.id ) {
                        if( e.target.id.match( t ) ) hit = true;
                    }
                }
                if( hit ) {
                    callback( e );
                }
            })
        }

        AddedElmHandler( "label", function(e){

            let index = Array.prototype.indexOf.call(document.querySelectorAll( TARGET ), e.target);

            e.target.previousElementSibling.setAttribute('id','__' + index);
            e.target.setAttribute('for','__' + index);

        });

    }
}