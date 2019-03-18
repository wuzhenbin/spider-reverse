

'''
携程热门酒店
https://hotels.ctrip.com/


AjaxPadGetPosition: "/domestic/tool/AjaxPadGetPosition.aspx"
ajaxGetHotelAddtionalInfo: "/Domestic/tool/AjaxGetHotelAddtionalInfo.ashx?browseData=1&from=0&viewCount=3&traceid=3795272221687233776"
flt_action: "//vacations.ctrip.com/AHDBooking/"
hotHotelUrl: "//hotels.ctrip.com/hotsale"
hothotel: "/Domestic/Tool/AjaxIndexHotSaleHotelNew.aspx?traceid=3795272221687233776"
hyattUrl: "/flagship/hyatt"
sublandmark: "/Domestic/Tool/AjaxGetSubThemeLandMark.aspx?traceid=3795272221687233776"
themeCity: "/Domestic/Tool/AjaxFeatureSelect.ashx"
__AllyesParam__: "sitetype=HTLCITY&biztype=301&adlist=%5b%7b%22pagecode%22%3a%221%22%2c%22domid%22%3a%22divAllyes%22%2c%22type%22%3a%220%22%7d%2c%7b%22pagecode%22%3a%222%22%2c%22domid%22%3a%22divAllyes06%22%2c%22type%22%3a%220%22%7d%2c%7b%22pagecode%22%3a%223%22%2c%22domid%22%3a%22divAllyes07%22%2c%22type%22%3a%220%22%7d%2c%7b%22pagecode%22%3a%224%22%2c%22domid%22%3a%22divDailySpecial%22%2c%22type%22%3a%220%22%7d%5d&fscreen=0"
__AllyesUrl__: "//crm.ws.ctrip.com/Customer-Market-Proxy/AdCallProxyV2.aspx?"
'''
'''
获取热门酒店关键
HotelSearch.setCity(param.cityId, param.cityName, param.cityPY, param),
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
'''

import requests
import json
from requests.exceptions import RequestException
import re
from pyquery import PyQuery as pq


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36'
}

def get_response(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.text
        return None
    except RequestException as e:
        print('err: %s' % e)


def get_post(url,data):
    try:
        response = requests.post(url, data=data)
        if response.status_code == 200:
            return response.text
        return None
    except RequestException as e:
        print('err: %s' % e)

def get_city():
    # 如果出现验证码，进行验证
    '''
    https://seccenter.ctrip.com/seccenter/main.aspx?returnurl=http%3a%2f%2fhotels.ctrip.com%2fdomestic%2fTool%2fAjaxGetCitySuggestion.aspx&bgref=1884911984
    '''
    url = 'https://hotels.ctrip.com/Domestic/Tool/AjaxGetCitySuggestion.aspx'
    html = get_response(url)
    html_cut = html[90:]
    res = html_cut.replace('热门','"热门"').replace('display','"display"').replace('data','"data"').replace('group','"group"')
    content = re.sub('([A-Z]{2,})',r'"\1"',res)
    lis = eval(content)
    hot_list = lis['热门']
    for item in hot_list:
        arr = item['data'].split('|')
        cityId = arr[2]
        get_city_hot(cityId)


def get_city_hot(cityId=1):
    data = {
        'city': cityId,
        'type': 0,
    }
    html = get_post('https://hotels.ctrip.com/Domestic/Tool/AjaxIndexHotSaleHotelNew.aspx?traceid=803572077966064154',data=data)
    doc = pq(html)
    lis = doc('ul')
    for item in lis:
        title = pq(item).find('.searchresult_name a').text()
        print(title)

if __name__ == '__main__':
    get_city()






    