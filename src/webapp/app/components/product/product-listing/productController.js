define(['byProductApp', 'byUtil',
        'productMenuCtrl', 'productDescCtrl', 'videoModalController', 'selectAddressController', 'addAddressController',
        'editAddressController', 'paymentGatewayController', 'shoppingConfirmationCtrl', 'menuConfig'],
    function (byProductApp, byUtil, productMenuCtrl, productDescCtrl, videoModalController, selectAddressController, addAddressController,
              editAddressController, paymentGatewayController, shoppingConfirmationCtrl, menuConfig) {
        function ProductsController($rootScope, $scope,
                                    $log,
                                    $q,
                                    $window,
                                    $location,
                                    $filter,
                                    $sce,
                                    ProductService,
                                    CategoryService,
                                    CartService,
                                    BreadcrumbService,
                                    $routeParams,
                                    PAGE_URL,
                                    SERVERURL_IMAGE,
                                    STATIC_IMAGE,
                                    Utility,
                                    PAGINATION, META_TAGS) {
            $log.debug('Inside Product Controller');

            //Variables
            var breadCrumb;
            $scope.discuss = [];
            $scope.discussCounts = {};
            $scope.discussCounts.z = 1;
            $scope.serverurl = SERVERURL_IMAGE.hostUrl;
            $scope.selectedTab = '';
            $scope.query = {};
            $scope.query.name = '';
            $scope.page = 0;
            $scope.pageSize = PAGINATION.pageSize;
            $scope.products = [];
            $scope.lastPage = false;
            $scope.isQueryInprogress = false;
            $scope.isFreeSearch = false;
            $scope.selectedMenu = ($rootScope.menuCategoryMap && $routeParams.menuId) ? $rootScope.menuCategoryMap[$routeParams.menuId] : null;
            $scope.showEditor = $routeParams.showEditor === 'true' ? true : false;
            $scope.menuConfig = BY.config.menu;
            $scope.showContact = {};
            $scope.showContact.showContactNumber = false;
            $scope.slug = $routeParams.productSlug;
            $scope.pageIdx = $routeParams.pageIdx ? $routeParams.pageIdx : 0;
            $scope.selectedMenuId = $routeParams.menuId;
            $scope.productSH = BY.config.menu.productsSH;

            //Functions
            $scope.openProductDescription = openProductDescription;
            $scope.reloadRoute = reloadRoute;
            $scope.getProducts = getProducts;
            $scope.promise = initialize();
            $scope.setDepth = setDepth;
            $scope.getNumber = getNumber;
            $scope.getSearchedResult = getSearchedResult;
            $scope.loadMoreRecords = loadMoreRecords;
            $scope.trustForcefully = trustForcefully;
            $rootScope.byTopMenuId = $rootScope.mainMenu[2].id;
            $scope.telNo = BY.config.constants.byContactNumber;
            $scope.headerCheck = '55bcad7be4b08970a736784b';


            function updateMetaTags() {
                var seoKeywords = META_TAGS.keywords.split(','), metaTagParams;
                seoKeywords.push($scope.selectedMenu.displayMenuName);
                for (var i = 0; i <= $scope.selectedMenu.ancestorIds.length - 1; i++) {
                    var categoryName = $rootScope.menuCategoryMap[$scope.selectedMenu.ancestorIds[i]].displayMenuName;
                    seoKeywords.push(categoryName);
                }

                metaTagParams = {
                    title: $scope.selectedMenu.displayMenuName + " " + META_TAGS.title,
                    imageUrl: "",
                    description: "<p>" + "Buy eldercare products online Walker, Security Pole, Bedrails, Home & Bathroom Safety Products useful for Elder Ease." + "</p>",
                    keywords: seoKeywords.concat(["Elder care products", "senior care products", "products for elders", "products for elders in bangalore", "products for elders in India", "elderly care products", "products for seniors", "products for senior citizens", "Products", "buy producs online", "online eldercare products", "walkers", "grab bars", "wheel chairs", "walking sticks", "canes", "home modification"])
                }
                BY.byUtil.updateMetaTags(metaTagParams);
            }

            function initialize() {
                if($scope.selectedMenuId == '55bcad7be4b08970a736784b'){
                    BY.byUtil.changeHeaderImage();
                }
                updateMetaTags();
                if ($scope.slug == 'all' || ($scope.selectedMenu && $scope.selectedMenu.ancestorIds.length > 0)) {
                    if ($scope.selectedMenu.module === BY.config.menu.modules['product'].moduleId && !$scope.showEditor) {
                        return getProducts();
                    }
                } else {
                    return getFeaturedProducts();
                }


            }

            function getProducts() {
                var category = $scope.selectedMenu.ancestorIds.length > 0 ? $scope.selectedMenu : null;
                $scope.isQueryInprogress = true;
                $scope.isFreeSearch = false;

                var productsPromise = getProductPromise(category),
                    categoriesPromise = CategoryService.getAllCategories(),
                    loadPromise = $q.all({product: productsPromise, category: categoriesPromise});
                return loadPromise.then(getProductPageSuccess, failure);
            }

            function getSearchedResult(isFromLoadMore) {
                $scope.isFreeSearch = true;
                $scope.isQueryInprogress = true;
                if (!isFromLoadMore) {
                    $scope.products = [];
                    $scope.page = 0;
                }
                var params = {};
                params.query = $scope.query.name;
                $scope.page = $scope.page + 1;
                params.page = $scope.page;
                params.pageSize = $scope.pageSize;
                var productsPromise = ProductService.getSearchedProduct(params),
                    categoriesPromise = CategoryService.getAllCategories();
                if ($scope.query.name === '') {
                    productsPromise = ProductService.getProducts(params);
                }
                if (!isFromLoadMore) {
                    $scope.promise = $q.all({product: productsPromise, category: categoriesPromise});
                    return $scope.promise.then(getProductPageSuccess, failure);
                } else {
                    $scope.lazyPromise = $q.all({product: productsPromise, category: categoriesPromise});
                    return $scope.lazyPromise.then(getProductPageSuccess, failure);
                }
            }

            /**
             * Set the breadcrums
             * @param  {object} category
             * @return {promise} of product service
             */
            function getProductPromise(category) {
                var params = {};
                $scope.page = parseInt($scope.pageIdx) + 1;
                params.page = $scope.page;
                params.pageSize = $scope.pageSize;
                $scope.pageIdx = $scope.page;
                if (category) {
                    if (category === 'featured') {
                        return ProductService.getFeaturedProducts(params);
                    } else {
                        var url = PAGE_URL.root,
                            categoryEnURI = $filter('encodeUri')(category),
                            name = category.name;
                        return getProductsByCategory(category);
                    }
                } else {
                    return ProductService.getProducts(params);
                }
            }

            function getProductsByCategory(category) {
                var params = {};
                params.id = category.id;
                params.page = $scope.page;
                params.pageSize = $scope.pageSize;
                params.q = '*';
                return $q.all({productByCategory: ProductService.getProductsByCategory(params)});
            }

            function getFeaturedProducts() {
                var category = $scope.selectedMenu.ancestorIds.length = 0;
                $scope.isQueryInprogress = true;
                $scope.isFreeSearch = false;
                var loadPromise = $q.all({product: ProductService.getFeaturedProducts()});
                return loadPromise.then(getProductPageSuccess, failure);
                /*return $q.all({ featuredProducts: ProductService.getFeaturedProducts()}).then(getProductPageSuccess, failure);*/
            }


            /**
             * Add depth parameter for each object in json of category
             * @param  {object} result categories
             * @return {void}
             */
            function getProductPageSuccess(result) {
                //Set Category
                var category = result.category || {};
                $scope.categories = category.category || category;
                // Set depth for category
                for (var i = 0; i < $scope.categories.length; i = i + 1) {
                    setDepth($scope.categories[i]);
                }
                //Set products
                var productList = extractProducts(result);
                $scope.products = $scope.products.concat(productList);
                $scope.length = $scope.products.length;
                if (productList.length === 0 || productList.length < $scope.pageSize) {
                    $scope.lastPage = true;
                }
                $scope.isQueryInprogress = false;
                $log.debug('getProductPageSuccess: ' + result);
            }

            /**
             * recursivly set depth for each object of json of category
             * @param {object} category category
             */
            function setDepth(category) {
                var depth = 0;
                var insertDepth = function (category, depth) {
                    category.depth = depth;
                    if (category.subcategories) {
                        insertDepth(category.subcategories, depth + 1);
                        for (var i = 0; i < category.subcategories.length; i = i + 1) {
                            insertDepth(category.subcategories[i], depth + 1);
                        }
                    }
                };
                insertDepth(category, depth + 1);
            }

            function extractProducts(result) {
                /* adding seo pagination url */
                var urlQueryParams = $location.search(),
                    currentPageIdx = parseInt($scope.pageIdx) - 1, lastPageIdx = 1;
                if (result.product && result.product.totalResults) {
                    lastPageIdx = Math.ceil(result.product.totalResults / result.product.pageSize) - 1;
                }
                if (result.product && result.product.productByCategory && result.product.productByCategory.totalResults) {
                    lastPageIdx = Math.ceil(result.product.productByCategory.totalResults / result.product.productByCategory.pageSize) - 1;
                }
                BY.byUtil.paginationSeoUrl(urlQueryParams, currentPageIdx, lastPageIdx);
                /* end seo pagination url */


                if (result.product) {
                    if (result.product.products || result.product.productByCategory) {
                        result = result.product.products || result.product.productByCategory;
                    } else {
                        result = result.product;
                    }
                }
                var products = [];
                if (Array.isArray(result)) {
                    products = result;
                } else {
                    $log.debug('Root category tree structure');
                    products = Utility.grabProducts(result, products);
                }
                Utility.checkImages(products);

                return products;

            }

            function failure() {
                $log.debug('Failure');
            }

            /**
             * Make search query as per click on category object
             * @param  {integer} productId
             * @param  {integer} categoryId
             * @param  {integer} categoryName [description]
             * @return {void}
             */
            function openProductDescription(productId, productName) {
                var prodName = productName.replace(/[^a-zA-Z0-9 ]/g, ""),
                    prodName = prodName.replace(/\s+/g, '-').toLowerCase(),
                    path = '/' + prodName + PAGE_URL.productDescription + "/" + productId;
                $location.path(path);
            }

            $scope.productUrl = function (productId, productName, categoryName) {
                var prodName = productName.replace(/[^a-zA-Z0-9 ]/g, ""),
                    prodName = prodName.replace(/\s+/g, '-').toLowerCase();
                if(categoryName){
                    var catName = categoryName.replace(/[^a-zA-Z0-9 ]/g, ""),
                    catName = catName.replace(/\s+/g, '-').toLowerCase();
                }                
                var newHref = '' + prodName + PAGE_URL.productDescription + "/" + catName + "/" + productId;
                return newHref;
            }

            /**
             * Refresh page
             */
            function reloadRoute() {
                console.log('reloadRoute');
                setTimeout(
                    function () {
                        $window.location.reload();
                    }, 1);
            }

            /**
             * Return the array with size passed to it of with num -2 length
             * add span tag for adding padding to left in category menu
             * @param  {integer} num
             * @return {array}     if number passed less then 2 return null else num-2
             */
            function getNumber(num) {
                if (num > 2) {
                    return new Array(num - 2);
                } else {
                    return null;
                }
            }

            function loadMoreRecords() {
                $log.debug('Load more results');
                if ($scope.isFreeSearch) {
                    $scope.lazyPromise = getSearchedResult(true);
                } else {
                    $scope.lazyPromise = getProducts();
                }
            }

            function trustForcefully(html) {
                return $sce.trustAsHtml(html);
            }

            $scope.trustAsResourceUrl = function(url) {
                return $sce.trustAsResourceUrl(url);
            };

            $scope.showVideo = function(){       
                var video = $("#by_productVideoFrame").attr("src");
                $("#by_productVideoFrame").attr("src", video.slice(0,-1) + '1');
                $(".by_expVideoGrad").hide();
            };


            $scope.tabbedSlider = function () {
                $('#myCarousel').carousel({
                    interval: 3000
                });

                var clickEvent = false;
                $('#myCarousel').on('click', '.nav a', function () {
                    clickEvent = true;
                    $('.nav li').removeClass('active');
                    $(this).parent().addClass('active');
                }).on('slid.bs.carousel', function () {
                    if (!clickEvent) {
                        var count = $('.nav-pills').children().length - 1;
                        var current = $('.nav-pills li.active');
                        current.removeClass('active').next().addClass('active');
                        var id = parseInt(current.data('slide-to'));
                        if (count == id) {
                            $('.nav-pills li').first().addClass('active');
                        }
                    }
                    clickEvent = false;
                });
            };
            $scope.slideIndex = 1;

            $scope.feWidth = function () {
                if ($rootScope.windowWidth > 850) {
                    $scope.byFeaWid = ($(".by_featuredProduct_middle").outerWidth() / 4) - 10;
                    $scope.byFeaWidSpace = $(".by_featuredProduct_middle").outerWidth() / 4;
                } else if ($rootScope.windowWidth > 720) {
                    $scope.byFeaWid = ($(".by_featuredProduct_middle").outerWidth() / 3) - 10;
                    $scope.byFeaWidSpace = $(".by_featuredProduct_middle").outerWidth() / 3;
                } else if ($rootScope.windowWidth > 400) {
                    $scope.byFeaWid = ($(".by_featuredProduct_middle").outerWidth() / 2) - 10;
                    $scope.byFeaWidSpace = $(".by_featuredProduct_middle").outerWidth() / 2;
                } else {
                    $scope.byFeaWid = ($(".by_featuredProduct_middle").outerWidth() / 1) - 10;
                    $scope.byFeaWidSpace = $(".by_featuredProduct_middle").outerWidth() / 1;
                }
                $(".by_featuredProductCard").css('width', $scope.byFeaWid + "px");
            }

            $scope.slideGallery = function (dir) {
                if ($scope.slideIndex < 1) {
                    $scope.slideIndex = 1;
                }
                $scope.byGalleryCount = ($(".by_featuredProduct_middle").outerWidth() / $scope.byFeaWidSpace) - 1;
                $scope.byimageGallery = $scope.byFeaWidSpace;
                $scope.bygallerycontainer = $(".by_featuredProduct_wrapperInside").outerWidth();
                $scope.w = ($scope.bygallerycontainer / $scope.byimageGallery) - $scope.byGalleryCount;
                //alert($scope.w);
                if ($scope.slideIndex < $scope.w && dir === "r") {
                    $('.by_featuredProduct_wrapperInside').css("-webkit-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("-moz-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("-ms-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("-o-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex) + "px, 0px)");
                    $scope.slideIndex++;
                }
                if ($scope.slideIndex >= 0 && dir === "l") {
                    $('.by_featuredProduct_wrapperInside').css("-webkit-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex - 2) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("-moz-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex - 2) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("-ms-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex - 2) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("-o-transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex - 2) + "px, 0px)");
                    $('.by_featuredProduct_wrapperInside').css("transform", "translate(-" + ($scope.byimageGallery) * ($scope.slideIndex - 2) + "px, 0px)");
                    $scope.slideIndex--;
                }

            };


            $scope.getDiscountPercentage = function (product) {
                var salePrice = product.salePrice ? parseInt(product.salePrice.amount) : 0,
                    retailPrice = product.retailPrice ? parseInt(product.retailPrice.amount) : 0, discount = 0;

                if (salePrice > 0 && retailPrice > 0 && salePrice < retailPrice) {
                    discount = ((retailPrice - salePrice) / retailPrice) * 100;
                }

                if (discount > 0) {
                    discount = discount.toFixed(0);
                    product.discountPercentage = discount;
                }
            }

            $scope.showVideo4 = function(){       
                $("#by_expVideoFrame4").attr("src", 'https://www.youtube.com/embed/W_OtlOhf0i8?rel=0&showinfo=0&autoplay=1');
                var frameHeight = $(".by_expVideoShow4").outerHeight();
                $("#by_expVideoFrame4").attr("height", frameHeight);
                $("#by_expVideoFrame4").css("display", 'block');
                $(".by_expVideoShow4").hide();
            };

            $scope.showVideo1 = function(){       
                $("#by_expVideoFrame1").attr("src", 'https://www.youtube.com/embed/G7iQyQM9o78?rel=0&showinfo=0&autoplay=1');
                var frameHeight = $(".by_expVideoShow1").outerHeight();
                $("#by_expVideoFrame1").attr("height", frameHeight);
                $("#by_expVideoFrame1").css("display", 'block');
                $(".by_expVideoShow1").hide();
            };

            $scope.showVideo2 = function(){       
                $("#by_expVideoFrame2").attr("src", 'https://www.youtube.com/embed/pE8EShECqmA?rel=0&showinfo=0&autoplay=1');
                var frameHeight = $(".by_expVideoShow2").outerHeight();
                $("#by_expVideoFrame2").attr("height", frameHeight);
                $("#by_expVideoFrame2").css("display", 'block');
                $(".by_expVideoShow2").hide();
            };

            $scope.showVideo3 = function(){       
                $("#by_expVideoFrame3").attr("src", 'https://www.youtube.com/embed/hPR5Wf3MlTc?rel=0&showinfo=0&autoplay=1');
                var frameHeight = $(".by_expVideoShow3").outerHeight();
                $("#by_expVideoFrame3").attr("height", frameHeight);
                $("#by_expVideoFrame3").css("display", 'block');
                $(".by_expVideoShow3").hide();
            };

        }

        ProductsController.$inject = ['$rootScope', '$scope',
            '$log',
            '$q',
            '$window',
            '$location',
            '$filter',
            '$sce',
            'ProductService',
            'CategoryService',
            'CartService',
            'BreadcrumbService',
            '$routeParams',
            'PAGE_URL',
            'SERVERURL_IMAGE',
            'STATIC_IMAGE',
            'Utility',
            'PAGINATION',
            'META_TAGS'];

        byProductApp.registerController('ProductsController', ProductsController);
        return ProductsController;
    });

