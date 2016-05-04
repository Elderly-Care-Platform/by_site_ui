define(['menuConfig', 'userTypeConfig'], function (menuConfig, userTypeConfig) {
    function BYHeaderCtrl($rootScope, $scope, $window, $location, $http, $injector) {
        $rootScope.screenHeight = $(window).height();
        $scope.loginDetails = {
            "text": "",
            "link": ""
        }
        $scope.profileDetails = {
            "text": "",
            "link": ""
        }
        
        $scope.removeSpecialChars = BY.byUtil.removeSpecialChars;
        $scope.telNo = BY.config.constants.byContactNumber;

        var isHomePage = false,
            initialize = initHeader();

        function initHeader() {
            validateSession();
            getProductCount();
            getServicesCount();
        }

        $scope.searchResults = function(){
            angular.forEach($location.search(), function (value, key) {
                $location.search(key, null);
            });
            if($("#SearchValue").val() != ''){
                $location.path('/search/'+ $("#SearchValue").val() +'/All');
            }            
        }
        

        function getProductCount(){
            $http.get(BY.config.constants.apiPrefix + BY.config.constants.productHost+"/catalog/productCount").success(function (response) {
                $rootScope.totalProductCount = response;
                $rootScope.$broadcast('productCountAvailable');
            }).error(function (err) {
                console.log("products count not available");
            })
        }

        function getServicesCount(){
            $http.get(BY.config.constants.apiPrefix + "api/v1/userProfile/getCount").success(function (response) {

                $rootScope.totalServiceCount = parseInt(response.data[BY.config.profile.userTypeMap['INSTITUTION_BRANCH']])
                    + parseInt(response.data[BY.config.profile.userTypeMap['INDIVIDUAL_PROFESSIONAL']]);

                $rootScope.totalHousingCount = parseInt(response.data[BY.config.profile.userTypeMap['INSTITUTION_HOUSING']]);

                $rootScope.$broadcast('directoryCountAvailable');
            }).error(function (err) {
                console.log("services count not available");
            })
        }

        function updateHeaderTemplate() {
            // if (isHomePage == true) {
            //     $("#home").removeClass('hide');
            //     $("#home").addClass('show');
            //     $(".by_header").removeClass("by_header_image");
            //     $(".by_header").removeClass("by_headerBoder");
            //     $scope.templateUrl = 'app/components/header/homeHeader.html?versionTimeStamp=%PROJECT_VERSION%';
                 
            //     angular.element($window).bind("scroll", function () {
            //         var headerHeight = $(".by_header").height();
            //         if ((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) >= headerHeight) {
            //             $(".by_header").removeClass("by_header_image"); 
            //             $(".by_header").addClass("by_homeHeaderImage");
            //             $(".by_header").removeClass("by_headerBoder");
            //         } else {
            //             $(".by_header").removeClass("by_header_image"); 
            //             $(".by_header").removeClass("by_headerBoder");
            //             $(".by_header").removeClass("by_homeHeaderImage");
            //         }
            //         if ((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) >= 1) {
            //             $("#homeMenuScroll").show();
            //         } else {                        
            //              $("#homeMenuScroll").hide();
            //         }
                        
            //     });
            // } else {
            //     $("#home").removeClass('show');
            //     $("#home").addClass('hide');
            //     $scope.templateUrl = 'app/components/header/otherHeader.html?versionTimeStamp=%PROJECT_VERSION%';
            //     angular.element($window).bind("scroll", function () {
            //         var headerHeight = $(".by_header").outerHeight(true);
            //         if(headerHeight > 70){
            //             if ((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) >= (headerHeight - 64)) {
            //                 $(".by_header").addClass("by_header_image");
            //                 $(".by_header").removeClass("by_headerBoder");
            //                 $(".by_header").removeClass("by_homeHeaderImage");
            //                 if((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) < 55){
            //                     $(".by_header").css('top', - (document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset));
            //                 } else{
            //                     $(".by_header").css('top', '-55px');
            //                 }
            //             } else {
            //                 $(".by_header").addClass("by_header_image");
            //                 $(".by_header").removeClass("by_headerBoder");
            //                 $(".by_header").removeClass("by_homeHeaderImage");
            //                 if((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) < 55){
            //                     $(".by_header").css('top', '0px');
            //                 }                            
            //             }
            //         } else{
            //             $(".by_header").addClass("by_header_image");
            //             $(".by_header").removeClass("by_headerBoder");
            //             $(".by_header").removeClass("by_homeHeaderImage");
            //         }
                    
            //     });
            // }

            $scope.templateUrl = 'app/components/header/otherHeader.html?versionTimeStamp=%PROJECT_VERSION%';
            angular.element($window).bind("scroll", function () {
                var headerHeight = $(".by_header").outerHeight(true);
                if(headerHeight > 70){
                    if ((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) >= (headerHeight - 64)) {
                        $(".by_header").addClass("by_header_image");
                        $(".by_header").removeClass("by_headerBoder");
                        $(".by_header").removeClass("by_homeHeaderImage");
                        if((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) < 55){
                            $(".by_header").css('top', - (document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset));
                            $(".by_headerMoreMenu").css('top', $(".by_header").outerHeight() - 1 - (document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset));
                        } else{
                            $(".by_header").css('top', '-55px');
                            $(".by_headerMoreMenu").css('top', $(".by_header").outerHeight() - 1 - 55);
                        }
                    } else {
                        $(".by_header").addClass("by_header_image");
                        $(".by_header").removeClass("by_headerBoder");
                        $(".by_header").removeClass("by_homeHeaderImage");
                        if((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) < 55){
                            $(".by_header").css('top', '0px');
                            $(".by_headerMoreMenu").css('top', $(".by_header").outerHeight() - 1);
                        }                            
                    }
                } else{
                    $(".by_header").addClass("by_header_image");
                    $(".by_header").removeClass("by_headerBoder");
                    $(".by_header").removeClass("by_homeHeaderImage");
                }
                
            });


        }

        function validateSession() {
            if (window.localStorage) {
                require(["userValidation"], function(userValidation) {
                    $scope.UserValidationFilter  = $injector.get('UserValidationFilter');
                    var validateSessionPromise = $scope.UserValidationFilter.validateSession();
                    validateSessionPromise.then(setValidSession, inValidateSession);
                    //$scope.$apply();
                });
            }
        }

        function setValidSession(params) {
            var userName = localStorage.getItem("USER_NAME");
            var sessionId = localStorage.getItem("SessionId");

            if(userName.length > 9){
                userName = localStorage.getItem("USER_NAME").substring(0, 9)+'...';
            }

            $scope.loginDetails.text = "Logout";
            $scope.loginDetails.link = "#!/users/logout/" + sessionId;

            $scope.profileDetails.text = BY.byUtil.validateUserName(userName);
            $scope.profileDetails.link = "#!/users/registrationProfile/";
        }

        function inValidateSession() {
            $scope.profileDetails.text = "";
            $scope.profileDetails.link = "";

            $scope.loginDetails.text = "Join us";
            $scope.loginDetails.link = "#!/users/login";
        }

        $scope.$on('byUserLogout', function (event, args) {
            inValidateSession();
        });

        $scope.$on('byUserLogin', function (event, args) {
            setValidSession(args);
        });

        $scope.$on('byUserNameUpdate', function (event, args) {
            setValidSession(args);
        });


        $scope.$on('currentLocation', function (event, args) {
            if (args === '/') {
                $rootScope.BYhomePage = true;
                isHomePage = true;                
                $("#ng-scope").css('min-height', "0px");
            } else {
                $rootScope.BYhomePage = false;
                isHomePage = false;
                var minimumHeight = $( window ).height() - 46;
                $("#ng-scope").css('min-height', minimumHeight+"px");
            }

            updateHeaderTemplate();
        });

        $scope.searchInputShow = function () {
            if ($(".by_header_right_search").css('display') == 'none') {
                $(".by_header_right_search").fadeIn('1000');
            } else if($(".by_header_right_mobile_search").css('display') == 'none'){
                $(".by_headerPhoneNumber").hide();
                $(".by_header_right_mobile").css('width', 'calc(100% - 60px)');
                $(".by_header_right_mobile_search").fadeIn('1000');
            } else {
                $scope.searchResults();
            }
        };

        $scope.homeSection = BY.config.menu.home;
        $scope.moduleConfig= BY.config.menu.moduleConfig;

        $scope.showMoreMenuH = function(){
            $(".by_headerMoreMenu").css('top', $(".by_header").outerHeight() - 1);                    
            if($(".by_headerMoreMenu").css("display") == 'block'){
                $(".by_headerMoreMenu").slideUp(function(){
                    var top = $(".by_header").outerHeight() - 1 + $(".by_headerMoreMenu .by_container").outerHeight();
                    var height = $(window).height() - top;
                    $(".by_headerMoreMenuMask").css('height', height);
                });                
                $(".by_menuMore2").addClass('by_menuMore');
                $(".by_menuMore").removeClass('by_menuMore2');
            } else{
                $(".by_headerMoreMenu").slideDown(function(){
                    var top = $(".by_header").outerHeight() - 1 + $(".by_headerMoreMenu .by_container").outerHeight();
                    var height = $(window).height() - top;
                    $(".by_headerMoreMenuMask").css('height', height);
                });
                $(".by_menuMore").addClass('by_menuMore2');
                $(".by_menuMore2").removeClass('by_menuMore');
            }
            if($(window).width() < 721){
                if((document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset) < 55){
                    $(".by_headerMoreMenu").css('top', $(".by_header").outerHeight() - 1 - (document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset));
                } else{
                    $(".by_headerMoreMenu").css('top', $(".by_header").outerHeight() - 1 - 55);
                } 
            }  
        };

        
    }

    BYHeaderCtrl.$inject = ['$rootScope', '$scope', '$window', '$location', '$http', '$injector'];
    return BYHeaderCtrl;
});



