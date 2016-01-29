var apiPrefix = "/BY/";
var reloadDone = false;

require.config({
	// baseUrl: '../',
	urlArgs: "versionTimeStamp=%PROJECT_VERSION%",
	waitSeconds : 0,
	paths : {

		//core
		byApp : '../main/app',
		byResource : '../main/appResources',
		byDirectives : '../main/appDirectives',
		byAppRoute : '../main/appRoute',
		byProductApp : '../main/product/productApp',
		byProductResources : '../main/product/productResources',
		byProductRoute : '../main/product/productRoute',

		//config
		byApplicationConfig : '../shared/common/config/byApplicationConfig',
		byProdEcomConfig : '../shared/common/config/byProductEcomConfig',
		bySeoConfig : '../shared/common/config/seoMetaConfig',
		byProductConfig : '../components/product/productConfig',
		userTypeConfig : '../shared/common/config/userTypesConfig',
		menuConfig : '../components/menu/menuConfig',
		discussConfig : '../shared/common/config/discussConfig',
		registrationConfig : '../components/signup/common/registrationConfig',

		//shared
		byUtil : '../shared/util/byUtil',
		byEditor : '../shared/editor/byEditor',
		shareController : '../shared/common/js/shareController',
		editorController : '../shared/editor/editorController',
		byMenuCtrl : '../components/menu/mainMenuController',

		//services
		discussService : '../components/discuss/discussService',
		userValidation : '../main/services/userValidation',
		urlFactory : '../main/services/urlFactory',
		sharedContextService : '../main/services/sharedContext',
		errorService : '../main/services/errorService',


		//factory
		DelegatorFactory : '../main/product/productResources/delegatorFactory',
		urlTemplateFactory : '../main/product/productResources/url-template.factory',
		CachedRequestFactory : '../main/product/productResources/cached-request-handler.service',
		ProductServiceFactory : '../main/product/productResources/productServiceFactory',
		ErrorStoreFactory : '../main/product/productResources/error-store.service',
		urlUtilsFactory : '../main/product/productResources/url-utils.factory',
		CategoryServiceFactory : '../main/product/productResources/category-service',
		BreadcrumbServiceFactory : '../main/product/productResources/breadcrumb.service',
		GlobalServiceFactory : '../main/product/productResources/global.service',
		UtilFactory : '../main/product/productResources/utils.factory',
		ProductDescFactory : '../components/product/productDescription/product-description.service',
		stateParamValidatorFactory : '../main/product/productResources/stateParamValidator',
		CartServiceFactory : '../components/product/cart/cart.service',
		CustomValidationFactory : '../main/product/productResources/custom-validation-directive',
		LogisticServiceFactory : '../main/product/productResources/logistic-service',

		AddAddressFactory : '../components/product/cartCheckout/add-address/add-address.service',
		EditAddressFactory : '../components/product/cartCheckout/edit-address/edit-address.service',
		SelectAddressFactory : '../components/product/cartCheckout/select-address/select-address.service',
		PaymentGatewayFactory : '../components/product/cartCheckout/payment-gateway/payment-gateway.service',
		ShoppingConfirmationFactory : '../components/product/cartCheckout/shopping-confirmation/shopping-confirmation.service',
		OrderHistoryFactory : '../components/product/orderHistory/order-history.service',


		//library
		//jquery : '../../lib/jqueryPlugins/jquery.min',
		angular : '../../lib/angular/angular.min',
		angularRoute : '../../lib/angular/angular-route',
		angularResource : '../../lib/angular/angular-resource',
		angularInfiniteScroll : '../../lib/angular/ng-infinite-scroll',
		angularGoogleLocation : '../../lib/angular/ng-google-location',
		angularCache : '../../lib/angular/angular-cache.min',
		angularBootstrap : '../../lib/angular/ui-bootstrap.min',
		angularBootstrapTmpl : '../../lib/angular/ui-bootstrap-tpls.min',
		angularBusy : '../../lib/angular/angular-busy/angular-busy',
		angularSanitize : '../../lib/angular/angular-sanitize.min',

		blogMasonary : '../../lib/jqueryPlugins/blog-masonry',
		jqueryMasonaryGrid : '../../lib/jqueryPlugins/jquery.masonry.min',
		lodash : '../../lib/lodash.min',
		bootstrapToggle: '../../lib/unify/plugins/bootstrap/js/bootstrap-toggle',


		//controllers
		homePromoController : '../components/home/homePromoController',
		discussLikeController : '../components/discussDetail/discussLikeCtrl',
		discussDetailLeftController : '../components/discussDetail/discussDetailLeftCtrl',
		discussReplyController : '../components/discussDetail/DiscussReplyCtrl',
		LoginController : '../components/signup/login/loginController',

		indvUserProfileCtrl : '../components/profile/individual/indvUserProfileCtrl',
		instProfileCtrl : '../components/profile/institution/instProfileCtrl',
		profUserProfileCtrl : '../components/profile/professional/profUserProfileCtrl',
		reviewRateController : '../components/profile/shared/reviewRateController',
		housingProfileCtrl : '../components/profile/housing/housingProfileCtrl',
		housingProfileLeftCtrl : '../components/profile/housing/housingProfileLeftCtrl',
		instProfileLeftCtrl : '../components/profile/institution/instProfileLeftCtrl',

		regIndividualCtrl : '../components/signup/registration/individual/regIndividualCtrl',
		regProfessionalCtrl : '../components/signup/registration/professional/regProfessionalCtrl',
		regInstitutionCtrl : '../components/signup/registration/institution/regInstitutionCtrl',
		regHousingCtrl : '../components/signup/registration/housing/regHousingCtrl',
		regHousingFacilityCtrl : '../components/signup/registration/housing/regHousingFacilityCtrl',
		regUserTypeController : '../components/signup/regUserTypeController',
		modifySignupCtrl : '../components/signup/login/modifySignupCtrl',

		productController : '../components/product/product-listing/productController',
		productMenuCtrl :  '../components/product/product-menu/productMenuCtrl',
		productDescCtrl : '../components/product/productDescription/product-description.controller',
		productReviewCtrl : '../components/product/product-rate-review/reviewRateController',
		videoImageDirective : '../components/product/productDescription/video-image.directive',
		videoModalController : '../components/product/productDescription/videoModal.controller',

		cartController : '../components/product/cart/cart.controller',
		shoppingConfirmationCtrl : '../components/product/cartCheckout/shopping-confirmation/shopping-confirmation.controller',
		selectAddressController : '../components/product/cartCheckout/select-address/select-address.controller',
		paymentGatewayController : '../components/product/cartCheckout/payment-gateway/payment-gateway.controller',
		editAddressController : '../components/product/cartCheckout/edit-address/edit-address.controller',
		addAddressController : '../components/product/cartCheckout/add-address/add-address.controller',

		orderHistoryCtrl : '../components/product/orderHistory/order-history.controller',
		headerCtrl : '../components/header/headerCtrl',
		discussCtrl : '../components/discuss/discussController',
		discussLeftCtrl : '../components/discuss/discussLeftController',
		housingMenuCtrl : '../components/housing/housingMenuCtrl',

		serviceOverviewCtrl: '../components/find/serviceOverviewsCtrl',
		housingReviewsCtrl: '../components/housing/housingReviewsCtrl',
		productReviewsCtrl: '../components/product/product-reviews/productReviewsCtrl'

	},

	shim : {
		'angular' : {
			'exports' : 'angular'
		},
		'angularRoute' : {
			deps : [ "angular" ]
		},
		"angularResource" : {
			deps : [ "angular" ]
		},
		"angularInfiniteScroll" : {
			deps : [ "angular" ]
		},
		"angularGoogleLocation" : {
			deps : [ "angular" ]
		},

		"angularCache" : {
			deps : [ "angular" ]
		},

		// 'bootstrapToggle' : {
		// 	deps : [ "jquery" ]
		// },

		"angularBootstrap"  : {
			deps : [ "angular" ]
		},

		"angularBootstrapTmpl"  : {
			deps : [ "angular", "angularBootstrap" ]
		},

		"angularBusy"  :  {
			deps : [ "angular" ]
		},

		"angularSanitize" : {
			deps : [ "angular" ]
		}
	}

});
require(['angular', "byApp", "byUtil", "byDirectives", "lodash", "byApplicationConfig"], function(angular, byApp, byUtil, byDirectives, lodash, byApplicationConfig) {
	var getProdCategoriesSuccess = function(prodCategories){
		window.by_prodCategories = JSON.parse(prodCategories);
		angular.bootstrap(document, [ "byApp" ]);
	};

	$.ajax({
		url : apiPrefix + 'api/v1/menu/getMenu?parentId=root',
		success : function(response) {
			window.by_menu = response;
			$.ajax({url : apiPrefix + BY.config.constants.productHost+'/catalog/categories?limit=100000', success :getProdCategoriesSuccess});
		}
	});
});