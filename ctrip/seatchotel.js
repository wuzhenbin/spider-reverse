function doFormSubmit(t) {
    setCookie(location.host.match(/big5\./) ? "BHotelCityID" : "HotelCityID", {
        cityId: document.getElementById("cityId").value,
        cityName: document.getElementById("txtCity").value,
        cityPY: document.getElementById("cityPY").value,
        hotelLevel: document.getElementById("searchHotelLevelSelect").value,
        startDate: document.getElementById("txtCheckIn").value,
        endDate: document.getElementById("txtCheckOut").value
    }),
    saveBackwardStatus(FIELDS_WITH_BACKWARD_STATUS)
}
function saveBackwardStatus(t) {
    for (var e in t)
        $.pageStorage.set(e, document.getElementById(t[e]).value)
}
function restoreBackwardStatus(t) {
    for (var e in t) {
        var i = $("#" + t[e]);
        if (i) {
            var a = $.pageStorage.get(e);
            if (!a)
                continue;
            i[0].value = a || ("select" == i[0].tagName.toLowerCase() ? "-1" : ""),
            i[0].setAttribute("lastValue", i[0].value)
        }
    }
}
function showSearchHistory(t) {
    if (t) {
        var e = $("#J_searchHistoryBox")
          , i = $("#txtCity");
        if (e.length) {
            e[0].style.display = "",
            i.addClass("input_short_city");
            for (var a = [], n = Math.min(3, t.length), o = 0; o < n; o++) {
                var s = t[o]
                  , r = "true" === s.isoutdate ? " item_past" : "";
                a.push('<a href="javascript:;" class="history_item' + r + "\" data='" + $.stringifyJSON(s).replace(/'/g, "") + '\'><span class="city">' + unescape(s.cityname) + '</span><span class="date">' + s.checkin + " 至 " + s.checkout + "</span></a>")
            }
            e.find(".history_list").html(a.join("")),
            e.find(".title").bind("click", function(t) {
                t.stop(),
                e[e.hasClass("show_history") ? "removeClass" : "addClass"]("show_history")
            }),
            e.find(".history_item").bind("click", function() {
                var t = $.parseJSON(this.getAttribute("data"));
                setCityFromHistory(t)
            }),
            $(document).bind("click", function() {
                e.removeClass("show_history")
            })
        }
    }
}
function setCityFromHistory(t) {
    if ($("#txtCity").removeClass("inputSel").value(unescape(t.cityname)),
    window.searchMaiDian.property_dstn = "default",
    window.associationMatchMaiDian.destination = "",
    $("#cityId").value(t.id),
    $("#cityPY").value(t.pingying),
    "false" === t.isoutdate) {
        var e = $("#txtCheckIn")
          , i = $("#txtCheckOut");
        e.value(t.checkin),
        i.value(t.checkout),
        e[0].style.backgroundImage = "",
        i[0].style.backgroundImage = ""
    }
    cityChangeEvent(t.id, t.cityname)
}
function Clock(t, e) {
    this.initialize(t, e)
}
function Animate(t) {
    var e = {
        fps: 60,
        target: null,
        cycle: 0,
        perstep: 0,
        transform: []
    };
    this.extend(e, t),
    this.initialize(e)
}
var FIELDS_WITH_BACKWARD_STATUS = {
    chkIn: "txtCheckIn",
    chkOut: "txtCheckOut",
    hotellevel: "searchHotelLevelSelect",
    positionArea: "positionArea",
    positionId: "positionId",
    hotelAreaName: "hotelAreaName"
}
  , ClickShow = function(t) {
    this.ops = $.extend({
        selector: ".nearby_htl li",
        content: "#J-nearbyDetailContainer .J-nearbyContent",
        nearbyNonMetroDetailView: '{{each markLandList}}<a href="${href}" data-dopost="T" title="${name}" rel="nofollow">${name}</a>{{/each}}',
        nearbyMetroDetailView: '<ul class="first_list">{{each markLandList}}<li><a href="javascript:void(0);" class="" rel="nofollow">${display}</a></li>{{/each}}</ul>{{each markLandList}}<div class="second_list" style="display: none;"><span class="arrow"></span>{{each station}}<a href="${href}"  data-dopost="T" title="${name}" rel="nofollow">${name}</a>{{/each}}</div>{{/each}}'
    }, t),
    this.ajaxLandmarkDataCache = {},
    this.markJNearbyContent = "markJNearbyContent",
    this.init()
};
ClickShow.prototype = {
    init: function() {
        var t = this
          , e = function(t, e) {
            for (var i = 0; i < e.length; i++)
                if (e[i] == t)
                    return i;
            return -1
        };
        t.lastIndex = -1,
        t.tab = $(this.ops.selector),
        t.content = $(this.ops.content),
        t.clickHandle = function(i) {
            i.stop();
            var a = this
              , n = e(a, t.tab);
            if (!(n < 0)) {
                var o = $(t.content[n])
                  , s = $(t.content[t.lastIndex])
                  , r = a.dataset ? a.dataset.subtypeid : a.getAttribute("data-subtypeid")
                  , c = a.dataset ? a.dataset.themetype : a.getAttribute("data-themetype")
                  , l = t.ops.cityId
                  , d = t.ops.cityPy;
                if (t.ajaxLandmarkDataCache[t.markJNearbyContent + n])
                    t.fireState(n, a, o, s, t.ajaxLandmarkDataCache[t.markJNearbyContent + n].nearbyType);
                else {
                    var p = addressUrlConfig.sublandmark + "&subtypeid=" + r + "&city=" + l + "&themetype=" + c;
                    $.ajax(p, {
                        method: cQuery.AJAX_METHOD_POST,
                        context: {
                            cityId: l
                        },
                        escape: !1,
                        async: !0,
                        cache: !0,
                        onsuccess: function(e, i) {
                            var r = $.parseJSON(e.responseText);
                            r && (t.ajaxLandmarkDataCache[t.markJNearbyContent + n] = r,
                            t.genTpml(r, l, d, o),
                            t.fireState(n, a, o, s, r.nearbyType),
                            t.bindClickEvent())
                        }
                    })
                }
            }
        }
        ,
        t.tab.bind("click", t.clickHandle)
    },
    bindClickEvent: function() {
        var t = $("#J-nearbyDetailContainer .first_list a")
          , e = $("#J-nearbyDetailContainer .second_list");
        t.bind("click", function(i) {
            var a = $(this)
              , n = t.indexOf(a);
            e.css({
                display: "none"
            }),
            t.removeClass("current"),
            $(e[n]).css({
                display: "block"
            }),
            $(t[n]).addClass("current")
        })
    },
    fireState: function(t, e, i, a, n) {
        if (t == this.lastIndex ? "current" == e.className ? (e.className = "",
        i.css("display", "none")) : (e.className = "current",
        i.css("display", "block"),
        this.lastIndex = t) : (this.lastIndex >= 0 && (this.tab[this.lastIndex].className = "",
        a.css("display", "none")),
        e.className = "current",
        i.css("display", "block"),
        this.lastIndex = t),
        "metro" === n || "airportStation" === n) {
            var o = $(i);
            o[0] && o.find(".first_list a")[0] && $(o.find(".first_list a")[0]).addClass("current"),
            o[0] && o.find(".second_list")[0] && $(o.find(".second_list")[0]).css({
                display: "block"
            })
        }
    },
    uninit: function() {
        var t = this;
        t.tab.unbind("click", t.clickHandle)
    },
    genTpml: function(t, e, i, a) {
        var n = this
          , o = ""
          , s = {
            station: "s",
            metro: "l",
            markLand: "sl",
            zone: "zone"
        }
          , r = t.domain ? t.domain + "/hotel/${py}${cityId}/${search}${id}" : ""
          , c = function(t, a, n) {
            for (var o = {
                name: "查看全部",
                href: n
            }, s = t.markLandList ? t.markLandList.length : 0, c = 0; c < s; c++) {
                var l = t.markLandList[c];
                l.href = r.replace(/\${py}/g, i).replace(/\${cityId}/g, e).replace(/\${search}/g, a).replace(/\${id}/g, l.id)
            }
            n && t.markLandList && t.markLandList.push(o)
        }
          , l = function(t) {
            for (var a = t.markLandList ? t.markLandList.length : 0, n = 0; n < a; n++)
                for (var o = t.markLandList[n], c = o.station, l = 0; l < c.length; l++) {
                    var d = c[l];
                    0 == l ? d.href = r.replace(/\${py}/g, i).replace(/\${cityId}/g, e).replace(/\${search}/g, s.metro).replace(/\${id}/g, d.id) : d.href = r.replace(/\${py}/g, i).replace(/\${cityId}/g, e).replace(/\${search}/g, s.station).replace(/\${id}/g, d.id)
                }
        }
          , d = function(t) {
            for (var a = t.markLandList ? t.markLandList.length : 0, n = 0; n < a; n++)
                for (var o = t.markLandList[n], c = o.station, l = 0; l < c.length; l++) {
                    var d = c[l];
                    d.href = r.replace(/\${py}/g, i).replace(/\${cityId}/g, e).replace(/\${search}/g, s.markLand).replace(/\${id}/g, d.id)
                }
        }
          , p = t.nearbyType || ""
          , u = t.nearbyLink || "";
        "metro" == p ? (l(t),
        o += $.tmpl.render(n.ops.nearbyMetroDetailView, t)) : "airportStation" == p ? (d(t),
        o += $.tmpl.render(n.ops.nearbyMetroDetailView, t)) : "zone" == p ? (t.dealed || c(t, s.zone, u),
        o += $.tmpl.render(n.ops.nearbyNonMetroDetailView, t)) : (t.dealed || c(t, s.markLand, u),
        o += $.tmpl.render(n.ops.nearbyNonMetroDetailView, t)),
        t.dealed = !0,
        a.html(o),
        n.content.find(".nearby_htl_detail2").each(function(t) {
            var e = t.find(".first_list")
              , i = e.find("li>a")
              , a = t.find(".second_list")
              , n = function(t) {
                var e = t.target || t.srcElement
                  , n = function(t, e) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i] == t)
                            return i;
                    return -1
                }
                  , o = n(e, i);
                i.each(function(t, e) {
                    i[e].className = "",
                    a[e].style.display = "none"
                }),
                i[o].className = "current",
                a[o].style.display = ""
            };
            i.unbind("click", n),
            i.bind("click", n),
            i[0].className = "current",
            a[0].style.display = ""
        })
    }
};
var hoverDelayShow = function(t) {
    this.ops = $.extend({
        selector: ".nearby_htl li",
        content: "#J-nearbyDetailContainer",
        delayTime: 300,
        mouseoverHandle: function() {},
        mouseoutHandle: function() {}
    }, t),
    this.init()
};
hoverDelayShow.prototype = {
    init: function() {
        var t = this
          , e = function(t, e) {
            for (var i = 0; i < e.length; i++)
                if (e[i] == t)
                    return i;
            return -1
        };
        t.tab = $(this.ops.selector),
        t.content = $(this.ops.content),
        t.contentOverHandler = function(e) {
            var i = e.relatedTarget || e.fromElement
              , a = this.contains(i);
            a || t.ops.mouseoverHandle.call(t, t.currentIndex)
        }
        ,
        t.contentOutHandler = function(e) {
            var i = e.relatedTarget || e.toElement
              , a = this.contains(i);
            a || (t.contentTimeout = setTimeout(function() {
                t.ops.mouseoutHandle.call(t, t.lastIndex)
            }, t.ops.delayTime))
        }
        ,
        t.tab.bind("mouseover", function(i) {
            var a = this
              , n = i.relatedTarget || i.fromElement
              , o = this.contains(n)
              , s = e(a, t.tab);
            o || (s == t.lastIndex && clearTimeout(t.contentTimeout),
            t.tabTimeout = setTimeout(function() {
                t.ops.mouseoverHandle.call(t, s)
            }, t.ops.delayTime),
            t.currentIndex = s)
        }),
        t.tab.bind("mouseout", function(i) {
            var a = this
              , n = i.relatedTarget || i.toElement
              , o = this.contains(n)
              , s = e(a, t.tab);
            o || (clearTimeout(t.tabTimeout),
            t.ops.mouseoutHandle.call(t, s),
            t.lastIndex = s)
        }),
        t.content.bind("mouseover", t.contentOverHandler),
        t.content.bind("mouseout", t.contentOutHandler)
    },
    uninit: function() {
        var t = this;
        t.content.unbind("mouseover", t.contentOverHandler),
        t.content.unbind("mouseout", t.contentOutHandler)
    }
};
var HotCityTab = function(t) {
    this.ops = $.extend({
        containerEl: null,
        hotsoldCityList: ".hotsold_city_list",
        popBoxCity: ".pop_box_city",
        landmarkSection: ".landmark_section",
        landmarkSearchBox: ".landmark_search_box",
        cityView: '<i></i><a href="{href}" data-id="{id}" data-py="{py}" rel="nofollow">{name}</a>',
        nearbyView: '{{each nearbyItems}}<li class="" data-subtypeid="${subtypeid}" data-themetype="${themetype}"><a href="javascript:void(0);">${nearbyName}<img width="39" height="55" alt="" src="${nearbyImg}" class="nearby_icon" rel="nofollow"><!--img width="39" height="55" alt="" src="${nearbyImgHover}" class="nearby_icon_hover"--></a></li>{{/each}}',
        nearbyNonMetroDetailView: '<div class="nearby_htl_detail J-nearbyContent" style="display: none;">{{each markLandList}}<a href="${href}" data-dopost="T" title="${name}" rel="nofollow">${name}</a>{{/each}}</div>',
        nearbyMetroDetailView: '<div class="nearby_htl_detail2 J-nearbyContent" style="display: none;"><ul class="first_list">{{each markLandList}}<li><a href="javascript:void(0);" class="" rel="nofollow">${display}</a></li>{{/each}}</ul>{{each markLandList}}<div class="second_list" style="display: none;"><span class="arrow"></span>{{each station}}<a href="${href}"  data-dopost="T" title="${name}" rel="nofollow">${name}</a>{{/each}}</div>{{/each}}</div>',
        cityTagName: "li"
    }, t),
    this.init()
};
HotCityTab.prototype = {
    init: function() {
        var t = this.ops
          , e = this;
        this.hotsoldCityList = $(t.hotsoldCityList),
        this.popBoxCity = $(t.popBoxCity),
        this.landmarkSection = $(t.landmarkSection),
        this.landmarkSearchBox = $(t.landmarkSearchBox),
        this.themeLandmark = $(t.themeLandmark),
        this.mainPanel = $(t.mainPanel),
        this.cityView = this.ops.cityView,
        this.cityTagName = this.ops.cityTagName,
        this.ajaxDataCache = {},
        this.currentIndex = 0,
        e.cityIdsCache = function() {
            var t = [];
            return e.hotsoldCityList.find("a").each(function(e, i) {
                var a = e.attr("data-id");
                a && t.push(a)
            }),
            t
        }(),
        e.currentCityId = this.cityIdsCache[0],
        e.currentCityPy = e.hotsoldCityList.find("a")[0].getAttribute("data-py"),
        this.prependCityByCookie(),
        this.bindHotCityList(),
        this.bindpopBoxCity(),
        this.bindSearch(),
        this.bindNearby({
            cityId: e.currentCityId,
            cityPy: e.currentCityPy
        }),
        this.bindPostEvent()
    },
    prependCityByCookie: function() {
        var t = this
          , e = function() {
            var t = ""
              , e = this.hotsoldCityList[0].getAttribute("data-defaultcity");
            return e && (t = $.parseJSON(e)),
            t
        }
          , i = function(e) {
            for (var i = 0; i < t.cityIdsCache.length; i++)
                if (t.cityIdsCache[i] == e)
                    return i;
            return -1
        }
          , a = function(e) {
            var i = null;
            return t.popBoxCity.find("a").each(function(t, a) {
                t[0].getAttribute("data-id") == e && (i = t)
            }),
            i
        }
          , n = e.call(this)
          , o = null;
        if (n || (n = {
            id: 1,
            py: "beijing"
        }),
        n) {
            var s = n.id
              , r = n.py
              , c = i(n.id)
              , l = a(n.id);
            return t.currentCityId = s,
            t.currentCityPy = r,
            c == -1 ? (o = document.createElement(this.cityTagName),
            o.className = "current",
            o.innerHTML = this._createHtml(n),
            this._removeLastCity(),
            this.hotsoldCityList.find("li")[0].className = "",
            this.hotsoldCityList.prepend(o),
            this.currentIndex = 0,
            l && t.popBoxCity[0].removeChild(l[0])) : (this.hotsoldCityList.find("li")[0].className = "",
            this.hotsoldCityList.find("li")[c].className = "current",
            this.currentIndex = c),
            t.ajaxDataCache[s] ? t.updateLandMarkView(t.ajaxDataCache[s], s, r) : t.getNearbyDataByAjax(s, r, t.updateLandMarkView),
            !0
        }
        return !1
    },
    bindHotCityList: function() {
        var t = this;
        t.on(t.hotsoldCityList, t.cityTagName, "click", function(e) {
            var i = this
              , a = this.getElementsByTagName("a")[0].getAttribute("data-id")
              , n = this.getElementsByTagName("a")[0].getAttribute("data-py");
            if (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            e.stopPropagation ? e.stopPropagation() : e.cancleBubble(),
            "J-moreCity" != this.id && !a)
                throw new Error("need to config cityId for .hotsold_city_list");
            return "J-moreCity" == this.id ? ("none" == t.popBoxCity[0].style.display ? t.popBoxCity[0].style.display = "" : t.popBoxCity[0].style.display = "none",
            !1) : (t.currentCityId = a,
            t.currentCityPy = n,
            t.updateCityView.call(t, i),
            void (t.ajaxDataCache[a] ? t.updateLandMarkView(t.ajaxDataCache[a], a, n) : t.getNearbyDataByAjax(a, n, t.updateLandMarkView)))
        }),
        $("body, html").bind("click", function(e) {
            var i = e.target || e.srcElement;
            t.popBoxCity && t.popBoxCity[0] && (t.popBoxCity[0].contains(i) || (t.popBoxCity[0].style.display = "none"))
        })
    },
    bindpopBoxCity: function() {
        var t = this;
        t.on(t.popBoxCity, "a", "click", function(e) {
            if ($(e.target).hasClass("c_close"))
                return void (t.popBoxCity[0].style.display = "none");
            var i = this
              , a = {}
              , n = document.createElement(t.cityTagName);
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            e.stopPropagation ? e.stopPropagation() : e.cancleBubble(),
            a.id = this.getAttribute("data-id"),
            a.name = this.innerHTML,
            a.py = this.getAttribute("data-py"),
            a.href = this.getAttribute("href"),
            n.className = "current",
            n.innerHTML = t._createHtml(a),
            t._removeLastCity(function(e) {
                t.popBoxCity[0].insertBefore(e, i),
                t.popBoxCity[0].removeChild(i)
            }),
            t.hotsoldCityList.find("li")[t.currentIndex].className = "",
            t.hotsoldCityList[0].insertBefore(n, t.hotsoldCityList.find("li")[5]),
            t.currentIndex = 5,
            t.currentCityId = a.id,
            t.currentCityPy = a.py,
            t.ajaxDataCache[a.id] ? t.updateLandMarkView(t.ajaxDataCache[a.id], a.id, a.py) : t.getNearbyDataByAjax(a.id, a.py, t.updateLandMarkView),
            t.popBoxCity[0].style.display = "none"
        })
    },
    getFromVal: function() {
        var t;
        return t = document.body.scrollWidth >= 1250 || !window.getComputedStyle ? 707 : 548
    },
    animate: function(t, e, i, a, n, o) {
        function s() {
            var o = (i - a) * l;
            return o >= 0 ? (t.style[e] = a + n,
            !1) : (i += c,
            t.style[e] = i + n,
            void setTimeout(s, r))
        }
        var r = ((new Date).getTime(),
        5)
          , c = (a - i) * r / o
          , l = a > i ? 1 : -1;
        s()
    },
    bindSearch: function() {
        var t = this
          , e = $("#marklandBtn")
          , i = 73;
        this.landmarkSection.bind("click", function(e) {
            e.stop(),
            t.landmarkSection[1] == this ? ("T" != t.landmarkSearchBox[0].getAttribute("data-opened") && (t.animate(t.landmarkSearchBox[0], "left", t.getFromVal(), i, "px", 300),
            t.landmarkSearchBox[0].setAttribute("data-opened", "T"),
            t.landmarkSection[0].className = "landmark_section",
            t.landmarkSection[1].className = "landmark_section current"),
            $(".J-nearbyContent").each(function(t) {
                "block" == t[0].style.display && (t[0].style.display = "none")
            })) : "T" == t.landmarkSearchBox[0].getAttribute("data-opened") && (t.animate(t.landmarkSearchBox[0], "left", i, t.getFromVal(), "px", 300),
            t.landmarkSearchBox[0].setAttribute("data-opened", "F"),
            t.landmarkSection[1].className = "landmark_section",
            t.landmarkSection[0].className = "landmark_section current")
        }),
        $(window).bind("resize", function() {
            "F" == t.landmarkSearchBox[0].getAttribute("data-opened") && (t.landmarkSearchBox[0].style.left = t.getFromVal() + "px")
        });
        var a = function() {
            var i = function() {
                var t = e.regMod("notice", "1.0", {
                    name: "landmark",
                    tips: noticeMessageConfig[4] || "如：长安街",
                    selClass: "inputSel"
                });
                return t
            }
              , a = {
                marklandId: void 0,
                keyword: void 0,
                reg: function(t) {
                    t.marklandId && (this.marklandId = t.marklandId,
                    this.keyword = ""),
                    t.keyword && (this.keyword = encodeURIComponent(t.keyword.replace(/\+/g, "＋")),
                    this.marklandId = "")
                },
                submit: function() {
                    var i = t.currentCityId
                      , n = t.currentCityPy
                      , o = "/hotel/" + n + i + "/map/"
                      , s = e.value();
                    s != e.attr("_lastvalue") && a.reg({
                        keyword: s
                    }),
                    this.marklandId ? o = "/hotel/" + n + i + "/map/sl" + this.marklandId : this.keyword && (o = "/hotel/" + n + i + "/map/k1" + this.keyword),
                    t.submitForm(o)
                }
            }
              , n = function() {
                var t = cQuery.config("charset");
                cQuery.marklandFilterHighlights = {},
                cQuery.highlightKeyword = function(t, e) {
                    return e ? (e = e.split(/\s+/),
                    e.each(function(e) {
                        /[a-zA-Z]/.test(e) || (t = t.replace(new RegExp("(" + e + ")","gi"), "<span class='b'>$1</span>"))
                    }),
                    t) : t
                }
                ,
                cQuery.jsonpLankmarkCallback = function(t) {
                    var i = t.result
                      , n = e.value();
                    a.result = i,
                    cQuery.marklandFilterHighlights[n] = t.tokens,
                    cQuery.jsonpResponse = {
                        key: n,
                        data: "@" + t.result + "@"
                    }
                }
                ,
                $.marklandJsonpFilterTpl = '/Domestic/Tool/AjaxFindKeyword.aspx?failedCallback=cQuery.jsonpPosFailedCallback&query=cityId:${cityId} AND keyword:"${key}" AND sourceType:DomesticHotel AND type:Markland&return=pinyin,word,ID,type&section=1-30&noTotal=true&responseFormat=json&needTokens=true&resultFormat=text&lineSep=@&fieldSep=|&charset=' + t + "&callback=cQuery.jsonpLankmarkCallback";
                var i = e.regMod("address", "1.0", {
                    name: "landmark",
                    source: "@@",
                    isFocusNext: !1,
                    isIframe: $.browser.isIE,
                    delay: 500,
                    isFilterSelect: !1,
                    isAutoCorrect: !1,
                    needReadOnly: !1,
                    template: {
                        suggestionStyle: ".c_address_box { display:none; }",
                        suggestionIpad: '<div class="c_address_box key_word_lhsl key_word_lhsl_pad" style="position:relative; width:200px;padding:8px 10px;border:1px solid #999;background-color:#fff;font-size:16px;"><a href="javascript:;" class="close CQ_suggestionClose" style="position:absolute;top:10px;right:10px;width:30px;height:30px;line-height:30px;text-align:center;color:#666;font:bold 22px/30px "Heiti SC","Heiti SC light",STHeiti,STXihei,sans-serif;">&times;</a><div class="key_word_key" style="height:48px; display:block;"><div class="ico_key CQ_suggestionKeyboard" style="width:92px;height:43px;padding-left:65px;background:url(//pic.c-ctrip.com/ctripOnPad/un_key20131012.png) 10px 11px no-repeat;cursor:pointer;line-height:40px;font-size:18px;border-width:1px;border-style:solid;border-radius:3px; border-color:#898989 #e2e2e2 #e2e2e2;background-color:#f5f5f5;box-shadow:0 -1px 0 #e2e2e2,0 1px 0 #d1d1d1 inset;">显示键盘</div></div></div> ',
                        suggestionIpadStyle: '.key_word_lhsl_pad{ position:relative; width:498px;padding:8px 10px;border:1px solid #999;background-color:#fff;font-size:16px;}.key_word_key{height:48px;}.ico_key,.ico_unkey{width:92px;height:43px;padding-left:65px;background:url(//pic.c-ctrip.com/ctripOnPad/un_key20131012.png) 10px 11px no-repeat;cursor:pointer;line-height:40px;font-size:18px;border-width:1px;border-style:solid;border-radius:3px;}.ico_key{border-color:#f0f0f0 #cfcfcf #707070;box-shadow:0 1px 0 #cfcfcf,1px 0 0 0 #f0f0f0 inset,-1px 0 0 0 #f0f0f0 inset,0 -1px 0 0 #f0f0f0 inset;}.ico_unkey{border-color:#898989 #e2e2e2 #e2e2e2;background-color:#f5f5f5;box-shadow:0 -1px 0 #e2e2e2,0 1px 0 #d1d1d1 inset;}.key_word_lhsl .close{position:absolute;top:10px;right:10px;width:30px;height:30px;line-height:30px;text-align:center;color:#666;font:bold 22px/30px "Heiti SC","Heiti SC light",STHeiti,STXihei,sans-serif;}.key_word_lhsl .key_word_list{margin-bottom:6px;}.key_word_lhsl .key_word_list dt{margin-bottom:10px;font-weight:bold;}.key_word_lhsl .key_word_list dd{display:inline-block;}.key_word_lhsl .key_word_list dd{display:block;overflow:hidden;}.key_word_lhsl .key_word_list a{float:left;height:30px;padding:0 8px;margin-right:2px;margin-bottom:10px;line-height:30px;color:#333;white-space:nowrap;}.key_word_lhsl .keyword_sub_city{margin:0 -10px -8px;padding:5px 10px;border-top:1px solid #CCC;background-color:#F3F3F3;color:#333;}.key_word_lhsl .keyword_sub_city a{margin-right:10px;color:#4D4D4D;}.key_word_lhsl_pad .key_word_key{display:block;}',
                        filterIpad: '\t\t\t\t            {{if $data.list}}\t\t\t\t\t            <div class="c_address_select">\t\t\t\t\t\t            <div class="c_address_wrap">\t\t\t\t\t\t\t            <div class="c_address_hd">{{if $data.hasResult}}{{tmpl $data.message.filterResult}}{{else}}{{tmpl $data.message.noFilterResult}}{{/if}}</div>\t\t\t\t\t\t\t            <div class="c_address_list" style="">\t\t\t\t\t\t\t\t            {{each (i,item) $data.list}}\t\t\t\t\t\t\t\t\t            {{if cQuery.type(item)=="string"}}\t\t\t\t\t\t\t\t\t\t            <label>${item}</label>\t\t\t\t\t\t\t\t\t            {{else}}\t\t\t\t\t\t\t\t\t\t            <a href="javascript:void(0);" data="${item.data}">\t\t\t\t\t\t\t\t\t\t\t            <span>${item.left}</span>\t\t\t\t\t\t\t\t\t\t\t            ${item.right}\t\t\t\t\t\t\t\t\t\t            </a>\t\t\t\t\t\t\t\t\t            {{/if}}\t\t\t\t\t\t\t\t            {{/each}}\t\t\t\t\t\t\t            </div>\t\t\t\t\t\t\t            {{if $data.page.max>-1}}\t\t\t\t\t\t\t\t            <div class="c_address_pagebreak">\t\t\t\t\t\t\t\t\t            {{if $data.page.current>0}}\t\t\t\t\t\t\t\t\t\t            <a href="javascript:void(0);" page="${$data.page.current-1}">&lt;-</a>\t\t\t\t\t\t\t\t\t            {{/if}}\t\t\t\t\t\t\t\t\t            {{if $data.page.current<2}}\t\t\t\t\t\t\t\t\t\t            {{loop(index) Math.min(5,$data.page.max+1)}}\t\t\t\t\t\t\t\t\t\t\t            <a href="javascript:void(0);"{{if $data.page.current==index}} class="address_current"{{/if}} page="${index}">${index+1}</a>\t\t\t\t\t\t\t\t\t\t            {{/loop}}\t\t\t\t\t\t\t\t\t            {{else $data.page.current>$data.page.max-2}}\t\t\t\t\t\t\t\t\t\t            {{loop(index) Math.max(0,$data.page.max-4),$data.page.max+1}}\t\t\t\t\t\t\t\t\t\t\t            <a href="javascript:void(0);"{{if $data.page.current==index}} class="address_current"{{/if}} page="${index}">${index+1}</a>\t\t\t\t\t\t\t\t\t\t            {{/loop}}\t\t\t\t\t\t\t\t\t            {{else}}\t\t\t\t\t\t\t\t\t\t            {{loop(index) Math.max(0,$data.page.current-2),Math.min($data.page.current+3,$data.page.max+1)}}\t\t\t\t\t\t\t\t\t\t\t            <a href="javascript:void(0);"{{if $data.page.current==index}} class="address_current"{{/if}} page="${index}">${index+1}</a>\t\t\t\t\t\t\t\t\t\t            {{/loop}}\t\t\t\t\t\t\t\t\t            {{/if}}\t\t\t\t\t\t\t\t\t            {{if $data.page.current<$data.page.max}}\t\t\t\t\t\t\t\t\t\t            <a href="javascript:void(0);" page="${$data.page.current+1}">-&gt;</a>\t\t\t\t\t\t\t\t\t            {{/if}}\t\t\t\t\t\t\t\t            </div>\t\t\t\t\t\t\t            {{/if}}\t\t\t\t\t\t            </div>\t\t\t\t\t            </div>\t\t\t\t            {{/if}}\t\t\t            '
                    }
                });
                return i.method("bind", "change", function(t, i) {
                    var n = i.items[2]
                      , o = i.items[1];
                    a.reg({
                        marklandId: n
                    }),
                    e.attr("_lastvalue", o)
                }),
                i
            };
            $.mod.load("notice", "1.0", function() {
                i()
            }),
            $.mod.load("address", "1.0", function() {
                var e = t.a_markland = n()
                  , i = t.currentCityId;
                t.setjsonpFilter(e, i)
            }),
            $("#J-go_btn").bind("click", function() {
                a.submit()
            })
        };
        a()
    },
    submitForm: function(t) {
        var t = t || ""
          , e = document.createElement("form")
          , i = $("#txtCheckIn").value()
          , a = $("#txtCheckOut").value()
          , n = document.createElement("input")
          , o = document.createElement("input");
        n.type = "hidden",
        n.name = "checkIn",
        n.id = "txtCheckIn",
        n.value = i,
        o.type = "hidden",
        o.name = "checkOut",
        o.id = "txtCheckOut",
        o.value = a,
        e.appendChild(n),
        e.appendChild(o),
        e.method = "post",
        e.action = t,
        e.target = "_blank",
        document.body.appendChild(e),
        e.submit()
    },
    setjsonpFilter: function(t, e) {
        var i = /\$\{cityId\}/g;
        t.set("jsonpFilter", e ? cQuery.marklandJsonpFilterTpl.replace(i, e || "") : void 0)
    },
    on: function(t, e, i, a) {
        var n = function(t, e, i) {
            var a = null
              , n = function(t, e) {
                return t.nodeName.toLowerCase() != e ? (t = t.parentNode,
                n(t, e)) : t
            };
            return !i.getElementsByTagName(e).length || t.getElementsByTagName(e).length ? a : a = n(t, e)
        };
        t.bind(i, function(t) {
            var i = this
              , o = t.target || t.srcElement;
            t = t || window.event,
            o = n(o, e, i),
            o && a.call(o, t)
        })
    },
    updateCityView: function(t) {
        var e = this
          , i = this.hotsoldCityList.find(this.cityTagName)
          , a = function() {
            for (var e = i.length; e--; )
                if (i[e] == t)
                    return e;
            return !1
        }
          , n = a();
        return !(t.className.indexOf("current") > -1) && (i[e.currentIndex].className = "",
        t.className = "current",
        e.currentIndex = n,
        void 0)
    },
    updateLandMarkView: function(t, e, i) {
        var a = this
          , n = ""
          , o = a.getFromVal();
        if ("T" == a.landmarkSearchBox[0].getAttribute("data-opened") && (a.landmarkSearchBox[0].style.left = o + "px",
        a.landmarkSearchBox[0].setAttribute("data-opened", "F"),
        a.landmarkSection[1].className = "landmark_section",
        a.landmarkSection[0].className = "landmark_section current"),
        "ok" == t.state) {
            a.ajaxDataCache[e] = t;
            for (var s = t.nearbyItems.length, r = "", c = 0; c < s; c++) {
                var l = t.nearbyItems[c].nearbyType;
                t.nearbyItems[c].nearbyLink;
                r += "metro" == l || "airportStation" == l ? '<div class="nearby_htl_detail2 J-nearbyContent" style="display: none;"></div>' : '<div class="nearby_htl_detail J-nearbyContent" style="display: none;"></div>'
            }
            n = $.tmpl.render(a.ops.nearbyView, t),
            $(".nearby_htl").html(n),
            a.mainPanel.find("*").remove(),
            a.mainPanel.html(r),
            a.bindNearby({
                cityId: e,
                cityPy: i
            }),
            a.a_markland && a.setjsonpFilter(a.a_markland, e)
        }
    },
    bindPostEvent: function() {
        var t = this;
        t.on($("#J-nearbyDetailContainer"), "a", "click", function(e) {
            var i = this.getAttribute("data-dopost")
              , a = this.getAttribute("href");
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            e.stopPropagation ? e.stopPropagation() : e.cancleBubble(),
            "T" == i && t.submitForm(a)
        })
    },
    bindNearby: function(t) {
        var e = this
          , i = $(".nearby_htl_box");
        e.clickShowInstance && e.clickShowInstance.uninit(),
        $(".nearby_htl li").bind("click", function(t) {
            function e(t, i) {
                var n = arguments
                  , r = window.pageYOffset || document.documentElement.scrollTop;
                a = a || Math.floor(t * s / i),
                o = setTimeout(function() {
                    return r >= t ? void clearTimeout(o) : (window.scrollTo(0, r + a),
                    void e.apply(this, n))
                }, s)
            }
            var a, n = i.offset(), o = null, s = 5;
            setTimeout(function() {
                e(n.top, 400)
            }, 0)
        }),
        e.clickShowInstance = new ClickShow(t)
    },
    getNearbyDataByAjax: function(t, e, i) {
        var a = this;
        $.ajax("/Domestic/Tool/AjaxThemeLandMark.aspx?city=" + t, {
            method: cQuery.AJAX_METHOD_POST,
            context: {
                cityId: t
            },
            escape: !1,
            async: !0,
            cache: !0,
            onsuccess: function(n) {
                var o = $.parseJSON(n.responseText);
                i.call(a, o, t, e)
            }
        })
    },
    _createHtml: function(t) {
        var e = this.cityView
          , i = e.replace(/{href}/g, t.href).replace(/{id}/g, t.id).replace(/{py}/g, t.py).replace(/{name}/g, t.name);
        return i
    },
    _removeLastCity: function(t) {
        var e = this.hotsoldCityList[0].getElementsByTagName(this.cityTagName)
          , i = null;
        "function" == typeof t && (i = $(e[e.length - 2]).find("a").clone(!0),
        t.call(this, i[0])),
        this.hotsoldCityList[0].removeChild(e[e.length - 2])
    }
};
var scrollPicture = function(t) {
    this.init(t)
};
scrollPicture.prototype = {
    init: function(t) {
        this.options = {
            btnPrev: null,
            btnNext: null,
            objBox: null,
            curIndex: 1,
            showLen: 0,
            width: 0,
            moveLen: 1
        },
        $.extend(this.options, t),
        this.options.objBox && (this.initimg(),
        this.autoscroll())
    },
    autoscroll: function() {
        this.items = this.options.objBox.getElementsByTagName("a");
        for (var t = 0; t < this.options.showLen; t++)
            this.items[t] && this.items[t].cloneNode && "function" == typeof this.items[t].cloneNode && this.options.objBox.appendChild(this.items[t].cloneNode(!0));
        var e = this.items.length
          , i = new Animate({
            fps: 60,
            cycle: 1,
            perstep: 30,
            target: this.options.objBox,
            transform: [{
                property: ".style.marginLeft",
                process: [[0, -this.options.width * (e - this.options.showLen), 30 * (e - this.options.showLen)]],
                unit: "px"
            }]
        })
          , a = this.options.showLen
          , n = function() {
            for (var t = 1, n = e - a + 1; t < n / a; t++)
                i.script[30 * t * a] = function() {
                    i.delay(5e3)
                }
        }
          , o = function() {
            for (var t = 1, n = e - a + 1; t < n; t++)
                i.script[30 * t] = null
        };
        n(this),
        i.play(),
        $("#btnPrev").bind("click", function() {
            i.stop(),
            i.setDirection(!1);
            var t = Math.ceil(i.clock.index / i.perstep - 1) * i.perstep;
            return 0 != t && t != i.perstep * (e - a) || (t = i.perstep * (e - a - 1)),
            i.script[t] = function() {
                i.stop(),
                i.clock.timer = 1
            }
            ,
            i.play(),
            !1
        }).bind("mouseover", function() {
            i.stop()
        }).bind("mouseout", function() {
            o(),
            n(),
            i.play()
        }),
        $("#btnNext").bind("click", function() {
            return i.stop(),
            i.setDirection(!0),
            i.clock.index % i.perstep > 0 ? i.script[Math.ceil(i.clock.index / i.perstep) * i.perstep] = function() {
                i.stop(),
                i.clock.timer = 1
            }
            : i.script[(Math.ceil(i.clock.index / i.perstep) + 1) * i.perstep] = function() {
                i.stop(),
                i.clock.timer = 1
            }
            ,
            i.play(),
            !1
        }).bind("mouseover", function() {
            i.stop()
        }).bind("mouseout", function() {
            o(),
            n(),
            i.play()
        }),
        $(this.options.objBox).bind("mouseover", function() {
            i.stop()
        }),
        $(this.options.objBox).bind("mouseout", function() {
            i.play()
        })
    },
    initimg: function() {
        this.items = this.options.objBox.getElementsByTagName("a");
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t].childNodes[0];
            e.getAttribute("_src") && (e.src = e.getAttribute("_src"),
            e.removeAttribute("_src"))
        }
    }
},
Clock.prototype = {
    initialize: function(t, e) {
        this.t = t,
        this.callback = e,
        this.timer = null,
        this.index = 0,
        this.direction = !0
    },
    play: function() {
        this.timer && clearTimeout(this.timer);
        var t = this;
        this.direction ? this.timer = setInterval(function() {
            t.callback(++t.index)
        }, t.t) : this.timer = setInterval(function() {
            t.callback(--t.index)
        }, t.t)
    },
    stop: function() {
        this.timer && clearTimeout(this.timer),
        this.timer = null
    },
    "goto": function(t) {
        this.index = t,
        this.callback(this.index)
    },
    setDirection: function(t) {
        this.direction = t,
        this.timer && this.play()
    }
},
Animate.prototype = {
    initialize: function(t) {
        this.setOptions(t)
    },
    setOptions: function(t) {
        this.extend(this, t),
        this.transform = this.compileAll(this.target, this.transform),
        this.length = this.transform[0] - 1,
        this.transform = this.transform[1],
        this.clock = new Clock(2800 / this.fps,this.frame())
    },
    frame: function() {
        var t = this;
        return function(e) {
            for (var i = 0, a = t.transform.length; i < a; i++)
                t.transform[i](e);
            if (t.onChange(e),
            t.script[e] && t.script[e](),
            t.clock.timer)
                if (e >= t.length && t.getDirection())
                    switch (t.cycle) {
                    case 0:
                        t.stop(),
                        t.onEnd();
                        break;
                    case 1:
                        t.delay(5e3),
                        t.clock.index = -1;
                        break;
                    case 2:
                        t.setDirection(!1)
                    }
                else if (0 == e) {
                    switch (t.cycle) {
                    case 0:
                        t.stop(),
                        t.onEnd();
                        break;
                    case 1:
                        t.getDirection() ? t.setDirection(!0) : (t.delay(5e3),
                        t.clock.index = t.length + 1);
                        break;
                    case 2:
                        t.setDirection(!0)
                    }
                    return
                }
        }
    },
    compileAll: function(t, e) {
        for (var i = [], a = {}, n = 0, o = 0, s = e.length; o < s; o++)
            a = e[o],
            a = this.compile(t, a.property, a.process, a.unit),
            a[1] > n && (n = a[1]),
            i[o] = a[0];
        return [n, i]
    },
    compile: function(target, property, process, unit, flag) {
        for (var unit_process = process[0], unit_result = [], result = this.tween(unit_process[0], unit_process[1], unit_process[2], unit, unit_process[3]), i = 1, l = process.length; i < l; i++)
            unit_process = process[i],
            unit_result = this.tween(unit_process[0], unit_process[1], unit_process[2], unit, unit_process[3]),
            unit_result.shift(),
            result = result.concat(unit_result);
        var length = result.length;
        return flag ? result : [eval("(function(){return function(index){if(index<" + length + ")target" + property + " = ['" + result.join("','") + "'][index];}})()"), length]
    },
    tween: function(t, e, i, a, n) {
        var a = a || 0
          , o = [t + a];
        if (n)
            for (var s = n[0], r = n[1][0], c = n[1][1], l = s(r), d = s(c), p = t == e || l == d ? 1 : (e - t) / (d - l), u = t - l * p, h = (c - r) / i, y = r, m = 1; m < i; m++)
                o[m] = s(m * h + y) * p + u + a;
        else
            for (var f = (e - t) / i, h = 1; h < i; h++)
                t += f,
                o[h] = t + a;
        return o[i] = e + a,
        o
    },
    extend: function(t, e) {
        for (var i in e)
            t[i] = e[i]
    },
    play: function(t) {
        this.clock.play(t),
        this.onPlay(),
        this.start || (this.onStart(),
        this.start = !0),
        this.delayed && clearTimeout(this.delayed)
    },
    stop: function() {
        this.clock.stop(),
        this.onStop()
    },
    delay: function(t) {
        this.stop();
        var e = this;
        this.delayed = setTimeout(function() {
            e.play()
        }, t)
    },
    "goto": function(t) {
        this.clock["goto"](t)
    },
    getIndex: function() {
        return this.clock.index
    },
    getDirection: function() {
        return this.clock.direction
    },
    setDirection: function(t) {
        this.clock.setDirection(t)
    },
    onPlay: function() {},
    onStop: function() {},
    onStart: function() {},
    onEnd: function() {},
    onChange: function() {},
    script: {}
};
var PageLoad = function() {
    var param = {
        cityId: "",
        cityName: "",
        cityPY: "",
        hotelLevel: "",
        startDate: "",
        endDate: ""
    }
      , releaseNo = $("#_releaseNo_").value();
    window.searchMaiDian = {
        version: "",
        destination: "",
        destination_input: "",
        property_dstn: "",
        keyword: "",
        keyword_input: "",
        property_kwd: "",
        keyword_type: "",
        prepageid: "",
        isothercity: "",
        rank_kwd: "",
        rank_dstn: ""
    },
    window.associationMatchMaiDian = {
        destination: "",
        keyword: "",
        ismatch_dstn: "",
        ismatch_kyw: "",
        target: ""
    };
    var initMod = function() {
        new RegMod({
            city: $("#txtCity"),
            startDate: $("#txtCheckIn"),
            endDate: $("#txtCheckOut"),
            keyword: $("#txtKeyword"),
            hotelName: $("#txtHotelName")
        })
    }
      , initTheme = function(t) {
        var e = function(t) {
            if (!t)
                return "";
            var e = {};
            t = t.replace(/@([^@|]+)\|(([a-zA-Z])[^@|]+)\|(\d+)\|([^@]+)/g, function(t, i, a, n, o, s) {
                n = n.toUpperCase(),
                e[n] || (e[n] = []),
                e[n].push("<a href='###' data-seo='" + a + o + "'>" + i + "(" + s + ")</a>")
            });
            for (var i = [["A", "B", "C", "D", "E", "F"], ["G", "H", "I", "J", "K"], ["L", "M", "N", "O", "P"], ["Q", "R", "S", "T", "U"], ["V", "W", "X", "Y", "Z"]], a = "<dd class='no_city'>" + themeMessageConfig[1] + "</dd>", n = ["<ol class='address_ol'><li><span >ABCDEF</span></li><li><span>GHIJK</span></li><li><span>LMNOP</span></li><li><span>QRSTU</span></li><li><span>VWXYZ</span></li></ol>"], o = 0, s = i.length; o < s; o++) {
                n.push("<div class='address_list_hide'>");
                for (var r = i[o], c = 0, l = r.length; c < l; c++)
                    n.push("<dl class='address_dl layoutfix'><dt>" + r[c] + "</dt>"),
                    e[r[c]] && e[r[c]].length ? n.push("<dd class='layoutfix'>" + e[r[c]].join("") + "</dd>") : n.push(a),
                    n.push("</dl>");
                n.push("</div>")
            }
            return n.join("")
        };
        $.mod.load("dropBox", "1.0", function() {
            var i = {
                options: {
                    type: "drop",
                    dropDom: $("#dropFeature"),
                    trigger: ["mousedown"],
                    stag: "a"
                },
                classNames: {
                    checked: "checked"
                },
                listeners: {
                    returnVal: function(t, i) {
                        var a = document.getElementById("SelectFeature")
                          , o = document.getElementById("SelectCity");
                        a.innerHTML = t,
                        o.innerHTML = themeMessageConfig[0],
                        a.dataset ? (a.dataset.seo = i.dataset.seo,
                        o.dataset.seo = "") : (a.setAttribute("data-seo", i.getAttribute("data-seo")),
                        o.setAttribute("data-seo", ""));
                        var s = i.dataset ? i.dataset.tid : i.getAttribute("data-tid");
                        $.ajax(addressUrlConfig.themeCity + "?feature=" + s, {
                            cache: !0,
                            onsuccess: function(t) {
                                $("#themeCity").html(e(t.responseText)),
                                $.mod.load("tab", "1.2", function() {
                                    n.find("ol").regMod("tab", "1.2", {
                                        options: {
                                            index: 0,
                                            tab: "span",
                                            panel: "#themeCity>div",
                                            trigger: "click"
                                        },
                                        style: {
                                            tab: ["hot_selected", ""],
                                            panel: {
                                                display: ["block", "none"]
                                            }
                                        }
                                    })
                                })
                            }
                        })
                    }
                }
            }
              , a = ($("#SelectFeature").regMod("dropBox", "1.0", i),
            $("#SelectCity"))
              , n = $("#themeCity");
            n.html(e(t)).offsetA(a, 7).css("display", "none").css("visibility", "").bind("click", function(t) {
                t = window.event || t;
                var e = t.srcElement || t.target;
                "A" != e.nodeName && (t.preventDefault ? t.stopPropagation() : t.cancelBubble = !0,
                t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            }),
            $.mod.load("tab", "1.2", function() {
                n.find("ol").regMod("tab", "1.2", {
                    options: {
                        index: 0,
                        tab: "span",
                        panel: "#themeCity>div",
                        trigger: "click"
                    },
                    style: {
                        tab: ["hot_selected", ""],
                        panel: {
                            display: ["block", "none"]
                        }
                    }
                })
            });
            var o = {
                options: {
                    type: "drop",
                    dropDom: n,
                    trigger: ["mousedown"],
                    stag: "a"
                },
                classNames: {
                    checked: "checked"
                },
                listeners: {
                    returnVal: function(t, e) {
                        var i = document.getElementById("SelectCity");
                        i.innerHTML = t,
                        i.dataset ? i.dataset.seo = e.dataset.seo : i.setAttribute("data-seo", e.getAttribute("data-seo"))
                    }
                }
            };
            a.regMod("dropBox", "1.0", o)
        }),
        $("#FeatureSumbit").bind("mousedown", function() {
            var t = document.getElementById("SelectFeature")
              , e = document.getElementById("SelectCity")
              , i = t.dataset ? t.dataset.seo : t.getAttribute("data-seo")
              , a = e.dataset ? e.dataset.seo : e.getAttribute("data-seo")
              , n = [];
            a && n.push(a),
            n.push(i || "quanbu"),
            this.href = "/special/" + n.join("-") + "/p1"
        })
    }
      , initBrand = function() {
        new scrollPicture({
            btnPrev: document.getElementById("btnPrev"),
            btnNext: document.getElementById("btnNext"),
            objBox: document.getElementById("brandListBox"),
            showLen: document.body.clientWidth <= 1250 ? 6 : 7,
            width: document.body.clientWidth <= 1250 ? 94.3 : 104
        })
    }
      , initHotelSearch = function() {
        var t = $("#txtKeyword");
        restoreBackwardStatus(FIELDS_WITH_BACKWARD_STATUS),
        HotelSearch.init(),
        HotelSearch.setCity(param.cityId, param.cityName, param.cityPY, param),
        setKeywordJsonpUrl(MOD.a_keyword, param.cityId),
        $("#btnSearch").bind("click", function(e) {
            var i = document.getElementsByTagName("form")[0]
              , a = $("#J_InnRadio")[0]
              , n = $("#J_HotSaleRadio")[0];
            HotelSearch.submit(!1, !1, a.checked, n.checked) && (n.checked && (sendAjaxWithKeyword(),
            t.getMod("notice", "1.0") && t.getMod("notice", "1.0").method("isEmpty") && t.value("")),
            i.submit()),
            e.stop()
        }).get(0).className = "btn_search",
        $("#btnMapSearch").bind("click", function() {
            var t = document.getElementsByTagName("form")[0];
            return HotelSearch.submit(!0, !0) && (sendAjaxWithKeyword(),
            t.submit()),
            !1
        })
    }
      , initHotCity = function() {
        var hotCityElements = $("#hotsold_city_list")[0].getElementsByTagName("li"), curcity, lastcity, processcity = function() {
            hotCityElements = $("#hotsold_city_list")[0].getElementsByTagName("li"),
            hotCityElements && hotCityElements.length > 1 && (curcity = hotCityElements[0],
            lastcity = hotCityElements[hotCityElements.length - 2],
            morecity = hotCityElements[hotCityElements.length - 1])
        };
        processcity();
        var hotCityParams = {
            method: cQuery.AJAX_METHOD_POST,
            context: {
                city: param.cityId,
                cityName: param.cityName,
                cityPY: param.cityPY,
                type: 0,
                cityip: ipcity,
                psid: window.ajaxBlurId && ajaxBlurId.PSID || ""
            },
            escape: !1,
            async: !0,
            cache: !0,
            onsuccess: function(response) {
                if (response.responseText.indexOf("hasListForInitHotHotel") <= 0)
                    return void ($("#hotsold_city_list")[0].getElementsByTagName("li")[0].className = "current");
                if ("" != response.responseText && "\r\n" != response.responseText && ($("#hot_list").html(response.responseText),
                document.getElementById("defaultcity") && (defaultCityJson = document.getElementById("defaultcity").innerHTML,
                defaultCityJson))) {
                    defaultCityJson = eval("(" + defaultCityJson + ")");
                    var Jsonindex = 0
                      , firstcityindex = 0;
                    if (defaultCityJson.each(function(t, e) {
                        var i = document.getElementById("hotsold_city_list")
                          , a = document.getElementById("pop_box_city");
                        if (cityData[t.id])
                            if (cityindex[t.id] <= 7) {
                                if (hotCityElements.length >= cityindex[t.id] && 1 != cityindex[t.id]) {
                                    var n;
                                    0 == firstcityindex && (firstcityindex = cityindex[t.id]),
                                    n = cityindex[t.id] > firstcityindex ? hotCityElements[cityindex[t.id] - 1] : hotCityElements[cityindex[t.id] - 1 + Jsonindex],
                                    i.removeChild(n),
                                    i.insertBefore(n, hotCityElements[0]),
                                    processcity(),
                                    Jsonindex++
                                }
                            } else {
                                Jsonindex++;
                                var n = $("#pop_box_city")[0].getElementsByTagName("a")[cityindex[t.id] - 7];
                                i.removeChild(lastcity);
                                var o = lastcity.getElementsByTagName("a")[0].getAttribute("data-id")
                                  , s = lastcity.getElementsByTagName("a")[0].getAttribute("data-py")
                                  , r = lastcity.getElementsByTagName("a")[0].href
                                  , c = lastcity.getElementsByTagName("a")[0].innerHTML;
                                i.insertBefore(lastcity, hotCityElements[0]);
                                var l = document.getElementById("hotsold_city_list").getElementsByTagName("a")[0];
                                l.setAttribute("data-id", n.getAttribute("data-id")),
                                l.setAttribute("data-py", n.getAttribute("data-py")),
                                l.href = n.href,
                                l.innerHTML = n.innerHTML,
                                n.setAttribute("data-id", o),
                                n.setAttribute("data-py", s),
                                n.href = r,
                                n.innerHTML = c,
                                processcity()
                            }
                        else {
                            var d = "<li><i></i><a data-py=" + t.py + " data-id=" + t.id + " href='/hotel/" + t.py + t.id + "'>" + t.name + "</a></li>";
                            i.removeChild(lastcity),
                            d += i.innerHTML,
                            $("#hotsold_city_list").html(d);
                            var p = lastcity.getElementsByTagName("a")[0];
                            a.appendChild(p),
                            $("#pop_box_city").html(a.innerHTML),
                            processcity(),
                            Jsonindex++
                        }
                    }),
                    defaultCityJson.length >= 2) {
                        var swapcity = hotCityElements[1]
                          , hotsold_city_list = document.getElementById("hotsold_city_list");
                        hotsold_city_list.removeChild(hotCityElements[1]),
                        hotsold_city_list.insertBefore(swapcity, hotCityElements[0])
                    }
                }
                $("#hotsold_city_list")[0].getElementsByTagName("li")[0].className = "current",
                $(".J_trace_hotHotel").bind("click", function() {
                    var t = $("#htl_internal_home_htl_hothotel")
                      , e = $(this).attr("data-hotel")
                      , i = "pageid=" + $("#page_id").value() + ";clicktime=" + (new Date).toFormatString("yyyy-MM-dd hh:mm:ss") + ";hotelid=" + e.split("|")[0] + ";hotelprice=" + e.split("|")[1] + ";others=";
                    t.value(i),
                    window.__bfi.push(["_tracklog", t.attr("data-key"), i])
                });
                var dataObj = new Function($("#HotHotelMaiDian").find("script").html())();
                window.__bfi.push(["_tracklog", dataObj.key, $.stringifyJSON(dataObj.value)])
            }
        };
        $.ajax(addressUrlConfig.hothotel, hotCityParams);
        var ajaxDataObject = {}
          , city_chosen = $("#city_chosen")
          , pop_box_city = $("#pop_box_city")
          , hotsold_city_list = $("#hotsold_city_list")
          , isChildOf = function(t, e, i) {
            if (t == e)
                return !0;
            if (t.contains)
                return t.contains(e);
            if (t.compareDocumentPosition)
                return !!(16 & t.compareDocumentPosition(e));
            for (var a = e.parentNode; a && a != i; ) {
                if (a == t)
                    return !0;
                a = a.parentNode
            }
            return !1
        }
          , hide = function(t) {
            t.target || (t.target = t.srcElement || document),
            null !== t.target && 3 === t.target.nodeType && (t.target = t.target.parentNode),
            t.target == city_chosen[0] || isChildOf(pop_box_city[0], t.target, pop_box_city[0]) || (pop_box_city[0].style.display = "none")
        };
        $(document).bind("click", hide);
        var chosencity = function(t) {
            t = t || window.event;
            var e = t.target || t.srcElement;
            if ($(e).hasClass("c_close"))
                return void $("#pop_box_city").css("display", "none");
            if ("A" == e.nodeName && "city_chosen" != e.id) {
                curcity.className = "",
                pop_box_city[0].style.display = "none";
                var i = {
                    method: cQuery.AJAX_METHOD_POST,
                    context: {
                        city: e.getAttribute("data-id"),
                        cityName: e.innerHTML,
                        cityPY: e.getAttribute("data-py"),
                        psid: window.ajaxBlurId && ajaxBlurId.PSID || ""
                    },
                    escape: !1,
                    async: !0,
                    cache: !0,
                    onsuccess: function(t) {
                        "" != t.responseText ? document.getElementById("nohotcity").style.display = "none" : document.getElementById("nohotcity").style.display = "block",
                        $("#hot_list").html(t.responseText);
                        var e = new Function($("#HotHotelMaiDian").find("script").html())();
                        e && e.key && e.value && window.__bfi.push(["_tracklog", e.key, $.stringifyJSON(e.value)])
                    }
                };
                if ($.ajax(addressUrlConfig.hothotel, i),
                "pop_box_city" != e.parentNode.id)
                    e.parentNode.className = "current",
                    curcity = e.parentNode;
                else {
                    curcity.className = "";
                    var a = e.getAttribute("data-id")
                      , n = e.getAttribute("data-py")
                      , o = e.href
                      , s = e.innerHTML
                      , r = lastcity.getElementsByTagName("a")[0];
                    e.setAttribute("data-id", r.getAttribute("data-id")),
                    e.setAttribute("data-py", r.getAttribute("data-py")),
                    e.href = r.href,
                    e.innerHTML = r.innerHTML,
                    r.setAttribute("data-id", a),
                    r.setAttribute("data-py", n),
                    r.href = o,
                    r.innerHTML = s,
                    lastcity.className = "current",
                    curcity = lastcity
                }
            } else if ("A" == e.nodeName && "city_chosen" == e.id) {
                var c = pop_box_city[0]
                  , l = c.style.display;
                "none" != l ? c.style.display = "none" : c.style.display = ""
            }
            t.preventDefault ? t.stopPropagation() : t.cancelBubble = !0,
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        };
        pop_box_city.bind("click", chosencity),
        hotsold_city_list.bind("click", chosencity)
    }
      , initNearbyMarkland = function() {
        new HotCityTab({
            hotsoldCityList: ".nearby_htl_box .hotsold_city_list",
            popBoxCity: "#nearbyPopCity",
            mainPanel: "#J-nearbyDetailContainer"
        })
    }
      , initMail = function() {
        var t = $("#mailTxtId");
        t.length && (MOD.n_bookmail = t.regMod("notice", "1.0", {
            name: "mailTxtId",
            tips: noticeMessageConfig[3]
        }));
        var e = $("#mailSubmitId")[0];
        e.disabled = !1,
        $("#mailSubmitId").bind("click", function() {
            var t = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
            if (MOD.n_bookmail.method("isEmpty") || !t.test($("#mailTxtId").value()))
                return MOD.formValidator.method("show", {
                    $obj: $("#mailTxtId"),
                    data: validateMessageConfig.mail[0],
                    removeErrorClass: !0,
                    hideEvent: "blur",
                    isFocus: !0,
                    isScroll: !1
                }),
                e.disabled = !1,
                !1;
            e.disabled = !0;
            var i = escape($("#mailTxtId").value())
              , a = {
                method: cQuery.AJAX_METHOD_POST,
                context: {
                    email: i
                },
                escape: !1,
                async: !0,
                cache: !1,
                onsuccess: function(t) {
                    var i = t.responseText;
                    "0" == i ? (e.parentNode.style.display = "none",
                    $("#mail_state_sucess").css("display", "")) : "100" == i ? (MOD.formValidator.method("show", {
                        $obj: $("#mailTxtId"),
                        data: validateMessageConfig.mail[0],
                        removeErrorClass: !0,
                        hideEvent: "blur",
                        isFocus: !0,
                        isScroll: !1
                    }),
                    e.disabled = !1) : (MOD.formValidator.method("show", {
                        $obj: $("#mailTxtId"),
                        data: validateMessageConfig.mail[1],
                        removeErrorClass: !0,
                        hideEvent: "blur",
                        isFocus: !0,
                        isScroll: !1
                    }),
                    e.disabled = !1)
                }
            };
            $.ajax("/Domestic/Tool/AjaxBookEmail.ashx", a)
        }),
        $("#mail_state_sucess").bind("click", function() {
            e.parentNode.style.display = "",
            e.disabled = !1,
            $("#mail_state_sucess").css("display", "none"),
            MOD.n_bookmail.method("resetValue")
        })
    }
      , initTraceCode = function() {
        $(document).bind("mousedown", function(t) {
            t = t || window.event;
            var e = t.target || t.srcElement;
            if ("A" != e.nodeName && (e = e.parentNode),
            e && e.nodeType && "A" == e.nodeName) {
                var i = e.dataset ? e.dataset.ctm : e.getAttribute("data-ctm");
                i && !/#ctm_ref=/.test(e.href) && (e.href += i)
            }
        })
    }
      , initSearchBoxTab = function() {
        var t = $("#J_searchBox")
          , e = ($("#txtCity"),
        $("#cityPY"),
        $("#cityId"))
          , i = e.value()
          , a = ($("#txtCheckIn"),
        $("#txtCheckOut"),
        $("#searchHotelLevelSelect").parentNode().parentNode())
          , n = $("#J_HotelRadio")
          , o = $("#J_InnRadio")
          , s = $("#J_HotSaleRadio")
          , r = $("#txtKeyword")
          , c = $("#btnSearch")
          , l = $("#J_HotelScene")
          , d = new Date
          , p = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
        $("#J_innActivityEntrance"));
        n[0].checked = !0,
        o[0].checked = !1,
        n.bind("click", function() {
            $("#J_searchBox .current").removeClass("current"),
            $(this).parentNode().addClass("current"),
            $("#J_SwitchSearch").css("display", ""),
            $("#jingForm").addClass("hidden"),
            $("#J_searchHistoryBox").css("display", ""),
            $("#txtCity").addClass("input_short_city");
            var t = $("#J_searchHistoryBox");
            t && t.removeClass("hidden");
            var s = $("input[name=HotelCityName]");
            t && s && s.addClass("input_short_city");
            var l, d = MOD.n_keyword, u = keywordMessageConfig.placeholder.hotel, h = keywordMessageConfig.searchButtonText.hotel;
            i = e.value() || i,
            a.css("display", ""),
            p.addClass("hidden"),
            n[0].checked = !0,
            o[0].checked = !1,
            searchOptions.isInn = !1,
            searchOptions.isHot = !1,
            setKeywordJsonpUrl(MOD.a_keyword, i, "Domestic"),
            setCityJsonpUrl(MOD.a_city, "Domestic"),
            c.value(h),
            r.attr("_cqnotice", u),
            d && (l = d.method("isEmpty"),
            d.set("tips", u),
            l && d.method("resetValue"))
        }),
        s.bind("click", function() {
            $("#J_searchBox .current").removeClass("current"),
            $(this).parentNode().addClass("current"),
            $("#J_SwitchSearch").css("display", ""),
            $("#jingForm").addClass("hidden"),
            $("#J_searchHistoryBox").css("display", "none"),
            $("#txtCity").removeClass("input_short_city"),
            a.css("display", ""),
            p.addClass("hidden");
            var t, l = MOD.n_keyword, d = keywordMessageConfig.placeholder.hotel, u = keywordMessageConfig.searchButtonText.hotHotel;
            i = e.value() || i,
            n[0].checked = !1,
            o[0].checked = !1,
            s[0].checked = !0,
            searchOptions.isInn = !1,
            searchOptions.isHot = !0,
            setKeywordJsonpUrl(MOD.a_keyword, i, "hotSale"),
            setCityJsonpUrl(MOD.a_city, "hotSale"),
            c.value(u),
            r.attr("_cqnotice", d),
            l && (t = l.method("isEmpty"),
            l.set("tips", d),
            t && l.method("resetValue"))
        }),
        o.bind("click", function() {
            $("#J_searchBox .current").removeClass("current"),
            $(this).parentNode().addClass("current"),
            $("#J_SwitchSearch").css("display", ""),
            $("#jingForm").addClass("hidden"),
            $("#J_searchHistoryBox").css("display", ""),
            $("#txtCity").addClass("input_short_city");
            var t = $("#J_searchHistoryBox");
            t && t.addClass("hidden");
            var s = $("input[name=HotelCityName]");
            s && s.removeClass("input_short_city");
            var l, d = MOD.n_keyword, u = keywordMessageConfig.placeholder.inn, h = keywordMessageConfig.searchButtonText.inn;
            i = e.value() || i,
            a.css("display", "none"),
            p.removeClass("hidden"),
            n[0].checked = !1,
            o[0].checked = !0,
            searchOptions.isInn = !0,
            searchOptions.isHot = !1,
            setKeywordJsonpUrl(MOD.a_keyword, i, "Inn"),
            setCityJsonpUrl(MOD.a_city, "Inn"),
            c.value(h),
            r.attr("_cqnotice", u),
            d && (l = d.method("isEmpty"),
            d.set("tips", u),
            l && d.method("resetValue"))
        }),
        l.bind("click", function() {
            $("#J_searchBox .current").removeClass("current"),
            $(this).parentNode().addClass("current"),
            $("#J_SwitchSearch").css("display", "none"),
            p.addClass("hidden"),
            $("#jingForm").removeClass("hidden")
        }),
        t.bind("keydown", function(t) {
            var e = t ? t.keyCode : window.event.which;
            13 === e && $("#btnSearch").trigger("click")
        })
    }
      , SuportPadFeature = {
        init: function() {
            this.fixCharacteristicHotelClick()
        },
        fixCharacteristicHotelClick: function() {
            $(".theme_htl_list").find(".pic").bind("touchstart", function(t) {
                window.open($(this).nextSibling().attr("href"), "_blank")
            })
        }
    }
      , initParam = function() {
        getCookie(location.host.match(/big5\./) ? "BHotelCityID" : "HotelCityID", param),
        param.cityId || (param.cityId = "2",
        param.cityName = "上海",
        param.cityPY = "Shanghai")
    }
      , initPage = function() {
        var t = $.BizMod.SearchPanel;
        $("#cityId");
        initSearchBoxTab(),
        initMod(),
        initParam(),
        initNearbyMarkland(),
        initHotelSearch(),
        initMail(),
        initBrand(),
        t.initAdditionalInfo().init({
            getListUrl: addressUrlConfig.ajaxGetHotelAddtionalInfo,
            wrap: $("#visitedHistory"),
            removeUrl: "/Domestic/Tool/AjaxDeleteVistedB.aspx",
            hasLogin: hotelDomesticConfig.hasLogin,
            onRemove: function(t) {
                t.parentNode().remove()
            },
            oncomplete: function(t) {
                var e = t.VisitedHotelInfo;
                e && e.length && this.wrap.html($.tmpl.render($("#J_History").html(), e));
                var i = this.wrap
                  , a = "bg_hover";
                i.find("li").bind("mouseover", function() {
                    $(this).addClass(a)
                }),
                i.find("li").bind("mouseout", function() {
                    $(this).removeClass(a)
                }),
                $(".J_trace_scanedHotel").bind("click", function() {
                    var t = $("#htl_internal_home_htl_scanedhotel")
                      , e = $(this).attr("data-hotel")
                      , i = "pageid=" + $("#page_id").value() + ";clicktime=" + (new Date).toFormatString("yyyy-MM-dd hh:mm:ss") + ";hotelid=" + e.split("|")[0] + ";others=";
                    t.value(i),
                    window.__bfi.push(["_tracklog", t.attr("data-key"), i])
                })
            },
            deleteBtnCls: "delete"
        }).getList(),
        initHotCity(),
        initTraceCode(),
        $.browser.isIPad && SuportPadFeature.init(),
        "undefined" == typeof window.__bfi && (window.__bfi = [])
    };
    return {
        init: initPage
    }
}()
  , sendpost = function(t) {
    t = t || window.event;
    var e = t.target || t.srcElement;
    if ("A" != e.nodeName && (e = e.parentNode),
    e && 1 == e.nodeType && "A" == e.nodeName) {
        var i = e.parentNode
          , a = e.dataset ? e.dataset.dopost : e.getAttribute("data-dopost");
        if (a) {
            var n;
            i && (n = i.parentNode) && ("J_locationItems" == n.getAttribute("id") || "hot_htl_city" == n.className) && setLocationHiddens(e.getAttribute("href"));
            var o = document.forms[0];
            o.action = e.href,
            e.target ? o.target = e.target : o.target = "_self",
            o.__VIEWSTATE && (o.__VIEWSTATE.name = "NOVIEWSTATE"),
            o.submit(),
            t.preventDefault ? t.stopPropagation() : t.cancelBubble = !0,
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }
    }
};
$(".hotel_name").bind("click", sendpost),
$(".hotel_abbrpic").bind("click", sendpost),
$(".search_hotel_zone").bind("click", sendpost),
$(".search_hotel_location").bind("click", sendpost),
$(".hotel_comment").bind("click", sendpost);
var initHotHotelPrice = function(t) {};
!function(t, e) {
    function i(e) {
        this.titleAs = t(e.titleAs),
        this.picBoxs = t(e.picBoxs),
        this.init()
    }
    i.prototype = {
        constructor: i,
        init: function() {
            this._bindEvent()
        },
        _bindEvent: function() {
            t.browser.isIPad ? this.titleAs.bind("click", this._tleMouCliPad.bind(this)) : this.titleAs.bind("mouseover", this._tleMouOverPc.bind(this))
        },
        _tleMouOverPc: function(e) {
            var i = e.target;
            "A" === i.tagName.toUpperCase() && (i = i.parentNode),
            i = t(i),
            this._setActItem(i)
        },
        _tleMouCliPad: function(e) {
            var i = e.target;
            "A" === i.tagName.toUpperCase() && (i = i.parentNode),
            i = t(i),
            i.hasClass("current") || (e.stop(),
            this._setActItem(i))
        },
        _setActItem: function(t) {
            var e = t.find("a").attr("data-item");
            this.titleAs.removeClass("current"),
            t.addClass("current"),
            this.picBoxs.css({
                display: "none"
            }),
            this.picBoxs.filter(".J_specialpics[data-item=" + e + "]").css({
                display: "block"
            })
        }
    }
}(cQuery, window);
var checkForFoldYc = {
    key: !0
};
$("#seo_more").bind("click", function() {
    checkForFoldYc.key ? ($(this).parentNode().parentNode().find(".seo_hot").addClass("sta_unfold"),
    checkForFoldYc.key = !1) : ($(this).parentNode().parentNode().find(".seo_hot").removeClass("sta_unfold"),
    checkForFoldYc.key = !0)
}),
$(".seo_hot").removeClass("sta_unfold"),
function() {
    var t, e = 5e3, i = 4, a = 0, n = $("#J_latestOrdered dd"), o = [].slice.call(n), s = o.length;
    o = o.concat(o),
    t = function() {
        $(o).css("display", "none"),
        $(o.slice(a % s, a % s + i)).css("display", ""),
        a += i
    }
    ,
    t(),
    setInterval(t, e)
}(),
function() {
    var t = $("#J_surrounding")
      , e = t.find(".st_title")
      , i = t.find(".st_start")
      , a = t.find(".st_list");
    e.removeClass("show_list"),
    a.removeClass("hidden"),
    $.mod.load("animate", "1.0", function() {
        $.browser.isIPad ? t.bind("click", function(t) {
            e.animate({
                "padding-top": "35px"
            }),
            i.animate({
                bottom: "40px",
                opacity: "0"
            }),
            a.animate({
                bottom: "0px"
            })
        }) : t.bind("mouseenter", function(t) {
            t.stop(),
            e.animate({
                "padding-top": "35px"
            }),
            i.animate({
                bottom: "40px",
                opacity: "0"
            }),
            a.animate({
                bottom: "0px"
            })
        }).bind("mouseleave", function(t) {
            t.stop(),
            e.animate({
                "padding-top": "60px"
            }),
            i.animate({
                bottom: "0px",
                opacity: "1"
            }),
            a.animate({
                bottom: "-90px"
            })
        })
    })
}(),
function() {
    var t = {
        $container: !1,
        hoverStatus: !1,
        processing: !1,
        playInterval: 3e3,
        hoverTimeout: 300,
        slideshowSpeed: 100,
        animationSpeed: 400,
        init: function(t) {
            if (!t)
                return !1;
            var e = $(t);
            if (0 == e.length)
                return !1;
            if (this.$container = e,
            document.all && !window.setTimeout.isPolyfill) {
                var i = window.setTimeout;
                window.setTimeout = function(t, e) {
                    var a = Array.prototype.slice.call(arguments, 2);
                    return i(t instanceof Function ? function() {
                        t.apply(null, a)
                    }
                    : t, e)
                }
                ,
                window.setTimeout.isPolyfill = !0
            }
            return !0
        },
        start: function(t) {
            var e = this;
            this.init(t) && $.mod.load("animate", "1.0", function() {
                e.doDirection(),
                e.doInterval()
            })
        },
        pause: function() {
            this.hoverStatus = !0
        },
        recover: function() {
            this.hoverStatus = !1
        },
        doInterval: function() {
            var t = this;
            setInterval(function() {
                if (!t.hoverStatus) {
                    var e = t.$container.find(".J_specialtitle")
                      , i = (t.$container.find(".htl_special_pics>a"),
                    e.length)
                      , a = t.findCurrentIndex()
                      , n = 1;
                    a < i && (n = parseInt(a) + 1),
                    t.doSwitch(n)
                }
            }, t.playInterval)
        },
        doDirection: function() {
            var t = this
              , e = new Array(t.doHover,t.doHover)
              , i = 0
              , a = 1
              , n = function(e) {
                var i = e || window.event;
                "mouseenter" == i.type ? t.pause && t.pause() : t.recover && t.recover()
            }
              , o = t.$container.get(0);
            navigator.userAgent.indexOf("MSIE") >= 0 ? (o.onmouseenter = n,
            o.onmouseleave = n) : (o.onmouseover = function(t) {
                var e = t || window.event
                  , i = e.relatedTarget;
                i && (8 & i.compareDocumentPosition(this) || i === this) || n.call(this, e)
            }
            ,
            o.onmouseout = function(t) {
                var e = t || window.event
                  , i = e.relatedTarget;
                i && (8 & i.compareDocumentPosition(this) || i === this) || n.call(this, e)
            }
            ),
            t.$container.find(".J_specialtitle").bind("mouseover", function(n) {
                var o = n.target;
                o && "A" == o.tagName && (a = parseInt($(o).attr("data-item") || "1"),
                t.pause && t.pause(),
                e[i] && setTimeout(function(e) {
                    e == a && t.hoverStatus && t.doHover(e, o)
                }, t.hoverTimeout, a),
                n.stopPropagation())
            })
        },
        doSwitch: function(t, e) {
            var i = this
              , a = i.$container.find(".J_specialtitle")
              , n = i.$container.find(".htl_special_pics")
              , o = n.find("a");
            i.processing = !0;
            var s = void 0;
            o.each(function(t) {
                if ("block" == t.css("display"))
                    return s = t,
                    !1
            });
            var r = o.filter("[data-item=" + t + "]");
            return s.attr("data-item") == r.attr("data-item") ? void (i.processing = !1) : void s.animate({
                opacity: .3
            }, i.animationSpeed, function() {
                return e && !i.hoverStatus ? (i.processing = !1,
                void s.css({
                    display: "block",
                    opacity: 1
                })) : (r.css({
                    display: "block",
                    opacity: .3
                }),
                s.css({
                    display: "none",
                    opacity: 1
                }),
                r.animate({
                    opacity: 1
                }, i.slideshowSpeed, function() {
                    i.processing = !1
                }),
                void a.removeClass("current").filter(":has(a[data-item=" + t + "])").addClass("current"))
            })
        },
        doHover: function(t, e) {
            var i = this;
            i.$container.find(".J_specialtitle");
            return i.processing ? void setTimeout(i.doHover(t, e), 100) : (i.$container.find(".J_specialtitle").removeClass("current").filter(":eq(" + (t - 1) + ")").addClass("current"),
            void i.doSwitch(t, !0))
        },
        findCurrentIndex: function() {
            return this.$container.find("td.J_specialtitle.current a").attr("data-item")
        }
    };
    t.start("div.htl_specials")
}(),
function() {
    $(".J_faxian_box a[data-tracekey]").bind("click", function(t) {
        var e = $(this).attr("data-tracekey")
          , i = $(this).attr("data-tracevalue");
        window.__bfi.push(["_tracklog", e, i])
    })
}(),
function() {
    $("#txtCity").bind("blur", function() {})
}(),
function(t, e) {
    var i = !1;
    t(e).bind("focus", function() {
        i = !0,
        setTimeout(function() {
            i = !1
        }, 200)
    }),
    setTimeout(function() {
        t("#txtCity, #txtCheckIn, #txtCheckOut").bind("focus", function() {
            i && t(this).trigger("blur")
        })
    }, 4e3)
}(cQuery, window);
