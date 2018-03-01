function testClick() {
  var player = document.getElementById("player");
  if (player.children.length > 0) {
      player.removeChild(player.children[0]);
  }
  console.log("remove player children");
  var sidetool = document.getElementById("sideTool");
  if (sideTool != undefined) {
      document.body.removeChild(sideTool);
  }
  var playboxiiiis = document.getElementsByClassName('l-module module_basic_playbox');
  if (playboxiiiis.length > 0) {
      var playboxiiii = playboxiiiis[0];
      var playboxiiiistyles = playboxiiii.children;
      for (var i = 0; i < playboxiiiistyles.length;) {
          if (playboxiiiistyles[i].tagName.toLowerCase() == 'style') {
              playboxiiii.removeChild(playboxiiiistyles[i]);
          } else {
              i++;
          }
      }
  }

  ! function($, require, define) {
    require.config({
        enable_ozma: true
    });
    define("page/find/player/model/dramaModel", ["tui/event", "tui/net", "module/login/login"], function(e, t, i) {
        var n = e.extend({
            initialize: function() {
                var e = this;
                n.superClass.initialize.call(e);
                this.domain = PageConfig.homeHost;
                e.op = {
                    callbackName: "callback",
                    charset: "utf-8"
                }
            },
            getPageData: function(e, i) {
                var n = this;
                t.getJSON(this.domain + e, i, function(e) {
                    if (1 == e.error) n.trigger("getPageData:success", [e])
                }, n.op)
            },
            getShowInfo: function(e, i) {
                var n = this;
                t.getJSON(this.domain + e, i, function(e) {
                    if (1 == e.error) n.trigger("getShowInfo:success", [e])
                }, n.op)
            }
        });
        return n
    });
    define("page/find/player/view/intro", ["tui/view", "module/ui/switchtab", "page/find/player/model/dramaModel"], function(e, t, i) {
        var n = e.extend({
            el: $("#module_basic_intro"),
            initialize: function(e) {
                n.superClass.initialize.call(this);
                if (!this.$el.length) return;
                var a = this;
                this.$summary = $(".summary-wrap", this.$el);
                this.$summaryMore = this.$summary.find(".summary-more");
                this.$DramaWrap = $(".introDramaSwitchTab", this.$el);
                this.$listWrapDiv = $(".c", this.$DramaWrap);
                this.loading = false;
                this.mod = new i;
                this.mod.bind("getShowInfo:success", this.rendShowInfo.bind(this));
                this.initSummary();
                var o = new t({
                    box: $(".introSwitchTab"),
                    tab: ".t_tab>li",
                    panel: ".tab-c",
                    linktab: true
                });
                o.bind("after", function(e) {
                    if (0 == e) a.initSummary();
                    else a.initDesc()
                });
                $("body").bind("responsive", function() {
                    a.initSummary();
                    a.initDesc()
                })
            },
            events: {
                "click .t_tab_inner li a": "switchTab",
                "click .summary-more": "expend",
                "click .expend-tab-btn": "expendTab"
            },
            switchTab: function(e) {
                var t = $(e.currentTarget);
                var i = "introitem_";
                var n = t.attr("rel");
                if (t.hasClass("current")) return;
                this.$DramaWrap.find(".current").removeClass("current");
                t.parent().addClass("current");
                if (this.loading) return;
                this.divId = i + n;
                var a = $("#" + this.divId);
                if (a.length) {
                    this.$listWrapDiv.find(">div").hide();
                    a.show()
                } else {
                    this.loading = true;
                    this.mod.getShowInfo("page/showinfo?", {
                        videoId: PageConfig.videoId,
                        showId: PageConfig.showid,
                        page: n
                    })
                }
            },
            rendShowInfo: function(e) {
                var t = $("<div>").attr("id", this.divId);
                t.html(e.html);
                this.$listWrapDiv.find(">div").hide();
                this.$listWrapDiv.append(t);
                t.show();
                this.loading = false
            },
            initSummary: function() {
                if (this.$summaryMore.hasClass("summary-close")) return;
                if (this.$summary.find(".summary").height() > this.$summary.height() && this.$summaryMore.hasClass("summary-open")) this.$summaryMore.show();
                else this.$summaryMore.hide()
            },
            initDesc: function() {
                var e = this.$DramaWrap.find(".t_tab_inner");
                if (e.height() > 40) {
                    if (!e.find(".expend-tab-btn").length) e.append('<a href="javascript:void(0)" class="expend-tab-btn"  hidefocus="true">ȫ���缯</a>')
                } else this.$summaryMore.hide()
            },
            expend: function(e) {
                var t = $(e.currentTarget);
                if (t.hasClass("summary-open")) {
                    this.$summary.removeClass("summary-expend");
                    t.removeClass("summary-open").addClass("summary-close").text("��������")
                } else {
                    this.$summary.addClass("summary-expend");
                    t.removeClass("summary-close").addClass("summary-open").text("�鿴����")
                }
            },
            expendTab: function() {
                if (this.$DramaWrap.hasClass("expend-tab")) this.$DramaWrap.removeClass("expend-tab");
                else this.$DramaWrap.addClass("expend-tab")
            }
        });
        return n
    });
    define("page/find/player/model/listall", ["tui/event", "tui/net", "tui/cookie", "tui/util/date", "module/login/login"], function(e, t, i, n, a) {
        var o = e.extend({
            initialize: function() {
                var e = this;
                o.superClass.initialize.call(e);
                this.domain = PageConfig.homeHost;
                e.op = {
                    callbackName: "callback",
                    charset: "utf-8"
                }
            },
            getStatRank: function(e) {
                var i = this;
                t.getJSON(this.domain + "related/statRank?" + "t=" + (new Date).getTime(), e, function(e) {
                    if (1 == e.error) i.trigger("getStatRank:success", [e])
                }, i.op)
            },
            getSubRank: function(e) {
                var t = this;
                $.ajax({
                    type: "get",
                    url: this.domain + "related/subRank?" + "&t=" + (new Date).getTime(),
                    data: e,
                    dataType: "jsonp",
                    success: function(e) {
                        if (0 == e.error) t.trigger("getSubRank:success", [e]);
                        else t.trigger("getSubRank:fail", ["module_basic_subrank"])
                    },
                    error: function(e) {
                        t.trigger("getSubRank:fail", ["module_basic_subrank"])
                    }
                })
            },
            getRelation: function(e) {
                var i = this;
                t.getJSON("//ykrec.youku.com/show/packed/list.json?t=" + 1 * new Date, e, function(e) {
                    if (0 == e.e && e.data.length) {
                        i.setRelationData(e.data);
                        i.trigger("getRelation:sucess", [e])
                    } else i.trigger("getRelation:fail", ["module_basic_relation"])
                }, i.op)
            },
            getRelationLike: function(e) {
                var i = this;
                t.getJSON("//ykrec.youku.com/show/packed/list.json?t=" + 1 * new Date, e, function(e) {
                    if (0 == e.e && e.data.length) {
                        i.setLikeShowData(e.data);
                        i.trigger("getRelationLike:sucess", [e])
                    } else i.trigger("getRelation:fail", ["module_basic_relationleft"])
                }, i.op)
            },
            getInfo: function(e) {
                var t = this;
                $.ajax({
                    type: "get",
                    url: this.domain + "related/info?" + "&t=" + (new Date).getTime(),
                    data: e,
                    dataType: "jsonp",
                    success: function(e) {
                        if (0 == e.error) t.trigger("getInfo:success", [e]);
                        else t.trigger("getInfo:fail", ["module_basic_info"])
                    },
                    error: function(e) {
                        t.trigger("getInfo:fail", ["module_basic_info"])
                    }
                })
            },
            getStar: function(e) {
                var i = this;
                t.getJSON(this.domain + "related/star?" + "&t=" + (new Date).getTime(), e, function(e) {
                    if (0 == e.error) i.trigger("getStar:success", [e.data]);
                    else i.trigger("getStar:fail", ["module_basic_star"])
                }, i.op)
            },
            getSubInfo: function(e) {
                var t = this;
                $.ajax({
                    type: "get",
                    url: this.domain + "action/sub",
                    data: e,
                    dataType: "jsonp",
                    beforeSend: function(e) {
                        var t = $.trim(i("_zpdtk"));
                        if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
                    },
                    success: function(e) {
                        if (0 == e.error) t.trigger("getSubInfo:success", [e.data]);
                        else t.trigger("getSubInfo:fail", ["module_basic_sub"])
                    }
                })
            },
            createSub: function(e) {
                var t = this;
                $.ajax({
                    type: "get",
                    url: this.domain + "action/createSub",
                    data: e,
                    beforeSend: function(e) {
                        var t = $.trim(i("_zpdtk"));
                        if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
                    },
                    success: function(e) {
                        if (e.data) t.trigger("createSub:success", []);
                        else t.trigger("sub:error", [])
                    }
                })
            },
            destroySub: function(e) {
                var t = this;
                $.ajax({
                    type: "get",
                    url: this.domain + "action/destroySub",
                    data: e,
                    beforeSend: function(e) {
                        var t = $.trim(i("_zpdtk"));
                        if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
                    },
                    success: function(e) {
                        if (e.data) t.trigger("destroySub:success", []);
                        else t.trigger("sub:error", [])
                    }
                })
            },
            setRelationData: function(e) {
                function t(e) {
                    var t = 0;
                    var i = e % 60;
                    var t = Math.floor(e / 60);
                    if (t <= 9) t = "0" + t;
                    if (i <= 9) i = "0" + i;
                    return t + ":" + i
                }
                var i = this;
                if (e)
                    for (var a = 0, o = e.length; a < o; a++) {
                        var r = "";
                        var s = "";
                        if ("undefined" == typeof e[a].playLink) {
                            if (1 == e[a].type) r = PageConfig.homeHost + "v_show/id_" + e[a].codeId + ".html";
                            else if (2 == e[a].type) r = PageConfig.youku_homeurl + "show_page/id_" + e[a].codeId + ".html"
                        } else r = e[a].playLink;
                        e[a].videoUrl = r;
                        if (e[a].totalTime) s = n.beautyTime(e[a].totalTime);
                        e[a].mm = e[a].mm || 0;
                        if (e[a].totalTime) e[a].videoTime = s;
                        if (void 0 != e[a].thirdDisplayUrl && void 0 != e[a].thirdClickUrl) {
                            var l = e[a].thirdDisplayUrl;
                            var d = new Image;
                            d.src = l
                        }
                    }
            },
            setLikeShowData: function(e) {
                var e = e,
                    t = "",
                    i = "",
                    n = "",
                    a = "";
                if (e)
                    for (var o = 0, r = e.length; o < r; o++) {
                        if ("undefined" == typeof e[o].playLink) {
                            if (1 == e[o].type) t = PageConfig.homeHost + "v_show/id_" + e[o].codeId + ".html";
                            else if (2 == e[o].type) t = PageConfig.youku_homeurl + "show_page/id_" + e[o].codeId + ".html"
                        } else t = e[o].playLink;
                        i = e[o].title;
                        if (9 == e[o].type) {
                            if (i.length > 19) i = i.substring(0, 19) + "..."
                        } else if (i.length > 19) i = i.substring(0, 19) + "...";
                        var n = e[o].mm || 0;
                        if ("undefined" == typeof e[o].vPicUrl) a = e[o].picUrl;
                        else a = e[o].vPicUrl;
                        e[o].videoUrl = t;
                        e[o].title = i;
                        e[o].mm = n;
                        e[o].picUrl = a
                    }
            }
        });
        return o
    });
    define("tui/common", [], function() {
        var e = {
            speed: 400,
            init: function(e) {
                if (jQuery) {
                    var t = this;
                    var i = jQuery(".scroll-" + e);
                    var n = parseInt(i.offset().top) - 65;
                    if (i.length) jQuery("html, body").stop().animate({
                        scrollTop: n
                    }, t.speed, function() {
                        location.hash = e
                    })
                }
            }
        };
        var t = function() {
            var e = document.createElement("div");
            return function(t) {
                var i = t.charAt(0).toUpperCase() + t.slice(1),
                    n = "Webkit Moz O ms",
                    a = n.split(" "),
                    o = (t + " " + a.join(i + " ") + i).split(" ");
                for (var r in o) {
                    var t = o[r];
                    if (!!!~("" + t).indexOf("-") && void 0 !== e.style[t]) return true
                }
                return false
            }
        }();

        function i(e) {
            switch (typeof e) {
                case "undefined":
                    return true;
                case "string":
                    if (0 == $.trim(e).length) return true;
                    break;
                case "boolean":
                    if (!e) return true;
                    break;
                case "number":
                    if (0 === e) return true;
                    break;
                case "object":
                    if (null === e) return true;
                    if (void 0 !== e.length && 0 == e.length) return true;
                    for (var t in e) return false;
                    return true
            }
            return false
        }
        var n = {
            init: function() {
                var e = "vv";
                if (1 == window.paid) e += ",permission";
                nova_request(getVideoPageInfoCallback, "/QVideo/~ajax/getVideoPlayInfo", {
                    id: videoId,
                    sid: showid,
                    type: e,
                    catid: catId
                })
            },
            callback: function() {
                if (null == info) return;
                try {
                    if ("object" != typeof info) info = JSON.parse(info)
                } catch (e) {
                    return
                }
                if (1 == window.paid && info.permission)
                    if (info.permission == -1) Interact.disableUpDowned();
                    else Interact.initUpDowned();
                else Interact.initUpDowned()
            }
        };
        var a = function(e) {
            num = e.toString();
            var t = Math.abs(num).toString();
            if (t.length < 4) return num;
            var i = "";
            if (num.indexOf(".") != -1) var i = "." + num.split(".")[1];
            var n = t.length;
            var a = n % 3;
            var o = [];
            var r = 0 == a ? 3 : a;
            o[0] = t.slice(0, r);
            var s = 1;
            while (r + 3 <= n) {
                o[s++] = t.slice(r, r + 3);
                r += 3
            }
            o = o.join(",");
            if (0 === num.indexOf("-")) o = "-" + o;
            return o + i
        };
        var o = {
            url: "Bad url, watch browser console error.",
            Local: window.Local,
            err: function(e) {
                if (!window["console"]) window["console"] = {
                    log: function() {},
                    clear: function() {},
                    debug: function() {},
                    error: function() {},
                    info: function() {},
                    count: function() {},
                    time: function() {},
                    trace: function() {},
                    warn: function() {}
                };
                if (window.console && window.console.error) window.console.error("[cdn function error] " + e + ".")
            },
            cdn: function(e, t) {
                if ("/" != e.charAt(0)) {
                    this.err("@param path: relative to root start by /");
                    return this.url
                }
                if (!this.Local) {
                    this.err("@see BETA-18932: template funciton {nova->globaJS}");
                    return this.url
                }
                var i = "RELEASE_TAG",
                    n = this.Local[i];
                if (!n) {
                    this.err("@see local: " + i + " not defined");
                    return this.url
                }
                i = t.toUpperCase() + "SERVER", server = this.Local[i];
                if (!server) {
                    this.err("@see local: " + i + " not defined.");
                    return this.url
                }
                if (!server.match(/^(http|https)/)) {
                    this.err("@see local: " + i + " is server, add protocol");
                    return this.url
                }
                if (server.match(/\/$/)) {
                    this.err("@see local: " + i + " is server, not ending by /");
                    return this.url
                }
                this.url = server + "/" + n + e;
                return this.url
            },
            cdn_jsurl: function(e) {
                return this.cdn(e, "js")
            },
            cdn_cssurl: function(e) {
                return this.cdn(e, "css")
            },
            cdn_imgurl: function(e) {
                return this.cdn(e, "img")
            }
        };
        var r = function(e) {
            if ("undefined" == typeof e || null == e || "null" == e || 0 == e.length) return "";
            return e.replace(/[<>&"]/g, function(e) {
                return {
                    "<": "&lt;",
                    ">": "&gt;",
                    "&": "&amp;",
                    '"': "&quot;"
                }[e]
            })
        };
        var s = function(e) {
            var t, i, n;
            var a, o;
            var r = [];
            i = e.length;
            t = 0;
            while (t < i) {
                n = e.charCodeAt(t++);
                switch (n >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        r.push(e.charAt(t - 1));
                        break;
                    case 12:
                    case 13:
                        a = e.charCodeAt(t++);
                        r.push(String.fromCharCode((31 & n) << 6 | 63 & a));
                        break;
                    case 14:
                        a = e.charCodeAt(t++);
                        o = e.charCodeAt(t++);
                        r.push(String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | (63 & o) << 0))
                }
            }
            return r.join("")
        };
        var l = function(e) {
            if (!e) return "";
            var t = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
            var i = "";
            var n, a, o;
            var r, l, d, c;
            var u = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                r = t.indexOf(e.charAt(u++));
                l = t.indexOf(e.charAt(u++));
                d = t.indexOf(e.charAt(u++));
                c = t.indexOf(e.charAt(u++));
                n = r << 2 | l >> 4;
                a = (15 & l) << 4 | d >> 2;
                o = (3 & d) << 6 | c;
                i += String.fromCharCode(n);
                if (64 != d) i += String.fromCharCode(a);
                if (64 != c) i += String.fromCharCode(o)
            } while (u < e.length);
            return s(i)
        };
        var d = function(e) {
            if (!e) return "";
            e = e.toString();
            var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var i = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            var n, a, o;
            var r, s, l;
            o = e.length;
            a = 0;
            n = "";
            while (a < o) {
                r = 255 & e.charCodeAt(a++);
                if (a == o) {
                    n += t.charAt(r >> 2);
                    n += t.charAt((3 & r) << 4);
                    n += "==";
                    break
                }
                s = e.charCodeAt(a++);
                if (a == o) {
                    n += t.charAt(r >> 2);
                    n += t.charAt((3 & r) << 4 | (240 & s) >> 4);
                    n += t.charAt((15 & s) << 2);
                    n += "=";
                    break
                }
                l = e.charCodeAt(a++);
                n += t.charAt(r >> 2);
                n += t.charAt((3 & r) << 4 | (240 & s) >> 4);
                n += t.charAt((15 & s) << 2 | (192 & l) >> 6);
                n += t.charAt(63 & l)
            }
            return n
        };
        var c = function(e) {
            if (!e) return "";
            if (e << 2 > 0) var t = "U" + d(e << 2);
            else var t = "U" + d(4 * e);
            return t
        };
        var u = function() {
            var e = "";
            var t = document.cookie.split(";");
            var i = arguments.length;
            for (var n = 0; n < t.length; n++) {
                var a = t[n];
                while (" " == a.charAt(0)) a = a.substring(1, a.length);
                if (0 == a.indexOf("u=") || 0 == a.indexOf("k=")) var o = a;
                if (0 == a.indexOf("_l_lgi=")) var r = a;
                if (0 == a.indexOf("yktk=")) {
                    var s = l(decodeURIComponent(a).split("|")[3]);
                    if (s.indexOf(",") > -1 && s.indexOf("nn:") > -1 && s.indexOf("id:") > -1) {
                        var e = s.split(",")[1].split(":")[1];
                        var d = s.split(",")[0].split(":")[1];
                        if ("" != e) break
                    }
                }
            }
            if ("" == e || "" == d) {
                if (o) {
                    var e = o.substring(2, o.length);
                    if ("__LOGOUT__" == e) e = "";
                    else e = decodeURIComponent(e)
                }
                if (r) var d = r.substring(7, r.length)
            }
            if (0 == i) return "" == e ? "" : e;
            else if (1 == i && "all" == arguments[0]) return {
                username: e,
                userid: d
            }
        };
        var f = function(e, t) {
            var i = $("#" + e)[0];
            i.select();
            try {
                therange = void 0;
                if (1 == PageConfig.copytoclip) {
                    if (i.createTextRange) therange = i.createTextRange();
                    therange = therange ? therange : document;
                    if (therange.execCommand("Copy")) {
                        if (false != t) alert("���Ƴɹ�������������ճ����Ctrl+v����Blog ��BBS���ˡ�");
                        return
                    }
                }
            } catch (n) {}
            alert("��ʹ�õ��������֧�ִ˸��ƹ��ܣ���ʹ��Ctrl+C������Ҽ���")
        };
        var p = function(e) {
            return t(e);

            function t(e) {
                var t = "";
                var n = "";
                n = i(e);
                return n
            }

            function i(e) {
                var t = false;
                var i = "";
                while (!t) {
                    i = n(20);
                    hstr = e + i;
                    hashcash = a(hstr);
                    if ("00" == hashcash.substring(0, 2)) t = true
                }
                return i
            }

            function n(e) {
                var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var i = "";
                for (var n = 0; n < e; n++) {
                    var a = Math.floor(Math.random() * t.length);
                    i += t.substring(a, a + 1)
                }
                return i
            }

            function a(e) {
                function t(e, t) {
                    var i = e << t | e >>> 32 - t;
                    return i
                }

                function i(e) {
                    var t = "";
                    var i;
                    var n;
                    var a;
                    for (i = 0; i <= 6; i += 2) {
                        n = 15 & e >>> 4 * i + 4;
                        a = 15 & e >>> 4 * i;
                        t += n.toString(16) + a.toString(16)
                    }
                    return t
                }

                function n(e) {
                    var t = "";
                    var i;
                    var n;
                    for (i = 7; i >= 0; i--) {
                        n = 15 & e >>> 4 * i;
                        t += n.toString(16)
                    }
                    return t
                }

                function a(e) {
                    e = e.replace(/\r\n/g, "\n");
                    var t = "";
                    for (var i = 0; i < e.length; i++) {
                        var n = e.charCodeAt(i);
                        if (n < 128) t += String.fromCharCode(n);
                        else if (n > 127 && n < 2048) {
                            t += String.fromCharCode(192 | n >> 6);
                            t += String.fromCharCode(128 | 63 & n)
                        } else {
                            t += String.fromCharCode(224 | n >> 12);
                            t += String.fromCharCode(128 | 63 & n >> 6);
                            t += String.fromCharCode(128 | 63 & n)
                        }
                    }
                    return t
                }
                var o;
                var r, s;
                var l = new Array(80);
                var d = 1732584193;
                var c = 4023233417;
                var u = 2562383102;
                var f = 271733878;
                var p = 3285377520;
                var h, m, v, g, y;
                var _;
                e = a(e);
                var b = e.length;
                var k = new Array;
                for (r = 0; r < b - 3; r += 4) {
                    s = e.charCodeAt(r) << 24 | e.charCodeAt(r + 1) << 16 | e.charCodeAt(r + 2) << 8 | e.charCodeAt(r + 3);
                    k.push(s)
                }
                switch (b % 4) {
                    case 0:
                        r = 2147483648;
                        break;
                    case 1:
                        r = 8388608 | e.charCodeAt(b - 1) << 24;
                        break;
                    case 2:
                        r = 32768 | (e.charCodeAt(b - 2) << 24 | e.charCodeAt(b - 1) << 16);
                        break;
                    case 3:
                        r = 128 | (e.charCodeAt(b - 3) << 24 | e.charCodeAt(b - 2) << 16 | e.charCodeAt(b - 1) << 8)
                }
                k.push(r);
                while (14 != k.length % 16) k.push(0);
                k.push(b >>> 29);
                k.push(4294967295 & b << 3);
                for (o = 0; o < k.length; o += 16) {
                    for (r = 0; r < 16; r++) l[r] = k[o + r];
                    for (r = 16; r <= 79; r++) l[r] = t(l[r - 3] ^ l[r - 8] ^ l[r - 14] ^ l[r - 16], 1);
                    h = d;
                    m = c;
                    v = u;
                    g = f;
                    y = p;
                    for (r = 0; r <= 19; r++) {
                        _ = 4294967295 & t(h, 5) + (m & v | ~m & g) + y + l[r] + 1518500249;
                        y = g;
                        g = v;
                        v = t(m, 30);
                        m = h;
                        h = _
                    }
                    for (r = 20; r <= 39; r++) {
                        _ = 4294967295 & t(h, 5) + (m ^ v ^ g) + y + l[r] + 1859775393;
                        y = g;
                        g = v;
                        v = t(m, 30);
                        m = h;
                        h = _
                    }
                    for (r = 40; r <= 59; r++) {
                        _ = 4294967295 & t(h, 5) + (m & v | m & g | v & g) + y + l[r] + 2400959708;
                        y = g;
                        g = v;
                        v = t(m, 30);
                        m = h;
                        h = _
                    }
                    for (r = 60; r <= 79; r++) {
                        _ = 4294967295 & t(h, 5) + (m ^ v ^ g) + y + l[r] + 3395469782;
                        y = g;
                        g = v;
                        v = t(m, 30);
                        m = h;
                        h = _
                    }
                    d = 4294967295 & d + h;
                    c = 4294967295 & c + m;
                    u = 4294967295 & u + v;
                    f = 4294967295 & f + g;
                    p = 4294967295 & p + y
                }
                var _ = n(d) + n(c) + n(u) + n(f) + n(p);
                return _.toLowerCase()
            }
        };
        return {
            smoothScroll: e,
            getVideoPageInfo: n,
            numberFormat: a,
            cdn: o,
            html2Escape: r,
            supportStyle: t,
            get_username: u,
            decode64: l,
            encodeUid: c,
            hcbt: p,
            empty: i,
            copyToClipboard: f
        }
    });
    define("page/find/player/view/stars", ["tui/view", "tui/art", "tui/common", "tui/lazyImageLoader", "page/find/player/model/listall", "tui/slide2", "tui/util/str"], function(e, t, i, n, a, o, r) {
        "use strict";
        return e.extend({
            initialize: function(e) {
                this._model = new a;
                this.modelEvents(this._model, "model");
                this._model.getStar({
                    vid: PageConfig.videoId,
                    showid: PageConfig.showid,
                    cid: PageConfig.catId
                })
            },
            events: {
                "mouseenter .head_tab>li": "switchTab",
                "click .tab-h ul>li": "switchTab2"
            },
            switchTab2: function(e) {
                var t = $(e.currentTarget);
                if (t.hasClass("current")) return;
                t.addClass("current").siblings("li").removeClass("current");
                this.toggleTabc(t.attr("personid"), t.attr("index"))
            },
            switchTab: function(e) {
                var t = this;
                var i = $(e.currentTarget);
                if (i.hasClass("current")) return;
                var n = i.attr("personid");
                i.addClass("current").siblings("li").removeClass("current");
                var a = t.find('.tab-h ul[personid="' + n + '"]');
                a.show().siblings(".tab-h ul").hide();
                a.find("li").removeClass("current").eq(0).addClass("current");
                t.toggleTabc(n)
            },
            toggleTabc: function(e, t) {
                var i = this.find('.tab-c[personid="' + e + '"]');
                i.eq(t || 0).show().siblings(".tab-c").hide();
                i.find(".modPSlide").trigger("slider:show")
            },
            "{model} getStar:success": function(e) {
                var a = this;
                var s = '\n<div class="mod modSwitch"  mid=\'005\'>\n<h2>������� </h2>\n<div class="h">\n<!-- ��Ա -->\n<ul class="head_tab">\n<% data.forEach(function(t, i){%> \n<li class="<%=(i=== 0 ? \'current\': \'\')%> <%=(i==4?\'last\':\'\')%>" personid="<%=t.personid%>">\n<div class="pic">\n<a href="<%=t.starUrl%>" target="_blank"><img class="lazyImg" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif"></a>\n</div>\n<ul class="info">\n<li class="name">\n<a href="<%=t.starUrl%>" title="<%=t.personname%>" target="_blank"><%=t.personname%></a>\n</li>            \n<%if(t.character.length){%>\n<li class="area" title="<%=t.character%>">\n<%=t.character%>\n</li>\n<%}%>\n</ul>\n</li>\n<%})%>  \n</ul>\n<div class="clear"></div>\n</div>\n<div class="c">\n<% data.forEach(function(star,i1){ %> \n<% star.showes.forEach(function(ul, i2){ %> \n<%if(i1==0 && i2==0) {%>\n<div class="tab-c" style="display: block;"  personid="<%=star.personid%>">\n<%}else {%>\n<div class="tab-c" style="display: none;"  personid="<%=star.personid%>">\n<%}%>\n<div name="m_pos" id="m_star<%=i1%><%=i2%>" modshow="1">\n<div class="yk-row yk-row-sm">\n<div class="modPSlide mod_pslide " id="mdstar<%=i1%><%=i2%>">\n<div class="mbtn prev" style="display: none;">\n<a href="#" class="iconfont" title="��һ��"></a>\n</div>\n<div class="mbtn next" style="display: block;">\n<a href="#" class="iconfont" title="��һ��"></a>\n</div>\n<ul class="panel" style="left: 0px;">   \n<% ul.forEach(function(t, i){ %> \n<li class="yk-col4" data-sn="<%=i2%>-<%=i%>">\n<div class="yk-pack pack-film">\n<div class="p-thumb">\n<a href="<%=t.url%>"  title="<%=t.name%>"  target="_blank"></a>\n<i class="bg"></i>\n<%if(i< 10){%>\n<img class="lazyImg" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}else{%>\n<img class="lazyLoad" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}%>\n<!-- ��Ա��ȯ -->\n<%if ((t.paid == "1" || t.paid == "2" ) && t.showid != \'60327\') {%>\n<%var rttext = t.paid == "1" ? "��Ա���" : "��Ա��ȯ";%>\n<div class="p-thumb-tagrt">\n<span class="vip-free"><%=rttext%></span>\n</div>\n<%}%>\n</div>  \n<!-- ���� -->\n<ul class="info-list">\n<li class="title short-title">\n<%  var title = t.name;\nif (title.length > 17) \ntitle = title.substring(0, 17) + \'...\';%>\n<a href="<%=t.url%>" target="_blank" ><%=title%></a>\n</li>\n<% if (t.desc){ %>                \n<li class="subtitle">\n<%  var subtitle = t.desc;\nif (subtitle.length > 17) \nsubtitle = subtitle.substring(0, 17) + \'...\';%>\n<span><%=subtitle%></span>\n</li>\n<%}%>\n</ul>\n</div>\n</li>\n<%})%> \n</ul>\n</div>\n</div>\n</div>\n</div>\n<%})%> \n<%})%> \n</div>\n</div>';
                var l = t.compile(s)({
                    data: e.stars,
                    searchDomain: a.searchDomain,
                    youku_homeurl: PageConfig.youku_homeurl,
                    encodeUid: i.encodeUid,
                    str: r,
                    encodeURI: encodeURI,
                    numberFormat: i.numberFormat
                });
                if (l) {
                    a.$el.html(l);
                    o(a.$el);
                    setTimeout(function() {
                        n({
                            imgs: a.find(".lazyImg"),
                            size: 150
                        })
                    }, 500)
                }
            },
            "{model} getStar:fail": function() {
                this.trigger("getStar:fail")
            }
        })
    });
    define("page/find/player/view/statistics", ["tui/net", "tui/util/throttle"], function(e, t) {
        var i = {
            "001": {
                mid: "001",
                mname: "title_area"
            },
            "002": {
                mid: "002",
                mname: "interact"
            },
            "003": {
                mid: "003",
                mname: "subscribe"
            },
            "004": {
                mid: "004",
                mname: "recshow"
            },
            "005": {
                mid: "005",
                mname: "starrec"
            },
            "006": {
                mid: "006",
                mname: "comment"
            },
            "009": {
                mid: "009",
                mname: "relatedshows"
            },
            "007": {
                mid: "007",
                mname: "playlist"
            },
            "013": {
                mid: "013",
                mname: "related_episode"
            },
            "015": {
                mid: "015",
                mname: "description"
            },
            7004: {
                mid: "7004",
                mname: "vipinfo"
            },
            1001: {
                mid: "1001",
                mname: "showcase"
            },
            1002: {
                mname: "target",
                mid: "1002"
            }
        };
        var n = {
            opt: {
                playmode: PageConfig.playmode,
                catid: PageConfig.catId,
                spm: "a2h0j.11185381"
            },
            init: function() {
                var e = this;
                if (window.goldlog) this.opt.spm = goldlog.spm_ab.join(".");
                this.checkShow();
                $(document).bind("goldlog:exp", function(t) {
                    e.checkShow(t)
                });
                $(window).bind("scroll", t(this.checkShow.bind(this), 300));
                $(document).on("mousedown", "a,input,button", function(t) {
                    var n, a, o, r, s;
                    n = $(t.target);
                    a = n.closest("[mid]");
                    if (!a.length) return;
                    s = n.closest("[data-sn]");
                    r = a.attr("mid");
                    o = i[r] || {};
                    o.mid_sn = s.length ? s.data("sn") : -1;
                    o = $.extend(e.opt, o);
                    e.clickLog(o)
                })
            },
            checkShow: function(e, t) {
                var n = this;
                if (!t) t = $("body");
                $("[mid]", t).each(function() {
                    var e = $(this),
                        t, a;
                    if (!n.checkPosition(e)) return;
                    t = $(this).attr("mid");
                    n.showLog($.extend(n.opt, i[t]));
                    e.attr("modShow", 1)
                })
            },
            showLog: function(e) {
                (window.goldlog_queue || (window.goldlog_queue = [])).push({
                    action: "goldlog.record",
                    arguments: ["/yt/show.index.module", "EXP", $.param(e), "H1478724911"]
                })
            },
            clickLog: function(e) {
                (window.goldlog_queue || (window.goldlog_queue = [])).push({
                    action: "goldlog.record",
                    arguments: ["/yt/click.index.module", "CLK", $.param(e), "H1478724911"]
                })
            },
            checkPosition: function(e) {
                if (!e.is(":visible") || e.attr("modshow") || !e.height() || $(window).height() + $(document).scrollTop() < e.offset().top) return false;
                return true
            }
        };
        return n
    });
    define("tui/encrypt/md5", [], function() {
        function e(e, t) {
            var r = e[0],
                s = e[1],
                l = e[2],
                d = e[3];
            r = i(r, s, l, d, t[0], 7, -680876936);
            d = i(d, r, s, l, t[1], 12, -389564586);
            l = i(l, d, r, s, t[2], 17, 606105819);
            s = i(s, l, d, r, t[3], 22, -1044525330);
            r = i(r, s, l, d, t[4], 7, -176418897);
            d = i(d, r, s, l, t[5], 12, 1200080426);
            l = i(l, d, r, s, t[6], 17, -1473231341);
            s = i(s, l, d, r, t[7], 22, -45705983);
            r = i(r, s, l, d, t[8], 7, 1770035416);
            d = i(d, r, s, l, t[9], 12, -1958414417);
            l = i(l, d, r, s, t[10], 17, -42063);
            s = i(s, l, d, r, t[11], 22, -1990404162);
            r = i(r, s, l, d, t[12], 7, 1804603682);
            d = i(d, r, s, l, t[13], 12, -40341101);
            l = i(l, d, r, s, t[14], 17, -1502002290);
            s = i(s, l, d, r, t[15], 22, 1236535329);
            r = n(r, s, l, d, t[1], 5, -165796510);
            d = n(d, r, s, l, t[6], 9, -1069501632);
            l = n(l, d, r, s, t[11], 14, 643717713);
            s = n(s, l, d, r, t[0], 20, -373897302);
            r = n(r, s, l, d, t[5], 5, -701558691);
            d = n(d, r, s, l, t[10], 9, 38016083);
            l = n(l, d, r, s, t[15], 14, -660478335);
            s = n(s, l, d, r, t[4], 20, -405537848);
            r = n(r, s, l, d, t[9], 5, 568446438);
            d = n(d, r, s, l, t[14], 9, -1019803690);
            l = n(l, d, r, s, t[3], 14, -187363961);
            s = n(s, l, d, r, t[8], 20, 1163531501);
            r = n(r, s, l, d, t[13], 5, -1444681467);
            d = n(d, r, s, l, t[2], 9, -51403784);
            l = n(l, d, r, s, t[7], 14, 1735328473);
            s = n(s, l, d, r, t[12], 20, -1926607734);
            r = a(r, s, l, d, t[5], 4, -378558);
            d = a(d, r, s, l, t[8], 11, -2022574463);
            l = a(l, d, r, s, t[11], 16, 1839030562);
            s = a(s, l, d, r, t[14], 23, -35309556);
            r = a(r, s, l, d, t[1], 4, -1530992060);
            d = a(d, r, s, l, t[4], 11, 1272893353);
            l = a(l, d, r, s, t[7], 16, -155497632);
            s = a(s, l, d, r, t[10], 23, -1094730640);
            r = a(r, s, l, d, t[13], 4, 681279174);
            d = a(d, r, s, l, t[0], 11, -358537222);
            l = a(l, d, r, s, t[3], 16, -722521979);
            s = a(s, l, d, r, t[6], 23, 76029189);
            r = a(r, s, l, d, t[9], 4, -640364487);
            d = a(d, r, s, l, t[12], 11, -421815835);
            l = a(l, d, r, s, t[15], 16, 530742520);
            s = a(s, l, d, r, t[2], 23, -995338651);
            r = o(r, s, l, d, t[0], 6, -198630844);
            d = o(d, r, s, l, t[7], 10, 1126891415);
            l = o(l, d, r, s, t[14], 15, -1416354905);
            s = o(s, l, d, r, t[5], 21, -57434055);
            r = o(r, s, l, d, t[12], 6, 1700485571);
            d = o(d, r, s, l, t[3], 10, -1894986606);
            l = o(l, d, r, s, t[10], 15, -1051523);
            s = o(s, l, d, r, t[1], 21, -2054922799);
            r = o(r, s, l, d, t[8], 6, 1873313359);
            d = o(d, r, s, l, t[15], 10, -30611744);
            l = o(l, d, r, s, t[6], 15, -1560198380);
            s = o(s, l, d, r, t[13], 21, 1309151649);
            r = o(r, s, l, d, t[4], 6, -145523070);
            d = o(d, r, s, l, t[11], 10, -1120210379);
            l = o(l, d, r, s, t[2], 15, 718787259);
            s = o(s, l, d, r, t[9], 21, -343485551);
            e[0] = f(r, e[0]);
            e[1] = f(s, e[1]);
            e[2] = f(l, e[2]);
            e[3] = f(d, e[3])
        }

        function t(e, t, i, n, a, o) {
            t = f(f(t, e), f(n, o));
            return f(t << a | t >>> 32 - a, i)
        }

        function i(e, i, n, a, o, r, s) {
            return t(i & n | ~i & a, e, i, o, r, s)
        }

        function n(e, i, n, a, o, r, s) {
            return t(i & a | n & ~a, e, i, o, r, s)
        }

        function a(e, i, n, a, o, r, s) {
            return t(i ^ n ^ a, e, i, o, r, s)
        }

        function o(e, i, n, a, o, r, s) {
            return t(n ^ (i | ~a), e, i, o, r, s)
        }

        function r(t) {
            if (/[\x80-\xFF]/.test(t)) t = unescape(encodeURI(t));
            txt = "";
            var i = t.length,
                n = [1732584193, -271733879, -1732584194, 271733878],
                a;
            for (a = 64; a <= t.length; a += 64) e(n, s(t.substring(a - 64, a)));
            t = t.substring(a - 64);
            var o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (a = 0; a < t.length; a++) o[a >> 2] |= t.charCodeAt(a) << (a % 4 << 3);
            o[a >> 2] |= 128 << (a % 4 << 3);
            if (a > 55) {
                e(n, o);
                for (a = 0; a < 16; a++) o[a] = 0
            }
            o[14] = 8 * i;
            e(n, o);
            return n
        }

        function s(e) {
            var t = [],
                i;
            for (i = 0; i < 64; i += 4) t[i >> 2] = e.charCodeAt(i) + (e.charCodeAt(i + 1) << 8) + (e.charCodeAt(i + 2) << 16) + (e.charCodeAt(i + 3) << 24);
            return t
        }
        var l = "0123456789abcdef".split("");

        function d(e) {
            var t = "",
                i = 0;
            for (; i < 4; i++) t += l[15 & e >> 8 * i + 4] + l[15 & e >> 8 * i];
            return t
        }

        function c(e) {
            for (var t = 0; t < e.length; t++) e[t] = d(e[t]);
            return e.join("")
        }

        function u(e) {
            return c(r(e))
        }

        function f(e, t) {
            return 4294967295 & e + t
        }
        return u
    });
    define("page/find/player/dmpool/model", [], function() {
        var e = "//service.danmu.youku.com";
        return {
            load: function(e) {
                var t = 0;
                var i = e.success;
                var n = e.error;
                delete e.success;
                delete e.error;
                e.success = function(t) {
                    if (!t) {
                        e.error();
                        return
                    }
                    i && i.apply(this, Array.prototype.slice.call(arguments))
                };
                e.error = function(i) {
                    t++;
                    if (t <= 0) $.ajax(e);
                    else n && n.apply(this, Array.prototype.slice.call(arguments))
                };
                e.cache = "undefined" === typeof e.cache || e.cache;
                $.ajax(e)
            },
            getStarWordsList: function(t, i) {
                this.load({
                    url: e + "/getStarWordsList",
                    data: t,
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function(e) {
                        i && i(e)
                    }
                })
            },
            getPool: function(t, i) {
                this.load({
                    url: e + "/pool",
                    data: t,
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function(e) {
                        i && i(e)
                    }
                })
            },
            getInfo: function(t, i) {
                this.load({
                    url: e + "/pool/info",
                    data: t,
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function(e) {
                        i && i(e)
                    }
                })
            },
            getUlist: function(t, i) {
                this.load({
                    url: e + "/ulist",
                    data: t,
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function(e) {
                        i && i(e)
                    }
                })
            },
            getReport: function(t, i) {
                this.load({
                    url: e + "/report?ct=1001&ver=1",
                    data: t,
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function(e) {
                        i && i(e)
                    }
                })
            },
            getdelDmByOwner: function(t, i) {
                this.load({
                    url: e + "/delDmByOwner",
                    data: t,
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function(e) {
                        i && i(e)
                    }
                })
            },
            getdel: function(t, i) {
                this.load({
                    url: e + "/del",
                    data: t,
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function(e) {
                        i && i(e)
                    }
                })
            },
            encodeUid: function(e) {
                var t = this;
                if (!e) return "";
                if (e << 2 > 0) var i = "U" + this.encode64(e << 2);
                else var i = "U" + this.encode64(4 * e);
                return i
            },
            encode64: function(e) {
                var t = this;
                if (!e) return "";
                e = e.toString();
                var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var n = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
                var a, o, r;
                var s, l, d;
                r = e.length;
                o = 0;
                a = "";
                while (o < r) {
                    s = 255 & e.charCodeAt(o++);
                    if (o == r) {
                        a += i.charAt(s >> 2);
                        a += i.charAt((3 & s) << 4);
                        a += "==";
                        break
                    }
                    l = e.charCodeAt(o++);
                    if (o == r) {
                        a += i.charAt(s >> 2);
                        a += i.charAt((3 & s) << 4 | (240 & l) >> 4);
                        a += i.charAt((15 & l) << 2);
                        a += "=";
                        break
                    }
                    d = e.charCodeAt(o++);
                    a += i.charAt(s >> 2);
                    a += i.charAt((3 & s) << 4 | (240 & l) >> 4);
                    a += i.charAt((15 & l) << 2 | (192 & d) >> 6);
                    a += i.charAt(63 & d)
                }
                return a
            }
        }
    });
    define("tui/easing2", [], function(e, t) {
        jQuery.easing["jswing"] = jQuery.easing["swing"];
        jQuery.extend(jQuery.easing, {
            easeOutCubic: function(e, t, i, n, a) {
                t /= a;
                t--;
                return n * (t * t * t + 1) + i
            },
            easeOutQuart: function(e, t, i, n, a) {
                t /= a;
                t--;
                return -n * (t * t * t * t - 1) + i
            },
            easeOutQuint: function(e, t, i, n, a) {
                t /= a;
                t--;
                return n * (t * t * t * t * t + 1) + i
            },
            easeOutCirc: function(e, t, i, n, a) {
                t /= a;
                t--;
                return n * Math.sqrt(1 - t * t) + i
            },
            easeOutSine: function(e, t, i, n, a) {
                return n * Math.sin(t / a * (Math.PI / 2)) + i
            },
            easeOutExpo: function(e, t, i, n, a) {
                return n * (-Math.pow(2, -10 * t / a) + 1) + i
            },
            mcsEaseOut: function(e, t, i, n, a) {
                var o = (t /= a) * t,
                    r = o * t;
                return i + n * (.499999999999997 * r * o + -2.5 * o * o + 5.5 * r + -6.5 * o + 4 * t)
            },
            draggerRailEase: function(e, t, i, n, a) {
                t /= a / 2;
                if (t < 1) return n / 2 * t * t * t + i;
                t -= 2;
                return n / 2 * (t * t * t + 2) + i
            }
        })
    });
    define("tui/scrollbar2", ["tui/event", "tui/drag", "tui/art", "tui/easing2"], function(e, t, i) {
        var n = e.extend({
            initialize: function(e, a) {
                a = a || {};
                n.superClass.initialize.apply(this, arguments);
                var o = this;
                var r = {
                    horizontalScroll: false,
                    horizontalMaxSize: 1e5,
                    prefix: "",
                    autoHide: true,
                    targetNode: null,
                    renderMethod: "after",
                    barContainerNode: null,
                    animate: false,
                    duration: 950,
                    easing: "mcsEaseOut",
                    arrowEnable: false,
                    arrowDelta: 60,
                    arrowPrevNode: null,
                    arrowNextNode: null,
                    draggerNode: null,
                    draggerMaxLength: null,
                    draggerMinLength: 60,
                    draggerAutoLength: true,
                    trackEnable: true,
                    trackNode: null,
                    mouseWheelEnable: true,
                    mouseWheelDelta: 30,
                    keyPressEnable: false,
                    keyPressDelta: 60
                };
                $.extend(true, o, r, a);
                $.extend(true, o, {
                    arrowAnimate: {
                        enable: o.animate,
                        duration: o.duration,
                        easing: o.easing
                    },
                    mouseWheelAnimate: {
                        enable: o.animate,
                        duration: o.duration,
                        easing: o.easing
                    },
                    draggerAnimate: {
                        enable: o.animate,
                        duration: o.duration,
                        easing: o.easing
                    },
                    trackAnimate: {
                        enable: o.animate,
                        duration: o.duration,
                        easing: o.easing
                    },
                    keyPressAnimate: {
                        enable: o.animate,
                        duration: o.duration,
                        easing: o.easing
                    }
                }, a);
                var s = $(e);
                var l = o.prefix && "" != o.prefix ? o.prefix + "_" : "";
                var d = o.barContainerNode ? $(o.barContainerNode) : $(i.compile(a.template || '<div class="<%=prefix%>scrollbar_container"><a class="<%=prefix%>scrollbar_prev" href="#"><i></i></a><div class="<%=prefix%>scrollbar_track"><span class="<%=prefix%>scrollbar_dragger"></span></div><a class="<%=prefix%>scrollbar_next" href="#"><i></i></a></div>')({
                    prefix: l
                }));
                var c = o.draggerNode ? $(o.draggerNode) : d.find("." + l + "scrollbar_dragger");
                var u = o.trackNode ? $(o.trackNode) : d.find("." + l + "scrollbar_track");
                var f = o.arrowPrevNode ? $(o.arrowPrevNode) : d.find("." + l + "scrollbar_prev");
                var p = o.arrowNextNode ? $(o.arrowNextNode) : d.find("." + l + "scrollbar_next");
                var h = o.targetNode || s;
                if (!o.barContainerNode) h[o.renderMethod](d);
                var m = new t(c, {
                    limit: true
                });
                m.bind("drag:move", function(e, t) {
                    o.scrollTo(o.horizontalScroll ? e : t, true, o.draggerAnimate)
                });
                s.bind("scroll", function(e) {
                    var t = s[o.horizontalScroll ? "scrollLeft" : "scrollTop"]();
                    o.trigger("scroll", [t]);
                    if (0 == t) o.trigger("scroll:head", [t]);
                    else if (t >= o._contentSize - o._containerSize) o.trigger("scroll:end", [t])
                });
                if (!o.arrowEnable) {
                    f.hide();
                    p.hide()
                } else {
                    var v;
                    f.mousedown(function(e) {
                        e.preventDefault();
                        o.scrollTo(o.getScrollPosition() - o.arrowDelta, false, o.arrowAnimate);
                        v = setTimeout(function() {
                            if (v) clearInterval(v);
                            v = setInterval(function() {
                                o.scrollTo(o.getScrollPosition() - o.arrowDelta, false, o.arrowAnimate)
                            }, 30)
                        }, 500)
                    }).mouseleave(function() {
                        if (v) clearInterval(v)
                    }).mouseup(function() {
                        if (v) clearInterval(v)
                    }).click(function(e) {
                        e.preventDefault()
                    });
                    p.mousedown(function(e) {
                        e.preventDefault();
                        o.scrollTo(o.getScrollPosition() + o.arrowDelta, false, o.arrowAnimate);
                        v = setTimeout(function() {
                            if (v) clearInterval(v);
                            v = setInterval(function() {
                                o.scrollTo(o.getScrollPosition() + o.arrowDelta, false, o.arrowAnimate)
                            }, 30)
                        }, 500)
                    }).mouseleave(function() {
                        if (v) clearInterval(v)
                    }).mouseup(function() {
                        if (v) clearInterval(v)
                    }).click(function(e) {
                        e.preventDefault()
                    })
                }
                if (o.mouseWheelEnable && /firefox/.test(navigator.userAgent.toLowerCase())) s[0].addEventListener("DOMMouseScroll", function(e) {
                    if (o._contentSize > o._containerSize) {
                        e.preventDefault();
                        var t = e.detail > 0 ? o.mouseWheelDelta : -o.mouseWheelDelta;
                        o.scrollTo(o.getScrollPosition() + t, false, o.mouseWheelAnimate)
                    }
                }, false);
                else if (o.mouseWheelEnable) s[0].onmousewheel = function(e) {
                    if (o._contentSize > o._containerSize) {
                        e = e || window.event;
                        var t = e.wheelDelta > 0 ? -o.mouseWheelDelta : o.mouseWheelDelta;
                        if (0 == e.wheelDelta) t = 0;
                        o.scrollTo(o.getScrollPosition() + t, false, o.mouseWheelAnimate);
                        e.returnValue = false;
                        return false
                    } else return true
                };
                if (o.trackEnable) {
                    c.mousedown(function(e) {
                        e.stopPropagation()
                    });
                    u.mousedown(function(e) {
                        e.preventDefault();
                        o.scrollTo(e[o.horizontalScroll ? "pageX" : "pageY"] - u.offset()[o.horizontalScroll ? "left" : "top"] - o._draggerSize / 2, true, o.trackAnimate)
                    })
                }
                if (o.keyPressEnable) s.css("outline", "none").attr("tabindex", "-1").keydown(function(e) {
                    var t = e.keyCode;
                    var i = o.getScrollPosition();
                    if (~"INPUT,TEXTAREA".indexOf(e.target.nodeName.toUpperCase())) return;
                    if (!~"38,39,36,40,37,35".indexOf(t)) return;
                    if ([38, 39, 36].indexOf(t) != -1 && 0 != i) e.preventDefault();
                    else if ([40, 37, 35].indexOf(t) != -1 && i != o._contentSize - o._containerSize) e.preventDefault();
                    switch (t) {
                        case 37:
                        case 38:
                            o.scrollTo(i - o.keyPressDelta, false, o.keyPressAnimate);
                            break;
                        case 39:
                        case 40:
                            o.scrollTo(i + o.keyPressDelta, false, o.keyPressAnimate);
                            break;
                        case 36:
                            o.scrollTo(0, false, o.keyPressAnimate);
                            break;
                        case 35:
                            o.scrollTo(o._contentSize - o._containerSize, false, o.keyPressAnimate)
                    }
                });
                o.container = s;
                o.barContainerNode = d;
                o.trackNode = u;
                o.arrowPrevNode = f;
                o.arrowNextNode = p;
                o.draggerNode = c;
                o._contentSize = 0;
                o._containerSize = 0;
                o._trackSize = 0;
                o._draggerSize = 0;
                o.update()
            },
            getScrollPosition: function() {
                return this.container[0][this.horizontalScroll ? "scrollLeft" : "scrollTop"]
            },
            scrollTo: function(e, t, i) {
                var n = this;
                var a = n.horizontalScroll;
                var o = t ? e : e * (n._trackSize - n._draggerSize) / (n._contentSize - n._containerSize);
                var r = !t ? e : (e * n._contentSize - e * n._containerSize) / (n._trackSize - n._draggerSize);
                o = Math.min(n._trackSize - n._draggerSize, Math.max(0, o));
                if (a) r = Math.min(r, n.horizontalMaxSize - n._containerSize);
                if (true === i || i && false !== i.enable) {
                    var s = {};
                    var l = {};
                    s[a ? "scrollLeft" : "scrollTop"] = r ? r : 0;
                    l[a ? "left" : "top"] = o;
                    if (true === i) i = {
                        duration: n.duration,
                        easing: n.easing
                    };
                    n.container.stop().animate(s, i);
                    n.draggerNode.stop().animate(l, i)
                } else {
                    n.container[a ? "scrollLeft" : "scrollTop"](r ? r : 0);
                    n.draggerNode.css(a ? "left" : "top", o)
                }
            },
            scrollToElement: function(e, t) {
                e = $(e);
                t = t || {};
                var i = void 0 != t.animate ? t.animate : this.animate;
                var n = this.horizontalScroll;
                if (e.length) {
                    var a = this.container[n ? "scrollLeft" : "scrollTop"]() + e.offset()[n ? "left" : "top"] - this.container.offset()[n ? "left" : "top"];
                    if (t.pos) a -= t.pos;
                    this.scrollTo(a, false, i)
                }
            },
            update: function() {
                this.show();
                var e = this.horizontalScroll;
                this._trackSize = this.trackNode[e ? "innerWidth" : "innerHeight"]();
                this._containerSize = this.container[e ? "innerWidth" : "innerHeight"]();
                this._contentSize = this.container[0][e ? "scrollWidth" : "scrollHeight"];
                this._draggerSize = this.draggerNode[e ? "innerWidth" : "innerHeight"]();
                e && (this._contentSize = Math.min(this._contentSize, this.horizontalMaxSize));
                if (this._contentSize > this._containerSize) {
                    if (this.draggerAutoLength) {
                        this._draggerSize = Math.floor(this._containerSize * this._trackSize / this._contentSize);
                        if (this.draggerMinLength) this._draggerSize = Math.max(this._draggerSize, this.draggerMinLength);
                        if (this.draggerMaxLength) this._draggerSize = Math.min(this._draggerSize, this.draggerMaxLength);
                        this.draggerNode.css(e ? "width" : "height", this._draggerSize)
                    }
                    this.scrollTo(this.getScrollPosition(), false, self.animate)
                } else if (this.autoHide) this.hide()
            },
            show: function() {
                this.barContainerNode.show();
                this.trigger("show")
            },
            hide: function() {
                this.barContainerNode.hide();
                this.trigger("hide")
            }
        });
        return n
    });
    define("page/find/player/dmpool/staractivity", ["tui/view", "tui/art", "tui/scrollbar2", "page/find/player/dmpool/model", "module/responsive"], function(e, t, i, n, a) {
        var o = '<%for(var i = 0; i < onePageBslen; i++){%>\n<div class="item-one clearfix <%if(type && type==\'starpool\'){%>starpool-one<%}%>" data-uid="<%=list[i].uids%>" data-objid="<%=list[i].objId%>">\n<div class="list_len clearfix">\n<%if(type && type!=\'starpool\'){%><a class="time" href="javascript:ykPlyr.PlayerSeek(\'<%=list[i].seekTime%>\');" title="����ս���<%=list[i].timePoint%>"><%=list[i].timePoint%></a><%}%>\n<span class="idoln">\n<%var starst=false;%>\n<%for(var tag in utag){%>\n<%if(list[i].uids==utag[tag].uid || list[i].uids==utag[tag].xuid){ starst=true;%> \n<a href="http://i.youku.com/i/id_<%=utag[tag].uid%>" target="_blank"><img src="<%=utag[tag].headImg%>" class="idol-img"/><b class="idolname" title="<%=utag[tag].name%>"><%=utag[tag].name%></b></a>\n<%}%>\n<%}%>\n</span>\n<!--<span class="afterDelTxt">��ɾ��</span>-->\n<span class="item bsp-list-limitArea <%if(starst && type!=\'starpool\'){%>oneIdolList <%}%>" title="<%=list[i].listBsCont%>"><%=list[i].listBsCont%></span>\n</div>\n<div class="details"  title="<%=list[i].listBsCont%>"><p><%=list[i].listBsCont%></p></div>\n<div class="btnsframe">\n<%if(type && type==\'all\'){%><span class="comp-bs" data-objid="<%=list[i].objId%>">�ٱ�</span><%}%>\n<span  class="del-bs" data-objid="<%=list[i].objId%>" style="<%if(type && type==\'star\'){%>margin-right: 15px; <%}%><%if(isdz){%>display:block;<%}%>">ɾ��</span>\n</div>\n</div>\n<%}%>';
        var r = e.extend({
            initialize: function(e) {
                var t = this;
                t.utag = t.options.utag;
                for (var i in t.utag) t.utag[i].xuid = n.encodeUid(t.utag[i].uid);
                this.dmSatrLoad(t.options.starpoolPage)
            },
            dmSatrLoad: function(e) {
                var t = this;
                $("#bs_idol span:eq(0)").show().click();
                if (0 == e.statusSt) {
                    var i = '<div class="star_st1"><div style="margin-bottom: 10px;">' + e.description + '</div><div><img style="width:100%;" src="' + e.picurl + '"></div><div class="fix staractiveBtn"><a href="javascript:;" class="starFormBtn starFormshare dmnone" >�� ��</a> <a href="' + e.sharedPageUrl + '" class="starFormBtn starFormtie" target="_blank">ȥ����</a></div></div>';
                    $("#bsp-alllist-wrap0").html(i)
                } else if (1 == e.statusSt) {
                    var n = '<div class="star_st2"><div class="dmpolltxt">���ǵ�Ļ�����У����ϻ���</div><div class="dmpollicon"></div><div class="fix staractiveBtn"><a href="javascript:;" class="starFormBtn dmnone" >�� ��</a></div></div>';
                    $("#bsp-alllist-wrap0").html(n);
                    t.ScrollbarFn();
                    t.scrollupdate()
                }
            },
            dmSatradd: function(e) {
                var i = this;
                var n = [];
                for (var a in e) n.push({
                    listBsCont: e[a].content,
                    uids: e[a].uid,
                    objId: e[a].id,
                    timePoint: i.timeConver(e[a].playat),
                    seekTime: parseInt(e[a].playat / 1e3)
                });
                var r = {
                    list: n,
                    Varnext: 0,
                    onePageBslen: e.length
                };
                var s = false;
                $("#bsp-alllist-wrap0 .item-one").each(function(e) {
                    var t = $(this).attr("data-objid");
                    for (var i in n)
                        if (t == n[i].id) {
                            s = true;
                            return
                        }
                });
                if (s) return;
                var l = $.extend(r, {
                    type: "starpool",
                    uid: i.options.uid,
                    isdz: i.options.isdz,
                    utag: i.utag
                });
                $("#bsp-alllist-wrap0 .star_st2").hide();
                var d = t.compile(o)(l);
                $("#bsp-alllist-wrap0").append(d);
                i.$el.trigger("list:update0")
            },
            timeConver: function(e) {
                var t = e / 1e3;
                if (t < 3600) {
                    var i = parseInt(t / 60),
                        n = Math.floor(t % 60);
                    return (i >= 10 ? i : "0" + i) + ":" + (n >= 10 ? n : "0" + n)
                } else {
                    var a = parseInt(t / 3600),
                        o = parseInt(t % 3600 / 60),
                        r = Math.floor(t % 3600 % 60);
                    return (a >= 10 ? a : "0" + a) + ":" + (o >= 10 ? o : "0" + o) + ":" + (r >= 10 ? r : "0" + r)
                }
            },
            ScrollbarFn: function() {
                this.scroll = new i($(".scroller_pool", this.el).eq(0), {
                    draggerMinLength: 30
                })
            },
            scrollupdate: function() {
                var e = this;
                this.$el.bind("list:update0", function() {
                    e.scroll.update()
                });
                a.bind("player:responsive", function() {
                    e.scroll.update()
                })
            }
        });
        return r
    });
    define("page/find/player/dmpool/starlist", ["tui/view", "tui/art", "tui/scrollbar2", "page/find/player/dmpool/model", "module/responsive"], function(e, t, i, n, a) {
        var o = '<%for(var key in list){%>\n<%for(var i = 0; i < list[key].length; i++){%>\n<div class="item-one clearfix label<%=list[key][i].uids%>" data-uid="<%=list[key][i].uids%>" data-objid="<%=list[key][i].objId%>">\n<div class="list_len clearfix">\n<a class="time" href="javascript:ykPlyr.PlayerSeek(\'<%=list[key][i].seekTime%>\');" title="����ս���<%=list[key][i].timePoint%>"><%=list[key][i].timePoint%></a>\n<span class="idoln">\n<%var starst=false;%>\n<%for(var tag in utag){%>\n<%if(list[key][i].uids==utag[tag].uid){ starst=true;%> \n<a href="http://i.youku.com/i/id_<%=utag[tag].uid%>" target="_blank"><img src="<%=utag[tag].headImg%>" class="idol-img"/><b class="idolname" title="<%=utag[tag].name%>"><%=utag[tag].name%></b></a>\n<%}%>\n<%}%>\n</span>\n<!--<span class="afterDelTxt">��ɾ��</span>-->\n<span class="item bsp-list-limitArea <%if(starst){%>oneIdolList <%}%>" title="<%=list[key][i].listBsCont%>"><%=list[key][i].listBsCont%></span>\n</div>\n<div class="details"  title="<%=list[key][i].listBsCont%>"><p><%=list[key][i].listBsCont%></p></div>\n<div class="btnsframe">\n<%if(type && type==\'all\'){%><span class="comp-bs" data-objid="<%=list[key][i].objId%>">�ٱ�</span><%}%>\n<span  class="del-bs" data-objid="<%=list[key][i].objId%>" style="<%if(type && type==\'star\'){%>margin-right: 15px; <%}%> <%if(isdz){%>display:block;<%}%>">ɾ��</span>\n</div>\n</div>\n<%}%>\n<%}%>';
        var r = e.extend({
            initialize: function(e) {
                var t = this;
                var i = {
                    ct: "10001",
                    activityid: 401
                };
                this.load()
            },
            events: {
                "click #bs_idol1 span": "dm_tabFn"
            },
            timeConver: function(e) {
                var t = e / 1e3;
                if (t < 3600) {
                    var i = parseInt(t / 60),
                        n = Math.floor(t % 60);
                    return (i >= 10 ? i : "0" + i) + ":" + (n >= 10 ? n : "0" + n)
                } else {
                    var a = parseInt(t / 3600),
                        o = parseInt(t % 3600 / 60),
                        r = Math.floor(t % 3600 % 60);
                    return (a >= 10 ? a : "0" + a) + ":" + (o >= 10 ? o : "0" + o) + ":" + (r >= 10 ? r : "0" + r)
                }
            },
            load: function() {
                var e = this;
                if (e.options.utag.length > 0) {
                    var i = 0;
                    e.items = [];
                    for (var n = 0; n < e.options.utag.length; n++) e.getUlistFn(e.options.utag[n].uid, function(n) {
                        i++;
                        e._mergeItem(n.list);
                        if (i == e.options.utag.length) {
                            var a = $.extend({
                                type: "star",
                                uid: e.options.uid,
                                isdz: e.options.isdz
                            }, {
                                utag: e.options.utag,
                                list: e.items
                            });
                            var r = t.compile(o)(a);
                            $("#bsp-alllist-wrap2").append(r);
                            e.ScrollbarFn()
                        }
                    })
                }
            },
            _mergeItem: function(e) {
                var t = this;
                e.forEach(function(e, i) {
                    var n = e.seekTime;
                    t.items[n] || (t.items[n] = []);
                    t.items[n].push(e)
                })
            },
            getUlistFn: function(e, t) {
                $(".bs_loadImg_box").eq(2).addClass("bs_loadImg");
                var i = this;
                var a = {
                    iid: this.options.iid,
                    ct: 1001,
                    uid: e
                };
                var o = [];
                n.getUlist(a, function(e) {
                    for (var n = 0; n < e.result.length; n++) o.push({
                        listBsCont: e.result[n].content,
                        uids: e.result[n].uid,
                        objId: e.result[n].id,
                        timePoint: i.timeConver(e.result[n].playat),
                        seekTime: parseInt(e.result[n].playat / 1e3)
                    });
                    t({
                        list: o,
                        onePageBslen: e.result.length
                    });
                    $(".bs_loadImg_box").eq(2).removeClass("bs_loadImg")
                })
            },
            scrollupdate: function() {
                var e = this;
                this.$el.bind("list:update2", function() {
                    e.scroll.update()
                });
                a.bind("player:responsive", function() {
                    e.scroll.update()
                })
            },
            ScrollbarFn: function() {
                var e = this;
                var t = false;
                this.scroll = new i($(".scroller_pool", this.el).eq(2), {
                    draggerMinLength: 30
                })
            }
        });
        return r
    });
    define("page/find/player/dmpool/dmpool", ["tui/view", "tui/art", "tui/scrollbar2", "page/find/player/dmpool/model", "page/find/player/dmpool/starlist", "page/find/player/dmpool/staractivity", "module/login/login", "tui/encrypt/md5", "module/responsive"], function(e, t, i, n, a, o, r, s, l) {
        var d = '<div class="bspoolClose">������ص�Ļ�б�</div>\n<div class="bspoolTit">\n<div id="bs_selected_label_layer" onselectstart="return false">\n<div class="bs_idol_l clearfix" id="bs_idol">\n<%for(var i = 0; i < idols.length; i++){%>\n<span data-id="label<%=idols[i].uid%>" data-uid="<%=idols[i].uid%>" title="<%=idols[i].name%>"   <%if(idols[i].dis==0){%> style="display:none;"<%}%> <%if(idols[i].dis==1){%> class="active"<%}%> ><%=idols[i].name%></span>\n<%}%>\n<div class="bs_data" id="bs_data">\n����<%=totalCounts%>����\n</div>\n</div>\n</div>\n</div>\n<div class="scroll-area scroll-resize-height">\n<div class="scroller-box dmnone">\n<div class="scroller scroller_pool bsp-cont scroll-resize-height" >\n<div class="scroller-container">\n<div class="bsp-all-list hoverOneItem">\n<div id="bsp-alllist-wrap0">\n</div>\n<div class="bs_loadImg_box"></div>\n</div>\n</div>\n</div>\n</div>\n<div class="scroller-box">\n<div class="scroller scroller_pool bsp-cont scroll-resize-height">\n<div class="scroller-container">\n<div class="bsp-all-list hoverOneItem">\n<div id="bsp-alllist-wrap1">\n</div>\n<div class="bs_loadImg_box"></div>\n</div>\n</div>\n<%if(totalCounts == 0 && onePageBslen ==0){%>\n<div class="zerodm_show_bg"></div>\n<%}%>\n</div>\n</div>\n<div class="scroller-box dmnone">\n<div class="scroller scroller_pool bsp-cont scroll-resize-height " >\n<div class="scroller-container">\n<div class="bsp-all-list hoverOneItem">\n<div id="bsp-alllist-wrap2">\n</div>\n<div class="bs_loadImg_box"></div>\n</div>\n</div>\n</div>\n</div>\n</div>\n';
        var c = '<%for(var i = 0; i < onePageBslen; i++){%>\n<div class="item-one clearfix <%if(type && type==\'starpool\'){%>starpool-one<%}%>" data-uid="<%=list[i].uids%>" data-objid="<%=list[i].objId%>">\n<div class="list_len clearfix">\n<%if(type && type!=\'starpool\'){%><a class="time" href="javascript:ykPlyr.PlayerSeek(\'<%=list[i].seekTime%>\');" title="����ս���<%=list[i].timePoint%>"><%=list[i].timePoint%></a><%}%>\n<span class="idoln">\n<%var starst=false;%>\n<%for(var tag in utag){%>\n<%if(list[i].uids==utag[tag].uid || list[i].uids==utag[tag].xuid){ starst=true;%> \n<a href="http://i.youku.com/i/id_<%=utag[tag].uid%>" target="_blank"><img src="<%=utag[tag].headImg%>" class="idol-img"/><b class="idolname" title="<%=utag[tag].name%>"><%=utag[tag].name%></b></a>\n<%}%>\n<%}%>\n</span>\n<!--<span class="afterDelTxt">��ɾ��</span>-->\n<span class="item bsp-list-limitArea <%if(starst && type!=\'starpool\'){%>oneIdolList <%}%>" title="<%=list[i].listBsCont%>"><%=list[i].listBsCont%></span>\n</div>\n<div class="details"  title="<%=list[i].listBsCont%>"><p><%=list[i].listBsCont%></p></div>\n<div class="btnsframe">\n<%if(type && type==\'all\'){%><span class="comp-bs" data-objid="<%=list[i].objId%>">�ٱ�</span><%}%>\n<span  class="del-bs" data-objid="<%=list[i].objId%>" style="<%if(type && type==\'star\'){%>margin-right: 15px; <%}%><%if(isdz){%>display:block;<%}%>">ɾ��</span>\n</div>\n</div>\n<%}%>';
        var u = false;
        document.domain = "youku.com";
        var f = e.extend({
            initialize: function(e) {
                var t = this;
                this.options.uid = r.uid();
                this.options.ucode = r.ucode();
                this.options.isdz = PageConfig.videoOwner == this.options.uid ? true : false;
                t.starpoollist = [];
                this.arrlist = {
                    iid: e.iid,
                    ct: e.ct,
                    cid: e.cid,
                    ouid: 0,
                    lid: e.lid,
                    aid: e.aid,
                    type: 1
                };
                if (window.dmpollevent) {
                    window.dmpollevent.on("starpoolPage", function(e) {
                        console.log("���ǵ�Ļ������:", e);
                        t.starpoolPage = e
                    });
                    window.dmpollevent.on("addstarpool", function(e) {
                        console.log("������ǵ�Ļ:", e);
                        if (t.staractivity) t.staractivity.dmSatradd(e);
                        else t.starpoollist.push(e)
                    })
                }
                this.load()
            },
            events: {
                "click #bs_idol span": "dm_tabFn",
                "click .bspoolClose": "dm_closeFn",
                "mouseenter .scroller-box .item-one": "dm_itemFnin",
                "mouseleave .scroller-box .item-one": "dm_itemFnout",
                "click .scroller-box .del-bs": "dm_delFn",
                "click .scroller-box .comp-bs": "dm_comFn"
            },
            dm_closeFn: function(e) {
                var t = this;
                var i = $(e.currentTarget);
                this.$el.find("#bspoolBox").hide(200);
                $("#playerBox .yk_danmpoolOff").removeClass("on").find("span").text("��Ļ�б�δ����")
            },
            dm_delFn: function(e) {
                var t = this;
                var i = $(e.currentTarget);
                if (t.options.isdz) {
                    var a = {
                        uid: this.options.uid,
                        iid: t.options.iid,
                        ct: t.options.ct,
                        objId: i.attr("data-objid") || 0
                    };
                    n.getdel(a, function(e) {
                        console.log(e)
                    });
                    console.log("owenɾ��")
                } else console.log("�û�ɾ��")
            },
            dm_comFn: function(e) {
                var t = this;
                var i = $(e.currentTarget);
                if (!this.options.uid) r.login(function() {
                    if ("function" == typeof e) e()
                });
                var a = i.offset().top - 120,
                    o = i.offset().left - 70;
                var l = '<div class="comp-frame"  style="top: ' + a + "px;left: " + o + 'px;"><ul><li data-type="nosen" type="1">ˢ��/������</li><li data-type="nohor" type="2">����/����г</li><li data-type="spoiler" type="3">��͸/��</li><li data-type="adver" type="4">���/����</li></ul></div>';
                var d = i.parents(".item-one").attr("data-uid");
                var c = i.parents(".item-one").find(".details").text();
                if ($("body .comp-box").length <= 0) $('<div class="comp-box"></div>').appendTo($("body")[0]).html(l);
                else $("body .comp-box").html(l);
                $("body").find(".comp-frame").mouseleave(function(e) {
                    $("body").find(".comp-frame").remove()
                });
                $("body .comp-frame").find("li").on("click", function(e) {
                    var a = $(e.currentTarget);
                    $("body .comp-frame").hide();
                    var o = {
                        reason: a.text(),
                        type: a.attr("type"),
                        dmid: i.attr("data-objid"),
                        uid: t.options.uid,
                        iid: t.options.iid,
                        reportUid: d,
                        dmContent: c,
                        status: -5,
                        time: (new Date).getTime(),
                        sign: s("Ef9/4e4d^@g9a2M3g" + (new Date).getTime() + t.options.uid + t.options.uid + i.attr("data-objid"))
                    };
                    n.getReport(o, function(e) {
                        if (1 == e.code) {
                            t.$el.append('<div class="jubao" style="position:absolute;left:48%;top:48%;background:#000;border-radius:3px;padding:10px;z-index:9999999;color:#fff;">�ٱ��ɹ�</div>');
                            setTimeout(function(e) {
                                $(".jubao").fadeOut()
                            }, 3e3)
                        }
                    })
                })
            },
            dm_tabFn: function(e) {
                var t = this;
                var i = $(e.currentTarget);
                $("#bs_idol span").removeClass("active");
                i.addClass("active");
                var n = i.attr("data-uid");
                $(".scroller-box", this.el).removeClass("dmnone").hide().eq(n).show();
                if (2 == n && !t.Starlist && t.labeldata.utag.length > 0) t.Starlist = new a($.extend({}, t.options, t.labeldata))
            },
            dm_itemFnin: function(e) {
                var t = this;
                var i = $(e.currentTarget);
                i.addClass("showBtnsframe")
            },
            dm_itemFnout: function(e) {
                var t = this;
                var i = $(e.currentTarget);
                i.removeClass("showBtnsframe")
            },
            load: function() {
                var e = this;
                e.getInfoFn(function(t) {
                    e.labeldata = t;
                    e.render()
                })
            },
            render: function() {
                var e = this;
                this.getpoolFn(0, function(i) {
                    e.listdata = i;
                    var n = $.extend({
                        type: "all",
                        uid: e.options.uid,
                        isdz: e.options.isdz
                    }, i, e.labeldata);
                    e.$el.append('<div id="bspoolBox"></div>');
                    $("#bspoolBox").html(t.compile(d)(n)).show(200);
                    var a = t.compile(c)(n);
                    $("#bsp-alllist-wrap1").append(a);
                    e.ScrollbarFn();
                    e.scrollupdate();
                    e.dmSatrLoad()
                })
            },
            dmSatrLoad: function() {
                var e = this;
                if (e.starpoolPage && !e.staractivity && e.labeldata.utag.length > 0) {
                    e.staractivity = new o($.extend({
                        starpoolPage: e.starpoolPage
                    }, e.options, e.labeldata));
                    if (e.starpoollist.length > 0)
                        for (var t in e.starpoollist) e.staractivity.dmSatradd(e.starpoollist[t])
                }
            },
            scrollupdate: function() {
                var e = this;
                this.$el.bind("list:update1", function() {
                    e.scroll.update()
                });
                l.bind("player:responsive", function() {
                    e.scroll.update()
                })
            },
            getpoolFn: function(e, t) {
                var i = $.extend({}, this.arrlist, {
                    begin: e
                });
                $(".bs_loadImg_box").eq(1).addClass("bs_loadImg");
                var a;
                var o = this;
                var r = [];
                n.getPool(i, function(e) {
                    if (e.data.length > 0) {
                        for (var i = 0; i < e.data.length; i++) r.push({
                            listBsCont: e.data[i].content,
                            uids: e.data[i].uid,
                            objId: e.data[i].id,
                            timePoint: o.timeConver(e.data[i].playat),
                            seekTime: parseInt(e.data[i].playat / 1e3)
                        });
                        a = e.next;
                        $("#bspoolBox").data("mat", a)
                    }
                    $(".bs_loadImg_box").eq(1).removeClass("bs_loadImg");
                    t({
                        totalCounts: e.count,
                        list: r,
                        Varnext: a,
                        onePageBslen: e.data.length
                    })
                })
            },
            timeConver: function(e) {
                var t = e / 1e3;
                if (t < 3600) {
                    var i = parseInt(t / 60),
                        n = Math.floor(t % 60);
                    return (i >= 10 ? i : "0" + i) + ":" + (n >= 10 ? n : "0" + n)
                } else {
                    var a = parseInt(t / 3600),
                        o = parseInt(t % 3600 / 60),
                        r = Math.floor(t % 3600 % 60);
                    return (a >= 10 ? a : "0" + a) + ":" + (o >= 10 ? o : "0" + o) + ":" + (r >= 10 ? r : "0" + r)
                }
            },
            getInfoFn: function(e) {
                var t, i = [],
                    a;
                n.getInfo(this.arrlist, function(n) {
                    if (1 == n.code) {
                        t = n.count;
                        if (n.utag.length > 0) {
                            a = n.utag;
                            i.push({
                                name: "�Ǽݵ�",
                                uid: "0",
                                dis: "0"
                            });
                            i.push({
                                name: "ȫ��",
                                uid: "1",
                                dis: "1"
                            });
                            i.push({
                                name: "����",
                                uid: "2",
                                dis: "2"
                            })
                        } else i.push({
                            name: "��Ļ�б�",
                            uid: "1",
                            dis: "1"
                        })
                    } else console.log("iid����");
                    e({
                        utag: a,
                        totalCounts: t,
                        idols: i
                    })
                })
            },
            ScrollbarFn: function() {
                var e = this;
                var n = false;
                this.scroll = new i($(".scroller_pool", this.el).eq(1), {
                    draggerMinLength: 30
                });
                this.scroll.bind("scroll:end", function() {
                    if (n) return;
                    n = true;
                    setTimeout(function() {
                        n = false
                    }, 3e3);
                    var i = $("#bspoolBox").data("mat");
                    if (!!i) e.getpoolFn(i, function(i) {
                        var n = $.extend({
                            type: "all",
                            uid: e.options.uid,
                            isdz: e.options.isdz
                        }, i, e.labeldata);
                        var a = t.compile(c)(n);
                        $("#bsp-alllist-wrap1").append(a);
                        $("#bspoolBox").data("mat", i.Varnext);
                        e.$el.trigger("list:update1")
                    })
                })
            }
        });
        return f
    });
    define("page/find/player/dmpool/dmpoolLoad", ["page/find/player/dmpool/dmpool"], function(e) {
        return function t() {
            if (window.dmpollevent) window.dmpollevent.on("poolPage", function(t) {
                if (t.poolpage)
                    if ($("#bspoolBox").length <= 0) new e({
                        iid: PageConfig.videoId,
                        cid: PageConfig.catId,
                        ouid: PageConfig.videoOwner,
                        lid: PageConfig.folderId,
                        aid: PageConfig.showid,
                        ct: "1001",
                        el: $("#player_sidebar")
                    });
                    else $("#bspoolBox").show(200);
                else $("#bspoolBox").hide(200)
            })
        }
    });
    define("page/find/player/view/sub", ["tui/view", "tui/art", "tui/util/num", "module/login/login", "page/find/player/model/listall"], function(e, t, i, n, a) {
        var o = e.extend({
            el: $(".player-container"),
            initialize: function(e) {
                var t = this;
                if (!this.$el.length) return;
                this.mod = new a;
                this.mod.bind("getSubInfo:success", this.render.bind(this));
                this.mod.bind("sub:error", this.subError.bind(this));
                this.mod.bind("createSub:success", this.subedcb.bind(this));
                this.mod.bind("destroySub:success", this.unSubedcb.bind(this));
                t.locked = false;
                window.ykPlyr.bind("player:onPlayerStartUpdate", function() {
                    t.status()
                });
                $(document).bind("logchange", function() {
                    if (t.locked) return;
                    setTimeout(function() {
                        t.status()
                    }, 200)
                })
            },
            events: {
                "click .v-sub-action": "subed",
                "click .v-sub-done": "unsub"
            },
            status: function() {
                this.mod.getSubInfo({
                    vid: PageConfig.videoId,
                    ownerid: PageConfig.videoOwner_en,
                    showid: 0,
                    addtion: "1_1",
                    pm: PageConfig.playmode
                })
            },
            subed: function(e) {
                var t = this;
                if (t.locked) return;
                n.login(function() {
                    t.locked = true;
                    n.checkLogin(function() {
                        t.mod.createSub({
                            follow: PageConfig.videoOwner_en,
                            addtion: "1_1"
                        })
                    })
                })
            },
            unsub: function(e) {
                var t = this;
                if (t.locked) return;
                n.login(function() {
                    t.locked = true;
                    t.mod.destroySub({
                        follow: PageConfig.videoOwner_en,
                        addtion: "1_1"
                    })
                })
            },
            subedcb: function() {
                this.locked = false;
                $(".v-sub-action", this.$el).removeClass("v-sub-action").addClass("v-sub-done").html("�Ѷ���");
                window.YK_CPA && YK_CPA.trackReg()
            },
            unSubedcb: function() {
                this.locked = false;
                $(".v-sub-done", this.$el).removeClass("v-sub-done").addClass("v-sub-action").html("+����")
            },
            subError: function() {
                this.locked = false
            },
            render: function(e) {
                var a = this,
                    o, r;
                var s = '<%data.thumb=data.thumb||\'//static.youku.com/v1.0.153/user/img/head/64/999.jpg\'%>\n<dl class="dayu-info">\n<dt>\n<a href="<%=data.url%>" target="_blank" >\n<img src="<%=data.thumb%>">\n</a>\n</dt>\n<dd>\n<h2>		\n<a href="<%=data.url%>" class="sub-name" target="_blank"><%=data.title%></a>\n<%if(data.verified==1&&data.disable){%>\n<span class="dyh-icon"></span>\n<%}%>\n</h2>\n</dd>\n<dd><%=data.vvCount%>��Ƶ������ 	  <%=data.subcount%>��˿</dd>\n<dd>\n<%if(data.isSelf){%>\n<a class="create-center" target="_blank" href="//i.youku.com/u/creative_center">��������</a>\n<%}else{%>		\n<%if(data.subscribed){%>			\n<a class="v-sub-btn v-sub-done"  data-img="<%=data.thumb%>"  href="javascript:void(0);">�Ѷ���</a>\n<%}else{%>\n<a class="v-sub-btn v-sub-action" data-img="<%=data.thumb%>" href="javascript:void(0);">+����</a>\n<%}%>\n<%}%>					\n</dd>\n</dl>\n';
                var l = '<%data.thumb=data.thumb||\'//static.youku.com/v1.0.153/user/img/head/64/999.jpg\'%>\n<%if(!data.isSelf){%>\n<a href="<%=data.url%>" target="_blank" >\n<img width="28" height="28" src="<%=data.thumb%>"><%=data.title%>\n</a>\n<%if(data.subscribed){%>			\n<a class="v-sub-btn v-sub-done"  data-img="<%=data.thumb%>"  href="javascript:void(0);">�Ѷ���</a>\n<%}else{%>\n<a class="v-sub-btn v-sub-action" data-img="<%=data.thumb%>" href="javascript:void(0);">+����</a>\n<%}%>		\n<%}%>						\n';
                e.isSelf = false;
                if (n.uid() == PageConfig.videoOwner) e.isSelf = true;
                if ($("#module_basic_dayu_sub").length) {
                    e.subcount = i.field(e.subcount);
                    e.vvCount = i.field(e.vvCount);
                    r = t.compile(s)({
                        data: e
                    });
                    $("#module_basic_dayu_sub").html(r)
                }
                if ($("#module_basic_sub").length) {
                    o = t.compile(l)({
                        data: e
                    });
                    $("#module_basic_sub").html(o)
                }
                $("#Drama").trigger("list:update")
            }
        });
        return o
    });
    define("page/find/player/model/interactionBottom", ["tui/event", "tui/net", "tui/cookie"], function(e, t, i) {
        var n = e.extend({
            initialize: function() {
                var e = this;
                n.superClass.initialize.call(e);
                this.domain = PageConfig.homeHost;
                e.op = {
                    callbackName: "callback",
                    charset: "utf-8"
                }
            },
            getVideoPlayInfo: function(e) {
                var i = this;
                t.getJSON(this.domain + "action/getVideoPlayInfo?" + "&timestamp=" + (new Date).getTime(), e, function(e) {
                    if (1 == e.error) i.trigger("getVideoPlayInfo:success", [e])
                }, i.op)
            },
            updown: function(e) {
                var t = this;
                e.timestamp = +new Date;
                $.ajax({
                    type: "post",
                    url: this.domain + "action/updown?",
                    data: e,
                    beforeSend: function(e) {
                        var t = $.trim(i("_zpdtk"));
                        if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
                    },
                    success: function(e) {
                        if (0 == e.error || e.error == -1 || 2 == e.error) t.trigger("updown:success", [e.data]);
                        else t.trigger("updown:error", [])
                    }
                })
            },
            addFav: function(e) {
                var t = this;
                e.timestamp = +new Date;
                $.ajax({
                    type: "post",
                    url: this.domain + "action/addFav",
                    data: e,
                    beforeSend: function(e) {
                        var t = $.trim(i("_zpdtk"));
                        if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
                    },
                    success: function(e) {
                        if (0 == e.error || e.error == -1 || 2 == e.error) t.trigger("addFav:success", [e.error]);
                        else t.trigger("addFav:error", [])
                    }
                })
            }
        });
        return n
    });
    define("page/find/player/view/iku", ["tui/class", "tui/cookie", "tui/browser"], function(e, t, i) {
        var n = "";
        var a = PageConfig.homeHost;

        function o() {
            $.ajax({
                url: a + "user/authCode",
                dataType: "jsonp",
                success: function(e) {
                    if (!e.error && e.data && e.data.authCode) n = e.data.authCode + "|"
                }
            })
        }
        setTimeout(function() {
            o()
        }, 1e3);
        $(document).on("logchange", function() {
            o()
        });
        var r = e.extend({
            initialize: function() {
                this.loadIkuJs()
            },
            loadIkuJs: function() {
                if ("undefined" == typeof window.ikuNewExecute || "undefined" == typeof window.getP2PStateFromIku) $.getScript("//js.ykimg.com/youku/dist/js/lib/ikuAdapterNew.js", function() {
                    setTimeout(function() {
                        if ("function" == typeof window.getP2PStateFromIku && !i.mac) getP2PStateFromIku()
                    }, 500)
                });
                return true
            },
            ikuExecuteFrompc: function(e) {
                var i = true;
                if (!e.from || !e.action || "video" != e.from && "video" == e.action && !e.sid || "video" != e.from && "show" != e.from && "show" == e.action && !e.sid) {
                    i = 0;
                    if ("function" === typeof callback) {
                        callback(i);
                        return false
                    } else return i
                }
                if ("undefined" == typeof window.ikuNewExecute) this.loadIkuJs();
                setTimeout(function() {
                    var i = 0;
                    var a = !e.callback ? "" : e.callback;
                    var o = !e.secne ? "" : e.secne;
                    var r = e.from;
                    var s = e.action;
                    var l = "";
                    var d = !t("ykss") ? "" : t("ykss");
                    if ("video" == s) {
                        var c = "";
                        var u = "";
                        if ("video" == r) {
                            if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
                                var f = window.ykPlyr.PlayerInfo();
                                if (f) {
                                    c = null != f.langVid ? f.langVid : f.vidEncoded;
                                    u = !f.quality ? "mp4" : f.quality
                                }
                            }
                            c = "" != c ? c : window.videoId2
                        }
                        if (!c && e.sid) c = e.sid;
                        if (c) {
                            u = !u ? "mp4" : u;
                            var p = "//v.youku.com/v_show/id_" + c + ".html";
                            l = "iku://|video|" + p + "|quality=" + u + "|ykss=" + d + "|" + n
                        } else i = 0
                    } else if ("show" == s) {
                        var h = "";
                        var u = "";
                        if ("video" == r) {
                            if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
                                var f = window.ykPlyr.PlayerInfo();
                                if (f) u = !f.quality ? "mp4" : f.quality
                            }
                            h = "undefined" != typeof PageConfig.showid_en ? "z" + PageConfig.showid_en : ""
                        } else if ("show" == r) h = "undefined" != typeof window.g_config.id ? window.g_config.id : "";
                        if (e.sid) h = e.sid;
                        if (h) {
                            u = !u ? "mp4" : u;
                            l = "iku://|vshow|download|" + h + "|quality=" + u + "|ykss=" + d + "|" + n
                        } else i = 0
                    } else if ("play" == s) {
                        var c = "";
                        if ("video" == r) {
                            if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
                                var f = window.ykPlyr.PlayerInfo();
                                if (f) c = null != f.langVid ? f.langVid : f.vidEncoded
                            }
                            c = "" != c ? c : window.videoId2
                        }
                        if (e.sid) c = e.sid;
                        if (c) l = "iku://|play|web|videoid|playerror|" + c + "|ykss=" + d + "|" + n;
                        else i = 0
                    } else if ("adddesktop" == s) {
                        var h = "";
                        var u = "";
                        if ("video" == r) {
                            if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
                                var f = window.ykPlyr.PlayerInfo();
                                if (f) u = !f.quality ? "mp4" : f.quality
                            }
                            h = "undefined" != typeof PageConfig.showid_en ? "z" + PageConfig.showid_en : ""
                        }
                        if (e.sid) h = e.sid;
                        if (h) {
                            u = !u ? "mp4" : u;
                            l = "iku://|vshow|shortcut|" + h + "|quality=" + u + "|ykss=" + d + "|" + n
                        } else i = 0
                    }
                    var m = function(e) {
                        i = -1;
                        var t = "//iku.youku.com/pc/index?tp=v&ori=ykplay&id=" + window.videoId2;
                        if (u) t += "&q=" + u;
                        var n = "";
                        if ("undefined" == typeof e || false == e || "" == e || e.indexOf("//iku.youku.com") == -1) n = t;
                        else n = e;
                        var a = document.createElement("iframe");
                        a.width = 0;
                        a.height = 0;
                        a.src = n;
                        document.body.appendChild(a);
                        setTimeout(function() {
                            document.body.removeChild(a)
                        }, 1e4)
                    };
                    var v = function(e) {
                        i = 1
                    };
                    if ("Microsoft Internet Explorer" == window.navigator.appName && ("MSIE 6." == navigator.appVersion.match(/MSIE 6./i) || "MSIE 7." == navigator.appVersion.match(/MSIE 7./i))) ikuNewExecute(l, o, v, m);
                    else {
                        var g = ikuNewExecute(l, o);
                        if ("ok" != g) m(g);
                        else v(g)
                    }
                    if ("function" === typeof a) a(i);
                    else return i
                }, 200)
            }
        });
        var s = new r;
        return s
    });
    define("page/find/player/view/interactionBottom", ["tui/view", "tui/event", "tui/common", "tui/cookie", "tui/art", "tui/browser", "module/login/login", "page/find/player/view/iku", "page/find/player/model/interactionBottom"], function(e, t, i, n, a, o, r, s, l) {
        var d = e.extend({
            faved: false,
            fav_process: false,
            tcode: "",
            scode: "",
            el: $(".vpactionv5_iframe_wrap"),
            self: this,
            initialize: function() {
                var e = this;
                this._model = new l;
                this.modelEvents(this._model, "model");
                this._model.bind("getVideoPlayInfo:success", this.getVideoPageInfoCallback.bind(this));
                this._model.bind("addFav:success", this.addFavCallBack.bind(this));
                window.ykPlyr.bind("player:onPlayerStartUpdate", this.initMoudle.bind(this));
                this._cached = !!(3 == PageConfig.playmode && !$(".fn-icon-download-noright").length && 0 == PageConfig.page.compeleted && ["85", "100", "97"].indexOf(PageConfig.catId) > -1);
                this.bind();
                this.initMoudle();
                window.XloginEvent.bind("login:userInfo", function(t) {
                    e.renderDownloadPanel(t.is_vip)
                })
            },
            initMoudle: function() {
                this._model.getVideoPlayInfo({
                    vid: PageConfig.videoId,
                    showid: PageConfig.showid,
                    param: {
                        1: "favo"
                    }
                });
                this._setQRCode();
                this._addQQShareParam()
            },
            _addQQShareParam: function() {
                var e = i.get_username("all");
                var t = e.userid > 0 ? e.userid : 0;
                var n = "//mini.cron.youku.com/web/www/qq_share/qq_cback.php?userId=" + t;
                var a = $("#s_qq_haoyou1").attr("href");
                $("#s_qq_haoyou1").attr("href", a + "&callback=" + n)
            },
            _setQRCode: function() {
                $(".J-phone-qrcode-img").attr("src", this._getQRCodeURL())
            },
            _getQRCodeURL: function() {
                var e = this._cached ? "cache" : "open";
                var t = this._cached ? ",source:'pcweb'" : "";
                return "//qr.youku.com/qr?sc=video_play&ac=" + e + "&ps={vid:'" + PageConfig.videoId2 + "',spot:" + this.getWatchTime() + t + ",tp:1,cp:0,cpp:100049}&size=123"
            },
            getVideoPageInfoCallback: function(e) {
                var t = e.data;
                var n = $(".fn-fave", this.$el);
                if (n.length && t.favo) {
                    this.faved = true;
                    n.html('<a target="_blank" class="faved" href="//faxian.youku.com/favorite"><i class="fn-icon"></i> ���ղ�</a>')
                }
                this.tcode = t.ss;
                this.scode = i.hcbt(this.tcode)
            },
            events: {
                "click #fnDownloadVideo,#fn_pc_download": "downloadApp",
                "click #fnDownloadVideoAll": "downloadVideo"
            },
            bind: function() {
                var e = this;
                $(".fn-fave", this.$el).click(function() {
                    if (e.faved || e.fav_process) return;
                    var t = "1_1";
                    switch (PageConfig.playmode) {
                        case 1:
                            t = "1_1";
                            break;
                        case 2:
                            t = "1_3";
                            break;
                        case 3:
                            t = "1_2";
                            break;
                        case 4:
                            t = "1_5";
                            break;
                        case 5:
                            t = "1_4"
                    }
                    e.favParams = {
                        vid: PageConfig.videoId,
                        fid: PageConfig.folderId || "",
                        showid: PageConfig.showid || 0,
                        deviceid: "1",
                        addition: t,
                        channelId: PageConfig.catId
                    };
                    r.login(function() {
                        e._model.addFav(e.favParams);
                        e.fav_process = true
                    })
                });
                $(".fn-share-code-btn", this.$el).each(function(e) {
                    $(this).click(function(e) {
                        var t = $(e.currentTarget).parent().find("input").attr("id");
                        i.copyToClipboard(t)
                    })
                });
                $(".fn-phonewatch", this.$el).bind("mouseenter", function() {
                    var t = e.getWatchTime();
                    e.parseWatchTime(t)
                })
            },
            downloadApp: function() {
                if (o.mac) window.open("//pd.youku.com/pc");
                else {
                    var e = {
                        from: "video",
                        action: "video",
                        secne: "ywebplayerbottom",
                        callback: this._downPCCallback
                    };
                    s.ikuExecuteFrompc(e)
                }
            },
            downloadVideo: function() {
                if (o.mac) window.open("//pd.youku.com/pc");
                else {
                    var e = {
                        from: "video",
                        action: "show",
                        secne: "ywebplayerbottom",
                        callback: this._downPCCallback
                    };
                    s.ikuExecuteFrompc(e)
                }
            },
            addFavCallBack: function(e) {
                var t = this;
                t.fav_process = false;
                if (0 == e || e == -2) {
                    t.faved = true;
                    $(".fn-fave", this.$el).html('<a target="_blank" class="faved" href="//faxian.youku.com/favorite"><i class="fn-icon"></i> ���ղ�</a>')
                }
            },
            showDimcode: function(e, t, i, n) {
                var a = this.getWatchTime();
                this.parseWatchTime(a)
            },
            getWatchTime: function() {
                var e = 0;
                try {
                    var t = window.ykPlyr.PlayerInfo();
                    e = t["time"] ? parseInt(t["time"]) : 0
                } catch (i) {}
                return e
            },
            parseWatchTime: function(e) {
                if (!e) return;
                var t = parseInt(e / 3600);
                e %= 3600;
                var i = parseInt(e / 60);
                var n = e % 60;
                var a = "";
                if (t) a += t + "Сʱ";
                if (i) a += i + "��";
                a += n + "��";
                $("#phone_dimcode_watch_time").html("�ѹۿ��� " + a)
            },
            renderDownloadPanel: function(e) {
                var t = '<% if(mac){%>\n<div class="fn-panel-header">\n<span class="fn-panel-title"> ������Ƶ������ </span>\n</div>\n<div class="fn-panel-body">\n<div class="fn-panel-bd">\n<i class="fn-icon-download-app"></i>\n<p>�ſ�MAC�ͻ��ˣ���������������</p>\n<a id="fn_pc_download" href="javascript:void(0);" class="fn-btn">����MAC�ͻ���</a>\n</div>\n</div>\n<div class="fn-panel-bottom"><%=title%></div>\n<%}else{%>\n<div class="fn-panel-header">\n<span class="fn-panel-title"> ������Ƶ������ </span>\n</div>\n<div class="fn-panel-body">\n<div class="fn-panel-bd">\n<i class="fn-icon-app-video"></i>\n<p>������PC�ͻ���������Ƶ</p>\n<a href="javascript:void(0);" id="fnDownloadVideo" class="mr10 fn-btn fn-btn-download-video">���ر���Ƶ</a>\n<a href="javascript:void(0);" id="fnDownloadVideoAll" class="fn-btn">����ȫ��</a>\n</div>\n</div>\n<div class="fn-panel-bottom arrow-left"><%=title%></div>\n<%}%>';
                var i = $(".title-wrap h1").text();
                if ($(".fn-btn-vip", this.$el).length && e) {
                    var n = a.compile(t)({
                        mac: o.mac,
                        title: i
                    });
                    $(".fn-download .fn-panel", this.$el).html(n)
                }
            },
            _downPCLoading: function() {},
            _downPCCallback: function(e) {
                if (e >= 0) document.getElementById("panel_down_notice").innerHTML = "<div><p>����δ��װ�ͻ��ˣ���������Ϊ������</p><p>�����ɹ���װ���ٵ���·���ť������Ƶ</p></div>"
            }
        });
        return d
    });
    define("page/find/player/model/cms", ["tui/event", "tui/net", "module/domain"], function(e, t, i) {
        var n = e.extend({
            initialize: function() {
                var e = this;
                n.superClass.initialize.call(e);
                this.domain = "//cmstool.youku.com/";
                e.op = {
                    callbackName: "callback",
                    charset: "utf-8"
                }
            },
            getCmstool: function(e) {
                var i = this;
                t.getJSON(this.domain + "cms/tool/pub/get_putdata.json?securemode=2", e, function(e) {
                    i.trigger("getCmstool:success", [e])
                }, i.op)
            }
        });
        return n
    });
    define("page/find/player/view/cms", ["tui/view", "tui/common", "tui/cookie", "tui/net", "tui/slide2", "module/stat/common", "page/find/player/model/cms"], function(e, t, i, n, a, o, r) {
        var s = e.extend({
            initialize: function() {
                var e = this;
                e._model = new r;
                e.modelEvents(e._model, "cmsmodel");
                window.cmsModuleHtmlCallback = function(t, i) {
                    e.cmsModuleHtmlCallback(t, i)
                };
                e.init()
            },
            cmsModuleHtmlCallback: function(e, t) {
                var i = this;
                if (t) {
                    var n = $("#module_cms_" + e);
                    if (n.length > 0) try {
                        t = t.replace(/http:/, "");
                        n.html(t);
                        n.trigger("cms:loaded");
                        this.initCms(n)
                    } catch (a) {
                        n.html("")
                    }
                }
            },
            initCms: function(e) {
                if (e.find(".cms-slider").length) a(e)
            },
            doEachOperation: function() {
                var e = this.cmsdata;
                if (!e.data) return;
                $(document).bind("show:broadcast", this.officiallistOperation.bind(this));
                $(document).trigger("show:broadcast");
                if (e.data.question.hasOwnProperty("link")) $(document).trigger("show:question", [e.data.question]);
                this.diswindowOperation()
            },
            leftOperation: function() {
                $("div[id^='module_cms_']").each(function() {
                    var e = $(this).attr("id").replace("module_cms_", "");
                    var t = "//module.youku.com/" + e + ".html";
                    n.getScript(t)
                })
            },
            diswindowOperation: function() {
                var e = this.cmsdata;
                if ("undefined" == typeof e || "undefined" == typeof e.data || !e.data.diswindow) return -1;
                var t = e.data.diswindow;
                if (t.show && t.topic && t.video) {
                    if (t.show.createtime >= t.topic.createtime && t.show.createtime >= t.video.createtime) t = t.show;
                    else if (t.video.createtime >= t.topic.createtime && t.video.createtime > t.show.createtime) t = t.video;
                    else if (t.topic.createtime > t.video.createtime && t.topic.createtime > t.show.createtime) t = t.topic
                } else if (t.show && t.topic)
                    if (t.show.createtime >= t.topic.createtime) t = t.show;
                    else t = t.topic;
                else if (t.show && t.video)
                    if (t.show.createtime >= t.video.createtime) t = t.show;
                    else t = t.video;
                else if (t.topic && t.video)
                    if (t.video.createtime >= t.topic.createtime) t = t.video;
                    else t = t.topic;
                else if (t.show) t = t.show;
                else if (t.topic) t = t.topic;
                else if (t.video) t = t.video;
                var i = (new Date).valueOf();
                var n = 1e3 * t.begintime;
                var a = 1e3 * t.expiretime;
                var o = window.screen.width || document.body.clientWidth;
                var r = $("#yk-player-curtain");
                if (i >= n && i <= a && r.length > 0) {
                    r.html('<img mid="1001" src="' + t.windowicon + '">');
                    $(document).trigger("goldlog:exp", r);
                    r.show();
                    if (t.buttonicon) window.ykPlyr.bind("player:loaded", function() {
                        if ("function" == typeof window.ykPlyr.setPlayHeadSkin) window.ykPlyr.setPlayHeadSkin({
                            url: t.buttonicon
                        })
                    })
                } else r.hide()
            },
            officiallistOperation: function() {
                var e = this.cmsdata;
                if ("undefined" == typeof e || "undefined" == typeof e.data || !e.data.broadcast) return;
                var i = e.data.broadcast;
                var n = $("#show_vv_broadcast");
                if (!n.length || !i.content) return;
                n.html('<a  target="_blank"  mid="1002"  href="' + i.link + '">' + t.html2Escape(i.content) + "</a>").show();
                $(document).trigger("goldlog:exp", n)
            },
            init: function() {
                this._model.getCmstool({
                    showid: PageConfig.showid,
                    videoid: PageConfig.videoId,
                    folderid: PageConfig.folderId,
                    topicid: PageConfig.catId,
                    client: "pc"
                })
            },
            "{cmsmodel} getCmstool:success": function(e) {
                if (e) {
                    this.cmsdata = e;
                    this.doEachOperation()
                }
            }
        });
        return s
    });
    define("page/find/player/view/listall", ["tui/view", "tui/art", "tui/common", "tui/cookie", "tui/net", "tui/slide2", "tui/util/num", "tui/lazyImageLoader", "module/login/login", "page/find/player/model/listall"], function(e, t, i, n, a, o, r, s, l, d) {
        var c = e.extend({
            initialize: function() {
                var e = this;
                this._model = new d;
                this.modelEvents(this._model, "model");
                this._model.bind("getRelation:sucess", this.relationCallback.bind(this));
                this._model.bind("getRelationLike:sucess", this.likeShowCallback.bind(this));
                this._model.bind("getRelation:fail", this.listCallbackFail.bind(this));
                l.one("checklogin", function() {
                    var t = {
                        guid: n("__ysuid"),
                        utdid: n("cna"),
                        vid: PageConfig.videoId,
                        sid: PageConfig.showid,
                        cate: PageConfig.catId,
                        apptype: 1,
                        uid: l.uid(),
                        atrEnable: "true"
                    };
                    if ($("#module_basic_relation").length > 0) {
                        if (1 == PageConfig.playmode || 2 == PageConfig.playmode) {
                            t.module = 1;
                            t.pg = 2 == PageConfig.playmode ? 4 : 1;
                            t.pl = 1 == PageConfig.playmode ? 23 : 15;
                            t.needTags = 2 == PageConfig.playmode ? 0 : 1;
                            t.type = "video"
                        } else {
                            t.picSize = 2;
                            t.pg = 3;
                            t.module = 9;
                            t.pl = 18;
                            t.needTags = 1;
                            t.type = "show"
                        }
                        e._model.getRelation(t)
                    }
                    if ($("#module_basic_relationleft").length > 0) {
                        t.pg = 3;
                        t.module = 1;
                        t.pl = 20;
                        t.needTags = 0;
                        t.picSize = 2;
                        t.type = "like";
                        e._model.getRelationLike(t)
                    }
                })
            },
            searchDomain: "//www.soku.com",
            clickLogSender: function(e) {
                $(e).on("mousedown", "a", function() {
                    var e = $(this);
                    var t = [e.attr("_ck"), e.attr("_reck")];
                    t.forEach(function(e) {
                        if (e) a.getRequest(e)
                    })
                })
            },
            listCallbackFail: function(e) {
                $("#" + e).remove()
            },
            relationCallback: function(e) {
                var n = '<!-- ����Ƽ��б� -->\n<div class="mod" mid=\'009\'>\n<div class="h">\n<h2 class="">��ؾ�����Ƶ</h2> \n</div>\n<div class="c">\n<div class="rows">\n<div class="row tuiguang" id="ab_v_61208"></div>\n<div class="row tuiguang" id="ab_v_61209"></div>\n<% data.forEach(function(t, i){ %>   \n<%if (t.mm == 1 && typeof(t.thirdDisplayUrl) !== "undefined" && typeof(t.thirdClickUrl) !== "undefined"){%> \n<div class="item item-cover tuiguang" data-sn="<%=i%>"  thirdDisplayUrl="<%=t.thirdDisplayUrl%>" thirdClickUrl="<%=t.thirdClickUrl%>">\n<%}else{%>\n<div class="item item-cover" data-sn="<%=i%>">\n<%}%>\n<a class="cover" href="<%=t.videoUrl%>" target="_blank">\n<img alt="<%=t.picUrl.replace(/^http:\\/\\//,\'//\')%>" class="lazyImg" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<span class="c-time"><i class="bg"></i><span><%=t.videoTime%></span></span>				\n</a>\n<div class="title">\n<% var tt = t.title || \'�ſ��Ƽ���Ƶ\';%>\n<a href="<%=t.videoUrl%>" target="_blank" title="<%=tt%>" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>"><%=tt%></a>						\n</div>\n<div class="status"><span><%=num(t.playAmount)%>�β���</span></div>	\n</div>\n<% }); %> \n<div class="row tuiguang" id="ab_v_61210"></div>\n<div class="row tuiguang" id="ab_v_61211"></div>\n<div class="row tuiguang" id="ab_v_61212"></div>\n<div class="clear"></div>		\n</div>\n</div>\n</div>';
                var a = t.compile(n)({
                    data: e.data,
                    num: r.field,
                    searchDomain: this.searchDomain,
                    youku_homeurl: PageConfig.youku_homeurl,
                    encodeUid: i.encodeUid,
                    encodeURI: encodeURI,
                    numberFormat: i.numberFormat
                });
                if (a) {
                    $("#module_basic_relation").html(a);
                    s({
                        imgs: $("#module_basic_relation").find(".lazyImg"),
                        size: 150
                    });
                    this.clickLogSender("#module_basic_relation");
                    $(".tuiguang").each(function() {
                        $(this).click(function() {
                            var e = $(this).attr("thirdClickUrl");
                            var t = new Image;
                            t.src = e
                        })
                    })
                }
                this.trigger("relationlist:loaded")
            },
            likeShowCallback: function(e) {
                var n = $("#module_basic_relationleft");
                var a = '<div class="mod modSwitch"  mid=\'004\'>\n<div class="h">\n<h2 class="moduletitle">����ܻ�ϲ����Щ��Ŀ</h2>\n</div>\n<div class="c">\n<div class="tab-c" style="display: block;">\n<div name="m_pos" id="m_likeshow">\n<div class="yk-row yk-row-sm">\n<div class="modPSlide mod_pslide " id="mdlikeshow">\n<div class="mbtn prev" style="display: none;">\n<a href="#" class="iconfont" title="��һ��"></a>\n</div>\n<div class="mbtn next" style="display: block;">\n<a href="#" class="iconfont" title="��һ��"></a>\n</div>\n<ul class="panel">\n<% data.forEach(function(t, i){ %> \n<li class="yk-col4 mr1" data-sn="<%=i%>">\n<div class="yk-pack pack-film">\n<div class="p-thumb">\n<a href="<%=t.videoUrl%>" target="_blank" title="<%=t.title%>" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>" ></a>\n<i class="bg"></i>\n<%if(i< 6){%>\n<img src="<%=t.picUrl.replace(/^http:\\/\\//,\'//\')%>">\n<%}else{%>\n<img class="lazyLoad" alt="<%=t.picUrl%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}%>\n<!-- ��ѡ�Ǳ� -->\n<%if (t.mm == 1){%>\n<div class="p-thumb-taglt">\n<i class="ico-ischoice"></i>\n</div>\n<%}%>\n<!-- ��Ա��ȯ -->\n<%if (t.pay_state == "1" || t.pay_state == "2") {%>\n<%var rttext = t.pay_state == "1" ? "��Ա���" : "��Ա��ȯ";%>\n<div class="p-thumb-tagrt">\n<span class="vip-free"><%=rttext%></span>\n</div>\n<%}%>\n</div>\n<!-- ���� -->\n<ul class="info-list">\n<li class="title short-title">\n<a href="<%=t.videoUrl%>" target="_blank" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>"><%=t.title%></a>\n</li>\n<% if (t.subTitle){ %>                \n<li class="subtitle">\n<span><%=t.subTitle%></span>\n</li>\n<% }  %>\n</ul>\n</div>\n</li>\n<%})%>  \n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>';
                var r = t.compile(a)({
                    data: e.data,
                    searchDomain: this.searchDomain,
                    youku_homeurl: PageConfig.youku_homeurl,
                    encodeUid: i.encodeUid,
                    encodeURI: encodeURI,
                    numberFormat: i.numberFormat
                });
                if (r) {
                    n.html(r);
                    this.clickLogSender("#module_basic_relationleft");
                    o(n)
                }
            }
        });
        return c
    });
    define("page/find/player/view/advertisement", ["tui/view", "module/stat/common", "module/ad/util"], function(e, t, i) {
        return e.extend({
            list: [{
                id: "module_ad_61204",
                number: "61204",
                time: 1e3 * 10 * 60
            }, {
                id: "module_ad_61203",
                number: "61203",
                time: 1e3 * 10 * 60
            }, {
                id: "module_ad_61202",
                number: "61202",
                time: 1e3 * 10 * 60
            }, {
                id: "module_ad_61201",
                number: "61201",
                time: 1e3 * 10 * 60
            }],
            relationList: [{
                id: "ab_v_61208",
                number: "61208"
            }, {
                id: "ab_v_61209",
                number: "61209"
            }, {
                id: "ab_v_61210",
                number: "61210"
            }, {
                id: "ab_v_61211",
                number: "61211"
            }, {
                id: "ab_v_61212",
                number: "61212"
            }],
            url: "//v2html.atm.youku.com/vhtml?t=" + (new Date).getTime() + "&rst=" + i.getAdRst() + PageConfig.adsParams + "&pu=" + encodeURIComponent(window.location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&sid=" + t.pvid() + "&p=",
            initialize: function() {
                for (var e in this.list) this.addAD(this.list[e]);
                $("#module_ad_61201").bind("DOMSubtreeModified", function() {
                    $(".player-container .player-title").addClass("has-ad")
                })
            },
            addrelationListAd: function() {
                for (var e in this.relationList) this.addAD(this.relationList[e])
            },
            addAD: function(e) {
                if ($("#" + e.id).length > 0) {
                    var t = this.url + e.number;
                    if (e.videoSeconds) t += "&vl=" + PageConfig.seconds;
                    $.getScript(t);
                    if (e.time) setInterval(function() {
                        $.getScript(t)
                    }, e.time)
                }
            }
        })
    });
    define("module/stat/log", [], function() {
        var e = {};
        e.logCookieKey = "logCookieKey";
        e._addScript = function(e) {
            var t = document.createElement("script");
            t.type = "text/javascript";
            t.src = e;
            document.getElementsByTagName("head")[0].appendChild(t)
        };
        e.addScript = function(t) {
            var i = new RegExp("@" + 3 + "@", "g");
            var n = new RegExp("@" + 4 + "@", "g");
            var a = new RegExp("@" + 5 + "@", "g");
            var o = new RegExp("@" + 6 + "@", "g");
            var r = new RegExp("@" + 7 + "@", "g");
            var s = new RegExp("@" + 8 + "@", "g");
            t = t.replace(i, "//lstat.youku.com/nstay.php").replace(n, "//e.stat.youku.com/hot/click").replace(a, "//r.l.youku.com/recclick").replace(o, "//p.l.youku.com/ugctagclick").replace(r, "//r.l.youku.com/rec_at_click").replace(s, "//r.l.youku.com/recpclick");
            t += "&=" + Math.floor(1e6 * Math.random());
            e._addScript(t)
        };
        e.log = function(t, i, n) {
            if ("number" != typeof t) return;
            var a = n ? n : 0;
            var o = "";
            if (0 == a) {
                var r = document.cookie;
                var s = r.split("; ");
                for (var l = 0; l < s.length; l++) {
                    var d = s[l].split("=");
                    if (e.logCookieKey == d[0]) {
                        if ("invalid" != d[1]) o = unescape(s[l].substring(e.logCookieKey.length + 1, s[l].length));
                        break
                    }
                }
            }
            o += "@" + t + "@";
            if ("object" == typeof i) {
                argUrl = "";
                for (arg in i) argUrl += "&" + arg + "=" + i[arg];
                if (4 == t) document.cookie = "__utmarea=" + i.charset + ";path=/;domain=youku.com";
                o += "?" + argUrl.substring(1, argUrl.length) + "^"
            } else {
                if (4 == t) document.cookie = "__utmarea=" + i.substring(8, i.length) + ";path=/;domain=youku.com";
                o += "?" + i + "^"
            }
            if (0 == a) document.cookie = e.logCookieKey + "=" + escape(o) + ";path=/;domain=youku.com";
            else e.addScript(o)
        };
        e.readLogCookie = function() {
            var t = document.cookie;
            var i = t.split("; ");
            var n = "";
            found = 0;
            for (var a = 0; a < i.length; a++) {
                var o = i[a].split("=");
                if (e.logCookieKey == o[0]) {
                    found = 1;
                    if ("invalid" == o[1]) break;
                    n = unescape(i[a].substring(e.logCookieKey.length + 1, i[a].length));
                    requestUrl = n.substring(0, n.length - 1).split("^");
                    for (var a = 0; a < requestUrl.length; a++) e.addScript(requestUrl[a]);
                    document.cookie = e.logCookieKey + "=invalid" + ";path=/;domain=youku.com";
                    break
                }
            }
        };
        return e
    });
    define("page/find/player/view/sideTool", ["tui/view", "tui/art", "tui/cookie", "tui/net", "module/login/login", "module/stat/log"], function(View, Art, Cookie, Net, Login, Log) {
        var SideTool = View.extend({
            appQrcodeisshow: true,
            initialize: function() {
                var e = this;
                var t = '<div id="sideTool" class="right-sideBar">\n<ul class="yk-toolbar-service js-toolbar" id="toolbarservice" data-stat-role="ck">\n<li class="bigImg yk-toolbar-draw js-draw" id="lotteryToolbarBig"  style="display: none;"></li>\n<li class="yk-toolbar-draw js-draw" id="lotteryToolbar"  style="display: none;"></li>\n<li class="yk-toolbar-group">\n<a class="toolbar icon-5" id="icongroupqrcode" title="��ά��">\n<div class="yk-toolbar-group-item js-dest-qrcode" id="iconitemqrcode"></div>\n<div class="qrcode-popup yk-toolbar-group-panel-li" id="showAppQrcode" style="display: none;">\n<div class="qrcode-arrow"></div>\n<p>�����ֻ��ͻ���</p>\n<img src="//r1.ykimg.com/0510000058D0FEA1ADC0AE058F099020" width="100"/>\n<span>΢��ɨһɨ</span><span>��Ƶ��ʱ��</span>\n</div>\n</a>			\n</li>\n<li class="yk-toolbar-group" id="icongroupquestion" style="display: none;">\n<a class="toolbar icon-6" id="ToolbarQuestionLink" href="#" target="_blank" title="�ʾ�"><div class="yk-toolbar-group-item js-dest-question" id="iconitemquestion" data-stat-role="ck"></div></a>\n</li>		\n<li class="yk-toolbar-group" id="icongroupgotop" style="display: none;">\n<a class="toolbar icon-2"><div class="yk-toolbar-group-item js-dest-goTop" data-stat-role="ck" id="iconitemgotop"></div></a>\n</li>\n<!-- 		<li class="yk-toolbar-group" id="lightoff">\n<a class="toolbar icon-4"><div class="yk-toolbar-group-item js-dest-lightOn" id="iconitemlighton" data-stat-role="ck" title="�ص�"></div></a>\n</li> -->\n<li class="yk-toolbar-group" id="icongroupfeedback">\n<a class="toolbar icon-3" href="//csc.youku.com/feedback-web/web/subtype_16" target="_blank" title="����"><div class="yk-toolbar-group-item js-dest-feedback" id="iconitemfeedback" data-stat-role="ck"></div></a>\n</li>\n</ul>\n</div>\n<!-- <div id="light_switch" style="display: none;">\n<div id="playshow_mask" style="display: block;"></div>\n<div class="sideTool sideTool_dark" id="sideToolDark" style="display: block;">\n<div class="handle" id="lighton"><a class="icon-light-off" href="javascript:;" title="����"></a></div>\n</div>\n</div> -->';
                $("body").append($(t));
                this.$el = $("#sideTool");
                $("#sideBar").remove();
                $(document).bind("show:question", this.goQuestion.bind(this));
                this.$goTop = $("#icongroupgotop");
                this.$btnQrcode = $("#icongroupqrcode");
                this.QrStatus = 1;
                this._bindEvent();
                this.goTopStatus();
                this.popup = $("#toolbarservice", this.$el);
                setTimeout(function() {}, 1e3);
                setInterval(function() {}, 6e4)
            },
            events: {
                "click .popup-close-icon": "closePopup",
                "click .right-sidepopup .popup_img": "clickPopup"
            },
            popupLog: function(e, t, i) {
                var n = "show" == e ? "//gm.mmstat.com/yt/show.index.module" : "//gm.mmstat.com/yt/click.index.module";
                if ("show" == e) n += "?mid=" + t + "&mname=" + i + "&etime=" + (new Date).getTime();
                else n += "?mid=" + t + "&mname=" + i + "&etime=" + (new Date).getTime();
                Net.getRequest(n)
            },
            getPopup: function() {
                var e = this;
                var t = 1 * new Date;
                Net.getJSON("//hudong.alicdn.com/api/data/v2/a06eee90bd8044e480e4499b85f60cc5.js?t=" + 1 * new Date, {}, function(i) {
                    if (i.isShow || "57700" == PageConfig.showid || "774932586" == PageConfig.videoId) {
                        var n = i.data[0];
                        var a = '<div class="right-sidepopup"><a href="<%=data.url%>" class="popup_img" target="_blank"><img src="<%=data.image%>" /></a><span class="popup-close-icon"></span></div>';
                        if (!$(".right-sidepopup").length)
                            if (t >= n.start && t <= n.end) {
                                var o = Art.compile(a)({
                                    data: n
                                });
                                if (!Cookie("PopupStatus")) {
                                    e.popupLog("show", "1013", "popup");
                                    e.popup.parent().prepend(o);
                                    e.$popupClose = $(".popup-close-icon", this.$el)
                                }
                            }
                    }
                }, {
                    callbackName: "callback",
                    charset: "utf-8",
                    callback: "popupCallback"
                })
            },
            closePopup: function() {
                this.popupLog("click", "1014", "popclose");
                this.$popupClose.parent().hide();
                Cookie("PopupStatus", 1, {
                    expires: this.getCookieTime()
                })
            },
            clickPopup: function(e) {
                this.popupLog("click", "1013", "popup")
            },
            getCookieTime: function() {
                var e = 1 * new Date;
                var e = e - e % (24 * 60 * 1e3 * 60) + 24 * 60 * 1e3 * 60;
                return new Date(e)
            },
            goTop: function() {
                $("body,html").animate({
                    scrollTop: 0
                }, 800);
                return false
            },
            goQuestion: function(e, t) {
                var i = this.$el.find("#icongroupquestion");
                $("#ToolbarQuestionLink").attr({
                    href: t.link,
                    title: t.name
                });
                i.show()
            },
            goTopStatus: function() {
                var e = $(window).scrollTop();
                if (e > 300) {
                    this.$el.find("#toolbarservice").show();
                    this.$goTop.show()
                } else {
                    this.$goTop.hide();
                    this.$el.find("#toolbarservice").hide()
                }
            },
            showQrcode: function(e) {
                var t = this,
                    i, n;
                var a = $("#showAppQrcode");
                var o = [{
                    right: "0px",
                    opacity: 0
                }, {
                    right: "50px",
                    opacity: 1
                }];
                if (1 == this.QrStatus) {
                    if ("close" == e) return;
                    i = o[0];
                    n = o[1]
                } else {
                    i = o[1];
                    n = o[0]
                }
                a.css(i);
                a.show().animate(n, 300, function() {
                    if (t.QrStatus == -1) a.hide();
                    t.QrStatus = t.QrStatus * -1
                });
                return false
            },
            _bindEvent: function() {
                var e = $(window);
                var t = this;
                var i = true;
                e.bind("scroll", function() {
                    if (i) {
                        setTimeout(function() {
                            t.goTopStatus();
                            i = true
                        }, 200);
                        i = false
                    }
                });
                this.$goTop.bind("click", this.goTop.bind(this));
                this.$btnQrcode.bind("click", this.showQrcode.bind(this));
                $(document).bind("click", function() {
                    t.showQrcode.call(t, "close")
                })
            },
            showRunIcon: function() {
                if (!PageConfig.lottery_open_sidetool || "" == PageConfig.lottery_open_sidetool || !$("#lotteryToolbarBig").length || !$("#lotteryToolbar").length) return false;
                var e = Login.uid();
                var t = this;
                var i = "//ykatr.youku.com/atr/related/packed_list.json",
                    n = 1,
                    a = Cookie("__ysuid"),
                    o = 1,
                    r = 16,
                    s = 1,
                    l = "ykqz_toolbar";
                var d;
                i += "?site=" + n + "&guid=" + a + "&apptype=" + o + "&module=" + r + "&pl=" + s + "&oc=" + l;
                i += "&uid=" + Login.uid();
                if ("undefined" != typeof PageConfig.playmode) {
                    d = 1;
                    if (0 != PageConfig.videoId) {
                        var c = PageConfig.videoId;
                        i += "&vid=" + c
                    }
                    if (0 != PageConfig.showid) {
                        var u = PageConfig.showid;
                        i += "&sid=" + u
                    }
                    if ("undefined" != typeof PageConfig.catId) {
                        var f = PageConfig.catId;
                        i += "&cate=" + f
                    }
                } else {
                    d = 30;
                    if ("object" == typeof svargs)
                        if ("undefined" != typeof svargs.catid && 0 != svargs.catid) {
                            var f = svargs.catid;
                            i += "&cate=" + f
                        }
                    if (1 == window.youku_show_page && "object" == typeof g_config) {
                        if ("undefined" != typeof g_config.pk_odshow) {
                            var u = g_config.pk_odshow;
                            i += "&sid=" + g_config.pk_odshow
                        }
                        if ("undefined" != typeof g_config.cat_id && 0 != typeof g_config.cat_id) {
                            var f = g_config.cat_id;
                            i += "&cate=" + f
                        }
                    }
                }
                i += "&pg=" + d;
                i += "&callback=?";
                $.getJSON(i, function(e) {
                    t.showRunIconCallback(e)
                })
            },
            showRunIconCallback: function(e) {
                if (0 == e.e) {
                    var t = e.data[0];
                    var i = t.clickLogUrl;
                    $("#lotteryToolbar").show();
                    var n = '<div id="lotteryLeft" class="ykDraw-panel ykDraw-panel-reward" style="position:relative;width:100%;height:100%;"><a href="' + t.playLink + '" target="_blank" style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + t.picUrl + ') no-repeat;background-position:0 -40px;margin-top:10px;"></a><span id="lotteryHand" class="ykDraw-p-itemykDraw-p-item-close" style="cursor:pointer;position:absolute;width:13px;height:13px;left:0px;top:0px;background:url(' + t.picUrl + ') no-repeat;background-position:-42px 0;"></span></div></div></div>';
                    var a = '<div class="yk-toolbar-draw js-draw"><div class="yk-toolbar-group yk-toolbar-group-draw"><div class="ykDraw-mark" id="lotteryRight"><a href="' + t.playLink + '" target="_blank" style="position:relative;display:block;height:38px;"><span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + t.picUrl + ') no-repeat;width:100%;height:100%;background-position:0 0;z-index:1;display:block;margin:0 auto;"></span></a></div>';
                    $("#lotteryToolbarBig").html(n);
                    $("#lotteryToolbar").html(a);
                    $("#lotteryToolbar").show();
                    if ("yes" != Cookie("runIcon_day") && window.screen.width >= 1440) $("#lotteryToolbarBig").show();
                    if (null == Cookie("runIcon_day") || "undefined" == Cookie("runIcon_day")) this.appQrcodeisshow = false;
                    this.showRunIconLog(i)
                }
            },
            showRunIconLog: function(e) {
                var t = e;
                if (t) var i;

                function n(e) {
                    if (t) {
                        var i = new Image;
                        i.src = t + "&optype=" + e
                    }
                }
                $("#lotteryLeft").bind("click", function() {
                    i = 6;
                    Log.log(1, "tp=1&cp=4010337&cpp=1000940");
                    n(i)
                });
                $("#lotteryRight").bind("click", function() {
                    i = 8;
                    Log.log(1, "tp=1&cp=4010338&cpp=1000940");
                    n(i)
                });
                $("#lotteryHand").bind("click", function(e) {
                    $("#lotteryToolbarBig").hide();
                    $("#lotteryToolbar").show();
                    Cookie("runIcon_day", "yes", 1);
                    i = 9;
                    Log.log(1, "tp=1&cp=4009622&cpp=1000217");
                    n(i);
                    return false
                })
            },
            lottery: function() {
                if (!PageConfig.lottery_open_sidetool || "" == PageConfig.lottery_open_sidetool || !$("#lotteryToolbarBig").length || !$("#lotteryToolbar").length) return false;
                var lotteryCon = eval(PageConfig.lottery_sidetool);
                if (!lotteryCon || "object" != typeof lotteryCon) return false;
                var lotterystart = "";
                var lotteryend = "";
                var lottery_small_start = "";
                var lottery_small_end = "";
                var lotterybackground = "";
                var lotterytype = "";
                var lotteryurl = "";
                var lotteryLayerW = "";
                var lotteryLayerH = "";
                for (var i = 0; i < lotteryCon.length; i++) {
                    if ("object" != typeof lotteryCon[i] || !lotteryCon[i].start || !lotteryCon[i].end || !lotteryCon[i].type || !lotteryCon[i].background) continue;
                    lotterystart = lotteryCon[i].start;
                    lotteryend = lotteryCon[i].end;
                    lottery_small_start = lotteryCon[i].small_start;
                    lottery_small_end = lotteryCon[i].small_end;
                    lotterybackground = lotteryCon[i].background + "?t=" + Math.random();
                    lotterytype = lotteryCon[i].type;
                    lotteryurl = lotteryCon[i].url;
                    if (2 == lotterytype) {
                        lotteryLayerW = !lotteryCon[i].layerw ? 485 : lotteryCon[i].layerw;
                        lotteryLayerH = !lotteryCon[i].layerh ? 426 : lotteryCon[i].layerh
                    }
                    var starttime = new Date(lotterystart).valueOf();
                    var endtime = new Date(lotteryend).valueOf();
                    var small_starttime = new Date(lottery_small_start).valueOf();
                    var small_endtime = new Date(lottery_small_end).valueOf();
                    var nowDate = new Date;
                    var nowtime = nowDate.valueOf();
                    var nowDay = nowDate.getDate().toString();
                    var nowMonth = nowDate.getMonth().toString();
                    var nowYear = nowDate.getFullYear().toString();
                    var clolseCookieValueNow = nowYear + nowMonth + nowDay;
                    var lotteryToolbarInner = "";
                    var lotteryToolbarBigInner = "";
                    if (nowtime > starttime && nowtime < endtime || nowtime > small_starttime && nowtime < small_endtime) {
                        $("lotteryToolbar").style.display = "block";
                        lotteryToolbarInner = '<div class="yk-toolbar-draw js-draw"><div class="yk-toolbar-group yk-toolbar-group-draw">' + '<div class="ykDraw-mark" id="lotteryRight">';
                        if (1 == lotterytype) lotteryToolbarInner += '<a href="' + lotteryurl + '" target="_blank" onclick="Log.log(1, \'tp=1&cp=4010338&cpp=1000940\');" style="position:relative;display:block;height:38px;">' + '<span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + lotterybackground + ") no-repeat;width:100%;height:100%;background-position:0 0;" + 'z-index:1;display:block;margin:0 auto;"></span></a>';
                        else if (2 == lotterytype) lotteryToolbarInner += "<span onclick=\"SideTool.lotteryLayer('" + lotteryurl + "','" + lotteryLayerW + "','" + lotteryLayerH + "');Log.log(1, 'tp=1&cp=4010338&cpp=1000940');\" style=\"cursor:pointer;position:relative;display:block;height:38px;\">" + '<span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + lotterybackground + ") no-repeat;width:100%;height:100%;background-position:0 0;" + 'z-index:1;display:block;margin:0 auto;"></span></span>';
                        else lotteryToolbarInner += '<span style="cursor:pointer;position:relative;display:block;height:38px;">' + '<span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + lotterybackground + ") no-repeat;width:100%;height:100%;background-position:0 0;" + 'z-index:1;display:block;margin:0 auto;"></span></span>';
                        lotteryToolbarInner += "</div>";
                        lotteryToolbarBigInner += '<div id="lotteryLeft" class="ykDraw-panel ykDraw-panel-reward" style="position:relative;width:100%;height:100%;">';
                        if (1 == lotterytype) lotteryToolbarBigInner += '<a href="' + lotteryurl + '" target="_blank" onclick="Log.log(1, \'tp=1&cp=4010337&cpp=1000940\');" ' + 'style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + lotterybackground + ') no-repeat;background-position:0 -40px;margin-top:10px;"></a>';
                        else if (2 == lotterytype) lotteryToolbarBigInner += "<span onclick=\"SideTool.lotteryLayer('" + lotteryurl + "','" + lotteryLayerW + "','" + lotteryLayerH + "');Log.log(1, 'tp=1&cp=4010337&cpp=1000940');\" " + 'style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + lotterybackground + ') no-repeat;background-position:0 -40px;margin-top:10px;"></span>';
                        else lotteryToolbarBigInner += '<span style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + lotterybackground + ') no-repeat;background-position:0 -40px;margin-top:10px"></span>';
                        lotteryToolbarBigInner += '<span id="lotteryHand" class="ykDraw-p-itemykDraw-p-item-close" style="cursor:pointer;position:absolute;width:13px;' + "height:13px;left:0px;top:0px;background:url(" + lotterybackground + ') no-repeat;background-position:-42px 0;"></span>' + "</div></div></div>";
                        $("lotteryToolbarBig").innerHTML = lotteryToolbarBigInner;
                        if (nowtime > starttime && nowtime < endtime) $("lotteryToolbarBig").style.display = "block";
                        $("lotteryToolbar").innerHTML = lotteryToolbarInner;
                        if (clolseCookieValueNow == Cookie("lottery_day")) {
                            $("lotteryToolbarBig").style.display = "none";
                            $("lotteryToolbar").style.display = "block"
                        }
                        if ($("lotteryHand")) $("lotteryHand").onclick = function(e) {
                            $("lotteryToolbarBig").style.display = "none";
                            $("lotteryToolbar").style.display = "block";
                            Log.log(1, "tp=1&cp=4009622&cpp=1000217");
                            var t = new Date;
                            var i = t.getDate().toString();
                            var n = t.getMonth().toString();
                            var a = t.getFullYear().toString();
                            var o = a + n + i;
                            Cookie("lottery_day", o, 1);
                            var r = e || window.event;
                            if (r.stopPropagation) r.stopPropagation();
                            return false
                        }
                    }
                }
            },
            lotteryLayer: function(e, t, i) {
                if (!e || !t || !i) return false;
                if ("function" == typeof PlayerPause) PlayerPause(1);
                if (window.popwin) popwin.hide();
                window.popwinLottery = new Qwindow;
                window.popwinLottery.setSize(t, i).setContent("iframe", e).setHideCallback(function() {
                    if ("function" == typeof PlayerPause) PlayerPause(0)
                }).show();
                Log.log(1, "tp=1&cp=4009623&cpp=1000217")
            }
        });
        return SideTool
    });
    define("page/find/player/view/sideControl", ["tui/view", "tui/cookie"], function(e, t) {
        var i = e.extend({
            el: $("#player_sidebar"),
            barCookie: "__list__",
            status: 0,
            playmodekey: "P_L_M",
            initialize: function(e) {
                i.superClass.initialize.call(this);
                var t = this;
                this.playBox = $("#playerBox");
                if (!this.el) return false;
                this._sideShowControl()
            },
            events: {
                "click #expandlink,.listcontrol_side": "expandSideList"
            },
            turn: function() {
                if (1 == this.status) this._fadeRight();
                else this._fadeLeft()
            },
            open: function() {
                if (0 == this.status) this.turn()
            },
            close: function() {
                if (1 == this.status) this.turn()
            },
            _sideShowControl: function() {
                var e = t(this.barCookie);
                if (1 == e || !e) {
                    this.status = 1;
                    this.playBox.removeClass("playBox_thx")
                } else {
                    this.status = 0;
                    this.playBox.addClass("playBox_thx")
                }
            },
            _fadeLeft: function() {
                this.status = 1;
                this.playBox.removeClass("playBox_thx");
                $("#Drama").trigger("list:update");
                this.trigger("SideControl:open", []);
                t(this.barCookie, 1, 360)
            },
            _fadeRight: function() {
                this.status = 0;
                this.playBox.addClass("playBox_thx");
                t(this.barCookie, 0, 360)
            },
            expandSideList: function() {
                this.turn()
            }
        });
        return new i
    });
    define("module/stat/jserror", ["tui/net", "module/global"], function(e, t, i, n) {
        var a = encodeURIComponent;
        var o = a(location.href);
        var r = a(navigator.userAgent);
        var s = window.ERROR_RAND || .01;
        var l = {};
        var d = function(i, n, d) {
            if (!d) i = "custom: " + i;
            n = n || s;
            if (Math.random() < n) {
                if (l[i]) return;
                e.getRequest("//stats.tudou.com/e/page/js/fail/?v=1&s=" + [a(i), o, t.juid + "_" + t.uid, r].join("|"));
                l[i] = true
            }
        };
        d.addVersion = function(e) {
            o = a(e + ":" + location.href)
        };
        if (Math.random() < s) window.onerror = function(e) {
            setTimeout(function() {
                d(e, 1, true)
            }, 0)
        };
        return d
    });
    define("tui/model", ["tui/event"], function(e) {
        function t(e) {
            if (Array.isArray(e)) return $.extend(true, {}, {
                list: e
            }).list;
            return $.extend(true, {}, e)
        }

        function i(e) {
            var t = e instanceof o ? [] : {};
            e.each(function(e, n) {
                if (n instanceof o || n instanceof a) t[e] = i(n);
                else t[e] = n
            });
            return t
        }

        function n(e, t, i) {
            var a = Array.isArray(e) ? new i(e) : new t(e);
            a.each(function(e, o) {
                if (Array.isArray(o) || $.isPlainObject(o)) {
                    o = n(o, t, i);
                    a._data[e] = o;
                    if (o instanceof i || o instanceof t) o._parent = a
                }
            });
            return a
        }
        var a = e.extend({
            model: null,
            list: null,
            initialize: function(e) {
                var i = this;
                a.superClass.initialize.call(i);
                i._parent = null;
                e = e ? t(e) : {};
                i._data = i.defaults ? $.extend({}, i.defaults, e) : e;
                null == i.model && (i.model = a);
                null == i.list && (i.list = o)
            },
            each: function(e) {
                var t = this;
                $.each(t._data, e);
                return t
            },
            key: function(e) {
                var t;
                this.each(function(i, n) {
                    if (n === e) {
                        t = i;
                        return false
                    }
                });
                return t
            },
            get: function(e) {
                if (void 0 === e) return this._data;
                return this._data[e]
            },
            toJSON: function() {
                return i(this)
            },
            set: function(e, t) {
                var i = this;
                if ("object" == typeof e) $.each(e, function(e, t) {
                    i._set(e, t)
                });
                else i._set(e, t);
                return i._bindChangeEvent()
            },
            replace: function(e) {
                return this._replace(e)
            },
            remove: function(e) {
                var t = this;
                if (void 0 === e) {
                    if (t._parent) t._parent.remove(t._parent.key(t));
                    t._data = Array.isArray(t._data) ? [] : {};
                    if (t._parent) t.trigger("change", []);
                    else t._bindChangeEvent();
                    return t
                }
                var i = t.get(e);
                if (Array.isArray(t._data)) t._data.splice(e, 1);
                else delete t._data[e];
                t._bindEvent("remove", e, i);
                return t._bindChangeEvent()
            },
            toModel: function(e) {
                return this._toModel(e)
            },
            _set: function(e, t) {
                var i = this;
                var n = void 0 === i.get(e) ? "add" : "update";
                var a = i.get(e);
                var t = i._toModel(t);
                if (t === a) return;
                i._data[e] = t;
                return i._bindEvent(n, e, t, a)
            },
            _replace: function(e, t) {
                var i = this;
                var n, a;
                var o = [];
                if (t) {
                    n = i.size();
                    a = "concat"
                } else {
                    n = 0;
                    a = "replace";
                    i._data = Array.isArray(i._data) ? [] : {}
                }
                $.each(e, function(e, t) {
                    o.push(i._data[n + e] = i._toModel(t))
                });
                setTimeout(function() {
                    i.trigger(a, [e, o])
                }, 0);
                return i._bindChangeEvent()
            },
            _toModel: function(e) {
                var t = this;
                if (Array.isArray(e) || $.isPlainObject(e)) e = n(e, t.model, t.list);
                if (e instanceof o || e instanceof a) e._parent = t;
                return e
            },
            _bindChangeEvent: function() {
                var e = this;
                e.trigger("change", []);
                if (e._parent) e._parent._bindChangeEvent();
                return e
            },
            _bindUpdateEvent: function(e) {
                var t = this;
                t.trigger("update", [t.key(e), e]);
                if (t._parent) t._parent._bindUpdateEvent(t);
                return t
            },
            _bindEvent: function(e, t) {
                var i = this;
                var n = $.makeArray(arguments).slice(2);
                i.trigger(e + ":" + t, n);
                i.trigger("change:" + t, n);
                i.trigger(e, [t].concat(n));
                if (i._parent) i._parent._bindUpdateEvent(i);
                return i
            }
        });
        var o = a.extend({
            initialize: function(e) {
                var i = this;
                o.superClass.initialize.call(i);
                i._data = e ? t(e) : []
            },
            size: function() {
                return this._data.length
            },
            first: function() {
                return this._data[0]
            },
            last: function() {
                return this._data[this.size() - 1]
            },
            where: function(e, t) {
                var i = this;
                var n = [];
                i.each(function(i, a) {
                    var o = 0;
                    var r = 0;
                    $.each(e, function(e, i) {
                        if (t && a.get(e) === i || !t && a.get(e) == i) o++;
                        r++
                    });
                    if (o === r) n.push(a)
                });
                return n
            },
            push: function(e) {
                return this._insert(this.size(), e, "push")
            },
            unshift: function(e) {
                return this._insert(0, e, "unshift")
            },
            insert: function(e, t) {
                return this._insert(e, t, "insert")
            },
            concat: function(e) {
                return this._replace(e, true)
            },
            pop: function() {
                return this.remove(this.size() - 1)
            },
            shift: function() {
                return this.remove(0)
            },
            sort: function(e) {
                this._data.sort(e);
                return this._bindChangeEvent()
            },
            _insert: function(e, t, i) {
                var n = this;
                n._data.splice(e, 0, void 0);
                n._set(e, t);
                n.trigger(i, [e, t]);
                return n._bindChangeEvent()
            }
        });
        a.List = o;
        return a
    });
    define("tui/ajaxModel", ["tui/model", "module/stat/jserror"], function(e, t) {
        var i = {};

        function n(e) {
            var t = {
                type: "get",
                url: "",
                cache: true,
                scriptCharset: "utf-8",
                dataType: "json",
                data: {},
                timeout: 1e4
            };
            if (!("post" == e.type) && (!e.dataType || "jsonp" == e.dataType)) $.extend(e, {
                dataType: "jsonp",
                jsonp: e.jsonp || "jsoncallback"
            });
            e = $.extend(t, e || {});
            return $.ajax(e)
        }

        function a(e) {
            $.each(e, function(t, n) {
                var a = n;
                if ("object" != $.type(n) || !n.url) return;
                e[t] = function() {
                    var e = this;
                    var n = arguments;
                    var r = $.extend(true, {}, a || {}, {
                        data: n[0] || {}
                    });
                    var s = Array.isArray(e._data);
                    var l;
                    var d = (new Date).getTime();
                    var c;
                    var u = true;
                    if (!r.jsonpCallback) r.jsonpCallback = (s ? e.model.__mid + "List" : e.constructor.__mid).replace(/[^\w]+/g, "_") + "__" + t;
                    l = r.jsonpCallback;
                    c = i[l];
                    if (c && d - c < 1e3) u = false;
                    if (false === r.requestGap) u = true;
                    i[l] = d;
                    if (u || "retry" == n[n.length - 1]) o.call(this, r, t, n)
                }
            })
        }

        function o(e, i, a) {
            var o = this;
            var r = e.url;
            if ("object" !== $.type(e.data)) return;
            var s = $.param(e.data);
            var l;
            var d = e.jsonpCallback;
            var c = function(e) {
                return [true, e]
            };
            a = $.makeArray(a);
            n(e).done(function(n) {
                n = e.convert ? e.convert.call(o, n, a[0]) : c(n);
                if (true === n[0]) {
                    n[1] = n[1] || {};
                    l = o._toModel(n[1]);
                    if (e.toModel) o._data = l._data;
                    o.fire(i + ":success", [n[1]].concat(a))
                } else {
                    o.fire(i + ":error", [n[1]].concat(a));
                    t("ConditionException::" + d + "::" + n)
                }
            }).fail(function(e, n, r) {
                var l = n || r;
                var c = "retry" != a[a.length - 1];
                if (c) {
                    t("FirstAutoRetry::" + d + "::" + l + "::" + s);
                    o[i].apply(o, a.concat(["retry"]))
                } else t("retryError::" + d + "::" + l + "::" + s);
                o.fire(i + ":error", [{
                    status: l,
                    msg: l
                }, s])
            })
        }
        var r = e.extend({});
        r.List = e.List.extend({
            getIndex: function(e) {
                var t = this;
                var i;
                t.each(function(t, n) {
                    $.each(e, function(e, a) {
                        if (n.get(e) === a) i = t
                    })
                });
                return i
            }
        });
        var s = function(t, i) {
            a(t);
            var n = e.extend.call(this, t, i);
            return n
        };
        r.extend = s;
        r.List.extend = s;
        return r
    });
    define("page/find/player/model/feePaymentPro", ["tui/ajaxModel"], function(e) {
        var t = PageConfig.homeHost;
        var i = "//nc.youku.com/";
        var n = "https://account.youku.com/";
        var a = e.extend({
            initialize: function(e) {
                var t = this;
                a.superClass.initialize.call(t)
            },
            getFeeInfo: {
                url: t + "fee/feeinfo?&timestamp=" + (new Date).getTime(),
                jsonp: "callback",
                convert: o
            },
            getFeeQrcode: {
                url: t + "fee/payqrcode?&timestamp=" + (new Date).getTime(),
                jsonp: "callback",
                convert: o
            },
            getFeeVip: {
                url: t + "fee/feevip?&timestamp=" + (new Date).getTime(),
                jsonp: "callback",
                convert: o
            },
            getFeeShow: {
                url: t + "fee/feeshow?&timestamp=" + (new Date).getTime(),
                jsonp: "callback",
                convert: o
            },
            getConsumeTicket: {
                url: t + "fee/consumeticket?&timestamp=" + (new Date).getTime(),
                jsonp: "callback",
                convert: o
            },
            getStatusLogin: {
                url: n + "qrcode/loginByCode.json?buid=youku" + "&template=&pid=" + PageConfig.pid + "&timestamp=" + (new Date).getTime(),
                jsonp: "jsonpCallback",
                convert: r
            }
        });

        function o(e) {
            var t = e && 1 == e.error ? true : e.error;
            return [t, e]
        }

        function r(e) {
            return [true, e]
        }
        return a
    });
    define("page/find/player/view/feePaymentPro", ["tui/net", "tui/view", "tui/art", "module/login/login", "page/find/player/model/feePaymentPro"], function(e, t, i, n, a) {
        var o = t.extend({
            el: $(".vip-sell-wrap"),
            qPayRoundTime: 1e4,
            freshTime: 18e4,
            initialize: function() {
                var e = this;
                o.superClass.initialize.call(this);
                this.mod = new a;
                this.modelEvents(this.mod);
                this.init();
                window.XloginEvent && XloginEvent.bind("Xlogin:loginSuccess", function() {
                    clearInterval(e.intervalHandle);
                    e.feeInfo()
                });
                $(".youku_vip_pay_btn").attr("soureceid", "pc_playlist_btn");
                $.getScript("//static.youku.com/paymentcenter/vip_pay/vip_pc_pay.js");
                $(document).on("click", "#vip_pay_popup_close", function() {
                    $(document).trigger("logchange")
                })
            },
            init: function() {
                var e = this;
                e.$qr = $("#qrFeeImg", e.$el);
                if ($("#qrcodetobuymem").length) e.payStatus = "vip";
                else if ($("#qrcodetobuymov").length) e.payStatus = "mov";
                e.lcode = $("#qrFeeImg", e.$el).attr("lcode");
                if (e.$qr.length) {
                    setTimeout(function() {
                        e.addInterval()
                    }, 400);
                    e.timeout = setTimeout(function() {
                        e.showRefresh()
                    }, e.freshTime)
                }
            },
            feeInfo: function() {
                if (this.$el.length) this.mod.getFeeInfo({
                    l: "debug",
                    vid: PageConfig.videoId,
                    showid: PageConfig.showid,
                    t: Math.random()
                })
            },
            events: {
                "click #ticketPay": "ticketPay",
                "click .qr-refresh": "rcoderefresh"
            },
            "{mod} getFeeInfo:success": function(e) {
                var t = e.data;
                if (e["html"]) {
                    var i = $(e["html"]).find(".vip-sell-wrap").html();
                    this.$el.html(i)
                } else this.$el.html("").hide();
                this.init()
            },
            "{mod} getConsumeTicket:success": function(e) {
                if (true == e.data) this.$el.html('<p class="vip-pay-status"><i class="bg-icon bg-pay-sucess"></i>֧���ɹ���<a href="javascript:window.location.reload(true);">ˢ��ҳ��</a> ���ɹۿ�</p>')
            },
            "{mod} getFeeShow:success": function(e) {
                if (true == e.data) window.location.reload(true)
            },
            "{mod} getFeeVip:success": function(e) {
                if (true == e.data) window.location.reload(true)
            },
            "{mod} getStatusLogin:success": function(e) {
                if ("success" == e.result) window.location.reload(true);
                else if ("QR_CODE_NOT_EXIST" == e.errorCode) clearInterval(this.intervalHandle)
            },
            "{mod} getFeeQrcode:success": function(e) {
                var t = this;
                if (e && e.data.shorturl) {
                    if (e.data.qrcode) t.lcode = e.data.qrcode;
                    t.$qr.attr("scr", "//qr.youku.com/qr?tiny=" + e.data.shorturl + "&logosize=0");
                    $(".qr-timeout", this.$el).hide();
                    setTimeout(function() {
                        t.addInterval()
                    }, 50)
                }
            },
            ticketPay: function() {
                this.mod.getConsumeTicket({
                    showid: PageConfig.showid,
                    t: Math.random()
                })
            },
            rcoderefresh: function() {
                this.mod.getFeeQrcode({
                    vid: PageConfig.videoId
                })
            },
            addInterval: function() {
                var e = this;
                clearInterval(this.intervalHandle);
                e.intervalHandle = setInterval(function() {
                    e.getPayStatus()
                }, e.qPayRoundTime);
                this.timeout = setTimeout(function() {
                    e.showRefresh()
                }, e.freshTime)
            },
            showRefresh: function() {
                $(".qr-timeout", this.$el).show();
                clearInterval(this.intervalHandle)
            },
            getPayStatus: function() {
                var e = this;
                if (n.isLogin()) {
                    if ("mov" == this.payStatus) this.mod.getFeeShow({
                        vid: PageConfig.videoId2,
                        showid: PageConfig.showid,
                        t: Math.random()
                    });
                    else if ("vip" == this.payStatus) this.mod.getFeeVip({
                        vid: PageConfig.videoId2,
                        showid: PageConfig.showid,
                        t: Math.random()
                    })
                } else this.mod.getStatusLogin({
                    code: this.lcode,
                    t: Math.random()
                })
            }
        });
        return o
    });
    define("page/find/player/view/pages", ["tui/view", "tui/art", "page/find/player/model/dramaModel"], function(e, t, n) {
        var a = e.extend({
            el: $("#Dramalist_wrap"),
            initialize: function(e) {
                a.superClass.initialize.call(this);
                var t = this;
                this.loading = false;
                this.$listWrapDiv = $(".drama-content", this.el);
                PageConfig.page.pageSize = 97 == PageConfig.catId ? 30 : 100;
                var i = Math.ceil(PageConfig.page.totalepisodes / PageConfig.page.pageSize);
                if (PageConfig.page && i > 1) {
                    var o = PageConfig.page;
                    var r = o.pageSize;
                    var s = o.totalepisodes;
                    var l = o.numTypePageNum;
                    this.renderDramaTab(l, r, s)
                }
                this.mod = new n;
                this.mod.bind("getPageData:success", this.rendPageDate.bind(this));
                if (3 != PageConfig.playmode) {
                    this.$listWrapDiv.html("");
                    this.addListContents("page" + PageConfig.page.numTypePageNum || 1)
                }
            },
            events: {
                "click .tab-more": "expendDramaList",
                "click .drama-tab a": "selectDramaList"
            },
            expendDramaList: function() {
                this.dramaTab.toggleClass("tab-expand")
            },
            selectDramaList: function(e) {
                var t = $(e.currentTarget);
                var i = $(".tab-more", this.el);
                if (t.hasClass("current-tab")) return;
                else {
                    $(".current-tab", this.dramaTab).removeClass("current-tab");
                    t.addClass("current-tab")
                }
                if (t.parents(".drama-more-wrap").length) i.html($(e.currentTarget).text()).addClass("active");
                else i.html(i.attr("txt")).removeClass("active");
                $(".drama-tab").removeClass("tab-expand");
                this.addListContents("page" + t.attr("rel"))
            },
            renderDramaTab: function(e, n, a) {
                var o = [];
                var r = [];
                var s = Math.ceil(a / n);
                var l = '<div class="drama-tab	">\n<dt>\n<% list.forEach(function(t, i){ %>\n<%if(i<3){%>\n<span >\n<a href="javascript:void(0);" class="<%if(cur[2]==(i+1)){%>current-tab<%}%>" rel="<%=t[2]%>" ><%=t[0]%>-<%=t[1]%></a>\n</span>\n<%}%>\n<%if (i==3){ %>\n<%if(cur[2]<4 || cur.length==0){%>\n<span txt="<%=txt%>" class="tab-more">\n<%=txt%>\n</span>	\n<%} else {%>\n<span txt="<%=txt%>"  class="tab-more active">\n<%=cur[0]%>-<%=cur[1]%>\n</span>	\n<%}%>\n<%}%>\n<% }); %> 						\n</dt>\n<dd class="drama-more-wrap">\n<% list.forEach(function(t, i){ %>\n<%if(i>=3){%>\n<span >\n<a href="javascript:void(0);" class="<%if(cur[2]==(i+1)){%>current-tab<%}%>" rel="<%=t[2]%>" ><%=t[0]%>-<%=t[1]%></a>\n</span>\n<%}%>\n<% }); %> 												\n</dd>									\n</div>';
                var d = 97 == PageConfig.catId ? "����缯" : "������Ƶ";
                if ($(".drama-tab", this.$el).length) return;
                for (i = 1; i <= s; i++) {
                    var c = [];
                    c.push((i - 1) * n + 1);
                    if (i == s) c.push(a);
                    else c.push(i * n);
                    c.push(i);
                    o.push(c);
                    if (i == e) r = c
                }
                var u = t.compile(l)({
                    list: o,
                    cur: r,
                    txt: d
                });
                this.$listWrapDiv.before(u);
                this.dramaTab = $(".drama-tab", this.el);
                window.setTimeout(function() {
                    $("#Drama").trigger("list:update")
                }, 0)
            },
            addListContents: function(e) {
                var t = "listitem_";
                if (this.loading) return;
                if (this.$listWrapDiv.length) {
                    this.divId = t + e;
                    var i = $("#" + this.divId);
                    if (i.length) {
                        this.$listWrapDiv.find(">div").hide();
                        i.show();
                        this.trigger("pages:change", [])
                    } else {
                        var n = e.replace("page", "");
                        self.loading = true;
                        this.getPageData(n)
                    }
                }
            },
            getPageData: function(e) {
                var t = "",
                    i;
                t = "page/playlist?";
                i = {
                    l: "debug",
                    pm: PageConfig.playmode,
                    vid: PageConfig.videoId,
                    fid: PageConfig.folderId,
                    showid: PageConfig.showid,
                    sid: PageConfig.singerId,
                    page: e
                };
                this.mod.getPageData(t, i)
            },
            rendPageDate: function(e) {
                var t = $("<div>").attr("id", this.divId);
                t.html(e.html);
                this.$listWrapDiv.find(">div").hide();
                this.$listWrapDiv.append(t);
                t.show();
                if (!$(".drama-tab", this.$el).length && e.data.total > e.data.pl) this.renderDramaTab(e.data.page, e.data.pl, Math.min(e.data.total, 950));
                this.loading = false;
                this.trigger("pages:change", [])
            }
        });
        return a
    });
    define("tui/switchTab", ["tui/event"], function(e) {
        var t = function(t) {
            this.op = t || {};
            this.op.slide = t.slide || false;
            this.op.linktab = t.linktab || false;
            this.op.clicktab = t.clicktab || false;
            if (!t.box) return;
            var a = this;
            var o = this.box = $(t.box);
            var r = this.tab = $(t.tab || ".tab li", o);
            var s = this.panel = $(t.panel || ".c", o);
            this.event = new e;
            this.size = r.length || s.length;
            this.loop = t.loop || 0;
            this.current = i(r.filter(".current")[0]);
            if (t.slide) {
                this.scroll = s.parent().parent();
                this.scroll.scrollLeft(0);
                s.eq(this.current).find(".lazyImg").loadImgSrc();
                s.parent().append(s.eq(0).clone());
                this.panel = $(t.panel || ".c", o);
                this.width = s.width();
                this.delay = t.delay || 700;
                this.loop = (this.loop || 5e3) + this.delay;
                this.anilock = false
            }
            if (this.size < 2) return;
            if (t.clicktab) r.click(function(e) {
                e.preventDefault();
                a.go(i(this))
            });
            else {
                if (!t.linktab) r.click(function(e) {
                    e.preventDefault()
                });
                r.mouseenter(function() {
                    n(a.timer, a.looptimer);
                    var e = this;
                    a.timer = setTimeout(function() {
                        a.go(i(e))
                    }, 200)
                }).mouseleave(function() {
                    n(a.timer, a.looptimer);
                    a.start()
                })
            }
            if (a.loop) {
                a.check(t.clicktab ? r : null);
                a.start()
            }
        };
        t.prototype = {
            on: function(e, t) {
                this.box.eventProxy(e, t);
                return this
            },
            bind: function(e, t) {
                this.event.bind(e, t);
                return this
            },
            go: function(e, t) {
                e = t ? e : Math.min(Math.max(e, 0), this.size - 1);
                this.event.fire("before", [this.current, e, this]);
                if (this.op.slide) {
                    if (this.anilock) {
                        this.nextstep = function() {
                            this.animate(e, t)
                        };
                        return
                    }
                    this.animate(e, t)
                } else {
                    this.current = e % this.size;
                    this.event.fire("change", [this.current, this]);
                    this.tab.removeClass("current").eq(this.current).addClass("current");
                    this.panel.hide().eq(this.current)[this.op.fade ? "fadeIn" : "show"](this.op.duration ? this.op.duration : 0);
                    this.event.fire("after", [this.current, this])
                }
            },
            prev: function(e) {
                this.go(this.current - 1, e)
            },
            next: function(e) {
                this.go(this.current + 1, e)
            },
            start: function(e) {
                var t = this;
                if (t.loop) {
                    n(t.looptimer);
                    if (e) t.start();
                    t.looptimer = setTimeout(function() {
                        t.start();
                        t.next(true)
                    }, t.loop)
                }
            },
            stop: function() {
                n(this.looptimer)
            },
            check: function(e) {
                var t = this;
                (e || t.panel).mouseenter(function() {
                    n(t.looptimer)
                }).mouseleave(function() {
                    n(t.looptimer);
                    t.start()
                })
            },
            animate: function(e, t) {
                var i = this;
                var a = i.current;
                if (i.anilock || a == e) return;
                n(i.looptimer);
                var o = i.size,
                    r = i.width,
                    s = i.panel,
                    l = i.scroll;
                var d = a > e ? 0 : r;
                var c = a > e ? r : 0;
                e %= t ? o + 1 : o;
                s.eq(e).show().find(".lazyImg").loadImgSrc();
                l.scrollLeft(c);
                i.tab.removeClass("current").eq(e % o).addClass("current");
                l.animate({
                    scrollLeft: d
                }, i.delay, "easeInOutQuad", function() {
                    s.eq(a).hide();
                    if (t && e == o) {
                        e %= o;
                        s.eq(0).show().find(".lazyImg").loadImgSrc();
                        s.eq(o).hide()
                    }
                    l.scrollLeft(0);
                    i.current = e;
                    i.anilock = false;
                    i.event.fire("after", [i.current, i]);
                    if (i.nextstep) {
                        i.nextstep();
                        i.nextstep = null
                    }
                    if (t) i.start()
                });
                i.anilock = true
            }
        };

        function i(e) {
            if (e && e.tagName) {
                var t = "a" == e.tagName.toLowerCase() ? $(e) : $(e).find("a");
                t = t.length ? t : $(e);
                return (t.attr("rel") || t.attr("href").replace(/.*#(\d+)$/, "$1") || 1) - 1
            } else return 0
        }

        function n(e) {
            var t = arguments;
            for (var i = 0, n = t.length; i < n; i++) {
                var e = t[i];
                if (e) clearTimeout(e)
            }
            return null
        }
        return t
    });
    define("page/find/player/view/playlist", ["tui/view", "tui/cookie", "tui/switchTab", "tui/scrollbar2", "module/responsive", "page/find/player/view/pages"], function(e, t, i, n, a, o) {
        var r = e.extend({
            initialize: function() {
                var e = this;
                this.scroll = new n($(".scroller", this.el));
                this._resizeScroll();
                var t = $("#Dramalist_wrap .current", this.el);
                if (t.length) this.scroll.scrollToElement(t, {
                    pos: 300
                });
                this.pages = new o(PageConfig.page);
                this.pages.bind("pages:change", function() {
                    e.scroll.update();
                    e.loadScrollImage()
                });
                ykPlyr.bind("player:onPlayerStart", this.initOnPlayerStart.bind(this));
                a.bind("responsed", function(t) {
                    e._resizeScroll()
                });
                this.$el.bind("list:update", function() {
                    e._resizeScroll()
                })
            },
            initOnPlayerStart: function(e) {
                if (e.isFullScreen) {
                    this.upTitle();
                    try {
                        if ("replaceState" in history) {
                            var i = "/v_show/id_" + PageConfig.videoId2 + ".html";
                            if (PageConfig.folderId)
                                if (0 == PageConfig.folderId) i = i;
                                else i += "?f=" + PageConfig.folderId;
                            var n = {
                                url: i
                            };
                            history.replaceState(n, "", i)
                        }
                    } catch (a) {}
                } else {
                    var o = t("u");
                    if ("__LOGOUT__" == o && (0 == PageConfig.DuboLoginLimitTime || !PageConfig.DuboLoginLimitTime) && (0 == PageConfig.SubscribeLoginLimitTime || !PageConfig.SubscribeLoginLimitTime)) {
                        var r = 3;
                        var s = t("view") || 0;
                        if (s >= r || s < 0) {
                            setTimeout(function() {
                                try {
                                    ykPlyr.pauseVideo(true);
                                    ykPlyr.zoomOut()
                                } catch (e) {}
                            }, 2e3);
                            t("view", 0, {
                                expires: 1
                            });
                            PageConfig.login_player8 = true;
                            $("#qheader_login").trigger("click")
                        } else t("view", ++s, {
                            expires: 1
                        })
                    }
                }
            },
            upTitle: function() {
                var e = PageConfig.videoId2;
                var t = "item_";
                var i = $('[item-id="' + t + e + '"]');
                var n = i.attr("title");
                var a = $("#subtitle");
                $(".item.current", this.el).removeClass("current");
                i.addClass("current");
                if (a.length && "" != n && a.html() != n) {
                    a.html(n);
                    a.parent().attr("title", n);
                    document.title = n
                }
            },
            _resizeScroll: function() {
                var e = $("#player_sidebar").height() - $(".scroll-area").position().top;
                $(".scroll-area,.scroller,.scrollbar_track", $("#Drama")).height(e);
                this.scroll.update();
                this.loadScrollImage()
            },
            loadScrollImage: function() {
                var e = this;
                var t = $(".scroller", this.el);
                var i = t.find("img[_src]");
                var n = [];
                var a = t.height();
                setTimeout(function() {
                    o(0)
                }, 50);
                if (i.length) $.each(i, function(e, t) {
                    n.push([$(t).closest(".item").position().top, i.eq(e)])
                });
                this.scroll.bind("scroll", function(e) {
                    setTimeout(function() {
                        o(e)
                    }, 100)
                });

                function o(e) {
                    var t = 0;
                    while (n.length) {
                        if (n[0][0] < e + a + 200) {
                            var i = n[0][1];
                            i.attr("src", i.attr("_src"));
                            n.shift()
                        } else break;
                        t++
                    }
                }
            }
        });
        return r
    });
    define("page/find/player/view/main", ["tui/view", "page/find/player/view/playlist", "page/find/player/view/feePaymentPro", "page/find/player/view/sideControl"], function(e, t, i, n) {
        var a = e.extend({
            initialize: function(e) {
                a.superClass.initialize.call(this);
                var i = this;
                this.Playlist = new t({
                    el: "#Drama"
                });
                if (PageConfig.tabs) this.tabsInit()
            },
            tabsInit: function() {
                var e = PageConfig.tabs.split(",");
                $.each(e, function(e, t) {
                    if ("feeinfo" == t) new i
                })
            }
        });
        return a
    });
    define("page/find/player/model/chest", ["tui/event", "tui/net", "tui/util/num"], function(e, t, i) {
        var n = e.extend({
            initialize: function() {
                var e = this;
                n.superClass.initialize.call(e);
                e.op = {
                    callbackName: "callback",
                    charset: "utf-8"
                };
                e.pickedNum = null;
                e.feimuNum = 0
            },
            getFeiMu: function() {
                var e = this;
                var i = 1 * new Date;
                t.getJSON("//hudong.alicdn.com/api/data/v2/8d1cc55926754b5996cda4c1e7ebbc5a.js?t=" + 1 * new Date, {}, function(t) {
                    if (t.isShow || "57700" == PageConfig.showid || "774932586" == PageConfig.videoId)
                        if (i > t.actStart && i < t.actEnd) {
                            e.trigger("getFeiMu:success", [t.data]);
                            if (0 == e.feimuNum) {
                                e.feimuNum++;
                                e.trigger("feiMuEnterance:render", [t])
                            }
                        }
                }, {
                    callbackName: "callback",
                    charset: "utf-8",
                    callback: "feimuCallback"
                })
            },
            getChestStaus: function(e) {
                var i = this;
                t.getJSON("//hudong.alicdn.com/api/data/v2/e6d5d8a751874a48bb887e80ea9637e7.js?t=" + 1 * new Date, {}, function(e) {
                    if (e.isShow) i.trigger("getChestStaus:success", [e.data[0]])
                }, {
                    callbackName: "callback",
                    charset: "utf-8",
                    callback: "boxShowCallback"
                })
            },
            getGoldBoxList: function(e) {
                var i = this;
                var n = _getUA && _getUA();
                t.mtopRequest({
                    api: "mtop.youku.feed.service.promotion.getGoldBoxListPcweb",
                    type: "post",
                    v: "1.0",
                    data: {
                        asac: "1A17A20TQX3PBND6YEPS7X",
                        ua: n
                    },
                    appKey: "23536927"
                }).then(function(e) {
                    if (null == i.pickedNum) {
                        i.pickedNum = e.data.pickedNum;
                        if (1 == e.data.pickedNum && 0 == e.data.openNum) i.trigger("getGoldBox:success", [e.data]);
                        else i.trigger("getNotice:success", [e.data])
                    } else if (i.pickedNum != e.data.pickedNum) {
                        i.pickedNum = e.data.pickedNum;
                        i.trigger("getGoldBox:success", [e.data])
                    } else i.trigger("getNotice:success", [e.data])
                }, function(e) {
                    i.trigger("getGoldBox:fail", [])
                })
            }
        });
        return n
    });
    define("page/find/player/player/chest", ["tui/art", "tui/view", "tui/net", "tui/cookie", "module/login/login", "page/find/player/model/chest"], function(e, t, i, n, a, o) {
        var r = {};
        var s = new o;
        var l = t.extend({
            initialize: function(e) {
                l.superClass.initialize.call(this);
                var t = this;
                this.$el = $("#playerBox");
                this.layerContent = $(".h5-layer-conatiner", this.$el);
                this.rightCtlPlane = $(".h5-control-wrap .control-right-grid", this.$el);
                this.popup = $("#player_sidebar", this.$el);
                this.cacheFeimu = [];
                this.hasFeimu = false;
                this.hasPopup = false;
                s.bind("getFeiMu:success", this.initFeiMuPop.bind(this));
                s.bind("feiMuEnterance:render", this.initFeiMu.bind(this));
                s.bind("getChestStaus:success", this.initChestStatus.bind(this));
                setTimeout(function() {
                    s.getFeiMu()
                }, 1e3);
                setInterval(function() {
                    s.getFeiMu()
                }, 6e4);
                if (1 != PageConfig.playmode) setTimeout(function() {
                    if (t.hasFeimu) return;
                    s.getChestStaus()
                }, 1500);
                window.GoldBoxLogin = function(e) {
                    if (window.YKLoginLoader && YKLoginLoader.getInstance) {
                        var i = YKLoginLoader.getInstance();
                        i.updateConfig({
                            configId: "038af5d332901a43"
                        })
                    }
                    a.login(function() {
                        t.log("show", {
                            mid: "1008",
                            mname: "globboxlogin"
                        });
                        e && e()
                    })
                };
                window.GoldBoxLayerClose = function() {
                    t.closeChestLayer()
                };
                $("body").bind("responsive", function(e, i) {
                    if ($("#chestLayer").length) t.openChestLayer("response=" + i)
                })
            },
            events: {
                "click .control-chest-icon": "clickChest",
                "click .control-feimu-icon": "clickFeimu",
                "click .h5-layer-conatiner .chest-poplayer": "clickPopChest",
                "click .h5-layer-conatiner .feimu-poplayer": "clickPopFeiMu",
                "mouseenter .h5-layer-conatiner .chest-poplayer,.h5-layer-conatiner .feimu-poplayer": "enterPop",
                "mouseleave .h5-layer-conatiner .chest-poplayer,.h5-layer-conatiner .feimu-poplayer": "leavePop",
                "click .chestLayerClose": "closeChestLayer"
            },
            initChestStatus: function(e) {
                var t = 1 * new Date;
                if (d(e.deliveryType))
                    if (t >= e.start && t <= e.end) {
                        r.cms = e;
                        this.initChest()
                    }
            },
            initChest: function() {
                var t = this;
                t.popNoticeNum = 0;
                s.bind("getNotice:success", this.getNotice.bind(this));
                s.bind("getGoldBox:success", this.getGoldBox.bind(this));
                s.bind("getGoldBox:fail", this.getGoldBoxFail.bind(this));
                if (!$(".control-chest-icon", this.$el).length) {
                    var i = '<button data-tip="<%=data.name%>" class="control-icon control-chest-icon"><img src="<%=data.image%>" width=38 height=38 /></button>';
                    var n = e.compile(i)({
                        data: r.cms
                    });
                    this.log("show", {
                        mid: "1006",
                        mname: "magicbox"
                    });
                    this.rightCtlPlane.prepend(n);
                    this.$chestBtn = $(".control-chest-icon", this.$el)
                }
                s.getGoldBoxList()
            },
            initFeiMu: function(t) {
                var i = '<a target="_blank" href="<%=data.actUrl%>" data-tip="<%=data.actTitle%>" class="control-icon control-feimu-icon"><img src="<%=data.actIcon%>" width=38 height=38 /></a>';
                var n = e.compile(i)({
                    data: t
                });
                this.hasFeimu = true;
                this.log("show", {
                    mid: "1008",
                    mname: "rtpushopen"
                });
                this.rightCtlPlane.prepend(n)
            },
            initFeiMuPop: function(e) {
                var t = this;
                var i = 1 * new Date;
                if (e.length) $.each(e, function(e, n) {
                    if (i < n.end && i > n.start && n.isShow)
                        if (t.cacheFeimu.indexOf(n.id) < 0) {
                            t.cacheFeimu.push(n.id);
                            t.showFeimuPop(n);
                            return false
                        }
                })
            },
            getNotice: function(e) {
                r.mtop = e;
                if (e.nextCallTime > 0) {
                    r.popType = "yugao";
                    this.showPop(e)
                }
            },
            getGoldBoxFail: function() {
                this.$chestBtn.remove()
            },
            getGoldBox: function(e) {
                if (!n("ChestStatus") || e.pickedNum > 1) {
                    if (1 == e.pickedNum) this.popNoticeNum++;
                    r.mtop = e;
                    r.popType = "lingqu";
                    n("ChestStatus", 1, {
                        expires: this.getCookieTime()
                    });
                    this.showPop(e)
                } else this.getNotice(e)
            },
            log: function(e, t) {
                if ("show" == e) goldlog && goldlog.record("/yt/show.index.module", "EXP", $.param(t), "H1505507054");
                else goldlog && goldlog.record("/yt/click.index.module", "CLK", $.param(t), "H1505507054")
            },
            clickPopChest: function(e) {
                if ($(e.currentTarget).hasClass("lingqu")) this.log("click", {
                    mid: "1005",
                    mname: "win"
                });
                else this.log("click", {
                    mid: "1004",
                    mname: "magic_tips"
                });
                this.openChestLayer();
                this.hidePop(1e3)
            },
            clickPopFeiMu: function() {
                this.log("click", {
                    mid: "1007",
                    mname: "rtpush"
                });
                this.hidePop(1e3)
            },
            clickChest: function(e) {
                this.log("click", {
                    mid: "1006",
                    mname: "magicbox"
                });
                this.openChestLayer()
            },
            clickFeimu: function(e) {
                this.log("click", {
                    mid: "1008",
                    mname: "rtpushopen"
                })
            },
            openChestLayer: function(e) {
                var e, t;
                var i = videoPlayer.getPlayerState() || {};
                if (i.fullscreen) videoPlayer.exitFullscreen();
                if ($("#playerBox").hasClass("playBox_thx")) $("#expandlink").trigger("click");
                e = e || ($("body").hasClass("w1080") ? "response=1080" : "");
                t = r.cms.url + "?" + e;
                if ($("#chestLayer").length) $("#chestFrame").attr("src", t);
                else {
                    var n = '<div id="chestLayer"><iframe id="chestFrame" src="' + t + '"></iframe><a class="chestLayerClose" href="javascript:void(0);">�ر�</a></div>';
                    $("#module_basic_playlist").append(n)
                }
            },
            closeChestLayer: function() {
                $("#chestLayer").remove()
            },
            showFeimuPop: function(t) {
                var i = this;
                var n = '<a href="<%=data.url%>" target="_blank" style="display:none;" class="feimu-poplayer"> \n<em><%=data.content%></em>\n<%if(data.image){%>\n<img src="<%=data.image%>" width=66 height=62 />\n<%}%>\n</a>';
                this.$pop = $(e.compile(n)({
                    data: t
                }));
                if ($(".chest-poplayer ", this.$el).length) $(".chest-poplayer ", this.$el).remove();
                if ($(".feimu-poplayer ", this.$el).length) return;
                i.popNoticeNum++;
                this.layerContent.append(this.$pop);
                this.log("show", {
                    mid: "1007",
                    mname: "rtpush"
                });
                this.$pop.fadeIn("slow", function() {
                    i.hidePop(1e3 * t.showTime || 8e3)
                })
            },
            showPop: function(t) {
                var i = this,
                    n;
                if (r.mtop.nextCallTime) i.countdown = setTimeout(function() {
                    s.getGoldBoxList()
                }, 1e3 * 60 * r.mtop.nextCallTime);
                if ($(".feimu-poplayer ", this.$el).length) return;
                if ($(".chest-poplayer ", this.$el).length) $(".chest-poplayer ", this.$el).remove();
                if ("yugao" == r.popType) {
                    if (i.popNoticeNum > 0 || 0 == t.openNum) return;
                    i.popNoticeNum++;
                    this.log("show", {
                        mid: "1004",
                        mname: "magic_tips"
                    })
                } else this.log("show", {
                    mid: "1005",
                    mname: "win"
                });
                n = '<a href="javascript:void(0);" style="display:none;" class="chest-poplayer <%=data.popType%>"> \n<%if(data.popType==\'yugao\'){%>\n<%=data.cms.noticeBubble.text1%><%=data.mtop.nextCallTime%>����<%=data.cms.noticeBubble.text2%>\n<%}else{%>\n<%if(data.mtop.pickedNum==1){%>\n�ѻ��1�����䣬�������\n<%}else{%>\n<%=data.cms.receiveBubble%>\n<%}%>\n<%}%>\n<img src="<%=data.cms.image%>" width=38 height=38 />\n</a>';
                this.$pop = $(e.compile(n)({
                    data: r
                }));
                this.layerContent.append(this.$pop);
                this.$pop.fadeIn("slow", function() {
                    i.hidePop()
                })
            },
            hidePop: function(e) {
                var t = this;
                this.handle = setTimeout(function() {
                    t.$pop.fadeOut("slow", function(e) {
                        t.$pop.remove()
                    })
                }, e || 1e4)
            },
            enterPop: function() {
                clearTimeout(this.handle)
            },
            leavePop: function() {
                this.hidePop()
            },
            getCookieTime: function() {
                var e = 1 * new Date;
                var e = e - e % (24 * 60 * 1e3 * 60) + 24 * 60 * 1e3 * 60;
                return new Date(e)
            }
        });
        var d = function(e) {
            var t = false;
            for (var i in e)
                if (e[i].length > 0 && e[i].split(",").indexOf(PageConfig[i]) >= 0) {
                    t = true;
                    break
                }
            return t
        };
        return l
    });
    define("page/find/player/player/pipAd", ["tui/event", "tui/net", "tui/art", "module/ad/util"], function(e, t, i, n) {
        var a = null;
        var o = 1e3 * 10 * 60;
        var r = false;
        var s = false;
        var l;

        function d(e) {
            return e && "" != e && null != e && "null" != e && "undefined" != e
        }
        var c = e.extend({
            initialize: function() {
                var e = this;
                this.prePip = $("<div>").attr("id", "ab_pip_pre")
            },
            adInit: function(e, t) {
                var i = this;
                if (!e) return;
                t += 1;
                for (; t < e.length; t++)
                    if (e[t]) {
                        var n = e[t];
                        if (d(n.F1) && d(n.CU)) {
                            r = true;
                            break
                        }
                    }
                if (e && e[t]) $("#module_ad_61201").append(this.prePip);
                if (r) {
                    this.show_pip();
                    this.ab_v_ad1()
                }
            },
            midAdInit: function(e, t) {
                var i = this;
                $("#module_ad_61201").append(this.prePip);
                if (e && e[t]) {
                    this.show_pip();
                    this.ab_v_ad1()
                }
            },
            analyzeContent: function(e) {
                var n = e.F1;
                var a = e.CU;
                var o = /\.swf$/i.test(n);
                var s = /<\/script>$/.test(n);
                var l = '<div id="f1_ideaid" class="mod">\n<%if(isSwf){%>\n<object type="application/x-shockwave-flash" data="<%=data.flash%>" width="300" height="<%=data.F3%>">\n<param name="wmode" value="transparent">\n<param name="movie" value="<%=data.flash%>" width="300" height="<%=data.F3%>" />\n<embed src="<%=data.flash%>" width="300" height="<%=data.F3%>" border="0" align="center" wmode="transparent"/>\n</object>\n<%}else{%>\n<a href="<%=data.CU%>" target="_blank">\n<img src="<%=data.F1%>" border="0" id="bas_ideaid"/>\n</a>\n<%}%>\n</div>';
                var c = s ? "script" : "html";
                var u = Math.random();
                t.getRequest("//count.atm.youku.com/msg?s=yth&k=6&msg=expose|" + c);
                if (o) e.flash = e.F1 + "?url=" + escape(e.CU);
                if (s) {
                    $(document.body).append(n);
                    t.getRequest("//count.atm.youku.com/msg?s=yth&k=6&msg=script");
                    return
                }
                if (d(n) && d(a)) {
                    e.F3 = 50;
                    this.prePip.html(i.compile(l)({
                        data: e,
                        isSwf: o
                    }));
                    t.getRequest("//count.atm.youku.com/msg?s=yth&k=6&msg=html");
                    r = true
                }
            },
            show_pip: function() {
                this.prePip.show();
                $("#ab_v_61201").hide()
            },
            ab_v_ad1: function() {
                var e = this;
                if (l) clearTimeout(l);
                l = setTimeout(function() {
                    $("#ab_v_61201").show();
                    e.prePip.hide()
                }, o)
            }
        });
        c.getInstance = function() {
            if (a) return a;
            else return a = new c
        };
        return c.getInstance()
    });
    define("page/find/player/player/playerCallbacks", ["tui/net", "tui/cookie", "tui/common", "tui/util/url", "tui/encrypt/macmd5", "module/login/login", "module/responsive", "page/find/player/player/pipAd", "page/find/player/view/iku"], function(e, t, i, n, a, o, r, s, l, d, c) {
        var u = i.empty;
        var f = window;
        var p;
        var h = {
            func_referrer: v,
            playerLogin: g,
            setDanmuStatus: y,
            onPlayerStart: b,
            PlayerPlayNext: k,
            PlayerPlayPre: w,
            onTrialEnd: x,
            onPlayerSet: C,
            onPlayerStageVideo: T,
            onPlayerComplete: S,
            onAddScriptContent: P,
            getPlayerCNA: I,
            onPlayerPreAdInit: A,
            onPlayerLastAdInit: A,
            onPlayerMidAdInit: L,
            playerSubscribe: D,
            playerToIku: R,
            jumpToRegister: _
        };
        var m = {
            setDanmuStatus: y,
            onPlayerStart: b,
            PlayerPlayNext: k,
            onTrialEnd: x,
            onPlayerSet: C,
            onPlayerComplete: S,
            onAddScriptContent: P,
            onPlayerPreAdInit: A,
            onPlayerLastAdInit: A,
            onPlayerMidAdInit: L,
            playerSubscribe: D,
            playerToIku: R
        };

        function v() {
            return document.referrer
        }

        function g() {
            o.login()
        }

        function y(e) {
            if (!!e) {
                $("body").addClass("danmuon");
                $("body").removeClass("danmuoff");
                r.trigger("player:responsive")
            } else {
                $("body").addClass("danmuoff");
                $("body").removeClass("danmuon");
                r.trigger("player:responsive")
            }
            $("#Drama").trigger("list:update")
        }

        function _(e) {
            var e = e || {};
            window.ykPlyr.trigger("authenPhone", ["authenFromPlayer", {
                url: e.message || "https://id.youku.com/bindMobileView.htm",
                wrap: $("#module_basic_playbox"),
                cancleCb: function() {},
                authenCb: function() {
                    ykPlyr.regComplete()
                }
            }])
        }

        function b(e) {
            var t = this;
            t.playerStart = true;
            e.isFullScreen = e.vid && e.vidEncoded && "undefined" != e.vid && "undefined" != e.vidEncoded && e.vid != PageConfig.videoId && PageConfig.videoId2 != e.vidEncoded;
            if (e.isFullScreen) {
                PageConfig.preVideId2 = PageConfig.videoId2;
                PageConfig.videoId = e.vid;
                PageConfig.videoId2 = e.vidEncoded;
                t.trigger("player:onPlayerStartUpdate");
                goldlog && goldlog.record("/yt/youkuplayer.fdl.ykplayer_pv", "EXP", "", "H1506430579");
                if (f.cateStr) cateStr = cateStr.replace(/\d+$/, PageConfig.videoId);
                try {
                    if ("replaceState" in history) {
                        var i = "/v_show/id_" + PageConfig.videoId2 + ".html";
                        if (PageConfig.folderId)
                            if (0 == PageConfig.folderId) i = i;
                            else i += "?f=" + PageConfig.folderId;
                        var n = {
                            url: i
                        };
                        history.replaceState(n, "", i)
                    }
                } catch (a) {}
            }
            t.trigger("player:onPlayerStart", [e]);
            $("body").trigger("appearBspool");
            if (e.next) C({
                continuous: e.next ? 1 : 0
            })
        }

        function k(e) {
            if (e.isFullScreen) return true;
            var t = parseInt(PageConfig.playmode);
            var i = n.params();
            var a = "/v_show/id_";
            var o = $('[item-id="item_' + e.vidEncoded + '"]>a')[0] || $("body")[0];
            if (window.g_SPM && o) i.spm = window.g_SPM.spm(o);
            if (2 == t) {
                if (u(e.vidEncoded) || u(e.Fid)) return false;
                if (0 == PageConfig.forder) i.o = 0;
                i.f = e.Fid;
                a += e.vidEncoded + ".html"
            } else {
                var r = e.vidEncoded;
                if (!r) return false;
                if (4 == t) a += r + "_type_99" + ".html";
                else {
                    a += r + ".html";
                    if (!!PageConfig.singerId && "0" != PageConfig.singerId) i.sid = PageConfig.singerId;
                    if (!!PageConfig.showid_en) i.s = PageConfig.showid_en
                }
            }
            f.location.href = a + "?" + $.param(i);
            return true
        }

        function w(e) {
            if (e.isFullScreen) return true;
            var t = parseInt(PageConfig.playmode);
            if (2 == t) {
                if (u(e.vidEncoded) || u(e.Fid)) return false;
                var i = "";
                if (0 == PageConfig.forder) i = "&o=0";
                f.location.href = "/v_show/id_" + e.vidEncoded + ".html?f=" + e.Fid + i
            } else {
                if (e.vidEncoded) preId = e.vidEncoded;
                if ("" == preId) return false;
                if (4 == t) f.location = "/v_show/id_" + preId + "_type_99" + ".html";
                else f.location = "/v_show/id_" + preId + ".html"
            }
            return true
        }

        function x() {
            f.trialEnd = true
        }

        function C(e) {
            t("P_F", e.continuous);
            var i = parseInt((new Date).getTime() / 1e3) + 3600 * 2;
            t("P_T", i)
        }

        function T(e) {
            if (true == e) t("stgvd", 1, 7);
            else t("stgvd", 1, -1);
            setTimeout(function() {
                f.location.reload()
            }, 100)
        }

        function S(e) {
            var e = e || {};
            var i = this;
            if (f.trialEnd || e && e.loop) return false;
            var n = parseInt(PageConfig.playmode);
            var a = 4 == n ? "W_P_L_M" : "P_L_M";
            var o = t(a);
            var r = t("P_F");
            var s = false;
            if (2 == n && void 0 !== e.Pt) PageConfig.fpos = e.Pt;
            var l = parseInt((new Date).getTime() / 1e3);
            e.playNextType = "auto";
            if (1 == r) {
                var d = f.playerNextVid;
                if (d)
                    if (e.isFullScreen) {
                        p.playVideoByID && p.playVideoByID(d);
                        return false
                    } else {
                        if (1 == o) {
                            setTimeout(function() {
                                i.PlayerSeek(0)
                            }, 500);
                            return false
                        }
                        e.vidEncoded = d;
                        k(e);
                        return false
                    }
            }
            if (1 == r) s = k(e);
            i.trigger("player:onPlayerComplete", [e])
        }

        function E(e) {
            var t = this;
            t.trigger("player:playerState", [e])
        }

        function P(e) {
            var t = unescape(e);
            var i = document.createElement("script");
            i.type = "text/javascript";
            i.text = t;
            document.getElementsByTagName("head")[0].appendChild(i)
        }

        function I() {
            return t("cna") || ""
        }

        function A(e, t) {
            s.adInit(e, t)
        }

        function L(e, t) {
            s.midAdInit(e, t)
        }

        function D(t, i, n) {
            function r(e) {
                var t, i = {},
                    n = [];
                for (t in e) e.hasOwnProperty(t) && n.push(t);
                for (n.sort(), t = 0; t < n.length; t++) i[n[t]] = e[n[t]];
                return i
            }

            function s(e) {
                var t = "6T7;!dATxQNnVz1R",
                    i = r(e),
                    n = [],
                    o = "";
                for (var s in i) i.hasOwnProperty(s) && "undefined" != typeof i[s] && null !== i[s] && "" !== i[s] && n.push(s + "=" + i[s]);
                var l = n.join("&");
                return o = a(String(l), t)
            }
            var l = this;
            var d = {
                friend_uid: i,
                user_type: 0,
                addtion: n.stype || "9-2"
            };
            var c = s(d);
            d.sign = c;
            o.login(function() {
                e.getJSON("//ding.youku.com/u/friendshipsCreateV2", d, function(e) {
                    if (0 == e.error_code || e.error_code == -302) {
                        l.callPlayerFunction && l.callPlayerFunction("playerSubscribed", {
                            followd: true
                        });
                        "function" === typeof t && t(e);
                        window.ykPlyr.trigger("player:onPlayerStartUpdate")
                    } else {
                        alert("����ʧ��");
                        return false
                    }
                }, {
                    callbackName: "callback",
                    charset: "utf-8"
                })
            })
        }

        function R(e) {
            e = !e ? "ywebplayererror" : e;
            var t = "ywebadddesktop" == e ? "adddesktop" : "play";
            try {
                var i = {
                    from: "video",
                    action: t,
                    secne: e
                };
                l.ikuExecuteFrompc(i)
            } catch (n) {}
        }
        return {
            h5Bind: function(e, t) {
                p = e;
                $.each(m, function(i, n) {
                    e.on(i, n.bind(t))
                })
            },
            swfBind: function(e) {
                var t = e;
                p = document.getElementById("movie_player");
                for (var i in h) {
                    var n = h[i];
                    n && (f[i] = n.bind(t))
                }
            }
        }
    });
    define("page/find/player/player/h5playerdanmu", ["module/login/login"], function(e) {
        var t = function(t) {
            if ("undefined" == typeof ykDanmu) return false;
            var i = new ykDanmu({
                el: "#playerBox",
                video: t,
                className: "#ykPlayer",
                starbox: "#ykPlayer",
                dmSwitchbox: ".vpactionv5_iframe_wrap",
                iid: PageConfig.videoId,
                aid: PageConfig.showid,
                cid: PageConfig.catId,
                vcode: PageConfig.videoId2,
                ouid: PageConfig.videoOwner
            });
            t.on("PlayerPlayNext", function(e) {
                i.Playernext(e)
            });
            t.on("onPlayerStart", function(e) {
                i.PlayerStart(e)
            });
            t.on("onFullscreen", function(e) {
                i.fullscreen(e)
            });
            t.on("onTimeUpdate", function(e) {
                if (i.updatetime && (i.updatetime - e.currentTime < -30 || i.updatetime - e.currentTime > 30)) i.PlayerUpdata();
                i.updatetime = e.currentTime
            });
            t.on("dashboardStateChange", function(e) {
                if (e) i.control("hide");
                else i.control("show")
            });
            $("body").bind("scrollPlayer", function(e, t) {
                if ("narrow" == t.status) i.control("hide", "scrollPlayer");
                else i.control("show", "scrollPlayer")
            });
            i.login.loginFunc = function() {
                e.login()
            };
            e.bind("login:success", function() {
                i.login.emit("login:success")
            })
        };
        return t
    });
    define("page/find/player/player/playerFixed", ["tui/event", "tui/net", "tui/cookie", "tui/browser", "tui/util/throttle"], function(e, t, i, n, a) {
        var o = $(window);
        return e.extend({
            initialize: function(e) {
                this.ID = e.ID || "#player";
                this.dom = $(this.ID);
                this.player = document.getElementById("player");
                if (!this.dom.length || n.isMobile) return;
                this.domparent = this.dom.parent();
                this.domgrandparent = this.dom.closest(".playArea");
                if (!this.domparent.length || !this.domgrandparent.length) return;
                this.flashPlayer = window.ykPlyr && "flash" == window.ykPlyr.type;
                this.status = 0;
                this.isdrag = 0;
                this.sfw = 310;
                this.sfh = 175;
                $("#qheader").removeClass("g-header-fixed");
                this.bind()
            },
            bind: function() {
                var e = this;
                var t = 20,
                    i = this.dom.offset().top + this.dom.height() + t,
                    n = 0;
                this.createDOM();

                function r() {
                    var t = null;
                    n = o.scrollTop();
                    if (n > i) {
                        if ("fixed" == this.playerWin) return;
                        if (e.flashPlayer && 0 == e.status)
                            if (ykPlyr.check("showControlBar")) e.narrowPlayer();
                            else ykPlyr.bind("player:loaded", function() {
                                e.narrowPlayer()
                            });
                        $("#qheader").addClass("g-header-fixed");
                        this.playerWin = "fixed"
                    } else {
                        if ("static" == this.playerWin) return;
                        if (e.flashPlayer && 1 == e.status) e.revertPlayer(e.dom);
                        $("#qheader").removeClass("g-header-fixed");
                        this.playerWin = "static"
                    }
                    return false
                }
                r();
                o.bind("scroll", a(r, 300))
            },
            createDOM: function() {
                this.playerDiv = $("<div>").addClass("player");
                this.$dragDiv = $("<div>").attr("id", "dragDIV")
            },
            revertPlayer: function() {
                this.status = 0;
                $("body").trigger("scrollPlayer", {
                    status: "revert"
                });
                this.dom[0].style.cssText = "";
                ykPlyr.showControlBar(true);
                this.domparent[0].removeChild(this.playerDiv[0]);
                this.$dragDiv.remove();
                this.domgrandparent[0].style.cssText = "";
                this.dragDestroy(this.dom);
                this.dom.removeClass("player-fixed")
            },
            narrowPlayer: function() {
                var e = this;
                this.status = 1;
                this.domparent.append(this.playerDiv);
                ykPlyr.showControlBar(false);
                $("body").trigger("scrollPlayer", {
                    status: "narrow"
                });
                e.getInitPos();
                this.dom.css({
                    position: "fixed",
                    width: this.sfw + "px",
                    height: this.sfh + "px",
                    left: this.left + "px",
                    top: "auto",
                    bottom: this.bottom + "px",
                    "z-index": "1002",
                    background: "#fff",
                    padding: "10px 10px 25px"
                });
                this.domgrandparent[0].style.cssText = "z-index:1280;";
                this.dom.addClass("player-fixed");
                var t = '<div id="dragHead" style="cursor:move;z-index:2;position:absolute;top:50%;margin-top:-12px;text-align:center;left:0;padding:0 10px;width:290px;height:24px;line-height:24px;background:#222;opacity:0.9;filter:alpha(opacity=90);color:#909090;font-size:16px;font-family:Microsoft YaHei,΢���ź�,helvetica,arial,verdana,tahoma,sans-serif;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;">�����ס��Ƶ���϶�</div>',
                    i = '<div id="dragHand" style="cursor:move;position:absolute;top:0;left:0;width:100%;height:100%;background:#222;"></div>';
                this.$dragDiv.attr("style", "z-index:2;position:absolute;top:0;left:0;width:310px;height:" + this.sfh + "px;margin:10px;display:none");
                this.$dragDiv.html(t + i);
                this.dom.append(this.$dragDiv);
                this.dragDIV(this.dom)
            },
            getPlayerInitLeftValue: function() {
                var e = this._getClientWidth();
                var t = e > 1281 ? 1190 : 970,
                    i = (e - t) / 2 + t - 310 - 10;
                return i
            },
            getInitPos: function() {
                var e = i("v_pos");
                var t = i("player_pos") || "";
                if (t.indexOf("%7C") > -1) i("player_pos", "");
                if (e) {
                    e = e.split("|");
                    if (e.length > 0) {
                        this.left = e[0];
                        this.bottom = e[1]
                    }
                } else {
                    this.left = this.getPlayerInitLeftValue();
                    this.bottom = 50
                }
            },
            dragDIV: function(e) {
                if (!e.length) return false;
                var t = this,
                    i = false,
                    n = false,
                    a, o, e = e[0],
                    r = document.getElementById("dragDIV");
                e.onmouseover = function(e) {
                    if (r) r.style.display = "block";
                    ykPlyr.hide()
                };
                e.onmouseout = function(e) {
                    if (r) r.style.display = "none";
                    ykPlyr.show();
                    if (false === n) i = false
                };
                e.onmousedown = function(e) {
                    var e = e || window.event;
                    i = true;
                    n = true;
                    if (e.screenX) {
                        a = e.screenX;
                        o = e.screenY
                    } else if (e.screenLeft) {
                        a = e.screenLeft;
                        o = e.screenTop
                    }
                    document.onmousemove = s
                };
                document.onmouseup = function(e) {
                    var e = e || window.event;
                    i = false;
                    n = false;
                    t._setPosition();
                    document.onmousemove = null
                };

                function s(e) {
                    var e = e || window.event;
                    if (false == i) return true;
                    var n, r;
                    if (e.screenX) {
                        n = e.screenX;
                        r = e.screenY
                    } else if (e.screenLeft) {
                        n = e.screenLeft;
                        r = e.screenTop
                    }
                    var s = n - a,
                        l = r - o;
                    a = n;
                    o = r;
                    var d = parseInt(t.player.style.left) + s,
                        c = parseInt(t.player.style.bottom) - l;
                    t.left = d;
                    t.bottom = c;
                    t.moveElement(t.dom, d, c);
                    t.isdrag = 1;
                    return false
                }
            },
            dragDestroy: function(e) {
                var e = e[0];
                e.onmouseover = e.onmouseout = e.onmousedown = null;
                ykPlyr.show()
            },
            moveElement: function(e, t, i) {
                var n = this._getClientWidth() - this.sfw - 20,
                    a = this._getClientHeight() - this.sfh - 20 - 80;
                if (t < 0) t = 0;
                if (t > n) t = n;
                if (i < 0) i = 0;
                if (i > a) i = a;
                e[0].style.left = t + "px";
                e[0].style.bottom = i + "px"
            },
            _getClientWidth: function() {
                var e;
                if (window.innerWidth) e = window.innerWidth;
                else if (document.body && document.body.clientWidth) e = document.body.clientWidth;
                if (document.documentElement && document.documentElement.clientWidth) e = document.documentElement.clientWidth;
                return e
            },
            _getClientHeight: function() {
                var e;
                if (window.innerHeight) e = window.innerHeight;
                else if (document.body && document.body.clientHeight) e = document.body.clientHeight;
                if (document.documentElement && document.documentElement.clientHeight) e = document.documentElement.clientHeight;
                return e
            },
            _setPosition: function() {
                if (isNaN(this.left) || isNaN(this.bottom)) return false;
                var e = this.left + "|" + this.bottom;
                i("v_pos", e, 60)
            }
        })
    });
    define("YoukuPlayer", [], function() {});
    define("page/find/play/util/util", [], function(e, t) {
        function i() {
            var e = "",
                t = "";
            if (window._getUA) e = _getUA();
            if (window.UA_Opt && e.length) {
                t = (UA_Opt.Token || "").split(":")[0];
                t = (new Date).getTime() - 1 * t;
                t = "#" + t
            }
            return e + t
        }
        return {
            getckey: i
        }
    });
    define("page/find/player/player/h5player", ["tui/view", "tui/cookie", "tui/net", "tui/util/url", "page/find/play/util/util", "module/login/login", "tui/util/codec", "module/responsive"], function(e, t, i, n, a, o, r, s) {
        var l = null;
        var d = e.extend({
            events: {
                "click .switch-flash": "switchToFlash"
            },
            initialize: function(e) {
                d.superClass.initialize.call(this);
                this.$el.append('<div class="h5-wrap"><div id="ykPlayer"></div></div>');
                var t = this,
                    n;
                n = this.getCfg();
                i.getScript("//g.alicdn.com/player/ykplayer/0.5.21/youku-player.min.js", function() {
                    require("YoukuPlayer", function(e) {
                        var i = $.extend(n, {
                            vid: PageConfig.videoId2,
                            currentShowId: PageConfig.showid,
                            ccode: "0502",
                            autoplay: true,
                            ckey: a.getckey(),
                            events: {
                                onReady: function() {
                                    t.trigger("player:loaded", [l])
                                }
                            }
                        });
                        window.videoPlayer = l = new e($("#ykPlayer")[0], i)
                    })
                })
            },
            getCfg: function() {
                var e = {},
                    i = {},
                    a = n.params() || {};
                if (void 0 != a.adext) e.adext = a.adext;
                if (void 0 != a.hotPreview) e.hotPreview = a.hotPreview;
                if (window.PageConfig) {
                    e.playmode = PageConfig.playmode;
                    e.abtest = "b";
                    if (PageConfig.folderId) {
                        e.Fid = PageConfig.folderId;
                        e.Pt = PageConfig.fpos;
                        e.Ob = PageConfig.forder;
                        i.plchid = PageConfig.folderCateWord || ""
                    }
                    var o = document.referrer;
                    if ("" == o) o = document.URL;
                    var s = document.createElement("A");
                    s.href = o;
                    var l = ["", PageConfig.videoId, s.hostname, s.pathname];
                    embedid = r.encode64(l.join(""));
                    i.embedid = embedid;
                    i.frame = PageConfig.logFrame;
                    if (5 == PageConfig.playmode || 4 == PageConfig.playmode) {
                        var d = 4 == PageConfig.playmode ? "W_P_L_M" : "P_L_M";
                        var c = t(d);
                        var u = t("P_F");
                        if (1 == u) {
                            switch (c) {
                                case "1":
                                    var f = 12;
                                    break;
                                case "2":
                                    var f = 10;
                                    break;
                                case "3":
                                    var f = 11
                            }
                            if (f) i.pb = f
                        }
                    }
                    e.vvlogconfig = i
                }
                return e
            },
            switchToFlash: function() {
                var e = n.params();
                e.debug = "flv";
                goldlog && goldlog.record("/yt/youkuplayer.fdl.page_error", "CLK", "degradetype=2&vid=" + PageConfig.videoId, "H1505507054");
                location.href = "//" + location.host + location.pathname + "?" + $.param(e)
            },
            callPlayerFunction: function() {},
            show: function() {
                l.selector.style.cssText = "width:100%;height:100%"
            },
            hide: function() {
                l.selector.style.cssText = "position:relative;top:-999999px;width:100%;height:100%"
            },
            check: function(e) {
                var e = e || "pauseVideo";
                return "function" == typeof l[e]
            },
            PlayerSeek: function(e) {
                e = isNaN(parseInt(e)) ? 0 : parseInt(e);
                if (this.playerStart && l) l.seek(parseInt(e))
            },
            PlayerContinuous: function(e) {
                l && l.setPlayerConfig({
                    continuePlay: e
                })
            },
            PlayerColor: function(e, t, i) {
                return l.PlayerColor && l.PlayerColor(e, t, i)
            },
            showControlBar: function(e) {
                if (e) l.UIControl.controlShow();
                else l.UIControl.controlHide(true)
            },
            setLight: function(e) {},
            setPlayHeadSkin: function(e) {
                l.setPlayHeadSkin && l.setPlayHeadSkin(e)
            },
            setPlayerLoop: function(e) {
                l && l.setPlayerLoop(e)
            },
            PlayerPause: function(e) {
                if (l) l[e ? "play" : "pause"]()
            },
            PlayerInfo: function() {
                return l.getPlayerInfo()
            },
            getPlayerState: function() {
                return l.getPlayerState()
            }
        });
        return d
    });
    define("page/find/play/util/swfobject", function() {
        var e = "undefined",
            t = "object",
            i = "Shockwave Flash",
            n = "ShockwaveFlash.ShockwaveFlash",
            a = "application/x-shockwave-flash",
            o = window,
            r = document,
            s = navigator,
            l = function() {
                var t = typeof r.getElementById != e && typeof r.getElementsByTagName != e && typeof r.createElement != e,
                    i = s.userAgent.toLowerCase(),
                    n = s.platform.toLowerCase(),
                    a = n ? /win/.test(n) : /win/.test(i),
                    o = n ? /mac/.test(n) : /mac/.test(i),
                    l = /webkit/.test(i) ? parseFloat(i.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                    d = [0, 0, 0],
                    c = false,
                    u = false,
                    f = false,
                    p = false,
                    h = false,
                    m = null;
                var v;
                (v = i.match(/msie ([\d.]+)/)) ? c = v[1]: (v = i.match(/firefox\/([\d.]+)/)) ? u = v[1] : (v = i.match(/chrome\/([\d.]+)/)) ? f = v[1] : (v = i.match(/opera.([\d.]+)/)) ? p = v[1] : (v = i.match(/version\/([\d.]+).*safari/)) ? h = v[1] : 0;
                return {
                    ie: c,
                    win: a,
                    mac: o,
                    safari: h,
                    chrome: f
                }
            }();

        function d(t, i, n, a) {
            var o = document.getElementById(n);
            if (o) {
                if (typeof t.id == e) t.id = n;
                var r = "";
                for (var s in t)
                    if (t[s] != Object.prototype[s])
                        if ("data" == s.toLowerCase()) i.movie = t[s];
                        else if ("styleclass" == s.toLowerCase()) r += ' class="' + t[s] + '"';
                else if ("classid" != s.toLowerCase()) r += " " + s + '="' + t[s] + '"';
                var d = "";
                for (var c in i)
                    if (i[c] != Object.prototype[c]) d += '<param name="' + c + '" value="' + i[c] + '" />';
                var u = "";
                if (l.ie && l.win) {
                    u = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' + r + ">" + d;
                    if (a) u += '<div class="player_html5"><div class="picture"style="height:100%"><div style="line-height:460px;"><span style="font-size:18px">����û�а�װflash������,����<a href="https://get.adobe.com/flashplayer/" target="_blank">����</a>��װ</span></div></div></div>';
                    u += "</object>"
                } else {
                    u = '<object type="application/x-shockwave-flash" data="' + i.movie + '" ' + r + ">" + d;
                    if (a) u += '<div class="player_html5"><div class="picture"style="height:100%"><div style="line-height:460px;"><span style="font-size:18px">����û�а�װflash������,����<a href="https://get.adobe.com/flashplayer/" target="_blank">����</a>��װ</span></div></div></div>';
                    u += "</object>"
                }
                o.innerHTML = u;
                return
            }
        }
        return {
            ua: l,
            createSWF: function(i, n, a, o, r, s) {
                var l = {};
                if (n && typeof n === t)
                    for (var c in n) l[c] = n[c];
                if (a && typeof a === t)
                    for (var u in a)
                        if (typeof l.flashvars != e) l.flashvars += "&" + u + "=" + a[u];
                        else l.flashvars = u + "=" + a[u];
                return d(i, l, o, s)
            }
        }
    }());
    define("page/find/player/player/flashplayer", ["tui/view", "tui/cookie", "tui/net", "tui/util/url", "page/find/play/util/util", "tui/util/codec", "tui/browser", "module/login/login", "page/find/play/util/swfobject"], function(e, t, i, n, a, o, r, s, l) {
        var d = null;
        var c = e.extend({
            playlistVids: [],
            playerNextVid: "",
            initialize: function(e) {
                c.superClass.initialize.call(this);
                var t = this,
                    i;
                this.playerId = "movie_player";
                $("#qheader .g-header-container").prepend('<iframe class="mask" frameborder="0" scrolling="no" style="width:100%;height:81px;"></iframe>');
                $("#uerCenter .panel,.g-view .panel").prepend('<iframe class="mask" frameborder="0" scrolling="no" style="width:100%;height:100%;"></iframe>');
                this._loadflash();
                this.playerStart = false;
                d = document.getElementById("movie_player");
                i = setInterval(function() {
                    if (t.check()) {
                        t.trigger("player:loaded");
                        clearInterval(i)
                    }
                }, 50);
                $(document).bind("logchange", function() {
                    s.checkLogin(function() {
                        d.setLoginState && d.setLoginState(true, s.uid())
                    })
                })
            },
            show: function() {
                d.style.cssText = "width:100%;height:100%"
            },
            hide: function() {
                d.style.cssText = "position:relative;top:-999999px;width:100%;height:100%"
            },
            check: function(e) {
                var e = e || "pauseVideo";
                return "function" == typeof d[e]
            },
            PlayerSeek: function(e) {
                e = isNaN(parseInt(e)) ? 0 : parseInt(e);
                if (this.playerStart) d.nsseek(parseInt(e))
            },
            recordPosition: function() {
                d.recordPosition()
            },
            PlayerContinuous: function(e) {
                d.setContinuous(e)
            },
            regComplete: function() {
                d.regComplete()
            },
            PlayerSeekMin: function(e, t) {
                t = isNaN(parseInt(t)) ? 0 : parseInt(t);
                e = isNaN(parseInt(e)) ? 0 : parseInt(e);
                var i = 60 * e + t;
                i = i - 4 > 0 ? i - 4 : i;
                d.PlayerSeek(i)
            },
            PlayerColor: function(e, t, i) {
                return d.setSkinColor(e, t, i)
            },
            setTHX: function(e) {
                if (d) d.setTHX(e)
            },
            showControlBar: function(e) {
                d.showControlBar(e)
            },
            setLight: function(e) {
                d.setLight(e)
            },
            setPlayHeadSkin: function(e) {
                d.setPlayHeadSkin(e)
            },
            setPlayerLoop: function(e) {
                d.setLoop(e)
            },
            PlayerPause: function(e) {
                try {
                    d.pauseVideo(e)
                } catch (t) {}
            },
            playModeSet: function(e) {
                return d.playModeSet(e)
            },
            PlayerShowType: function(e) {
                e = void 0 == e ? 2 : e;
                return d.setShowType(e)
            },
            setFrameSeletor: function(e) {
                d.setFrameSeletor(e)
            },
            setFrameData: function(e) {
                d.setFrameData(e)
            },
            PlayerInfo: function() {
                return d.getNsData()
            },
            PlayerResume: function() {
                $("#ad_crazy").hide();
                d.PlayerResume()
            },
            PlayerPause4ad: function() {
                d.PlayerPause4ad()
            },
            AddInteract: function(e) {
                d.addInteract(e)
            },
            getPlayerState: function() {
                return d.getPlayerState()
            },
            sendMsg: function(e, t) {
                d.sendMsg && d.sendMsg(e, t)
            },
            callPlayerFunction: function(e, t) {
                d.pauseVideo(false);
                switch (e) {
                    case "doInteract":
                        d.doInteract(t);
                        break;
                    case "playerSubscribed":
                        d.playerSubscribed(t);
                        break;
                    case "danmu":
                        s.checkLogin(function(e) {
                            e && d.setLoginState(true, s.uid())
                        });
                        break;
                    default:
                        d.doInteract(t)
                }
            },
            _bindCNAEvent: function() {
                var e = window.goldlog_queue || (window.goldlog_queue = []);
                var t = this;
                e.push({
                    action: "goldlog.aplus_pubsub.subscribe",
                    arguments: ["sendPV", function(e, i, n) {
                        if ("complete" === e)
                            if (t.check()) d.setPlayerCNA && d.setPlayerCNA(n.cna);
                            else t.bind("player:loaded", function() {
                                d.setPlayerCNA && d.setPlayerCNA(n.cna)
                            })
                    }]
                })
            },
            _getckey: function() {
                var e = "",
                    t = "";
                if (window._getUA) e = _getUA();
                if (window.UA_Opt) {
                    t = (UA_Opt.Token || "").split(":")[0];
                    t = (new Date).getTime() - 1 * t;
                    t = "#" + t
                }
                return e + t
            },
            _loadflash: function() {
                var e = {};
                var i = {};
                var s = window.navigator.userAgent.toLowerCase().indexOf("android") !== -1;
                e.allowFullScreen = true;
                e.allowscriptaccess = "always";
                e.allowFullScreenInteractive = "true";
                if (l.ua.safari) e.wmode = "opaque";
                i.skincolor1 = "101016";
                i.skincolor2 = "101016";
                i.playerskin = "v2";
                i.VideoIDS = PageConfig.videoId2;
                i.ShowId = PageConfig.showid;
                i.currentShowId = PageConfig.showid;
                i.category = PageConfig.catId;
                i.Cp = PageConfig.cp;
                if (location.href.indexOf("_sthd3") != -1) {
                    i.quality = "1080p";
                    i.sv = "true";
                    e.wmode = "direct";
                    e.bgcolor = "#000000"
                }
                if (PageConfig.playerUrl.indexOf("PanelDanmuYouku.swf") !== -1) {
                    e.wmode = "direct";
                    e.bgcolor = "#000000";
                    i.sv = "true"
                }
                if (PageConfig.catId && "95" == PageConfig.catId && 5 != PageConfig.playmode) i.showloop = true;
                try {
                    var c = n.params();
                    if (c.firsttime) i.firsttime = c.firsttime;
                    if (c.ev) i.ev = c.ev;
                    if (c.lang) i.lang = c.lang;
                    if (void 0 != c.adext) i.adext = c.adext;
                    if (c.hotPreview) i.hotPreview = c.hotPreview
                } catch (u) {}
                i.unCookie = navigator.cookieEnabled ? 0 : 1;
                i.frame = PageConfig.logFrame;
                try {
                    i.pvid = window.UrchinAplus.pvid
                } catch (u) {}
                i.uepflag = PageConfig.uepflag || 0;
                i.Tid = 0;
                i.VideoIDS = PageConfig.videoId2;
                i.isAutoPlay = true;
                i.playmode = PageConfig.playmode;
                if (PageConfig.removePlayerSideControl) i.show_ce = 0;
                else i.show_ce = 1;
                i.winType = s ? "touch" : "interior";
                if (PageConfig.folderId) {
                    i.Fid = PageConfig.folderId;
                    i.Pt = PageConfig.fpos;
                    i.Ob = PageConfig.forder;
                    i.plchid = PageConfig.folderCateWord || ""
                }
                var f = document.referrer;
                if ("" == f) f = document.URL;
                var p = document.createElement("A");
                p.href = f;
                var h = ["", PageConfig.videoId, p.hostname, p.pathname];
                embedid = o.encode64(h.join(""));
                i.embedid = embedid;
                if (navigator.userAgent.indexOf("MSIE") != -1) i.ikuison = "1";
                i.ysuid = t("__ysuid") || "";
                var m;
                var v = t("_bc") || "";
                m = "bc=" + v + "&pid=" + PageConfig.logPvid + "&unCookie=" + PageConfig.logUnCookie + "&frame=" + PageConfig.logFrame;
                if (PageConfig.folderId) m += "&type=1&fob=" + PageConfig.forder + "&fpo=" + PageConfig.fpos;
                else m += "&type=0";
                if ("��Ƭ" == PageConfig.showtype) m += "&svt=1&stg=" + PageConfig.stage;
                else if (PageConfig.showid) m += "&svt=0";
                var g = encodeURIComponent(t("cna") || "");
                m += "&cna=" + g;
                if ("" == g) this._bindCNAEvent();
                m += "&emb=" + embedid + "&dn=��ҳ&hwc=1";
                if (navigator.userAgent.indexOf("Android") !== -1) m += "&mtype=adr";
                else m += "&mtype=oth";
                i.vext = encodeURIComponent(m);
                i.cna = g;
                i.ckey = encodeURIComponent(a.getckey());
                if (5 == PageConfig.playmode || 4 == PageConfig.playmode) {
                    var y = 4 == PageConfig.playmode ? "W_P_L_M" : "P_L_M";
                    var _ = t(y);
                    var b = t("P_F");
                    if (1 == b) {
                        switch (_) {
                            case "1":
                                var k = 12;
                                break;
                            case "2":
                                var k = 10;
                                break;
                            case "3":
                                var k = 11
                        }
                        if (k) i.pb = k
                    }
                }
                i.pageStartTime = window.logPageStartTime || (new Date).getTime();
                if (r.mac && r.chrome >= 54 && r.chrome < 55) var w = {
                    data: PageConfig.playerUrl,
                    width: "1",
                    height: "1",
                    id: this.playerId
                };
                else var w = {
                    data: PageConfig.playerUrl,
                    width: "100%",
                    height: "100%",
                    id: this.playerId
                };
                l.createSWF(w, e, i, "player", "6.0", true);
                if (r.mac && r.chrome >= 54 && r.chrome < 55) setTimeout(function() {
                    d.style.width = "100%";
                    d.style.height = "100%"
                }, 1e3)
            }
        });
        return c
    });
    define("page/find/player/player/load", ["page/find/player/player/flashplayer", "page/find/player/player/h5player", "tui/browser", "tui/cookie", "tui/art", "tui/event", "tui/util/url", "page/find/player/player/playerFixed", "page/find/player/player/h5playerdanmu", "page/find/player/player/playerCallbacks", "page/find/player/player/chest"], function(e, t, i, n, a, o, r, s, l, d, c, u, f) {
        f.load = function() {
            var i, n;
            var a = location.href;
            var o = r.params();
            var c = !!document.createElement("video").canPlayType;
            var n = "flv" === o.debug;
            var u = navigator.userAgent.toLowerCase();
            var f = u.match(/msie ([\d.]+)/);
            (window.goldlog_queue || (window.goldlog_queue = [])).push({
                action: "goldlog.record",
                arguments: ["/yt/youkuplayer.fdl.ykplayer_pv", "EXP", n ? "isflash=1" : "", "H1506430579"]
            });
            try {
                if ("undefined" != typeof window.ActiveXObject) i = !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                else i = !!navigator.plugins["Shockwave Flash"]
            } catch (p) {
                i = false
            }
            if (f && 1 * f[1] < 10) n = true;
            if ((!n && c || !i) && 1 != PageConfig.panorama) v();
            else g();
            ykPlyr.bind("player:loaded", function() {
                var e = $(".player-container .player-title");
                var t = $(window);
                var i = e.offset().top;
                var n = i + e.outerHeight();
                var a = t.scrollTop();
                var o = a + $(window).height();
                if (!(i > a && n < o) && a < 70) $("body,html").animate({
                    scrollTop: 60
                }, 500)
            });
            if (window.performance && window.performance.now) {
                var h = window.performance.now();
                var m = {
                    loading_step: 1,
                    request_time: 0,
                    abtest: "b",
                    request_time: h,
                    whole_time: h,
                    vid: PageConfig.videoId
                };
                (window.goldlog_queue || (window.goldlog_queue = [])).push({
                    action: "goldlog.record",
                    arguments: ["/yt/playpage.playpage.ykplaypage_process", "EXP", $.param(m), "H1534136206"]
                })
            }
            if (i && 1 != PageConfig.panorama && c) {
                $(".fn-play-mode").show();
                if ("h5" == ykPlyr.type) {
                    $("#h5PlayMode").attr("checked", true).addClass("mode-h5");
                    $(".fn-play-mode").addClass("mode-h5")
                } else if ("flash" == ykPlyr.type) {
                    $("#flashPlayMode").attr("checked", true);
                    $(".fn-play-mode").addClass("mode-flash");
                    $(".playArea").addClass("flash-player")
                }
                $(".play-mode input", $(".fn-play-mode")).bind("click", function(e) {
                    var t = $(e.currentTarget);
                    var i = r.params();
                    $("#player").html("");
                    if ("flashPlayMode" == t.attr("id")) i.debug = "flv";
                    else if ("h5PlayMode" == t.attr("id")) delete i.debug;
                    location.href = "//" + location.host + location.pathname + "?" + $.param(i)
                })
            }

            function v() {
                window.ykPlyr = new t({
                    el: "#player"
                });
                ykPlyr.type = "h5";
                if (!i) $(".switch-flash").hide();
                ykPlyr.one("player:loaded", function(e) {
                    d.h5Bind(e, ykPlyr);
                    window.H5player = e;
                    new s({});
                    l(e)
                });
                $("#module_basic_playarea").addClass("spv-player")
            }

            function g() {
                window.ykPlyr = new e;
                ykPlyr.type = "flash";
                d.swfBind(ykPlyr);
                new s({});
                if (!c) goldlog && goldlog.record("/yt/youkuplayer.fdl.page_error", "EXP", "degradetype=1&errortype=1&vid=" + PageConfig.videoId, "H1505507054")
            }
        }
    });
    require(["page/find/g", "tui/cookie", "module/responsive", "module/login/login", "page/find/player/player/load", "page/find/player/view/main", "page/find/player/view/sideTool", "page/find/player/view/advertisement", "page/find/player/view/listall", "page/find/player/view/cms", "page/find/player/view/interactionBottom", "page/find/player/view/sub", "page/find/player/dmpool/dmpoolLoad", "page/find/player/view/statistics", "page/find/player/view/stars", "page/find/player/view/intro"], function(e, t, i, n, a, o, r, s, l, d, c, u, f, p, h, m) {
        e.init();
        window.catId = PageConfig.catId;
        if (window.cateStr) {
            var v = 1 * PageConfig.folderId || 1 * PageConfig.showid;
            cateStr = cateStr + "-" + v + "-" + PageConfig.videoId
        }
        $(document.body).addClass("danmuoff");
        window.getVvlogextplay = function() {
            try {
                var e = encodeURIComponent($.param(window["UrchinAplus"]._yVvlogInfo()))
            } catch (t) {}
            return e
        };
        i.bind("responsed", function(e) {
            i.trigger("player:responsive", [e]);
            $("body").trigger("responsive", [e])
        });
        a.load();
        new o;
        new m;
        n.one("checklogin", function() {
            f();
            new u
        });
        new r;
        var g = new s;
        var y = new l;
        y.bind("relationlist:loaded", function() {
            g.addrelationListAd()
        });
        new d;
        new c;
        $("#module_basic_star").length && new h({
            el: "#module_basic_star"
        });
        p.init();
        $(function() {
            var e = "hidden" in document ? "hidden" : "webkitHidden" in document ? "webkitHidden" : "mozHidden" in document ? "mozHidden" : null;
            if (e && ykPlyr.sendMsg) {
                var t = e.replace(/hidden/i, "visibilitychange");
                var i = function() {
                    setTimeout(function() {
                        if (document[e]) ykPlyr.sendMsg("pageVisibilty", false);
                        else ykPlyr.sendMsg("pageVisibilty", true)
                    }, 100)
                };
                document.addEventListener(t, i)
            }
        });

        function _() {
            var e = true;

            function t() {
                var e = localStorage.getItem("PAGE_QUIT");
                if (!e) return [];
                e = JSON.parse(e);
                return e
            }

            function i(e) {
                return [e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours()].join("")
            }
            var n = function() {
                var e = document.getElementById("movie_player");
                if (e && "DIV" !== e.tagName) return "flash";
                return true
            };
            var a = function() {
                if ("undefined" === typeof videoPlayer) return "beforeInit";
                if ("function" === typeof videoPlayer.getProcessState) return videoPlayer.getProcessState();
                return "initError"
            };
            var o = function() {
                var i = t();
                if (!e) i = 1;
                for (var n = 0; n < i.length; n++)
                    if ("undefined" !== typeof goldlog) goldlog.record("/yt/youkuplayer.fdl.page_error", "EXP", "degradetype=4&errortype=2&vid=" + PageConfig.videoId + "&timestr=" + i[n].time + "&date=" + i[n].date + "&state=" + (i[n].state || ""), "H1505507054");
                localStorage.setItem("PAGE_QUIT", "");
                return null
            };
            try {
                o();
                $(window).bind("beforeunload", function(r) {
                    if (!e) {
                        o();
                        return
                    }
                    var s = t();
                    var l = new Date;
                    var d = n();
                    var c = "";
                    if ("flash" === d) c = "flash";
                    else c = a();
                    s.push({
                        time: l.getTime(),
                        date: i(l),
                        state: c
                    });
                    s = JSON.stringify(s);
                    localStorage.setItem("PAGE_QUIT", s)
                })
            } catch (r) {
                console.log(r)
            }
        }
        _();
        $(window).bind("beforeunload", function() {
            if (n.isLogin()) return;
            var e = t("u_l_v_t");
            try {
                var i = ykPlyr.PlayerInfo() || 0;
                if (i) i = i.time;
                if (e) i = parseInt(e) + parseInt(i);
                if (i > 0) {
                    if (i > 60 * 6 * 60) i = 60 * 6 * 60;
                    t("u_l_v_t", parseInt(i), 1)
                }
            } catch (a) {}
        })
    })
}(window.jQuery, window.oz.require, window.oz.define);;
}

function checkvideo(callback) {
  var video = document.getElementsByTagName("video");
  if (video != undefined && video.length > 1) {
      setTimeout(callback, 1000);
  } else {
      setTimeout(function() {
          checkvideo(callback)
      }, 100)
  }
}
var loopcount = 0;

function loopclick() {
  try {
      testClick();
  } catch (ex) {
      console.log(ex);
  }
  console.log("test click" + loopcount);
  ++loopcount;
  if (loopcount > 1000000) {
      return;
  }
  checkvideo(loopclick);
}
checkvideo(loopclick);