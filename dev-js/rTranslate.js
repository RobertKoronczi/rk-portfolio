// rTranslate - rTranslate.js - Rapid Translate JavaScript mini-library
// author: Robert Koronczi
// Date: 25 Jun, 2019 
// Version: 0.0.1

( function ( global ) {

    var rTranslate = function() {
        return new rTranslate.init();
    };

    var selectAsArray = function( selections ) {

        var arr = document.querySelectorAll( selections );
            arr = Array.prototype.slice.call( arr );

         return arr;

    };

    // This will be the data structure were the language variables are stored
    var languages = [];

    rTranslate.prototype = {

        addLang: function( lang, langArray ) {
            // Building up the structure
            languages[ lang ] = langArray;
            return this; // make the functions chainable this by returning 'this'
        },

        // input: the id of the selection tag in the html file
        // output: the content will be translated on the dom
        setLanguage: function( selectionID ) {

            var selection  = document.querySelector( selectionID );

            var selectedID = selection.options[selection.selectedIndex].getAttribute( 'id' );

            var resources = languages[ selectedID ];

            var options = selectAsArray( 'option[data-rT="rT"]' );
            
            var id = [];
                id = options.map( function( el ) { return el.id; } );

            // Add the corresponding attributes to the spans - created by the jquery.dd.js - 
            // thet contains the list text in the languages menu
            // so that the language names in the selection menu can be changed
            var ddlabel = selectAsArray( '.ddlabel' );

            ddlabel.forEach( function( el, i ) {
                el.setAttribute('data-rT', 'rT');
                el.setAttribute('caption', id[i-1]);
            } );   

            // Selecting and changing the translatable contents in the DOM
            var translatable = selectAsArray( '[data-rT="rT"]' );

            translatable.forEach( function( el ) { 

                var translatedContent = resources[ el.getAttribute( 'caption' ) ];

                el.textContent = translatedContent;
                el.setAttribute( 'data-title', translatedContent);

            } );
            
        },

        // Gives back the array of the strings needs to be typed by typed.js
        getTyped: function( selectionID ) {

            var selection  = document.querySelector( selectionID );

            var selectedID = selection.options[selection.selectedIndex].getAttribute( 'id' );

            var resources = languages[ selectedID ];
            var typedText = [];

            typedText[0] = resources['typed1'];
            typedText[1] = resources['typed2'];

            return typedText;

        }

    };

    rTranslate.init = function() {};

    rTranslate.init.prototype = rTranslate.prototype;

    global.rTranslate = global.rT = rTranslate;

}) ( this );