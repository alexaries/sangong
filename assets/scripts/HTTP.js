var URL = "http://103.60.166.3:9020";
// var URL = "http://192.168.1.107:9020";
// var URL = "http://192.168.1.185:9020";
// var URL = "http://127.0.0.1:9000";

var serverUrl = "http://sangong.diandg.com";
// var appUrl = "http://sangong.diandg.com/game";
// var serverUrl = "http://192.168.1.107";
var appUrl = "http://sangong.diandg.com/game";

var HTTP = cc.Class({
    extends: cc.Component,

    statics:{
        sessionId : 0,
        userId : 0,
        master_url:URL,
        url:URL,
        serverUrl:serverUrl,
        appUrl:appUrl,
        wxAppId:'wx250293b64cbb120d',
        sendRequest : function(path,data,handler,extraUrl){
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for(var k in data){
                if(str != "?"){
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if(extraUrl == null){
                extraUrl = HTTP.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            xhr.open("GET",requestURL, true);
            if (cc.sys.isNative){
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                    console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if(handler !== null){
                            handler(ret);
                        }                        /* code */
                    } catch (e) {
                        console.log("err:" + e);
                        //handler(null);
                    }
                    finally{
                        if(cc.vv && cc.vv.wc){
                        //       cc.vv.wc.hide();    
                        }
                    }
                }
            };
            
            if(cc.vv && cc.vv.wc){
                //cc.vv.wc.show();
            }
            xhr.send();
            return xhr;
        },
        postRequest : function(path,data,handler,extraUrl){
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            if(extraUrl == null){
                extraUrl = HTTP.serverUrl;
            }
            var requestURL = extraUrl + path;
            console.log("PostRequestURL:" + requestURL);
            xhr.open("POST",requestURL, true);
            if (cc.sys.isNative){
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
            //post方式提交需要增加的代码
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                    console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                    var err = null;
                    var ret = null;
                    try {
                        ret = JSON.parse(xhr.responseText);
                    } catch (e) {
                        console.log("err:" + e);
                        err = e;
                    }

                    if(handler !== null){
                        handler(err,ret);
                    }
                }
            };
            var dataStr = '';
            for (var k in data) {
                dataStr+=('&'+k+'='+data[k]);
            }
            dataStr=dataStr.substring(1);
            xhr.send(dataStr);
            return xhr;
        }
    },
});