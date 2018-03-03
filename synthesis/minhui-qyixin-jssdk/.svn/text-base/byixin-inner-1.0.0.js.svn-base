/**
 * jssdk
 * version = 1.0.0
 * author <zhouminhui@yixin.im>
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
                window.readyFun = callback;
            }
        },
        error: function(callback) {
            if (callback) {
                window.errFun = callback;
            }
        }
    };
    var log = {
        isPanelShow: false,
        init: function() {
            var panel = document.createElement('div'),
                logBtn = document.createElement('div'),
                clearBtn = document.createElement('div');

            logBtn.style.cssText = 'position: fixed;right: 10px;bottom: 10px;width: 80px;height: 40px;line-height: 40px;background: #000;color: #fff;text-align: center;cursor:pointer;z-index:1000000;';
            logBtn.id = 'yx-log-btn';
            logBtn.innerHTML = 'Log';
            logBtn.addEventListener('click', function() {
                if (log.isPanelShow) {
                    panel.style.display = 'none';
                    clearBtn.style.display = 'none';
                    logBtn.innerHTML = 'Log';
                } else {
                    panel.style.display = 'block';
                    clearBtn.style.display = 'block';
                    logBtn.innerHTML = 'Close';
                }
                log.isPanelShow = !log.isPanelShow;
            }, false);
            clearBtn.style.cssText = 'display:none;position: fixed;left: 10px;bottom: 10px;width: 80px;height: 40px;line-height: 40px;background: #000;color: #fff;text-align: center;cursor:pointer;z-index:1000000;';
            clearBtn.innerHTML = 'Clear';
            clearBtn.addEventListener('click', function() {
                panel.innerHTML = '';
            }, false);
            panel.style.cssText = 'display:none;position: fixed;left: 0;bottom: 0;width: 100%;height:40%; background: #fff;border-top: 1px solid #aaa;overflow-y: auto;z-index:999999;';
            panel.id = 'yx-log-panel';
            document.body.appendChild(logBtn);
            document.body.appendChild(clearBtn);
            document.body.appendChild(panel);
        },
        print: function(res, name) {
            if (!window.isDebug) {
                return;
            }
            var _res = typeof(res) === 'object' ? deepCopy(res) : res;
            if (name === 'pickImage') {
                var list = _res.data;
                for (var i = 0, len = list.length; i < len; i++) {
                    list[i].data = list[i].data.substring(0, 50) + '...';
                };
            }
            var _resLog = typeof(res) === 'object' ? JSON.stringify(_res) : res;
            var panelElem = document.getElementById('yx-log-panel');
            var item = document.createElement('div');
            item.style.cssText = 'padding: 0 4px;line-height: 24px;border-bottom: 1px solid #ddd;word-break:break-all;';
            if (name) {
                item.innerHTML = '<span style="color:blue;">' + name + '</span>' + ':' + _resLog;
            } else {
                item.innerHTML = _resLog;
            }
            panelElem.appendChild(item);
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
    } else if (isAndroid) {
        minVersion = jssdkVersion.aos;
    } else if (isPC) {
        minVersion = jssdkVersion.pc;
    } else {
        minVersion = -Infinity;
    }
    var curVer = 'jssdk v1.1.2';
    // var jssdkReady = true;
    // var readyFun;
    // var errFun;
    window.isDebug = false;
    var webviewReady = false;
    var isOptionMenuHide = false;
    var isReadyFunCalled = false;
    var isInited = false;
    var menuBtns = [1, 2, 3, 4, 5, 6];
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
    Array.prototype.yxUnique = function() {
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

    /*-------------pc处理开始--------------------*/
    // 回调函数存放的地方
    window.loader = {};

    // PC调用回调
    window.funCallJavaScript = function(data) {
        // var res = JSON.parse(data.replace(/\\/g, '\\\\'));
        var res = JSON.parse(data);
        if (loader[res.call_flag] && (typeof loader[res.call_flag] === 'function')) {
            loader[res.call_flag].call(null, res);
            // delete loader[res.call_flag];
        }
    };

    // 调用回调
    var allocator = function(res) {
        if (loader[res.call_flag] && (typeof loader[res.call_flag] === 'function')) {
            loader[res.call_flag].call(null, res);
            // delete loader[res.call_flag];
        }
    };

    // 调用接口
    var doCall = function(params) {
        FunExternal(JSON.stringify(params));
    };

    // 存放回调
    var registrar = function(params, callback) {
        if (!loader[params.call_flag]) {
            loader[params.call_flag] = callback;
        }
        doCall(params);
    };

    var pcPolyfill = function() {
        window.loader = {};
        window.FNJSBridge = {};
        FNJSBridge = {
            call: function(name, option, callback) {
                var request = {
                    call_flag: getRandom(),
                    fun_id: name,
                    params: option
                };
                registrar(request, callback);
            }
        };
    };
    /*-------------pc处理结束--------------------*/


    // 返回结果处理
    var doResponse = function(res, option, name) {
        if (window.isDebug) {
            log.print(res, name);
        }
        var callbacks = {
            success_cb: (option.success && (typeof option.success === 'function')) ? option.success : null,
            error_cb: (option.error && (typeof option.error === 'function')) ? option.error : null,
            cancel_cb: (option.cancel && (typeof option.cancel === 'function')) ? option.cancel : null,
            complete_cb: (option.complete && (typeof option.complete === 'function')) ? option.complete : null
        };
        if (res.code === 200) {
            if (name === 'confirm') {
                if (res.data === 1) {
                    callbacks['success_cb'] && callbacks['success_cb'].call(null, res.data);
                } else if (res.data === 2) {
                    callbacks['cancel_cb'] && callbacks['cancel_cb'].call(null, res.data);
                }
            } else if (name === 'actionsheet') {
                if (res.data) {
                    callbacks['success_cb'] && callbacks['success_cb'].call(null, res.data);
                } else {
                    callbacks['cancel_cb'] && callbacks['cancel_cb'].call(null, res.data);
                }
            } else {
                callbacks['success_cb'] && callbacks['success_cb'].call(null, res.data);
            }
        } else {
            var _errData = deepCopy(res.data);
            _errData.code = res.code;
            _errData.msg = res.msg || errMsg[res.code] || '接口调用错误';
            callbacks['error_cb'] && callbacks['error_cb'].call(null, _errData);
        }
        if (callbacks['complete_cb']) {
            var _data = deepCopy(res.data);
            _data.code = res.code;
            callbacks['complete_cb'] && callbacks['complete_cb'].call(null, _data);
        }
    };


    // 调用jssdk接口
    var callJsBridge = function(name, request, option) {
        if (!isPC) {
            console.log(curVer);
        }
        try {
            FNJSBridge.call(name, request, function(res) {
                doResponse(res, option || {}, name);
            });
        } catch (e) {
            // alert(e.message);
        }
    };

    var verify = function(option) {
        var option = option || {};
        if (!isInited) {
            isInited = true;
            window.isDebug = !!option.debug;
            if (window.isDebug) {
                log.init();
            }
            callJsBridge('init', option, {
                complete: function(res) {
                    // 升级判断
                    callJsBridge('getUserAgentInfo', {}, {
                        success: function(res) {
                            var sdkVersion = Number(res.sdkVersion || 0);
                            if (minVersion > sdkVersion && !option.isUpdate) {
                                if (isPC) {
                                    yxwork.alert({
                                        message: '使用该应用需升级企业易信，请退出程序后重新打开，程序将会自动升级'
                                    });
                                } else {
                                    location.assign('https://qiye.yixin.im/clientUpdate?title=' + encodeURIComponent(document.title));
                                }
                            }
                        }
                    });
                    //res.state=1:验证成功，state=2:验证失败（无私有接口权限）
                    if (res.code === 200 && res.state === 1) {
                        window.alert = function(msg) {
                            yxwork.alert({
                                message: msg
                            });
                        };
                        // jssdkReady = true;
                        if (window.readyFun && (typeof window.readyFun === 'function') && !isReadyFunCalled) {
                            window.readyFun.call(null);
                            isReadyFunCalled = true;
                        }
                    } else {
                        if (window.errFun && (typeof window.errFun === 'function')) {
                            setTimeout(function() {
                                window.errFun(res);
                            }, 100);
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
                            if (window.isDebug) {
                                setTimeout(function() {
                                    alert(errMsg);
                                }, 100);
                            }
                        }
                    }
                }
            });
        }
    };

    var packageyxwork = function() {
        var obj = {
            test: function(name, option, callback) {
                callJsBridge(name, option, callback);
            },
            log: function(data, name) {
                log.print(data, name);
            },
            init: function(option) {
                if (isPC) {
                    verify(option);
                } else {
                    if (webviewReady) {
                        verify(option);
                    } else {
                        document.addEventListener('FNJSBridgeReady', function() {
                            verify(option);
                        });
                    }
                }
            },
            setTitle: function(option) {
                var title = String(option.title || '').trim();
                if (title === '') {
                    return;
                }
                callJsBridge('setTitle', {
                    title: title
                }, option);
            },
            setGestureBack: function(option) {
                callJsBridge('setGestureBack', {
                    disabled: option.disabled || false //默认false，允许手势返回;不设置此方法，webview默认也是允许手势返回
                }, option);
            },
            selectMember: function(option) {
                var option = deepCopy(option);
                var selIds = option.selectedIds || [];
                var title = String(option.title || '').trim();
                var btext = String(option.btnText || '').trim();
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
                        selectedIds: selIds, //已选人员openid
                        selectMyself: option.selectMyself || false
                    }, option);
                }
            },
            selectNoticeMember: function(option) {
                var option = deepCopy(option);
                var selIds = option.selectedIds || [];
                var title = String(option.title || '').trim();
                var btext = String(option.btnText || '').trim();
                if (isArray(selIds)) {
                    selIds = selIds.yxUnique();
                    callJsBridge('selectNoticeMember', {
                        title: title || '选择联系人', //选择器标题，pc端需要的参数
                        btext: btext || '确定', //选择器按钮文本，pc端需要的参数
                        selectedIds: selIds, //已选人员openid
                        selectMyself: option.selectMyself || false
                    }, option);
                }
            },
            pickImage: function(option) {
                var sourceType = 3;
                var count = Number(option.count || 9);
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
                callJsBridge('previewImage', {
                    values: option.values,
                    index: option.index || 0 //默认显示第几张
                }, option);
            },
            previewOnlineImage: function(option) {
                callJsBridge('previewImage', {
                    type: 1,
                    values: option.urls,
                    index: option.index || 0 //默认显示第几张
                }, option);
            },
            previewLocalImage: function(option) {
                callJsBridge('previewImage', {
                    type: 2,
                    values: option.ids,
                    index: option.index || 0 //默认显示第几张
                }, option);
            },
            captureBackAction: function(callback) {
                callJsBridge('captureBackAction', {}, {
                    complete: callback
                });
            },
            clearBackActionCapture: function(callback) {
                callJsBridge('clearBackActionCapture', {}, {
                    complete: callback
                });
            },
            setOptionButtons: function(option) {
                var btns = deepCopy(option.btns) || [],
                    reg = /^[\u4e00-\u9fa5]+$/,
                    btnTextLength = 2;
                var limit = option.hideMore === false ? 1 : 2;
                btns = btns.slice(0, limit);
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
                        btns[i].color = (btns[i].color || '').replace(/#/g, '');
                        btns[i].bgColor = (btns[i].bgColor || '').replace(/#/g, '');
                    };
                }
                if (option.hideMore !== false) {
                    yxwork.hideOptionMenu();
                } else {
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
                callJsBridge('setOptionButtons', {
                    btns: btns
                }, option);
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
                } else {
                    menuBtns = [1, 2, 3, 4, 5, 6];
                }
                if (!isOptionMenuHide) {
                    callJsBridge('setMoreButtons', {
                        btns: menuBtns
                    });
                }
            },
            hideOptionMenu: function() {
                callJsBridge('setMoreButtons', {
                    btns: []
                }, {
                    success: function(res) {
                        isOptionMenuHide = true;
                    }
                });
            },
            closeWebView: function() {
                callJsBridge('closeWebView', {});
            },
            getUserAgentInfo: function(option) {
                callJsBridge('getUserAgentInfo', {}, option);
            },
            openUserCard: function(option) {
                callJsBridge('userCard', {
                    openid: option.openid
                });
            },
            openChat: function(option) {
                callJsBridge('openChat', {
                    openid: option.openid
                });
            },
            getClientInfo: function(option) {
                callJsBridge('getClientInfo', {
                    openid: option.openid
                }, option);
            },
            getLocation: function(option) {
                callJsBridge('getLocation', {}, option);
            },
            download: function(option) {
                callJsBridge('download', {
                    url: option.url, // 需要下载的文件的服务器端地址
                    isShowProgressTips: option.isShowProgressTips === 0 ? 0 : 1, // 默认为1，显示进度提示
                    name: option.name || '', //文件下载之后的名称
                    suffix: option.suffix || '' //文件下载之后的后缀名
                }, option);
            },
            getNetworkType: function(option) {
                callJsBridge('getNetworkType', {}, option);
            },
            scanQRCode: function(callback) {
                callJsBridge('scanQRCode', {}, callback);
            },
            alert: function(option) {
                var title = String(option.title || '').trim(),
                    message = String(option.message || '').trim(),
                    btnName = String(option.buttonName || '').trim();
                if (title === '' && message === '') {
                    return;
                }
                callJsBridge('alert', {
                    title: title, //标题
                    message: message, //提示内容
                    buttonName: (btnName || '知道了').substring(0, 5) //按钮名称，默认为“知道了”
                });
            },
            confirm: function(option) {
                var title = String(option.title || '').trim(),
                    message = String(option.message || '').trim(),
                    confirmName = String(option.confirmName || '').trim(),
                    cancelName = String(option.cancelName || '').trim();
                if (title === '' && message === '') {
                    return;
                }
                callJsBridge('confirm', {
                    title: title, //标题
                    message: message, //提示内容
                    confirmName: (confirmName || '确定').substring(0, 5), //确定按钮名称，默认为“确定”
                    cancelName: (cancelName || '取消').substring(0, 5) //取消按钮名称，默认为“取消”
                }, {
                    success: option.success,
                    cancel: option.cancel
                });
            },
            toast: function(option) {
                callJsBridge('toast', {
                    message: String(option.message || '').trim()
                });
            },
            showLoading: function(option) {
                callJsBridge('viewLoading', {
                    msg: String(option.message || '').trim(),
                    showIco: !option.hideIcon
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
                    option.items[i].name = String(name || '').trim();
                };
                callJsBridge('actionsheet', {
                    title: String(option.title || '').trim(),
                    btnName: '取消',
                    items: option.items.slice(0, 6)
                }, option);
            },
            datepicker: function(option) {
                callJsBridge('datepicker', {
                    init: option.init || (new Date()).getTime(), //默认显示时间 
                    format: option.format || 'yyyy-MM-dd' //选中之后显示格式:yyyy-MM-dd
                }, option);
            },
            timepicker: function(option) {
                callJsBridge('timepicker', {
                    init: option.init || (new Date()).getTime(), //默认显示时间 
                    format: option.format || 'hh:mm' //选中之后显示格式: hh:mm
                }, option);
            },
            datetimepicker: function(option) {
                callJsBridge('datetimepicker', {
                    init: option.init || (new Date()).getTime(), //默认显示时间 
                    format: option.format || 'yyyy-MM-dd hh:mm' //选中之后显示格式: hh:mm
                }, option);
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
                callJsBridge('dropdownMenu', {
                    title: String(option.title || '').trim(), //安卓端native展现需要的标题名称
                    items: option.items, //下拉选择各选项名称和值
                    defaultValue: getIndex(option.items, 'value', option.defaultValue)
                }, option);
            },
            openUrl: function(option) {
                callJsBridge('openUrl', {
                    system: option.system || 0, //默认0，内嵌浏览器打开；1，系统浏览器打开
                    url: option.url //需要PC端打开的链接
                });
            },
            copyText: function(option) {
                callJsBridge('copyToClipboard', {
                    type: 1,
                    content: option.text
                }, option);
            },
            update: function(callback) {
                if (yxwork.isiOS) {
                    window.location.href = "itms-apps://itunes.apple.com/us/app/qi-ye-yi-xin/id1121538629?l=zh&ls=1&mt=8";
                } else {
                    callJsBridge('update', {}, {
                        complete: callback
                    });
                }
            },
            downPackage: function(callback) {
                if (this.isiOS) {
                    window.location.href = "itms-apps://itunes.apple.com/us/app/qi-ye-yi-xin/id1121538629?l=zh&ls=1&mt=8";
                } else {
                    callJsBridge('downPackage', {}, {
                        complete: callback
                    });
                }
            },
            clientSynchronize: function(option) {
                callJsBridge('clientSynchronize', {
                    type: option.type,
                    data: option.data
                }, option);
            },
            getWifiList: function(option) {
                callJsBridge('getWifiList', {}, option);
            },
            getWifiDetail: function(option) {
                callJsBridge('getWifiDetail', {}, option);
            },
            getMobileId: function(option) {
                callJsBridge('getMobileId', {}, option);
            },
            openViewContainer: function(option) {
                callJsBridge('openViewContainer', {
                    data: option.data,
                    url: option.url
                }, {
                    success: option.onBack
                });
            },
            getDataFromOpener: function(option) {
                callJsBridge('getDataFromOpener', {}, option);
            },
            setBackDataForOpener: function(option) {
                callJsBridge('setBackDataForOpener', {
                    data: option.data
                }, option);
            }
        };
        yxwork = Object.extend(yxwork, obj);
    };

    if (isPC) {
        pcPolyfill();
        packageyxwork();
    } else {
        packageyxwork();
        document.addEventListener('FNJSBridgeReady', function() {
            webviewReady = true;
        });
    }
})();