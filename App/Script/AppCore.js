/*Application Core - 1.1 - 2014/11/04*/

/*
 Handles basic platform functions like inter-app messaging and webservice ajax calls
 */

/*
 ??TODO
 List of things still requiring work
 */

if (typeof __xaf_core == "undefined") {
    var __xaf_core = (function () {
        /*PUBLISHED FUNCTIONS AND VALUES*/
        var pub = {
            /*Attach an event handler listening for a specific event
             evType: the type of event e.g. load
             evHandle: function that will process the event*/
            addEventHandle: function(evType, evHandle){
                local.windowAddEvent(evType, evHandle);
            },
            /*Dispatch a message to the platform
             message: message content in CSV string or array format
             */
            messageSend: function(message){
                if((typeof message !=='undefined') && (message.constructor === Array)){
                    message = message.join();
                }
                parent.postMessage(message, parent.location.origin);
            },
            /*Function to handle messages from the platform or other apps
             The function will receive an array (messageContent) with the first value being the message type and the following values its parameters
             Recommended structure
             switch(messageContent[0]){
             case 'refresh'
             break;
             */
            addMessageHandle: function (messageHandle){
                local.messageProcess = messageHandle;
            },
            /*Retrieve the currently configured parameters*/
            getParameters: function(){
                return local.params;
            },
            getFrameID: function()
            {
                return local.iframeID;
            },
            getToken: function ()
            {
                return localStorage.getItem('Token');
            },
            /*Send AJAX request to Web Service */
            wsSend: function (DTO, pass, fail){
                local.procAjax(local.params.webServiceURL, 'POST', DTO, pass, fail);
            },
            mergeOptions: function(defOpts, options){
                options = options || {};
                // Iterate over each property of the paramObject
                for (var key in defOpts) {
                    // If the current property wasn't inherited, proceed
                    if (defOpts.hasOwnProperty(key)) {
                        // If the current property is defined in the defaults,
                        // Check if it exists in options
                        if ((typeof options[key] !== 'undefined') && (options[key] !== null)) {
                            defOpts[key] = options[key];
                        }
                    }
                }
                return defOpts;
            },
            /*shows a message based on the message.html template after a chosen htmlelement for a given time*/
            showMessage:function(opts){
                var defaults = {
                    resourceName:'message_html',
                    message:'default message', 
                    cssClass:'msgsuccess', 
                    elem:'divMsg',
                    timeout:2,
                    onError:function(error){console.error(error)}
                };
                defaults = pub.mergeOptions(defaults, opts);
                __xaf_core.getResource(defaults.resourceName, function(done){
                    done = done.replace('#message#', defaults.message);
                    done = done.replace('#class#', defaults.cssClass);
                    $(done).insertAfter("#"+defaults.elem);
                    setTimeout(function() {
                       $("#divMessage").hide();
                    },defaults.timeout*1000);
                }, function(error){
                    defaults.onError(error);
                })
            },
            /*Show a spinner
             * target = element to load spinner into
             * options = options object can be used to override the default spinner
             * */
            showSpinner:function(target, options){
                var defOpts={
                    height: "48px",
                    width: "48px",
                    img: "data:image/gif;base64,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",
                    timeout: 60,
                    expiredFunc: function(){}
                }
                options = options || {};
                // Iterate over each property of the paramObject
                for (var key in defOpts) {
                    // If the current property wasn't inherited, proceed
                    if (defOpts.hasOwnProperty(key)) {
                        // If the current property is defined in the defaults,
                        // Check if it exists in options
                        if ((typeof options[key] !== 'undefined') && (options[key] !== null)) {
                            defOpts[key] = options[key];
                        }
                    }
                }
                var overlayTimer = setTimeout(function(){defOpts.expiredFunc();pub.removeSpinner(target);}
                    ,(defOpts.timeout * 1000));
                var div = document.createElement('div');
                div.id = "__xaf_SpinOverlay";
                div.style.cssText = "background-color: rgba(200, 200, 200, 0.7); width:100%; height:100%; position:fixed; top:0px; left:0px; z-index:1999999999";
                div.innerHTML =  '<img src="' + defOpts.img + '" alt="LOADING..." height="' + defOpts.height + '" width="' + defOpts.width + '" style="position:absolute; top:0; left:0; right:0; bottom:0; margin:auto; z-index:2000000000"></img>';
                div.setAttribute("data-__xaf_timer", JSON.stringify(overlayTimer));
                target.appendChild(div);
            },
            /* Remove spinner
             * target = element that contains the spinne
             * */
            removeSpinner:function(target){
                var childArray = target.children;
                var i;
                for(i = 0; i < childArray.length; i++){
                    if(childArray[i].id === '__xaf_SpinOverlay'){
                        break;
                    }
                }
                if(i < childArray.length) {
                    var element = childArray[i];
                    var timer = JSON.parse(element.getAttribute('data-__xaf_timer'));
                    if ((typeof timer !== 'undefined') || (timer !== null)) {
                        clearTimeout(timer);
                    }
                    target.removeChild(element);
                }
            },
            /*Get a resource that is stored in the __xaf_resources object
             * resName = name of the resource as stored in the DB
             * passFunction = function to execute on pass receives one object with the resource content
             * failFunction = function to execute on fail
             * */
            getResource:function(resName, passFunction, failFunction){
                try {
                    local.procAjax(__xaf_resources[resName].url, 'GET', null, passFunction, failFunction);
                }
                catch(err){
                    failFunction(err);
                    //Error handling
                }
            },
            /*Get a resource that is stored in the __xaf_resources object and apply content to a <img> tag
             * resName = name of the resource as stored in the DB
             * target = <img> element to contain the image
             * */
            applyImage:function(resName,target, onError) {
                try {
                    local.setImageSrc(__xaf_resources[resName].url, target);
                    return true;
                }
                catch (err) {
                    if (onError) onError(err);
                    return false;
                }
            },
            getImageUrl:function(resName, onError){
                try {
                    return __xaf_resources[resName].url;
                }
                catch (err) {
                    if (onError) onError(err);
                    return null;
                }
            }
        };
        /*PRIVATE FUNCTIONS AND VALUES FOR INTERNAL USE ONLY*/
        var local = {
            /*Parameter settings*/
            params:{
                webServiceURL: "http://xastris.com:3000/api/services"
            },
            supportRes:{
            },
            iframeID: null,
            /* Place holder for the message processor should be replaced by application function if needed */
            messageProcess:function(){
            },
            /* function to handle an AJAX transaction
             url: The URL of the target webservice
             type: The transfer method i.e. "POST" or "GET"
             DTO: The Data Transfer Object. It must me formatted to meet the requirements of the called web service
             pass: Reference to a function that will be called on a successfull transfer. Receives a single data object
             fail: Reference to a function that will be called on a failure. Receives a single data object*/
            procAjax: function (url, type, DTO, pass, fail) {
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            if ((typeof DTO !== 'undefined') && (DTO !== null)) {
                                var responseContent = JSON.parse(xmlhttp.responseText);
                            }
                            else{
                                var responseContent = xmlhttp.responseText;
                            }
                            pass(responseContent);
                        }
                        else {
                            fail();
                        }
                    }
                }
                xmlhttp.open(type, url);
                if ((typeof DTO !== 'undefined') && (DTO !== null)) {
                    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xmlhttp.send(JSON.stringify(DTO));
                }
                else{
                    xmlhttp.send();
                }
            },
            /*Load an image from a file or as a server resource
             url = url of the resource
             target = element (<img>) to load the image into*/
            setImageSrc: function(url, target){
                try {
                    var type = target.substring(0, 1);
                    if ((type === '#') || (type === '.')) {
                        target = target.substring(1);
                    }
                    else {
                        type = '.';
                    }
                    switch (type) {
                        case '#':
                            var element = document.getElementById(target);
                            element.setAttribute('src', url);
                            break;
                        default :
                            var elements = document.getElementsByClassName(target);
                            var i;
                            for (i = 0; i < elements.length; i++) {
                                elements[i].setAttribute('src', url);
                            }
                            break;
                    }
                }
                catch(err){
                    //Add error handler
                }
            },
            /*Attach an event handler listening for a specific event
             evType: the type of event e.g. load
             evHandle: function that will process the event*/
            windowAddEvent: function (evType, evHandle) {
                switch(evType) {
                    //The "readyState" evType is a non standard event used to handle inconsistencies in iframe ready events
                    case 'readyState':
                        var stateCheck = setInterval(function(){
                            if(window.document.readyState === 'complete') {
                                clearInterval(stateCheck);
                                evHandle();
                            }
                        },50);
                        break;
                    default :
                        if((typeof window === 'undefined') || (window === null))
                        {
                            return;
                        }
                        if (window.addEventListener) {
                            window.addEventListener(evType, evHandle, false);
                        }
                        else if (window.attachEvent) {
                            window.attachEvent("on" + evType, evHandle);
                        }
                        else {
                            window["on" + type] = evHandle;
                        }
                        break;
                }
            },
            /*EVENT HANDLERS FOLLOW IN THE NEXT SECTION*/
            onProcMessages: function (message) {
                if (parent.location.origin === message.origin) {
                    if ((typeof message.data) == 'string') {
                        messageContent = message.data.split(',');
                    }
                    else{
                        messageContent = message.data;
                    }

                    var sourceFrame = messageContent[0];
                    var targetFrame = messageContent[1];
                    messageContent.splice(0,2);
                    if((targetFrame === 0) || (targetFrame === local.iframeID)) {
                        switch (messageContent[0]) {
                            case "UpdateConfig":
                                if(messageContent[1] !== null){
                                    local.params = JSON.parse(messageContent[1]);
                                }
                                break;
                            default:
                                local.messageProcess(messageContent);
                                break;
                        }
                    }
                }
            }
        };

        /*ALL CODE WHICH MUST EXECUTE IMMEDIATELY GOES IN THE FOLLOWING SECTION*/
        //Add window events

        //Add message handler except in the case of being used as platform resource
        if((typeof(window.frameElement) != 'undefined') && (window.frameElement != null)){
            local.windowAddEvent("message", local.onProcMessages);
            local.iframeID = window.frameElement.id;
            var configRequest = new Array();
            configRequest[0] = local.iframeID;
            configRequest[1] = -1;
            configRequest[2] = "GetConfig";
            pub.messageSend(configRequest);
        }

        return pub;
    })();
}
