/**
 * Created by sanjukta on 01-07-2015.
 */
define(['byApp', 'byUtil'], function(byApp, byUtil) {
    function contactUsController($scope, $routeParams, $route, $location, ContactUs, $window){
        $scope.isLoggedIn = false;
        $scope.errorMsg = "";
        $scope.contact = {};        
        $scope.contact.userEmail ='';
        $scope.contact.username = '';
        $scope.contact.text = '';
        $scope.contact.userPhone = '';
        $scope.showSelectInput = false;
        $scope.telNo = BY.config.constants.byContactNumber;

        $scope.showSelectInputF = function(){
           if($scope.contact.text.trim().length > 0)
            {
                $scope.showSelectInput = true;
            } else{
                $scope.showSelectInput = false;
            }
        }
        
        var emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(localStorage.getItem("USER_ID")){
            $scope.isLoggedIn = true;
            $scope.contact.userEmail = localStorage.getItem("USER_ID");
            $scope.contact.username = BY.byUtil.validateUserName(localStorage.getItem("USER_NAME"));
            $scope.contact.userPhone = localStorage.getItem("USER_PHONENUMBER");
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
        $scope.contact.subjectTitle = $routeParams.subject ? $scope.subjectOptionsMap[$routeParams.subject]:"";

        $scope.postContent = function (discussType) {
            $scope.contactUs = new ContactUs();
            $scope.errorMsg = "";
            $scope.contactUs.discussType = discussType;
            if(tinyMCE.activeEditor){
                $scope.contactUs.text = tinyMCE.activeEditor.getContent();
            } else{
                $scope.contactUs.text = $scope.contact.text;
            }   

            if($scope.contact.userPhone){
                $scope.contactUs.text = $scope.contactUs.text + '  Phone Number: ' + $scope.contact.userPhone;
            }        
            
            
            $scope.contactUs.username = $scope.contact.username;

            $scope.contactUs.userId = $scope.contact.userEmail;
            $scope.contactUs.title = $scope.contact.subjectTitle;

            if($scope.contactUs.text.trim().length <= 0){
                $scope.errorMsg = "Please add more details";
            } else if($scope.contactUs.username.trim().length <= 0){
                $scope.errorMsg = "Please add your user name";
            } else if(!$scope.isLoggedIn && !emailValidation.test($scope.contactUs.userId)){
                $scope.errorMsg = "Please enter valid Email Id";
            } else if($scope.contactUs.title == undefined){
                $scope.errorMsg = "Please select your subject title";
            }else{
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

    contactUsController.$inject = ['$scope', '$routeParams', '$route', '$location', 'ContactUs', '$window'];
    byApp.registerController('contactUsController', contactUsController);
    return contactUsController;
});