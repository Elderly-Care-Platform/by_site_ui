require.config({
	baseUrl: '../../../../../',
	//urlArgs: "versionTimeStamp=%PROJECT_VERSION%",
	waitSeconds : 0,
	name:'app/shared/main',
	include: ["app/components/home/homeController",
		'app/components/discuss/discussMenuCtrl',
		'app/components/discussDetail/discussDetailController',
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
		'app/components/error/errorController'
		],

	paths : {

		//core
		byApp : 'app/main/app',
		byResource : 'app/main/appResources',
		byDirectives : 'app/main/appDirectives',
		byAppRoute : 'app/main/appRoute',
		byProductApp : 'app/main/product/productApp',
		byProductResources : 'app/main/product/productResources',
		byProductRoute : 'app/main/product/productRoute',

		//config
		byApplicationConfig : 'app/shared/common/config/byApplicationConfig',
		byProdEcomConfig : 'app/shared/common/config/byProductEcomConfig',
		bySeoConfig : 'app/shared/common/config/seoMetaConfig',
		byProductConfig : 'app/components/product/productConfig',
		userTypeConfig : 'app/shared/common/config/userTypesConfig',
		menuConfig : 'app/components/menu/menuConfig',
		discussConfig : 'app/shared/common/config/discussConfig',
		registrationConfig : 'app/components/signup/common/registrationConfig',

		//shared
		byUtil : 'app/shared/util/byUtil',
		byEditor : 'app/shared/editor/byEditor',
		shareController : 'app/shared/common/js/shareController',
		editorController : 'app/shared/editor/editorController',
		byMenuCtrl : 'app/components/menu/mainMenuController',

		//services
		discussService : 'app/components/discuss/discussService',
		userValidation : 'app/main/services/userValidation',
		urlFactory : 'app/main/services/urlFactory',
		sharedContextService : 'app/main/services/sharedContext',
		errorService : 'app/main/services/errorService',


		//factory
		DelegatorFactory : 'app/main/product/productResources/delegatorFactory',
		urlTemplateFactory : 'app/main/product/productResources/url-template.factory',
		CachedRequestFactory : 'app/main/product/productResources/cached-request-handler.service',
		ProductServiceFactory : 'app/main/product/productResources/productServiceFactory',
		ErrorStoreFactory : 'app/main/product/productResources/error-store.service',
		urlUtilsFactory : 'app/main/product/productResources/url-utils.factory',
		CategoryServiceFactory : 'app/main/product/productResources/category-service',
		BreadcrumbServiceFactory : 'app/main/product/productResources/breadcrumb.service',
		GlobalServiceFactory : 'app/main/product/productResources/global.service',
		UtilFactory : 'app/main/product/productResources/utils.factory',
		ProductDescFactory : 'app/components/product/productDescription/product-description.service',
		stateParamValidatorFactory : 'app/main/product/productResources/stateParamValidator',
		CartServiceFactory : 'app/components/product/cart/cart.service',
		CustomValidationFactory : 'app/main/product/productResources/custom-validation-directive',
		LogisticServiceFactory : 'app/main/product/productResources/logistic-service',

		AddAddressFactory : 'app/components/product/cartCheckout/add-address/add-address.service',
		EditAddressFactory : 'app/components/product/cartCheckout/edit-address/edit-address.service',
		SelectAddressFactory : 'app/components/product/cartCheckout/select-address/select-address.service',
		PaymentGatewayFactory : 'app/components/product/cartCheckout/payment-gateway/payment-gateway.service',
		ShoppingConfirmationFactory : 'app/components/product/cartCheckout/shopping-confirmation/shopping-confirmation.service',
		OrderHistoryFactory : 'app/components/product/orderHistory/order-history.service',


		//library
		//jquery : '../../lib/jqueryPlugins/jquery.min',
		angular : 'lib/angular/angular.min',
		angularRoute : 'lib/angular/angular-route',
		angularResource : 'lib/angular/angular-resource',
		angularInfiniteScroll : 'lib/angular/ng-infinite-scroll',
		angularGoogleLocation : 'lib/angular/ng-google-location',
		angularCache : 'lib/angular/angular-cache.min',
		angularBootstrap : 'lib/angular/ui-bootstrap.min',
		angularBootstrapTmpl : 'lib/angular/ui-bootstrap-tpls.min',
		angularBusy : 'lib/angular/angular-busy/angular-busy',
		angularSanitize : 'lib/angular/angular-sanitize.min',

		blogMasonary : 'lib/jqueryPlugins/blog-masonry',
		jqueryMasonaryGrid : 'lib/jqueryPlugins/jquery.masonry.min',
		lodash : 'lib/lodash.min',
		bootstrapToggle: 'lib/unify/plugins/bootstrap/js/bootstrap-toggle',


		//controllers
		announcementCtrl : 'app/components/announcements/announcementCtrl',
		homeController : 'app/components/home/homeController',
		homePromoController : 'app/components/home/homePromoController',
		discussMenuCtrl : 'app/components/discuss/discussMenuCtrl',
		discussDetailCtrl : 'app/components/discussDetail/discussDetailController',
		discussLikeController : 'app/components/discussDetail/discussLikeCtrl',
		discussDetailLeftController : 'app/components/discussDetail/discussDetailLeftCtrl',
		discussReplyController : 'app/components/discussDetail/DiscussReplyCtrl',
		LoginController : 'app/components/signup/login/loginController',

		indvUserProfileCtrl : 'app/components/profile/individual/indvUserProfileCtrl',
		instProfileCtrl : 'app/components/profile/institution/instProfileCtrl',
		profUserProfileCtrl : 'app/components/profile/professional/profUserProfileCtrl',
		reviewRateController : 'app/components/profile/shared/reviewRateController',
		housingProfileCtrl : 'app/components/profile/housing/housingProfileCtrl',
		housingProfileLeftCtrl : 'app/components/profile/housing/housingProfileLeftCtrl',
		instProfileLeftCtrl : 'app/components/profile/institution/instProfileLeftCtrl',

		regIndividualCtrl : 'app/components/signup/registration/individual/regIndividualCtrl',
		regProfessionalCtrl : 'app/components/signup/registration/professional/regProfessionalCtrl',
		regInstitutionCtrl : 'app/components/signup/registration/institution/regInstitutionCtrl',
		regHousingCtrl : 'app/components/signup/registration/housing/regHousingCtrl',
		regHousingFacilityCtrl : 'app/components/signup/registration/housing/regHousingFacilityCtrl',
		regUserTypeController : 'app/components/signup/regUserTypeController',
		modifySignupCtrl : 'app/components/signup/login/modifySignupCtrl',

		productController : 'app/components/product/product-listing/productController',
		productMenuCtrl :  'app/components/product/product-menu/productMenuCtrl',
		productDescCtrl : 'app/components/product/productDescription/product-description.controller',
		productReviewCtrl : 'app/components/product/product-rate-review/reviewRateController',
		videoImageDirective : 'app/components/product/productDescription/video-image.directive',
		videoModalController : 'app/components/product/productDescription/videoModal.controller',

		cartController : 'app/components/product/cart/cart.controller',
		shoppingConfirmationCtrl : 'app/components/product/cartCheckout/shopping-confirmation/shopping-confirmation.controller',
		selectAddressController : 'app/components/product/cartCheckout/select-address/select-address.controller',
		paymentGatewayController : 'app/components/product/cartCheckout/payment-gateway/payment-gateway.controller',
		editAddressController : 'app/components/product/cartCheckout/edit-address/edit-address.controller',
		addAddressController : 'app/components/product/cartCheckout/add-address/add-address.controller',

		orderHistoryCtrl : 'app/components/product/orderHistory/order-history.controller',
		headerCtrl : 'app/components/header/headerCtrl',
		discussCtrl : 'app/components/discuss/discussController',
		discussLeftCtrl : 'app/components/discuss/discussLeftController',
		housingMenuCtrl : 'app/components/housing/housingMenuCtrl',

		serviceOverviewCtrl: 'app/components/find/serviceOverviewsCtrl',
		housingReviewsCtrl: 'app/components/housing/housingReviewsCtrl',
		productReviewsCtrl: 'app/components/product/product-reviews/productReviewsCtrl',

		servicesCtrl : 'app/components/find/servicesController',
		findMenuCtrl : 'app/components/find/findMenuCtrl',
		housingCtrl : 'app/components/housing/housingController',
		registrationCtrl : 'app/components/signup/registrationController',
		logoutCtrl : 'app/components/signup/login/logoutController',
		userProfileCtrl : 'app/components/profile/userProfileCtrl',
		contactUsCtrl : 'app/shared/footer/contactUsController',
		aboutUsCtrl : 'app/components/aboutUs/aboutUsController',
		SearchCtrl : 'app/components/search/SearchController',
		errorCtrl : 'app/components/error/errorController'

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

})