#크롤링 공부용


from bs4 import BeautifulSoup
import requests

headers = {"User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"}

url = "https://www.melon.com/chart/"
r = requests.get(url, headers=headers)

# print(r.raise_for_status)

html = r.text

soup = BeautifulSoup(html, "html.parser")

lst50 = soup.select(".lst50")

lst100 = soup.select(".lst100")

lst = lst50 + lst100

for e, i in enumerate (lst, 1):
    print(f"<<{e}위>>")
    title = i.select_one(".ellipsis.rank01 a")
    print("제목 : " + title.text)
    singers = i.select(".ellipsis.rank02 > a")
    print("가수 : ", end='')
    for singer in singers:
        print(singer.text, end=' ')
        print()
    album = i.select_one(".ellipsis.rank03 > a")
    print("앨범명 : " + album.text)
    print()