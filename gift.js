var Gift = Gift || (function($) {

    var opts = {
        paper: '[image-url]',
        message: ['first-line', 'second-line']
    };


    function loadFonts() {
        WebFontConfig = {
            google: {
                families: ['Seaweed+Script::latin']
            }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
    }

    function unwrap(el) {
        el.fadeOut();
        localStorage.unwrapped = true;
    }

    function init(inputOpts) {
  	
		if(typeof(Storage)!=="undefined"){
			if(window.location.hash=="#resetgift"){
				localStorage.removeItem('unwrapped');
			}
			if(localStorage.unwrapped){
				return;
			}
		}
		
        opts = $.extend(opts, inputOpts);

        loadFonts();

        var _wrap = $('<div id="gift-wrap"></div>').css({
            position: 'fixed',
            zIndex: 9999,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'url(' + opts.paper + ') center center',
            cursor: 'pointer'
        });

        _wrap.on('click', function() {
            unwrap(_wrap);
        });

        var _message = $('<p></p>').css({
            color: '#444',
            textAlign: 'center',
            fontSize: '25px',
            lineHeight: '50px',
            margin:0
        }).html((opts.message).join('<br />'));

        var _card = $('<div id="gift-wrap-note"></div>').css({
            background: '#fafafa',
            width: 300,
            height: 100,
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginLeft: -150,
            marginTop: -50,
            outline: '15px solid rgba(0, 0, 0, 0.1)',
            border:'1px solid #fff',
            fontFamily: "'Seaweed Script', cursive"
        }).html(_message);
        
        var _ribbon_v = $('<div id="ribbon_v"></div>').css({
            position: 'fixed',
            width: 50,
            height:'100%',
            left:'50%',
            marginLeft:'-25px',
            background:'#fafafa',
            borderLeft:'2px dashed #999',
            borderRight:'2px dashed #999'
        });
        
        var _ribbon_h = $('<div id="ribbon_h"></div>').css({
            position: 'fixed',
            height: 50,
            width:'100%',
            top:'50%',
            marginTop:'-25px',
            background:'#fafafa',
            borderTop:'2px dashed #999',
            borderBottom:'2px dashed #999'
        });

        _wrap.html(_card);
        _wrap.prepend(_ribbon_v);
        _wrap.prepend(_ribbon_h);
        $('body').prepend(_wrap);
    }

    return {
        wrap: init
    };

})(window.jQuery);