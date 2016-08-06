define(['byApp', 'byUtil'], function(byApp, byUtil) {
    function walkingSCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window) {
        
       $scope.telNo = BY.config.constants.byContactNumber;
       window.scrollTo(0, 0);

       $scope.showVideo = function(){       
        $("#by_expVideoFrame").attr("src", 'https://www.youtube.com/embed/z9LkUOGUyrA?rel=0&showinfo=0&autoplay=1');
       	var frameHeight = $(".by_expVideoShow").outerHeight();
    	   $("#by_expVideoFrame").attr("height", frameHeight);
       	$(".by_expVideoShow").hide();
       	$("#by_expVideoFrame").show();
       };

       

        (function(){
            var metaTagParams = {
                title:  "Walking stickes - Elder care products - BeautifulYears",
                imageUrl:   "",
                description:   "",
                keywords:[]
            }
            BY.byUtil.updateMetaTags(metaTagParams);
        })();

             
    }

    walkingSCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window'];
    byApp.registerController('walkingSCtrl', walkingSCtrl);

    return walkingSCtrl;
});