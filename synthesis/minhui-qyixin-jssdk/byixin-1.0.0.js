/**
 * version = 1.0.0
 * 
 * 
 */
;
(function() {
    var u = navigator.userAgent;
    var isPC = window.navigator.userAgent.toLowerCase().indexOf("mobile") === -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    window.yxwork = {
        isPC: window.navigator.userAgent.toLowerCase().indexOf("mobile") === -1,
        isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        ready: function(callback) {
            if (callback) {
                readyFun = callback;
            }
        },
        error: function(callback) {
            if (callback) {
                errFun = callback;
            }
        }
    };
    var log = {
        isPanelShow: false,
        init: function(){
            var panel = document.createElement('div'),
                logBtn = document.createElement('div'),
                clearBtn = document.createElement('div');

            logBtn.style.cssText = 'position: fixed;right: 10px;bottom: 10px;width: 80px;height: 40px;line-height: 40px;background: #000;color: #fff;text-align: center;cursor:pointer;z-index:1000000;';
            logBtn.id = 'yx-log-btn';
            logBtn.innerHTML = 'Log';
            logBtn.addEventListener('click',function(){
                if (log.isPanelShow) {
                    panel.style.display = 'none';
                    clearBtn.style.display = 'none';
                    logBtn.innerHTML = 'Log';
                }
                else {
                    panel.style.display = 'block';
                    clearBtn.style.display = 'block';
                    logBtn.innerHTML = 'Close';
                }
                log.isPanelShow = !log.isPanelShow;
            },false);
            clearBtn.style.cssText = 'display:none;position: fixed;left: 10px;bottom: 10px;width: 80px;height: 40px;line-height: 40px;background: #000;color: #fff;text-align: center;cursor:pointer;z-index:1000000;';
            clearBtn.innerHTML = 'Clear';
            clearBtn.addEventListener('click',function(){
                panel.innerHTML = '';
            },false);
            panel.style.cssText = 'display:none;position: fixed;left: 0;bottom: 0;width: 100%;height:40%; background: #fff;border-top: 1px solid #aaa;overflow-y: auto;z-index:999999;';
            panel.id = 'yx-log-panel';
            document.body.appendChild(logBtn);
            document.body.appendChild(clearBtn);
            document.body.appendChild(panel);
        },
        console: function(res,name){
            var _res = deepCopy(res);
            if (name === 'pickImage') {
                var list = _res.data;
                for (var i = 0, len = list.length; i < len; i++) {
                    list[i].data = list[i].data.substring(0,50)+'...';
                };
            }
            var panleElem = document.getElementById('yx-log-panel');
            var item = document.createElement('div');
            item.style.cssText = 'padding: 0 4px;line-height: 24px;border-bottom: 1px solid #ddd;word-break:break-all;';
            item.innerHTML = '<span style="color:blue;">'+name+'</span>' + ':' + JSON.stringify(_res);
            panleElem.appendChild(item);
        }
    };
    var jssdkVersion = {
        iOS: 108,
        aos: 4,
        pc: 4
    };
    var minVersion;
    if (isiOS) {
        minVersion = jssdkVersion.iOS;
    }
    else if (isAndroid) {
        minVersion = jssdkVersion.aos;
    }
    else if (isPC){
        minVersion = jssdkVersion.pc;
    }
    else {
        minVersion = -Infinity;
    }
    var timestamp = 201607141346;
    // var jssdkReady = true;
    var readyFun;
    var errFun;
    var isDebug = false;
    var webviewReady = false;
    var isOptionMenuHide = false;
    var isReadyFunCalled = false;
    var isInited = false;
    var menuBtns = [1,2,3,4,5,6];
    var errMsg = {
        '402': '参数错误',
        '403': '无接口调用权限',
        '404': '要访问的接口不存在',
        '405': '无硬件访问权限',
        '400': '接口调用错误'
    };

    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    // 生成随机数
    var getRandom = function() {
        return Math.random().toString().split('.')[1];
    };

    var deepCopy = function(source) {
        var type = (typeof source === 'object' && isArray(source)) ? 2 : 1;
        var result = type === 1 ? {} : [];
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
        }
        return result;
    };


    // 数组去重
    Array.prototype.yxUnique= function() {
        var res = [],
            hash = {};
        for (var i = 0, elem;
            (elem = this[i]) != null; i++) {
            if (!hash[elem]) {
                res.push(elem);
                hash[elem] = true;
            }
        }
        return res;
    };

    /* 
     * 对象扩展
     * @param {Object} target 目标对象。 
     * @param {Object} source 源对象。 
     * @param {boolean} deep 是否复制(继承)对象中的对象。 
     * @returns {Object} 返回继承了source对象属性的新对象。 
     */
    Object.extend = function(target, /*optional*/ source, /*optional*/ deep) {
        target = target || {};
        var sType = typeof source,
            i = 1,
            options;
        if (sType === 'undefined' || sType === 'boolean') {
            deep = sType === 'boolean' ? source : false;
            source = target;
            target = this;
        }
        if (typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]')
            source = {};
        while (i <= 2) {
            options = i === 1 ? target : source;
            if (options != null) {
                for (var name in options) {
                    var src = target[name],
                        copy = options[name];
                    if (target === copy)
                        continue;
                    if (deep && copy && typeof copy === 'object' && !copy.nodeType)
                        target[name] = this.extend(src ||
                            (copy.length != null ? [] : {}), copy, deep);
                    else if (copy !== undefined)
                        target[name] = copy;
                }
            }
            i++;
        }
        return target;
    };

    // arr数组中，若某个元素的key值等于传入的value，那么返回该元素在arr数组中的位置
    var getIndex = function(arr, key, value) {
        var index = 0,
            len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i][key].toString() === value.toString()) {
                index = i;
                break;
            }
        };
        return index;
    };

/*-------------pc处理开始(可以放到另外一个js里)--------------------*/
    // 回调函数存放的地方
    window.loader = {};
    // 模拟PC处理函数
    // window.dealer = {
    //     init: function(data){
    //         return {code:403,call_flag:data.call_flag,data:{state:2}};
    //     },
    //     setTitle: function(data){
    //         return {code:200,call_flag:data.call_flag,data:{id:data.data.title}};
    //     },
    //     dropdownMenu: function(data){
    //         console.dir(data.data.items);
    //         return {
    //             code: 200,
    //             call_flag: data.call_flag,
    //             data: data.data.items[data.data.defaultValue]
    //         };
    //     },
    //     selectMember: function(data){
    //         return {
    //             code: 200,
    //             call_flag:data.call_flag,
    //             data: [{openid:1,name:'hehe',email:'dd@dd.cc',headImg:'https://nos.netease.com/nim/MTAzODg1MQ==/bmltd18wXzE0NjU3MTY0MDEyODJfNjdmOTYxYjctYTk4Ni00M2UzLTg3YWQtZDk4NDE1MTAwMzAy'},{openid:2,name:'tom',email:'aaad@dd.aa',headImg:'https://nos.netease.com/nim/MTAzODg1MQ==/bmltd18wXzE0NjU3MTY0NDIwMThfMDgxMDc1MDQtZDlkZC00YzE3LWI5ZTEtNmExYmM3NmQyNDZl'}]
    //         };
    //     },
    //     setMoreButtons: function(data){
    //         return {
    //             code: 200,
    //             call_flag: data.call_flag,
    //             data: data.data.btns
    //         }
    //     },
    //     confirm: function(data) {
    //         return {
    //             code:200,
    //             call_flag:data.call_flag,
    //             data: 1
    //         }
    //     },
    //     actionsheet: function(data) {
    //         return {
    //             code:200,
    //             call_flag:data.call_flag,
    //             data: {value:1,name:'按钮1'}
    //         }
    //     },
    //     captureBackAction: function(data){
    //         return {
    //             code: 200,
    //             call_flag:data.call_flag,
    //             data: {}
    //         };
    //     },
    //     previewImage: function(data) {
    //         return {
    //             code: 200,
    //             call_flag:data.call_flag,
    //             data: {urls:data.data.urls}
    //         };
    //     },
    //     uploadImage: function(data){
    //         return {
    //             code: 200,
    //             call_flag:data.call_flag,
    //             data: [{id:data.data.ids[0],url:''}]
    //         };
    //     },
    //     pickImage: function(data) {
    //         return {
    //             'code': 200,
    //             'call_flag':data.call_flag,
    //             'data': [{
    //                 'id': getRandom(),
    //                 'mime':'data:image/png;',
    //                 'data': 'base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAYAAADiI6WIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNGY3OGFhMS03M2FiLTAyNDktYTIzOS05ZjAzODExZWFlZmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzNENDNBRUM3ODgyMTFFNTlDRTZBOUZEQTY3QjIwNzkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzNENDNBRUI3ODgyMTFFNTlDRTZBOUZEQTY3QjIwNzkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkVFOTYxNjY4Mjc4RTUxMTg1N0JCMzY1OTg1RTQ2NDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZjRmNzhhYTEtNzNhYi0wMjQ5LWEyMzktOWYwMzgxMWVhZWZlIi8+IDwvcmRmOkRl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'
    //             }]
    //         };
    //     }
    // };

    window.funCallJavaScript = function(data) {
        var res = JSON.parse(data.replace(/\\/g,'\\\\'));
        if (loader[res.call_flag] && (typeof loader[res.call_flag] === 'function')) {
            loader[res.call_flag].call(null, res);
            // delete loader[res.call_flag];
        }
    };

    // 调用回调
    var allocator = function(res) {
        // setTimeout(function() {
            if (loader[res.call_flag] && (typeof loader[res.call_flag] === 'function')) {
                loader[res.call_flag].call(null, res);
                // delete loader[res.call_flag];
            }
        // }, 1000);
    };

    // 调用接口
    var doCall = function(params) {
        // if (dealer[params.fun_id]) {
        //     var res = dealer[params.fun_id]({
        //         call_flag: params.call_flag,
        //         data: params.params
        //     });
        // }
        // else {
        //     var res = {
        //         code: 200,
        //         call_flag:params.call_flag,
        //         data: {}
        //     };
        // }
        // allocator(res);
        FunExternal(JSON.stringify(params));
    };

    // 存放回调
    var registrar = function(params,callback) {
        if (!loader[params.call_flag]) {
            loader[params.call_flag] = callback;
        }
        doCall(params);
    };

    var pcPolyfill = function(){
        window.loader = {};
        window.FNJSBridge = {};
        FNJSBridge = {
            call: function(name,option,callback) {
                var request = {
                    call_flag: getRandom(),
                    fun_id: name,
                    params: option
                };
                registrar(request,callback);
            }
        };
    };
/*-------------pc处理结束--------------------*/


    // 返回结果处理
    var doResponse = function(res,option,name) {
        if (isDebug) {
            log.console(res,name);
        }
        var callbacks = {
            success_cb: (option.success && (typeof option.success === 'function' )) ? option.success : null,
            error_cb: (option.error && (typeof option.error === 'function' )) ? option.error : null,
            cancel_cb: (option.cancel && (typeof option.cancel === 'function' )) ? option.cancel : null,
            complete_cb: (option.complete && (typeof option.complete === 'function' )) ? option.complete : null
        };
        if (res.code === 200) {
            if (name === 'confirm') {
                if (res.data === 1) {
                    callbacks['success_cb'] && callbacks['success_cb'].call(null, res.data);
                }
                else if (res.data === 2) {
                    callbacks['cancel_cb'] && callbacks['cancel_cb'].call(null, res.data);
                }
            }
            else if (name === 'actionsheet') {
                if (res.data) {
                    callbacks['success_cb'] && callbacks['success_cb'].call(null, res.data);
                }
                else {
                    callbacks['cancel_cb'] && callbacks['cancel_cb'].call(null, res.data);
                }
            }
            else {
                callbacks['success_cb'] && callbacks['success_cb'].call(null, res.data);
            }
        } else {
            var _errData = deepCopy(res.data);
            _errData.code = res.code;
            _errData.msg = res.msg||errMsg[res.code]||'接口调用错误';
            callbacks['error_cb'] && callbacks['error_cb'].call(null, _errData);
        }
        if (callbacks['complete_cb']) {
            var _data = deepCopy(res.data);
            _data.code = res.code;
            callbacks['complete_cb'] && callbacks['complete_cb'].call(null, _data);
        }
    };

    
    // 调用jssdk接口
    var callJsBridge = function(name,request,option){
        if (!isPC) {
            console.log(timestamp);
        }
        // if (name === 'init'|| name==='getUserAgentInfo' || jssdkReady) {
            try {
                FNJSBridge.call(name, request, function(res) {
                    doResponse(res,option||{},name);
                });
            } catch (e) {
                alert(e.message);
            }
        // }
        // else {
            // alert('未进行权限验证或验证失败');
        // }
    };

    var verify = function(option) {
        var option = option||{};
        if (!isInited) {
            isInited = true;
            isDebug = !!option.debug;
            if (isDebug) {
                log.init();
            }
            callJsBridge('init', option, {
                complete: function(res) {
                    window.alert = function(msg) {
                        yxwork.alert({
                            message: msg
                        });
                    };
                    // 升级判断
                    callJsBridge('getUserAgentInfo', {}, {
                        success: function(res) {
                            var sdkVersion = Number(res.sdkVersion||0);
                            if (minVersion > sdkVersion && !option.isUpdate) {
                                if (isPC) {
                                    yxwork.alert({
                                        message:'使用该应用需升级企业易信，请退出程序后重新打开，程序将会自动升级'
                                    });
                                }
                                else {
                                    location.assign('https://qiye.yixin.im/clientUpdate?title='+encodeURIComponent(document.title));
                                }
                            }
                        }
                    });

                    //res.state=1:验证成功，state=2:验证失败（无私有接口权限）
                    // setTimeout(function() {
                        if (res.code === 200 && res.state === 1) {
                            // jssdkReady = true;
                            if (readyFun && (typeof readyFun === 'function') && !isReadyFunCalled) {
                                readyFun.call(null);
                                isReadyFunCalled = true;
                            }
                        } else {
                            if (errFun && (typeof errFun === 'function')) {
                                errFun(res);
                            } else {
                                var errMsg = '';
                                //400-失败,404-该接口不存在（可能因客户端版本低），403-没有权限
                                if (res.code === 404) {
                                    errMsg = '该接口不存在';
                                } else if (res.code === 403) {
                                    errMsg = '没有权限';
                                } else {
                                    errMsg = '验证失败';
                                }
                                alert(errMsg);
                            }
                        }
                    // }, 100);
                }
            });
        }
    };

    var packageyxwork = function(){
        var obj = {
            test: function(name,option,callback){
                callJsBridge(name,option,callback);
            },
            init: function(option){
                if (isPC) {
                    verify(option);
                } else {
                    if (webviewReady) {
                        verify(option);
                    }
                    else {
                        document.addEventListener('FNJSBridgeReady', function() {
                            verify(option);
                        });
                    }
                }
            },
            setTitle: function(option){
                var title = String(option.title||'').trim();
                if (title === '') {
                    return;
                }
                callJsBridge('setTitle',{
                    title: title
                },option);
            },
            setGestureBack: function(option){
                callJsBridge('setGestureBack',{
                    disabled: option.disabled || false //默认false，允许手势返回;不设置此方法，webview默认也是允许手势返回
                },option);
            },
            selectMember: function(option){
                var option = deepCopy(option);
                var selIds = option.selectedIds || [];
                var title = String(option.title||'').trim();
                var btext = String(option.btnText||'').trim();
                if (!option.multiple) {
                    selIds = [];
                }
                if (isArray(selIds)) {
                    selIds = selIds.yxUnique();
                    var maximum;
                    if (!option.maximum) {
                        maximum = -1;
                    } else {
                        maximum = Number(option.maximum);
                        if (isNaN(maximum)) {
                            return;
                        } else if (maximum < -1) {
                            return;
                        } else if (maximum === -1) {
                            maximum = -1;
                        } else if (maximum === 0) {
                            maximum = 0;
                        } else if (maximum < selIds.length) {
                            return;
                        }
                    }

                    callJsBridge('selectMember', {
                        title: title || '选择联系人', //选择器标题，pc端需要的参数
                        btext: btext || '确定', //选择器按钮文本，pc端需要的参数
                        selType: option.multiple ? 1 : 0, //默认0，选择单人
                        maximum: maximum, //可选择人数的上限，默认0，不限制人数
                        selectedIds: selIds //已选人员openid
                    }, option);
                }
            },
            pickImage: function(option) {
                var sourceType = 3;
                var count = Number(option.count||9);
                if (isNaN(count) || count <= 0 || count > 9) {
                    count = 9;
                }
                var imgIds = option.ids || [];
                if (isArray(imgIds)) {
                    if (imgIds.length >= count) {
                        return;
                    }
                    imgIds = imgIds.yxUnique();
                    if (isArray(option.sourceType) && option.sourceType.length > 0) {
                        sourceType = 0;
                        for (var i = 0, len = option.sourceType.length; i < len; i++) {
                            if (option.sourceType[i] === 'album') {
                                sourceType += 1;
                            } else if (option.sourceType[i] === 'camera') {
                                sourceType += 2;
                            } else if (option.sourceType[i] === 'wangpan') {
                                sourceType += 4;
                            }
                        };
                    }
                    callJsBridge('pickImage', {
                        ids: imgIds, //已选图片id
                        count: count, // 默认9，选择的图片数
                        sourceType: sourceType || 3, // 可以指定来源是相册还是相机
                        size: option.size //需要传此参数用于压缩，否则返回base64会很大
                    }, option);
                }
            },
            uploadImage: function(option) {
                var imgIds = option.ids || [];
                if (isArray(imgIds)) {
                    imgIds = imgIds.yxUnique();
                    callJsBridge('uploadImage', {
                        ids: imgIds //上传图片id，pickImage的时候由接口返回
                    }, option);
                }
            },
            previewImage: function(option) {
                callJsBridge('previewImage',{
                    values: option.values,
                    index: option.index || 0 //默认显示第几张
                },option);
            },
            previewOnlineImage: function(option) {
                callJsBridge('previewImage',{
                    type: 1,
                    values: option.urls,
                    index: option.index || 0 //默认显示第几张
                },option);
            },
            previewLocalImage: function(option) {
                callJsBridge('previewImage',{
                    type: 2,
                    values: option.ids,
                    index: option.index || 0 //默认显示第几张
                },option);
            },
            captureBackAction: function(callback) {
                callJsBridge('captureBackAction',{},{complete:callback});
            },
            clearBackActionCapture: function(callback) {
                callJsBridge('clearBackActionCapture',{},{complete:callback});
            },
            setOptionButtons: function(option) {
                var btns = deepCopy(option.btns)||[],
                    reg = /^[\u4e00-\u9fa5]+$/,
                    btnTextLength = 2;
                var limit = option.hideMore === false ? 1 : 2;
                btns = btns.slice(0,limit);
                var len = btns.length;
                if (option.hideMore !== false && len === 1) {
                    btnTextLength = 4;
                }
                if (btns.length !== 0) {
                    for (var i = 0; i < len; i++) {
                        btns[i].name = String(btns[i].name || '').replace(/\s+/g, '');
                        if (btns[i].name === '' || !reg.test(btns[i].name)) {
                            return;
                        }
                        btns[i].name = btns[i].name.substring(0, btnTextLength);
                    };
                }
                if (option.hideMore !== false) {
                    yxwork.hideOptionMenu();
                }
                else {
                    if (menuBtns.length > 0) {
                        callJsBridge('setMoreButtons', {
                            btns: menuBtns
                        }, {
                            success: function(res) {
                                isOptionMenuHide = false;
                            }
                        });
                    }
                }
                callJsBridge('setOptionButtons',{
                    btns: btns
                },option);
            },
            // 先保留
            // setMoreButtons: function(option) {
            //     callJsBridge('setMoreButtons',{
            //         btns: option.btns
            //     },option);
            // },
            hideOptionMenuItems: function(option) {
                var menuItem = {
                    'shareColleague': 1,
                    'shareWorkCircle': 2,
                    'openWithBrowser': 3,
                    'copyUrl': 4,
                    'setFont': 5,
                    'refresh': 6
                };
                var arr = [];
                if (option.btns && option.btns.length > 0) {
                    for (var i = 0, len = option.btns.length; i < len; i++) {
                        if (menuItem[option.btns[i]]) {
                            delete menuItem[option.btns[i]]
                        }
                    };
                    for (var key in menuItem) {
                        arr.push(menuItem[key]);
                    }
                    menuBtns = arr;
                }
                else {
                    menuBtns = [1,2,3,4,5,6];
                }
                if (!isOptionMenuHide) {
                    callJsBridge('setMoreButtons', {
                        btns: menuBtns
                    });
                }
            },
            hideOptionMenu: function() {
                callJsBridge('setMoreButtons',{
                    btns: []
                },{
                    success: function(res){
                        isOptionMenuHide = true;
                    }
                });
            },
            closeWebView: function(){
                callJsBridge('closeWebView',{});
            },
            getUserAgentInfo: function(option){
                callJsBridge('getUserAgentInfo',{},option);
            },
            openUserCard: function(option){
                callJsBridge('userCard',{
                    openid: option.openid
                });
            },
            openChat: function(option){
                callJsBridge('openChat',{
                    openid: option.openid
                });
            },
            getClientInfo: function(option){
                callJsBridge('getClientInfo',{
                    openid: option.openid
                },option);
            },
            getLocation: function(option) {
                callJsBridge('getLocation',{},option);
            },
            download: function(option) {
                callJsBridge('download', {
                    url: option.url, // 需要下载的文件的服务器端地址
                    isShowProgressTips: option.isShowProgressTips === 0 ? 0 : 1 , // 默认为1，显示进度提示
                    name: option.name || '', //文件下载之后的名称
                    suffix: option.suffix || '' //文件下载之后的后缀名
                },option);
            },
            getNetworkType: function(option) {
                callJsBridge('getNetworkType',{}, option);
            },
            scanQRCode: function(callback) {
                callJsBridge('scanQRCode',{}, callback);
            },
            alert: function(option) {
                var title = String(option.title||'').trim(),
                    message = String(option.message||'').trim(),
                    btnName = String(option.buttonName||'').trim();
                if (title === '' && message === '') {
                    return;
                }
                callJsBridge('alert',{
                    title: title, //标题
                    message: message, //提示内容
                    buttonName: (btnName||'知道了').substring(0,5) //按钮名称，默认为“知道了”
                });
            },
            confirm: function(option) {
                var title = String(option.title||'').trim(),
                    message = String(option.message||'').trim(),
                    confirmName = String(option.confirmName||'').trim(),
                    cancelName = String(option.cancelName||'').trim();
                if (title === '' && message === '') {
                    return;
                }
                callJsBridge('confirm',{
                    title: title, //标题
                    message: message, //提示内容
                    confirmName: (confirmName||'确定').substring(0,5), //确定按钮名称，默认为“确定”
                    cancelName: (cancelName||'取消').substring(0,5) //取消按钮名称，默认为“取消”
                },{
                    success: option.success,
                    cancel: option.cancel
                });
            },
            toast: function(option) {
                callJsBridge('toast', {
                    message: String(option.message||'').trim()
                });
            },
            actionsheet: function(option) {
                var option = deepCopy(option);
                if (!option.items || option.items.length === 0) {
                    return;
                }
                for (var i = 0, len = option.items.length; i < len; i++) {
                    var name = option.items[i].name;
                    if (!name) {
                        return;
                    }
                    option.items[i].name = String(name||'').trim();
                };
                callJsBridge('actionsheet', {
                    title: String(option.title||'').trim(),
                    btnName: '取消',
                    items: option.items.slice(0, 6)
                }, option);
            },
            datepicker: function(option) {
                callJsBridge('datepicker',{
                    init: option.init || (new Date()).getTime(), //默认显示时间 
                    format: option.format||'yyyy-MM-dd' //选中之后显示格式:yyyy-MM-dd
                },option);
            },
            timepicker: function(option) {
                callJsBridge('timepicker',{
                    init: option.init || (new Date()).getTime(), //默认显示时间 
                    format: option.format||'hh:mm' //选中之后显示格式: hh:mm
                },option);
            },
            datetimepicker: function(option) {
                callJsBridge('datetimepicker',{
                    init: option.init || (new Date()).getTime(), //默认显示时间 
                    format: option.format||'yyyy-MM-dd hh:mm' //选中之后显示格式: hh:mm
                },option);
            },
            dropdownMenu: function(option) {
                var option = deepCopy(option);
                if (!option.items || option.items.length === 0) {
                    return;
                }
                for (var i = 0, len = option.items.length; i < len; i++) {
                    var name = option.items[i].name;
                    if (!name) {
                        return;
                    }
                    option.items[i].name = String(name || '').trim();
                };
                callJsBridge('dropdownMenu',{
                    title: String(option.title||'').trim(), //安卓端native展现需要的标题名称
                    items: option.items, //下拉选择各选项名称和值
                    defaultValue: getIndex(option.items,'value',option.defaultValue)
                },option);
            },
            openUrl: function(option) {
                callJsBridge('openUrl',{
                    system: option.system || 0, //默认0，内嵌浏览器打开；1，系统浏览器打开
                    url: option.url //需要PC端打开的链接
                });
            },
            copyText: function(option) {
                callJsBridge('copyToClipboard',{
                    type: 1,
                    content: option.text
                },option);
            },
            update: function(callback) {
            	if(yxwork.isiOS){
            		window.location.href="itms-apps://itunes.apple.com/us/app/qi-ye-yi-xin/id1121538629?l=zh&ls=1&mt=8";
            	}else{
            		callJsBridge('update',{},{complete:callback});
            	}
            },
            downPackage: function(callback) {
            	if(this.isiOS){
            		window.location.href="itms-apps://itunes.apple.com/us/app/qi-ye-yi-xin/id1121538629?l=zh&ls=1&mt=8";
            	}else{
            		callJsBridge('downPackage',{},{complete:callback});
            	}
            }
        };
        yxwork = Object.extend(yxwork,obj);
    };

    if (isPC) {
        // var element = document.createElement('script');
        // element.setAttribute('src', "../src/byixin-PC.js");
        // document.getElementsByTagName("body")[0].appendChild(element);
        // element.onload = function(){
        pcPolyfill();
        packageyxwork();
        // }
    }
    else {
        packageyxwork();
        document.addEventListener('FNJSBridgeReady', function() {
            webviewReady = true;
        });
    }
})();

