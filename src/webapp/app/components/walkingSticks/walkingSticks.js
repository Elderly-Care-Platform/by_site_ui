define(['byApp', 'byUtil', 'app/shared/footer/contactUsController'], function(byApp, byUtil, contactUsCtrl) {
    function walkingSCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window, $route) {
        
       $scope.telNo = BY.config.constants.byContactNumber;
       window.scrollTo(0, 0);

       $scope.title = "Walking sticks enquiry";

       

       $scope.showEnquiry = function(){
        if($(".by_enquiryButton").css('right') == '0px'){
          $(".by_enquiryButton").animate({right: "260px"}, {duration: 400});
          $(".by_enquiryWrap").animate({right: "0px"}, {duration: 400});
        } else{
          $(".by_enquiryWrap").animate({right: "-260px"}, {duration: 400});
          $(".by_enquiryButton").animate({right: "0px"}, {duration: 400});
        }
       };

        $scope.enquiryClose = function(){
            $("#by_enquiryOuter").fadeOut("500");
            $route.reload();
        };

        

       

        (function(){
            var metaTagParams = {
                title:  "Buy walking sticks, foldable walking sticks for elders on BeautifulYears",
                imageUrl:   "",
                description:   "<p>" + "Walking stick with LED light and Buzzer, foldable and tripod walking sticks, available in India on discount with BeautifulYears. Call: 080 69400333" + "</p>",
                keywords:(["Walking Sticks", " walkers", " walking sticks with light", " foldable sticks", "folding sticks", " foldable walking sticks", " walking stick dealers", " senior friendly living", "elder friendly living", " ", " mobility solution", " accessibility solution", " BeautifulYears", "beautiful years"])
            }
            BY.byUtil.updateMetaTags(metaTagParams);
        })();

             
    }

    walkingSCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window', '$route'];
    byApp.registerController('walkingSCtrl', walkingSCtrl);

    return walkingSCtrl;
});