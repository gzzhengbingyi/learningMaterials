! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.NRUM = e() : t.NRUM = e()
}(this, function() {
    return function(t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var a = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function(t, e, n) {
        var r = n(1),
            a = n(2),
            o = n(3),
            i = n(4),
            s = n(7),
            c = n(6),
            u = n(5),
            f = n(8);
        window.NRUM && window.NRUM.config && a.extend(r, window.NRUM.config, !0), r.key && (r.clientStart = a.support("performance") ? performance.timing.navigationStart : a.findStartTimeFromCookie() || r.clientStart || +new Date, s.monitor(), r.ajax && i.monitor(), r.jsError && f.monitor(), reportData = function() {
            if (window.NRUM.config.pageId) {
                var t = c.getData();
                if (t) {
                    var e = o.makeBeacon(t);
                    c.clear(), o.addBeacon(e)
                }
                o.sendBeacon()
            }
        }, setInterval(reportData, r.beaconFrequency), window.performance && "function" == typeof window.performance.now || a.addEvent(window, "beforeunload", a.onBeforeUnloadHandler)), t.exports = {
            config: r,
            mark: u.mark,
            measure: u.measure
        }
    }, function(t, e) {
        var n = {
            beaconFrequency: 5e3,
            clientStart: +new Date,
            key: "",
            beaconUrl: location.protocol + "//mam.netease.com/beacons",
            jsError: !0,
            ajax: !0,
            load: !0,
            keyMap: {
                key: "ky",
                pageId: "pi",
                pageUrl: "pu",
                platform: "pt",
                navigationTiming: "nt",
                resoureceTiming: "rt",
                jsError: "je",
                userTiming: "ut",
                navigationStart: "a",
                unloadEventStart: "b",
                unloadEventEnd: "c",
                fetchStart: "d",
                domainLookupStart: "e",
                domainLookupEnd: "f",
                connectStart: "g",
                connectEnd: "h",
                requestStart: "i",
                responseStart: "j",
                responseEnd: "k",
                domLoading: "l",
                domInteractive: "m",
                domContentLoadedEventStart: "n",
                domContentLoadedEventEnd: "o",
                domComplete: "p",
                loadEventStart: "q",
                loadEventEnd: "r",
                type: "s",
                redirectCount: "t",
                firstPaint: "u",
                ajaxEnd: "v",
                ajaxStart: "w",
                initiatorType: "x",
                scriptEnd: "y",
                col: "z",
                line: "aa",
                msg: "ab",
                url: "ac",
                stack: "ad",
                duration: "ae",
                name: "af",
                startTime: "ag",
                entryType: "ah",
                timestamp: "ai",
                redirectStart: "aj",
                redirectEnd: "ak",
                secureConnectionStart: "al",
                href: "am"
            }
        };
        t.exports = n
    }, function(module, exports, __webpack_require__) {
        var config = __webpack_require__(1);
        module.exports = {
            forEach: function(t, e, n) {
                if (t instanceof Array)
                    for (var r = 0; r < t.length; r++) e.call(n, t[r], r);
                else if (t instanceof Object)
                    for (var a in t) e.call(n, t[a], a);
                return t
            },
            timeNow: function() {
                return +new Date - config.clientStart
            },
            performanceNow: function() {
                var t;
                return t = window.performance && "function" == typeof window.performance.now ? performance.now() : +new Date - config.clientStart, Math.round(1e3 * (t || 0)) / 1e3
            },
            getEventElement: function(t) {
                return t = t || window.event, t.srcElement || t.target
            },
            stopEvent: function(t) {
                t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            },
            addEvent: document.addEventListener ? function(t, e, n, r) {
                t.addEventListener(e, n, r)
            } : function(t, e, n, r) {
                t.attachEvent("on" + e, n)
            },
            delEvent: document.removeEventListener ? function(t, e, n, r) {
                t.removeEventListener(e, n, r)
            } : function(t, e, n, r) {
                t.detachEvent("on" + e, n)
            },
            jsonpReq: function(t, e) {
                var n = /^(?:loaded|complete|undefined)$/,
                    r = document.createElement("script"),
                    a = function() {
                        n.test(r.readyState) && (document.body.removeChild(r), e())
                    };
                return r.type = "text/javascript", r.src = t, r.onload = r.onerror = r.onreadystatechange = a, document.body.appendChild(r), a
            },
            bind: function(t, e) {
                var n = arguments.length > 2 ? [].slice.call(arguments, 2) : [];
                return "function" != typeof e || e instanceof RegExp ? e : n.length ? function() {
                    return arguments.length ? e.apply(t, n.concat([].slice.call(arguments, 0))) : e.apply(t, n)
                } : function() {
                    return arguments.length ? e.apply(t, arguments) : e.call(t)
                }
            },
            getRandomNumber: function(t) {
                return t = t || 8, Math.round(Math.random() * Math.pow(10, t))
            },
            resolveURL: function(t, e) {
                if (/^https?:/.test(t)) return t;
                var n = document.createElement("a"),
                    r = document.createElement("a");
                if (n.href = e, r.href = t, r.protocol = n.protocol, /^\/\//.test(t) || (r.hostname = n.hostname), /^\//.test(t)) return r.href;
                var a = t.split(/\//),
                    o = n.pathname.split(/\//);
                for (/\/$/.test(e) || o.pop();
                    ".." == a[0];) o.pop(), a.shift();
                var i = o.join("/");
                return i && 1 == i.length && (i = ""), r.pathname = i + "/" + a.join("/"), r.href
            },
            getResource: function(t) {
                if (window.performance && window.performance.getEntriesByName) {
                    var e = window.performance.getEntriesByName(t);
                    return 0 === e.length ? null : e[e.length - 1]
                }
                return null
            },
            findStartTimeFromCookie: function() {
                for (var t = document.cookie.split(" "), e = 0; e < t.length; e++)
                    if (0 === t[e].indexOf("NRUM=")) {
                        for (var n, r, a, o, i, s = t[e].substring("NRUM=".length).split("&"), c = 0; c < s.length; c++) 0 === s[c].indexOf("s=") ? n = s[c].substring(2) : 0 === s[c].indexOf("h=") ? a = s[c].substring(2) : 0 === s[c].indexOf("r=") && (i = s[c].substring(2));
                        if (o = escape(document.referrer), r = o === a || a === escape(document.location.href) && i == o, r && n && +new Date - n < 6e4) return n
                    }
            },
            extend: function(t, e, n) {
                for (var r in e) "undefined" != typeof t[r] && n !== !0 || (t[r] = e[r]);
                return t
            },
            toFixed: function(t, e) {
                return Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
            },
            isArray: function(t) {
                return "array" === this.typeOf(t)
            },
            typeOf: function(t) {
                return null === t ? String(t) : {}.toString.call(t).slice(8, -1).toLowerCase()
            },
            onBeforeUnloadHandler: function() {
                document.cookie = "NRUM=s=" + Number(new Date) + "&h=" + escape(document.location.href) + "&r=" + escape(document.referrer) + "; path=/"
            },
            support: function(t) {
                switch (t) {
                    case "performance":
                        return !!window.performance;
                    case "cross":
                        return window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest
                }
            },
            JSON: {
                parse: function(sJSON) {
                    return eval("(" + sJSON + ")")
                },
                stringify: function(t) {
                    if (t instanceof Object) {
                        var e = "";
                        if (t.constructor === Array) {
                            for (var n = 0; n < t.length; e += this.stringify(t[n]) + ",", n++);
                            return "[" + e.substr(0, e.length - 1) + "]"
                        }
                        if (t.toString !== Object.prototype.toString) return '"' + t.toString().replace(/"/g, "\\$&") + '"';
                        for (var r in t) e += '"' + r.replace(/"/g, "\\$&") + '":' + this.stringify(t[r]) + ",";
                        return "{" + e.substr(0, e.length - 1) + "}"
                    }
                    return "string" == typeof t ? '"' + t.replace(/"/g, "\\$&") + '"' : String(t)
                }
            }
        }
    }, function(t, e, n) {
        var r = n(1),
            a = n(2),
            o = window.JSON || a.JSON,
            i = {
                beaconBuffer: [],
                canCross: a.support("cross"),
                MAXLENGTH: 1024
            };
        i.sendImgBeacon = function(t) {
            var e = new Image;
            try {
                e.src = r.beaconUrl + "/resources?data=" + encodeURIComponent(o.stringify(t))
            } catch (n) {}
        }, i.sendCorsBeacon = function(t) {
            var e = new XMLHttpRequest;
            e.open("POST", r.beaconUrl + "/resources"), e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), e.send(o.stringify(t))
        }, i.sendJsonpBeacon = function(t) {
            var e = r.beaconUrl + "?data=" + encodeURIComponent(o.stringify(t)) + "&t=" + +new Date;
            a.jsonpReq(e, function(t) {})
        }, i.sendBeacon = function() {
            for (var t; this.beaconBuffer.length;) t = this.beaconBuffer.shift(), "navigation" == t.type ? this.sendJsonpBeacon(t.data) : this.canCross ? this.sendCorsBeacon(t.data) : this.sendImgBeacon(t.data)
        }, i.makeBeacon = function(t, e) {
            var n = {
                    type: e
                },
                o = {
                    key: r.key
                };
            return "navigation" == e ? (o.pageUrl = window.location.href, o.platform = window.navigator.platform, o.navigationTiming = t) : (o.pageId = r.pageId, a.extend(o, t)), n.data = o, n = this.compress(n), this.canCross || "navigation" === e || (n = this.splitBeacon(n)), n
        }, i.compress = function(t) {
            function e(t) {
                var e = {};
                r.keyMap;
                for (var n in t) {
                    var a = r.keyMap[n];
                    a ? e[a] = t[n] : e[n] = t[n]
                }
                return e
            }
            var n = {};
            for (var o in t.data) {
                var i = r.keyMap[o],
                    s = t.data[o];
                if (s && "string" == typeof s) n[i || o] = s;
                else if (a.isArray(s)) {
                    for (var c = s, u = [], f = 0; f < c.length; f++) u.push(e(c[f]));
                    u && u.length && (n[i || o] = u)
                } else s && (n[i || o] = e(s))
            }
            return t.data = n, t
        }, i.splitBeacon = function(t) {
            function e(t) {
                var e = {};
                return a.extend(e, t), e
            }

            function n(t) {
                var e = r.keyMap.key || "key",
                    n = r.keyMap.pageId || "pageId",
                    a = {
                        type: t.type,
                        data: {}
                    };
                return a.data[e] = t.data[e], a.data[n] = t.data[n], a
            }
            var s = [],
                c = n(t),
                u = ["jsError", "resoureceTiming", "userTiming"];
            return i = e(c), a.forEach(u, function(n) {
                n = r.keyMap[n] || n;
                var a, u = t.data[n],
                    f = [];
                if (u) {
                    i.data[n] = f;
                    for (var d = 0; d < u.length; d++) f.push(u[d]), a = encodeURIComponent(o.stringify(i)).length, a > this.MAXLENGTH && (f.pop(), s.push(i), i = e(c), f = [u[d]], i.data[n] = f)
                }
            }), s.push(i), s
        }, i.addBeacon = function(t) {
            a.isArray(t) || (t = [t]), this.beaconBuffer = this.beaconBuffer.concat(t)
        }, i.clearBeacon = function() {
            this.beaconBuffer = []
        }, t.exports = i
    }, function(t, e, n) {
        var r = n(2),
            a = (n(5), n(6)),
            o = n(1),
            i = {};
        i.getEntry = function(t) {
            var e = {};
            t = r.resolveURL(t, location.href);
            var n = r.getResource(t);
            if (n) {
                var a = n.startTime;
                for (var i in n) "entryType" == i || "name" == i || "initiatorType" == i ? e[i] = n[i] : "startTime" == i || "duration" == i ? e[i] = r.toFixed(n[i], 0) : n[i] > 0 && (e[i] = r.toFixed(n[i] - a, 0));
                e.startTime = e.startTime + o.clientStart
            }
            return e.name || (e.name = t, e.initiatorType = "xmlhttprequest", e.entryType = "resource"), e
        }, i.buildData = function(t) {
            var e = this.getEntry(t.url),
                n = void 0 !== t.end && void 0 !== t.start && t.end - t.start,
                a = void 0 !== t.script && void 0 !== t.end && t.script - t.end;
            return e.ajaxStart = r.toFixed(t.start, 0), void 0 !== n && (e.ajaxEnd = r.toFixed(n, 0)), void 0 !== a && (e.scriptEnd = r.toFixed(a, 0)), e.ajaxStart = e.ajaxStart + o.clientStart, e
        }, i.reportData = function(t) {
            var e = r.extend({}, t);
            t.url != o.beaconUrl + "/resources" && window.setTimeout(function() {
                var t = i.buildData(e);
                t && a.addData(t, "ajax")
            }, 100)
        }, i.monitor = function() {
            if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
                var t = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function() {
                    this.__nrumAjaxData = {
                        url: arguments[1]
                    };
                    try {
                        t.apply(this, arguments)
                    } catch (e) {}
                };
                var e = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.send = function() {
                    function t() {
                        4 == this.readyState ? (this.__nrumAjaxData.end = r.performanceNow(), i.reportData(this.__nrumAjaxData)) : (o++, a = this.onreadystatechange, a ? this.onreadystatechange = n : o < 10 && setTimeout(function(e) {
                            return function() {
                                r.bind(e, t)()
                            }
                        }(this), 0))
                    }

                    function n() {
                        4 == this.readyState ? (this.__nrumAjaxData.end = r.performanceNow(), this.onreadystatechange = a, a && (a.apply(this, arguments), this.__nrumAjaxData.script = r.performanceNow()), i.reportData(this.__nrumAjaxData)) : a && a.apply(this, arguments)
                    }
                    var a, o = 0;
                    this.__nrumAjaxData.start = r.performanceNow(), r.bind(this, t)();
                    try {
                        e.apply(this, arguments)
                    } catch (s) {}
                }
            }
        }, t.exports = i
    }, function(t, e, n) {
        function r(t, e, n, r) {
            this.entryType = t, this.name = e, this.startTime = n, void 0 !== r && (this.duration = r), this.timestamp = +new Date
        }
        var a = n(2),
            o = n(6),
            i = {
                TYPE: "userTiming",
                MARK: "mark",
                MEASURE: "measure"
            },
            s = {
                marks: {}
            };
        s.mark = function(t, e) {
            var n = a.toFixed(a.performanceNow(), 2);
            s.marks[t] = s.marks[t] || [], s.marks[t].unshift(n), e && o.addData(new r(i.MARK, t, n), i.TYPE)
        }, s.measure = function(t, e, n) {
            var c = a.toFixed(a.performanceNow(), 2);
            e ? (n = n ? s.getMark(n) : c, e = s.getMark(e), n = n && a.toFixed(n, 2), e = e && a.toFixed(e, 2), e && n && o.addData(new r(i.MEASURE, t, e, a.toFixed(n - e, 2)), i.TYPE)) : o.addData(new r(i.MEASURE, t, 0, c), i.TYPE)
        }, s.getMark = function(t) {
            return s.marks[t] && s.marks[t][0]
        }, s.clearMarks = function(t) {
            t ? delete s.marks[t] : s.marks = {}
        }, t.exports = s
    }, function(t, e) {
        var n = {
            navigation: null,
            errorBuffer: [],
            ajaxBuffer: [],
            userTimingBuffer: [],
            addData: function(t, e) {
                if ("navigation" === e) this.navigation = t;
                else {
                    var n = {
                        error: "errorBuffer",
                        ajax: "ajaxBuffer",
                        userTiming: "userTimingBuffer"
                    };
                    this[n[e]].push(t)
                }
            },
            clear: function() {
                this.errorBuffer = [], this.ajaxBuffer = [], this.userTimingBuffer = []
            },
            getData: function() {
                var t, e = {
                    errorBuffer: "jsError",
                    ajaxBuffer: "resoureceTiming",
                    userTimingBuffer: "userTiming"
                };
                for (var n in e) {
                    var r = this[n];
                    r.length && (t = t ? t : {}, t[e[n]] = r)
                }
                return t
            }
        };
        t.exports = n
    }, function(t, e, n) {
        var r = n(2),
            a = (n(6), n(5)),
            o = n(3),
            i = n(1),
            s = 3e3,
            c = {
                hasPerformance: r.support("performance"),
                onloadHandler: function() {
                    a.mark("nrumonload"), setTimeout(r.bind(this, this.processNavigationTiming), 0)
                },
                processNavigationTiming: function() {
                    var t, e, n, r, o;
                    if (this.hasPerformance) {
                        t = window.performance.navigation, e = {}, n = window.performance.timing, o = n.navigationStart, e.navigationStart = o;
                        for (r in n) r && "navigationStart" != r && n[r] > 0 && (e[r] = n[r] - o);
                        performance.timing.msFirstPaint && (e.firstPaint = performance.timing.msFirstPaint - o), e.type = t.type, e.redirectCount = t.redirectCount, this.timing = e, window.chrome && "function" == typeof window.chrome.loadTimes ? this.pendingForChromeFirstPaintTime(0) : this.report()
                    } else e = {
                        navigationStart: i.clientStart,
                        loadEventEnd: a.getMark("nrumonload")
                    }, a.clearMarks("nrumonload"), this.timing = e, this.report()
                },
                pendingForChromeFirstPaintTime: function(t) {
                    if (t++, t > 5) return void this.report();
                    var e = window.chrome.loadTimes();
                    0 !== e.firstPaintTime ? (this.timing.firstPaint = Math.round(1e3 * e.firstPaintTime) - this.timing.navigationStart, this.report()) : window.setTimeout(r.bind(this, this.pendingForChromeFirstPaintTime, t), s)
                },
                report: function() {
                    var t = o.makeBeacon(this.timing, "navigation");
                    o.addBeacon(t), o.sendBeacon()
                },
                monitor: function() {
                    "complete" == document.readyState ? this.onloadHandler() : r.addEvent(window, "load", r.bind(this, this.onloadHandler))
                }
            };
        t.exports = c
    }, function(t, e, n) {
        var r = n(6),
            a = n(2),
            o = {
                processError: function(t, e, n, a, o) {
                    return !t || !e || void setTimeout(function() {
                        var i = {};
                        if (a = a || window.event && window.event.errorCharacter, i.msg = t, i.url = e, i.line = n, i.timestamp = (new Date).valueOf(), i.href = window.location.href, a && (i.col = a), o && o.stack) i.stack = o.stack.toString();
                        else if (arguments.callee) {
                            for (var s = [], c = arguments.callee.caller, u = 3; c && --u > 0 && (s.push(c.toString()), c !== c.caller);) c = c.caller;
                            s = s.join(","), i.stack = s
                        }
                        i.stack || delete i.stack, o && o.name && (i.name = o.name), r.addData(i, "error")
                    }, 0)
                },
                monitor: function() {
                    var t = window.onerror;
                    window.onerror = a.bind(this, function(e, n, r, a, o) {
                        this.processError(e, n, r, a, o), t && t(e, n, r, a, o)
                    })
                }
            };
        t.exports = o
    }])
});