define(['byApp', 'byUtil'], function(byApp, byUtil) {
    function expStoreCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window) {
        
       $scope.telNo = BY.config.constants.byContactNumber;
       window.scrollTo(0, 0);

       $scope.showVideo = function(){       
        $("#by_expVideoFrame").attr("src", 'https://www.youtube.com/embed/z9LkUOGUyrA?rel=0&showinfo=0&autoplay=1');
       	var frameHeight = $(".by_expVideoShow").outerHeight();
    	   $("#by_expVideoFrame").attr("height", frameHeight);
       	$(".by_expVideoShow").hide();
       	$("#by_expVideoFrame").show();
       };

       var init = initialize();
        function initialize() {
            $(".by_header").removeClass("by_header_image"); 
            $(".by_header").addClass("by_headerBoder");
            angular.element($window).bind("scroll", function () {
                var headerHeight = $(".by_header").height();
                if ((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) >= headerHeight) {
                     BY.byUtil.changeHeaderImage();
                     $(".by_header").addClass("by_header_image"); 
                     $(".by_header").removeClass("by_headerBoder");
                } else {
                     BY.byUtil.changeHeaderImage();
                     $(".by_header").removeClass("by_header_image"); 
                     $(".by_header").addClass("by_headerBoder");
                }
                    
            });
        }

             
    }

    expStoreCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window'];
    byApp.registerController('expStoreCtrl', expStoreCtrl);

    return expStoreCtrl;
});