$(document).ready(function() {
    var u = navigator.userAgent;
    var isPC = window.navigator.userAgent.toLowerCase().indexOf("mobile") === -1;
    if (isPC) {
        $('.j-pc').show();
    }
    else {
        $('.j-mobile').show();
    }

    yxwork.ready(function(res) {
        initPage();
    });
    var imgOption = {
        ids: [], //已选图片id,由客户端生成，用于上传
        count: 9, // 默认9，可以选择的图片数
        sourceType: ['album', 'camera'], //默认指定图片来源是相册和相机,只用相册用['album']
        size: //客户端压缩图片需要指定尺寸，用来返回根据该尺寸压缩的图片的base64码
        {
            cx: 100,
            cy: 100
        },
        success: function(res) {
            var imgs = [];
            var list = res; // 返回选定图片的列表[{id:'图片id',mime:'图片mime类型',data:'base64编码'}]
            if (list && list.length > 0) {
                var htmlStr = '';
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i].id) {
                        imgs.push(list[i].id);
                    }
                    htmlStr += '<img src="'+list[i].mime+list[i].data+'" data-index="'+i+'" alt="">';
                };
                imgOption.ids = imgs;
                $('#imgList-pick').html(htmlStr);
            }
        }
    };
    var memberIds = [];
    var dropdownValue = 12;
    var onlineUrls = [];
    $('#imgList-online img').each(function(index, el) {
        onlineUrls.push(el.src);
    });

    $('#filter').change(function(event) {
        var val = this.value;
        if (val === '0') {
            $('.j-mobile, .j-pc').hide();
            $('.j-private').show();
        }
        else {
            if (isPC) {
                $('.j-pc').show();
            } else {
                $('.j-mobile').show();
            }
        }
    });

    $('#init').on('click', function(event) {
        var keys = $("#ipt-appKey").val();
        if (!keys) {
            return;
        }
        keys = keys.split(",");
        yxwork.init({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert（自定义，非系统默认）出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            "signature": $('#ipt-signature').val(), //签名
            "nonce": $('#ipt-nonce').val(), //生成签名时的随机数
            "timestamp": $('#ipt-timestamp').val(), //生成签名时的时间戳
            "appKey": keys[0] //应用ID
        });
    });
    $("#initPatams").on("click", function() {
    	var keys=$("#ipt-appKey").val();
    	if(!keys){return;}
    	keys=keys.split(",");
        $.ajax({
            url: "/rest/jssdk/token",
            type: "POST",
            data: {
                appKey:keys[0],
                appSecret:keys[1],
                permAuth:keys[2]
            },
            success: function(data) {
                if (!data.code) {
                    $("#ipt-access_token").val(data.accessToken);
                    $.ajax({
                        url: "/rest/jssdk/ticket",
                        type: "POST",
                        data: {
                            access_token: $("#ipt-access_token").val()
                        },
                        success: function(data) {
                            if (!data.code) {
                                $("#ipt-jsapi_ticket").val(data.ticket);
                                $.ajax({
                                    url: "/rest/jssdk/initPara",
                                    type: "POST",
                                    data: {
                                        ticket: $("#ipt-jsapi_ticket").val(),
                                        nonce: (Math.random() + "").substring(2),
                                        timestamp: (new Date()).getTime()
                                    },
                                    success: function(data) {
                                        console.log(data);
                                        if (!data.code) {
                                            $("#ipt-signature").val(data.signature);
                                            $("#ipt-nonce").val(data.nonce);
                                            $("#ipt-timestamp").val(data.timestamp);
                                            //$("#ipt-corpId").val(data.corpId);
                                            $('#init').removeClass('u-btn-dis');
                                        } else {
                                            $("#ipt-signature").val(data.errmsg);
                                        }

                                    }
                                });
                            } else {
                                $("#ipt-jsapi_ticket").val(data.errmsg);
                            }

                        }
                    });
                } else {
                    $("#ipt-access_token").val(data.errmsg);
                }
            }
        });
    });
    
    var initPage = function() {
    	$('#api').removeClass('m-api');
        $('#setTitle').on('click', function(event) {
            yxwork.setTitle({
                title: $('#ipt-title').val()
            });
        });
        $('#captureBackAction').on('click', function(event) {
            alert('绑定了返回按钮事件');
            yxwork.captureBackAction(function() {
                alert('请点击clearBackActionCapture清除返回键绑定');
            });
        });
        $('#clearBackActionCapture').on('click', function(event) {
            yxwork.clearBackActionCapture();
        });
        $('#hideOptionMenuItems').on('click', function(event) {
            var arr = [];
            $(this).prev('.m-set').find('input:checked').each(function(index, el) {
                arr.push(el.value);
            });
            yxwork.hideOptionMenuItems({
                btns: arr
            });
        });
        $('#setOptionButtons').on('click', function(event) {
            var btns = [];
            $(this).prev('.m-set').find('.u-input').each(function(index, el) {
                if (el.value) {
                    btns.push({
                        key: 'btn' + index,
                        name: el.value,
                        color: $('#sel-font-color'+(index+1)).val()||'',
                        bgColor: $('#sel-bg-color'+(index+1)).val()||''
                    });
                }
            });
            yxwork.setOptionButtons({
                hideMore: $('#cbx-hideMore')[0].checked,
                btns: btns,
                success: function(res) {
                    var clickedBtnData = res; //{key:"用来标识按钮",name:"按钮名"},根据key来确定点击了哪个按钮
                    alert('你点击了' + res.name);
                    // if(res.key==='btn1') {
                    //     alert('你点击了'+res.name);
                    // }
                    // if(res.key==='btn2') {
                    //     alert('你点击了'+res.name);
                    // }
                }
            });
        });
        $('#hideOptionMenu').on('click', function(event) {
            yxwork.hideOptionMenu();
        });

        $('#imgList-pick').on('click', 'img', function(event) {
            var index = event.target.getAttribute('data-index');
            // yxwork.previewLocalImage({
            //     ids: imgOption.ids,
            //     index: index
            // })
            // alert(index);
            // var hehe = imgOption.ids.concat(onlineUrls);
            // for (var i = 0; i < hehe.length; i++) {
            //     alert(hehe[i]);
            // };
            // return;
            yxwork.previewImage({
                values: imgOption.ids.concat(onlineUrls),
                index: index
            })
        });
        $('#imgList-online').on('click', 'img', function(event) {
            var index = event.target.getAttribute('data-index');
            // yxwork.previewOnlineImage({
            //     urls: urls,
            //     index: index
            // })
            // alert(imgOption.ids.length+Number(index));
            // var hehe = imgOption.ids.concat(onlineUrls);
            // for (var i = 0; i < hehe.length; i++) {
            //     alert(hehe[i]);
            // };
            // return;
            yxwork.previewImage({
                values: imgOption.ids.concat(onlineUrls),
                index: imgOption.ids.length + Number(index)
            })
        });
        $('#pickImage').on('click', function(event) {
            imgOption.count = Number($('#sel-mobile').val());
            imgOption.sourceType = ['album', 'camera'];
            yxwork.pickImage(imgOption);
        });
        $('#pickImage-album').on('click', function(event) {
            imgOption.count = Number($('#sel-mobile').val());
            imgOption.sourceType = ['album'];
            yxwork.pickImage(imgOption);
        });
        $('#pickImage-camera').on('click', function(event) {
            imgOption.count = Number($('#sel-mobile').val());
            imgOption.sourceType = ['camera'];
            yxwork.pickImage(imgOption);
        });
        $('#pickImage-pc').on('click', function(event) {
            imgOption.count = Number($('#sel-pc').val());
            yxwork.pickImage(imgOption);
        });
        $('#uploadImage').on('click', function(event) {
            if (imgOption.ids.length === 0) {
                alert('请先用pickImage选择图片');
            } else {
                yxwork.uploadImage({
                    ids: imgOption.ids,
                    success: function(res) {
                        alert('上传完毕');
                    }
                });
            }
        });
        $('#getUserAgentInfo').on('click', function(event) {
            yxwork.getUserAgentInfo({
                success: function(res) {
                    alert(JSON.stringify(res));
                }
            });
        });
        $('#getLocation').on('click', function(event) {
            yxwork.getLocation({
                success: function(res) {
                    alert(JSON.stringify(res));
                }
            });
        });
        $('#getNetworkType').on('click', function(event) {
            yxwork.getNetworkType({
                success: function(res) {
                    alert(JSON.stringify(res));
                }
            });
        });
        $('#update').on('click', function(event) {
            yxwork.update({});
        });
        $('#downPackage').on('click', function(event) {
            yxwork.downPackage({});
        });
        
        $('#closeWebView').on('click', function(event) {
            yxwork.closeWebView();
        });

        $('#selectMember').on('click', function(event) {
            yxwork.selectMember({
                title: $('#ipt-sel-title').val(),
                btnText: $('#ipt-sel-btnText').val(),
                multiple: $('#cbx-multi')[0].checked,
                maximum: $('#ipt-maximum').val(),
                selectedIds: memberIds,
                success: function(res) {
                    memberIds = [];
                    var list = res; //返回选中的成员列表[{openid:'联系人openid',name:'联系人姓名',headImg:'联系人头像url'}]
                    if (list && list.length > 0) {
                        var liHtml = '';
                        for (var i = 0, len = list.length; i < len; i++) {
                            memberIds.push(list[i].openid);
                            liHtml += '<li><img src="' + list[i].headImg + '" alt=""><p>' + list[i].name + '</p></li>';
                        };
                        $('.selList').html(liHtml);
                    }
                }
            });
        });
        $('#openUserCard').on('click', function(event) {
            if ($('#ipt-openid1').val() || memberIds.length > 0) {
                yxwork.openUserCard({
                    openid: $('#ipt-openid1').val() || memberIds[0]
                });
            }
        });
        $('#openChat').on('click', function(event) {
            if ($('#ipt-openid2').val() || memberIds.length > 0) {
                yxwork.openChat({
                    openid: $('#ipt-openid2').val() || memberIds[0]
                });
            }
        });
        $('#getClientInfo').on('click', function(event) {
            if ($('#ipt-openid3').val() || memberIds.length > 0) {
                yxwork.getClientInfo({
                    openid: $('#ipt-openid3').val() || memberIds[0],
                    success: function(res) {
                        var str = '<img src="'+res.headUrl+'" alt=""><p>'+res.name+'</p>';
                        $('.clientDetail').html(str);
                    }
                });
            }
        });
        $('#openUrl-webview').on('click', function(event) {
            var url = $('#ipt-link').val() || 'https://b.yixin.im/index.do';
            yxwork.openUrl({
                system: 0, //默认0，内嵌浏览器打开；1，系统浏览器打开
                url: url //需要客户端打开的链接
            });
        });
        $('#openUrl-system').on('click', function(event) {
            var url = $('#ipt-link').val() || 'https://b.yixin.im/index.do';
            yxwork.openUrl({
                system: 1, //默认0，内嵌浏览器打开；1，系统浏览器打开
                url: url //需要客户端打开的链接
            });
        });
        $('#download').on('click', function(event) {
            var url = $('#ipt-download-url').val() || 'http://yixin.dl.126.net/update/installer/bizyixinsetup1020.exe';
            var name = $('#ipt-download-name').val() || '易信企业版';
            var suffix = $('#ipt-download-suffix').val() || 'rar';
            yxwork.download({
                url: url, // 需要下载的文件的服务器端地址
                name: name, //文件下载之后的名称
                suffix: suffix //文件下载之后的后缀名
            });
        });
        $('#scanQRCode').on('click', function(event) {
            yxwork.scanQRCode(function(res) {

            });
        });
        $('#copyText').on('click', function(event) {
            yxwork.copyText({
                text: $('#ipt-copy').val() || '你拷贝了一段文本',
                success: function(res) {
                    alert('拷贝成功');
                }
            });
        });
        $('#setGestureBack-disable').on('click', function(event) {
            yxwork.setGestureBack({
                disabled: true,
                success: function() {
                    alert('已禁用手势返回');
                }
            });
        });
        $('#setGestureBack-open').on('click', function(event) {
            yxwork.setGestureBack({
                disabled: false,
                success: function() {
                    alert('已开启手势返回');
                }
            });
        });
        $('#alert').on('click', function(event) {
            yxwork.alert({
                title: $('#ipt-alert-title').val(), //标题
                message: $('#ipt-alert-message').val(), //提示内容
                buttonName: $('#ipt-alert-btnName').val() //按钮名称，默认为“确定”
            });
        });
        $('#confirm').on('click', function(event) {
            yxwork.confirm({
                title: $('#ipt-confirm-title').val(), //标题
                message: $('#ipt-confirm-message').val(), //提示内容
                confirmName: $('#ipt-confirm-btnName1').val(),
                cancelName: $('#ipt-confirm-btnName2').val(),
                success: function() {
                    alert('你点击了确定');
                },
                cancel: function() {
                    alert('你点击了取消');
                }
            });
        });
        $('#toast').on('click', function(event) {
            yxwork.toast({
                message: $('#ipt-toast').val() //提示内容
            });
        });
        $('#actionsheet').on('click', function(event) {
            var btns = [];
            $(this).prev('.m-set').find('.j-input').each(function(index, el) {
                if (el.value) {
                    btns.push({
                        value: index,
                        name: el.value
                    });
                }
            });

            yxwork.actionsheet({
                title: $('#ipt-acst-title').val(), //标题，不填不显示
                items: btns, //下拉选择各选项名称和值
                btnName: $('#ipt-acst-btnName').val(), //底部按钮名称,不填不显示
                success: function(res) {
                    var clickedItem = res; //返回点击按钮的数据{name:'选项1',value:1}
                    alert('你点击了' + clickedItem.name + ',该按钮的值为' + clickedItem.value);
                },
                cancel: function() {
                    alert('你点击了底部按钮'); // 点击了底部取消按钮
                }
            });
        });

        $('#dropdownMenu').on('click', function(event) {
            var options = [];
            $(this).prev('.m-set').find('.j-input').each(function(index, el) {
                if (el.value) {
                    options.push({
                        value: index,
                        name: el.value
                    });
                }
            });
            yxwork.dropdownMenu({
                title: $('#ipt-drop-title').val() || '',
                items: options, //下拉选择各选项名称和值
                defaultValue: dropdownValue, //默认选中的值 
                success: function(res) {
                    alert('当前选中了' + res.name);
                    dropdownValue = res.value;
                }
            });
        });
        $('#datepicker').on('click', function(event) {
            yxwork.datepicker({
                format: 'yyyy:MM:dd', //选中之后显示格式:yyyy-MM-dd
                success: function(res) {
                    alert(res.result);
                }
            });
        });
        $('#timepicker').on('click', function(event) {
            yxwork.timepicker({
                format: 'hh:mm:ss', //选中之后显示格式:hh:mm
                success: function(res) {
                    alert(res.result);
                }
            });
        });
        $('#datetimepicker').on('click', function(event) {
            yxwork.datetimepicker({
                format: 'yyyy-MM-dd hh:mm', //选中之后显示格式:yyyy-MM-dd hh:mm
                success: function(res) {
                    alert(res.result);
                }
            });
        });
        $('#addBtn').on('click', function(event) {
            var len = $('.m-key input').length;
            var ipt1 = '<input type="text" class="u-input" placeholder="请输入参数名" id="ipt-key' + (len + 1) + '">',
                ipt2 = '<input type="text" class="u-input" placeholder="请输入参数值" id="ipt-value' + (len + 1) + '">';
            $('.m-key').append(ipt1);
            $('.m-value').append(ipt2);
        });
        $('#customCall').on('click', function(event) {
            var funName = $('#ipt-funName').val();
            var params = {};
            var len = $('.m-key input').length;
            for (var i = 0; i < len; i++) {
                var key = $('#ipt-key' + (i + 1)).val(),
                    value = $('#ipt-value' + (i + 1)).val();
                if (key) {
                    params[key] = value;
                }
            };
            // try {
            yxwork.test(funName, params, {
                    complete: function(res) {
                        // alert(res);
                    }
                })
                // } catch (e) {
                // alert(e.message);
                // }

        });
    };

});
