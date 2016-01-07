if (typeof a == "undefined") {
    var __xaf_app = (function () {
        var pub = {
            modalCallBack:function(data){
                console.log('callback function from a modal dialog ', data);
                $("#divModal").modal("hide");
            },
        };
        var local = {
            angularInit: function(){
                var RTApp =  angular.module('app', ['ui.router']);
                RTApp.run(function($rootScope, $state) {
                    // any app init can go heer
                })     
                RTApp.config(function($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('app', {
                            url: "/app",
                            abstract:true,
                            templateUrl: "Resources/app.html",
                            controller: 'appCtrl'
                        })
                        .state('app.landing', {
                            url:'/landing',
                            views: {
                                'main': {
                                    controller: 'landingController',
                                    templateUrl:'Resources/landing.html'
                                }
                            }
                        })                
                    $urlRouterProvider.otherwise('/app/landing');
                })
                RTApp.controller('appCtrl', function($scope, $state, $rootScope) {
                    
                });
                return RTApp;
            },
            onLoadHandler: function(){ 
            }
        };
        pub.app = local.angularInit();                
        __xaf_core.addEventHandle("readyState", local.onLoadHandler);
        return pub;
    })();
}
           

