define(['byApp', 'byUtil', 'userValidation'], function(byApp, byUtil, userValidation) {
    function ProductReviewRateController($scope, $rootScope, $routeParams, $http, $location, ReviewRateProfile, UserValidationFilter) {
        $scope.selectedRating = 0;
        $scope.reviewText = "";
        $scope.blankReviewRateError = false;
        $scope.otherError = "";
        $scope.getReview = getReview;
        $scope.selectRating = selectRating;
        $scope.showRateLogin = showRateLogin;
        $scope.showRateRegister = showRateRegister;
        $scope.userSessionType = UserValidationFilter.getUserSessionType();
        $scope.userCredential = {
            'email': '',
            'pwd': ''
        };
        $scope.newUserCredential = {
            'uniqueRegId': '',
            'pwd': '',
            'userName': '',
            'userTags': ''
        };

        var postReview = new ReviewRateProfile(),
            setReviewText = setReviewText,
            storedUserPhoneNo = localStorage.getItem("USER_PHONENUMBER");

            $scope.storedUserEmail = localStorage.getItem("USER_EMAIL");    

        var initialize = init();

        function setReviewText() {
            if (tinymce.get("reviewTextArea") && $scope.reviewText) {
                tinymce.get("reviewTextArea").setContent($scope.reviewText);
            }
        }

        function init() {
            //Prefill form with data saved in local storage
            var pendingReviewByUser = localStorage.getItem('pendingReviewByUser') ? JSON.parse(localStorage.getItem('pendingReviewByUser')) : null;
            if (pendingReviewByUser && pendingReviewByUser.associatedId === $routeParams.productId) {
                if (pendingReviewByUser.selectedRating && pendingReviewByUser.selectedRating > 0) {
                    $scope.selectRating(pendingReviewByUser.selectedRating);
                }

                $scope.reviewText = pendingReviewByUser.reviewText;
                setReviewText();
            }

            if ($scope.storedUserEmail && $scope.storedUserEmail !== "null" && $scope.storedUserEmail !== "") {
                $scope.userCredential.email = $scope.storedUserEmail;
                $scope.newUserCredential.uniqueRegId = $scope.storedUserEmail;
            }

            if (storedUserPhoneNo && storedUserPhoneNo !== "null" && storedUserPhoneNo !== "") {
                $scope.userCredential.email = storedUserPhoneNo;
                $scope.newUserCredential.uniqueRegId = storedUserPhoneNo;
            }

            //initialize tinymce editor
            var tinyEditor = BY.byEditor.addEditor({
                "editorTextArea": "reviewTextArea", "bottomMargin": "true"
            }, setReviewText);


            //show login/reg form for unregistered/not logged in user
            if ($scope.userSessionType === null || $scope.userSessionType === BY.config.sessionType.SESSION_TYPE_GUEST) {
                showRateRegister();
            } else if ($scope.userSessionType === BY.config.sessionType.SESSION_TYPE_PARTIAL) {
                showRateLogin();
            } else {
                hideLoginRegister();
            }


            //get reviews for the selected user profile
            $scope.getReview();

        }


        function getReview() {
            //Get review posted by currently logged in user
            postReview.$get({
                associatedId: $routeParams.productId,
                userId: localStorage.getItem("USER_ID"),
                reviewContentType: 7
            }, function(response) {
                var response = response.data.replies[0];
                if (response) {
                    var ratingPercentage = BY.byUtil.getAverageRating(response.userRatingPercentage);
                    $scope.reviewText = response.text;
                    $scope.selectRating(ratingPercentage);
                    setReviewText();
                }

            }, function(error) {
                console.log(error);
            })
        };


        function selectRating(value) {
            $(".profileRatetext").removeClass("profileRateBG" + $scope.selectedRating);
            $(".by_btn_submit").removeAttr('disabled');
            value = parseInt(value);
            $(".by_rating_left .profileRatetext").css('color', '#000');

            $(".profileRate" + value).siblings(".profileRatetext").addClass("profileRateBG" + value);
            $(".profileRate" + value).siblings(".profileRatetext").css('color', '#fff');
            $scope.selectedRating = value;
        }

        function postHttpReview() {
            var ratePercentage = (parseInt($scope.selectedRating) / (parseInt(BY.config.profile.rate.upperLimit) - parseInt(BY.config.profile.rate.lowerLimit))) * 100;
            postReview.userRatingPercentage = ratePercentage;
            postReview.text = $scope.reviewText;
            postReview.url = encodeURIComponent(window.location.href);

            postReview.$post({
                associatedId: $routeParams.productId,
                reviewContentType: 7
            }, function(success) {
                localStorage.removeItem('pendingReviewByUser');
                $scope.$parent.showReviews();
                $scope.reviewText = "";
                localStorage.removeItem('pendingReviewByUser');
                $("#by_rate_hide").hide();
                $("#by_rate_show").show();                
                $scope.gotoHref("userReviews");
            }, function(errorResponse) {
                console.log(errorResponse);
                $(".by_btn_submit").prop("disabled", false);
                if (errorResponse.data && errorResponse.data.error && errorResponse.data.error.errorCode === 3002) {
                    console.log("Not a valid user")
                } else if (errorResponse.data && errorResponse.data.error && errorResponse.data.error.errorCode === 3001) {
                    $scope.unauthorizeUserError = true;
                }
            })
        }

        function validateUser() {
            if (!$scope.userType || $scope.userType === 0) {
                var promise = UserValidationFilter.registerUser($scope.newUserCredential);
                promise.then(validUser, invalidUser);
            } else if ($scope.userType && $scope.userType === 1) {
                if (!$scope.userCredential.email || $scope.userCredential.email.trim().length === 0) {
                    $(".by_btn_submit").prop("disabled", false);
                    $scope.otherError = "Please enter your email id";
                } else if (!$scope.userCredential.pwd || $scope.userCredential.pwd.trim().length === 0) {
                    $(".by_btn_submit").prop("disabled", false);
                    $scope.otherError = "Please enter your password";
                } else {
                    $scope.otherError = "";
                    var promise = UserValidationFilter.loginUser($scope.userCredential.email, $scope.userCredential.pwd);
                    promise.then(validUser, invalidUser);
                }

            } else {
                postHttpReview();
            }

            function validUser() {
                $scope.otherError = "";
                hideLoginRegister();
                postHttpReview();
            }

            function invalidUser(errMsg) {
                $scope.otherError = errMsg;
                $(".by_btn_submit").prop("disabled", false);
                console.log(errMsg);
            }
        }

        $scope.postReview = function() {
            $(".by_btn_submit").prop("disabled", true);
            var content = tinymce.get("reviewTextArea").getContent();
            var reviewText = tinymce.get("reviewTextArea").getBody().textContent.trim();
            $scope.userSessionType = UserValidationFilter.getUserSessionType();

            if (content.indexOf("img") !== -1 || reviewText.trim().length > 0) {
                $scope.reviewText = content;
            } else {
                $scope.reviewText = "";
            }

            if (parseInt($scope.selectedRating) > 0 || $scope.reviewText.trim().length > 0) {
                $scope.blankReviewRateError = false;
                $scope.unauthorizeUserError = false;
                if ($scope.userSessionType && $scope.userSessionType == BY.config.sessionType.SESSION_TYPE_FULL) {
                    postHttpReview();
                } else {
                    validateUser();
                }
            } else {
                $scope.blankReviewRateError = true;
                $(".by_btn_submit").prop('disabled', false);
            }

        };

        $scope.showRate = function() {
            document.getElementById("by_rate_hide").style.display = "block";
            document.getElementById("by_rate_show").style.display = "none";
        };
        $scope.hideRate = function() {
            document.getElementById("by_rate_hide").style.display = "none";
            document.getElementById("by_rate_show").style.display = "block";
        };

        $scope.toggleRegForm = function(val) {
            if (val === 0) {
                showRateRegister();
            } else {
                showRateLogin();
            }
        }

        function showRateLogin() {
            $scope.userType = 1;
            $(".by_rateLoginWrap").show();
            $(".by_rateRegisterWrap").hide();
        };


        function showRateRegister() {
            $scope.userType = 0;
            $(".by_rateLoginWrap").hide();
            $(".by_rateRegisterWrap").show();
        };

        function hideLoginRegister() {
            $(".by_rateRegisterWrap").hide();
            $(".by_rateLoginWrap").hide();
            $("#reviewSubmit").show();
        }


        $scope.ggLogin = UserValidationFilter.googleLogin;

        $scope.fbLogin = UserValidationFilter.fbLogin;

    }

    ProductReviewRateController.$inject = ['$scope', '$rootScope', '$routeParams', '$http', '$location', 'ReviewRateProfile', 'UserValidationFilter'];
    byApp.registerController('ProductReviewRateController', ProductReviewRateController);
    return ProductReviewRateController;
});