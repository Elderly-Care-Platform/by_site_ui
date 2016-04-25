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

    }


    classesActivitiesCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', '$sce', '$window'];
    byApp.registerController('classesActivitiesCtrl', classesActivitiesCtrl);

    return classesActivitiesCtrl;
});