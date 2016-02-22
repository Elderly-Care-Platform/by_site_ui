define(['byApp', 'byUtil','urlFactory'], function(byApp, byUtil, urlFactory) {
    function editDiscussController($scope, $rootScope, DiscussDetail,
        $http, $location, $route, $routeParams, Discuss, urlFactoryFilter, $sce) {
        var discussId = $routeParams.id;
        var initialize = init(); 
        $scope.errorMsg  = "";
        $scope.showLinkView                     = false;
        $scope.sharedLinkUrl                    = "";
        $scope.linkImages                       = [];
        $scope.linkImagesIdx                    = 0;
        $scope.categoryLists                    = null;

        DiscussDetail.get({
            discussId: discussId
        }, function(discussDetail, header) {
            $scope.discuss = discussDetail.data.discuss;
            if($scope.discuss.discussType == 'Q'){
                editQuestionAll();
            }
            if($scope.discuss.discussType == 'P'){
                editPostAll();
            }
            if($scope.discuss.linkInfo != null){
                $scope.showLinkView = true;
            }
            $("#preloader").hide();
        },
        function(error) {
            $("#preloader").hide();
            console.log("error");
        });

        function setQuestionText(){
            if(tinymce.get("question_textArea") && $scope.discuss.text){
                tinymce.get("question_textArea").setContent($scope.discuss.text);
                $(".by_btn_submit").prop("disabled", false);
            }
        }

        function setPostText(){
            if(tinymce.get("article_textArea") && $scope.discuss.text){
                tinymce.get("article_textArea").setContent($scope.discuss.text);
                $(".by_btn_submit").prop("disabled", false);
            }
        }

        function init(){
            var tinyEditor = BY.byEditor.addEditor({"editorTextArea": "question_textArea"}, setQuestionText);
            var tinyEditor = BY.byEditor.addEditor({"editorTextArea": "article_textArea"}, setPostText);
        }

        function editQuestionAll(){       

            $scope.postContent = function(discussType) {
                $scope.errorMsg = "";
                $scope.discuss.discussType = discussType;
                if (tinyMCE.activeEditor) {
                    $scope.discuss.text = tinyMCE.activeEditor.getContent();
                }
                $scope.submitContent();
            };
            
        }

        function formatContent(){
            //putting the userId to discuss being created
            $scope.discuss.userId = localStorage.getItem("USER_ID");
            $scope.discuss.username = localStorage.getItem("USER_NAME");

            //article photo
            if($scope.discuss.articlePhotoFilename && $scope.discuss.articlePhotoFilename.original){
                $scope.discuss.articlePhotoFilename = $scope.discuss.articlePhotoFilename;
            } else if($scope.discuss.articlePhotoFilename && !$scope.discuss.articlePhotoFilename.original){
                $scope.discuss.articlePhotoFilename = JSON.parse($scope.discuss.articlePhotoFilename);
            } else{
                if($("#articleTitleImage") && $("#articleTitleImage").val()){
                    $scope.discuss.articlePhotoFilename = JSON.parse($("#articleTitleImage").val());
                }
            }

            if($scope.showLinkView){
                $scope.discuss.contentType = 2;
                $scope.discuss.linkInfo = $scope.discuss.linkInfo;
            }else{
                $scope.discuss.contentType = 0;
            }
        };

        function validateContent(){
            if($scope.showLinkView){
                if(!$scope.discuss.linkInfo){
                    $scope.errorMsg = "Invalid shared info";
                }else{
                    $scope.errorMsg = "";
                }
            } else if($scope.discuss.articlePhotoFilename){
                $scope.errorMsg = "";
            } else if($scope.discuss.title.trim().length <= 0 && $scope.discuss.discussType==="P"){
                $scope.errorMsg = "Please select title";
            } else if($scope.discuss.text.trim().length <= 0){
                $scope.errorMsg = "Please add more details";
            } else{
                $scope.errorMsg = "";
            }


            //If all other validation error are cleared then show email id error
            if($scope.errorMsg.trim().length === 0){
                if($scope.userSessionType === null && (!$scope.userCredential.email || !BY.byUtil.validateEmailId($scope.userCredential.email))){
                    $scope.errorMsg = "Please enter valid Email Id";
                }
            }
        };

        $scope.resetEditorView = function(){
            $scope.showLinkView = false;
            $scope.discuss.articlePhotoFilename = null;
            $scope.discuss.linkInfo = null;
            $(".by_uploading_image").hide();
            $(".by-editor-view-buttons").removeClass('hide');
            $(".by-editor-view-buttons").show();
        };


        $scope.postLink = function(){
            if($scope.sharedLinkUrl && $scope.sharedLinkUrl.trim().length > 0){
                $(".by-editor-view-buttons").hide();
                //$(".by_share_btn_submit").prop("disabled", true);
                $scope.showLinkView = true;
                $scope.linkInfoLoading = true;
                $http.get(BY.config.constants.apiPrefix + 'api/v1/discuss/getLinkInfo?url='+encodeURIComponent($scope.sharedLinkUrl)).
                    then(function(response) {
                        $scope.linkImages = [];
                        $scope.linkImagesIdx = 0;

                        $scope.discuss.linkInfo = response.data.data;
                        if($scope.discuss.linkInfo.mainImage){
                            $scope.linkImages.push($scope.discuss.linkInfo.mainImage);
                        }
                        if($scope.discuss.linkInfo.otherImages && $scope.discuss.linkInfo.otherImages.length > 0){
                            $scope.linkImages = $scope.linkImages.concat($scope.discuss.linkInfo.otherImages);
                        }
                        if($scope.linkImages.length > 1){
                            $scope.discuss.linkInfo.mainImage = $scope.linkImages[$scope.linkImagesIdx];
                        }

                        $scope.linkInfoLoading = false;
                        $scope.sharedLinkUrl = "";
                        $(".by_btn_submit").prop("disabled", false);
                    }, function(error) {
                        $scope.linkInfoLoading = false;
                        console.log(error);
                        $scope.sharedLinkUrl = "";
                        $(".by_btn_submit").prop("disabled", false);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
        }

        $scope.selectPrevLinkImage = function(){
            $scope.linkImagesIdx--;
            $scope.discuss.linkInfo.mainImage = $scope.linkImages[$scope.linkImagesIdx];
        }

        $scope.selectNextLinkImage = function(){
            $scope.linkImagesIdx++;
            $scope.discuss.linkInfo.mainImage = $scope.linkImages[$scope.linkImagesIdx];
        }

        $scope.trustAsResourceUrl = function (url) {
            return $sce.trustAsResourceUrl(url);
        };

        function editPostAll(){           

            $scope.postContent = function(discussType) {
                $scope.discuss.discussType = discussType;
                if(tinyMCE.activeEditor){
                    $scope.discuss.text         = tinyMCE.activeEditor.getContent();
                }

                $scope.discuss.title        = $scope.discuss.title;

                formatContent();
                validateContent();
                $scope.submitContent();
            };
           
        }    

        $scope.submitContent = function() {
            if($scope.errorMsg == ""){
                var discussData = new Discuss();
                angular.extend(discussData, $scope.discuss);
                discussData.$update({
                    discussId: discussId
                }, function(discussData, header) {
                    $scope.exitEditorDiscuss();
                },
                function(errorResponse) {
                    console.log(errorResponse);
                    $(".by_btn_submit").prop("disabled", false);
                });
            }
        };    

        $scope.exitEditorDiscuss = function(){
            function getUrl(discuss, urlQueryParams) {
                var url = urlFactoryFilter.getDiscussDetailUrl(discuss, urlQueryParams, true);
                $location.path(url);
            };
            getUrl($scope.discuss, {'id':$scope.discuss.id});
        }

    }
    editDiscussController.$inject = ['$scope', '$rootScope', 'DiscussDetail', 
        '$http', '$location', '$route', '$routeParams', 'Discuss', 'UrlFactoryFilter', '$sce'
    ];
    byApp.registerController('editDiscussController', editDiscussController);

    return editDiscussController;
});