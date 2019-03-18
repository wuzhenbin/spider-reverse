function setLocationHiddens(e) {
    var t = $("#positionArea")
      , i = $("#positionId")
      , n = /(zone|location|l|s|sl)(\d+)\w*/i
      , o = e.replace("http://", "").split("/")
      , a = n.exec(o[o.length - 1]) || {};
    t.value(a[1] || ""),
    i.value(a[2] || "")
}
function checkExist(e, t) {
    return "undefined" == typeof HOTEL_POSITION[e] && (HOTEL_POSITION[e] = {},
    HOTEL_POSITION[e][t] = "zone" === t ? {} : [],
    HOTEL_POSITION[e].all = []),
    "undefined" == typeof HOTEL_POSITION[e][t] && (HOTEL_POSITION[e][t] = []),
    !0
}
function initCData() {
    return window.c_data = {
        city: {},
        cityName: {},
        cityPY: {},
        cityPingYing: {}
    }
}
function getCookie(e, t) {
    var i = cQuery.cookie.get(e);
    i = (i ? i : "").split("split");
    for (var n = 0, o = i.length; n < o; n++)
        0 == n && "cityId"in t ? t.cityId = unescape(i[n]) : 1 == n && "cityName"in t ? t.cityName = unescape(i[n]) : 2 == n && "cityPY"in t ? t.cityPY = unescape(i[n]) : 3 == n && "startDate"in t ? t.startDate = unescape(i[n]) : 4 == n && "endDate"in t ? t.endDate = unescape(i[n]) : 5 == n && "hotelLevel"in t && (t.hotelLevel = unescape(i[n]))
}
function setCookie(e, t) {
    var i = window.location.host.replace("hotels.", "");
    t.hotelLevel ? t.hotelLevel : "",
    t.startDate ? t.startDate : "",
    t.endDate ? t.endDate : "";
    cQuery.cookie.set(e, null, t.cityId + "split" + t.cityName + "split" + t.cityPY + "split" + t.startDate + "split" + t.endDate + "split" + t.hotelLevel, {
        expires: 30,
        domain: i,
        path: "/"
    })
}
window.hotelPluginsVersion = {
    tab: "1.2",
    address: "1.0",
    calendar: "6.0",
    notice: "1.0",
    toggle: "1.0",
    validate: "1.1",
    allyes: "1.0",
    adFrame: "1.0",
    dropBox: "1.0"
},
$.fn.show = function() {
    return this.css("display", ""),
    this
}
,
$.fn.hide = function() {
    return this.css("display", "none"),
    this
}
;
var _noticePlaceholderPlugin = function(e) {
    var t = e.attr("_cqnotice");
    this._html5PlaceholderUse = function() {
        e.get(0).setAttribute("placeholder", t),
        e.hasClass("inputSel") && e.removeClass("inputSel")
    }
    ,
    this._h5ClearInput = function() {
        $("#txtKeyword").value("")
    }
    ,
    this._isNoticeUse = $.browser.isIE10 || $.browser.isIE9 || $.browser.isIE8 || $.browser.isIE7 || $.browser.isIE6
};
_noticePlaceholderPlugin.prototype = {
    splitFactory: function() {
        var e = this;
        switch (e._isNoticeUse) {
        case !0:
            return !0;
        case !1:
            return e._html5PlaceholderUse(),
            !1
        }
    },
    cityChangeFactory: function() {
        var e = this;
        switch (e._isNoticeUse) {
        case !1:
            e._h5ClearInput()
        }
    }
};
var $newPh = function(e) {
    return new _noticePlaceholderPlugin(e)
};
window.userBehaviorKeyWordInfo = {
    searchType: "S",
    cityId: null,
    keyword: null
};
var getStar = function() {
    var e = ""
      , t = document.getElementById("searchHotelLevelSelect")
      , i = document.getElementById("hotelStar")
      , n = cQuery("#filterStar").find(".selected a");
    return n.length ? (function() {
        var t = n.html()
          , i = {
            "五": "5",
            "四": "4",
            "三": "3",
            "二": "2",
            "不限": "0"
        }
          , o = t.match("五|四|三|二|不限");
        o && i[o] && (e = i[o])
    }(),
    e) : t ? e = t.value : i ? (e = i.value,
    e.length || (e = "0"),
    e) : e
}
  , JSONP_POS_RESPONSE = ""
  , CLICK_DATA_TYPE = ""
  , CLICK_DATA_VALUE = ""
  , searchOptions = {
    isInn: !1,
    isHot: !1
}
  , sendAjaxWithKeyword = function(e) {
    e = e || {};
    var t = function(e) {
        var t = {};
        if (!e)
            return t;
        for (var i = e.split(/@/), n = 0; n < i.length; n++) {
            var o = i[n].split("|")
              , a = o[1];
            t[a] = {
                pinyin: o[0],
                keywordClick: o[2],
                type: o[3]
            }
        }
        return t
    }
      , i = $.extend({
        KEYWORD_INPIT: "txtKeyword",
        URL: "/Domestic/Tool/AjaxImpressionLog.aspx",
        CITYID_HIDDEN_INPUT: "cityId",
        STAR_HIDDEN_INPUT: "hotelStar",
        KEYWORD_HIDDEN_INPUT: "hotelAreaName"
    }, e)
      , n = t(JSONP_POS_RESPONSE)
      , o = {}
      , a = document.getElementById(i.KEYWORD_INPIT) ? document.getElementById(i.KEYWORD_INPIT).value : ""
      , r = n[a] || {}
      , s = []
      , l = i.URL;
    if (o.type = r.type || "",
    o.keywordclick = r.keywordClick || "",
    o.url = escape(window.location.href),
    o.city = document.getElementById(i.CITYID_HIDDEN_INPUT) ? document.getElementById(i.CITYID_HIDDEN_INPUT).value : "",
    o.star = getStar(),
    o.keyword = escape(document.getElementById(i.KEYWORD_HIDDEN_INPUT) ? document.getElementById(i.KEYWORD_HIDDEN_INPUT).value : ""),
    o.version = "1.0",
    o.isnewsearch = "true",
    o.ClickSourceType = "1",
    o.ClickDataType = CLICK_DATA_TYPE || "city",
    o.ClickDataValue = CLICK_DATA_VALUE || document.getElementById("cityId").value,
    !$.isEmptyObject(o)) {
        for (k in o)
            s.push(k + "=" + o[k]);
        l += "?" + s.join("&")
    }
    $.ajax(l, {
        async: !1,
        onsuccess: function() {}
    })
}
  , MOD = {};
$.getJsonp = function() {
    var e = 0;
    return function(t, i) {
        var n = "_json" + e++
          , o = document.getElementsByTagName("head")[0]
          , a = document.createElement("script");
        a.charset = "utf-8",
        a.src = t + "?callback=" + n + "&t=" + (new Date).getTime(),
        o.appendChild(a),
        window[n] = function(e) {
            i(e),
            o.removeChild(a)
        }
    }
}();
var HOTEL_POSITION = {
    dataCash: {
        idFrom1To10: !1,
        idFrom11To200: !1,
        idFrom201ToMax: !1,
        error: !0
    }
}
  , CITYENTER = !0;
MOD.globalForm = {
    form: document.forms[0],
    submit: function(e, t) {
        var i = this.form;
        i.action = e,
        i.target = t || "_self",
        i.__VIEWSTATE && (i.__VIEWSTATE.name = "NOVIEWSTATE"),
        i.submit()
    }
},
MOD.defaultSuggestionInit = function(e) {
    function t() {
        var e = this;
        i.each(function(t, i) {
            t[0] == e ? (t.addClass("hot_selected"),
            n[i].style.display = "") : (t.removeClass("hot_selected"),
            n[i].style.display = "none")
        })
    }
    var i = e.find(".tab_box li")
      , n = e.find("div.city_item");
    i.length && (i.bind("mousedown", t),
    t.apply(i[0]))
}
,
MOD.hotelNamePreHtml = "",
window.parseRawDataNew = function() {
    var e = initCData();
    CHINA_HOTEL_CITY_RAW_DATA = CHINA_HOTEL_CITY_RAW_DATA.replace(/@(\w?\d+)\|0\|([^\|]+)\|\s*([^\|]*)\|\s*([^@]*)/g, function(t, i, n, o, a) {
        return e.city["P" + i] = [],
        e.cityName["P" + i] = n,
        e.cityPY[i] = o,
        e.cityPingYing[i] = a,
        ""
    }),
    CHINA_HOTEL_CITY_RAW_DATA = CHINA_HOTEL_CITY_RAW_DATA.replace(/@(\w?\d+)\|([1-9]\d*)\|([^\|]+)\|\s*([^\|]*)\|\s*([^@]*)/g, function(t, i, n, o, a, r) {
        var s = e.city["P" + n];
        return s && (s.push(i.toString()),
        n != i && (e.city[i] = []),
        e.cityName[i] = o,
        a && (e.cityPY[i] = a),
        r && (e.cityPingYing[i] = r)),
        ""
    })
}
,
window.parseRawData = function() {}
,
window.cityProv = function(e) {
    var t = arguments.callee._val;
    if (!t) {
        t = arguments.callee._val = {},
        "undefined" == typeof window.c_data && parseRawDataNew();
        var i = window.c_data.city;
        for (var n in i)
            if (i[n].length) {
                for (var o = i[n].length; o--; )
                    t[i[n][o]] = n;
                t[i[o]] = n
            }
    }
    return t[e]
}
,
cQuery.highlightKeyword = function(e, t) {
    return t ? (t = t.split(/\s+/),
    t.each(function(t) {
        /[a-zA-Z]/.test(t) || (e = e.replace(new RegExp("(" + t + ")","gi"), "<span class='b'>$1</span>"))
    }),
    e) : e
}
,
function(e, t) {
    function i(e, i, n) {
        var o = /\$\{cityId\}/g
          , a = /\$\{module\}/g;
        n = n || "Domestic",
        "Inn" == n ? setTimeout(function() {
            var r = "/Tool/AjaxFindKeywordNew.aspx?cityid=${cityId}&keyword=${key}&callback=cQuery.jsonpPosCallback";
            cQuery.keywordJsonpFilterTpl = "/inn" + r,
            cQuery.keywordJsonpSourceTpl = "/${module}/Tool/AjaxGetHotKeyword.aspx?cityid=${cityId}",
            e.set("jsonpFilter", i ? t("#innSite").value() + cQuery.keywordJsonpFilterTpl.replace(a, n).replace(o, i || "") : void 0),
            e.set("jsonpSource", i ? t("#innSite").value() + cQuery.keywordJsonpSourceTpl.replace(a, n).replace(o, i || "") : void 0)
        }, 0) : "hotSale" == n ? setTimeout(function() {
            var t = "/Tool/AjaxFindKeywordNew.aspx?cityid=${cityId}&keyword=${key}&callback=cQuery.jsonpPosCallback";
            cQuery.keywordJsonpFilterTpl = addressUrlConfig.hotHotelUrl + t,
            cQuery.keywordJsonpSourceTpl = addressUrlConfig.hotHotelUrl + "/Tool/AjaxGetHotKeyword.aspx?cityid=${cityId}",
            e.set("jsonpFilter", i ? cQuery.keywordJsonpFilterTpl.replace(o, i || "") : void 0),
            e.set("jsonpSource", i ? cQuery.keywordJsonpSourceTpl.replace(o, i || "") : void 0)
        }, 0) : setTimeout(function() {
            var t = "/Tool/AjaxKeywordAssociate.aspx?cityid=${cityId}&keyword=${key}&callback=cQuery.jsonpPosCallback";
            cQuery.keywordJsonpFilterTpl = "/Domestic" + t,
            cQuery.keywordJsonpSourceTpl = "/${module}/Tool/AjaxGetHotKeyword.aspx?cityid=${cityId}",
            e.set("jsonpFilter", i ? cQuery.keywordJsonpFilterTpl.replace(a, n).replace(o, i || "") : void 0),
            e.set("jsonpSource", i ? cQuery.keywordJsonpSourceTpl.replace(a, n).replace(o, i || "") : void 0)
        }, 0)
    }
    function n(e, t) {
        t = t || "Domestic",
        setTimeout(function() {
            "inn" == t.toLowerCase() ? (e.set("jsonpFilter", v + "/inn/Tool/AjaxIndexCityNew.aspx?keyword=${key}"),
            e.set("jsonpSource", v + "/inn/Tool/AjaxGetCitySuggestion.aspx")) : "hotSale" == t ? (e.set("jsonpFilter", addressUrlConfig.hotHotelUrl + "/Tool/AjaxIndexCityNew.aspx?keyword=${key}"),
            e.set("jsonpSource", addressUrlConfig.hotHotelUrl + "/Tool/AjaxGetCitySuggestion.aspx")) : (e.set("jsonpFilter", "/" + t + "/Tool/AjaxDestination.aspx?keyword=${key}&from=domestic"),
            e.set("jsonpSource", window.IS_FROM ? "/" + window.IS_FROM + "/Tool/AjaxGetCitySuggestion.aspx" : "/" + t + "/Tool/AjaxGetCitySuggestion.aspx"))
        }, 0)
    }
    function o(e) {
        var t = e[0].ownerDocument
          , i = t.createElement("link");
        i.type = "text/css",
        i.rel = "stylesheet",
        i.href = "http://webresource.c-ctrip.com/styles/common/c_address.css",
        t.getElementsByTagName("head")[0].appendChild(i)
    }
    function a(e, i) {
        var n = i.data.split("|")
          , o = ""
          , a = t("#btnSearch")
          , r = t("#cityId")
          , s = t("#cityPY")
          , l = r.value()
          , c = r.value().split("_").pop();
        d.value(n[2] || o),
        searchOptions.isInn || ("D" !== l.substr(0, 1).toUpperCase() ? "District" === n[3] ? (r.value("D" + n[2] + "_" + n[4]),
        s.value(n[8])) : (!!n[4] && r.value(n[4]),
        !!n[6] && s.value(n[6])) : c !== n[4] && (!!n[4] && r.value(n[4]),
        !!n[6] && s.value(n[6]))),
        h.value(i.value),
        u.value(n[3] || o),
        a[0] && "FlagShip" !== n[3] && setTimeout(function() {
            a[0].click()
        }, 0),
        "FlagShip" === n[3] && ("12" === n[2] && (window.location.href = "/flagship/hyatt"),
        "10" === n[2] && (window.location.href = "/flagship/accor"),
        "sands" === n[2] && (window.location.href = "/flagship/sands"))
    }
    function r(e) {
        return s(e, 16, 4)
    }
    function s(e, t, i) {
        var n, o, a, r = 0, s = {};
        for (n in e)
            a = e[n],
            r += Math.max(i - a.length, 0);
        for (n in e)
            a = e[n],
            o = a.length,
            a = s[n] = a.slice(0, r ? Math.max(i + r, i) : i),
            r && (r = Math.max(r - Math.max(a.length - i, 0), 0));
        return s
    }
    function l(e) {
        window.associationMatchMaiDian.ismatch_kyw = "T";
        var i, n = {
            isNewVersion: !1,
            filterResult: []
        }, o = {
            name: [],
            district: [],
            station: [],
            position: []
        }, a = [], s = y, l = "|", c = 1, d = 1, u = 0, h = 0, p = 16, v = !1;
        if (!(e && e.length > 0))
            return null;
        var m = e[0].data.split("|");
        if (n.isNewVersion = m.length > 10 && 1 == m[10],
        n.isNewVersion) {
            for (u = 0,
            h = e.length; u < h; u++) {
                e[u].data = e[u].data.replace("$", "@"),
                e[u].right = e[u].right.replace("$", "@");
                var f = e[u]
                  , g = f.data.split(l)
                  , w = g[3].toLowerCase()
                  , _ = g[7];
                if ("undefined" === t.type(i) && (i = _),
                0 === u && "0" !== _ && n.filterResult.push([]),
                i !== _ && !v) {
                    if (n.filterResult.push(a),
                    i = _,
                    a = [],
                    p < 6 && 1 === n.filterResult.length || 0 === p) {
                        a = [];
                        break
                    }
                    v = !0
                }
                if (a.push(f),
                p--,
                0 === p || u === h - 1) {
                    a.length && n.filterResult.push(a);
                    break
                }
            }
            n.filterResult.each(function(e) {
                var t = e || null;
                t && (t.yindex = c++)
            })
        } else {
            for (u = 0,
            h = e.length; u < h; u++) {
                e[u].data = e[u].data.replace("$", "@"),
                e[u].right = e[u].right.replace("$", "@");
                var f = e[u]
                  , g = f.data.split(l)
                  , w = g[3].toLowerCase()
                  , D = s[w]
                  , _ = searchOptions.isInn ? "0" : g[7] || "0";
                if ("undefined" === t.type(i) && (i = _),
                0 === u && "0" !== _ && n.filterResult.push({
                    name: [],
                    district: [],
                    station: [],
                    position: []
                }),
                i !== _ && !v && (o.name.length || o.station.length || o.position.length)) {
                    if (n.filterResult.push(o),
                    i = _,
                    o = {
                        name: [],
                        district: [],
                        station: [],
                        position: []
                    },
                    p < 6 && 1 === n.filterResult.length || 0 === p) {
                        o = null;
                        break
                    }
                    v = !0
                }
                if (o[D.view].push(f),
                p--,
                0 === p || u === h - 1) {
                    (o.name.length || o.station.length || o.position.length) && n.filterResult.push(o);
                    break
                }
            }
            n.filterResult.map(function(e) {
                return r(e)
            }),
            ["name", "district", "station", "position"].each(function(e) {
                n.filterResult.each(function(t) {
                    var i = t[e] || null;
                    if (i)
                        for (u = 0,
                        h = i.length; u < h; u++)
                            i[u].yindex = c++
                })
            }),
            n.filterResult.each(function(e) {
                d = 1,
                ["name", "district", "station", "position"].each(function(t) {
                    var i = e[t] || null;
                    if (i)
                        for (u = 0,
                        h = i.length; u < h; u++)
                            i[u].rankindex = d++
                })
            })
        }
        return n
    }
    var c = t.browser.isIE
      , d = t("#positionId")
      , u = t("#positionArea")
      , h = t("#hotelAreaName")
      , y = {
        hotel: {
            search: "",
            view: "name"
        },
        district: {
            search: "district",
            view: "district"
        },
        cityhotelgroup: {
            search: "g",
            view: "name"
        },
        districthotelgroup: {
            search: "g",
            view: "name"
        },
        citydistricthotelgroup: {
            search: "g",
            view: "name"
        },
        cityhotelbrand: {
            search: "h",
            view: "name"
        },
        districthotelbrand: {
            search: "h",
            view: "name"
        },
        citydistricthotelbrand: {
            search: "h",
            view: "name"
        },
        markland: {
            search: "sl",
            view: "position"
        },
        metrostation: {
            search: "s",
            view: "position"
        },
        zone: {
            search: "zone",
            view: "position"
        },
        domesticzone: {
            search: "zone",
            view: "position"
        },
        sight: {
            search: "sl",
            view: "position"
        },
        location: {
            search: "location",
            view: "position"
        },
        metro: {
            search: "l",
            view: "position"
        },
        airport: {
            search: "sl",
            view: "station"
        },
        railwaystation: {
            search: "sl",
            view: "station"
        }
    };
    e.markerTypeMap = y;
    var p = function(e) {
        this.init(e),
        this.startLoadMods(),
        this.initNotice(),
        this.initAddress(),
        this.ops.startDate.length && this.ops.endDate.length && this.initCalendar(this.ops.startDate, this.ops.endDate),
        this.ops.checkInDate.length && this.ops.checkOutDate.length && this.initCalendar(this.ops.checkInDate, this.ops.checkOutDate, !0),
        this.ops.meetingCheckIn.length && this.ops.meetingCheckOut.length && this.initCalendar(this.ops.meetingCheckIn, this.ops.meetingCheckOut, !0, !0),
        this.initValidate()
    };
    e.Help = {
        format: function(e) {
            var t = {};
            for (var i in e)
                if (t[i] = {},
                i.search(/[A-Z]/i) != -1)
                    for (var n = 0; n < e[i].length; n++)
                        t[i][e[i][n].group] ? t[i][e[i][n].group].push(e[i][n]) : (t[i][e[i][n].group] = [],
                        t[i][e[i][n].group].push(e[i][n]));
                else
                    for (var n = 0; n < e[i].length; n++)
                        t[i][""] ? t[i][""].push(e[i][n]) : (t[i][""] = [],
                        t[i][""].push(e[i][n]));
            return t
        },
        highlight: function(e, t, i) {
            for (var n = ["\\", "^", "$", ".", "*", "+", "=", ":", "|", "/", "(", ")", "[", "]", "{", "}"], o = 0; o < n.length; o++)
                t = t.replace(n[o], "\\" + n[o]);
            var a = new RegExp(t,"ig");
            return i ? e.replace(a, '<b class="' + i + '">$&</b>') : e.replace(a, "<b>$&</b>")
        },
        getEnumItemType: function(e) {
            switch (e) {
            case "City":
                return "城市";
            case "IntlCity":
                return "城市";
            case "District":
                return "景区";
            case "IntlDistrict":
                return "景区";
            case "Markland":
                return "地标";
            case "Location":
                return "行政区";
            case "Zone":
                return "商业区";
            case "Airport":
                return "机场";
            case "IntlPOIAirport":
                return "机场";
            case "RailwayStation":
                return "车站";
            case "Hotel":
                return "酒店";
            case "MetroStation":
                return "地铁站";
            case "CityHotelGroup":
                return "集团";
            case "CityHotelBrand":
                return "品牌";
            case "Metro":
                return "地铁线";
            case "IntlProvince":
                return "省份";
            case "FlagShip":
                return "集团酒店";
            default:
                return ""
            }
        },
        getScenic: function(e) {
            var t = [];
            return e.each(function(e) {
                var i = e.data.split("|")
                  , n = ScenicData[i[2]];
                n && "District" === i[6] && (n.data = e.data,
                t.push(n))
            }),
            t
        },
        groupCityFilterData: function(e) {
            window.associationMatchMaiDian.ismatch_dstn = "T";
            var t = {
                isNewVersion: !1
            }
              , i = 1
              , n = 0;
            if (e.length > 0) {
                var o = e[0].data.split("|");
                t.isNewVersion = o.length > 10 && 1 == o[10]
            }
            if (t.isNewVersion)
                for (t.list = e,
                n = 0; n < t.list.length; n++)
                    t.list[n].yindex = i++;
            else
                e.each(function(e) {
                    var i = e.data.split("|")
                      , n = i[6];
                    (t[n] || (t[n] = [])).push(e)
                }),
                ["City", "District", "Sight", "Location", "DomesticZone", "Airport", "RailwayStation", "Hotel"].each(function(e) {
                    if (t[e])
                        for (n = 0; n < t[e].length; n++)
                            t[e][n].yindex = i++,
                            t[e][n].isInn = searchOptions.isInn,
                            t[e][n].isHot = searchOptions.isHot
                });
            return t
        }
    };
    var v = t("#innSite").value();
    e.setKeywordJsonpUrl = i,
    e.setCityJsonpUrl = n,
    function() {
        var e = t("#btnSearch");
        e.bind("click", function() {
            var e = t("#J_HotSaleRadio")[0];
            if (!e || !e.checked) {
                var i = t("#cityId").value();
                window.userBehaviorKeyWordInfo.cityId = i,
                window.userBehaviorKeyWordInfo.keyword = t("#txtKeyword").value(),
                window.__bfi.push(["_tracklog", "SEARCH_AUTOCOMPLET_US", t.stringifyJSON(window.userBehaviorKeyWordInfo)]),
                window.userBehaviorKeyWordInfo = {
                    searchType: "S",
                    cityId: null,
                    keyword: null
                },
                window.searchMaiDian.destination || (window.searchMaiDian.destination = t("#txtCity").value()),
                window.searchMaiDian.keyword || (window.searchMaiDian.keyword = t("#txtKeyword").value()),
                window.searchMaiDian.prepageid = t("#page_id").value(),
                window.searchMaiDian.version = 3,
                window.searchMaiDian.cityId = i,
                window.searchMaiDian.regionid = i,
                window.searchMaiDian.regiontype = "1",
                2 == i.split("_").length && 0 == i.indexOf("D") && (window.searchMaiDian.cityId = i.split("_")[1],
                window.searchMaiDian.regionid = i.split("_")[0].substring(1, i.split("_")[0].length),
                window.searchMaiDian.regiontype = "4"),
                window.__bfi.push(["_tracklog", "hotel_inland_search_version3", t.stringifyJSON(window.searchMaiDian)]),
                t.cookie.del("DomesticHotelCityID", null, {
                    domain: window.location.host.replace("hotels.", ""),
                    path: "/"
                })
            }
        })
    }(),
    cQuery.groupHotelMarkerData = l,
    t.extend(p.prototype, {
        init: function(e) {
            this.ops = {
                city: [],
                startDate: [],
                endDate: [],
                keyword: [],
                checkInDate: [],
                checkOutDate: [],
                meetingCheckIn: [],
                meetingCheckOut: [],
                offsetPos: 5
            },
            this.ops = t.extend(this.ops, e)
        },
        startLoadMods: function() {
            var i = {
                address: e.hotelPluginsVersion.address,
                calendar: e.hotelPluginsVersion.calendar,
                dropBox: e.hotelPluginsVersion.dropBox,
                notice: e.hotelPluginsVersion.notice,
                tab: e.hotelPluginsVersion.tab,
                validate: e.hotelPluginsVersion.validate
            };
            t.mod.multiLoad(i, function() {})
        },
        initValidate: function() {
            MOD.formValidator = t("body").regMod("validate", e.hotelPluginsVersion.validate)
        },
        initKeyword: function() {
            function n(e) {
                if (t.isFromSeoPage) {
                    var i = e.attr("data-category");
                    "metroId" == i ? i = "l" : "locationId" == i ? i = "location" : "zoneId" == i && (i = "zone"),
                    t.keywordId = i + e.attr("data").split("|")[2]
                }
            }
            function r(e) {
                window.searchMaiDian.version = 3,
                window.searchMaiDian.destination = window.searchMaiDian.destination || t("#txtCity").value(),
                window.searchMaiDian.keyword = e.autoCorrectValue,
                window.searchMaiDian.keyword_input = e.value,
                window.searchMaiDian.property_kwd = e.property_kwd || "",
                window.searchMaiDian.keyword_type = e.keyword_type,
                window.searchMaiDian.prepageid = t("#page_id").value(),
                window.searchMaiDian.rank_kwd = e.rank_kwd || ""
            }
            function s(e) {
                window.associationMatchMaiDian.keyword = e.keyword,
                window.associationMatchMaiDian.ismatch_dstn = "",
                window.associationMatchMaiDian.target = "keyWord",
                window.__bfi.push(["_tracklog", "hotel_inland_search_ismatch", t.stringifyJSON(window.associationMatchMaiDian)])
            }
            var l = t("#btnSearch")
              , y = this.ops.keyword
              , p = t("#J_keywordFilterNew").html()
              , v = t("#cityId").value()
              , m = (cQuery.config("charset"),
            5);
            if (t(y).bind("input", function() {
                t(this).value().indexOf("?") >= 0 && t(this).value(t(this).value().replace("?", "？"))
            }),
            t.browser.isIPad) {
                var f = parseInt(y.offset().left)
                  , g = parseInt(document.documentElement.clientWidth || document.body.clientWidth);
                f <= g / 2 && (m = {
                    position: 5
                })
            }
            cQuery.keywordFilterHighlights = {},
            cQuery.jsonpPosCallback = function(e) {
                e || (e = {
                    tokens: "",
                    result: ""
                });
                var t = e.result
                  , i = y.value();
                cQuery.keywordFilterHighlights[i] = e.tokens,
                cQuery.jsonpResponse = {
                    key: i,
                    data: "@" + e.result + "@"
                },
                JSONP_POS_RESPONSE = t
            }
            ;
            var w = "/Tool/AjaxKeywordAssociate.aspx?cityid=${cityId}&keyword=${key}&callback=cQuery.jsonpPosCallback";
            t.keywordJsonpFilterTpl = "/Domestic" + w,
            t.keywordJsonpSourceTpl = "/${module}/Tool/AjaxGetHotKeyword.aspx?cityid=${cityId}",
            $newPh(y).splitFactory() && (MOD.n_keyword = y.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "keyword",
                tips: y[0].getAttribute("_cqnotice"),
                selClass: "inputSel"
            })),
            MOD.a_keyword = y.regMod("address", e.hotelPluginsVersion.address, {
                name: "keyword",
                source: "@@",
                isFocusNext: !1,
                isIframe: c,
                delay: 500,
                isFilterSelect: !1,
                isAutoCorrect: !1,
                offset: m,
                template: {
                    filterPageSize: -1,
                    suggestion: t("#J_keywordSuggestion").html(),
                    suggestionIpad: t("#J_keywordSuggestionIPad").html(),
                    suggestionStyle: t("#J_keywordSuggestionStyle").html(),
                    suggestionStyleIpad: t("#J_keywordSuggestionStyleIPad").html(),
                    filter: p,
                    filterStyle: t("#J_keywordFilterStyleNew").html(),
                    filterIpad: p,
                    filterStyleIpad: t("#J_keywordFilterStyleIPadNew").html(),
                    suggestionInit: function(e) {
                        MOD.defaultSuggestionInit(e),
                        c && o(e),
                        e.find(".close").bind("mousedown", function() {
                            y[0].blur()
                        }),
                        e.find('a[data-dopost="T"]').bind("mousedown", function(e) {
                            var t = this;
                            setTimeout(function() {
                                MOD.globalForm.form.txtKeyword && (MOD.globalForm.form.txtKeyword.value = ""),
                                MOD.globalForm.form.k1 && (MOD.globalForm.form.k1.value = ""),
                                MOD.globalForm.form.k2 && (MOD.globalForm.form.k2.value = ""),
                                MOD.globalForm.submit(t.getAttribute("href"), t.getAttribute("target"))
                            }, 0)
                        }).bind("click", function(e) {
                            e.stop()
                        }),
                        window.$isPad && e.find("#pad_mini_keyboard").bind("click", function() {
                            var e = y[0]
                              , t = "readonly" != y[0].getAttribute("readonly");
                            t ? (e.setAttribute("readonly", "readonly"),
                            this.className = "ico_key") : (e.removeAttribute("readonly"),
                            this.className = "ico_unkey"),
                            e.blur(),
                            e.select(),
                            e.focus()
                        })
                    }
                    .bind(this),
                    filterInit: function(e) {
                        !t.browser.isIPad && e.find(".close").bind("mousedown", function(e) {
                            e.stop(),
                            y[0].blur()
                        })
                    }
                }
            }),
            MOD.a_keyword.method("bind", "change", a),
            MOD.a_keyword.method("bind", "userinput", function(e, i) {
                var o = i.autoCorrectValue
                  , a = {
                    searchType: "S",
                    cityId: t("#cityId").value(),
                    keyword: o
                };
                return "suggestionMousedown" === i.eventType ? (n(t(i.target)),
                a.searchType = "S_X",
                window.userBehaviorKeyWordInfo = a,
                i.keyword_type = "directclick",
                i.property_kwd = "default",
                i.value = "",
                r(i),
                void (window.associationMatchMaiDian.keyword = "")) : "filterMousedown" === i.eventType || "keydown" === i.eventType ? (a.searchType = "B+S",
                a.Yindex = i.target && t(i.target).attr("data-yindex"),
                a.inputkeyword = i.value,
                a.fulldata = i.data,
                window.userBehaviorKeyWordInfo = a,
                i.keyword_type = "click",
                i.property_kwd = i.data.split("|")[3],
                i.cityId = i.data.split("|")[4],
                i.rank_kwd = i.target && t(i.target).attr("data-rankindex"),
                window.searchMaiDian.isothercity = "",
                window.searchMaiDian.isothercity = window.cityIdForDstMaiDian - 0 === i.cityId - 0 ? "" : "T",
                void r(i)) : void ("blur" === i.eventType && (i.keyword_type = "input",
                r(i)))
            }),
            v && i(MOD.a_keyword, v),
            y.bind("blur", function() {
                this.value && this.value == h.value() || (h.value(this.value),
                d.value(""),
                u.value(""))
            });
            var _;
            y.bind("keyup", function(e) {
                e = e || window.event;
                var t = this;
                _ = e.timeStamp,
                window.associationMatchMaiDian.ismatch_kyw = "F",
                setTimeout(function() {
                    if (_ - e.timeStamp == 0) {
                        var i = {
                            keyword: t.value
                        };
                        s(i)
                    }
                }, 1e3)
            }),
            MOD.a_keyword.method("bind", "enter", function(e) {
                setTimeout(function() {
                    l[0] && (y.trigger("blur"),
                    l.trigger("click"))
                }, 0)
            })
        },
        initAddress: function() {
            function n(e) {
                var i = e.find(".search_history_box");
                i.bind(u ? "touchend" : "mousedown", function(n) {
                    n.stop();
                    var o = n.target || n.srcElement || n.host;
                    if ("A" === o.tagName) {
                        var a = t.parseJSON(o.getAttribute("data-history"));
                        r.removeClass("inputSel").value(unescape(a.cityname)),
                        t("#cityId").value(a.id),
                        t("#cityPY").value(a.pingying),
                        "false" === a.isoutdate && (s.value(a.checkin),
                        l.value(a.checkout),
                        s[0].style.backgroundImage = "",
                        l[0].style.backgroundImage = ""),
                        MOD.a_city.method("hidden"),
                        e.find("#mini_c_address_close").each(function(e) {
                            e[0].click()
                        }),
                        c && i.html(i.html()),
                        cityChange(void 0, {
                            items: [a.pingying, a.cityname, a.id]
                        })
                    }
                }),
                !u && e.find(".close").bind("mousedown", function(e) {
                    e.stop(),
                    r[0].blur()
                })
            }
            function o(e) {
                function i() {
                    var t = e.offset()
                      , i = a.offset();
                    s + l < i.top + 300 ? o.css({
                        top: "",
                        bottom: t.bottom - i.bottom + "px"
                    }) : o.css({
                        top: i.top - t.top - 1 + "px",
                        bottom: ""
                    }),
                    o.css("display", "block")
                }
                var n, o = e.find(".city_scenic_pic"), a = e.find(".item_list_scenic"), s = document.documentElement.scrollTop || document.body.scrollTop, l = window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight;
                u ? t(e.find(".sug_item")[0]).hasClass("item_list_scenic") ? i() : o.css("display", "none") : (e.find(".close").bind("mousedown", function(e) {
                    e.stop(),
                    r[0].blur()
                }),
                e.find(".item_list_scenic .city_item").bind("mouseenter", function(t) {
                    clearTimeout(n),
                    e.find(".scenic_map_num_hover").removeClass("scenic_map_num_hover");
                    var o = t.target.getAttribute("data");
                    e.find('.city_scenic_pic a[data="' + o + '"] .scenic_map_num').addClass("scenic_map_num_hover"),
                    i()
                }).bind("mouseleave", function() {
                    n = setTimeout(function() {
                        e.find(".scenic_map_num_hover").removeClass("scenic_map_num_hover"),
                        o.css("display", "none")
                    }, 100)
                }),
                e.find(".city_scenic_pic").bind("mouseenter", function() {
                    clearTimeout(n)
                }),
                e.find(".city_scenic_pic a[data]").bind("mouseenter", function(i) {
                    var n = i.target.getAttribute("data");
                    e.find(".scenic_map_num_hover").removeClass("scenic_map_num_hover"),
                    t(i.target).find(".scenic_map_num").addClass("scenic_map_num_hover"),
                    e.find('.item_list_scenic a[data="' + n + '"]').addClass("hover")
                }).bind("mouseleave", function(i) {
                    t(i.target).find(".scenic_map_num").removeClass("scenic_map_num_hover"),
                    e.find(".city_item.hover").removeClass("hover")
                }))
            }
            function a() {
                function i(e, i) {
                    e || (s(i),
                    window.associationMatchMaiDian.destination = ""),
                    $newPh(t("#txtKeyword")).cityChangeFactory();
                    var n = i.items || [];
                    if (n.length >= 9) {
                        CLICK_DATA_TYPE = n[6],
                        CLICK_DATA_VALUE = n[8];
                        var o = n.length >= 15 && n[14] > 1;
                        o && "blur" === e && a(i.items);
                        var r = n[6].toLowerCase();
                        if ("city" !== r && "district" !== r && "flagship" !== r && (d.removeClass("inputSel").value(n[4]),
                        d.attr("isFormCity", "true"),
                        t("#positionArea").value(r),
                        t("#positionId").value(n[8]),
                        t("#hotelAreaName").value(n[4])),
                        "hotel" === r && !o && "blur" !== e) {
                            var l = t("#btnSearch");
                            l[0] && setTimeout(function() {
                                l[0].click()
                            }, 0)
                        }
                        "flagship" === r && addressUrlConfig.hyattUrl && "blur" !== e && setTimeout(function() {
                            window.location.href = addressUrlConfig.hyattUrl
                        }, 0)
                    }
                    if (addressUrlConfig.__AllyesUrl__) {
                        var c = "";
                        try {
                            c = "siteids=" + n[2] + "&"
                        } catch (u) {}
                        cQuery.loader.js(addressUrlConfig.__AllyesUrl__ + c + addressUrlConfig.__AllyesParam__, {
                            type: "text/javascript",
                            async: !0
                        })
                    }
                    cityChangeEvent(n[2], n[0])
                }
                function a(e) {
                    var i = e || []
                      , n = 1
                      , o = null
                      , a = window.location.protocol + "//" + window.location.host + "/international/"
                      , r = 0
                      , s = 0
                      , c = ""
                      , d = t("#txtCheckIn").value()
                      , u = t("#txtCheckOut").value();
                    i.length >= 15 && (n = i[14]),
                    o = i[6],
                    r = i[8],
                    s = i[2],
                    n && 1 != n && (s || r) && ("Markland" == o || "RailwayStation" == o || "IntlPOIAirport" == o ? r && (a = a + "city" + s + "/s" + r) : "Location" == o ? r && (a = a + "city" + s + "/location" + r) : "IntlDistrict" == o ? a = a + "D" + r : "IntlProvince" == o ? a = a + "province" + r : "IntlCity" == o ? a = a + "city" + s : "MetroStation" == o ? r && (a = a + "city" + s + "/m" + r) : "Zone" == o ? r && (a = a + "city" + s + "/zone" + r) : "Hotel" == o ? (c = i[7],
                    c && (a = a + "city" + s + "?wd=" + c)) : (o = "CityHotelBrand") ? a = a + "city" + s + "/h" + r : (o = "CityHotelGroup") && (a = a + "city" + s + "/g" + r),
                    d && l && (a += a.indexOf("?") >= 0 ? "&checkin=" + d + "&checkout=" + u : "?checkin=" + d + "&checkout=" + u),
                    window.location.href = a)
                }
                function s(e) {
                    window.searchMaiDian.version = 3,
                    window.searchMaiDian.destination = e.autoCorrectValue,
                    window.searchMaiDian.destination_input = e.value,
                    window.searchMaiDian.property_dstn = e.property_dstn || "default",
                    window.searchMaiDian.keyword_type = e.keyword_type || "",
                    window.searchMaiDian.prepageid = t("#page_id").value(),
                    window.searchMaiDian.isothercity = "",
                    window.searchMaiDian.rank_dstn = e.rank_dstn || ""
                }
                function c(e) {
                    window.associationMatchMaiDian.destination = e.destination,
                    window.associationMatchMaiDian.keyword = "",
                    window.associationMatchMaiDian.ismatch_kyw = "",
                    window.associationMatchMaiDian.target = "destination",
                    window.__bfi.push(["_tracklog", "hotel_inland_search_ismatch", t.stringifyJSON(window.associationMatchMaiDian)])
                }
                function u(e, t, i) {
                    var n = ""
                      , o = 0;
                    return t ? (o = 1,
                    n = t) : (o = 0,
                    n = e),
                    "key=" + n + "&isMatch=" + o
                }
                MOD.a_city = r.regMod("address", e.hotelPluginsVersion.address, {
                    name: "cityname",
                    jsonpSource: function() {
                        if (window.IS_FROM && "inn" === window.IS_FROM) {
                            var e = window.document.domain;
                            return e = e.replace("hotels", "inn"),
                            "http://" + e + "/inn/Tool/AjaxGetCitySuggestion.aspx"
                        }
                        return "/Domestic/Tool/AjaxGetCitySuggestion.aspx"
                    }(),
                    jsonpFilter: "/Domestic/Tool/AjaxDestination.aspx?keyword=${key}&from=domestic",
                    isFocusNext: !1,
                    isAutoCorrect: !1,
                    isIframe: !1,
                    delay: 200,
                    relate: {
                        2: t("#cityId"),
                        0: t("#cityPY")
                    },
                    keyboard: {
                        left: !1,
                        right: !1
                    },
                    offset: 5,
                    template: {
                        suggestion: h,
                        suggestionIpad: y,
                        suggestionStyle: p,
                        suggestionStyleIpad: m,
                        filter: f,
                        filterIpad: f,
                        filterStyle: g,
                        filterStyleIpad: g,
                        filterPageSize: 12,
                        suggestionInit: function(e) {
                            MOD.defaultSuggestionInit(e),
                            n(e)
                        },
                        suggestionInitIpad: function(e) {
                            MOD.a_city.get("defaultSuggestionInitIpad")(e),
                            n(e)
                        },
                        filterInit: o,
                        filterInitIpad: o
                    },
                    _filterMousedown: function(e) {
                        console.log(e.target)
                    }
                }),
                e.cityChange = i,
                MOD.a_city.method("bind", "change", i);
                var w = !0;
                MOD.a_city.method("bind", "userinput", function(e, n) {
                    function o(e) {
                        validateMessageConfig.hotel.noExistCity && MOD.formValidator.method("show", {
                            $obj: r,
                            data: validateMessageConfig.hotel.noExistCity.replace("{city}", e),
                            removeErrorClass: !0,
                            hideEvent: "blur",
                            isScroll: !1
                        })
                    }
                    var l = t("#cityId")
                      , c = t("#cityPY")
                      , d = n.autoCorrectValue
                      , h = {
                        searchType: null,
                        cityId: l.value(),
                        keyword: d
                    };
                    if ("suggestionMousedown" === n.eventType && (h.searchType = "CTY_X",
                    window.__bfi.push(["_tracklog", "SEARCH_AUTOCOMPLET_US", t.stringifyJSON(h)]),
                    n.value = "",
                    window.cityIdForDstMaiDian = n.data.split("|")[2],
                    s(n),
                    window.associationMatchMaiDian.destination = ""),
                    "filterMousedown" !== n.eventType && "keydown" !== n.eventType || (h.searchType = "CTY_BS",
                    h.Yindex = n.target && t(n.target).attr("data-yindex"),
                    h.inputkeyword = n.value,
                    h.fulldata = n.data,
                    window.__bfi.push(["_tracklog", "SEARCH_AUTOCOMPLET_US", t.stringifyJSON(h)]),
                    n.property_dstn = n.data.split("|")[6],
                    "District" !== n.property_dstn && "City" !== n.property_dstn || (window.cityIdForDstMaiDian = n.data.split("|")[8]),
                    t("#txtKeyword").value() && (n.keyword_type = "click",
                    window.searchMaiDian.keyword = t("#txtKeyword").value()),
                    n.rank_dstn = n.data.split("|")[9],
                    s(n)),
                    n && n.data) {
                        var y = n.data.split("|");
                        y && "flagship" == y[6] || a(y)
                    }
                    if (this.value != l.attr("_lastvalue")) {
                        if ("suggestionMousedown" === n.eventType || "filterMousedown" === n.eventType || "keydown" === n.eventType && (w || n.data))
                            return w = !0,
                            void window.__bfi.push(["_tracklog", "nhtlcity", u(d, d, null)]);
                        if ("blur" === n.eventType && w)
                            return void window.__bfi.push(["_tracklog", "nhtlcity", u(d, d, null)]);
                        var p = t("#txtCity")
                          , m = l.value() || ""
                          , f = "";
                        m.replace(/D(\d+)_(\d+)/, function(e, t, i) {
                            m = i,
                            f = "&itemId=" + t
                        });
                        var g = p.value()
                          , _ = "/Domestic/Tool/AjaxDestination.aspx?keyword=" + encodeURIComponent(escape(g)) + "&from=domestic";
                        searchOptions.isHot ? _ = addressUrlConfig.hotHotelUrl + "/Tool/AjaxIndexCityNew.aspx?keyword=" + encodeURIComponent(escape(g)) + "&from=domestic" : searchOptions.isInn && (_ = v + "/Inn/Tool/AjaxIndexCityNew.aspx?keyword=" + encodeURIComponent(escape(g)) + "&from=domestic"),
                        t.jsonp(_, {
                            async: !1,
                            onload: function(e) {
                                var t = e.data
                                  , a = t.match(/[^@]+\|[^@]+/g)
                                  , r = "";
                                if (a && a.length > 0) {
                                    var s = a[0].split("|");
                                    s.length > 1 && (w = !0,
                                    r = s[1] ? s[1] : "",
                                    p.value(r),
                                    p.attr("_lastvalue", r),
                                    l.value(s[2] ? s[2] : ""),
                                    l.attr("_lastvalue", l.value()),
                                    c.value(s[0] ? s[0] : ""),
                                    i(n.eventType, {
                                        items: s
                                    }),
                                    p.value() || o(g))
                                } else
                                    o(g),
                                    l.value(""),
                                    r = "",
                                    l.attr("_lastvalue", "");
                                window.__bfi.push(["_tracklog", "nhtlcity", u(e.key, r, null)])
                            },
                            onerror: function(e) {
                                o(g),
                                p.value(""),
                                p.attr("_lastvalue", ""),
                                l.value(""),
                                l.attr("_lastvalue", "")
                            }
                        })
                    }
                }),
                r.bind("focus", function() {
                    CITYENTER = !0
                }).bind("keyup", function(e) {
                    e = e || window.event;
                    var t = this;
                    last = e.timeStamp;
                    var i = e.keyCode;
                    if (13 == i) {
                        if (w = !0,
                        CITYENTER) {
                            MOD.a_city.method("validate");
                            var n = document.forms[0];
                            HotelSearch.submit() && n.submit()
                        } else
                            CITYENTER = !0;
                        e.preventDefault ? e.stopPropagation() : e.cancelBubble = !0,
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1
                    } else
                        [37, 38, 39, 40].indexOf(i) === -1 && (w = !1);
                    window.associationMatchMaiDian.ismatch_dstn = "F",
                    setTimeout(function() {
                        if (last - e.timeStamp == 0) {
                            var i = {
                                destination: t.value
                            };
                            c(i)
                        }
                    }, 1e3)
                })
            }
            if (window.cityIdForDstMaiDian = t("#cityId").value(),
            this.ops.city.length) {
                var r = this.ops.city
                  , s = this.ops.startDate
                  , l = this.ops.endDate
                  , d = this.ops.keyword
                  , u = t.browser.isIPad
                  , h = t("#J_citySuggestion").html()
                  , y = t("#J_citySuggestionIPad").html()
                  , p = t("#J_citySuggestionStyle").html()
                  , m = t("#J_citySuggestionStyleIPad").html()
                  , f = t("#J_cityFilter").html()
                  , g = t("#J_cityFilterStyle").html();
                g += "\n.c_page_mini a.address_current { color: #000; text-decoration: none; }",
                e.searchHistoryList = "",
                window.isShowSearchHistory ? t.getJsonp("/Domestic/Tool/AjaxGetUserSearchBehavior.aspx", function(e) {
                    if (e) {
                        for (var i = Math.min(6, e.length), n = [], o = 0; o < i; o++) {
                            var r = unescape(e[o].cityname).replace(/\(.*\)/, "");
                            r = r.length > 4 ? r.substr(0, 4) : r,
                            n.push('<a href="javascript:;" title="' + unescape(e[o].cityname) + "\" data-history='" + t.stringifyJSON(e[o]).replace(/'/g, "") + "'>" + r + "</a>")
                        }
                        searchHistoryList = '<p class="sarch_history_title">' + addressMessageConfig.searchHistory + '</p><div class="search_history_box">' + n.join("") + "</div>",
                        window.showSearchHistory && window.showSearchHistory(e)
                    }
                    a()
                }) : a()
            }
            window.cityChangeEvent = function(e, n) {
                var o = MOD.a_keyword
                  , a = t("#cityId").value();
                o && e && i(o, e, searchOptions.isHot ? "hotSale" : searchOptions.isInn ? "Inn" : "Domestic"),
                CITYENTER = !1;
                var s = r[0];
                s.setAttribute("_lastValue", s.value),
                MOD.n_keyword && (d.attr("isFormCity") ? d.attr("isFormCity", "") : (MOD.n_keyword.method("resetValue"),
                t("#positionArea, #positionId, #hotelAreaName").value("")),
                a || o.set("source", {
                    suggestion: null,
                    data: "@@"
                }))
            }
            ,
            this.ops.keyword.length && this.initKeyword()
        },
        initNotice: function() {
            this.ops.city.length && (MOD.n_city = this.ops.city.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "city",
                tips: noticeMessageConfig[0],
                selClass: "inputSel"
            })),
            this.ops.startDate.length && (MOD.n_startDate = this.ops.startDate.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "startDate",
                tips: "yyyy-mm-dd",
                selClass: "inputSel"
            })),
            this.ops.endDate.length && (MOD.n_endDate = this.ops.endDate.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "endDate",
                tips: "yyyy-mm-dd",
                selClass: "inputSel"
            })),
            this.ops.checkInDate.length && (MOD.n_checkInDate = this.ops.checkInDate.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "checkInDate",
                tips: "yyyy-mm-dd",
                selClass: "inputSel"
            })),
            this.ops.checkOutDate.length && (MOD.n_checkOutDate = this.ops.checkOutDate.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "checkOutDate",
                tips: "yyyy-mm-dd",
                selClass: "inputSel"
            })),
            this.ops.meetingCheckIn.length && (MOD.n_meetingCheckIn = this.ops.meetingCheckIn.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "meetingCheckIn",
                tips: "yyyy-mm-dd",
                selClass: "inputSel"
            })),
            this.ops.meetingCheckOut.length && (MOD.n_meetingCheckOut = this.ops.meetingCheckOut.regMod("notice", e.hotelPluginsVersion.notice, {
                name: "meetingCheckOut",
                tips: "yyyy-mm-dd",
                selClass: "inputSel"
            }))
        },
        initCalendar: function(i, n, o, a) {
            var r = null;
            if (t.browser.isIPad) {
                var s = parseInt(n.offset().left)
                  , l = parseInt(document.documentElement.clientWidth || document.body.clientWidth);
                l - s < 690 && (r = {
                    position: 6,
                    left: -100
                })
            }
            var c = {
                startDate: null,
                endDate: null
            };
            if (getCookie("DomesticHotelCityID", c),
            c.startDate && c.endDate) {
                var d = (new Date).toFormatString("yyyy-MM-dd")
                  , u = (new Date).addDays(1).toFormatString("yyyy-MM-dd")
                  , h = c.startDate.toDate().toFormatString("yyyy-MM-dd") || d
                  , y = c.endDate.toDate().toFormatString("yyyy-MM-dd") || u;
                h < d && (h = d),
                y <= d && (y = u)
            }
            var p = t("#J_ServerDate").attr("value").toDate() || new Date;
            a && (p = (new Date).getHours() >= 18 ? (new Date).addDays(2) : (new Date).addDays(1));
            var v = function() {
                var e, t = i.value().toDate();
                return t && t >= p || (t = p),
                e = a ? t : t.addDays(1)
            };
            i.regMod("calendar", e.hotelPluginsVersion.calendar, {
                options: {
                    showWeek: !o,
                    container: cQuery.container,
                    minDate: p.toStdDateString()
                }
            }),
            n.regMod("calendar", e.hotelPluginsVersion.calendar, {
                options: {
                    showWeek: !o,
                    reference: "#" + i[0].id,
                    minDate: v().toStdDateString(),
                    offset: r
                }
            });
            i.bind("change", function(t) {
                t = t || window.event;
                var a = (t.target || t.srcElement || t.host,
                i.value());
                if (a && a.isDate()) {
                    var r = a.toDate()
                      , s = v();
                    n.data("minDate", s.toStdDateString());
                    var l = n.value().toDate();
                    (!l || l <= r) && (n.value(s.toFormatString("yyyy-MM-dd")),
                    n.getMod("notice", e.hotelPluginsVersion.notice).method("checkValue"),
                    o || n.getMod("calendar", e.hotelPluginsVersion.calendar).method("setWeek", "#" + n[0].id)),
                    l && l - r > MAX_STAY && setTimeout(function() {
                        MOD.formValidator.method("show", {
                            $obj: n,
                            hideEvent: "blur",
                            data: validateMessageConfig.hotel.too_long,
                            removeErrorClass: !0,
                            isScroll: !1
                        })
                    }
                    .bind(this), 0),
                    n[0].focus()
                } else
                    n.data("minDate", v().toStdDateString())
            }
            .bind(this)).bind("focus", function() {
                this.timer && clearTimeout(this.timer)
            }
            .bind(this)),
            n.bind("focus", function(e) {
                e = e || window.event;
                var t = (e.target || e.srcElement || e.host,
                i.value().toDate())
                  , o = n.value().toDate();
                t && o && o - t > MAX_STAY && setTimeout(function() {
                    MOD.formValidator.method("show", {
                        $obj: n,
                        data: validateMessageConfig.hotel.too_long,
                        removeErrorClass: !0,
                        isScroll: !1
                    })
                }
                .bind(this), 0)
            }
            .bind(this)).bind("blur", function() {
                this.timer = setTimeout(function() {
                    var e = i.value().toDate()
                      , t = n.value().toDate();
                    e && t && t > e && t - e > MAX_STAY && MOD.formValidator.method("show", {
                        $obj: n,
                        hideEvent: "blur",
                        data: validateMessageConfig.hotel.too_long,
                        removeErrorClass: !0,
                        isScroll: !1
                    })
                }
                .bind(this), 100)
            }
            .bind(this))
        }
    }),
    e.RegMod = p
}(window, cQuery),
$.extend(cQuery, {
    replace: function(e, t) {
        return e.replace(/\$\{([\w\.?]+)\}/g, function(e, i) {
            var n = i.split(".")
              , o = n.length
              , a = n[0];
            if (o > 1) {
                for (var r = t, s = 0; s < o; s++) {
                    if (!(a in r))
                        return e;
                    r = r[a],
                    a = n[s + 1]
                }
                return r
            }
            return a in t ? t[a] : e
        })
    },
    format: function(e) {
        var t = arguments
          , i = t.length;
        return i > 1 ? e.replace(/\$(\d)/g, function(e, i) {
            return void 0 == t[i] ? "" : t[i]
        }) : e
    },
    create: function(e, t) {
        var i = document.createElement(e);
        for (var n in t)
            t.hasOwnProperty(n) && ("cssText" == n ? i.style[n] = t[n] : i[n] = t[n]);
        return i
    }
});
var MadCat = function(e, t) {
    this.events = {},
    e && e.call(this, t)
};
$.extend(MadCat.prototype, {
    set: function() {},
    get: function() {
        return null
    },
    evt: function(e, t) {
        this.events[e] = t
    },
    init: function() {}
});
var HotelSearch = new MadCat(function() {
    function e(e, t) {
        return e.focus(),
        setTimeout(function() {
            MOD.formValidator.method("show", {
                $obj: $(e),
                data: validateMessageConfig.hotel[t],
                removeErrorClass: !0,
                hideEvent: "blur",
                isScroll: !1
            })
        }, 50),
        !1
    }
    var t, i, n, o, a, r, s, l = {
        isAuto: !1,
        isMap: !1
    };
    this.init = function() {
        t = document.getElementById("txtCheckIn"),
        i = document.getElementById("txtCheckOut"),
        o = document.getElementById("txtKeyword"),
        n = document.getElementById("txtCity"),
        a = document.getElementById("cityId"),
        r = document.getElementById("cityPY"),
        s = document.forms[0];
        var e = $("#searchForm");
        e.bind("keydown", function(e) {
            if (e = e || window.event,
            13 == e.keyCode) {
                var t = document.forms[0];
                HotelSearch.submit() && t.submit()
            }
        })
    }
    ,
    this.set = function() {}
    ,
    this.checkDate = function(t, i) {
        i = i ? i.toDate() : (new Date).toStdDateString().toDate();
        var n = t[0]
          , o = t[1]
          , a = n.value.toDate() || 0
          , r = o.value.toDate() || 0;
        return $(n).value() ? a ? a < i ? e(n, "too_early_in") : $(o).value() ? r ? a >= r ? e(o, "too_early_out") : r - a > MAX_STAY ? e(o, "too_long") : 1 : e(o, "dateErr") : e(o, "checkOut") : e(n, "dateErr") : e(n, "checkIn")
    }
    ,
    this.checkDateByAuto = function(e, t) {
        t = t ? t.toDate() : (new Date).toStdDateString().toDate();
        var i = e[0]
          , n = e[1]
          , o = i.value.toDate() || 0
          , a = n.value.toDate() || 0;
        return $(i).value() && o ? o < t ? 0 : $(n).value() && a ? o >= a ? 0 : a - o > MAX_STAY ? 0 : 1 : 0 : 0
    }
    ,
    this.setSubmit = function(e, t) {
        l.isAuto = !!e,
        l.isMap = !!t
    }
    ,
    this.submit = function(c, d, u, h) {
        if (c = c || l.isAuto,
        d = d || l.isMap,
        !$(a).value()) {
            if (!c)
                return e(n, "city");
            var y = {
                cityId: "",
                cityName: "",
                cityPY: ""
            };
            getCookie(location.host.match(/big5\./) ? "BHotelCityID" : "HotelCityID", y),
            y.cityId && y.cityName && y.cityPY ? (n.value = y.cityName,
            a.value = y.cityId,
            r.value = y.cityPY) : (n.value = addressMessageConfig.defaultValue[0],
            a.value = addressMessageConfig.defaultValue[1],
            r.value = addressMessageConfig.defaultValue[2])
        }
        if (c)
            this.checkDateByAuto([t, i]) || (t.value = t.defaultValue,
            i.value = i.defaultValue);
        else if (!this.checkDate([t, i]))
            return !1;
        var p, v, m = [], f = "", g = $("#positionArea")[0], w = $("#positionId")[0], _ = $("#hotelAreaName")[0], D = $(o).value().replace(/\+/g, "＋").replace(/\</g, "＜").replace(/\>/g, "＞");
        $(o).value(D),
        function() {
            if (D) {
                var e = w.value
                  , t = g.value;
                v = "hotel" === t.toLowerCase(),
                p = markerTypeMap[t.toLowerCase()],
                p = p && p.search,
                p ? "district" !== p && ("s" === p && (e = e.replace(/^[SL]/, "")),
                f += p + e) : _.value = D
            } else
                g.value = "",
                w.value = "",
                _.value = ""
        }();
        var I = document.getElementById("searchHotelLevelSelect")
          , k = I && parseInt(I.value) || 0;
        k && !u && (f += "star" + k),
        f && m.push(f),
        $(o).value() && !p && m.push((v ? "k2" : "k1") + encodeURIComponent(_.value));
        var C = "";
        h ? C = addressUrlConfig.hotHotelUrl + "/${city}${map}${other}" : (C = (u ? $("#innSite").value() + "/inn" : "/hotel") + "/${city}${map}${other}",
        !u && g.value && "hotel" === g.value.toLowerCase() && w.value && (C = "/hotel/" + w.value + ".html"));
        var b = $.replace(C, {
            city: r.value.toLowerCase() + "" + a.value,
            map: d ? "/map" : "",
            other: m.length ? "/" + m.join("/") : ""
        });
        return $("#startdate").value(t.value),
        $("#depdate").value(i.value),
        s.action = b,
        h || (s.action += "#ctm_ref=hod_hp_sb_lst"),
        s.__VIEWSTATE && (s.__VIEWSTATE.name = "NOVIEWSTATE"),
        s.target = "_self",
        $("#btnSearch").value("搜索中..."),
        window.doFormSubmit && window.doFormSubmit(s),
        !0
    }
    ,
    this.setCity = function(e, t, i, n) {
        if (e && t && i) {
            var o = t
              , a = ""
              , r = n.startDate || ""
              , s = n.endDate || ""
              , l = n.hotelLevel || 0
              , c = function(e) {
                return new Date(e.replace(/\-/g, "/")).getTime()
            };
            if (o) {
                var d = o.match(/\S+$/);
                d && (a = d[0])
            }
            if (a) {
                $("#txtCity").value(a),
                $("#cityId").value(e),
                $("#cityPY").value(i);
                var u = $("#txtCheckIn")
                  , h = $("#txtCheckOut");
                u.length && r && c(r) > c(u.value()) && (u.value(r),
                u.getMod("calendar", window.hotelPluginsVersion.calendar).method("setWeek", u)),
                h.length && s && c(s) > c(h.value()) && (h.value(s),
                h.getMod("calendar", window.hotelPluginsVersion.calendar).method("setWeek", h)),
                $("#searchHotelLevelSelect") && $("#searchHotelLevelSelect").value(l)
            } else
                $("#txtCity").value(""),
                $("#cityId").value(""),
                $("#cityPY").value("");
            MOD.n_city.method("checkValue")
        }
    }
}
);
cQuery.BizMod = cQuery.BizMod || {},
function(e, t) {
    var i, n = function() {}, o = (/big5\./.test(location.host),
    $.extend), a = {
        geolocationError: n,
        geolocationConfig: {
            enableHighAccuracy: !0,
            timeout: 5e3,
            maximumAge: 864e5
        },
        keywordInput: $("#txtKeyword"),
        keywordType: $("#positionArea"),
        keywordID: $("#positionId"),
        cityId: $("#cityId"),
        cityName: $("#txtCity"),
        cityPY: $("#cityPY")
    };
    i = {
        setKeyword: function(e, t, i) {
            var n = a;
            n.keywordInput.value(e),
            n.keywordType.value(i),
            n.keywordID.value(t)
        },
        getGeolocation: function(e, t, i) {
            return navigator.geolocation ? navigator.geolocation.getCurrentPosition(e, t || a.geolocationError, i || a.geolocationConfig) : e(null),
            this
        },
        setCity: function(e, t, i) {
            var n;
            t || (n = e.split("|"),
            e = n[2],
            i = n[0],
            t = n[1]),
            HotelSearch.setCity(e, t, i, {})
        },
        init: function(e) {
            o(a, e),
            $("#J_roomCount").bind("focus", function() {
                $("#J_roomCountDiv").addClass("n_gst_active")
            }),
            $("#J_roomCount").bind("blur", function() {
                $("#J_roomCountDiv").removeClass("n_gst_active")
            }),
            $("#J_roomCount_i").bind("click", function() {
                $("#J_roomCount")[0].focus()
            });
            for (var t = 1; t <= 10; t++) {
                var i = document.createElement("li");
                i.innerHTML = t + "间",
                $("#J_roomCountList").append(i)
            }
            $("#J_roomCountList").bind("mousedown", function(e) {
                $("#J_roomCount").value($(e.target).html()),
                n()
            });
            var n = function() {
                try {
                    var e = $("#J_roomCount").value()
                      , t = parseInt(e.substring(0, e.length - 1), 10);
                    t >= 1 && t <= 10 || (t = 1),
                    $("#J_roomCount").value(t + "间");
                    for (var i = t + "," + s.val + "," + l.val, n = 0; n < l.val; n++)
                        i += "," + $("#J_childageVal" + n).value();
                    $("#J_RoomGuestCount").value(i),
                    $("#J_RoomGuestInfoTxt").value(s.val + "成人 " + (l.val > 0 ? l.val + "儿童" : ""))
                } catch (o) {}
            };
            $("#J_RoomGuestInfoTxt,#J_RoomGuestInfoTxt_i").bind("click", function() {
                var e = new Date($("#txtCheckIn").value())
                  , t = e.getFullYear()
                  , i = e.getMonth() + 1
                  , n = e.getDate();
                $(".J_today").html(t + "年" + i + "月" + n + "日"),
                $("#J_RoomGuestInfoDiv").addClass("n_gst_active")
            }),
            $(".J_childageVal").each(function(e) {
                if (0 == e.childNodes().length) {
                    elem = document.createElement("option"),
                    elem.value = "0",
                    elem.text = "<1岁",
                    e.append(elem);
                    for (var t = 1; t < 18; t++)
                        elem = document.createElement("option"),
                        elem.value = t,
                        elem.text = t + "岁",
                        12 == t && (elem.selected = !0),
                        e.append(elem)
                }
            }),
            $("#J_RoomGuestInfoBtnOK").bind("click", function() {
                if (l.val > 0)
                    for (var e = 0; e < l.val; e++)
                        if ("" == $("#J_childageVal" + e).value())
                            return void $("#J_RoomGuestInfoDiv").find(".n_gst_childs_tips").show();
                $("#J_RoomGuestInfoDiv").find(".n_gst_childs_tips").hide(),
                n(),
                $("#J_RoomGuestInfoDiv").removeClass("n_gst_active")
            }),
            $("#J_RoomGuestInfoBtnCancel").bind("click", function() {
                $("#J_RoomGuestInfoDiv").removeClass("n_gst_active")
            });
            var s = r($("#J_AdultCount"), function() {});
            s.min = 1,
            s.max = 36,
            s.init(1);
            var l = r($("#J_ChildCount"), function() {
                0 == l.val ? $("#J_childageValDiv").hide() : $("#J_childageValDiv").show();
                for (var e = 0; e < 9; e++)
                    e < l.val ? $("#J_childageVal" + e).show() : $("#J_childageVal" + e).hide()
            });
            l.min = 0,
            l.max = 9,
            l.init(0);
            try {
                var c = $("#J_RoomGuestCount").value();
                c = c.split(","),
                $("#J_roomCount").value(parseInt(c[0]) + "间"),
                s.setValue(parseInt(c[1])),
                l.setValue(parseInt(c[2]));
                for (var t = 0; t < l.val; t++)
                    $("#J_childageVal" + t).value(parseInt(c[3 + t]));
                n()
            } catch (d) {}
            return this
        },
        initAdditionalInfo: function() {
            var e, t = $.browser.isIPad;
            return e = {
                init: function(e) {
                    return this.options = e,
                    this
                },
                getList: function() {
                    var e = this;
                    $.ajax(this.options.getListUrl, {
                        onsuccess: function(t) {
                            if (t && t.responseText) {
                                var i = $.parseJSON(t.responseText);
                                i && (e.options.oncomplete && e.options.oncomplete(i),
                                e.wrap = $("#visitedHistory"),
                                e.bindEvents())
                            }
                            window.scanedHotelList = $("#visitedIdList").html()
                        }
                    })
                },
                bindEvents: function() {
                    this.bindRemoveActionEvents()
                },
                bindRemoveActionEvents: function() {
                    var e = this
                      , i = e.options;
                    e.wrap.bind(t ? "touchend" : "click", function(t) {
                        var n = $(t.target);
                        n.hasClass(i.deleteBtnCls) && (t.stop(),
                        i.hasLogin ? e.removeUbt(n) : e.remove(n))
                    })
                },
                remove: function(e) {
                    var t = this.options;
                    $.ajax(t.removeUrl + "?hotel=" + e.attr("data-id"), {
                        cache: !1,
                        onsuccess: function(i, n) {
                            "success" == n.toLowerCase() && t.onRemove(e)
                        }
                    })
                },
                removeUbt: function(e) {
                    window.__bfi.push(["_tracklog", "hotel.deletevisitedproduct", "UID=${duid}&page_id=${page_id}&PID=" + e.attr("data-id")]),
                    this.options.onRemove(e)
                }
            }
        }
    };
    var r = function(e, t) {
        var i = {
            val: 0,
            max: 0,
            min: 0,
            item: e,
            setValue: function(e) {
                e <= this.max && e >= this.min ? this.val = e : e > this.max ? this.val = this.max : this.val = this.min,
                this.item.find(".number_input").value(this.val),
                n(),
                t(e)
            },
            init: function(e) {
                this.setValue(e),
                t(e)
            }
        }
          , n = function() {
            i.val > i.min && i.item.find(".number_reduce").removeClass("number_disable"),
            i.val < i.max && i.item.find(".number_plus").removeClass("number_disable"),
            i.val <= i.min && i.item.find(".number_reduce").addClass("number_disable"),
            i.val >= i.max && i.item.find(".number_plus").addClass("number_disable")
        };
        return e.find(".number_input").bind("blur", function() {
            i.setValue(parseIntNull(i.item.find(".number_input").value())),
            t(i.val)
        }),
        e.find(".number_reduce").bind("click", function() {
            i.val > i.min && (i.val--,
            i.item.find(".number_input").value(i.val),
            t(i.val)),
            n()
        }),
        e.find(".number_plus").bind("click", function() {
            i.val < i.max && (i.val++,
            i.item.find(".number_input").value(i.val),
            t(i.val)),
            n()
        }),
        n(),
        i
    };
    i.init(),
    e.SearchPanel = i
}(cQuery.BizMod, window);
!function(t, e, n) {
    function i(t, e, i, o) {
        if (!e || !t)
            return t;
        var s, r, a = 0;
        if (i = i || i === n,
        o && (r = o.length))
            for (; a < r; a++)
                s = o[a],
                !(s in e) || !i && s in t || (t[s] = e[s]);
        else
            for (s in e)
                !i && s in t || (t[s] = e[s]);
        return t
    }
    function o(t, e) {
        var n = e ? e.document.createElement("div") : document.createElement("div")
          , i = document.createDocumentFragment();
        n.innerHTML = t;
        var o = n.children;
        if (o.length > 1) {
            for (; o.length > 0; )
                i.appendChild(o[0]);
            return i
        }
        return o[0]
    }
    var s = t.BizMod || {}
      , r = {};
    s.Util = r = {
        mix: i,
        htmlToDom: o
    },
    ["Function", "String", "Object", "Array", "Number"].each(function(t) {
        r["is" + t] = function(e) {
            return $.type(e) === t.toLowerCase()
        }
    }),
    i(r, {
        makeArray: function(e) {
            if (t.browser.isIE) {
                for (var n, i = 0, o = []; n = e[i]; )
                    o[i++] = n;
                return o
            }
            return Array.prototype.slice.call(e)
        }
    }),
    function(t, e, n) {
        var o = null
          , r = ""
          , a = function(t) {
            var e = this
              , n = {
                eventType: "click",
                status: 0,
                btn: o,
                btnActiveCls: r
            };
            e.options = t = i(n, t),
            e.__status = t.status,
            e.initialize(t)
        };
        return a.prototype = {
            constructor: a,
            initialize: function(t) {
                var e = this;
                t.btn.bind(t.eventType, function(t) {
                    e._changeView()
                })
            },
            __status: 0,
            _changeView: function(t) {
                var e = this
                  , n = e.options
                  , i = n.btnActiveCls;
                t = t || e.__status,
                i && n.btn[t ? "addClass" : "removeClass"](i),
                e.__status = e.__status ? 0 : 1,
                n.onChange && n.onChange.call(e, n.btn, e.__status)
            }
        },
        s.Toggle = a
    }(t, e),
    function(t, e, n) {
        function o(t) {
            var e = this
              , n = null
              , o = {
                pageSize: 10,
                source: n,
                ftl: '<a href="javascript:void(0);">${page}</a>',
                wrap: n,
                activeClass: "c_page_mini_current",
                onNav: function() {}
            };
            e.options = t = i(o, t),
            e.wrap = t.wrap
        }
        return o.prototype = {
            _cut: function(t, e) {
                this.currentPage = 0,
                this.totalPage = Math.ceil(t.length / e)
            },
            id: "pagination",
            _renderUI: function() {
                for (var t, e = this.options, n = this.totalPage + 1, i = ""; --n; )
                    i = $.tmpl.render(e.ftl, {
                        page: n
                    }) + i;
                !e.leftBtn && (e.leftBtn = $.tmpl.render(e.ftl, {
                    page: "<-"
                })),
                !e.rightBtn && (e.rightBtn = $.tmpl.render(e.ftl, {
                    page: "->"
                })),
                this.wrap.html(e.leftBtn + i + e.rightBtn),
                t = r.makeArray(this.wrap[0].children),
                this.leftBtn = t[0],
                this.rightBtn = t[t.length - 1],
                this.btns = t.slice(1, -1),
                this._btnTag = this.btns[0].tagName.toLowerCase()
            },
            initialize: function(t) {
                var e = this;
                e.source = t.source,
                e.paging(e.source || e.options.source),
                e._bindEvent(),
                e.navPage(0)
            },
            _bindEvent: function() {
                var t = this;
                t.wrap.bind("click", function(e) {
                    var n, i = e.target;
                    t._btnTag == i.tagName.toLowerCase() && (n = t.btns.indexOf(e.target),
                    n !== -1 ? t.navPage(n) : i === t.leftBtn ? t.backward() : i === t.rightBtn && t.forward())
                })
            },
            paging: function(e) {
                e && e.length || t.error("no source to paging");
                var n = this
                  , i = n.options;
                return n.source = e,
                n._cut(e, i.pageSize),
                n._renderUI(),
                n
            },
            forward: function() {
                this.navPage(this.currentPage + 1)
            },
            backward: function() {
                this.navPage(this.currentPage - 1)
            },
            navPage: function(e) {
                var n, i = this, o = i.btns, s = i.options, r = s.activeClass, a = s.pageSize;
                return i.lastPage = i.currentPage,
                n = o[i.lastPage],
                n && t(n).removeClass(r),
                e < 0 && (e = 0),
                e >= i.totalPage && (e = i.totalPage - 1),
                s.onNav.call(i, i.source.slice(a * e, a * (e + 1)), o[e]),
                t(o[e]).addClass(r),
                i.currentPage = e,
                i
            }
        },
        s.Pagination = o
    }(t, e),
    function(t, e, n) {
        function o(t, e) {
            if (!e.contains(t))
                return null;
            for (t = t[0],
            e = e[0]; t.parentNode !== e; )
                t = t.parentNode;
            return t
        }
        function a(e, n, s) {
            t.isCDom(e) || t.error("no suggest input!");
            var r, a = this, l = {
                rootTag: "ul",
                delay: 300,
                filter: function() {
                    return !0
                },
                enableFilter: !1,
                onChange: function(t) {},
                activeClass: "",
                enableEmpty: !0
            };
            t.isPlainObject(n) && (s = n,
            n = c),
            a.options = s = i(l, s),
            a.selectedIndex = -1,
            a.input = e,
            a.wrap = n,
            a._root = a._createRoot(),
            n ? a._root.removeClass(u) : a.wrap = a._root,
            a._render = s.render,
            a._plugins = {},
            a.source = s.source,
            a.initialize(),
            s.enableEmpty && (a.__cache[""] = s.source),
            a.input.bind("keydown", function(t) {
                a.visible && (a._isCommand(t.keyCode) ? a._command(t) : (clearTimeout(r),
                r = setTimeout(function() {
                    a._input()
                }, s.delay)))
            }),
            a._root.bind("click", function(e) {
                var n = o(t(e.target), a._root)
                  , i = n ? a.__domList.indexOf(n) : -1;
                i > -1 && a.select(i, n)
            }),
            a.input.bind("focus", function(t) {
                a.show()
            })
        }
        var c = null
          , l = {
            DOWN: 40,
            UP: 38,
            LEFT: 37,
            RIGHT: 39,
            ENTER: 13
        }
          , u = "hidden"
          , d = e.document
          , f = t(d.body);
        return a.prototype = {
            constructor: a,
            initialize: function() {
                var t = this;
                t.__cache = {},
                t.selectIndex = -1,
                t.value = c,
                t.visible = !1
            },
            _position: function(t, e) {
                var n = t.offset();
                !e && (e = {}),
                this.wrap.css({
                    position: "absolute",
                    zIndex: 999,
                    top: n.top + (e.top || 0) + "px",
                    left: n.left + (e.left || 0) + "px"
                })
            },
            plugin: function(t) {
                return this._plugins[t.id] = t,
                t.initialize({
                    source: this.source
                }),
                this
            },
            _createRoot: function(e) {
                var n, i = this, o = i.options, s = o.rootClass, r = i.wrap;
                return (n = o.root) ? n : (n = d.createElement(e || o.rootTag),
                s && (n.className = s),
                n = t(n),
                n.addClass(u),
                (r ? r : f).append(n),
                n)
            },
            _isCommand: function(t) {
                return [l.LEFT, l.RIGHT, l.UP, l.DOWN, l.ENTER].indexOf(t) != -1
            },
            _preSelect: function(e) {
                var n = this
                  , i = n.__domList
                  , o = n.options.activeClass
                  , s = i[e];
                s && (t(i[n._preSelectedIndex]).removeClass(o),
                t(s).addClass(o),
                n._preSelectedIndex = e)
            },
            select: function(t, e) {
                var n = this
                  , i = n.options.onSelection;
                e = e || n.__domList[t],
                n.selectedIndex = t,
                i && i.call(n, e, n.__dataList[t]),
                n.close()
            },
            _filter: function(t) {
                var e, n = this.options.filter, i = [], o = t.length, s = this, r = 0, a = s.input.value().trim();
                if (!a)
                    return i;
                for (; r < o; r++)
                    n(e = t[r], a) && i.push(e);
                return !!i.length && i
            },
            _move: function(t) {
                var e = this
                  , n = e._preSelectedIndex
                  , i = e.__domList
                  , o = i.length;
                n = t + n,
                n = n > o - 1 ? n - o : n < 0 ? o + n : n,
                i = i[n],
                i && e._preSelect(n)
            },
            _command: function(t) {
                var e, n = this;
                switch (t.keyCode) {
                case l.LEFT:
                    (e = n._plugins.pagination) && e.backward();
                    break;
                case l.RIGHT:
                    (e = n._plugins.pagination) && e.forward();
                    break;
                case l.UP:
                    t.stop(),
                    n._move(-1);
                    break;
                case l.DOWN:
                    t.stop(),
                    n._move(1);
                    break;
                case l.ENTER:
                    t.stop(),
                    n.select(n._preSelectedIndex)
                }
            },
            _input: function() {
                var t, e = this, n = e.options.source, i = e.value = e.input.value().trim();
                t = e.options.enableFilter ? e.__cache[i] || (e.__cache[i] = e._filter(n)) : n,
                e.options.onChange.call(e, t)
            },
            display: function(e) {
                var n = ""
                  , i = this
                  , o = i.options.tpl;
                t.tmpl.render;
                return e && e.each(function(e, i) {
                    n += t.tmpl.render(o, e)
                }),
                i.__dataList = e,
                i._root.html(n),
                i.__domList = r.makeArray(i._root[0].children),
                i.reset(),
                i
            },
            show: function(e) {
                var n = this;
                return n.visible || (this.trigger = e ? t(e) : this.input,
                this._input(),
                this._position(this.trigger, this.options.offset),
                this.wrap.removeClass(u),
                this.visible = !0,
                this._blurClose = function(e) {
                    var i = e.target
                      , o = n.wrap;
                    n.visible && !(o.contains(t(i)) || o[0] === i) && n.close()
                }
                ,
                f.bind("mousedown", n._blurClose)),
                this
            },
            close: function() {
                return f.unbind("mousedown", this._blurClose),
                this.wrap.addClass(u),
                this.visible = !1,
                this.reset(),
                this
            },
            reset: function() {
                var e = this
                  , i = e.__domList
                  , o = e._preSelectedIndex
                  , s = i && o > -1 && i[o] || n;
                s && t(s).removeClass(e.options.activeClass),
                e._preSelectedIndex = e.selectedIndex = -1
            }
        },
        s.Suggest = a
    }(t, e),
    function(t, e, n) {
        function o(e, n) {
            var i = t(this)
              , o = i.value().trim()
              , s = e.txt
              , r = !(o == h || o == s);
            return i[r || n ? "removeClass" : "addClass"](e.cls),
            r
        }
        function r(e) {
            var n, i = t(u.createElement("div"));
            e = t(e);
            var o = e.clone();
            return o.attr("real-type", "password"),
            o[0].removeAttribute("id"),
            o[0].removeAttribute("name"),
            o.appendTo(i),
            i.html(i.html().replace(p, "$1text$2")),
            (n = i.find("*").first()).insertAfter(e),
            e.hide(),
            n.bind("focus", function() {
                t(this).hide(),
                e.show(),
                e[0].focus()
            }),
            n
        }
        function a(e) {
            return {
                focus: function(n, i) {
                    var s = t(this);
                    i = i || n.data,
                    e && s.data(g) && (this.setAttribute("type", "password"),
                    s.data(g, !1)),
                    o.call(this, i, !0) || s.value(h)
                },
                blur: function(n, i) {
                    var s, r, a = t(this);
                    i = i || n.data,
                    i.txt = a.data("placeholder")._placeholder || i.txt,
                    o.call(this, i) || (a.value(r = i.txt),
                    (s = a.data(b)) ? (a.hide(),
                    s.show().value(r)) : e && (this.setAttribute("type", "text"),
                    a.data(g, !0)))
                }
            }
        }
        function c(t, e, n, i) {
            var o = a(i)
              , s = {
                cls: e,
                txt: n
            };
            (v = i && _) && function() {
                var i = r(t);
                i.addClass(e),
                i.value(n),
                t.data(b, i)
            }(),
            t.bind("focus", o.focus, {
                arguments: s
            }).bind("blur", o.blur, {
                arguments: s
            })
        }
        function l(t, e) {
            var n, o = this, s = {
                text: h,
                cls: "placeholder"
            };
            return t.data("placeholder", o),
            o.dom = t,
            (n = e.text) && o.text(n),
            !t || f ? this : (o.options = i(s, e || {}),
            o.initialize(o.options),
            void t.trigger("blur"))
        }
        var u = e.document
          , d = t.browser
          , f = "placeholder"in u.createElement("input")
          , p = /(<\s*input.*\s+type=['"]*)(?:\w+)(['"]*\s+.*>)/gi
          , h = ""
          , _ = d.isIE && (d.isIE6 || d.isIE7 || d.isIE8)
          , v = !1
          , m = "password"
          , b = "data-fakedom"
          , g = "data-faked";
        return l.prototype = {
            constructor: l,
            initialize: function(t) {
                var e, n = this.dom;
                c(n, t.cls, e || n.attr("placeholder"), n.attr("type") == m)
            },
            _placeholder: h,
            text: function(t) {
                var e = this
                  , t = t && t.toString().trim();
                return e._placeholder = t || e.dom.attr("placeholder") || h,
                t ? function(n) {
                    return n.dom.attr("placeholder", e._placeholder = t)
                }(e) : function(t) {
                    return t._placeholder
                }(e)
            }
        },
        t.fn.placeholder = function(t) {
            return this.data("placeholder") || new l(this,t || {})
        }
        ,
        s.PlaceHolder = l
    }(t, e),
    s.Form = {},
    function(t, e, n) {
        function o(t) {
            var e = this
              , n = null
              , o = function() {}
              , s = {
                dom: n,
                rules: n,
                onCheck: o,
                required: !0,
                triggerEvent: "blur"
            };
            e.options = i(s, t || {}),
            e.dom = e.options.dom,
            e.initialize()
        }
        return o.prototype = {
            initialize: function() {
                var t = this
                  , e = t.dom;
                t.required = t.options.required,
                e && e[0] && (t.__blurHandler = function() {
                    t.check()
                }
                ,
                e.bind(t.options.triggerEvent, t.__blurHandler))
            },
            constructor: o,
            check: function() {
                var t, e, n = this.dom, i = n && n.value() || "", o = this.options, s = o.rules, a = 1, c = 0, l = this.required, u = r.isFunction;
                for (!r.isArray(s) && (s = [s]),
                e = s.length; c < e && (t = s[c],
                !l && !i || !(a &= u(t) ? t(i) : t.test(i))); c++)
                    ;
                return o.onCheck.call(this, !!a, {
                    val: i,
                    dom: n,
                    rule: --c
                }),
                a || !l
            },
            destroy: function() {
                var t = this
                  , e = t.dom;
                return e && e.unbind(t.options.triggerEvent, t.__blurHandler),
                !0
            }
        },
        s.Form.Field = o
    }(t, e),
    function(t, e, n) {
        function o(t, e) {
            var n = this
              , o = {
                forceCheckAll: !1
            };
            n.options = i(o, e || {}),
            n._fields = []
        }
        return o.prototype = {
            constructor: o,
            addField: function(t) {
                var e = this;
                return e._fields.push(t),
                e
            },
            removeField: function(e) {
                var n = this._fields;
                return e = "number" == t.type(e) ? e : n.indexOf(e),
                e > -1 && e < n.length && n.splice(e, 1)[0].destroy()
            },
            check: function() {
                var t = this._fields
                  , e = t.length
                  , n = 1
                  , i = this.options.forceCheckAll
                  , o = 0;
                if (e)
                    for (; o < e && (n &= t[o].check(),
                    n || i); o++)
                        ;
                return !!n
            }
        },
        s.Form.Validator = o
    }(t, e),
    function(t, e, n) {
        function r(t) {
            var e = function() {}
              , n = {
                wrapClass: "base_pop",
                closeBtnClass: "delete",
                size: {
                    x: 300
                },
                title: "",
                isModal: !0,
                yesBtnClass: "yes-btn",
                noBtnClass: "no-btn",
                yesLabel: "YES",
                noLabel: "NO",
                onOpen: e,
                onClose: e,
                onYes: e
            }
              , o = this;
            o.options = i(n, t),
            o._isOpened = !1,
            o.type = o.options.type,
            o._buildUI(),
            o._bindUI()
        }
        var a = null
          , c = "hidden"
          , l = e.document;
        return r.ALERT = "alert",
        r.PROMPT = "prompt",
        r.prototype = {
            constructor: r,
            open: function(t) {
                return t && this.body.html(t),
                this.wrap.removeClass(c),
                this.wrap.mask(),
                this._isOpened = !0,
                this
            },
            _buildUI: function() {
                var e, n, i = this, s = i.options, c = s.wrapClass, u = s.closeBtnClass, d = s.noBtnClass, f = s.yesBtnClass, p = s.size.x, h = '<div style="' + (p ? "width: " + p + "px" : "") + ';" class="' + c + '"><div class="pop_hd"><h3>' + s.title + '</h3><a class="' + u + '" href="javascript:">×</a></div><div class="pop_bd">' + (s.content || "") + '</div><div class="pop_ft"><input type="button" value="' + s.yesLabel + '" class="' + f + '"/>' + (i.type === r.ALERT ? "" : '<input type="button" value="' + s.noLabel + '" class="' + d + '"/>') + "</div></div>";
                i.wrap = n = t(o(h)),
                i.title = n.find("h3"),
                i.closeBtn = n.find("." + u),
                e = n.find("." + d),
                i.noBtn = e.length ? e : a,
                i.yesBtn = n.find("." + f),
                i.body = n.find(".pop_bd"),
                n.css("position", "absolute"),
                l.body.appendChild(n[0])
            },
            _bindUI: function() {
                var t = this
                  , e = t.options;
                t.__closeHandler = function(n) {
                    t.close(),
                    e.onClose.call(t, n.target)
                }
                ,
                t.__yesHandler = function() {
                    t.close(),
                    e.onYes.call(t)
                }
                ,
                t.closeBtn && t.closeBtn.bind("click", t.__closeHandler),
                t.noBtn && t.noBtn.bind("click", t.__closeHandler),
                t.yesBtn && t.yesBtn.bind("click", t.__yesHandler)
            },
            close: function() {
                var t = this
                  , e = t.wrap;
                return t.closeBtn.unbind("click", t.__closeHandler),
                t.noBtn && t.noBtn.unbind("click", t.__closeHandler),
                t.yesBtn && t.yesBtn.unbind("click", t.__yesHandler),
                e.addClass(c).unmask(),
                e.remove(),
                e = t.wrap = t.noBtn = t.yesBtn = t.closeBtn = t.title = t.body = t.__closeHandler = t.options = a,
                t._isOpened = !1,
                a
            }
        },
        r.open = function(t, e, n, i) {
            return i = i || {},
            i.title = e || "",
            i.content = t,
            n && (i.size = n),
            new r(i).open()
        }
        ,
        r.alert = function(t, e, n) {
            n = n || {},
            n.content = t,
            n.type = r.ALERT,
            n.onYes = function() {
                clearTimeout(i)
            }
            ;
            var i, o = new r(n);
            return e > 0 && (i = setTimeout(function() {
                o.close()
            }, e)),
            o.open()
        }
        ,
        r.prompt = function(t, e, n) {
            return n = n || {},
            n.content = t,
            n.type = r.PROMPT,
            e && (n.onYes = e),
            new r(n).open()
        }
        ,
        s.Mbox = r
    }(t, e),
    function(t, e, n) {
        function i(t) {
            var e = t
              , n = this
              , i = e.container;
            this.container = i,
            this._onScroll = e.onScroll || o,
            this._startPos = e.startPos || 0,
            this.setEnd(e.endPos || -1e7),
            this._offsetTop = e.offsetTop || 0,
            this._originPos = parseInt(i.css("top")) || this._startPos || 0,
            this._originPosType = i.css("position") || "",
            this._fixedClass = e.fixedClass,
            this._bottomReferenceElement = e.bottomReferenceElement,
            this._bindEvents(),
            this.options = e,
            this._step = a ? function(t) {
                n._fixedClass ? i.addClass(n._fixedClass) : (i.css({
                    top: t + n._offsetTop + "px",
                    position: "absolute"
                }),
                i.removeClass("sta_fixed"))
            }
            : function() {
                n._fixedClass ? i.addClass(n._fixedClass) : (i.css({
                    position: "fixed",
                    top: n._offsetTop + "px"
                }),
                i.addClass("sta_fixed"))
            }
        }
        var o = function() {}
          , e = window
          , r = e.document
          , a = t.browser.isIE6;
        return i.prototype = {
            constructor: i,
            play: function() {
                return this._isScrolling = !0,
                this
            },
            setEnd: function(t) {
                this._endPos = t + this.container.offset().height
            },
            stop: function() {
                return this.reset(),
                this._isScrolling = !1,
                this
            },
            reset: function(t) {
                var e = this._originPosType.toLowerCase();
                this._isPaused = !0,
                this._fixedClass ? this.container.removeClass(this._fixedClass) : this.container.css({
                    position: t ? "absolute" : e,
                    top: t + "px" || "auto"
                })
            },
            _bindEvents: function() {
                var n = this;
                n._scrollHandler = function() {
                    n._isScrolling && n._scroll()
                }
                ,
                t(e).bind("scroll", n._scrollHandler)
            },
            _getBottom: function() {
                return this._bottomReferenceElement ? $("body").offset().height - this._bottomReferenceElement.offset().bottom + this.container.offset().height : this._endPos
            },
            _scroll: function() {
                var t = r.documentElement.scrollTop || r.body.scrollTop
                  , e = this._getBottom()
                  , n = r.body.scrollHeight - e
                  , i = this
                  , o = t >= n;
                i._offsetTopMax = n,
                t > i._startPos && !o ? (i._isPaused = !1,
                i._step(t),
                i._onScroll.call(i, t)) : i.reset(o && i._offsetTopMax > i._startPos ? n : 0)
            }
        },
        t.fn["float"] = function(t, e, n, o, s, r) {
            return new i({
                container: this,
                startPos: t || this.offset().top,
                endPos: e,
                offsetTop: n,
                onScroll: o,
                fixedClass: s,
                bottomReferenceElement: r
            }).play()
        }
        ,
        s.Float = i
    }(t, window),
    s.Class = function(t, e, n) {
        var i = function() {}
          , o = s.Util.isFunction;
        return function r(s, a) {
            function c() {
                var t = this instanceof c ? this : new l
                  , e = this._super;
                return e && o(e.__properties__) && e.__properties__.call(this),
                o(t.__properties__) && t.__properties__.call(this),
                t.__superInitialize = e ? e.initialize : i,
                t.initialize.apply(t, arguments),
                t
            }
            function l() {}
            a === n && (a = s,
            s = Object),
            c.Bare = l;
            var u, d = l[t] = s[t], f = l[t] = c[t] = c.p = new l;
            return f.constructor = c,
            c.extend = function(t) {
                return r(c, t)
            }
            ,
            (c.open = function(t) {
                if ("function" == typeof t && (t = t.call(c, f, d, c, s)),
                "object" == typeof t)
                    for (u in t)
                        e.call(t, u) && (f[u] = t[u]);
                return f._super = d,
                f.hasProperty = function(t) {
                    if ("[object String]" === Object.prototype.toString.call(t))
                        for (var e in this)
                            if ("_super" !== e.toLowerCase() && e === t)
                                return !0;
                    return !1
                }
                ,
                "initialize"in f || (f.initialize = s),
                c
            }
            )(a)
        }
    }("prototype", {}.hasOwnProperty),
    function(t, e, n) {
        function i(t) {
            var e = this
              , n = {
                resolve: function(t) {
                    e.success(t)
                },
                reject: function(t) {
                    e.failure(t)
                }
            };
            this._name = "promise",
            this._status = 0,
            this._resolveValue = null,
            this._rejectReason = null,
            this._resolveCallback = [],
            this._rejectCallback = [],
            setTimeout(function() {
                try {
                    t(n)
                } catch (i) {
                    e.failure(i + "")
                }
            }, 0)
        }
        i.prototype = {
            constructor: i,
            success: function(t) {
                var e;
                0 === this._status && (this._status = 1,
                this._resolveValue = t,
                this._resolveCallback.each(function(n) {
                    (e = n.func(t) && "promise" === e._name && r.isFunction(e.success)) && e.success(t)
                }),
                this._resolveCallback = [])
            },
            failure: function(t) {
                var e;
                0 === this._status && (this._status = 2,
                this._rejectReason = t,
                this._rejectCallback.each(function(n) {
                    (e = n.func(t) && "promise" === e._name && r.isFunction(e.success)) && e.success(value)
                }),
                this._rejectCallback = [])
            },
            then: function(t, e) {
                return r.isFunction(t) && this._resolveCallback.push({
                    source: "then",
                    func: t
                }),
                r.isFunction(e) && this._rejectCallback.push({
                    source: "then",
                    func: e
                }),
                this
            },
            "catch": function(t) {
                return r.isFunction(t) && this._rejectCallback.push({
                    source: "catch",
                    func: t
                }),
                this
            },
            any: function(t) {
                r.isFunction(t) && (this._rejectCallback.push({
                    source: "then",
                    func: t
                }),
                this._resolveCallback.push({
                    source: "then",
                    func: t
                }))
            }
        },
        s.Promise = function(t) {
            return new i(t)
        }
    }(t, window),
    t.BizMod = s,
    $.myAjax = function(e, n, i, o) {
        t.ajax(e, {
            method: n,
            context: i,
            onsuccess: function(t) {
                var t = $.parseJSON(t.responseText);
                t && o && "function" == typeof o && o(t)
            }
        })
    }
    ,
    $.fn.getMask = function() {
        this.removeClass("hidden").mask()
    }
    ,
    $.fn.removeMask = function() {
        this.addClass("hidden").unmask()
    }
    ,
    $.proUrlParam = function(t) {
        for (var e = t.split("?")[1], n = e.split("&"), i = {}, o = 0; o < n.length; o++) {
            var s = n[o].split("=");
            i[s[0]] = s[1]
        }
        return i
    }
    ,
    $.htmlToDom = function(t, e) {
        var n = e ? e.document.createElement("div") : document.createElement("div")
          , i = document.createDocumentFragment();
        n.innerHTML = t;
        var o = n.children;
        if (o.length > 1) {
            for (; o.length > 0; )
                i.appendChild(o[0]);
            return $(i)
        }
        return $(o[0])
    }
    ,
    $.addUrlParms = function(t, e) {
        var n = ""
          , i = ""
          , o = "#ctm_ref";
        if (t.indexOf(o) != -1) {
            var s = t.split(o);
            n = s[0],
            i = s[1]
        } else
            n = t;
        if (e)
            for (var r in e)
                n += r && e[r] ? (n.indexOf("?") !== -1 ? "&" : "?") + (r + "=" + e[r]) : "";
        return n + o + i
    }
    ,
    $.getJsonParamsFromUrl = function(t) {
        var e = new Object;
        if (t.indexOf("?") != -1) {
            var n = t.split("?")[1];
            n.indexOf("#") != -1 && (n = n.split("#")[0]),
            strs = n.split("&");
            for (var i = 0; i < strs.length; i++)
                e[strs[i].split("=")[0]] = strs[i].split("=")[1]
        }
        return e
    }
    ,
    $.CLogin_Mask_showView = function() {
        return {
            checkNewMaskEnable: function() {
                return window.CLogin && window.CLogin.Mask && window.CLogin.Mask.showView
            },
            showView: function(t, e) {
                CLogin.Mask.showView("", function() {
                    e && "function" == typeof e ? e() : location.reload()
                }, t || !1)
            }
        }
    }()
}(cQuery, window);
function Swipe(n, t) {
    "use strict";
    function e() {
        E = x.children,
        w = E.length,
        E.length < 2 && (t.continuous = !1),
        f.transitions && t.continuous && E.length < 3 && (x.appendChild(E[0].cloneNode(!0)),
        x.appendChild(x.children[1].cloneNode(!0)),
        E = x.children),
        m = new Array(E.length),
        p = t.width || n.getBoundingClientRect().width || n.offsetWidth,
        x.style.width = E.length * p + "px";
        for (var e = E.length; e--; ) {
            var i = E[e];
            i.style.width = p + "px",
            i.setAttribute("data-index", e),
            f.transitions && (i.style.left = e * -p + "px",
            a(e, b > e ? -p : b < e ? p : 0, 0))
        }
        t.continuous && f.transitions && (a(s(b - 1), -p, 0),
        a(s(b + 1), p, 0)),
        f.transitions || (x.style.left = b * -p + "px"),
        n.style.visibility = "visible"
    }
    function i() {
        t.continuous ? r(b - 1) : b && r(b - 1)
    }
    function o() {
        t.continuous ? r(b + 1) : b < E.length - 1 && r(b + 1)
    }
    function s(n) {
        return (E.length + n % E.length) % E.length
    }
    function r(n, e) {
        if (b != n) {
            if (f.transitions) {
                var i = Math.abs(b - n) / (b - n);
                if (t.continuous) {
                    var o = i;
                    i = -m[s(n)] / p,
                    i !== o && (n = -i * E.length + n)
                }
                for (var r = Math.abs(b - n) - 1; r--; )
                    a(s((n > b ? n : b) - r - 1), p * i, 0);
                n = s(n),
                a(b, p * i, e || g),
                a(n, 0, e || g),
                t.continuous && a(s(n - i), -(p * i), 0)
            } else
                n = s(n),
                c(b * -p, n * -p, e || g);
            b = n,
            h(t.callback && t.callback(b, E[b]))
        }
    }
    function a(n, t, e) {
        u(n, t, e),
        m[n] = t
    }
    function u(n, t, e) {
        var i = E[n]
          , o = i && i.style;
        o && (o.webkitTransitionDuration = o.MozTransitionDuration = o.msTransitionDuration = o.OTransitionDuration = o.transitionDuration = e + "ms",
        o.webkitTransform = "translate(" + t + "px,0)translateZ(0)",
        o.msTransform = o.MozTransform = o.OTransform = "translateX(" + t + "px)")
    }
    function c(n, e, i) {
        if (!i)
            return void (x.style.left = e + "px");
        var o = +new Date
          , s = setInterval(function() {
            var r = +new Date - o;
            return r > i ? (x.style.left = e + "px",
            L && d(),
            t.transitionEnd && t.transitionEnd.call(event, b, E[b]),
            void clearInterval(s)) : void (x.style.left = (e - n) * (Math.floor(r / i * 100) / 100) + n + "px")
        }, 4)
    }
    function d() {
        T = setTimeout(o, L)
    }
    function l() {
        L = 0,
        clearTimeout(T)
    }
    var v = function() {}
      , h = function(n) {
        setTimeout(n || v, 0)
    }
      , f = {
        addEventListener: !!window.addEventListener,
        touch: "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: function(n) {
            var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
            for (var e in t)
                if (void 0 !== n.style[t[e]])
                    return !0;
            return !1
        }(document.createElement("swipe"))
    };
    if (n) {
        var E, m, p, w, x = n.children[0];
        t = t || {};
        var b = parseInt(t.startSlide, 10) || 0
          , g = t.speed || 300;
        t.continuous = void 0 === t.continuous || t.continuous;
        var T, y, L = t.auto || 0, k = {}, D = {}, M = {
            handleEvent: function(n) {
                switch (n.type) {
                case "touchstart":
                    this.start(n);
                    break;
                case "touchmove":
                    this.move(n);
                    break;
                case "touchend":
                    h(this.end(n));
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    h(this.transitionEnd(n));
                    break;
                case "resize":
                    h(e)
                }
                t.stopPropagation && n.stopPropagation()
            },
            start: function(n) {
                var t = n.touches[0];
                k = {
                    x: t.pageX,
                    y: t.pageY,
                    time: +new Date
                },
                y = void 0,
                D = {},
                x.addEventListener("touchmove", this, !1),
                x.addEventListener("touchend", this, !1)
            },
            move: function(n) {
                if (!(n.touches.length > 1 || n.scale && 1 !== n.scale)) {
                    t.disableScroll && n.preventDefault();
                    var e = n.touches[0];
                    D = {
                        x: e.pageX - k.x,
                        y: e.pageY - k.y
                    },
                    "undefined" == typeof y && (y = !!(y || Math.abs(D.x) < Math.abs(D.y))),
                    y || (n.preventDefault(),
                    l(),
                    t.continuous ? (u(s(b - 1), D.x + m[s(b - 1)], 0),
                    u(b, D.x + m[b], 0),
                    u(s(b + 1), D.x + m[s(b + 1)], 0)) : (D.x = D.x / (!b && D.x > 0 || b == E.length - 1 && D.x < 0 ? Math.abs(D.x) / p + 1 : 1),
                    u(b - 1, D.x + m[b - 1], 0),
                    u(b, D.x + m[b], 0),
                    u(b + 1, D.x + m[b + 1], 0)))
                }
            },
            end: function(n) {
                var e = +new Date - k.time
                  , i = Number(e) < 250 && Math.abs(D.x) > 20 || Math.abs(D.x) > p / 2
                  , o = !b && D.x > 0 || b == E.length - 1 && D.x < 0;
                t.continuous && (o = !1);
                var r = D.x < 0;
                y || (i && !o ? (r ? (t.continuous ? (a(s(b - 1), -p, 0),
                a(s(b + 2), p, 0)) : a(b - 1, -p, 0),
                a(b, m[b] - p, g),
                a(s(b + 1), m[s(b + 1)] - p, g),
                b = s(b + 1)) : (t.continuous ? (a(s(b + 1), p, 0),
                a(s(b - 2), -p, 0)) : a(b + 1, p, 0),
                a(b, m[b] + p, g),
                a(s(b - 1), m[s(b - 1)] + p, g),
                b = s(b - 1)),
                t.callback && t.callback(b, E[b])) : t.continuous ? (a(s(b - 1), -p, g),
                a(b, 0, g),
                a(s(b + 1), p, g)) : (a(b - 1, -p, g),
                a(b, 0, g),
                a(b + 1, p, g))),
                x.removeEventListener("touchmove", M, !1),
                x.removeEventListener("touchend", M, !1)
            },
            transitionEnd: function(n) {
                parseInt(n.target.getAttribute("data-index"), 10) == b && (L && d(),
                t.transitionEnd && t.transitionEnd.call(n, b, E[b]))
            }
        };
        return e(),
        L && d(),
        f.addEventListener ? (f.touch && x.addEventListener("touchstart", M, !1),
        f.transitions && (x.addEventListener("webkitTransitionEnd", M, !1),
        x.addEventListener("msTransitionEnd", M, !1),
        x.addEventListener("oTransitionEnd", M, !1),
        x.addEventListener("otransitionend", M, !1),
        x.addEventListener("transitionend", M, !1)),
        window.addEventListener("resize", M, !1)) : window.onresize = function() {
            e()
        }
        ,
        {
            setup: function() {
                e()
            },
            slide: function(n, t) {
                l(),
                r(n, t)
            },
            prev: function() {
                l(),
                i()
            },
            next: function() {
                l(),
                o()
            },
            stop: function() {
                l()
            },
            getPos: function() {
                return b
            },
            setPos: function(n) {
                b = n
            },
            getNumSlides: function() {
                return w
            },
            kill: function() {
                l(),
                x.style.width = "",
                x.style.left = "";
                for (var n = E.length; n--; ) {
                    var t = E[n];
                    t.style.width = "",
                    t.style.left = "",
                    f.transitions && u(n, 0, 0)
                }
                f.addEventListener ? (x.removeEventListener("touchstart", M, !1),
                x.removeEventListener("webkitTransitionEnd", M, !1),
                x.removeEventListener("msTransitionEnd", M, !1),
                x.removeEventListener("oTransitionEnd", M, !1),
                x.removeEventListener("otransitionend", M, !1),
                x.removeEventListener("transitionend", M, !1),
                window.removeEventListener("resize", M, !1)) : window.onresize = null
            }
        }
    }
}
!function(t) {
    function e(t, e) {
        this._init(t, e)
    }
    var n = {};
    !function(e) {
        function n(t) {
            var e = this;
            return e instanceof n ? void this._initialize(t) : new n(t)
        }
        n.each = function(t, e) {
            if (void 0 === t.length) {
                for (var n in t)
                    if (!1 === e(t[n], n, t))
                        break
            } else
                for (var i = 0, o = t.length; i < o && !(i in t && !1 === e(t[i], i, t)); i++)
                    ;
        }
        ,
        n.extend = function(t, e, n) {
            void 0 === n && (n = !0);
            for (var i in e)
                !n && i in t || (t[i] = e[i]);
            return t
        }
        ,
        n.CE = function() {
            var t = 1;
            return {
                addEvent: function(e, n, i) {
                    i.$$$guid || (i.$$$guid = t++),
                    e.cusevents || (e.cusevents = {}),
                    e.cusevents[n] || (e.cusevents[n] = {}),
                    e.cusevents[n][i.$$$guid] = i
                },
                removeEvent: function(t, e, n) {
                    t.cusevents && t.cusevents[e] && delete t.cusevents[e][n.$$$guid]
                },
                fireEvent: function(t, e) {
                    if (t.cusevents) {
                        var n = Array.prototype.slice.call(arguments, 2)
                          , i = t.cusevents[e];
                        for (var o in i)
                            i[o].apply(t, n)
                    }
                },
                clearEvent: function(t) {
                    if (t.cusevents) {
                        for (var e in t.cusevents) {
                            var n = t.cusevents[e];
                            for (var i in n)
                                n[i] = null;
                            t.cusevents[e] = null
                        }
                        t.cusevents = null
                    }
                }
            }
        }(),
        n.F = function() {
            var t = Array.prototype.slice;
            return {
                bind: function(e, n) {
                    var i = t.call(arguments, 2);
                    return function() {
                        return e.apply(n, i.concat(t.call(arguments)))
                    }
                },
                bindAsEventListener: function(e, n) {
                    var i = t.call(arguments, 2);
                    return function(t) {
                        return e.apply(n, [E.fixEvent(t)].concat(i))
                    }
                }
            }
        }(),
        n.E = function() {
            function t() {
                var t = !0
                  , n = e.call(this)
                  , i = this.events[n.type];
                for (var o in i)
                    this.$$handleEvent = i[o],
                    this.$$handleEvent(n) === !1 && (t = !1);
                return t
            }
            function e(t) {
                if (t)
                    return t;
                t = window.event,
                t || (t = {
                    clientX: 0,
                    clientY: 0
                },
                t.srcElement = t.target = t.currentTarget = this || document),
                t.pageX = t.clientX + l(t.srcElement),
                t.pageY = t.clientY + c(t.srcElement),
                t.target = t.srcElement,
                t.stopPropagation = n,
                t.preventDefault = i;
                var e = {
                    mouseout: t.toElement,
                    mouseover: t.fromElement
                }[t.type];
                return e && (t.relatedTarget = e),
                t
            }
            function n() {
                this.cancelBubble = !0
            }
            function i() {
                this.returnValue = !1
            }
            var o, r, s = 1, a = function(t, e, n) {
                n.$$guid || (n.$$guid = s++),
                t.events || (t.events = {});
                var i = t.events[e];
                i || (i = t.events[e] = {},
                t["on" + e] && (i[0] = t["on" + e]))
            };
            if (window.addEventListener) {
                var u = {
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                };
                o = function(t, e, n) {
                    if (e in u) {
                        a(t, e, n);
                        var i = t.events[e][n.$$guid] = function(e) {
                            var i = e.relatedTarget;
                            i && (t == i || 16 & t.compareDocumentPosition(i)) || n.call(this, e)
                        }
                        ;
                        t.addEventListener(u[e], i, !1)
                    } else
                        t.addEventListener(e, n, !1)
                }
                ,
                r = function(t, e, n) {
                    e in u ? t.events && t.events[e] && (t.removeEventListener(u[e], t.events[e][n.$$guid], !1),
                    delete t.events[e][n.$$guid]) : t.removeEventListener(e, n, !1)
                }
            } else
                o = function(e, n, i) {
                    a(e, n, i),
                    e.events[n][i.$$guid] = i,
                    e["on" + n] = t
                }
                ,
                r = function(t, e, n) {
                    t.events && t.events[e] && delete t.events[e][n.$$guid]
                }
                ;
            var c = function(t) {
                var e = t && t.ownerDocument ? t.ownerDocument : document;
                return e.documentElement.scrollTop || e.body.scrollTop
            }
              , l = function(t) {
                var e = t && t.ownerDocument ? t.ownerDocument : document;
                return e.documentElement.scrollLeft || e.body.scrollLeft
            }
              , d = function(t, e) {
                if (document.createEventObject)
                    return t.fireEvent("on" + e);
                var n = document.createEvent("HTMLEvents");
                return n.initEvent(e, !0, !0),
                !t.dispatchEvent(n)
            };
            return {
                addEvent: o,
                removeEvent: r,
                fixEvent: e,
                fireEvent: d
            }
        }(),
        n.ie = t.browser.isIE,
        n.fx = function(t, e, n, i) {
            var o, r = Date, s = new r, a = 680, u = function(t) {
                return (t /= .5) < 1 ? .5 * Math.pow(t, 2) : -.5 * ((t -= 2) * t - 2)
            };
            return o = setInterval(function() {
                var c = Math.min(1, (new r - s) / a);
                !1 !== n(+t + (e - t) * u(c)) && 1 != c || (i && "function" == typeof i && i(),
                clearInterval(o))
            }, 100)
        }
        ,
        n.fadeOut = function(t, e) {
            t.style.filter = "alpha(opacity=" + parseInt(100 * e) + ")",
            t.style.opacity = e
        }
        ,
        n.string = {},
        function() {
            var t = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)","g");
            n.string.trim = function(e) {
                return String(e).replace(t, "")
            }
        }(),
        n.dom = {},
        n.dom.g = function(t) {
            return t ? "string" == typeof t || t instanceof String ? document.getElementById(t) : !t.nodeName || 1 != t.nodeType && 9 != t.nodeType ? null : t : null
        }
        ,
        n.dom.hasClass = function(t, e) {
            if (t = n.dom.g(t),
            !t || !t.className)
                return !1;
            var i = n.string.trim(e).split(/\s+/)
              , o = i.length;
            for (e = t.className.split(/\s+/).join(" "); o--; )
                if (!new RegExp("(^| )" + i[o] + "( |$)").test(e))
                    return !1;
            return !0
        }
        ,
        n.dom.isWindow = function(t) {
            var e = document;
            return !(t != window && t != e && t.tagName && !/^(?:body|html)$/i.test(t.tagName))
        }
        ,
        n.browser = {},
        n.browser.isStrict = "CSS1Compat" == document.compatMode,
        n.browser.client = function() {
            var t = document
              , e = "BackCompat" == t.compatMode ? t.body : t.documentElement;
            return e
        }(),
        n.grep = function(t, e, n) {
            var i, o = [];
            n = !!n;
            for (var r = 0, s = t.length; r < s; r++)
                i = !!e(t[r], r),
                n !== i && o.push(t[r]);
            return o
        }
        ,
        n.prototype = {
            _initialize: function(t) {
                return this._opt = t,
                this._setOptions(),
                this._bindEvent(),
                this._trigger(),
                this
            },
            _setOptions: function() {
                var t = {
                    placeholder: "",
                    loadingImage: "",
                    threshold: 10,
                    event: "scroll",
                    attribute_original: "src",
                    attribute: "_src",
                    elems: null,
                    "class": "",
                    container: window,
                    onDataLoadBefore: function(t) {},
                    onDataLoad: function(t) {},
                    onComplete: function(t) {},
                    animat: !0,
                    failure_limit: 0
                };
                this._opts = n.extend(t, this._opt || {}),
                this._isWindow = !1,
                this._elems = [],
                this._initContainer(),
                this._initElems()
            },
            _initContainer: function() {
                var t = this._opts.container;
                this._isWindow = n.dom.isWindow(t),
                this._isWindow ? this._container = n.browser.client : this._container = t,
                this._binder = this._isWindow ? window : this._container
            },
            _initElems: function() {
                var t, e = this, i = this._opts, o = i.elems || this._container.getElementsByTagName("img") || [], r = i.attribute, s = (i.holder,
                i.className), a = i.placeholder, u = i.loadingImage, c = i.attribute_original;
                n.each(o, function(i) {
                    var o = i.getAttribute(r);
                    t = n.dom.hasClass(i, s),
                    !t && o && (u && (i.style.cssText += 'background: url("' + u + '") no-repeat scroll center center transparent;'),
                    a && i.setAttribute(c, a),
                    e._elems.push(i))
                })
            },
            _bindEvent: function() {
                var t = this
                  , e = this._opts
                  , i = e.attribute
                  , o = e.attribute_original
                  , r = function(t) {
                    return "img" === t.tagName.toLowerCase()
                };
                n.each(this._elems, function(e) {
                    e.getAttribute(i);
                    e._LazyLoad = t,
                    e._appear = function() {
                        function t() {
                            this._state = "loaded",
                            this.removeAttribute(i),
                            this._LazyLoad._opts.animat && (n.fadeOut(this, 0),
                            n.fx(0, 1, function(t) {
                                n.fadeOut(e, t)
                            }, function() {})),
                            r(this) ? this.setAttribute(o, s) : this.style.backgroundImage = "url(" + s + ")"
                        }
                        var e = this;
                        e._state = "loading";
                        var i = this._LazyLoad._opts.attribute
                          , s = e.getAttribute(i)
                          , a = null;
                        a = new Image,
                        n.ie ? a.onreadystatechange = function() {
                            "complete" == this.readyState && t.call(e)
                        }
                        : a.onload = function() {
                            1 == this.complete && t.call(e)
                        }
                        ,
                        a.setAttribute(o, s),
                        n.CE.removeEvent(this, "appear", this._appear),
                        this._appear = null
                    }
                    ,
                    n.CE.addEvent(e, "appear", e._appear)
                }),
                this._delayLoad = function() {
                    t._doLoad()
                }
                ,
                this._delayResize = function() {
                    t._doLoad()
                }
                ,
                n.E.addEvent(this._binder, e.event, t._delayLoad),
                this._isWindow && n.E.addEvent(this._binder, "resize", n.F.bind(t._delayResize, t))
            },
            _doLoad: function() {
                var t = this;
                if (this._lock) {
                    clearTimeout(this._timer);
                    var e = arguments.callee;
                    this._timer = setTimeout(function() {
                        e.call(t)
                    }, 100)
                } else
                    this._lock = !0,
                    setTimeout(function() {
                        t._loadRun()
                    }, 100)
            },
            _loadRun: function() {
                if (!this._isFinish()) {
                    var t = this
                      , e = this._getContainerRect()
                      , i = this._getScroll()
                      , o = i.left
                      , r = i.top
                      , s = this._elems
                      , a = Math.max(0, this.threshold || 0);
                    if (this._range = {
                        top: e.top + r - a,
                        bottom: e.bottom + r + a,
                        left: e.left + o - a,
                        right: e.right + o + a
                    },
                    s.length) {
                        var u = 0;
                        n.each(s, function(e, i) {
                            var o;
                            try {
                                o = t._insideRange(e)
                            } catch (r) {
                                return void (this._elems = [])
                            }
                            if ("top" == o)
                                ;
                            else if ("in" == o)
                                e._state || (this._lock = !0,
                                t._opts.onDataLoadBefore(e),
                                n.CE.fireEvent(e, "appear", {}),
                                t._opts.onDataLoad(e));
                            else if ("bottom" == o) {
                                var s = t._opts.failure_limit;
                                if (s && ++u > s)
                                    return !1
                            }
                        }),
                        this._elems = n.grep(s, function(t) {
                            return !t._state
                        }),
                        this._elems.length || this.release()
                    }
                    this._lock = !1
                }
            },
            _isFinish: function() {
                return (!this._elems || !this._elems.length) && (this.release(),
                !0)
            },
            _getContainerRect: function() {
                return this._isWindow && "innerHeight"in window ? {
                    left: 0,
                    right: window.innerWidth,
                    top: 0,
                    bottom: window.innerHeight
                } : this._getRect(this._container)
            },
            _getRect: function(t) {
                for (var e = t, n = 0, i = 0; e; )
                    n += e.offsetLeft,
                    i += e.offsetTop,
                    e = e.offsetParent;
                return {
                    left: n,
                    right: n + t.offsetWidth,
                    top: i,
                    bottom: i + t.offsetHeight
                }
            },
            _getScroll: function() {
                if (this._isWindow) {
                    var t = document;
                    return {
                        left: t.documentElement.scrollLeft || t.body.scrollLeft,
                        top: t.documentElement.scrollTop || t.body.scrollTop
                    }
                }
                return {
                    left: this._container.scrollLeft,
                    top: this._container.scrollTop
                }
            },
            _insideRange: function(t, e) {
                var n = this._range
                  , i = t._rect || this._getRect(t)
                  , o = i.bottom <= n.top
                  , r = i.right <= n.left
                  , s = i.top >= n.bottom
                  , a = i.left >= n.right;
                return o || r ? "top" : s || a ? "bottom" : "in"
            },
            _trigger: function() {
                this._delayLoad()
            },
            release: function() {
                this._opts.onComplete(this._container),
                clearTimeout(this._timer),
                (this._elems || this._binder) && (n.E.removeEvent(this._binder, this._opts.event, this._delayLoad),
                this._isWindow && n.E.removeEvent(this._binder, "resize", this._delayResize),
                this._elems = this._binder = null)
            }
        },
        e.LazyLoad = n
    }(n, void 0);
    var i = {
        name: "lazyLoad",
        version: "1.0",
        init: function() {},
        uninit: function() {},
        module: e
    };
    t.extend(e.prototype, {
        _init: function(t, e) {
            this._setOptions(t, e)
        },
        _setOptions: function(e, n) {
            var i = {};
            this.opt = t.extend(!0, i, n),
            this._render()
        },
        _render: function() {
            new n.LazyLoad(this.opt)
        }
    }),
    t.mod.reg(i)
}(cQuery);
!function(i, e) {
    "use strict";
    var t, s = window, n = i.extend, a = null, o = {
        lazyTag: "data-lazy"
    }, c = i("html"), r = "ie8w980", d = "w980";
    t = {
        imgLazyload: function() {
            var e = this
              , t = e.options.lazyTag;
            return i(s.document).regMod("lazyLoad", "1.0", {
                threshold: 100,
                attribute: t,
                elems: i("[" + t + "]")
            }),
            this
        },
        _bindResizer: function() {
            var e = this;
            i(window).bind("resize", function() {
                clearTimeout(a),
                a = setTimeout(function() {
                    e.checkScreen()
                }, 500)
            })
        },
        checkUA: function() {
            var e = i.browser
              , t = this
              , s = "";
            return e.isIE9 ? s = "ie9" : e.isIE8 ? (s = "ie8 lt9",
            t._bindResizer()) : e.isIE7 ? s = "ie7 lt9 w1180" : e.isIE6 && (s = "ie6 lt9 w1180"),
            c.addClass(s),
            this
        },
        checkScreen: function() {
            var e = i("body").offset().width
              , t = e < 1200;
            c[t && c.hasClass("ie8") ? "addClass" : "removeClass"](r),
            c[t ? "addClass" : "removeClass"](d)
        },
        init: function(i) {
            this.options = n(o, i || {}),
            this.imgLazyload().checkUA().checkScreen()
        }
    },
    i.ready(function() {
        t.init()
    })
}(cQuery);
cQuery.BizMod = cQuery.BizMod || {},
function(t, e) {
    function a(t) {
        var e = {
            city: "北京市",
            infoWinTpl: '                <div class="landmarks_click">                    <a href="javascript:;" onclick="parent.cQuery.BizMod.Router.infoWin.close()" class="landmarks_click_x">×</a>                    <div class="landmarks_traffic">${instruction}</div>                    <div class="landmarks_bottom">                        <div class="go_to">                            {{if (zoomLevel=parent.cQuery.BizMod.Router.zoomLevel)}}{{/if}}                            <a href="javascript:;" data-index="${index}" {{if index==0}}class="disabled"{{else}}onclick="parent.cQuery.BizMod.Router.goStep(this, -1, event)"{{/if}}>上一步</a>|                            <a href="javascript:;" {{if _isLast}}class="disabled"{{else}}onclick="parent.cQuery.BizMod.Router.goStep(this, 1, event)"{{/if}} data-index="${index}">下一步</a>|                            <a href="javascript:;" data-zoom="${zoomLevel}" data-lnglat="${position.lng}|${position.lat}" onclick="parent.cQuery.BizMod.Router.zoom(this)">{{if (zoomLevel>0)}}放大{{else}}缩小{{/if}}</a>                        </div>                    </div>                </div>',
            CMap: n,
            highlight: {
                strokeColor: "#FF0000"
            },
            busMarkerIcon: '<span class="map_bus"></span>',
            walkMarkerIcon: '<span class="map_foot"></span>',
            startMarkerIcon: '<span class="map_start"></span>',
            endMarkerIcon: '<span class="map_end"></span>'
        };
        this.options = i(e, t),
        this.CMap = e.CMap,
        this.__routerMarkers = [],
        this.__lines = []
    }
    var n = null
      , i = (t.browser.isIPad ? "touchstart" : "click",
    t.extend);
    a.prototype = {
        constructor: a,
        setCity: function(t) {
            this.options.city = t
        },
        search: function(t, e, n, i) {
            var o = this;
            switch (i) {
            case a.BUS:
                o._searchBus(t, e, n);
                break;
            case a.DRIVE:
                o._searchDrive(t, e, n);
                break;
            case a.WALK:
                o._searchWalk(t, e, n);
                break;
            default:
                i = a.BUS,
                o._searchBus(t, e, n)
            }
            o.type = i
        },
        clear: function() {
            for (var t = this.__lines, e = this.CMap, a = this.__routerMarkers, n = (this.currentInfoWindow,
            t.length); n--; )
                t[n].remove();
            for (n = a.length; n--; )
                e.removeMarker(a[n]);
            this.__lines = [],
            this.__routerMarkers = []
        },
        draw: function(t, e, a) {
            var n = this
              , i = n._parseRouterData(t, e, a || 0);
            n._drawRouterLine(i, e)
        },
        highlight: function(t, e) {
            var a = this.__lines
              , n = a[t];
            n && (n._normalOptions = n.getOptions(),
            n.setOptions(e || this.options.highlight))
        },
        normal: function(t) {
            var e = this.__lines
              , a = e[t];
            a && a._normalOptions && a.setOptions(a._normalOptions)
        },
        openStep: function(t) {
            var e, a, n = this._currentRouterData, i = n && n.segments;
            return t = parseInt(t, 10),
            i ? (e = i.length,
            void (t > -1 && t < e && (a = i[t],
            a._isLast = t + 1 === e,
            this.CMap.clearAllInfoWindows(),
            this._stepInfoWindow(a)))) : this
        },
        _stepInfoWindow: function(e) {
            var n, i = this.CMap, o = this.options;
            n = i.showInfoWindow({
                location: e.position
            }, null, {
                content: t.tmpl.render(o.infoWinTpl, e),
                autoFit: !0
            }),
            a.infoWin = n,
            a.__current = this
        },
        _drawRouterLine: function(t, e) {
            var n, i = this.CMap, o = e, r = this.options, s = t.origin, c = t.destination, l = t.polyline, p = i.addMarker({
                position: i.setLngLat(s),
                content: r.startMarkerIcon,
                offset: {
                    x: -16,
                    y: -34
                }
            });
            this.__routerMarkers.push(p);
            var h = i.addMarker({
                position: i.setLngLat(c),
                content: r.endMarkerIcon,
                offset: {
                    x: -16,
                    y: -34
                }
            });
            if (this.__routerMarkers.push(h),
            e === a.BUS && this._addRouterMarkers(t.markers),
            o === a.BUS)
                for (n = 0; n < l.length; n++)
                    this.__lines.push(i.addPolyline({
                        path: l[n].path,
                        strokeStyle: l[n].type == a.BUS ? "solid" : "dashed",
                        strokeColor: l[n].type == a.BUS ? "#8b8ced" : "#18B700",
                        strokeOpacity: .8,
                        strokeWeight: 7
                    }));
            else if (o === a.WALK)
                for (n = 0; n < l.length; n++)
                    this.__lines.push(i.addPolyline({
                        path: l[n],
                        strokeColor: "#18B700",
                        strokeOpacity: .8,
                        strokeWeight: 7
                    }));
            else if (o === a.DRIVE)
                for (n = 0; n < l.length; n++)
                    this.__lines.push(i.addPolyline({
                        path: l[n],
                        strokeColor: "#8b8ced",
                        strokeOpacity: .9,
                        strokeWeight: 7
                    }));
            i.autoFit([p, h])
        },
        getLines: function() {
            return this.__lines
        },
        _parseBusData: function(t, e) {
            var n, i, o, r = this, s = t.plans, c = t.origin, l = t.destination, p = [], h = [];
            if (s) {
                for (var u = 0; u < s.length; u++) {
                    i = s[u];
                    for (var d = (i.distance,
                    i.segments), _ = d.length, f = 0; f < _; f++)
                        r.isWalk(d[f]) ? u == e && (d[f].index = f,
                        p.push({
                            path: d[f].transit.path,
                            type: a.WALK
                        })) : u == e && (d[f].index = f,
                        p.push({
                            path: d[f].transit.path,
                            type: a.BUS
                        }))
                }
                n = s[e] && s[e].segments || [];
                for (var k = 0; k < n.length; k++)
                    r.isWalk(n[k]) ? (n[k].position = n[k].transit.origin,
                    h.push({
                        lnglat: n[k].transit.origin,
                        type: a.WALK
                    })) : (n[k].position = n[k].transit.on_station.location,
                    h.push({
                        lnglat: n[k].transit.on_station.location,
                        type: a.BUS
                    }));
                return o = {
                    origin: c,
                    data: s[e],
                    destination: l,
                    polyline: p,
                    segments: n,
                    markers: h
                },
                this._currentRouterData = o,
                o
            }
        },
        _parseWalkData: function(t, e) {
            for (var a, n, i, o = t.routes || [], r = t.origin, s = t.destination, c = [], l = [], p = 0; p < o.length; p++) {
                n = o[p];
                for (var h = n.steps, u = h.length, d = 0; d < u; d++)
                    c.push(h[d].path)
            }
            a = o[e] && o[e].steps || [];
            for (var _ = 0; _ < a.length; _++)
                a[_].index = _,
                a[_].position = a[_].path[0],
                l.push(a[_].path[0]);
            return i = {
                origin: r,
                data: o[e],
                destination: s,
                polyline: c,
                segments: a,
                markers: l
            },
            this._currentRouterData = i,
            i
        },
        _parseDriveData: function(t, e) {
            return this._parseWalkData(t, e)
        },
        _parseRouterData: function(t, e, n) {
            var i, o = this, r = e;
            return i = r == a.BUS ? o._parseBusData(t, n) : r == a.WALK ? o._parseWalkData(t, n) : r == a.DRIVE ? o._parseDriveData(t, n) : o._parseBusData(t, n)
        },
        isWalk: function(t) {
            return "WALK" === t.transit_mode
        },
        isBus: function(t) {
            return "SUBWAY" === t.transit_mode
        },
        _addRouterMarkers: function(t) {
            for (var e, n, i = this.CMap, o = this, r = this.options, s = 0; s < t.length; s++)
                e = t[s],
                e.index = s,
                n = i.addMarker({
                    content: e.type == a.BUS ? r.busMarkerIcon : r.walkMarkerIcon,
                    position: e.lnglat || e,
                    offset: {
                        x: -10,
                        y: -10
                    }
                }),
                n.markerInfo = {
                    index: s
                },
                n.bindEvent("click", function() {
                    o.openStep(n.markerInfo.index)
                }),
                this.__routerMarkers.push(n)
        },
        _searchBus: function(t, e, a) {
            this.CMap.addService("Transfer", function(n) {
                n.create({
                    city: encodeURIComponent(self.options.city),
                    policy: n.getPolicy("LEAST_TIME "),
                    onSearchSuccess: function(t) {
                        a(t)
                    }
                }),
                n.search(t, e)
            })
        },
        _searchDrive: function(t, e, a) {
            this.CMap.addService("Driving", function(n) {
                n.create({
                    policy: n.getPolicy("LEAST_TIME "),
                    onSearchSuccess: function(t) {
                        a(t)
                    }
                }),
                n.search(t, e)
            })
        },
        _searchWalk: function(t, e, a) {
            this.CMap.addService("Walking", function(n) {
                n.create({
                    onSearchSuccess: function(t) {
                        a(t)
                    }
                }),
                n.search(t, e)
            })
        }
    },
    a.BUS = 0,
    a.DRIVE = 1,
    a.WALK = 2,
    a.zoomLevel = 1,
    a.zoom = function(e) {
        e = t(e);
        var n = parseInt(e.attr("data-zoom"))
          , i = a.__current
          , o = i.CMap
          , r = e.attr("data-lnglat").split("|");
        i && (o.setZoomAndCenter(o.getZoom() + n, o.setLngLat({
            lng: r[0],
            lat: r[1]
        })),
        n > 0 ? (e.attr("data-zoom", -1),
        a.zoomLevel = -1,
        e.html("缩小")) : (e.attr("data-zoom", 1),
        a.zoomLevel = 1,
        e.html("放大")))
    }
    ,
    a.goStep = function(e, n, i) {
        e = t(e);
        var o = parseInt(e.attr("data-index"))
          , r = a.__current;
        i = i || window.event,
        i.stopPropagation && i.stopPropagation(),
        i.cancelBubble = !0,
        r && r.openStep(o + n)
    }
    ,
    e.Router = a
}(cQuery, cQuery.BizMod);
cQuery.BizMod = cQuery.BizMod || {},
function(t, e) {
    function i(e) {
        var i = {
            city: "上海",
            activeCls: "map_hover",
            markerTpl: t("#J_MarkerPopTpl").html(),
            distance: 500,
            onMarkerClick: function(t, e) {
                this.cMap.showInfoWindow(e)
            },
            cMap: r,
            onComplete: n
        };
        this.options = s(i, e),
        this.cMap = i.cMap,
        this.__markers = []
    }
    var n = function() {}
      , r = null
      , o = t.browser.isIPad ? "touchstart" : "click"
      , a = function(t, e, i) {
        var n = e ? i.document.createElement("div") : i.document.createDocumentFragment();
        return n.innerHTML = t,
        n
    }
      , c = "J_poiIcon"
      , s = t.extend;
    i.prototype = {
        constructor: i,
        search: function(t, e, i, n) {
            var r = this
              , o = r.options
              , a = this.cMap;
            e = e || o.onComplete,
            n = n || a.getMapCenter(),
            i = i || o.distance,
            a.addService("PlaceSearch", function(o) {
                o.create({
                    city: encodeURIComponent(r.options.city),
                    onSearchSuccess: function(t) {
                        e.call(r, t)
                    }
                }),
                o.search(t, n, i)
            })
        },
        draw: function(t, e) {
            this._addMarkers(this._parsePoiData(t), e)
        },
        setDistance: function(t) {
            return this.options.distance = t,
            this
        },
        clear: function() {
            for (var t = this.__markers, e = t.length; e--; )
                this.cMap.removeMarker(t[e])
        },
        setCity: function(t) {
            this.options.city = t
        },
        highlight: function(e, i) {
            var n, r = this.cMap;
            "string" == typeof e && (e = r.getMarkerList(e)),
            e && (n = t(e.getContent()).find("." + c),
            i ? (e.reset({
                zIndex: e._originZIndex
            }),
            n.removeClass(this.options.activeCls)) : (e.reset({
                zIndex: 9999
            }),
            n.addClass(this.options.activeCls)))
        },
        active: function(t) {
            var e = this.cMap;
            "string" == typeof t && (t = e.getMarkerList(t)),
            t.__poiMarkerActived = !0,
            this.highlight(t)
        },
        deactive: function(t) {
            var e = this.cMap;
            "string" == typeof t && (t = e.getMarkerList(t)),
            t.__poiMarkerActived = !1,
            this.highlight(t, !0)
        },
        isActive: function(t) {
            var e = this.cMap;
            if ("string" == typeof t && (t = e.getMarkerList(t)),
            t)
                return t.__poiMarkerActived
        },
        _parsePoiData: function(t) {
            var e = "OK" === t.info.toUpperCase() ? t.poiList.pois : r;
            return e
        },
        _addMarkers: function(e, i, n) {
            var r, c, s = this, p = e && e.length || 0, u = s.options, h = this.cMap, d = (CtripHotelMap.__infoWin || {},
            u.markerTpl);
            for (n = n || u.onMarkerClick; p--; )
                r = e[p],
                r.index = p,
                r.poiType = i,
                c = h.addMarker({
                    cpos: r.location,
                    cpix: "T" === IsGAT || "F" === IsLatlonOffset ? "0|0" : "-12|-27",
                    content: a(t.tmpl.render(d, r), "div", h.getCMapObject().ifmWin),
                    zIndex: p
                }, r.uid),
                c._originZIndex = p + 1,
                s.__markers.push(c),
                function(t, e, i) {
                    t.bindEvent(o, function(i) {
                        i && (i.target = t),
                        n.call(s, i, e)
                    }).bindEvent("mouseover", function(i) {
                        i && (i.target = t),
                        u.onMarkerMouseOver.call(s, i, e)
                    }).bindEvent("mouseout", function(i) {
                        i && (i.target = t),
                        u.onMarkerMouseOut.call(s, i, e)
                    })
                }(c, e[p], p)
        }
    },
    e.Poi = i
}(cQuery, cQuery.BizMod);
cQuery.BizMod = cQuery.BizMod || {},
function(t, e) {
    function i(t) {
        return t.toLowerCase().replace(/-([a-z])/g, function(t, e) {
            return e.toUpperCase()
        })
    }
    function s(t) {
        return t = i(t),
        t.slice(0, 1).toUpperCase() + t.slice(1)
    }
    function a(t, e) {
        e = e || window;
        var i = e.document.createElement("div");
        return i.innerHTML = t,
        i.children
    }
    function n(t) {
        var e = {
            ftl: '<div class="radius_choose_box">                    <a href="javascript:;" class="close" data-click-action="close">×</a>                    <p class="p">当前：<span class="distance"><input type="text" readonly="readyonly" value="0" id="J_distanceDisplay"/>公里</span></p>                    <div class="radius_choose">                        <a href="javascript:;" data-distance="0.5" data-click-action="set-distance">0.5公里</a>                        <a href="javascript:;" data-distance="1" data-click-action="set-distance">1公里</a>                        <a href="javascript:;" data-distance="2" data-click-action="set-distance">2公里</a>                        <a href="javascript:;" data-distance="5" data-click-action="set-distance">5公里</a>                    </div>                    <p class="p">可拖动手柄或点击按钮选择范围</p>                </div>',
            data: c,
            itemActiveCls: "selected",
            distanceDisplayCls: "#J_distanceDisplay",
            distanceFormatter: function(t) {
                return Math.round(t / 100) / 10
            },
            distance: 5,
            onSelect: r,
            onClose: r,
            onInit: r,
            refer: c,
            position: "0|0",
            offset: "10|10",
            isAuto: !1,
            cMap: c
        };
        this.options = d(e, t),
        this.cMap = e.cMap,
        this._init()
    }
    var r = function() {}
      , c = null
      , o = t.browser.isIPad ? "touchstart" : "click"
      , d = t.extend;
    n.prototype = {
        constructor: n,
        _init: function() {
            var e = this.options;
            this._renderUI()._bindEvents(),
            this._distanceDisplay = t(this._marker.getContent()).find(e.distanceDisplayCls),
            this._refer = e.refer,
            this.options.onInit.call(this)
        },
        _renderUI: function() {
            var t = this.options;
            return this._createWrapMarker(t.position),
            this
        },
        _createWrapMarker: function(e) {
            var i = this.cMap
              , s = this.options
              , n = s.data
              , r = a(n ? t.tmpl.render(s.ftl, n) : s.ftl, i.getCMapObject().ifmWin);
            this._marker = i.addMarker({
                cpos: e,
                cpix: s.offset,
                content: r[0],
                zIndex: 10
            })
        },
        _bindEvents: function() {
            var e = this
              , i = t(this._marker.getContent());
            i.bind(o, function(i) {
                var a = t(i.target)
                  , n = a.attr("data-click-action")
                  , r = e.options
                  , c = n && r["on" + s(n)];
                c && c.call(e, i, a)
            })
        },
        show: function() {
            this.dragger.show(),
            this._marker.show()
        },
        hide: function() {
            this.dragger.hide(),
            this._marker.hide()
        },
        select: function(t) {
            var e = this.options.itemActiveCls
              , i = this._selected;
            i && i.removeClass(e),
            t ? (t.addClass(e),
            this._selected = t) : this._selected = null
        },
        reset: function() {
            this.select(null),
            this._distanceDisplay.value(this.options.distance)
        },
        setRefer: function(t) {
            return this._refer = t,
            this
        },
        update: function(t, e) {
            e = e || this._refer;
            var i = this.cMap
              , s = t.getPosition()
              , a = i.getDistance(e, s);
            this.dragger = t,
            this.reposition(s).updateDistance(a)
        },
        restore: function() {
            var t = this.dragger
              , e = this._marker;
            t && t.setMap(),
            e && e.setMap(),
            this.reset()
        },
        reposition: function(t) {
            return this._marker.setPosition(t),
            this
        },
        updateDistance: function(t, e) {
            return this._distanceDisplay.value(this.options.distanceFormatter(t / 1.15)),
            this
        }
    },
    e.DistanceMoniter = n
}(cQuery, cQuery.BizMod);
!function(t, e) {
    "use strict";
    var i, n, s, o, a, r, c, p, h, l, u, d, f, g, _, m, v, C, y, M = {
        extend: function() {
            var t, i, n, s = arguments[0] || {}, o = 1, a = arguments.length, r = !1;
            for ("boolean" == typeof s && (r = s,
            s = arguments[1] || {},
            o = 2),
            a === o && (s = this,
            --o); o < a; o++)
                if (null != (t = arguments[o]))
                    for (n in t)
                        i = t[n],
                        s !== i && i !== e && (s[n] = i);
            return s
        },
        create: function(t, e) {
            var i = document.createElement(t);
            for (var n in e)
                e.hasOwnProperty(n) && ("cssText" == n ? i.style[n] = e[n] : i[n] = e[n]);
            return i
        },
        console: function(e) {
            t.console && console.warn && console.warn("bmap.js error: " + e)
        },
        addEventListener: function(t, e, i) {
            t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent("on" + e, i)
        },
        isArray: function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        isFunction: function(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        },
        isString: function(t) {
            return "[object String]" === Object.prototype.toString.call(t)
        },
        isNullOrUndefined: function(t) {
            return t == e || "undefined" == typeof t
        },
        getFirstValDefault: function(t, e) {
            return this.isNullOrUndefined(t) ? e : t
        },
        MeterToKilometer: function(t) {
            var e;
            return e = t <= 1e3 ? t + "米" : "约" + Math.round(t / 1e3) + "公里"
        },
        getCity: function(t) {
            var e = {
                "010": "北京市",
                "022": "天津市",
                "021": "上海市",
                "023": "重庆市",
                311: "石家庄市",
                315: "唐山市",
                335: "秦皇岛市",
                310: "邯郸市",
                319: "邢台市",
                312: "保定市",
                313: "张家口市",
                314: "承德市",
                317: "沧州市",
                316: "廊坊市",
                318: "衡水市",
                351: "太原市",
                352: "大同市",
                353: "阳泉市",
                355: "长治市",
                356: "晋城市",
                349: "朔州市",
                354: "晋中市",
                359: "运城市",
                350: "忻州市",
                357: "临汾市",
                358: "吕梁市",
                471: "呼和浩特市",
                472: "包头市",
                473: "乌海市",
                476: "赤峰市",
                475: "通辽市",
                477: "鄂尔多斯市",
                470: "呼伦贝尔市",
                478: "巴彦淖尔市",
                474: "乌兰察布市",
                482: "兴安盟",
                479: "锡林郭勒盟",
                483: "阿拉善盟",
                "024": "沈阳市",
                411: "大连市",
                412: "鞍山市",
                413: "抚顺市",
                414: "本溪市",
                415: "丹东市",
                416: "锦州市",
                417: "营口市",
                418: "阜新市",
                419: "辽阳市",
                427: "盘锦市",
                410: "铁岭市",
                421: "朝阳市",
                429: "葫芦岛市",
                431: "长春市",
                432: "吉林市",
                434: "四平市",
                437: "辽源市",
                435: "通化市",
                439: "白山市",
                438: "松原市",
                436: "白城市",
                1433: "延边朝鲜族自治州",
                451: "哈尔滨市",
                452: "齐齐哈尔市",
                467: "鸡西市",
                468: "鹤岗市",
                469: "双鸭山市",
                459: "大庆市",
                458: "伊春市",
                454: "佳木斯市",
                464: "七台河市",
                453: "牡丹江市",
                456: "黑河市",
                455: "绥化市",
                457: "大兴安岭地区",
                "025": "南京市",
                510: "无锡市",
                516: "徐州市",
                519: "常州市",
                512: "苏州市",
                513: "南通市",
                518: "连云港市",
                517: "淮安市",
                515: "盐城市",
                514: "扬州市",
                511: "镇江市",
                523: "泰州市",
                527: "宿迁市",
                571: "杭州市",
                574: "宁波市",
                577: "温州市",
                573: "嘉兴市",
                572: "湖州市",
                575: "绍兴市",
                579: "金华市",
                570: "衢州市",
                580: "舟山市",
                576: "台州市",
                578: "丽水市",
                551: "合肥市",
                553: "芜湖市",
                552: "蚌埠市",
                554: "淮南市",
                555: "马鞍山市",
                561: "淮北市",
                562: "铜陵市",
                556: "安庆市",
                559: "黄山市",
                550: "滁州市",
                1558: "阜阳市",
                557: "宿州市",
                564: "六安市",
                558: "亳州市",
                566: "池州市",
                563: "宣城市",
                591: "福州市",
                592: "厦门市",
                594: "莆田市",
                598: "三明市",
                595: "泉州市",
                596: "漳州市",
                599: "南平市",
                597: "龙岩市",
                593: "宁德市",
                791: "南昌市",
                798: "景德镇市",
                799: "萍乡市",
                792: "九江市",
                790: "新余市",
                701: "鹰潭市",
                797: "赣州市",
                796: "吉安市",
                795: "宜春市",
                794: "抚州市",
                793: "上饶市",
                531: "济南市",
                532: "青岛市",
                533: "淄博市",
                632: "枣庄市",
                546: "东营市",
                535: "烟台市",
                536: "潍坊市",
                537: "济宁市",
                538: "泰安市",
                631: "威海市",
                633: "日照市",
                634: "莱芜市",
                539: "临沂市",
                534: "德州市",
                635: "聊城市",
                543: "滨州市",
                530: "菏泽市",
                371: "郑州市",
                378: "开封市",
                379: "洛阳市",
                375: "平顶山市",
                372: "安阳市",
                392: "鹤壁市",
                373: "新乡市",
                391: "焦作市",
                393: "濮阳市",
                374: "许昌市",
                395: "漯河市",
                398: "三门峡市",
                377: "南阳市",
                370: "商丘市",
                376: "信阳市",
                394: "周口市",
                396: "驻马店市",
                1391: "济源市",
                "027": "武汉市",
                714: "黄石市",
                719: "十堰市",
                717: "宜昌市",
                710: "襄阳市",
                711: "鄂州市",
                724: "荆门市",
                712: "孝感市",
                716: "荆州市",
                713: "黄冈市",
                715: "咸宁市",
                722: "随州市",
                718: "恩施土家族苗族自治州",
                728: "仙桃市",
                2728: "潜江市",
                1728: "天门市",
                1719: "神农架林区",
                731: "长沙市",
                733: "株洲市",
                732: "湘潭市",
                734: "衡阳市",
                739: "邵阳市",
                730: "岳阳市",
                736: "常德市",
                744: "张家界市",
                737: "益阳市",
                735: "郴州市",
                746: "永州市",
                745: "怀化市",
                738: "娄底市",
                743: "湘西土家族苗族自治州",
                "020": "广州市",
                751: "韶关市",
                755: "深圳市",
                756: "珠海市",
                754: "汕头市",
                757: "佛山市",
                750: "江门市",
                759: "湛江市",
                668: "茂名市",
                758: "肇庆市",
                752: "惠州市",
                753: "梅州市",
                660: "汕尾市",
                762: "河源市",
                662: "阳江市",
                763: "清远市",
                769: "东莞市",
                760: "中山市",
                768: "潮州市",
                663: "揭阳市",
                766: "云浮市",
                771: "南宁市",
                772: "柳州市",
                773: "桂林市",
                774: "梧州市",
                779: "北海市",
                770: "防城港市",
                777: "钦州市",
                1755: "贵港市",
                775: "玉林市",
                776: "百色市",
                1774: "贺州市",
                778: "河池市",
                1772: "来宾市",
                1771: "崇左市",
                898: "海口市",
                899: "三亚市",
                2898: "三沙市",
                1897: "五指山市",
                1894: "琼海市",
                805: "儋州市",
                1893: "文昌市",
                1898: "万宁市",
                807: "东方市",
                806: "定安县",
                1892: "屯昌县",
                804: "澄迈县",
                1896: "临高县",
                802: "白沙黎族自治县",
                803: "昌江黎族自治县",
                2802: "乐东黎族自治县",
                809: "陵水黎族自治县",
                801: "保亭黎族苗族自治县",
                1899: "琼中黎族苗族自治县",
                "028": "成都市",
                813: "自贡市",
                812: "攀枝花市",
                830: "泸州市",
                838: "德阳市",
                816: "绵阳市",
                839: "广元市",
                825: "遂宁市",
                1832: "内江市",
                833: "乐山市",
                817: "南充市",
                1833: "眉山市",
                831: "宜宾市",
                826: "广安市",
                818: "达州市",
                835: "雅安市",
                827: "巴中市",
                832: "资阳市",
                837: "阿坝藏族羌族自治州",
                836: "甘孜藏族自治州",
                834: "凉山彝族自治州",
                851: "贵阳市",
                858: "六盘水市",
                852: "遵义市",
                853: "安顺市",
                857: "毕节市",
                856: "铜仁市",
                859: "黔西南布依族苗族自治州",
                855: "黔东南苗族侗族自治州",
                854: "黔南布依族苗族自治州",
                871: "昆明市",
                874: "曲靖市",
                877: "玉溪市",
                875: "保山市",
                870: "昭通市",
                888: "丽江市",
                879: "普洱市",
                883: "临沧市",
                878: "楚雄彝族自治州",
                873: "红河哈尼族彝族自治州",
                876: "文山壮族苗族自治州",
                691: "西双版纳傣族自治州",
                872: "大理白族自治州",
                692: "德宏傣族景颇族自治州",
                886: "怒江傈僳族自治州",
                887: "迪庆藏族自治州",
                891: "拉萨市",
                892: "日喀则市",
                895: "昌都市",
                893: "山南地区",
                896: "那曲地区",
                897: "阿里地区",
                894: "林芝地区",
                "029": "西安市",
                919: "铜川市",
                917: "宝鸡市",
                910: "咸阳市",
                913: "渭南市",
                911: "延安市",
                916: "汉中市",
                912: "榆林市",
                915: "安康市",
                914: "商洛市",
                931: "兰州市",
                1937: "嘉峪关市",
                935: "金昌市",
                943: "白银市",
                938: "天水市",
                1935: "武威市",
                936: "张掖市",
                933: "平凉市",
                937: "酒泉市",
                934: "庆阳市",
                932: "定西市",
                2935: "陇南市",
                930: "临夏回族自治州",
                941: "甘南藏族自治州",
                971: "西宁市",
                972: "海东市",
                970: "海北藏族自治州",
                973: "黄南藏族自治州",
                974: "海南藏族自治州",
                975: "果洛藏族自治州",
                976: "玉树藏族自治州",
                977: "海西蒙古族藏族自治州",
                951: "银川市",
                952: "石嘴山市",
                953: "吴忠市",
                954: "固原市",
                1953: "中卫市",
                991: "乌鲁木齐市",
                990: "克拉玛依市",
                995: "吐鲁番地区",
                902: "哈密地区",
                994: "昌吉回族自治州",
                909: "博尔塔拉蒙古自治州",
                996: "巴音郭楞蒙古自治州",
                997: "阿克苏地区",
                908: "克孜勒苏柯尔克孜自治州",
                998: "喀什地区",
                903: "和田地区",
                999: "伊犁哈萨克自治州",
                901: "塔城地区",
                906: "阿勒泰地区",
                993: "石河子市",
                1997: "阿拉尔市",
                1998: "图木舒克市",
                1994: "五家渠市",
                1906: "北屯市",
                1996: "铁门关市",
                1909: "双河市",
                1852: "香港特别行政区",
                1853: "澳門特别行政区",
                1886: "台湾",
                "台北": "台北市",
                "台中": "台中市",
                "台南": "台南市",
                "基隆": "基隆市",
                "新竹": "新竹市",
                "嘉义": "嘉义市"
            };
            return t = decodeURIComponent(t),
            e[t] || t
        },
        params: function(t) {
            var e = [];
            for (var i in t)
                t.hasOwnProperty(i) && e.push(i + "=" + t[i]);
            return e.join("&")
        },
        isHTMLElement: function(t) {
            var e = document.createElement("div");
            try {
                return e.appendChild(t.cloneNode(!0)),
                1 === t.nodeType
            } catch (i) {
                return !1
            }
        },
        createEvent: function(t, e) {
            var i = null;
            if (document.createEvent) {
                i = document.createEvent("HTMLEvents"),
                i.initEvent(e, !0, !0);
                var n = 1;
                try {
                    cQuery.extend(i, {
                        target: t
                    }),
                    t == i.target && (n = 0)
                } catch (s) {}
                if (n) {
                    i.skip = !0;
                    try {
                        t.dispatchEvent(i)
                    } catch (s) {}
                    try {
                        delete i.skip
                    } catch (o) {
                        i.skip = !1
                    }
                }
            } else if (document.createEventObject) {
                i = document.createEventObject();
                var n = 1;
                try {
                    cQuery.extend(i, {
                        srcElement: t,
                        type: e
                    }),
                    t == i.srcElement && (n = 0)
                } catch (s) {}
                if (n) {
                    i.skip = !0;
                    try {
                        t.fireEvent("on" + e, i)
                    } catch (s) {}
                    try {
                        delete i.skip
                    } catch (s) {
                        i.skip = !1
                    }
                }
            }
            return i
        },
        intersects: function(t, e) {
            return t.x < e.x + e.width && e.x < t.x + t.width && t.y < e.y + e.height && e.y < t.y + t.height
        }
    }, b = {
        amapPointOffset: function(t, e, i) {
            var n, s, o = 2 * Math.asin(Math.sin(Math.round(e) / 12756274) / Math.cos(t.lat * Math.PI / 180)), o = t.lng + 180 * o / Math.PI, a = 2 * Math.asin(Math.round(i) / 12756274), a = t.lat + 180 * a / Math.PI;
            return a = parseFloat(a),
            o = parseFloat(o),
            (isNaN(a) || isNaN(o)) && M.console("Invalid Object: LngLat(" + o + ", " + a + ")"),
            o !== !0 && (a = Math.max(Math.min(a, 90), -90),
            o = (o + 180) % 360 + (-180 > o || 180 === o ? 180 : -180)),
            n = parseFloat(o.toFixed(6)),
            s = parseFloat(a.toFixed(6)),
            {
                lng: n,
                lat: s
            }
        },
        convertGCJ02ToBD09: function(t, e) {
            var i, n, s = 52.35987755982988, o = e, a = t;
            return i = Math.sqrt(o * o + a * a) + 2e-5 * Math.sin(a * s),
            n = Math.atan2(a, o) + 3e-6 * Math.cos(o * s),
            {
                lng: i * Math.cos(n) + .0065,
                lat: i * Math.sin(n) + .006
            }
        },
        convertBD09ToGCJ02: function(t, e) {
            var i, n, s = 52.35987755982988, o = e - .0065, a = t - .006;
            return i = Math.sqrt(o * o + a * a) - 2e-5 * Math.sin(a * s),
            n = Math.atan2(a, o) - 3e-6 * Math.cos(o * s),
            {
                lng: i * Math.cos(n),
                lat: i * Math.sin(n)
            }
        }
    }, O = function() {}, P = location.href.toLowerCase().indexOf("jsdebug=t") > 0, w = $.BizMod.Util, x = $.BizMod.Class, S = $.BizMod.Promise, A = {
        LEAST_TIME: "BMAP_TRANSIT_POLICY_LEAST_TIME",
        LEAST_TRANSFER: "BMAP_TRANSIT_POLICY_LEAST_TRANSFER",
        LEAST_WALK: "BMAP_TRANSIT_POLICY_LEAST_WALKING",
        NO_SUBWAY: "BMAP_TRANSIT_POLICY_AVOID_SUBWAYS"
    }, k = {
        LEAST_DISTANCE: "BMAP_DRIVING_POLICY_AVOID_HIGHWAYS",
        REAL_TRAFFIC: "BMAP_DRIVING_POLICY_LEAST_TIME",
        LEAST_FEE: "BMAP_DRIVING_POLICY_LEAST_DISTANCE"
    }, L = 0, j = 0;
    if (t.CtripHotelMap)
        return void M.console("Error: CtripHotelMap namespace is defined!please check namespace 'CtripHotelMap'");
    i = x({
        __properties__: function() {
            this.opts,
            this.markerList,
            this.__zoomList,
            this.cMapObject,
            this.__infoWindows = []
        },
        initialize: function(t) {
            var e = {
                el: document.body,
                cityCode: null,
                width: 500,
                height: 500,
                mapEl: null,
                iframe: {
                    src: addressUrlConfig && M.isString(addressUrlConfig.mapIframe) ? addressUrlConfig.mapIframe : "/Domestic/MapIframeDetail.aspx",
                    frameBorder: "none",
                    scrolling: "no",
                    cssText: "width:100%;height:100%;display:none;"
                }
            };
            if (this.markerList = {
                _uidCode: 0
            },
            this.__zoomList = [],
            this.opts = M.extend(e, t),
            this.opts.map && this.opts.map.level) {
                var i = this.opts.map.level;
                i = i >= 16 ? i : i + 1,
                this.opts.map.level = i
            }
        },
        _posCurrentCity: function(t, i, n) {
            if (2 === arguments.length && (n = i,
            i = t,
            t = this.getCMapObject().BMap),
            M.isFunction(n)) {
                !this.cMapObject && (this.cMapObject = {
                    BMap: t
                });
                var s, o = this;
                switch (i) {
                case "00852":
                    s = b.convertGCJ02ToBD09(22.320048, 114.173355),
                    n(this.setLngLat(s));
                    break;
                case "00853":
                    s = b.convertGCJ02ToBD09(22.198951, 113.54909),
                    n(this.setLngLat(s));
                    break;
                case "":
                case e:
                case null:
                    s = {
                        lng: 121.4944849617,
                        lat: 31.254870957599
                    },
                    n(this.setLngLat(s));
                    break;
                default:
                    this.addService("Geocoder", function(t) {
                        t.create(),
                        t.getLocation(M.getCity(i), function(t) {
                            s = "ok" === t.info.toLowerCase() && t.resultNum > 0 ? t.geocodes[0].location : {
                                lat: 0,
                                lng: 0
                            },
                            n(o.setLngLat(s))
                        })
                    })
                }
            }
        },
        makeMap: function(t) {
            var e = M.create("iframe", this.opts.iframe)
              , i = this;
            M.addEventListener(e, "load", function() {
                var n, s = e.window || e.contentWindow, o = i.opts.mapEl || (i.opts.mapEl = s.document.getElementById("map")), a = s.BMap, r = s.BMapLib, c = i.opts.mapSide;
                o && a ? (i.setMapSize(i.opts.width, i.opts.height, o),
                e.style.display = "",
                i._posCurrentCity(a, i.opts.cityCode, function(p) {
                    var h, l, u, d = M.extend({
                        center: p,
                        scrollWheel: !0
                    }, i.opts.map);
                    h = d.level,
                    l = d.center,
                    u = i._initBMapOptions(d),
                    n = new a.Map(o.id,u),
                    i.cMapObject = {
                        ifmWin: s,
                        ifm: e,
                        mapEl: o,
                        BMap: a,
                        mapObj: n,
                        mapSide: c,
                        mapBox: i.opts.el,
                        BMapLib: r,
                        map: i
                    },
                    !1 === d.dragEnable && i.disableDragging(),
                    i._setMinZoom(4),
                    i._setZoomAndCenter(h, l),
                    i.setScrollWheelZoom(d.scrollWheel),
                    i.setDoubleClickZoom(d.doubleClickZoom),
                    t(i.cMapObject)
                })) : M.console("Error: create map fail!")
            }),
            this.opts.el.appendChild(e)
        },
        deleteMap: function() {
            var t = this.getCMapObject();
            t.mapObj.clearOverlays()
        },
        setMapSize: function(t, e, i) {
            var n = this.cMapObject || {}
              , s = n.mapEl || i
              , o = n.ifm;
            if (s) {
                var a = this.opts.mapSide || document.getElementById("J_mapSide")
                  , r = n.mapBox || this.opts.el;
                t && (t = parseInt(t, 10) + "px",
                r.style.width = t,
                s.style.width = t,
                o && (o.style.width = t)),
                e && (e = parseInt(e, 10) + "px",
                r.style.height = e,
                s.style.height = e,
                o && (o.style.height = e),
                a && (a.style.height = e))
            }
        },
        getDistance: function(t, e) {
            return this.getCMapObject().mapObj.getDistance(t, e)
        },
        getCMapObject: function() {
            var t = this.cMapObject;
            return t ? t : (M.console("please 'makeMap' first!"),
            !1)
        },
        setPixel: function(t) {
            var e = this.getCMapObject();
            if (!e)
                return "";
            switch (typeof t) {
            case "object":
                return t;
            case "string":
                var i = t.split("|");
                return new e.BMap.Pixel(i[0],i[1])
            }
            return new e.BMap.Pixel(0,0)
        },
        setLngLat: function(t) {
            var e, i = this.getCMapObject();
            if (!i)
                return "";
            switch (typeof t) {
            case "object":
                if (M.isNullOrUndefined(t.lng) || M.isNullOrUndefined(t.lat))
                    return t;
                e = new i.BMap.Point(t.lng,t.lat);
                break;
            case "string":
                var n = t.split("|");
                e = new i.BMap.Point(n[0],n[1])
            }
            return e || (e = new i.BMap.Point(0,0)),
            e
        },
        setSize: function(t) {
            var e = this.getCMapObject();
            if (!e)
                return "";
            switch (typeof t) {
            case "object":
                return t;
            case "string":
                var i = t.split("|");
                return new e.BMap.Size(i[0],i[1])
            }
            return new e.BMap.Size(0,0)
        },
        getUID: function() {
            return "cmapMarker_" + this.markerList._uidCode + "".slice.call(Math.random(), 2)
        },
        addIcon: function(t) {
            var e = this.getCMapObject();
            if (!e)
                return !1;
            t = t || {},
            !t.imageOffset && t.offset && (t.imageOffset = this.setPixel(t.offset)),
            t.size = this.setSize(t.size);
            var i = M.extend({
                size: null,
                image: "",
                imageOffset: this.setPixel()
            }, t)
              , n = i.image
              , s = i.size;
            return new e.BMap.Icon(n,s,i)
        },
        removeMarker: function(t) {
            if (t) {
                var e = "object" == typeof t ? t._cUid : t
                  , i = this.getMarkerList(e);
                i && (i.remove(),
                delete this.markerList[e])
            }
        },
        getMarkerList: function(t) {
            return t ? this.markerList[t] : this.markerList
        },
        addMarker: function(t, e) {
            var i = this.getCMapObject();
            if (!i)
                return !1;
            t = t || {};
            var n = '<img src="//pic.c-ctrip.com/hotels110127/hotel_pointer.png">'
              , o = e || "cmapMarker_" + this.markerList._uidCode + 1e4 * Math.random().toFixed(4)
              , a = M.extend({
                CMap: this,
                cUid: o,
                content: n
            }, t)
              , r = this.getMarkerList(o);
            return r ? r.reset(a, !0) : (this.markerList._uidCode++,
            r = new s(a),
            r && (this.markerList[o] = r,
            this.__zoomList.push(r))),
            r
        },
        addPolyline: function(t) {
            return t = M.extend({
                CMap: this
            }, t || {}),
            new a(t)
        },
        addPolygon: function(t) {
            return t = M.extend({
                CMap: this
            }, t || {}),
            new r(t)
        },
        addCircle: function(t, e) {
            var i = $.browser.isIPad
              , n = this.getCMapObject();
            if (!n)
                return !1;
            t = t || {};
            var s = M.extend({
                CMap: this,
                map: n.mapObj,
                center: this.setLngLat(t.cpos),
                radius: 5e3,
                strokeColor: "#2577E3",
                strokeOpacity: 1,
                strokeWeight: 3,
                fillColor: "ee2200",
                fillOpacity: .35,
                cCanDrag: !0,
                zooms: [3, 16],
                cDragPix: i ? "-11|-11" : "-5|-5",
                cEvent: {},
                cDragContent: '<div style="' + (i ? "width:22px;height:22px;" : "width:10px;height:10px;") + 'border-radius:50% 50%;background:#fff;border:1px solid #000;"></div>'
            }, t)
              , a = new o(s);
            return M.isFunction(e) && e(a),
            a
        },
        autoFit: function(t) {
            var e, i = this.getCMapObject().mapObj, n = [];
            if (t && t && t.each(function(t) {
                if (t && (M.isNullOrUndefined(t.isVisible) || t.isVisible()))
                    switch (t._name) {
                    case "marker":
                        n.push(t.getPosition());
                        break;
                    case "circle":
                        n = n.concat(t.getPath()),
                        t.autoZoom();
                        break;
                    case "polyline":
                        n = n.concat(t.getPath());
                        break;
                    case "polygon":
                        n = n.concat(t.getPath());
                        break;
                    case "infoWindow":
                        n = n.concat(t.getPath())
                    }
            }),
            !n.length && (t = i.getOverlays()))
                for (var s = 0, o = t.length; s < o; s++)
                    e = t[s],
                    e && e.isVisible() && (M.isFunction(e.getPath) ? n = n.concat(e.getPath()) : M.isFunction(e.getPosition) && n.push(e.getPosition()));
            i.setViewport(n)
        },
        addPlugin: function(t, e) {
            var i = this
              , n = []
              , s = [];
            M.isString(t) || M.isArray(t) ? n = [].concat(t) : M.console("plugins must be string or array");
            for (var o = 0; o < n.length; o++)
                switch (n[o]) {
                case "Scale":
                    s.push(new c(i));
                    break;
                case "OverView":
                    s.push(new p(i));
                    break;
                case "ToolBar":
                    s.push(new h(i));
                    break;
                case "MouseTool":
                    s.push(new l(i))
                }
            M.isFunction(e) && e.apply(null, s)
        },
        addService: function(t, e) {
            var i = this
              , n = []
              , s = [];
            M.isString(t) || M.isArray(t) ? n = [].concat(t) : M.console("service must be string or array");
            for (var o = 0; o < n.length; o++)
                switch (n[o]) {
                case "Geocoder":
                    s.push(new C(i));
                    break;
                case "Walking":
                    s.push(new m(i));
                    break;
                case "Driving":
                    s.push(new _(i));
                    break;
                case "Transfer":
                    s.push(new g(i));
                    break;
                case "Autocomplete":
                    s.push(new v(i));
                    break;
                case "PlaceSearch":
                    s.push(new y(i));
                    break;
                default:
                    M.console("unknow service: " + n[o])
                }
            M.isFunction(e) && e.apply(null, s)
        },
        setDefaultCursor: function(t) {
            this.getCMapObject().mapObj.setDefaultCursor(t)
        },
        listenerMap: function(t, e) {
            return M.isFunction(e) && this._addListener(this.getCMapObject().mapObj, t, e),
            this
        },
        removeMapListener: function(t, e) {
            return M.isFunction(e) && M.isString(t) && this._removeListener(this.getCMapObject().mapObj, t, e),
            this
        },
        _addListener: function(t, e, i, n) {
            return M.isFunction(i) && M.isString(e) && t.addEventListener(e, i),
            this
        },
        _removeListener: function(t, e, i) {
            return M.isFunction(i) && M.isString(e) && t.removeEventListener(e, i),
            this
        },
        trigger: function(t, e, i) {
            var n;
            switch (t._name) {
            case "marker":
                n = t._marker;
                break;
            case "circle":
                n = t._circle;
                break;
            case "polyline":
                n = t._polyline;
                break;
            case "polygon":
                n = t._polygon;
                break;
            default:
                M.console("trigger: " + $.stringifyJSON(t)),
                n = t
            }
            M.isFunction(n.trigger) ? n.trigger(e, i) : M.console(t._name + "do not has trigger function!")
        },
        setZoomAndCenter: function(t, e) {
            t = this._convertMapLevel(t),
            this.getCMapObject().mapObj.centerAndZoom(e, t)
        },
        _setZoomAndCenter: function(t, e) {
            this.getCMapObject().mapObj.centerAndZoom(e, t)
        },
        _setMinZoom: function(t) {
            this.getCMapObject().mapObj.setMinZoom(t)
        },
        disableDragging: function() {
            this.getCMapObject().mapObj.disableDragging()
        },
        setScrollWheelZoom: function(t) {
            var e = this.getCMapObject().mapObj
              , i = t ? "enableScrollWheelZoom" : "disableScrollWheelZoom";
            e[i]()
        },
        setDoubleClickZoom: function(t) {
            if ("undefined" != typeof t) {
                var e = this.getCMapObject().mapObj
                  , i = t ? "enableDoubleClickZoom" : "disableDoubleClickZoom";
                e[i]()
            }
        },
        getCenterDistance: function(t, e) {
            var i;
            return i = e ? e.getPosition() : this.getMapCenter(),
            this.getCMapObject().mapObj.getDistance(t, i)
        },
        getMapCenter: function() {
            return this.getCMapObject().mapObj.getCenter()
        },
        getZoom: function() {
            var t = this.getCMapObject();
            return t.mapObj.getZoom()
        },
        setCenter: function(t) {
            var e = this.getCMapObject().mapObj
              , i = e.getZoom();
            this.opts.map && this.opts.map.level && (i = this.opts.map.level),
            t = this.setLngLat(t),
            this._setZoomAndCenter(i, t)
        },
        setBounds: function(t) {
            this.getCMapObject().mapObj.setViewport(t, {
                enableAnimation: !0
            })
        },
        panTo: function(t) {
            this.getCMapObject().mapObj.panTo(t)
        },
        lngLatToContainer: function(t, e) {
            return this.getCMapObject().mapObj.pointToPixel(this.setLngLat(t), parseInt(e, 10))
        },
        getBounds: function() {
            return this.getCMapObject().mapObj.getBounds()
        },
        addOverlay: function(t) {
            t && this.getCMapObject().mapObj.addOverlay(t)
        },
        _initBMapOptions: function(t) {
            var e = {
                enableMapClick: !1
            };
            t.resizeEnable && (e.enableAutoResize = !0);
            var i = t.zooms;
            return i && i.length > 0 && (e.minZoom = i[0],
            e.maxZoom = i[1]),
            e
        },
        createOverlay: function(t) {
            this._initComplexCustomOverlay();
            var e = new n(t);
            return this.addOverlay(e),
            e
        },
        _initComplexCustomOverlay: function() {
            var t;
            M.isFunction(n) || (t = this.getCMapObject().BMap,
            n = function(t) {
                t = this._checkOpts(t),
                this._point = t.position || "",
                this._title = t.title || "",
                this._cursor = t.cursor || "",
                this._extData = t.extData,
                this._offset = t.offset || {
                    x: 0,
                    y: 0
                },
                this._content = t.content,
                this._div = null,
                this._callback = t.callback,
                this._eventHandler = {},
                this._initialized = !1,
                this._autoFit = t.autoFit,
                this._CMap = t.CMap
            }
            ,
            n.prototype = new t.Overlay,
            n.prototype.initialize = function(t) {
                this._map = t;
                var e = this._div = document.createElement("div");
                e.style.position = "absolute",
                e.title = this._text || "",
                this._cursor && (e.style.cursor = this._cursor),
                this._content && this.setContent(this._content),
                t.getPanes().markerMouseTarget.appendChild(e);
                var i = this._eventHandler;
                for (var n in i) {
                    var s = i[n];
                    if (s)
                        for (var o = 0, a = s.length; o < a; o++) {
                            var r = s[o];
                            $.event.add(e, n, r)
                        }
                }
                return this._initialized = !0,
                e
            }
            ,
            n.prototype.correctOffset = function() {
                var t = $(this._div)
                  , e = t.find(".ico_mark")
                  , i = t.find(".map_num")
                  , n = t.find(".spot_htl_hover");
                switch (this._offset.y = -t.offset().height,
                !0) {
                case 0 != e.length:
                    this._offset.x = -e.offset().width / 2;
                    break;
                case 0 != i.length:
                    this._offset.x = -i.offset().width / 2;
                    break;
                case 0 != n.length:
                    this._offset.x = -n.offset().width / 2
                }
                this._offset.x -= 1
            }
            ,
            n.prototype.draw = function() {
                var t = this._map
                  , e = t.pointToOverlayPixel(this._point);
                e && (this._div.style.left = e.x + this._offset.x + "px",
                this._div.style.top = e.y + this._offset.y + "px")
            }
            ,
            n.prototype.getContent = function() {
                return this._div
            }
            ,
            n.prototype.getIcon = function() {
                return this._div
            }
            ,
            n.prototype.getPosition = function() {
                return this._point
            }
            ,
            n.prototype.setPosition = function(t) {
                this._point = t;
                var e = this._map.pointToOverlayPixel(this._point);
                e && (this._div.style.left = e.x + this._offset.x + "px",
                this._div.style.top = e.y + this._offset.y + "px")
            }
            ,
            n.prototype.setContent = function(t) {
                if (M.isString(t))
                    this._div.innerHTML = t;
                else if (M.isHTMLElement(t))
                    this._div.innerHTML = t.outerHTML;
                else
                    try {
                        this._div.innerHTML = t[0].outerHTML
                    } catch (e) {}
            }
            ,
            n.prototype.getExtData = function() {
                return this._extData
            }
            ,
            n.prototype.setTop = function() {
                var t = this._map.getPanes().markerMouseTarget.style.zIndex;
                this._div.style.zIndex = t + 1
            }
            ,
            n.prototype.setZIndex = function(t) {
                this._div.style.zIndex = t
            }
            ,
            n.prototype.setCursor = function(t) {
                this._div.style.cursor = t,
                this._cursor = t || ""
            }
            ,
            n.prototype.trigger = function(t, e) {
                if (M.isString(t) && t.trim().length && this._eventHandler[t])
                    if ("dragstart" === t || "dragging" === t || "dragend" === t) {
                        var i = this._eventHandler[t];
                        if (i && i.length)
                            for (var n = M.createEvent(this._div, t), s = 0, o = i.length; s < o; s++)
                                i[s](n)
                    } else
                        $.event.trigger(this._div, t, e)
            }
            ,
            n.prototype.addEventListener = function(t, e) {
                var i, n, s = this;
                if (M.isString(t) && t.trim().length && M.isFunction(e)) {
                    var o = this._CMap.getCMapObject().ifmWin
                      , a = {
                        X: 0,
                        Y: 0,
                        element: null,
                        dragstart: function(t, i) {
                            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
                            t = t || o.event,
                            a.element = this,
                            a.X = t.clientX - this.offsetLeft || 0,
                            a.Y = t.clientY - this.offsetTop || 0,
                            o.window.document.onmousemove = function(t) {
                                a.dragging(t, e)
                            }
                            ,
                            o.window.document.onmouseup = function(t) {
                                a.dragend(t, e)
                            }
                            ;
                            var n = $.extend({}, t);
                            n.type = "dragstart",
                            i && i(n)
                        },
                        dragging: function(t, e) {
                            t = t || o.event;
                            var i = $(a.element)
                              , n = Math.max(t.clientX - a.X, 0)
                              , s = Math.max(t.clientY - a.Y, 0);
                            i.css({
                                left: n + "px",
                                top: s + "px",
                                position: "absolute"
                            });
                            var r = $.extend({}, t);
                            r.type = "dragging",
                            r.position = {
                                x: t.clientX,
                                y: t.clientY
                            },
                            e && e(r)
                        },
                        dragend: function(t, e) {
                            function i(t, e, i) {
                                t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent("on" + e, i)
                            }
                            $.browser.isIE ? (i(a.element, "losecapture", a.dragstart),
                            a.element.releaseCapture()) : i(window, "blur", a.dragstart),
                            o.window.document.onmousemove = null,
                            o.window.document.onmouseup = null;
                            var n = $.extend({}, t);
                            n.type = "dragend",
                            e && e(n)
                        }
                    }
                      , r = {
                        dragstart: 1,
                        dragging: 1,
                        dragend: 1
                    };
                    r[t] ? ("dragstart" === t && $(this._div).bind("mousedown", function(t) {
                        a.dragstart.call(this, t, e)
                    }),
                    i = function(t) {
                        e(t)
                    }
                    ) : (i = function(t) {
                        n = $.extend({}, t || {}),
                        n.target = s,
                        n.stop = t.stop.bind(t),
                        e(n)
                    }
                    ,
                    this._initialized && $.event.add(this._div, t, i));
                    var c = this._eventHandler[t];
                    c ? c.push(i) : this._eventHandler[t] = [i]
                }
            }
            ,
            n.prototype.removeEventListener = function(t) {
                M.isString(t) && t.trim().length && (this._initialized && $.event.remove(this._div, t),
                this._eventHandler[t] && delete this._eventHandler[t])
            }
            ,
            n.prototype.show = function() {
                this._div && (this._div.style.visibility = "visible")
            }
            ,
            n.prototype.hide = function() {
                this._div && (this._div.style.visibility = "hidden")
            }
            ,
            n.prototype._checkOpts = function(t) {
                return t.offset && (t.offset.x = parseFloat(t.offset.x, 10),
                t.offset.y = parseFloat(t.offset.y, 10)),
                t
            }
            ,
            n.prototype.isVisible = function() {
                var t = $(this._div).offset();
                return !(!this._div || "none" == this._div.style.display || "hidden" == this._div.style.visibility || 0 === t.height && 0 === t.width)
            }
            )
        },
        createInfoWindow: function(t) {
            function e() {}
            e.prototype = this.createOverlay(t),
            e.prototype.openInfoWindow = function(t, e, i) {
                this._point = e || this.getPosition(),
                this.setTop(),
                this._div.style.zIndex = 9999,
                this.draw(),
                this.show(),
                setTimeout(function() {
                    $(this._div).bind("dblclick", function(t) {
                        t.stop()
                    })
                }
                .bind(this), 0),
                !i && this._autoFit && this._panBox()
            }
            ,
            e.prototype.close = function() {
                this.hide()
            }
            ,
            e.prototype.draw = function() {
                var t = this._map
                  , e = t.pointToOverlayPixel(this._point);
                if (e) {
                    var i = $(this._div).offset().width
                      , n = $(this._div).offset().height;
                    this._div.style.left = -i / 4 - 50 + e.x + this._offset.x + "px",
                    this._div.style.top = e.y + this._offset.y - n + "px"
                }
            }
            ,
            e.prototype.getPath = function() {
                for (var t = $(this._div).offset(), e = this._CMap.getCMapObject().mapObj, i = [], n = [{
                    x: t.left,
                    y: t.top
                }, {
                    x: t.left + t.width,
                    y: t.top
                }, {
                    x: t.left,
                    y: t.bottom
                }, {
                    x: t.left + t.width,
                    y: t.bottom
                }], s = 0, o = n.length; s < o; s++)
                    i.push(e.pixelToPoint(n[s]));
                return i
            }
            ,
            e.prototype.isVisible = function() {
                var t = !this._div || "none" === this._div.style.display || "hidden" === this._div.style.visibility
                  , e = $(this._div).offset()
                  , i = $(this._CMap.getCMapObject().mapObj.getContainer()).offset()
                  , n = {
                    x: e.left,
                    y: e.top,
                    height: e.height,
                    width: e.width
                }
                  , s = {
                    x: i.left,
                    y: i.top,
                    height: i.height,
                    width: i.width
                };
                return !t && M.intersects(n, s)
            }
            ,
            e.prototype._panBox = function() {
                var t = parseInt(this._map.getContainer().offsetHeight, 10)
                  , e = parseInt(this._map.getContainer().offsetWidth, 10)
                  , i = this._div.offsetHeight
                  , n = this._div.offsetWidth;
                if (!(i >= t || n >= e)) {
                    this._map.getBounds().containsPoint(this._point) || this._map.setCenter(this._point);
                    var s, o, a, r, c = this._map.pointToPixel(this._point), p = n / 2 - c.x, h = 3 * n / 4 + c.x - e;
                    s = i - c.y + 56,
                    o = p > 0 ? p : h > 0 ? -h : 0,
                    a = s > 0 ? s : 0,
                    r = 0 !== o || 0 !== a,
                    r && this._map.panBy(o, a)
                }
            }
            ;
            var i = new e(t);
            return i._name = "infoWindow",
            this.addOverlay(i),
            i.hide(),
            i
        },
        showInfoWindow: function(t, e, i) {
            t = t || {},
            i = i || {};
            var n, s = this.getCMapObject(), o = this.opts, a = s.BMap, r = i.onClose, c = o.infoWinTpl ? $.tmpl.render(o.infoWinTpl, t) : "", p = i.offset || {}, h = {
                offset: {
                    x: p.x || 0,
                    y: p.y || 0
                },
                content: M.getFirstValDefault(i.content, c),
                position: t && t.location || this.setLngLat(),
                autoMove: M.getFirstValDefault(i.autoMove, !0),
                autoFit: i.autoFit,
                isCustom: M.getFirstValDefault(i.isCustom, !0),
                size: M.getFirstValDefault(t && t.size, this.setSize()),
                enableAutoPan: !0,
                BMap: a,
                CMap: this
            };
            return n = this.createInfoWindow(h),
            this.__infoWindows.push(n),
            e && (CtripHotelMap.__infoWindowList[e] = n,
            n._uid = e),
            r && this.addListener(n, "close", function(t) {
                r.call(n, e, t)
            }),
            !i.noshow && this.openInfoWindow(n),
            n
        },
        openInfoWindow: function(t, e, i) {
            t && t.openInfoWindow(this.getCMapObject().mapObj, e || t.getPosition(), i)
        },
        closeInfoWindow: function(t) {
            t && t.hide()
        },
        clearAllInfoWindows: function() {
            for (var t = 0; t < this.__infoWindows.length; t++)
                this.__infoWindows[t].hide();
            this.getCMapObject().mapObj.closeInfoWindow()
        },
        offset: function(t, e, i) {
            var n = b.convertBD09ToGCJ02(t.lat, t.lng)
              , s = b.amapPointOffset(n, e, i);
            return b.convertGCJ02ToBD09(s.lat, s.lng)
        },
        _convertMapLevel: function(t) {
            return t = t >= 16 ? t : t + 1
        }
    }),
    s = x({
        __properties__: function() {
            this.opts,
            this.CMap,
            this._marker,
            this._cUid,
            this._name = "marker"
        },
        initialize: function(t) {
            var e, i;
            if (t.CMap ? this.CMap = t.CMap : M.console("CMap is required for CMarker initialize!"),
            e = this.CMap.getCMapObject(),
            this._setOptions(t),
            i = e.BMap,
            this.opts.BMap = i,
            this._marker = this.CMap.createOverlay(this.opts),
            P) {
                var n = new this.CMap.cMapObject.BMap.Point(this.opts.position.lng,this.opts.position.lat)
                  , s = new this.CMap.cMapObject.BMap.Marker(n);
                this.CMap.cMapObject.mapObj.addOverlay(s)
            }
        },
        _checkOptions: function(t) {
            return M.isString(t.content) && (t.content = w.htmlToDom(t.content)),
            !t.position && t.cpos && (t.position = this.CMap.setLngLat(t.cpos),
            delete t.cpos),
            t.offset || (t.cpix ? t.offset = this.CMap.setPixel(t.cpix) : t.offset = this.CMap.setPixel(),
            delete t.cpix),
            t.map || (t.map = this.CMap.getCMapObject().mapObj),
            t
        },
        _setOptions: function(t, e) {
            t = this._checkOptions(t),
            this.opts = M.extend(e || {
                map: null,
                position: null,
                offset: null,
                zIndex: 10,
                content: "",
                visible: !0,
                enableDragging: t.draggable,
                enableClicking: t.clickable || !0,
                rotation: t.angle
            }, t),
            this._cUid = this.opts.cUid
        },
        reset: function(t, e) {
            var i = this._marker;
            this._setOptions(t, this.opts),
            this.opts.zIndex && i.setZIndex(this.opts.zIndex),
            this.opts.position && i.setPosition(this.opts.position),
            this.opts.Cursor && i.setCursor(this.opts.Cursor),
            "undefined" != typeof this.opts.visible && i[this.opts.visible ? "show" : "hide"](),
            e && this.opts.map.addOverlay(i)
        },
        setPosition: function(t) {
            t && (t = this.CMap.setLngLat(t),
            this._marker.setPosition(t),
            this.opts.position = t)
        },
        getContent: function() {
            return this._marker.getIcon()
        },
        setContent: function(t) {
            this._marker.setContent(t)
        },
        setzIndex: function(t) {
            this._marker.setZIndex(t)
        },
        show: function() {
            this._marker.show()
        },
        hide: function() {
            this._marker.hide()
        },
        getPosition: function() {
            return this._marker.getPosition()
        },
        remove: function() {
            this.opts.map.removeOverlay(this._marker)
        },
        bindEvent: function(t, e) {
            if (M.isFunction(e))
                return this.CMap._addListener(this._marker, t, e),
                this
        },
        setMap: function(t) {
            "undefined" == typeof t && (t = this.CMap.getCMapObject().mapObj),
            t.addOverlay(this._marker)
        },
        shake: function() {
            var t, e = this._marker.getContent(), i = 0;
            e.style.marginTop = "-50px",
            t = setInterval(function() {
                i += 3;
                var n = parseFloat(e.style.marginTop) + i;
                n >= 0 && (i *= -.7,
                n = 0),
                Math.abs(i) < 1 && (i = 0),
                0 == i && 0 == n ? clearInterval(t) : e.style.marginTop = n + "px"
            }, 30)
        },
        isVisible: function() {
            return this._marker.isVisible()
        }
    }),
    u = function(t, e) {
        e = e || {};
        var i = e.methods || {}
          , n = {
            __properties__: function() {
                this.opts,
                this.CMap,
                this._native,
                this._name = t
            },
            initialize: function(t) {
                t ? this.CMap = t : M.console("CMap is required for plugin initialize!")
            },
            create: function(e) {
                var i = this.CMap.getCMapObject()
                  , n = i.BMap;
                return this.opts = e || {},
                this._native = new n[t](this.opts),
                this
            },
            addToControl: function() {
                return this.CMap.getCMapObject().mapObj.addControl(this._native),
                this
            },
            bindEvent: function(t, e) {
                if (M.isFunction(e))
                    return this.CMap._addListener(this._native, t, e),
                    this
            }
        };
        for (var s in i)
            M.isString(i[s]) && (i[s] = function(t) {
                return function() {
                    this._native[t].apply(this._native, arguments)
                }
            }(i[s]));
        return x($.extend(n, i))
    }
    ,
    c = u("ScaleControl"),
    p = u("OverviewMapControl"),
    h = u("NavigationControl"),
    l = u("MouseTool", {
        methods: {
            close: "close",
            addToControl: O,
            __properties__: function() {
                this.opts,
                this.CMap,
                this._native,
                this._name = "MouseTool",
                this.DRAW_Mode = {
                    BMAP_DRAWING_RECTANGLE: "rectangle",
                    BMAP_DRAWING_MARKER: "marker",
                    BMAP_DRAWING_CIRCLE: "circle",
                    BMAP_DRAWING_POLYLINE: "polyline",
                    BMAP_DRAWING_POLYGON: "polygon"
                }
            },
            create: function() {
                var t = this.CMap.getCMapObject()
                  , e = t.mapObj
                  , i = t.BMapLib
                  , n = {
                    strokeColor: "#44A6FB",
                    fillColor: "#44A6FB",
                    strokeWeight: 3,
                    strokeOpacity: 1,
                    fillOpacity: .3,
                    strokeStyle: "solid"
                };
                this._native = new i.DrawingManager(e,{
                    isOpen: !1,
                    enableDrawingTool: !1,
                    circleOptions: n,
                    polylineOptions: n,
                    polygonOptions: n,
                    rectangleOptions: n
                })
            },
            rectangle: function() {
                this._native.setDrawingMode(this.DRAW_Mode.BMAP_DRAWING_RECTANGLE),
                this._native.open()
            },
            onDraw: function(t) {
                M.isFunction(t) && this._native.addEventListener("overlaycomplete", function(e) {
                    for (var i = e.overlay.getPath(), n = 0, s = i.length; n < s; n++)
                        i[n] = b.convertBD09ToGCJ02(i[n].lat, i[n].lng);
                    t(i)
                })
            }
        }
    }),
    o = x({
        __properties__: function() {
            this.opts,
            this.CMap,
            this._circle,
            this._dragger,
            this._name = "circle"
        },
        initialize: function(t) {
            var e;
            t.CMap ? (this.CMap = t.CMap,
            delete t.CMap) : M.console("CMap is required for CCircle initialize!"),
            e = this.CMap.getCMapObject(),
            this._setOptions(t);
            var i = this.opts.map
              , n = this.opts.center
              , s = this.opts.radius
              , o = new e.BMap.Circle(n,s,this.opts);
            i.addOverlay(o),
            this._circle = o,
            this.opts.cCanDrag && this._addCircleDrageEvent()
        },
        _checkOptions: function(t) {
            return !t.center && t.cpos && (t.center = this.CMap.setLngLat(t.cpos),
            delete t.cpos),
            t.map || (t.map = this.CMap.getCMapObject().mapObj),
            t
        },
        _setOptions: function(t, e) {
            var i = $.browser.isIPad;
            t = this._checkOptions(t),
            this.opts = M.extend(e || {
                map: null,
                center: null,
                radius: 5e3,
                strokeColor: "#2577E3",
                strokeOpacity: 1,
                strokeWeight: 3,
                fillColor: "ee2200",
                fillOpacity: .35,
                cCanDrag: !0,
                zooms: [3, 16],
                cDragPix: i ? "-11|-11" : "-5|-5",
                cEvent: {},
                cDragContent: '<div style="' + (i ? "width:22px;height:22px;" : "width:10px;height:10px;") + 'border-radius:50% 50%;background:#fff;border:1px solid #000;"></div>'
            }, t)
        },
        _addCircleDrageEvent: function() {
            var t = this
              , e = this.opts
              , i = this.getPath()
              , n = this.CMap.getCMapObject().mapObj
              , s = i[Math.floor(.75 * i.length)]
              , o = this.CMap.addMarker({
                position: s,
                draggable: !0,
                zIndex: 9999,
                cpix: e.cDragPix,
                content: e.cDragContent,
                cursor: "pointer"
            })
              , a = e.cEvent || {};
            a.dragging || (a.dragging = O),
            this._dragger = o;
            for (var r in a)
                a.hasOwnProperty(r) && o.bindEvent(r, function(i) {
                    if ("dragging" === i.type) {
                        var r = i.position
                          , c = n.pixelToPoint(r);
                        o.setPosition(c),
                        s = n.getDistance(e.center, o.getPosition()),
                        t.setRadius(s)
                    }
                    a[i.type](t, o)
                })
        },
        remove: function() {
            this.opts.map.removeOverlay(this._circle),
            this._circle.remove()
        },
        drag: function(t, e) {
            var i = this._circle
              , n = this._dragger
              , s = i.getCenter()
              , o = this.CMap.offset(s, Math.round(1.15 * t), 0);
            n.setPosition(o),
            n._noDragend = e,
            this.CMap.trigger(n, "dragend")
        },
        autoZoom: function() {
            var t = this._circle;
            this.isVisible() && this.CMap.setBounds(t.getBounds())
        },
        setCenter: function(t) {
            t && this._circle.setCenter(t)
        },
        setRadius: function(t) {
            "undefined" != typeof t && this._circle.setRadius(t)
        },
        setMap: function(t) {
            "undefined" == typeof t && (t = this.CMap.getCMapObject().mapObj),
            t.addOverlay(this._circle)
        },
        getRadius: function() {
            return this._circle.getRadius()
        },
        getDragger: function() {
            return this._dragger
        },
        show: function() {
            this._circle.show()
        },
        hide: function() {
            this._circle.hide()
        },
        isVisible: function() {
            return this._circle.isVisible()
        },
        getPath: function() {
            return this._circle.getPath()
        }
    }),
    a = x({
        __properties__: function() {
            this.opts,
            this.CMap,
            this._polyline,
            this._name = "polyline"
        },
        initialize: function(t) {
            var e;
            t.CMap ? (this.CMap = t.CMap,
            delete t.CMap) : M.console("CMap is required for _polyline initialize!"),
            e = this.CMap.getCMapObject(),
            this._setOptions(t);
            var i = this.opts.path
              , n = this.opts.map
              , s = new e.BMap.Polyline(i,this.opts);
            n.addOverlay(s),
            this._polyline = s
        },
        _checkOptions: function(t) {
            return t.map || (t.map = this.CMap.getCMapObject().mapObj),
            t
        },
        _setOptions: function(t, e) {
            t = this._checkOptions(t),
            this.opts = M.extend(e || {
                map: null,
                path: null
            }, t)
        },
        getOptions: function() {
            return {
                strokeColor: this._polyline.getStrokeColor(),
                strokeOpacity: this._polyline.getStrokeOpacity(),
                strokeWeight: this._polyline.getStrokeWeight(),
                strokeStyle: this._polyline.getStrokeStyle()
            }
        },
        setOptions: function(t) {
            if (t) {
                var e;
                for (var i in t)
                    e = "set" + i.replace(/^\w/, function(t) {
                        return t.charAt(0).toUpperCase()
                    }),
                    M.isFunction(this._polyline[e]) && this._polyline[e](t[i])
            }
        },
        show: function() {
            this._polyline.show()
        },
        hide: function() {
            this._polyline.hide()
        },
        remove: function() {
            this.opts.map.removeOverlay(this._polyline)
        },
        getPath: function() {
            return this._polyline.getPath()
        },
        isVisible: function() {
            return this._polyline.isVisible()
        }
    }),
    r = x({
        __properties__: function() {
            this.opts,
            this.CMap,
            this._polygon,
            this._name = "Polygon"
        },
        initialize: function(t) {
            var e;
            t.CMap ? (this.CMap = t.CMap,
            delete t.CMap) : M.console("CMap is required for Polygon initialize!"),
            e = this.CMap.getCMapObject(),
            this._setOptions(t);
            var i = this.opts.path
              , n = this.opts.map
              , s = new e.BMap.Polygon(i,this.opts);
            n.addOverlay(s),
            this._polygon = s
        },
        _checkOptions: function(t) {
            return t.map || (t.map = this.CMap.getCMapObject().mapObj),
            t
        },
        _setOptions: function(t, e) {
            t = this._checkOptions(t),
            this.opts = M.extend(e || {
                map: null,
                path: null
            }, t)
        },
        getOptions: function() {
            return {
                strokeColor: this._polygon.getStrokeColor(),
                fillColor: this._polygon.getFillColor(),
                strokeOpacity: this._polygon.getStrokeOpacity(),
                fillOpacity: this._polygon.getFillOpacity(),
                strokeWeight: this._polygon.getStrokeWeight(),
                strokeStyle: this._polygon.getStrokeStyle()
            }
        },
        setOptions: function(t) {
            if (t) {
                var e;
                for (var i in t)
                    e = "set" + i.replace(/^\w/, function(t) {
                        return t.charAt(0).toUpperCase()
                    }),
                    M.isFunction(this._polygon[e]) && this._polygon[e](t[i])
            }
        },
        show: function() {
            this._polygon.show()
        },
        hide: function() {
            this._polygon.hide()
        },
        remove: function() {
            this.opts.map.removeOverlay(this._polygon)
        },
        getPath: function() {
            return this._polygon.getPath()
        },
        isVisible: function() {
            return this._polygon.isVisible()
        }
    }),
    d = function(t, e) {
        e = e || {};
        var i = e.methods || {}
          , n = {
            __properties__: function() {
                this.opts,
                this.CMap,
                this._native,
                this._name = t
            },
            initialize: function(t) {
                t ? this.CMap = t : M.console("CMap is required for service initialize!")
            },
            create: function(e) {
                var i, n = this.CMap.getCMapObject(), s = n.BMap;
                return e = e || {},
                e.city ? (i = M.getCity(e.city),
                delete e.city) : i = this.CMap.getCMapObject().mapObj,
                this.opts = e,
                this._native = new s[t](i,this.opts),
                this
            },
            bindEvent: function(t, e) {
                if (M.isFunction(e))
                    return this.CMap._addListener(this._native, t, e),
                    this
            }
        };
        for (var s in i)
            M.isString(i[s]) && (i[s] = function(t) {
                return function() {
                    this._native[t].apply(this._native, arguments)
                }
            }(i[s]));
        return x($.extend(n, i))
    }
    ,
    f = function(t, e) {
        e = e || {};
        var i = e.methods || {}
          , n = {
            __properties__: function() {
                this.opts,
                this.CMap,
                this._native,
                this._name = t,
                this._policy = 0
            },
            initialize: function(t) {
                t ? this.CMap = t : M.console("CMap is required for service initialize!")
            },
            create: function(e) {
                var i, n = this.CMap.getCMapObject(), s = n.BMap;
                return e = e || {},
                e.city && (i = M.getCity(e.city),
                delete e.city),
                this.opts = $.extend(e, {
                    city: i,
                    startAddress: "",
                    endAddress: "",
                    onSearchComplete: this._onSearchComplete.bind(this)
                }),
                this._native = new s[t](n.mapObj,{
                    onSearchComplete: this.opts.onSearchComplete
                }),
                this.opts.policy && this.setPolicy(this.opts.policy),
                this
            },
            bindEvent: function(t, e) {
                if (M.isFunction(e))
                    return this.CMap._addListener(this._native, t, e),
                    this
            },
            search: function(t, e) {
                var i = this;
                this.CMap.addService("Geocoder", function(n) {
                    n.create(),
                    S(function(s) {
                        var o, a, r, c = 0;
                        n.getAddress(t, function(t) {
                            o = t.regeocode.formattedAddress
                        }, i.opts.city),
                        n.getAddress(e, function(t) {
                            a = t.regeocode.formattedAddress
                        }, i.opts.city),
                        r = setInterval(function() {
                            M.isString(o) && M.isString(a) ? (clearInterval(r),
                            s.resolve(o, a)) : (c += 50,
                            c >= 1e3 && s.reject())
                        }, 50)
                    }).then(function(t, e) {
                        i.opts.startAddress = t,
                        i.opts.endAddress = e
                    }).any(function() {
                        i._native.search(t, e)
                    })
                })
            },
            setPolicy: function(t) {
                this._policy = this.getPolicy(t),
                this._native.setPolicy(this._policy)
            }
        };
        for (var s in i)
            M.isString(i[s]) && (i[s] = function(t) {
                return function() {
                    this._native[t].apply(this._native, arguments)
                }
            }(i[s]));
        return x($.extend(n, i))
    }
    ,
    C = d("Geocoder", {
        methods: {
            getAddress: function(t, e, i) {
                var n = this;
                M.isString(i) && (i = M.getCity(i)),
                this._native.getLocation(t, function(t) {
                    var s, o = {
                        township: "",
                        building: "",
                        neighborhood: ""
                    };
                    t && "" !== t.address ? (s = null,
                    t = {
                        type: "complete",
                        info: "OK",
                        regeocode: {
                            addressComponent: $.extend(o, t.addressComponents),
                            formattedAddress: t.address,
                            location: n.CMap.setLngLat(t.point),
                            adcode: i || ""
                        }
                    }) : (s = "NO_DATA",
                    t = {
                        type: "complete",
                        info: "NO_DATA",
                        regeocode: {
                            addressComponent: "",
                            formattedAddress: "",
                            location: null,
                            adcode: i || ""
                        }
                    }),
                    M.isFunction(e) && e(t, s)
                })
            },
            getLocation: function(t, e, i) {
                var n = this
                  , s = i;
                i = M.isString(i) ? M.getCity(i) : "全国",
                !M.isFunction(e) && (e = O),
                this._native.getPoint(t, function(t) {
                    var o, a;
                    t ? (o = null,
                    a = {
                        type: "complete",
                        info: "OK",
                        resultNum: "1",
                        geocodes: [{
                            addressComponent: "",
                            formattedAddress: "",
                            location: n.CMap.setLngLat(t),
                            adcode: s || "",
                            level: ""
                        }]
                    },
                    n.getAddress(t, function(t, i) {
                        i || (a.geocodes[0].addressComponent = t.regeocode.addressComponent,
                        a.geocodes[0].formattedAddress = t.regeocode.formattedAddress),
                        e(a, o)
                    }, i)) : (o = "NO_DATA",
                    a = {
                        type: "complete",
                        info: "NO_DATA",
                        resultNum: "0",
                        geocodes: []
                    },
                    e(a, o))
                }, i)
            }
        }
    }),
    v = d("Autocomplete", {
        methods: {
            __properties__: function() {
                this.opts,
                this.CMap,
                this._native,
                this._name = "Autocomplete",
                this.context = {
                    region: "全国"
                }
            },
            setCity: function(t) {
                t = M.getCity(t),
                M.isString(t) && (this.context.region = t)
            },
            create: function(t) {
                var e = this.CMap.getCMapObject();
                e.BMap;
                return t.city && (this.setCity(t.city),
                delete t.city),
                this.opts = t || {},
                this
            },
            search: function(t) {
                var e = M.extend({
                    q: t + ""
                }, this.context);
                this._callWebAPI(e)
            },
            _onSearchComplete: function(t) {
                var e, i, n = this.context.region, s = t && "ok" === t.message;
                switch (!0) {
                case s && t.result.length > 0:
                    i = null,
                    e = {
                        type: "complete",
                        info: "OK",
                        count: t.result.length,
                        tips: function() {
                            for (var e, i = [], s = 0, o = t.result.length; s < o; s++)
                                e = t.result[s].location,
                                e && e.lng > 0 && e.lat > 0 && (n && "全国" !== n && n !== t.result[s].city && n + "市" !== t.result[s].city || i.push({
                                    name: t.result[s].name,
                                    district: t.result[s].district,
                                    adcode: t.result[s].cityid,
                                    location: e
                                }));
                            return i
                        }()
                    };
                    break;
                case s && 0 === t.result.length:
                    i = null,
                    e = {
                        type: "complete",
                        info: "NO_DATA",
                        count: "0",
                        tips: []
                    };
                    break;
                default:
                    i = "error",
                    e = {
                        type: "complete",
                        info: "ERROR",
                        count: "0",
                        tips: []
                    }
                }
                M.isFunction(this.opts.onSearchSuccess) && this.opts.onSearchSuccess(e, i)
            },
            _callWebAPI: function(t) {
                var e = this
                  , i = function() {
                    500 === s && (delete CtripHotelMap.BMAP_AUTOCOMPLETE_JSONPCALLBACK,
                    e._onSearchComplete())
                }
                  , n = "/Domestic/Tool/AjaxBaiduMapSuggestion.aspx?callback=CtripHotelMap.BMAP_AUTOCOMPLETE_JSONPCALLBACK&" + M.params(t)
                  , s = 500;
                CtripHotelMap.BMAP_AUTOCOMPLETE_JSONPCALLBACK = function(t) {
                    delete CtripHotelMap.BMAP_AUTOCOMPLETE_JSONPCALLBACK,
                    s = 200,
                    e._onSearchComplete(t)
                }
                ,
                $.loader.js(n, {
                    onload: function() {
                        setTimeout(i, 2e3)
                    },
                    onerror: i
                })
            }
        }
    }),
    g = f("TransitRoute", {
        methods: {
            getPolicy: function(t) {
                return t = this.CMap.getCMapObject().ifmWin[A[t]] || 0
            },
            _transformPlans: function(t) {
                if (this._native.getStatus() == L) {
                    var e = []
                      , i = t.getStart()
                      , n = t.getEnd();
                    this.opts.startAddress && (i.title = this.opts.startAddress),
                    this.opts.endAddress && (n.title = this.opts.endAddress);
                    for (var s = 0, o = t.getNumPlans(); s < o; s++)
                        e.push(new E({
                            plan: t.getPlan(s),
                            start: i,
                            end: n
                        }));
                    return e
                }
            },
            _onSearchComplete: function(t) {
                var e, i, n = this._native.getStatus() === L, s = t.getNumPlans(), o = t.getStart(), a = t.getEnd();
                switch (!0) {
                case !n:
                    i = "ERROR",
                    e = {
                        type: "complete",
                        info: "ERROR",
                        origin: null,
                        destination: null,
                        start: null,
                        end: null,
                        taxi_cost: 0,
                        plans: []
                    };
                    break;
                case s > 0:
                    i = null,
                    e = {
                        type: "complete",
                        info: "OK",
                        origin: o.point,
                        destination: a.point,
                        start: o,
                        end: a,
                        taxi_cost: 0,
                        plans: this._transformPlans(t)
                    };
                    break;
                case 0 === s:
                    i = null,
                    e = {
                        type: "complete",
                        info: "NO_DATA",
                        origin: o.point,
                        destination: a.point,
                        start: o,
                        end: a,
                        taxi_cost: 0,
                        plans: []
                    }
                }
                M.isFunction(this.opts.onSearchSuccess) && this.opts.onSearchSuccess(e, i)
            }
        }
    });
    var E = x({
        initialize: function(t) {
            var e = t.plan;
            this.opts = t,
            this.time = e.getDuration(!1),
            this.distance = e.getDistance(!1),
            this.cost = 0,
            this.nightLine = !1,
            this.walk_distance = 0,
            this.transit_distance = 0,
            this.railway_distance = 0,
            this.taxi_distance = 0,
            this.segments = [],
            this.path = [],
            this._initData()
        },
        _initData: function() {
            for (var t = this._getRoutes(), e = this._getSegments(t), i = 0, n = e.length; i < n; i++)
                this.path = this.path.concat(e[i].path),
                this.segments.push(new T(e[i]))
        },
        _getRoutes: function() {
            for (var t, e, i = this.opts.plan, n = i.getNumLines(), s = [], o = 0; o < n; o++)
                e = i.getRoute(o),
                t = i.getLine(o),
                e && e.getDistance(!1) > 0 && s.push({
                    type: "walk",
                    data: e,
                    nextLine: t
                }),
                t && t.getDistance(!1) > 0 && s.push({
                    type: "bus",
                    data: t
                });
            return e = i.getRoute(o),
            e && e.getDistance(!1) > 0 && s.push({
                type: "walk",
                data: e,
                nextLine: null
            }),
            s
        },
        _getSegments: function(t) {
            for (var e = [], i = 0; t && i < t.length; i++) {
                var n, s = t[i], o = s.data.getPath(), a = [], r = {
                    index: i,
                    startPoint: o[0],
                    endPoint: o[o.length - 1],
                    path: o,
                    distance: s.data.getDistance(!1),
                    time: 0
                };
                switch (s.type) {
                case "walk":
                    for (var c = 0, p = s.data.getNumSteps(); c < p; c++)
                        n = s.data.getStep(c),
                        a.push({
                            index: n.getIndex(),
                            position: n.getPosition(),
                            instruction: n.getDescription(),
                            distance: n.getDistance(!1),
                            time: 0
                        });
                    r.steps = a,
                    r.type = "walk",
                    s.nextLine ? r.endPosition = s.nextLine.getGetOnStop().title : r.endPosition = this.opts.end.title;
                    break;
                case "bus":
                    r.endPosition = s.data.getGetOffStop().title,
                    r.stationnum = s.data.getNumViaStops(),
                    r.title = s.data.title,
                    s.data.type === j ? r.type = "bus" : r.type = "subway",
                    r.onStop = {
                        name: s.data.getGetOnStop().title,
                        id: "",
                        location: s.data.getGetOnStop().point
                    },
                    r.offStop = {
                        name: r.endPosition,
                        id: "",
                        location: s.data.getGetOffStop().point
                    }
                }
                e.push(r)
            }
            return e
        }
    })
      , T = x({
        __properties__: function() {
            this.SEGMENT_TRANSIT_MOD = {
                bus: "BUS",
                subway: "SUBWAY",
                walk: "WALK"
            }
        },
        initialize: function(t) {
            this.opts = t,
            this.instruction = this._getInstruction(),
            this.time = t.time,
            this.distance = t.distance,
            this.transit_mode = this.SEGMENT_TRANSIT_MOD[t.type],
            this.transit = this._getTransit()
        },
        _getInstruction: function() {
            var t = this.opts
              , e = "";
            switch (t.type) {
            case "walk":
                e = "步行" + t.distance + "米到达" + t.endPosition;
                break;
            case "bus":
            case "subway":
                e = "乘坐" + t.title + "途径" + t.stationnum + "站到达" + t.endPosition
            }
            return e
        },
        _getTransit: function() {
            var t, e = this.opts;
            switch (e.type) {
            case "walk":
                t = new I(e);
                break;
            case "bus":
            case "subway":
                t = new D(e)
            }
            return t
        }
    })
      , I = x({
        initialize: function(t) {
            this.opts = t,
            this.origin = t.startPoint,
            this.destination = t.endPoint,
            this.steps = t.steps,
            this.path = t.path
        }
    })
      , D = x({
        initialize: function(t) {
            this.opts = t;
            var e;
            switch (t.type) {
            case "bus":
                e = "普通公交线路";
                break;
            case "subway":
                e = "地铁线路"
            }
            this.on_station = t.onStop,
            this.off_station = t.offStop,
            this.lines = [{
                name: t.title,
                id: "",
                type: e,
                stime: "",
                etime: ""
            }],
            this.via_num = t.stationnum,
            this.path = t.path
        }
    });
    _ = f("DrivingRoute", {
        methods: {
            getPolicy: function(t) {
                return t = this.CMap.getCMapObject().ifmWin[k[t]] || 0
            },
            _onSearchComplete: function(t) {
                var e, i, n = this._native.getStatus() === L, s = t.getNumPlans(), o = t.getStart(), a = t.getEnd(), r = 0, c = (new Date).getHours();
                switch (t.taxiFare && (c < 23 && c > 4 ? t.taxiFare.day && (r = t.taxiFare.day.totalFare) : t.taxiFare.night && (r = t.taxiFare.night.totalFare)),
                !0) {
                case !n:
                    i = "ERROR",
                    e = {
                        type: "complete",
                        info: "ERROR",
                        origin: null,
                        destination: null,
                        start: null,
                        end: null,
                        waypoints: null,
                        taxi_cost: r,
                        routes: []
                    };
                    break;
                case s > 0:
                    i = null,
                    e = {
                        type: "complete",
                        info: "OK",
                        origin: o.point,
                        destination: a.point,
                        start: o,
                        end: a,
                        waypoints: this._getDrivingPois(t),
                        taxi_cost: r,
                        routes: this._transformRoutes(t)
                    };
                    break;
                case 0 === s:
                    i = null,
                    e = {
                        type: "complete",
                        info: "NO_DATA",
                        origin: o.point,
                        destination: a.point,
                        start: o,
                        end: a,
                        waypoints: null,
                        taxi_cost: r,
                        routes: []
                    }
                }
                M.isFunction(this.opts.onSearchSuccess) && this.opts.onSearchSuccess(e, i)
            },
            _getDrivingPois: function(t) {
                for (var e = [], i = 0, n = t.getNumPlans(); i < n; i++)
                    e = e.concat(t.getPlan(i).getDragPois());
                return e
            },
            _transformRoutes: function(t) {
                if (this._native.getStatus() == L) {
                    var e = []
                      , i = t.getStart()
                      , n = t.getEnd()
                      , s = ["最少时间", "最短距离", "避开高速"];
                    this.opts.startAddress && (i.title = this.opts.startAddress),
                    this.opts.endAddress && (n.title = this.opts.endAddress);
                    for (var o = 0, a = t.getNumPlans(); o < a; o++)
                        e.push(new B({
                            plan: t.getPlan(o),
                            start: i,
                            end: n,
                            policy: s[this._policy]
                        }));
                    return e
                }
            }
        }
    });
    var B = x({
        initialize: function(t) {
            var e = t.plan;
            this.opts = t,
            this.distance = e.getDistance(!1),
            this.time = e.getDuration(!1),
            this.policy = t.policy,
            this.tolls = 0,
            this.tolls_distance = 0,
            this.steps = [],
            this._initData()
        },
        _initData: function() {
            for (var t = this.opts.plan, e = this._getSteps(t), i = 0, n = e.length; i < n; i++)
                this.steps.push(new R(e[i]))
        },
        _getSteps: function(t) {
            for (var e, i, n, s, o, a, r = [], c = 0, p = t.getNumRoutes(); c < p; c++) {
                e = t.getRoute(c),
                s = e.getPath();
                for (var h = 0, l = e.getNumSteps(); h < l; h++)
                    i = e.getStep(h),
                    o = 0 === h ? s[0] : e.getStep(h - 1).getPosition(),
                    a = h === s.length - 1 ? s[s.length - 1] : i.getPosition(),
                    n = {
                        index: c + h,
                        startPoint: o,
                        endPoint: a,
                        path: [o, a],
                        instruction: i.getDescription(!1),
                        distance: i.getDistance(!1),
                        type: "driving",
                        tolls: 0,
                        tolls_distance: 0,
                        toll_road: "",
                        time: 0
                    },
                    r.push(n)
            }
            return r
        }
    })
      , R = x({
        initialize: function(t) {
            this.opts = t,
            this.start_location = t.startPoint,
            this.end_location = t.endPoint,
            this.instruction = t.instruction,
            this.distance = t.distance,
            this.path = t.path,
            this.action = "",
            this.assist_action = "",
            this.orientation = "",
            this.road = "",
            this.tolls = 0,
            this.tolls_distance = 0,
            this.toll_road = "",
            this.time = 0
        }
    });
    m = f("WalkingRoute", {
        methods: {
            _onSearchComplete: function(t) {
                var e, i, n = this._native.getStatus() === L, s = t.getNumPlans(), o = t.getStart(), a = t.getEnd();
                switch (!0) {
                case !n:
                    i = "ERROR",
                    e = {
                        type: "complete",
                        info: "ERROR",
                        origin: null,
                        destination: null,
                        start: null,
                        end: null,
                        count: 0,
                        routes: []
                    };
                    break;
                case s > 0:
                    i = null,
                    e = {
                        type: "complete",
                        info: "OK",
                        origin: o.point,
                        destination: a.point,
                        start: o,
                        end: a,
                        count: t.getNumPlans(),
                        routes: this._transformRoutes(t)
                    };
                    break;
                case 0 === s:
                    i = null,
                    e = {
                        type: "complete",
                        info: "NO_DATA",
                        origin: o.point,
                        destination: a.point,
                        start: o,
                        end: a,
                        count: 0,
                        routes: []
                    }
                }
                M.isFunction(this.opts.onSearchSuccess) && this.opts.onSearchSuccess(e, i)
            },
            _transformRoutes: function(t) {
                if (this._native.getStatus() == L) {
                    var e = []
                      , i = t.getStart()
                      , n = t.getEnd();
                    this.opts.startAddress && (i.title = this.opts.startAddress),
                    this.opts.endAddress && (n.title = this.opts.endAddress);
                    for (var s = 0, o = t.getNumPlans(); s < o; s++)
                        e.push(new B({
                            plan: t.getPlan(s),
                            start: i,
                            end: n
                        }));
                    return e
                }
            }
        }
    }),
    y = d("PlaceSearch", {
        methods: {
            __properties__: function() {
                this.opts,
                this.CMap,
                this._native,
                this._name = "PlaceSearch",
                this.context = {
                    page_size: 10,
                    page_num: 0,
                    scope: 2,
                    region: "全国"
                }
            },
            setPageIndex: function(t) {
                t = parseInt(t - 1, 10),
                isNaN(t) || (this.context.page_num = t)
            },
            search: function(t) {
                var e = M.extend({
                    q: t + ""
                }, this.context);
                this._callWebAPI(e)
            },
            searchNearby: function(t, e, i) {
                e = this.CMap.setLngLat(e);
                var n = M.extend({
                    q: t + "",
                    location: e.lat + "," + e.lng,
                    radius: i
                }, this.context);
                this._callWebAPI(n)
            },
            create: function(t) {
                var e;
                return t.city && (e = M.getCity(t.city),
                delete t.city,
                M.isString(e) && (this.context.region = e)),
                this.opts = t || {},
                this
            },
            _onSearchComplete: function(t) {
                var e, i, n = this, s = t && "ok" === t.message;
                switch (!0) {
                case s && t.results.length > 0:
                    i = null,
                    e = {
                        type: "complete",
                        info: "OK",
                        poiList: {
                            pois: function() {
                                var e = [];
                                return t.results.each(function(t) {
                                    t.detail_info && e.push({
                                        name: t.name,
                                        type: t.detail_info && t.detail_info.tag || "",
                                        location: n.CMap.setLngLat(t.location),
                                        address: t.address,
                                        distance: t.detail_info && t.detail_info.distance || ""
                                    })
                                }),
                                e
                            }(),
                            pageIndex: this.getPageIndex(),
                            count: t.total,
                            pageSize: this.getPageSize()
                        }
                    };
                    break;
                case s && 0 === t.results.length:
                    i = null,
                    e = {
                        type: "complete",
                        info: "NO_DATA",
                        poiList: {
                            pois: [],
                            pageIndex: this.getPageIndex(),
                            count: 0,
                            pageSize: 0
                        }
                    };
                    break;
                default:
                    i = "error",
                    e = {
                        type: "complete",
                        info: "ERROR",
                        poiList: {
                            pois: [],
                            pageIndex: this.getPageIndex(),
                            count: 0,
                            pageSize: 0
                        }
                    }
                }
                M.isFunction(this.opts.onSearchSuccess) && this.opts.onSearchSuccess(e, i)
            },
            getPageIndex: function() {
                return this.context.page_num
            },
            getPageSize: function() {
                return this.context.page_size
            },
            _callWebAPI: function(t) {
                var e = this
                  , i = function() {
                    500 === s && (delete CtripHotelMap.BMAP_PLACESEARCH_JSONPCALLBACK,
                    e._onSearchComplete())
                }
                  , n = "/Domestic/Tool/AjaxBaiduMapSearch.aspx?callback=CtripHotelMap.BMAP_PLACESEARCH_JSONPCALLBACK&" + M.params(t)
                  , s = 500;
                CtripHotelMap.BMAP_PLACESEARCH_JSONPCALLBACK = function(t) {
                    delete CtripHotelMap.BMAP_PLACESEARCH_JSONPCALLBACK,
                    s = 200,
                    e._onSearchComplete(t)
                }
                ,
                $.loader.js(n, {
                    onload: function() {
                        setTimeout(i, 2e3)
                    },
                    onerror: i
                })
            }
        }
    }),
    t.CtripHotelMap = t.CtripHotelMap || {},
    t.CtripHotelMap.map = function(t) {
        return new i(t)
    }
    ,
    t.CtripHotelMap.mapSupplier = "B",
    t.CtripHotelMap.mapHelper = b,
    t.CtripHotelMap.__infoWindowList = {},
    t.CtripHotelMap.closeInfoWin = function(t) {
        var e = this.__infoWindowList
          , i = e[t];
        i && i.close()
    }
}(window);
!function(t) {
    function e(t) {
        return t = s.getEvent(t),
        t && t.preventDefault ? t.preventDefault() : window.event.returnValue = !1,
        !1
    }
    var i = function(e) {
        var i = {
            obj: null,
            opt: {},
            time: 1e3,
            callback: function() {},
            complete: !0
        };
        t.extend(i, e),
        i.obj && this.init(i)
    };
    i.prototype = {
        init: function(e) {
            this.d = e,
            this.timer = null,
            this.oldParam = e.obj.offset();
            var i = {
                left: this.d.obj[0].style.left,
                top: this.d.obj[0].style.top,
                marginTop: this.d.obj[0].style.marginTop || 0
            };
            t.extend(this.oldParam, i),
            this.newParam = null;
            for (var n in e.opt)
                e.opt.hasOwnProperty(n) && "undefined" !== this.oldParam[n] && (this.newParam || (this.newParam = {}),
                this.newParam[n] = e.opt[n]);
            this.newParam && this.setParam()
        },
        setParam: function() {
            for (var t in this.newParam)
                this.newParam.hasOwnProperty(t) && this.run(t, this.oldParam[t], this.newParam[t])
        },
        run: function(t, e, i) {
            var n = this.d.obj
              , e = parseInt(e)
              , i = parseInt(i)
              , s = 10
              , a = this
              , o = Math.round(this.d.time / s);
            o = o < 1 ? 1 : o;
            var r = (i - e) / o;
            this.timer = setInterval(function() {
                return o <= 0 ? (a.clear(a.d.complete),
                void a.d.callback(n)) : (o -= 1,
                e += r,
                void n.css(t, e + "px"))
            }, s)
        },
        clear: function(t) {
            if (t && this.newParam)
                for (var e in this.newParam)
                    this.newParam.hasOwnProperty(e) && this.d.obj.css(e, this.newParam[e] + "px");
            clearInterval(this.timer)
        }
    };
    var n = function(e, i) {
        var n = {
            obj: t(i),
            controll: {
                cls: "ctrip_360_pic_btn",
                play: "btn_360 btn_stop",
                stop: "btn_360 btn_play",
                left: "btn_360 btn_left",
                right: "btn_360 btn_right"
            },
            imgBox: {
                cls: "",
                cssText: "position:absolute;left:0;top:0;z-index:0;height:302px;white-space:nowrap;"
            },
            tip: {
                cls: "ctrip_360_tip",
                text: "按住鼠标左键并左右拖动"
            },
            init: {
                showControll: !0,
                showTip: !0,
                isDarg: !0,
                speed: 110,
                acceleration: 2.5,
                direction: "left",
                playState: "stop"
            },
            state: {
                left: "left",
                right: "right",
                play: "play",
                stop: "stop"
            }
        };
        t.extend(n, e),
        this.init(n)
    };
    n.prototype = {
        init: function(t) {
            this.d = t,
            this.direction = t.init.direction,
            this.w = null,
            this.currentAnimate = null,
            this.playState = t.init.playState,
            this.speed = t.init.speed,
            this.imgObj = this.createImgObj(),
            this.inited = !1,
            t.init.showControll && (this.controllObj = this.createControll(),
            t.obj.append(this.controllObj.box)),
            t.init.showTip && (this.tipObj = this.createTipObj(),
            t.obj.append(this.tipObj.tip))
        },
        run: function() {
            var e = arguments.callee
              , n = this
              , s = this.w
              , a = this.d.state
              , o = t(this.imgObj.imgBox)
              , r = !0
              , l = this.direction === a.left ? 2 * -s : 0
              , c = parseInt(o.css("left"))
              , h = s / this.speed * 1e3;
            (this.direction === a.left && c < -s || this.direction === a.right && c > -s) && (r = !1),
            c = Math.abs(s - Math.abs(c)),
            c = r ? s + c : s - c,
            this.currentAnimate = new i({
                obj: o,
                opt: {
                    left: l
                },
                time: h * c / s,
                callback: function(t) {
                    t.css("left", -s + "px"),
                    e.call(n)
                }
            }),
            this.tipObj && t(this.tipObj.tip).css("display", "none")
        },
        stop: function(t) {
            t = t || !1,
            this.currentAnimate && this.currentAnimate.clear(t),
            this.currentAnimate = null
        },
        addEventHandle: function() {
            var i = (this.d.controll,
            this)
              , n = this.d.state;
            if (this.controllObj && (t(this.controllObj.direction).bind("click", function(t) {
                t.stop(),
                i.direction = i.direction === n.left ? n.right : n.left,
                i.changeDirection()
            }),
            t(this.controllObj.playState).bind("click", function(t) {
                t.stop(),
                i.playState = i.playState === n.play ? n.stop : n.play,
                i.changePlayState()
            })),
            this.d.init.isDarg) {
                var a, o, r = this.imgObj.imgBox, l = null, c = null, i = this;
                t.browser.isIPad ? r.addEventListener("touchstart", function(t) {
                    i.stop(),
                    a = s.getPonit(t, i),
                    e(t),
                    r.addEventListener("touchmove", function(t) {
                        e(t),
                        o = s.getPonit(t, i),
                        c || (c = setTimeout(function() {
                            l = !0,
                            i.dragOn(a, o),
                            i.changeDirection(),
                            c = null
                        }, 30))
                    }, !1),
                    r.addEventListener("touchend", function(t) {
                        r.removeEventListener("touchend"),
                        r.removeEventListener("touchmove"),
                        clearTimeout(c),
                        c = null,
                        l ? (l = null,
                        o = s.getPonit(t, i),
                        i.dragOn(a, o),
                        i.changeDirection()) : (i.playState = i.playState === n.play ? n.stop : n.play,
                        i.changePlayState())
                    }, !1)
                }, !1) : r.onmousedown = function(h) {
                    i.stop(),
                    a = s.getPonit(h, i),
                    e(h),
                    r.onmousemove = function(t) {
                        e(t),
                        o = s.getPonit(t, i),
                        c || (c = setTimeout(function() {
                            l = !0,
                            i.dragOn(a, o),
                            i.changeDirection(),
                            c = null,
                            i.imgObj.imgBox.style.cursor = i.direction === i.d.state.left ? "w-resize" : "e-resize"
                        }, 30))
                    }
                    ,
                    t(document)[0].onmouseup = function(e) {
                        clearTimeout(c),
                        r.onmousemove = t(document)[0].onmouseup = c = null,
                        i.imgObj.imgBox.style.cursor = "auto",
                        l ? (l = null,
                        o = s.getPonit(e, i),
                        i.dragOn(a, o),
                        i.changeDirection()) : (i.playState = i.playState === n.play ? n.stop : n.play,
                        i.changePlayState())
                    }
                }
            }
        },
        dragOn: function(e, i) {
            var n = (t(this.imgObj.imgBox),
            i.x - e.x)
              , s = this.d
              , a = s.init
              , o = s.state
              , r = e.l + n;
            this.stop(),
            this.direction = n > 0 ? o.right : o.left,
            this.speed = a.speed + a.speed * Math.abs(n) / s.obj.offset().width * a.acceleration,
            this.playState = o.play,
            (r < 2 * -this.w || r > 0) && (r = -this.w,
            e.l = r)
        },
        changeDirection: function() {
            var t = this.controllObj;
            t && (t.direction.className = this.d.controll[this.direction]),
            this.changePlayState()
        },
        changePlayState: function() {
            var t = this.controllObj;
            t && (t.playState.className = this.d.controll[this.playState]),
            this.stop(),
            this.playState === this.d.state.play && this.run()
        },
        showImg: function(e, i) {
            var n = this.imgObj
              , s = this;
            this.inited || this.d.obj.append(n.imgBox),
            n.img.onload = function() {
                if (s.controllObj && (s.controllObj.box.style.display = ""),
                s.imgObj.imgBox.style.display = "block",
                s.w = t(this).offset().width,
                !s.w) {
                    var a = new Image;
                    a.src = e,
                    s.w = a.width,
                    a = null
                }
                t(n.imgBox).css("left", -s.w + "px"),
                s.inited ? (s.stop(!0),
                s.changePlayState()) : (s.tipObj && (s.tipObj.tip.style.display = ""),
                s.addEventHandle(),
                s.inited = !0),
                "[object Function]" === Object.prototype.toString.call(i) && i(s, n)
            }
            ,
            n.imgPreClone.src = n.img.src = n.imgNextClone.src = e
        },
        createTipObj: function() {
            var t = this.d.tip
              , e = document.createElement("div");
            return e.className = t.cls,
            e.innerHTML = t.text,
            e.style.display = "none",
            {
                tip: e
            }
        },
        createControll: function() {
            var t = this.d.init
              , e = this.d.controll
              , i = document.createElement("div")
              , n = document.createElement("a")
              , s = document.createElement("a");
            return i.className = e.cls,
            i.style.display = "none",
            n.className = e[t.direction],
            n.innerHTML = "<i></i>",
            s.className = e[t.playState],
            s.innerHTML = "<i></i>",
            i.appendChild(n),
            i.appendChild(s),
            {
                box: i,
                direction: n,
                playState: s
            }
        },
        createImgObj: function() {
            var t = this.d.imgBox
              , e = document.createElement("div")
              , i = document.createElement("img")
              , n = document.createElement("img")
              , s = document.createElement("img");
            return e.appendChild(i),
            e.appendChild(n),
            e.appendChild(s),
            e.style.cssText = t.cssText,
            e.className = t.cls,
            e.style.display = "none",
            {
                imgBox: e,
                imgPreClone: i,
                img: n,
                imgNextClone: s
            }
        }
    };
    var s = {
        getPonit: function(t, e) {
            t = s.getEvent(t);
            var i = s.getMousePos(t)
              , n = e.d.obj.offset()
              , a = e.imgObj.imgBox
              , o = i.x < n.left ? n.left : i.x
              , r = i.y < n.top ? n.top : i.y;
            return {
                x: o > n.right ? n.right : o,
                y: r > n.bottom ? n.bottom : r,
                l: parseInt(a.style.left),
                t: parseInt(a.style.top)
            }
        },
        getMousePos: function(e) {
            return t.browser.isIPad ? {
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY
            } : {
                x: e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop
            }
        },
        getEvent: function(t) {
            return t || window.event
        }
    }
      , a = function(e, i) {
        var n = {
            obj: t(i),
            cls: {
                prev: "menu_360 menu_top",
                next: "menu_360 menu_btm menu_btm",
                prevDis: "menu_360 menu_top menu_top_dis",
                nextDis: "menu_360 menu_btm menu_btm_dis",
                box: "ctrip_360_txt_list",
                cont: "ctrip_360_txt_cont"
            },
            data: null,
            init: {
                count: 7,
                step: null,
                delay: 400
            }
        };
        t.extend(n, e),
        this.init(n)
    };
    a.prototype = {
        init: function(e) {
            if (this.d = e,
            e.data) {
                var i = e.cls.prevDis
                  , n = e.data.total > e.init.count ? e.cls.next : e.cls.nextDis;
                this.prevObj = this.createBtn(i),
                this.listObj = this.createList(),
                this.nextObj = this.createBtn(n),
                e.obj.append(this.prevObj),
                e.obj.append(this.listObj.box),
                e.obj.append(this.nextObj);
                var s = t(this.listObj.box)
                  , a = this.d.init.step || parseInt(s.find("li").css("height"));
                this.allLen = a * e.data.total,
                this.len = a * e.init.count,
                this.count = Math.ceil(this.allLen / this.len),
                this.currentCount = 1,
                this.canPrev = e.data.total > e.init.count,
                this.canNext = !1,
                s.css("height", this.len - 1 + "px").css("overflow", "hidden"),
                this.eventHandle()
            }
        },
        eventHandle: function() {
            var t = this;
            this.nextObj.onclick = this.canPrev ? function() {
                t.prev()
            }
            : null,
            this.prevObj.onclick = this.canNext ? function() {
                t.next()
            }
            : null
        },
        changeBtnCls: function() {
            var t = this.d.cls;
            this.prevObj.className = this.canNext ? t.prev : t.prevDis,
            this.nextObj.className = this.canPrev ? t.next : t.nextDis
        },
        prev: function() {
            this.currentCount += 1;
            var t = this.len * (this.currentCount - 1)
              , e = this.currentCount === this.count ? t - this.allLen - this.len * (this.currentCount - 2) : -t;
            this.animate(e),
            this.canPrev = !(this.currentCount >= this.count),
            this.canNext = !0,
            this.eventHandle(),
            this.changeBtnCls()
        },
        next: function() {
            this.currentCount -= 1,
            this.animate(-this.len * (this.currentCount - 1)),
            this.canPrev = !0,
            this.canNext = !(this.currentCount <= 1),
            this.eventHandle(),
            this.changeBtnCls()
        },
        animate: function(e) {
            this.currentAn && this.currentAn.clear(!0),
            this.currentAn = new i({
                obj: t(this.listObj.list),
                opt: {
                    marginTop: e
                },
                time: this.d.init.delay,
                callback: function(t) {
                    t.css("margin-top", e + "px")
                }
            })
        },
        createBtn: function(t) {
            var e = document.createElement("a");
            return e.className = t,
            e.href = "javascript:void( 0 );",
            e
        },
        createList: function() {
            for (var t = this.d.cls, e = document.createElement("div"), i = document.createElement("ul"), n = "", s = 0; s < this.d.data.data.length; s++) {
                var a = this.d.data.data[s]
                  , o = 0 === s ? "current" : "";
                n += '<li class="' + o + '" data-index="' + (s + 1) + '" data-url="' + a.imgUrl + '"><a title="' + a.name + '" href="javascript:;">' + a.name + "</a></li>"
            }
            return i.innerHTML = n,
            e.className = t.box,
            i.className = t.cont,
            e.appendChild(i),
            {
                box: e,
                list: i
            }
        }
    },
    t.Pic360 = t.Pic360 || function(t, e) {
        return new n(t,e)
    }
    ,
    t.Pic360List = t.Pic360List || function(t, e) {
        return new a(t,e)
    }
}(cQuery);
cQuery.BizMod || (cQuery.BizMod = {}),
function(i, t, e) {
    function s(i) {
        this.divPicModal = i.divPicModal,
        this.divOfficialPic = this.divPicModal.find("#J_OffiPicDiv"),
        this.divUserPic = this.divPicModal.find("#J_UserPicDiv"),
        this.imgList = this.divPicModal.find(".pic_right a img"),
        this.officialImgList = this.divOfficialPic.find(".pic_right a img"),
        this.userImgList = this.divUserPic.find(".pic_right a img"),
        this.category = "official",
        this.init()
    }
    function a(i) {
        this.divPicModal = i.divPicModal,
        this.initPic360()
    }
    function n(i) {
        this.divPicModal = i.divPicModal,
        this.initVedio()
    }
    var o = i.browser.isIPad
      , d = o ? "touchstart" : "click"
      , r = null
      , c = "unTrack";
    s.prototype = {
        constructor: s,
        init: function() {
            this._initCategoryTab(),
            this._initImgTab(),
            this._initImgList(),
            this._initImgView(),
            this._initImgDesc(),
            this._initSlide()
        },
        _initImgList: function() {
            var i = this;
            this.imgData = [],
            [this.officialImgList, this.userImgList].each(function(t, e) {
                t.each(function(t, s) {
                    var a = {}
                      , n = t.parentNode();
                    t.attr("_src") && t.attr("src", t.attr("_src")),
                    n.css("display", "block"),
                    n.attr("data-index", s),
                    a.pid = t.attr("pid"),
                    a.src = t.attr("data-bigpic"),
                    i.category === ["official", "user"][e] && i.imgData.push(a)
                })
            })
        },
        _setCurrent: function(i) {
            this.divPicModal.find(".pic_right .current").removeClass("current"),
            this.divPicModal.find(".pic_right a[pid=" + i + "]").addClass("current")
        },
        _typeofPid: function(i) {
            var t = this.divOfficialPic.find(".pic_right a[pid=" + i + "]")
              , e = this.divUserPic.find(".pic_right a[pid=" + i + "]");
            return e.length ? "user" : t.length ? "official" : "unknown"
        },
        show: function(t) {
            var e, s, a = i("#J_PicSelect a"), n = this.divPicModal.find(".pic_type_select a");
            t = t || this.divPicModal.find(".pic_right .pic_s")[0].getAttribute("pid"),
            "user" === this._typeofPid(t) ? (this.category = "user",
            e = this.divUserPic,
            s = a.last()) : (this.category = "official",
            e = this.divOfficialPic,
            s = a.first()),
            this.divPicModal.find(".pic_info .total").html(e.find(".pic_s").length);
            var r = i("#hod_detail_picture");
            r.attr("data-pic_num", e.find(".pic_s").length),
            o ? s.trigger(d) : s[0] && s[0].click(),
            n = e.find(".pic_type_select a"),
            o ? n.trigger(d) : n[0] && n[0].click(),
            this.reshow && (this._initImgList(),
            this.mySwipe.setup()),
            this.reshow = !0,
            this._setCurrent(t);
            var c = e.find(".pic_right a[pid=" + t + "]")
              , l = c.attr("data-index");
            this._setupSlide(l)
        },
        _setSclTop: function(i) {
            var t = this.divPicModal.find(".pic_right")
              , e = t.offset()
              , s = i.offset();
            if (s.top + s.height > e.top + e.height || s.top < e.top)
                var a = t[0].scrollTop
                  , n = t[0].scrollTop + s.top - e.top
                  , o = n - a
                  , d = 0
                  , r = setInterval(function() {
                    t[0].scrollTop += Math[o > 0 ? "floor" : "ceil"](o / 10),
                    d += 10,
                    d > 100 && (t[0].scrollTop = n,
                    clearInterval(r))
                }, 10)
        },
        _initImgView: function() {
            var t = this
              , e = this.divOfficialPic
              , s = this.divPicModal.find(".pic_right")
              , a = this.divPicModal.find(".pic_text")
              , n = this.divPicModal.find(".pic_copyright");
            s.bind(d, function(o) {
                var d = o.target;
                "IMG" != d.tagName && "SPAN" != d.tagName || (d = d.parentNode);
                var r = i(d);
                if (!r.hasClass("current") && "A" == d.tagName) {
                    s.find(".current").removeClass("current"),
                    r.addClass("current");
                    var c = "";
                    e.length && e.hasClass("hidden") && (c = a.attr("data-hotelname")),
                    a.html(c + r.find(".pic_name").html()),
                    "T" == r.find("img").attr("data-vfm") ? n.removeClass("hidden") : n.addClass("hidden");
                    var l = Number(r.attr("data-index"));
                    t.divPicModal.find(".pic_info .c").html(l + 1),
                    t._setupSlide(l),
                    t._setSclTop(r);
                    var h = i("#hod_detail_picture");
                    h.attr("data-cli_type", "3"),
                    tracklog.hotDetailPictureTrack(h)
                }
            });
            var r = this.divPicModal.find(".pic_left .prev, .pic_left .next");
            r.bind(d, function(e) {
                for (var s = i(e.target), a = t.mySwipe; "DIV" !== s[0].tagName.toUpperCase(); )
                    s = s.parentNode();
                s.hasClass("prev") ? a.prev() : a.next();
                var n = i("#hod_detail_picture");
                n.attr("data-cli_type", "3"),
                tracklog.hotDetailPictureTrack(n)
            }),
            o ? this.divPicModal.find(".pic_left .next span").addClass("hover") : r.bind("mouseenter", function(e) {
                var s = i(e.target)
                  , a = t.mySwipe.getPos();
                t.imgData.length > 1 && (s.hasClass("prev") && a > 0 || s.hasClass("next") && a < t.mySwipe.getNumSlides() - 1) && s.find("span").addClass("hover")
            }).bind("mouseleave", function(t) {
                var e = i(t.target);
                e.find("span").removeClass("hover")
            })
        },
        _initImgDesc: function() {
            var i = this.divPicModal
              , t = i.find(".pic_bottom_info")
              , e = t.find(".toggle");
            e.bind(d, function(i) {
                t.hasClass("pic_bottom_hidden") ? t.removeClass("pic_bottom_hidden") : t.addClass("pic_bottom_hidden")
            }),
            this._addImgDesc()
        },
        _addImgDesc: function() {
            var i = this.divPicModal
              , t = this.divOfficialPic
              , e = this.divUserPic
              , s = i.find(".pic_bottom_info")
              , a = s.find(".toggle")
              , n = s.find(".pic_bottom_content")
              , o = s.find(".pic_upload_txt")
              , d = this.category
              , r = "user" === d ? e : t
              , c = r.find(".pic_right .current")
              , l = c.find("img")
              , h = i.find(".J_imgDesc[pid=" + c.attr("pid") + "]").html()
              , p = l.attr("data-date")
              , u = l.attr("data-nick");
            p ? (o.find("#J_picOwner").html(u),
            o.find("#J_PicDate").html(p),
            o.removeClass("hidden")) : o.addClass("hidden"),
            clearTimeout(this.imgDescTimer),
            h ? (a.removeClass("hidden"),
            s.removeClass("hidden"),
            s.removeClass("pic_bottom_hidden"),
            n.html(h),
            this.imgDescTimer = setTimeout(function() {
                s.addClass("pic_bottom_hidden")
            }, 5e3)) : p ? (a.addClass("hidden"),
            s.removeClass("hidden")) : s.addClass("hidden")
        },
        _initCategoryTab: function() {
            var t = this
              , e = i("#J_PicSelect a")
              , s = this.divOfficialPic
              , a = this.divUserPic
              , n = s.find(".pic_type_select a")
              , l = a.find(".pic_type_select a");
            e.bind(d, function(a) {
                var h, p = i(this), u = i("#hod_detail_picture");
                u.attr("data-cli_type", "1"),
                p.hasClass("active") || (e.removeClass("active"),
                p.addClass("active"),
                c && null !== r && (r = "one"),
                s.length && s.hasClass("hidden") ? (t.divUserPic.addClass("hidden"),
                t.divOfficialPic.removeClass("hidden"),
                t.category = "official",
                h = n.filter(".current"),
                h.length || (h = n.first()),
                u.attr("data-source", "酒店官方")) : (t.divOfficialPic.addClass("hidden"),
                t.divUserPic.removeClass("hidden"),
                t.category = "user",
                h = l.filter(".current"),
                h.length || (h = l.first()),
                u.attr("data-source", "用户上传")),
                t._initImgList(),
                t.mySwipe.setup(),
                o ? h.trigger(d) : h.length && h[0].click(),
                t.lastCategory = t.category,
                r && null !== r && c && c.toLowerCase() != "unTrack".toLowerCase() && tracklog.hotDetailPictureTrack(u))
            })
        },
        _initImgTab: function() {
            var t = this
              , e = this.divPicModal
              , s = this.divOfficialPic
              , a = this.divUserPic
              , n = s.find(".pic_s")
              , o = a.find(".pic_s")
              , l = e.find(".pic_info .c")
              , h = e.find(".pic_info .total")
              , p = e.find(".pic_type_select a")
              , u = s.find(".pic_type_select a")
              , v = a.find(".pic_type_select a")
              , f = e.find(".pic_right")
              , m = e.find(".pic_text");
            p.bind(d, function(e) {
                var a = t.category
                  , d = "user" === a ? o : n
                  , p = "user" === a ? v : u;
                e.stop();
                var _ = i(e.target);
                if (!_.hasClass("current") || t.lastCategory !== a) {
                    var g = 0
                      , b = _.attr("data-type")
                      , x = b.split(",")
                      , P = [];
                    p.removeClass("current"),
                    _.addClass("current"),
                    d.each(function(i) {
                        var t = i.attr("pic-type");
                        if (x.indexOf(t) !== -1) {
                            var e = {}
                              , s = i.find("img");
                            i.css("display", "block"),
                            i.attr("data-index", g++),
                            e.pid = s.attr("pid"),
                            e.src = s.attr("data-bigpic"),
                            P.push(e)
                        } else
                            i.css("display", "none"),
                            i.attr("data-index", "")
                    }),
                    t.imgData = P,
                    1 == P.length ? t.divPicModal.find(".swipe-wrap").html('<img src="' + P[0].src + '">') : 2 == P.length ? (t._initSlideDiv(0, 1),
                    t.mySwipe.setPos(0),
                    t.mySwipe.setup()) : P.length > 2 && (t._initSlideDiv(0, 1, 2),
                    t.mySwipe.setPos(0),
                    t.mySwipe.setup());
                    var y = P[0].pid;
                    l.html(1),
                    h.html(P.length),
                    f[0].scrollTop = 0,
                    t._setCurrent(y);
                    var C = "";
                    s.length && s.hasClass("hidden") && (C = m.attr("data-hotelname")),
                    m.html(C + f.find('a[pid="' + y + '"] .pic_name').html()),
                    t._addImgDesc();
                    var I = i("#hod_detail_picture");
                    I.attr("data-pic_type", b),
                    I.attr("data-pic_rank", "1"),
                    I.attr("data-pic_num", P.length),
                    r && r.toLowerCase() !== "one".toLowerCase() && (I.attr("data-cli_type", "2"),
                    null !== r && c && c.toLowerCase() != "unTrack".toLowerCase() && tracklog.hotDetailPictureTrack(I)),
                    r = "two"
                }
            })
        },
        _setupSlide: function(i) {
            var t = 1
              , e = this.imgData.length;
            i = Number(i),
            e < 3 ? (t = i,
            this._initSlideDiv(0, 1)) : 0 == i ? (t = 0,
            this._initSlideDiv(0, 1, 2)) : i > 0 && i < e - 1 ? (t = 1,
            this.mySwipe.setPos(0),
            this._initSlideDiv(i - 1, i, i + 1)) : i == e - 1 && (t = 2,
            this.mySwipe.setPos(0),
            this._initSlideDiv(i - 2, i - 1, i)),
            this.mySwipe.setup(),
            this.mySwipe.slide(t)
        },
        _initSlideDiv: function(t, e, s) {
            var a = this.imgData
              , n = '<div style="float:left;position:relative;background:url(//pic.c-ctrip.com/common/loading_50.gif) no-repeat center center;" pid="' + a[t].pid + '" data-true-index="' + t + '"><img src="' + a[t].src + '"></div><div style="float:left;position:relative;background:url(//pic.c-ctrip.com/common/loading_50.gif) no-repeat center center;" pid="' + a[e].pid + '" data-true-index="' + e + '"><img src="' + a[e].src + '"></div>';
            s && (n += '<div style="float:left;position:relative;background:url(//pic.c-ctrip.com/common/loading_50.gif) no-repeat center center;" pid="' + a[s].pid + '" data-true-index="' + s + '"><img src="' + a[s].src + '"></div>'),
            this.divPicModal.find(".swipe-wrap").html(n);
            var o = i("#hod_detail_picture");
            o.attr("data-pictureid", a[t].pid)
        },
        _initSlide: function() {
            var t = this
              , e = this.divPicModal
              , s = this.divOfficialPic
              , a = e.find(".pic_left .num .c")
              , n = e.find(".pic_b")[0]
              , o = e.find(".prev span")
              , d = e.find(".next span")
              , r = e.find(".pic_text");
            this.mySwipe = Swipe(n, {
                width: 550,
                callback: function(n, c) {
                    var l = c.getAttribute("pid")
                      , h = Number(c.getAttribute("data-true-index"));
                    e.find(".pic_right .current").removeClass("current");
                    var p = e.find('.pic_right a[pid="' + l + '"]');
                    p.addClass("current"),
                    t._setSclTop(p),
                    a.html(h + 1);
                    var u = i("#hod_detail_picture");
                    u.attr("data-pictureid", l),
                    u.attr("data-pic_rank", h + 1);
                    var v = "";
                    s.length && s.hasClass("hidden") && (v = r.attr("data-hotelname")),
                    r.html(v + p.find(".pic_name").html()),
                    t._addImgDesc(),
                    0 == h ? o.removeClass("hover") : h == t.imgData.length - 1 ? d.removeClass("hover") : (o.addClass("hover"),
                    d.addClass("hover"))
                },
                transitionEnd: function(i, e) {
                    var s = t.mySwipe
                      , a = Number(e.getAttribute("data-true-index"));
                    if (0 == i && a > 0) {
                        var n = a + 1;
                        t._initSlideDiv(n - 2, n - 1, n),
                        s.setPos(1),
                        s.setup()
                    }
                    if (i == s.getNumSlides() - 1 && a < t.imgData.length - 1) {
                        var o = a - 1;
                        t._initSlideDiv(o, o + 1, o + 2),
                        s.setPos(1),
                        s.setup()
                    }
                }
            })
        }
    },
    a.prototype = {
        constructor: a,
        initPic360: function() {
            var i = !1
              , t = this.divPicModal.find("#J_ctrip_old360")
              , e = this.divPicModal.find("#J_ctrip_new360");
            $J_ctrip_VR = this.divPicModal.find("#J_VR"),
            e[0] ? (e.css("display", "block"),
            i || (this._initNewPic360({
                numId: "#J_360Pic_num",
                txtId: "#J_ctrip_360_txt",
                picId: "#J_ctrip_360_pic"
            }),
            i = !0)) : t[0] ? t.css("display", "block") : $J_ctrip_VR.length > 0 && this._initVR()
        },
        endVRAnimation: function() {
            var i = this.divPicModal.find("#J_VR");
            if (i.length > 0 && (this.divPicModal.find(".J_VRanimation").removeClass("btn_stop"),
            this.divPicModal.find(".J_VRanimation").addClass("btn_play"),
            e.frames.J_IframeVR.stopRotate))
                try {
                    e.frames.J_IframeVR.stopRotate()
                } catch (t) {}
        },
        _initVR: function() {
            var t = this
              , s = "/hotel/IframeVR.aspx?vrurl=";
            i.browser.isAllIE && (s = "/hotel/IframeVR.aspx?jsdebug=t&vrurl="),
            t.divPicModal.find(".ctrip_360_txt_cont li").bind("click", function() {
                i(this).hasClass("current") || (t.divPicModal.find(".J_VRanimation").removeClass("btn_stop"),
                t.divPicModal.find(".J_VRanimation").addClass("btn_play"),
                t.divPicModal.find(".current").removeClass("current"),
                i(this).addClass("current"),
                i("#J_IframeVR")[0].src = s + i(this).attr("data-url"))
            });
            var a = 0
              , n = 6;
            if (t.divPicModal.find(".menu_top").bind("click", function() {
                i(this).hasClass("menu_top_dis") || (a--,
                t.divPicModal.find(".ctrip_360_txt_cont li:eq(" + a + ")").css("display", ""),
                t.divPicModal.find(".ctrip_360_txt_cont li:eq(" + n + ")").css("display", "none"),
                n--,
                0 == a && i(this).addClass("menu_btm_dis"),
                t.divPicModal.find(".menu_btm").removeClass("menu_btm_dis"))
            }),
            t.divPicModal.find(".menu_btm").bind("click", function() {
                i(this).hasClass("menu_btm_dis") || (t.divPicModal.find(".ctrip_360_txt_cont li:eq(" + a + ")").css("display", "none"),
                a++,
                n++,
                t.divPicModal.find(".ctrip_360_txt_cont li:eq(" + n + ")").css("display", ""),
                n == t.divPicModal.find(".ctrip_360_txt_cont li").length - 1 && i(this).addClass("menu_btm_dis"),
                t.divPicModal.find(".menu_top").removeClass("menu_top_dis"))
            }),
            t.divPicModal.find(".J_VRanimation").bind("click", function() {
                if (i(this).hasClass("btn_play")) {
                    i(this).removeClass("btn_play"),
                    i(this).addClass("btn_stop");
                    try {
                        e.frames.J_IframeVR.startRotate()
                    } catch (t) {}
                } else {
                    i(this).removeClass("btn_stop"),
                    i(this).addClass("btn_play");
                    try {
                        e.frames.J_IframeVR.stopRotate()
                    } catch (t) {}
                }
            }),
            i.browser.isAllIE && !i.browser.isIE11)
                i("#J_IframeVR").css("display", "none"),
                i("#J_VR .J_VRanimation").css("display", "none"),
                i(".ctrip_360_tip").css("display", "none"),
                i(".ctrip_360_browser").css("display", "");
            else {
                i(".ctrip_360_tip").css("display", "");
                var o = setTimeout(function() {
                    i(".ctrip_360_tip").css("display", "none"),
                    clearTimeout(o)
                }, 1e3)
            }
        },
        _initNewPic360: function(t) {
            var e = this
              , s = i(t.picId)
              , a = i(t.numId);
            if (s[0]) {
                this._showLoading(s[0]),
                i.Pic360List({
                    data: null
                }, t.txtId);
                var n = this.divPicModal.find("#J_ctrip_360_txt .ctrip_360_txt_cont li")
                  , o = i.Pic360({}, t.picId);
                o.showImg(i(n[0]).attr("data-url"), function(i, t) {
                    e._hideLoading(s[0])
                }),
                n.bind(d, function(t) {
                    var d = i(this).attr("data-url");
                    if (a.find("span")[0]) {
                        var r = i(this).attr("data-index");
                        a.find("span").html(r)
                    }
                    if (n.removeClass("current"),
                    i(this).addClass("current"),
                    o.imgObj.img.src !== d) {
                        o.controllObj && (o.controllObj.box.style.display = "none"),
                        o.imgObj.imgBox.style.display = "none",
                        e._showLoading(s[0]),
                        o.showImg(d, function(i, t) {
                            e._hideLoading(s[0])
                        });
                        var c = i("#hod_detail_picture")
                          , l = i(this).find("a").attr("title");
                        c.attr("data-picType", l),
                        tracklog.threeSixZoreTrack(c)
                    }
                })
            }
        },
        _showLoading: function(t, e) {
            var s = t.clientHeight || t.offsetHeight
              , a = t.clientWidth || t.offsetWidth;
            s && a || (s = parseInt(i(t).css("height")),
            a = parseInt(i(t).css("width")));
            var n = Math.abs((s - 80) / 2)
              , o = Math.abs(s - n);
            if (t.loading)
                t.loading.style.height = o + "px",
                t.loading.style.width = a + "px",
                t.loading.style.paddingTop = n + "px",
                t.loading.style.opacity = "",
                t.loading.style.filter = "",
                t.loading.style.display = "";
            else {
                var d = i.create("div", {
                    innerHTML: '<img src="//pic.ctrip.com/common/loading_50.gif" /></div>',
                    cssText: i.format("height:$1px;width:$2px;padding-top:$3px;text-align:center;background-color:#fff", o, a, n)
                });
                t.appendChild(d),
                t.loading = d
            }
        },
        _hideLoading: function(i) {
            i.loading.style.display = "none"
        }
    };
    var l = function(i) {
        this.init(i)
    };
    l.prototype = {
        init: function(t) {
            if (this.options = {
                data: {},
                btnPrev: null,
                btnNext: null,
                divPrev: null,
                divNext: null,
                lblNum: null,
                lblSum: null,
                lblTitle: null,
                objImg: null,
                objBox: null,
                source: null,
                curIndex: 1,
                curId: null,
                showLen: 0,
                width: 0,
                moveLen: 1,
                onSelect: function() {}
            },
            i.extend(this.options, t),
            this.data = this.options.data || [],
            this.data.length) {
                if (this.options.curId) {
                    var e = 1;
                    if (this.options.data && this.options.data.length > 0)
                        for (var s = 0; s < this.options.data.length; s++)
                            this.options.data[s].pid == this.options.curId && (e = parseInt(this.options.data[s].index) + 1);
                    this.options.curIndex = e
                }
                this.left = 0,
                this.max = this.data.length,
                this.mid = Math.ceil(this.options.showLen / 2),
                this.curIndex = this.options.curIndex,
                this.posIndex = this.getPosIndex(),
                this.items = null,
                this.timer = null,
                this.lock = !1,
                this.max && this.options.objBox && (this.setHTML(),
                this.handleBind())
            }
        },
        getPosIndex: function() {
            return this.curIndex <= this.mid || this.max <= this.options.showLen ? 1 : this.curIndex > this.max - this.mid ? this.max - this.options.showLen + 1 : this.curIndex - this.mid + 1
        },
        setHTML: function() {
            this.options.objBox.style.left = "0px",
            this.items = this.options.objBox.children,
            this.openPictureByIndex(this.curIndex)
        },
        openPictureByIndex: function(i) {
            i < 1 ? i = 1 : i > this.max && (i = this.max),
            this.lock = !0,
            this.toCurrent(i)
        },
        openPictureById: function(i) {
            var t = 1;
            if (this.options.data && this.options.data.length > 0)
                for (var e = 0; e < this.options.data.length; e++)
                    this.options.data[e].pid == i && (t = parseInt(this.options.data[e].index) + 1);
            this.lock = !0,
            this.toCurrent(t)
        },
        handleBind: function() {
            i(this.options.btnPrev).bind(d, this.toPrevPage.bind(this)),
            i(this.options.btnNext).bind(d, this.toNextPage.bind(this)),
            i(this.options.divPrev).bind(d, this.toPrevImg.bind(this)).bind("mouseover", this.handleOver.bind(this)).bind("mouseout", this.handleOut),
            i(this.options.divNext).bind(d, this.toNextImg.bind(this)).bind("mouseover", this.handleOver.bind(this)).bind("mouseout", this.handleOut),
            i(this.options.objBox).bind(d, this.toClick.bind(this))
        },
        toPrevPage: function(i) {
            i = i || e.event;
            var t = this.options.btnPrev;
            this.lock || /disable/i.test(t.className) || (this.lock = !0,
            this.posIndex -= this.options.showLen,
            this.posIndex <= 1 && (this.posIndex = 1,
            t.className = this.options.prevDisabledCls || "page_up_disable"),
            this.options.btnNext.className = this.options.nextCls || "page_down",
            this.marquee(-(this.posIndex - 1) * this.options.width),
            this.showImg(this.posIndex),
            i.preventDefault ? i.stopPropagation() : i.cancelBubble = !0,
            i.preventDefault ? i.preventDefault() : i.returnValue = !1)
        },
        toNextPage: function(i) {
            i = i || e.event;
            var t = this.options.btnNext;
            if (!this.lock && !/disable/i.test(t.className)) {
                this.lock = !0;
                var s = this.max - this.options.showLen + 1;
                this.posIndex += this.options.showLen,
                this.posIndex >= s && (this.posIndex = s,
                t.className = this.options.nextDisabledCls || "page_down_disable"),
                this.options.btnPrev.className = this.options.prevCls || "page_up",
                this.marquee(-(this.posIndex - 1) * this.options.width),
                this.showImg(this.posIndex),
                i.preventDefault ? i.stopPropagation() : i.cancelBubble = !0,
                i.preventDefault ? i.preventDefault() : i.returnValue = !1
            }
        },
        toClick: function(i) {
            i = i || e.event;
            for (var t = i.target || i.srcElement; t !== this.options.objBox && null === t.getAttribute("data-index"); )
                t = t.parentNode;
            if (!this.lock) {
                this.lock = !0;
                var s = parseInt(t.dataset ? t.dataset.index : t.getAttribute("data-index"));
                this.toCurrent(s)
            }
            i.preventDefault ? i.stopPropagation() : i.cancelBubble = !0,
            i.preventDefault ? i.preventDefault() : i.returnValue = !1
        },
        toPrevImg: function(i) {
            if (i = i || e.event,
            !this.lock && 1 != this.curIndex) {
                this.lock = !0;
                var t = this.curIndex - 1;
                this.toCurrent(t),
                1 == t && (this.options.divPrev.childNodes[0].className = "",
                this.options.divPrev.style.cursor = "auto"),
                i.preventDefault ? i.stopPropagation() : i.cancelBubble = !0,
                i.preventDefault ? i.preventDefault() : i.returnValue = !1
            }
        },
        toNextImg: function(i) {
            if (i = i || e.event,
            !this.lock && this.curIndex != this.max) {
                this.lock = !0;
                var t = this.curIndex + 1;
                this.toCurrent(t),
                t == this.max && (this.options.divNext.childNodes[0].className = "",
                this.options.divNext.style.cursor = "auto"),
                i.preventDefault ? i.stopPropagation() : i.cancelBubble = !0,
                i.preventDefault ? i.preventDefault() : i.returnValue = !1
            }
        },
        toCurrent: function(i) {
            var t = this.options
              , e = t.nextCls || "page_down"
              , s = t.nextDisabledCls || "page_down_disable"
              , a = t.prevCls || "page_up"
              , n = t.prevDisabledCls || "page_up_disable"
              , o = t.activeCls || "current";
            onSelect = t.onSelect,
            this.items[this.curIndex - 1].className = "",
            this.items[i - 1].className = o,
            this.options.btnPrev.className = i <= this.mid || this.max <= this.options.showLen ? n : a,
            this.options.btnNext.className = i > this.max - this.mid || this.max <= this.options.showLen ? s : e;
            var d = this.data[i - 1] || {
                max: "//pic.c-ctrip.com/common/pic_alpha.gif",
                info: "",
                source: ""
            }
              , r = this.options.objImg;
            d.max && (r.src = d.max),
            r.onerror || (r.onerror = function() {
                r.src = "//pic.c-ctrip.com/hotels110127/no_pic486.png",
                r.onerror = null
            }
            ),
            this.options.lblTitle.innerHTML = d.info,
            this.options.lblNum.innerHTML = i,
            this.options.source.innerHTML = d.source,
            this.curIndex = i,
            this.posIndex = this.getPosIndex(),
            this.marquee(-(this.posIndex - 1) * this.options.width),
            this.showImg(this.posIndex),
            onSelect.call(this, r, i)
        },
        showImg: function(i) {
            for (var t, e = i - 1, s = e + this.options.showLen; (t = this.items[e]) && e < s; e++) {
                var a = t.childNodes[0];
                a.src || (a.src = a.getAttribute("_src"),
                a.removeAttribute("_src"))
            }
        },
        marquee: function(i) {
            var t = parseInt(this.options.objBox.style.left)
              , e = i - t;
            0 == e ? (this.lock = !1,
            clearTimeout(this.timer)) : (this.options.objBox.style.left = t + (e > 0 ? Math.ceil(e / 5) : Math.floor(e / 3)) + "px",
            this.timer = setTimeout(function() {
                this.marquee(i)
            }
            .bind(this), 20))
        },
        handleOver: function(i) {
            i = i || e.event;
            var t = i.target || i.srcElement;
            "B" == t.nodeName.toUpperCase() ? t = t.parentNode : "DIV" == t.nodeName.toUpperCase() && (t = t.childNodes[0]),
            1 == this.curIndex && "prev" == t.parentNode.className || this.curIndex == this.max && "next" == t.parentNode.className ? (t.className = "",
            t.parentNode.style.cursor = "auto") : (t.className = "hover",
            t.parentNode.style.cursor = "pointer")
        },
        handleOut: function() {
            this.childNodes[0].className = "",
            this.style.cursor = "auto"
        }
    },
    n.prototype = {
        constructor: n,
        initVedio: function() {
            var t = i("#J_videosList a")
              , e = [];
            t.each(function(i, t) {
                e.push({
                    flashvars: i.attr("data-v"),
                    info: i.find(".ellipsis").html()
                })
            });
            var s = {
                total: t.length,
                data: e,
                guid: ""
            }
              , a = '<iframe height="360" width="640" frameborder="0" scrolling="no" allowtransparency="true" src="http://yuntv.letv.com/bcloud.html?${flashvars}"/>'
              , n = function(i) {
                return a.replace("${flashvars}", i)
            }
              , o = s.data;
            new l({
                data: s.data,
                btnPrev: document.getElementById("J_prevVideo"),
                btnNext: document.getElementById("J_nextVideo"),
                lblNum: document.getElementById("J_curVideoIndex"),
                lblSum: document.getElementById("J_totalVideos"),
                lblTitle: document.getElementById("J_videoTitle"),
                objImg: i("#J_videoStage")[0],
                objBox: document.getElementById("J_videosList"),
                source: "",
                showLen: 4,
                width: 156,
                curId: s.guid || "",
                prevCls: "prev_btn",
                prevDisabledCls: "prev_btn disabled",
                nextCls: "next_btn",
                nextDisabledCls: "next_btn disabled",
                activeCls: "active",
                onSelect: function(i, t) {
                    var e = n(o[t - 1].flashvars);
                    i.innerHTML = e,
                    lastVideoHtml = e
                }
            })
        }
    };
    var h = {
        _switchTab: function(t) {
            var e = this.divPicModal.find("div.contpanel");
            return e.each(function(e, s) {
                e.attr("data-category") == t ? (e.removeClass("hidden"),
                i("#J_VR").length > 0 && h.mods.pic360.endVRAnimation(),
                i(".view_video_detail").length > 0 && ("video" == t ? setTimeout(function() {
                    i(".view_video_detail")[0].play()
                }, 200) : i(".view_video_detail")[0].pause())) : (e.hasClass("hidden") || e.addClass("hidden"),
                i("#J_ctrip_old360") && i("#J_ctrip_old360").css("display", "block"))
            }),
            this
        },
        show: function(i, t) {
            c && (c = "unTrack");
            var e, s = this.divPicModal;
            i && (this._switchTab(i),
            e = this.mods[i]),
            s.removeClass("hidden"),
            s.mask(),
            e && e.show && e.show(t),
            c && (c = "track")
        },
        hide: function() {
            i(".view_video_detail").length > 0 && i(".view_video_detail")[0].pause(),
            this.divPicModal.unmask(),
            this.divPicModal.addClass("hidden"),
            r = null
        },
        _bindGloEvent: function() {
            this.divPicModal.find(".close").bind(d, this.hide.bind(this))
        },
        init: function(t, e) {
            var o = this
              , r = this.divPicModal = i("#divPicModal");
            this._bindGloEvent(),
            o.mods = {
                pic: new s({
                    divPicModal: r
                }),
                pic360: new a({
                    divPicModal: r
                }),
                video: new n({
                    divPicModal: r
                })
            },
            r.find(".view_360_link").bind(d, function() {
                o._switchTab("pic360")
            }),
            r.find(".ctrip_360_panorama_btn").bind(d, function() {
                o._switchTab("pic")
            }),
            r.find(".view_video_link").bind(d, function() {
                o._switchTab("video")
            }),
            this.show(t || "pic", e)
        }
    };
    t.mainPanelModal = h
}(cQuery, cQuery.BizMod, window);
