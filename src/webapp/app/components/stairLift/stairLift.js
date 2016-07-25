define(['byApp', 'byUtil', 'app/shared/footer/contactUsController'], function(byApp, byUtil, contactUsCtrl) {
    function stairLCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window, $route) {
        
       $scope.telNo = BY.config.constants.byContactNumber;
       window.scrollTo(0, 0);

       $scope.title = "Stair life enquiry";

       $scope.showVideo = function(){       
        $("#by_expVideoFrame").attr("src", 'https://www.youtube.com/embed/W_OtlOhf0i8?rel=0&showinfo=0&autoplay=1');
       	var frameHeight = $(".by_expVideoShow").outerHeight();
    	   $("#by_expVideoFrame").attr("height", frameHeight);
       	$(".by_expVideoShow").hide();
       	$("#by_expVideoFrame").show();
       };

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
                title:  "Stair Lift - Elder care products - BeautifulYears",
                imageUrl:   "",
                description:   "",
                keywords:[]
            }
            BY.byUtil.updateMetaTags(metaTagParams);
        })();

             
    }

    stairLCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window', '$route'];
    byApp.registerController('stairLCtrl', stairLCtrl);

    return stairLCtrl;
});