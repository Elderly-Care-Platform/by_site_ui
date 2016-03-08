/**
 * Created by sanjukta on 01-07-2015.
 */
define(['byApp', 'byUtil'], function(byApp, byUtil) {
    function contactUsController($scope, $routeParams, $route, $location, ContactUs){
        $scope.isLoggedIn = false;
        $scope.userEmail ='';
        $scope.username = '';
        $scope.errorMsg = "";
        $scope.text = '';
        $scope.showSelectInput = false;

        $scope.showSelectInputF = function(){
           if($scope.text.trim().length > 0)
            {
                $scope.showSelectInput = true;
            } else{
                $scope.showSelectInput = false;
            }
        }
        
        var emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(localStorage.getItem("USER_ID")){
            $scope.isLoggedIn = true;
            $scope.userEmail = localStorage.getItem("USER_ID");
            $scope.username = BY.byUtil.validateUserName(localStorage.getItem("USER_NAME"));
        }

        (function(){
            var metaTagParams = {
                title:  "Beautiful Years",
                imageUrl:   "",
                description:   "",
                keywords:['Beautiful Years']
            }
            BY.byUtil.updateMetaTags(metaTagParams);
        })();


        $scope.subjectOptionsMap = {'0':"FEEDBACK", '1':"SUGGESTION", '2':"READY TO HELP ", '3':"DOING BUSINESS TOGETHER", '4':"WOULD LIKE TO INFORM YOU", '5':"OTHER"};
        $scope.subjectTitle = $routeParams.subject ? $scope.subjectOptionsMap[$routeParams.subject]:"";

        $scope.postContent = function (discussType) {
            $scope.contactUs = new ContactUs();
            $scope.errorMsg = "";
            $scope.contactUs.discussType = discussType;
            if(tinyMCE.activeEditor){
                $scope.contactUs.text = tinyMCE.activeEditor.getContent();
            } else{
                $scope.contactUs.text = $scope.text;
            }           
            
            $scope.contactUs.title = $scope.subjectTitle;

            $scope.contactUs.userId = $scope.userEmail;
            $scope.contactUs.username = $scope.username;

            if($scope.contactUs.text.trim().length <= 0){
                $scope.errorMsg = "Please add more details";
            } else if($scope.contactUs.username.trim().length <= 0){
                $scope.errorMsg = "Please add your user name";
            } else if(!$scope.isLoggedIn && !emailValidation.test($scope.contactUs.userId)){
                $scope.errorMsg = "Please enter valid Email Id";
            } else{
                $scope.errorMsg = "";
            }

            if($scope.errorMsg === ""){
                $scope.errorMsg = "";
                $scope.contactUs.$save( //success
                    function (value) {
                        $location.path("/");
                        $route.reload();
                    },
                    //error
                    function( error ){
                        console.log("QUErY ERROR");
//                        	alert("error2");
                    });
            }
        }
    }

    contactUsController.$inject = ['$scope', '$routeParams', '$route', '$location', 'ContactUs'];
    byApp.registerController('contactUsController', contactUsController);
    return contactUsController;
});