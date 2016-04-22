/**
 * Created by sanjukta on 01-07-2015.
 */
define(['byApp', 'byUtil'], function(byApp, byUtil) {
    function contactUsSmallCtrl($scope, $routeParams, $route, $location, ContactUs, $window){
        $scope.errorMsg = "";
        $scope.contact = {};        
        $scope.contact.userEmail ='';
        $scope.contact.username = '';
        $scope.contact.userPhone = '';

        
        
        var emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(localStorage.getItem("USER_ID")){
            $scope.isLoggedIn = true;
            $scope.contact.userEmail = localStorage.getItem("USER_EMAIL");
            $scope.contact.username = BY.byUtil.validateUserName(localStorage.getItem("USER_NAME"));
            $scope.contact.userPhone = localStorage.getItem("USER_PHONENUMBER");

            
            if($scope.contact.userPhone == "null"){
                $scope.contact.userPhone = '';
            }
        }

        $scope.contactButton = function(){
            if($scope.contact.userPhone.length > 0){
                $(".by-editor-submit-btn").prop("disabled", false);
            } else
            {
                $(".by-editor-submit-btn").prop("disabled", true);
            }            
        }

       
        
        $scope.postContent = function (discussType) {
            $scope.contactUs = new ContactUs();
            $scope.errorMsg = "";
            $scope.contactUs.discussType = discussType;
            $scope.contactUs.text = 'Enquiry with phone';  
            if($scope.contact.userEmail == "null"){
                $scope.contact.userEmail = '';
            }       
            
            $scope.contactUs.username = $scope.contact.username;

            $scope.contactUs.userId = $scope.contact.userEmail;
            $scope.contactUs.title = $scope.$parent.subjectTitle;
            $scope.contactUs.text = 'Phone Number: ' + $scope.contact.userPhone;

            var phoneno = /^\d{10}$/;
            /*if($scope.contactUs.username.trim().length <= 0){
                $scope.errorMsg = "Please add your user name";
            } else if(!emailValidation.test($scope.contactUs.userId)){
                $scope.errorMsg = "Please enter valid Email Id";
            } else */if(!$scope.contact.userPhone.match(phoneno)){
                $scope.errorMsg = "Please enter  Phone number";
            }else{
                $scope.errorMsg = "";
            }

            if($scope.errorMsg === ""){
                $scope.errorMsg = "";
                $scope.contactUs.$save( //success
                    function (value) {
                        /*$location.path("/");
                        $route.reload();*/
                        $(".by_contactThankYou").show();
                    },
                    //error
                    function( error ){
                        console.log("QUErY ERROR");
//                        	alert("error2");
                    });
            }
        }
    }

    contactUsSmallCtrl.$inject = ['$scope', '$routeParams', '$route', '$location', 'ContactUs', '$window'];
    byApp.registerController('contactUsSmallCtrl', contactUsSmallCtrl);
    return contactUsSmallCtrl;
});