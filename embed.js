(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-arcade/",
    "verprefix": "",
    "workerjs": "/pxt-arcade/worker.js",
    "monacoworkerjs": "/pxt-arcade/monacoworker.js",
    "gifworkerjs": "/pxt-arcade/gifjs/gif.worker.js",
    "pxtVersion": "5.5.33",
    "pxtRelId": "",
    "pxtCdnUrl": "/pxt-arcade/",
    "commitCdnUrl": "/pxt-arcade/",
    "blobCdnUrl": "/pxt-arcade/",
    "cdnUrl": "/pxt-arcade/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "arcade",
    "simUrl": "/pxt-arcade/simulator.html",
    "partsUrl": "/pxt-arcade/siminstructions.html",
    "runUrl": "/pxt-arcade/run.html",
    "docsUrl": "/pxt-arcade/docs.html",
    "isStatic": true
};

    var scripts = [
        "/pxt-arcade/highlight.js/highlight.pack.js",
        "/pxt-arcade/bluebird.min.js",
        "/pxt-arcade/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-arcade/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/pxt-arcade/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/pxt-arcade/target.js");
    scripts.push("/pxt-arcade/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
