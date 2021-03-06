define(['byApp', 'registrationConfig'], function (byApp, registrationConfig) {

    function UrlFactory($rootScope, $location, $http) {
        return {
            getDiscussDetailUrl : getDiscussDetailUrl,
            getReplyUrl : getReplyUrl, 
            getReviewUrl : getReviewUrl,
            getProfileUrl : getProfileUrl,
            getHousingProfileUrl : getHousingProfileUrl,
            getdirectoryProfileUrl : getdirectoryProfileUrl,
            getProfileDetailUrlS : getProfileDetailUrlS
        };

        

        function getDiscussDetailUrl(discuss, queryParams, isAngularLocation) {
            var disTitle = "detail", newHref;
            if (discuss.title && discuss.title.trim().length > 0) {
                disTitle = discuss.title;
            } else if (discuss.text && discuss.text.trim().length > 0) {
                disTitle = discuss.text;
            } else if (discuss.linkInfo && discuss.linkInfo.title && discuss.linkInfo.title.trim().length > 0) {
                disTitle = discuss.linkInfo.title;
            } else {
                disTitle = "detail";
            }

            disTitle = BY.byUtil.getSlug(disTitle);

            if(discuss.promotion == true){
                newHref = "/announcements/" + disTitle;
            }else{
                newHref = "/elder-care-forums/" + disTitle;
            }



            if (queryParams && Object.keys(queryParams).length > 0) {
                //Set query params through angular location search method
                if (isAngularLocation) {
                    angular.forEach($location.search(), function (value, key) {
                        $location.search(key, null);
                    });
                    angular.forEach(queryParams, function (value, key) {
                        $location.search(key, value);
                    });
                } else { //Set query params manually
                    newHref = newHref + "?"
                    angular.forEach(queryParams, function (value, key) {
                        newHref = newHref + key + "=" + value + "&";
                    });

                    //remove the last  '&' symbol from the url, otherwise browser back does not work
                    newHref = newHref.substr(0, newHref.length - 1);
                }
            }

            return newHref;
        };

        function getReplyUrl(profile, urlQueryParams, isAngularLocation) {
            var proTitle = "anonymous";
            if (profile && profile.userName && profile.userName.length > 0) {
                proTitle = BY.byUtil.validateUserName(profile.userName);
            } else {
                proTitle = "anonymous";
            }

            proTitle = BY.byUtil.getSlug(proTitle);
            var newHref = "/users/" + proTitle;


            if (urlQueryParams && Object.keys(urlQueryParams).length > 0) {
                //Set query params through angular location search method
                if (isAngularLocation) {
                    angular.forEach($location.search(), function (value, key) {
                        $location.search(key, null);
                    });
                    angular.forEach(urlQueryParams, function (value, key) {
                        $location.search(key, value);
                    });
                } else { //Set query params manually
                    newHref = newHref + "?"

                    angular.forEach(urlQueryParams, function (value, key) {
                        newHref = newHref + key + "=" + value + "&";
                    });

                    //remove the last  '&' symbol from the url, otherwise browser back does not work
                    newHref = newHref.substr(0, newHref.length - 1);
                }
            }

            return newHref;
        };


        function getReviewUrl(profile, urlQueryParams, isAngularLocation) {
            var proTitle = "reviews";
            if (profile && profile.userName && profile.userName.length > 0) {
                proTitle = BY.byUtil.validateUserName(profile.userName);
            } else {
                proTitle = "reviews";
            }

            proTitle = BY.byUtil.getSlug(proTitle);
            var newHref = "/users/" + proTitle;


            if (urlQueryParams && Object.keys(urlQueryParams).length > 0) {
                //Set query params through angular location search method
                if (isAngularLocation) {
                    angular.forEach($location.search(), function(value, key) {
                        $location.search(key, null);
                    });
                    angular.forEach(urlQueryParams, function(value, key) {
                        $location.search(key, value);
                    });
                } else { //Set query params manually
                    newHref = newHref + "?"

                    angular.forEach(urlQueryParams, function(value, key) {
                        newHref = newHref + key + "=" + value + "&";
                    });

                    //remove the last  '&' symbol from the url, otherwise browser back does not work
                    newHref = newHref.substr(0, newHref.length - 1);
                }
            }

            return newHref;
        };

        function getProfileUrl(profile, urlQueryParams, isAngularLocation){
            var proTitle = "anonymous";
            /*if(profile.userProfile && profile.userProfile.basicProfileInfo.firstName.length > 0){
                 proTitle = profile.userProfile.basicProfileInfo.firstName;
                 if(profile.userProfile.individualInfo.lastName != null && profile.userProfile.individualInfo.lastName.length > 0){
                     proTitle = proTitle + " " + profile.userProfile.individualInfo.lastName;
                 }
            } else*/ if(profile && profile.username && profile.username.length > 0){
                 proTitle = BY.byUtil.validateUserName(profile.username);
             }else{
                 proTitle = "anonymous";
             }

            proTitle = BY.byUtil.getSlug(proTitle);
            var newHref = "/users/"+proTitle;


            if(urlQueryParams && Object.keys(urlQueryParams).length > 0){
                //Set query params through angular location search method
                if(isAngularLocation){
                    angular.forEach($location.search(), function (value, key) {
                        $location.search(key, null);
                    });
                    angular.forEach(urlQueryParams, function (value, key) {
                        $location.search(key, value);
                    });
                } else{ //Set query params manually
                    newHref = newHref + "?"

                    angular.forEach(urlQueryParams, function (value, key) {
                        newHref = newHref + key + "=" + value + "&";
                    });

                    //remove the last  '&' symbol from the url, otherwise browser back does not work
                    newHref = newHref.substr(0, newHref.length - 1);
                }
            }

            return newHref;
        };

        function getHousingProfileUrl(profile, urlQueryParams, isAngularLocation){
            var proTitle = "anonymous";
             if(profile && profile.name && profile.name.length > 0){
                 proTitle = profile.name;
             }else{
                 proTitle = "anonymous";
             }

            proTitle = BY.byUtil.getSlug(proTitle);
            var newHref = "/elder-care-services/"+proTitle;


            if(urlQueryParams && Object.keys(urlQueryParams).length > 0){
                //Set query params through angular location search method
                if(isAngularLocation){
                    angular.forEach($location.search(), function (value, key) {
                        $location.search(key, null);
                    });
                    angular.forEach(urlQueryParams, function (value, key) {
                        $location.search(key, value);
                    });
                } else{ //Set query params manually
                    newHref = newHref + "?"

                    angular.forEach(urlQueryParams, function (value, key) {
                        newHref = newHref + key + "=" + value + "&";
                    });

                    //remove the last  '&' symbol from the url, otherwise browser back does not work
                    newHref = newHref.substr(0, newHref.length - 1);
                }
            }

            return newHref;
        };


        // function getIndvProfileUrl(profile, urlQueryParams, isAngularLocation) {
        //     var proTitle = "anonymous";
        //     if (profile && profile.username && profile.username.length > 0) {
        //         proTitle = BY.byUtil.validateUserName(profile.username);
        //     }

        //     proTitle = BY.byUtil.getSlug(proTitle);
        //     var newHref = "/users/" + proTitle;

        //     if (urlQueryParams && Object.keys(urlQueryParams).length > 0) {
        //         //Set query params through angular location search method
        //         if (isAngularLocation) {
        //             angular.forEach($location.search(), function (value, key) {
        //                 $location.search(key, null);
        //             });
        //             angular.forEach(urlQueryParams, function (value, key) {
        //                 $location.search(key, value);
        //             });
        //         } else { //Set query params manually
        //             newHref = newHref + "?"

        //             angular.forEach(urlQueryParams, function (value, key) {
        //                 newHref = newHref + key + "=" + value + "&";
        //             });

        //             //remove the last  '&' symbol from the url, otherwise browser back does not work
        //             newHref = newHref.substr(0, newHref.length - 1);
        //         }
        //     }

        //     return newHref;
        // };

        function getdirectoryProfileUrl(profile, urlQueryParams, isAngularLocation) {
            var proTitle = "anonymous";
            if (profile && profile.userProfile && profile.userProfile.basicProfileInfo.firstName && profile.userProfile.basicProfileInfo.firstName.length > 0) {
                proTitle = profile.userProfile.basicProfileInfo.firstName;
                if (profile.userProfile.individualInfo.lastName && profile.userProfile.individualInfo.lastName != null && profile.userProfile.individualInfo.lastName.length > 0) {
                    proTitle = proTitle + " " + profile.userProfile.individualInfo.lastName;
                }
            } else if (profile && profile.username && profile.username.length > 0) {
                proTitle = BY.byUtil.validateUserName(profile.username);
            } else {
                proTitle = "anonymous";
            }

            proTitle = BY.byUtil.getSlug(proTitle);
            var newHref = "/users/" + proTitle;


            if (urlQueryParams && Object.keys(urlQueryParams).length > 0) {
                //Set query params through angular location search method
                if (isAngularLocation) {
                    angular.forEach($location.search(), function (value, key) {
                        $location.search(key, null);
                    });
                    angular.forEach(urlQueryParams, function (value, key) {
                        $location.search(key, value);
                    });
                } else { //Set query params manually
                    newHref = newHref + "?"

                    angular.forEach(urlQueryParams, function (value, key) {
                        newHref = newHref + key + "=" + value + "&";
                    });

                    //remove the last  '&' symbol from the url, otherwise browser back does not work
                    newHref = newHref.substr(0, newHref.length - 1);
                }
            }

            return newHref;
        };

        

        function getProfileDetailUrlS(profile, urlQueryParams, isAngularLocation){
            var proTitle = "anonymous";
             if(profile && profile.basicProfileInfo.firstName && profile.basicProfileInfo.firstName.length > 0){
                 proTitle = profile.basicProfileInfo.firstName;
                 if(profile.individualInfo.lastName && profile.individualInfo.lastName != null && profile.individualInfo.lastName.length > 0){
                     proTitle = proTitle + " " + profile.individualInfo.lastName;
                 }
             }else{
                 proTitle = "anonymous";
             }

            proTitle = BY.byUtil.getSlug(proTitle);
            var newHref = "/elder-care-services/"+proTitle;


            if(urlQueryParams && Object.keys(urlQueryParams).length > 0){
                //Set query params through angular location search method
                if(isAngularLocation){
                    angular.forEach($location.search(), function (value, key) {
                        $location.search(key, null);
                    });
                    angular.forEach(urlQueryParams, function (value, key) {
                        $location.search(key, value);
                    });
                } else{ //Set query params manually
                    newHref = newHref + "?"

                    angular.forEach(urlQueryParams, function (value, key) {
                        newHref = newHref + key + "=" + value + "&";
                    });

                    //remove the last  '&' symbol from the url, otherwise browser back does not work
                    newHref = newHref.substr(0, newHref.length - 1);
                }
            }

            return newHref;
        };
            
    }

    byApp.registerService('UrlFactory', UrlFactory);
    return UrlFactory;
});
