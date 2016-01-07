


if (typeof __xaf_app != "undefined") {
	var app = __xaf_app.app;
	app.controller('landingController', function($scope, $rootScope, $localstorage, XAF) {
        var messageShowError = function(error){
            console.error(error);
        }
        $scope.showError = function(){
            var opts = {
            	resourceName:'message_html',
                message:'error message', 
                cssClass:'msgfail', 
                elem:'divMsg',
                timeout:2,
                onError:messageShowError
            };
            //__xaf_core.showMessage(opts);
            XAF.showMessage(opts);
        }
        $scope.showWarn = function(){
            var opts = {
            	resourceName:'message_html',
                message:'warning message', 
                cssClass:'msgwarn', 
                elem:'divMsg',
                timeout:2,
                onError:messageShowError
            };
            //__xaf_core.showMessage(opts);
            XAF.showMessage(opts);
        }
        $scope.showSuccess = function(){
            var opts = {
            	resourceName:'message_html',
                message:'success message', 
                cssClass:'msgsuccess', 
                elem:'divMsg',
                timeout:2,
                onError:messageShowError
            };
            //__xaf_core.showMessage(opts);
            XAF.showMessage(opts);
        }
        $scope.showSpinner = function(){
            var opts = {
                height:"48px",
                width:"48px",
                timeout:2,
                expiredFunc:function(){console.log('expired func')}
            };
            //__xaf_core.showSpinner($('#spinnerTarget')[0], opts);
            XAF.showSpinner(opts, $('#spinnerTarget')[0]);
        }
        $scope.loadImageUrl = function(){
            if ($scope.showImgSuff == true) {
                $scope.showImgSuff = false;
                return;
            }
            $scope.showImgSuff = true;
            $scope.small = __xaf_resources.RTS_Small.url;
            // __xaf_core.applyImage('RTS_Small', '#divImg', function(error){
            //     console.warn(error);
            // })
    		XAF.applyImage('RTS_Small', '#divImg', function(error){
                console.warn(error);
            });
        }
        $scope.showModalBootStrap = function(){
            // __xaf_core.getResource('modal_html', function(done){
            //     $scope.title='some title';
            //     $scope.url = done;
            //     $(done).insertAfter("#divModalPlaceHolder");
            //     $('#divModal').modal('show');
            // }, messageShowError);
            XAF.showModalBootStrap('modal_html', '#divModalPlaceHolder', messageShowError);
        }
        $rootScope.ngModalCallback = function(result){
        	console.log('angular modal callback ', result);
        	$("#divModal").modal("hide");
        }
        $scope.showModalBootStrapUsingAngularScope = function(){
            XAF.showModalBootStrap('modalpopupwithangularcallbacks', '#divModalPlaceHolder', messageShowError);
        }
        $scope.makeServerCall = function(){
            var id = "-1";
            var Header = {};
            Header.Token = __xaf_core.getToken();
            var DTO = { Auth: Header, Request: "GetTemplatesByID", Parameters: {ID: id} };
            // __xaf_core.wsSend(DTO, function(done){
            //     console.log('done.header.result', done.header.result);
            //     console.log('done.content', done.content);
            // }, function(error){
            //     console.error('error', error);
            // })
            XAF.postToServer(DTO, function(done){
                console.log('done.header.result', done.header.result);
                console.log('done.content', done.content);
            }, function(error){
                console.error('error', error);
            });
        }
        $scope.model = {};
        $scope.submitForm = function(){
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.frm.$invalid) { return; }
        }
    });
}