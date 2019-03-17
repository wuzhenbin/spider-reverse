

'''
新浪文化
http://cul.book.sina.com.cn/
'''

import requests
import json
from requests.exceptions import RequestException
import re


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36'
}

def get_page(url):
    try:
        response = requests.get(url,headers=headers)
        if response.status_code == 200:
            if response.encoding == 'ISO-8859-1':
                encodings = requests.utils.get_encodings_from_content(response.text)
                if encodings:
                    encoding = encodings[0]
                else:
                    encoding = response.apparent_encoding

                #如果设置为replace，则会用?取代非法字符；
                encode_content = response.content.decode(encoding, 'replace')
                return encode_content

            return response.text

        return None
    except RequestException as e:
        print('err: %s' % e)

def main():
    html = get_page('http://feed.mix.sina.com.cn/api/roll/get?pageid=411&lid=2595&num=22&encode=utf-8&page=1&callback=newsloadercallback&_=1552805928209')
    pattern_header =  re.compile('try{newsloadercallback\(',re.S)
    pattern_tail =  re.compile('\);\}catch\(e\){};$',re.S)
    result =  re.sub(pattern_header,'',html)
    result =  re.sub(pattern_tail,'',result)
    res = json.loads(result)
    lis = res['result']['data']
    for item in lis:
        print(item['title'])

if __name__ == '__main__':
	main()