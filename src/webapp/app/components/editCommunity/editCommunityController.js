define(['byApp', 'byUtil', 'editPostDiscussDetailCtrl'], function(byApp, byUtil, editPostDiscussDetailCtrl) {
    function editDiscussController($scope, $rootScope, DiscussDetail,
        $http, $location, $route, $routeParams, Discuss) {
        var discussId = $routeParams.id;
        var initialize                  = init();

        DiscussDetail.get({
                discussId: discussId
            }, function(discussDetail, header) {
                $scope.discuss = discussDetail.data.discuss;
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

        function init(){
            //initialize tinymce editor
            var tinyEditor = BY.byEditor.addEditor({"editorTextArea": "question_textArea"}, setQuestionText);
        }

        $scope.postContent = function(discussType) {
            $(".by_btn_submit").prop("disabled", true);
            $scope.discuss.discussType = discussType;
            if (tinyMCE.activeEditor) {
                $scope.discuss.text = tinyMCE.activeEditor.getContent();
            }
            $scope.submitContent();
        };

        $scope.submitContent = function() {
             var discussData = new Discuss();
                angular.extend(discussData, $scope.discuss);
            discussData.$update({
                    discussId: discussId
                }, function(discussData, header) {
                    $route.reload();
                },
                function(errorResponse) {
                    console.log(errorResponse);
                    $(".by_btn_submit").prop("disabled", false);
                });
        };

        $scope.exitEditorDiscuss = function(){
            
        }



    }
    editDiscussController.$inject = ['$scope', '$rootScope', 'DiscussDetail', 
        '$http', '$location', '$route', '$routeParams', 'Discuss'
    ];
    byApp.registerController('editDiscussController', editDiscussController);

    return editDiscussController;
});