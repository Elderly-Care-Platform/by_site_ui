define(['byApp', 'byUtil'], function(byApp, byUtil) {
    function classesActivitiesCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window) {
    
        $scope.telNo = BY.config.constants.byContactNumber;

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


    classesActivitiesCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window'];
    byApp.registerController('classesActivitiesCtrl', classesActivitiesCtrl);

    return classesActivitiesCtrl;
});