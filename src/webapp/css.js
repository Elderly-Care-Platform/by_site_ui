function loadjscssfile(filename, filetype){
    if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
 
loadjscssfile("lib/unify/plugins/bootstrap/css/bootstrap.min.css?versionTimeStamp=%PROJECT_VERSION%", "css") ////dynamically load and add this .css file
loadjscssfile("lib/jqueryPlugins/jquery-ui-1.11.4.custom/jquery-ui.min.css?versionTimeStamp=%PROJECT_VERSION%", "css")
loadjscssfile("lib/unify/plugins/bootstrap/css/bootstrap-toggle.min.css?versionTimeStamp=%PROJECT_VERSION%", "css")
loadjscssfile("lib/tagmanager-master/tagmanager.css?versionTimeStamp=%PROJECT_VERSION%", "css")
loadjscssfile("lib/unify/plugins/animate.css?versionTimeStamp=%PROJECT_VERSION%", "css")
loadjscssfile("lib/unify/plugins/line-icons/line-icons.css?versionTimeStamp=%PROJECT_VERSION%", "css")
loadjscssfile("lib/unify/plugins/font-awesome/css/font-awesome.min.css?versionTimeStamp=%PROJECT_VERSION%", "css")
loadjscssfile("lib/unify/plugins/flexslider/flexslider.css?versionTimeStamp=%PROJECT_VERSION%", "css")
loadjscssfile("lib/unify/plugins/parallax-slider/css/parallax-slider.css?versionTimeStamp=%PROJECT_VERSION%", "css")
