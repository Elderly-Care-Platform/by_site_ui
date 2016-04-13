var reloadDone = false;

require.config({
    baseUrl: '../../../../../',
    //urlArgs: "versionTimeStamp=%PROJECT_VERSION%",
    waitSeconds: 0,
    name: 'app/shared/main',
    include: ["app/components/home/homeController",
        'app/components/discuss/discussMenuCtrl',
        'app/components/discussDetail/discussDetailController',
        'app/components/editDiscuss/editDiscussController',
        'app/components/announcements/announcementCtrl',
        'app/components/find/servicesController',
        'app/components/find/findMenuCtrl',
        'app/components/housing/housingController',
        'app/components/housing/housingMenuCtrl',
        'app/components/signup/registrationController',
        'app/components/signup/login/logoutController',
        'app/components/profile/userProfileCtrl',
        'app/shared/footer/contactUsController',
        'app/components/aboutUs/aboutUsController',
        'app/components/search/SearchController',
        'app/components/error/errorController',
        'app/components/experienceStore/expStoreController',
        'app/components/homeModifications/homeModifications',
        'app/components/classes-activities/classes-activities'
    ],

    paths: {
        //core
        byApp: 'app/main/app',
        byResource: 'app/main/appResources',
        byDirectives: 'app/main/appDirectives',
        byAppRoute: 'app/main/appRoute',
        byProductApp: 'app/main/product/productApp',
        byProductResources: 'app/main/product/productResources',
        byProductRoute: 'app/main/product/productRoute',

        //config
        byApplicationConfig: 'app/shared/common/config/byApplicationConfig',
        byProdEcomConfig: 'app/shared/common/config/byProductEcomConfig',
        bySeoConfig: 'app/shared/common/config/seoMetaConfig',
        byProductConfig: 'app/components/product/productConfig',
        userTypeConfig: 'app/shared/common/config/userTypesConfig',
        menuConfig: 'app/components/menu/menuConfig',
        discussConfig: 'app/shared/common/config/discussConfig',
        registrationConfig: 'app/components/signup/common/registrationConfig',

        //shared
        byUtil: 'app/shared/util/byUtil',
        byEditor: 'app/shared/editor/byEditor',
        shareController: 'app/shared/common/js/shareController',
        editorController: 'app/shared/editor/editorController',
        byMenuCtrl: 'app/components/menu/mainMenuController',

        //services
        discussService: 'app/components/discuss/discussService',
        userValidation: 'app/main/services/userValidation',
        urlFactory: 'app/main/services/urlFactory',
        sharedContextService: 'app/main/services/sharedContext',
        errorService: 'app/main/services/errorService',


        //factory
        DelegatorFactory: 'app/main/product/productResources/delegatorFactory',
        urlTemplateFactory: 'app/main/product/productResources/url-template.factory',
        CachedRequestFactory: 'app/main/product/productResources/cached-request-handler.service',
        ProductServiceFactory: 'app/main/product/productResources/productServiceFactory',
        ErrorStoreFactory: 'app/main/product/productResources/error-store.service',
        urlUtilsFactory: 'app/main/product/productResources/url-utils.factory',
        CategoryServiceFactory: 'app/main/product/productResources/category-service',
        BreadcrumbServiceFactory: 'app/main/product/productResources/breadcrumb.service',
        GlobalServiceFactory: 'app/main/product/productResources/global.service',
        UtilFactory: 'app/main/product/productResources/utils.factory',
        ProductDescFactory: 'app/components/product/productDescription/product-description.service',
        stateParamValidatorFactory: 'app/main/product/productResources/stateParamValidator',
        CartServiceFactory: 'app/components/product/cart/cart.service',
        CustomValidationFactory: 'app/main/product/productResources/custom-validation-directive',
        LogisticServiceFactory: 'app/main/product/productResources/logistic-service',

        AddAddressFactory: 'app/components/product/cartCheckout/add-address/add-address.service',
        EditAddressFactory: 'app/components/product/cartCheckout/edit-address/edit-address.service',
        SelectAddressFactory: 'app/components/product/cartCheckout/select-address/select-address.service',
        PaymentGatewayFactory: 'app/components/product/cartCheckout/payment-gateway/payment-gateway.service',
        ShoppingConfirmationFactory: 'app/components/product/cartCheckout/shopping-confirmation/shopping-confirmation.service',
        OrderHistoryFactory: 'app/components/product/orderHistory/order-history.service',


        //library
        //jquery : '../../lib/jqueryPlugins/jquery.min',
        angular: 'lib/angular/angular.min',
        angularRoute: 'lib/angular/angular-route',
        angularResource: 'lib/angular/angular-resource',
        angularInfiniteScroll: 'lib/angular/ng-infinite-scroll',
        angularGoogleLocation: 'lib/angular/ng-google-location',
        angularCache: 'lib/angular/angular-cache.min',
        angularBootstrap: 'lib/angular/ui-bootstrap.min',
        angularBootstrapTmpl: 'lib/angular/ui-bootstrap-tpls.min',
        angularBusy: 'lib/angular/angular-busy/angular-busy',
        angularSanitize: 'lib/angular/angular-sanitize.min',

        blogMasonary: 'lib/jqueryPlugins/blog-masonry',
        jqueryMasonaryGrid: 'lib/jqueryPlugins/jquery.masonry.min',
        lodash: 'lib/lodash.min',
        bootstrapToggle: 'lib/unify/plugins/bootstrap/js/bootstrap-toggle',


        //controllers
        announcementCtrl: 'app/components/announcements/announcementCtrl',
        homeController: 'app/components/home/homeController',
        homePromoController: 'app/components/home/homePromoController',
        discussMenuCtrl: 'app/components/discuss/discussMenuCtrl',
        discussDetailCtrl: 'app/components/discussDetail/discussDetailController',
        editDiscussCtrl: 'app/components/editDiscuss/editDiscussController',
        discussLikeController: 'app/components/discussDetail/discussLikeCtrl',
        discussDetailLeftController: 'app/components/discussDetail/discussDetailLeftCtrl',
        discussReplyController: 'app/components/discussDetail/DiscussReplyCtrl',
        LoginController: 'app/components/signup/login/loginController',

        indvUserProfileCtrl: 'app/components/profile/individual/indvUserProfileCtrl',
        instProfileCtrl: 'app/components/profile/institution/instProfileCtrl',
        profUserProfileCtrl: 'app/components/profile/professional/profUserProfileCtrl',
        reviewRateController: 'app/components/profile/shared/reviewRateController',
        housingProfileCtrl: 'app/components/profile/housing/housingProfileCtrl',
        housingProfileLeftCtrl: 'app/components/profile/housing/housingProfileLeftCtrl',
        instProfileLeftCtrl: 'app/components/profile/institution/instProfileLeftCtrl',

        regIndividualCtrl: 'app/components/signup/registration/individual/regIndividualCtrl',
        regProfessionalCtrl: 'app/components/signup/registration/professional/regProfessionalCtrl',
        regInstitutionCtrl: 'app/components/signup/registration/institution/regInstitutionCtrl',
        regHousingCtrl: 'app/components/signup/registration/housing/regHousingCtrl',
        regHousingFacilityCtrl: 'app/components/signup/registration/housing/regHousingFacilityCtrl',
        regUserTypeController: 'app/components/signup/regUserTypeController',
        modifySignupCtrl: 'app/components/signup/login/modifySignupCtrl',

        productController: 'app/components/product/product-listing/productController',
        productMenuCtrl: 'app/components/product/product-menu/productMenuCtrl',
        productDescCtrl: 'app/components/product/productDescription/product-description.controller',
        productReviewCtrl: 'app/components/product/product-rate-review/reviewRateController',
        videoImageDirective: 'app/components/product/productDescription/video-image.directive',
        videoModalController: 'app/components/product/productDescription/videoModal.controller',

        cartController: 'app/components/product/cart/cart.controller',
        shoppingConfirmationCtrl: 'app/components/product/cartCheckout/shopping-confirmation/shopping-confirmation.controller',
        selectAddressController: 'app/components/product/cartCheckout/select-address/select-address.controller',
        paymentGatewayController: 'app/components/product/cartCheckout/payment-gateway/payment-gateway.controller',
        editAddressController: 'app/components/product/cartCheckout/edit-address/edit-address.controller',
        addAddressController: 'app/components/product/cartCheckout/add-address/add-address.controller',

        orderHistoryCtrl: 'app/components/product/orderHistory/order-history.controller',
        headerCtrl: 'app/components/header/headerCtrl',
        discussCtrl: 'app/components/discuss/discussController',
        discussLeftCtrl: 'app/components/discuss/discussLeftController',
        housingMenuCtrl: 'app/components/housing/housingMenuCtrl',

        serviceOverviewCtrl: 'app/components/find/serviceOverviewsCtrl',
        housingReviewsCtrl: 'app/components/housing/housingReviewsCtrl',
        productReviewsCtrl: 'app/components/product/product-reviews/productReviewsCtrl',

        servicesCtrl: 'app/components/find/servicesController',
        findMenuCtrl: 'app/components/find/findMenuCtrl',
        housingCtrl: 'app/components/housing/housingController',
        registrationCtrl: 'app/components/signup/registrationController',
        logoutCtrl: 'app/components/signup/login/logoutController',
        userProfileCtrl: 'app/components/profile/userProfileCtrl',
        contactUsCtrl: 'app/shared/footer/contactUsController',
        aboutUsCtrl: 'app/components/aboutUs/aboutUsController',
        SearchCtrl: 'app/components/search/SearchController',
        errorCtrl: 'app/components/error/errorController',
        expStoreCtrl: 'app/components/experienceStore/expStoreController', 
        contactUsShortCtrl: 'app/shared/common/js/contactUsSmallController'

    },

    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': {
            deps: ["angular"]
        },
        "angularResource": {
            deps: ["angular"]
        },
        "angularInfiniteScroll": {
            deps: ["angular"]
        },
        "angularGoogleLocation": {
            deps: ["angular"]
        },

        "angularCache": {
            deps: ["angular"]
        },

        //'bootstrapToggle' : {
        //	deps : [ "jquery" ]
        //},

        "angularBootstrap": {
            deps: ["angular"]
        },

        "angularBootstrapTmpl": {
            deps: ["angular", "angularBootstrap"]
        },

        "angularBusy": {
            deps: ["angular"]
        },

        "angularSanitize": {
            deps: ["angular"]
        }
        ////
    }

});
require(['angular', "byApplicationConfig", "byApp", "byUtil", "byDirectives", "lodash"],
    function (angular, byApplicationConfig, byApp, byUtil, byDirectives, lodash) {
        var getProdCategoriesSuccess = function (prodCategories) {
            window.by_prodCategories = JSON.parse(prodCategories);
            angular.bootstrap(document, ["byApp"]);
        };

        var getProdCategoriesFailed = function () {
            angular.bootstrap(document, ["byApp"]);
        }

        $.ajax({
            url: BY.config.constants.apiPrefix + 'api/v1/menu/getMenu?parentId=root',
            success: function (response) {
                window.by_menu = response;
                $.ajax({
                    url: BY.config.constants.apiPrefix + BY.config.constants.productHost + '/catalog/categories?limit=100000',
                    success: getProdCategoriesSuccess,
                    error: function (err) {
                        console.log(err.st);
                        if (err.status === 200) {
                            getProdCategoriesSuccess();
                        } else {
                            getProdCategoriesFailed()
                        }
                    }
                });
            }
        });

        <!-- for inserting images into tinymce -->
        $(document).ready(function () {
            var options1 = {
                beforeSend: function () {
                    //$("#progressbox").show();
                    // clear everything
                    //$("#progressbar").width('0%');
                    //$("#message").empty();
                    //$("#percent").html("0%");
                },
                uploadProgress: function (event, position, total, percentComplete) {
                    //$("#progressbar").width(percentComplete + '%');
                    //$("#percent").html(percentComplete + '%');

                    // change message text to red after 50%
                    //if (percentComplete > 50) {
                    //$("#message").html("<font color='red'>File Upload is in progress</font>");
                    // }
                },
                success: function () {
                    // $("#progressbar").width('100%');
                    // $("#percent").html('100%');
                },
                complete: function (response) {
                    //tinyMCE.activeEditor.focus();
                    //tinyMCE.get('submit-article').getBody().focus();

                    //?????var img = "<img style = 'height:80px;width:80px' src = 'http://" + response.responseText + "' />";
                    //alert("img path = " + response.responseText.substring(response.responseText.lastIndexOf('/')+1));
                    var img = "<img src = '" + response.responseText + "' />";
                    tinyMCE.activeEditor.execCommand("mceInsertContent", true, img);
                    //$("#articlePhotoFilename").val(response.responseText);
                },
                error: function () {
                    //$("#articlePhotoFilename").val("<font color='red'> ERROR: unable to upload files</font>");
                }
            };

            $("#UploadImage").ajaxForm(options1);

        });
    });