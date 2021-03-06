/**
 * Created by sanjukta on 02-07-2015.
 */
//home
define(['byApp', 'byUtil', 'homePromoController',
        'userTypeConfig', 
        'byEditor', 'menuConfig', 'editorController', 'userValidation', 'productController', 'app/shared/footer/contactUsController', 'discussService', 'urlFactory'],
    function (byApp, byUtil, homePromoController, userTypeConfig, byEditor, menuConfig, editorController, userValidation, productController, contactUsCtrl, discussService, urlFactory) {
        function BYHomeController($scope, $rootScope, $routeParams, $location, UserValidationFilter, SessionIdService, DiscussPage, discussServiceFilter, $sce, urlFactoryFilter) {
            $scope.homeSectionConfig = BY.config.menu.home;
            $scope.homeimageConfig = BY.config.menu.homeIcon;
            $scope.moduleConfig = BY.config.menu.moduleConfig;
            $scope.menuMapConfig = $rootScope.menuCategoryMap;
            $scope.menuConfig = BY.config.menu;
            $scope.removeSpecialChars = BY.byUtil.removeSpecialChars;
            $scope.telNo = BY.config.constants.byContactNumber;
            $scope.selectedMenu = $rootScope.menuCategoryMap['564071623e60f5b66f62df27'];
            $scope.loginDetails = {
                "text": "",
                "link": ""
            }

            var cntAnimDuration = 1000,
                init = initialize();


            function updateMetaTags() {
                var metaTagParams = BY.config.seo.home;
                BY.byUtil.updateMetaTags(metaTagParams);
            }

            function initialize() {
                var isLoggedinUser = UserValidationFilter.getUserSessionType();
                if ($rootScope.totalServiceCount) {
                    animateCounter($rootScope.totalServiceCount, $(".HomeSevicesCnt"));
                }

                if ($rootScope.totalHousingCount) {
                    animateCounter($rootScope.totalHousingCount, $(".HomeHousingCnt"));
                }

                if ($rootScope.totalProductCount) {
                    animateCounter($rootScope.totalProductCount, $(".HomeProductCnt"));
                }


                if(isLoggedinUser){
                    $scope.loginDetails.text = "Logout";
                    $scope.loginDetails.link = "users/logout/" + SessionIdService.getSessionId();
                }else{
                    $scope.loginDetails.text = "Join us";
                    $scope.loginDetails.link = "users/login";
                }
                updateMetaTags();
                BY.byUtil.changeHeaderImage();
            }


            function animateCounter(count, target) {
                $({someValue: 0}).animate({someValue: count}, {
                    duration: cntAnimDuration,
                    easing: 'swing',
                    step: function () {
                        target.text(Math.round(this.someValue));
                    }
                });
            };

            

            $scope.$on('directoryCountAvailable', function (event, args) {
                animateCounter($rootScope.totalServiceCount, $(".HomeSevicesCnt"));
                animateCounter($rootScope.totalHousingCount, $(".HomeHousingCnt"));
                $scope.serviceCount = $rootScope.totalServiceCount;
            });

            $scope.$on('productCountAvailable', function (event, args) {
                animateCounter($rootScope.totalProductCount, $(".HomeProductCnt"));
            });

            $scope.exitEditorDiscuss = function (type, event) {
                event.stopPropagation();
                $(".by_homeEditor").animate({width: '100%', height: '115px', marginBottom: '20px'}, "500");
                $(".by_homeEditorShow").hide();
                $(".by_homeTextareaShow").show();
                $(".by_homeTalk").animate({width: '100%'}, "500");
                $(".by_homeEditorShow").slideUp("100", function () {
                    BY.byEditor.removeEditor();
                    //$route.reload();
                });

            }

            $scope.showVideo = function(){       
                $("#by_expVideoFrame").attr("src", 'https://www.youtube.com/embed/HPHXQ5aMmq0?rel=0&showinfo=0&autoplay=1');
                var frameHeight = $(".by_expVideoShow").outerHeight();
                $("#by_expVideoFrame").attr("height", frameHeight);
                $("#by_expVideoFrame").css("display", 'block');
                $(".by_expVideoShow").hide();
                $("#by_expVideoFrame").show();
            };

            $scope.showVideo1 = function(){       
                $("#by_expVideoFrame1").attr("src", 'https://www.youtube.com/embed/z9LkUOGUyrA?rel=0&showinfo=0&autoplay=1');
                var frameHeight = $(".by_expVideoShow1").outerHeight();
                $("#by_expVideoFrame1").attr("height", frameHeight);
                $("#by_expVideoFrame1").css("display", 'block');
                $(".by_expVideoShow1").hide();
                $("#by_expVideoFrame1").show();
            };


            $scope.getDiscussData = getDiscussData;

            var tags = [],
                queryParams = {
                    sort: "lastModifiedAt",
                    s: 3
                };
            tags = $.map($scope.selectedMenu.tags, function(value, key) {
                return value.id;
            })

            queryParams.tags = tags.toString();            
            queryParams.isPromotion = false;

            function getDiscussData() {
                $("#preloader").show();
                DiscussPage.get(queryParams,
                    function(value) {
                        $scope.discussData = value.data.content;
                        $("#preloader").hide();
                    },
                    function(error) {
                        $("#preloader").hide();
                        console.log(error);
                    });
            }
            getDiscussData();

            $scope.trustForcefully = function (html) {
                return $sce.trustAsHtml(html);
            };

            $scope.getHrefProfile = function (profile, urlQueryParams) {
                var newHref = urlFactoryFilter.getProfileUrl(profile, urlQueryParams, false);
                newHref = "" + newHref;
                return newHref;
            };

            $scope.getHref = function (discuss, urlQueryParams) {
                var newHref = urlFactoryFilter.getDiscussDetailUrl(discuss, urlQueryParams, false);
                newHref = "" + newHref;
                return newHref;
            };

            $scope.nextLocation = function ($event, discuss, urlQueryParams) {
                $event.stopPropagation();
                var url = urlFactoryFilter.getDiscussDetailUrl(discuss, urlQueryParams, true);
                $location.path(url);
            };



        }

        BYHomeController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'UserValidationFilter', 'SessionIdService', 'DiscussPage', 'DisServiceFilter', '$sce', 'UrlFactoryFilter'];
        byApp.registerController('BYHomeController', BYHomeController);

        return BYHomeController;
    });


