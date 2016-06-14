

    var head = document.getElementsByTagName('head')[0];
    var files = ['lib/unify/plugins/bootstrap/css/bootstrap.min.css', 'lib/jqueryPlugins/jquery-ui-1.11.4.custom/jquery-ui.min.css', 
    'lib/unify/plugins/bootstrap/css/bootstrap-toggle.min.css', 'lib/tagmanager-master/tagmanager.css',
    'lib/unify/plugins/animate.css', 'lib/unify/plugins/line-icons/line-icons.css', 'lib/unify/plugins/font-awesome/css/font-awesome.min.css',
    'lib/unify/plugins/flexslider/flexslider.css', 'lib/unify/plugins/parallax-slider/css/parallax-slider.css', 'assets/css/final.min.css'];

    for (var i = 0, l = files.length; i < l; i++) {
      var link = document.createElement('link');
      link.href = files[i];
      link.rel = "stylesheet";
      link.type = "text/css";

      head.appendChild(link);
    }
