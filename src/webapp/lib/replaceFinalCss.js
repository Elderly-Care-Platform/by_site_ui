

setTimeout(function () {
    var head = document.getElementsByTagName('head')[0];
    var files = ['assets/css/final.min.css'];

    for (var i = 0, l = files.length; i < l; i++) {
      var link = document.createElement('link');
      link.href = files[i];
      link.rel = "stylesheet";
      link.type = "text/css";

      head.appendChild(link);
    }
}, 500);