var Gift = Gift || (function($) {

    var opts = {
        paper: '[image-url]',
        message: ['first-line', 'second-line'],
        curl: true,
        animationSpeed: 1000
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

    function unwrap(el, curl, speed) {
        if(curl){
        	el.addClass('curl');
        	setTimeout(function(){
        		el.hide();
        		localStorage.unwrapped = true;
        	}, speed);
        } else {
        	el.fadeOut(speed);
        	localStorage.unwrapped = true;
        }
    }
	
	function getVendorPrefix() {
	    var tmp = document.createElement("div"),
	        prefixes = 'webkit Moz o ms'.split(' '),
	        i;
	    for (i in prefixes) {
	        if (typeof tmp.style[prefixes[i] + 'Transition'] != 'undefined') {
	            return [prefixes[i], '-'+(prefixes[i]).toLowerCase()+'-'];
	        }
	    }
	}
	
	function addCurlCSS(animationSpeed, prefix){
        var styles = '@'+prefix[1]+'keyframes curl {0%{width:100%;'+prefix[1]+'border-top-left-radius: 40px 10px;'+prefix[1]+'border-bottom-left-radius: 40px 10px;'+prefix[1]+'border-top-right-radius: 200px 10px;'+prefix[1]+'border-bottom-right-radius: 200px 10px;}10%  {'+prefix[1]+'border-top-left-radius: 100px 60px;'+prefix[1]+'border-bottom-left-radius: 100px 60px;'+prefix[1]+'border-top-right-radius: 200px 10px;'+prefix[1]+'border-bottom-right-radius: 200px 10px;}100% { width: 0%; }} .curl{'+prefix[1]+'animation: curl '+animationSpeed+'ms ease; '+prefix[1]+'box-shadow:100px 0 150px -80px #000 inset;}';
        $('<style type="text/css"></style>').html(styles).appendTo('head');
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
		
        opts = $.extend(opts, inputOpts),
        prefix = getVendorPrefix(),
        myTransition = prefix[1]+'transition';

        loadFonts();

        var _wrap = $('<div id="gift-wrap"></div>').css({
            position: 'fixed',
            zIndex: 9999,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'url(' + opts.paper + ') center center',
            cursor: 'pointer',
            overflow:'hidden'
        });

		if(opts.curl){
			addCurlCSS(opts.animationSpeed, prefix);
			_wrap.css(myTransition, 'all 1s ease');
		}

        _wrap.on('click', function() {
            unwrap(_wrap, opts.curl, opts.animationSpeed);
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -150,
            marginTop: -50,
            outline: '15px solid rgba(0, 0, 0, 0.1)',
            border:'1px solid #fff',
            fontFamily: "'Seaweed Script', cursive"
        }).html(_message);
        
        var _ribbon_v = $('<div id="ribbon_v"></div>').css({
            position: 'absolute',
            width: 50,
            height:'100%',
            left:'50%',
            marginLeft:'-25px',
            background:'#fafafa',
            borderLeft:'2px dashed #999',
            borderRight:'2px dashed #999'
        });
        
        var _ribbon_h = $('<div id="ribbon_h"></div>').css({
            position: 'absolute',
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