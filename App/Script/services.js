if (typeof __xaf_app != "undefined") {
	var app = __xaf_app.app;
    app.factory('XAF', [function(){
        /*var opts = {
                resourceName:'message_html' must be in the resources.js file  **Required**
                message: The message do be displayed 
                cssClass: The css Class to apply to the message 'msgfail', 'msgsuccess', 'msgwarn' valid for this resouce
                elem:'divMsg' The DOM element you wish to append this AFTER **Required**
                timeout:2, The number of seconds the message must be visible for
                onError:a function to be called in the event that the framework was unable to show the message
            };
        */
        function showMessage(opts){
            __xaf_core.showMessage(opts);
        }
        /*var opts = { ** ALL optional
                height:"48px", The height of gthe spinned
                width:"48px", The width of the spinner
                timeout:2, The time to show the spinner before its hidden ** Default 60 seconds **
                expiredFunc:function(){console.log('expired func')},
                img: "data:image/gif;base64, a base64 representaion of the spinner.
            };
        */
        function showSpinner(opts, target){
            if (!target){
                target = $('#spinnerTarget')[0];
            }
            __xaf_core.showSpinner(target, opts);   
        }

        /*
        resouceName - name of the image in resources.js to load ** Required **
        elem - the name of the img tag to render into #myImg ** Required **
        error - a function to call in the event of the framework not being able to load and set the image
        */
        function applyImage(resouceName, elem, error){
            __xaf_core.applyImage(resouceName, elem,error);
        }

        /*
        resouceName - name of the image in resources.js to load ** Required **
        done - function to call with the resource content
        error - a function to call in the event of the framework not being able to load and set the image
        */
        function getResource(resourceName, done, error){
            __xaf_core.getResource(resourceName, function(data){
                done(data);
            }, error);
        }
        /*
        resouceName - name of the image in resources.js to load ** Required **
        elem - the name of the tag to render the modal into ** Required **
        error - a function to call in the event of the framework not being able to load and set the image
        */
        function showModalBootStrap(resourceName, elem, error){
            //__xaf_core.
            getResource(resourceName, function(done){
                $(done).insertAfter(elem);
                $('#divModal').modal('show');
            }, error);
        }

        function postToServer(DTO, done, error){
            __xaf_core.wsSend(DTO, done,error);
        }
        return{
            showMessage:showMessage,
            showSpinner:showSpinner,
            applyImage:applyImage,
            getResource:getResource,
            showModalBootStrap:showModalBootStrap,
            postToServer:postToServer
        };
    }])

    app.factory('$localstorage', ['$window', function($window) {
        return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        },
        remove:function(key){
          $window.localStorage.removeItem(key);
        }
        }
    }]);
}