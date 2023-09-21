
function loadCss(href, callback) {
    console.log(`Loading CSS: ${href}`);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    // if href contains black
    if (href.includes('black')) {
        link.id = 'theme';
    }

    // when loaded, log a message and call the callback
    link.onload = () => {
        console.log(`CSS loaded: ${href}`);
        callback(link);
    }
    document.head.appendChild(link);
}

function loadCsses(csses, callback) {
    // load all csses one after another
    var loadNextCss = function() {
        if (csses.length > 0) {
            loadCss(csses.shift(), loadNextCss);
        } else {
            console.log('All CSSes loaded!');
            callback();
        }
    }
    loadNextCss();
}


function loadScript(src, crossorigin, referrerpolicy, callback) {
    console.log(`Loading script: ${src}`);
    const script = document.createElement('script');
    script.src = src;

    if (crossorigin) {
        script.crossOrigin = crossorigin;
    }

    if (referrerpolicy) {
        script.referrerPolicy = referrerpolicy;
    }

    script.onload = () => {
        console.log(`Script loaded: ${src}`);
        callback(script);
    }

    document.head.appendChild(script);
}

function loadScripts(scripts, crossorigin, referrerpolicy, callback) {
    // load all scripts one after another
    var loadNextScript = function() {
        if (scripts.length > 0) {
            loadScript(scripts.shift(), crossorigin, referrerpolicy, loadNextScript);
        } else {
            console.log('All scripts loaded!');
            callback();
        }
    }
    loadNextScript();
}

// replace [name] with the name of the person specified in the URL
function replaceName() {
    // get the name from the URL : ?firstname=John&lastname=Doe (if not found, use 'Version élève')
    var url = new URL(window.location.href);
    var name = "Version élève";
    if (url.searchParams.has('firstname') && url.searchParams.has('lastname')) {
        name = url.searchParams.get('firstname') + " " + url.searchParams.get('lastname');
    }
    // find [name] in the whole document and replace it with the name
    document.body.innerHTML = document.body.innerHTML.replace(/\[name\]/g, name);
}

// wait for dom to be ready
document.addEventListener('DOMContentLoaded', function() {

    // load all csses
    loadCsses([
        '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/reset.min.css',
        '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/reveal.min.css',
        '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/theme/black.min.css',
        'mycss.css',
        '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/plugin/highlight/monokai.min.css'
    ], function() {



        // load all scripts
        loadScripts([
            //'http://www.jezzamon.com/fourier/main.bundle.js',
            '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/reveal.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/plugin/notes/notes.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/plugin/markdown/markdown.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/plugin/highlight/highlight.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/plugin/math/math.min.js'
        ], 'anonymous', 'no-referrer', function() {

            console.log('Initializing Reveal.js');
            revealpromise = Reveal.initialize({
                hash: true,
                slideNumber: true,
                backgroundTransition: 'slide',
                transition: 'fade',
                katex: {
                    version: 'latest',
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '\\[', right: '\\]', display: true}
                    ]
                },
                // Learn about plugins: https://revealjs.com/plugins/
                plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath.KaTeX]
            });

            revealpromise.then(function() {
                console.log('Reveal.js initialized!');
                console.log('Replacing [name] with the name of the person specified in the URL');
                //replaceName();
                console.log('Reveal.js ready!');
            });


        });

    });

});