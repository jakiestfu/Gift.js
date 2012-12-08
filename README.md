Gift.js
=======

<img src="https://forrst-production.s3.amazonaws.com/multiposts/images/23752/mega.png?1354991353">

A Javascript library for wrapping your websites up as a present

To demo the script, follow <a href="http://lab.jakiestfu.com/giftjs/" target="_blank">lab.jakiestfu.com/giftjs</a>

# Usage

````
$(document).ready(function(){
    Gift.wrap({
        paper: 'http://lab.jakiestfu.com/giftjs/menorah.jpg', // Your tilable background
        message: ['To: Mom & Dad', 'With Love, from Emily & Jacob'] // To and From text
    });
}); 

````

This will "wrap" up your website and allow it to be "unwrapped" when clicked.

Currently, the styles are applied via javascript because I felt the temporary nature of this script would be complemented by only using jQuery as a dependency.

# Resetting

If your browser supports the <code>localStorage</code> object, the gift paper will not display on subsequent visits (so the receiver of your lovely gift doesn't have to unwrap it each page load).
To reset the script, visit the page with #resetgift in your url. That will unset the Gift.js identifier in <code>localStorage</code>.

# Happy Gifting!