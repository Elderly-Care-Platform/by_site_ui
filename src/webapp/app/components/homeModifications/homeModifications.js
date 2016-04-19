define(['byApp', 'byUtil', 'app/shared/footer/contactUsController', 'contactUsShortCtrl'], function(byApp, byUtil, contactUsCtrl, contactUsShortCtrl) {
    function homeModificationCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window) {
    
        $scope.telNo = BY.config.constants.byContactNumber;

        $scope.subjectTitle = 'Enquiry from Home Modifications';

        var init = initialize();
        function initialize() {
            $(".by_header").removeClass("by_header_image"); 
            $(".by_header").addClass("by_headerBoder");
            angular.element($window).bind("scroll", function () {
                var headerHeight = $(".by_header").height();
                if ((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) >= headerHeight) {
                    BY.byUtil.changeHeaderImage();
                    $(".by_header").removeClass("by_header_image"); 
                    $(".by_header").addClass("by_homeModiBannerHeader");
                    $(".by_header").removeClass("by_headerBoder");
                } else {
                     BY.byUtil.changeHeaderImage();
                    $(".by_header").removeClass("by_header_image");          
                    $(".by_header").removeClass("by_homeModiBannerHeader");
                    $(".by_header").addClass("by_headerBoder");
                }
                    
            });
        }

        $scope.showVideo = function(){       
            $("#by_expVideoFrame").attr("src", 'https://www.youtube.com/embed/HPHXQ5aMmq0?rel=0&showinfo=0&autoplay=1');
            var frameHeight = $(".by_expVideoShow").outerHeight();
            $("#by_expVideoFrame").attr("height", frameHeight);
            $("#by_expVideoFrame").css("display", 'block');
            $(".by_expVideoShow").hide();
            $("#by_expVideoFrame").show();
        };
    }


    homeModificationCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window'];
    byApp.registerController('homeModificationCtrl', homeModificationCtrl);

    return homeModificationCtrl;
});