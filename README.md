
* 줄바꿈
끝에 <br> 붙이거나 스페이스 두번.

* 글자체
**bold**<br>
_italic_
~~strikethrough~~

* 링크넣기
[링크 이름] (www.naver.com)

# discord 채팅을 이용한 자동응답 bot 프로젝트
### 소프트웨어학부 성동진2022016844, 소프트웨어학부 최정현2022042179
## 1. 디스코드에서 반복적으로 나오는 질문에 대한 답변을 자동화 하여 사용자의 시간을 아껴준다.
## 2.	개발 시스템
서버PC사용 -> 호스팅 서버이용(24시간 구동)으로 발전
## 3.	핵심기술
 -Discord 봇 서버구축(기본 작동)
 -서버 호스팅
 -크롤링

## 4.	결과물

<img width="871" alt="멜론" src="https://user-images.githubusercontent.com/87527275/205844395-a21aa901-6933-4d94-80cc-f669fce859af.png">

```js

var melon = "";
var crawledMusic = []
const URL = `https://www.melon.com/chart/`;

axios.get(URL).then(res => {
  console.log(res.status);
  if (res.status == 200) {

    // empty array
    let crawledMusic = [];

    // res.data에 있는 tag를 cheerio로 검색하여 변수에 담기
    const $ = cheerio.load(res.data);
    const $musicList = $('#lst50');

    $musicList.each(function(i) {
      crawledMusic[i] = {
        title: $(this).find('#lst50 > td > div > div > div.ellipsis.rank01 > span > a').text().trim(),
        artist: $(this).find('#lst50 > td > div > div > div.ellipsis.rank02 > a').text()
      };
    });
    for (var i = 0; i < 50; i++) {
      // console.log("<<" + (i+1) + "위>>\n" + "제목 : " + crawledMusic[i].title + "\n가수 : " + crawledMusic[i].artist + "\n");
      melon = melon + (`${i + 1}위\n제목 : ${crawledMusic[i].title}\n가수 : ${crawledMusic[i].artist}\n\n`);
    }
  } else {
    console.log("server response error");
  }
});

```

<img width="877" alt="셔틀버스시간" src="https://user-images.githubusercontent.com/87527275/205844398-2db0cf4d-afc3-4596-90ee-fbe190532d00.png">
<img width="876" alt="시간" src="https://user-images.githubusercontent.com/87527275/205844402-2e146929-fb2d-4857-8727-60edb4b660c2.png">
<img width="878" alt="점심메뉴추천" src="https://user-images.githubusercontent.com/87527275/205844405-a891e3cd-2972-4a4b-8a00-311bd6db64af.png">
<img width="871" alt="창의인재원식당" src="https://user-images.githubusercontent.com/87527275/205844407-35dfbffb-4400-4373-bad2-151a4cf36c10.png">
<img width="887" alt="학생식당" src="https://user-images.githubusercontent.com/87527275/205844411-9e4b500e-4f11-45e6-b2c4-bba21a253594.png">
<img width="873" alt="교직원식당" src="https://user-images.githubusercontent.com/87527275/205844391-861874b3-3840-4cf5-aa46-4de167788c40.png">
