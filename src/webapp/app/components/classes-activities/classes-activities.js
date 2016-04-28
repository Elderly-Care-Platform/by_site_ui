define(['byApp', 'byUtil'], function(byApp, byUtil) {
    function classesActivitiesCtrl($scope, $rootScope, $routeParams, $timeout, $location, $sce, $window) {
    
        $scope.telNo = BY.config.constants.byContactNumber;
               
        BY.byUtil.changeHeaderImage();

        (function(){
            var metaTagParams = {
                title:  "classes actitivies for senior citizens",
                imageUrl:   "",
                description:   "",
                keywords:[]
            }
            BY.byUtil.updateMetaTags(metaTagParams);
        })();

        $scope.showAll = function(){
            document.getElementById("morePastEventsShow").style.display = "block";
            document.getElementById("morePastEvents").style.display = "none";
        }

    }


    classesActivitiesCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window'];
    byApp.registerController('classesActivitiesCtrl', classesActivitiesCtrl);

    return classesActivitiesCtrl;
});