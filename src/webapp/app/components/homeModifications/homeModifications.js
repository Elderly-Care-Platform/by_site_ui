define(['byApp', 'byUtil', 'app/shared/footer/contactUsController', 'contactUsShortCtrl'], function(byApp, byUtil, contactUsCtrl, contactUsShortCtrl) {
    function homeModificationCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window) {
    
        $scope.telNo = BY.config.constants.byContactNumber;

        $scope.subjectTitle = 'Enquiry from Home Modifications';

        BY.byUtil.changeHeaderImage();

        (function(){
            var metaTagParams = {
                title:  "Home modifications",
                imageUrl:   "",
                description:   "",
                keywords:[]
            }
            BY.byUtil.updateMetaTags(metaTagParams);
        })();

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