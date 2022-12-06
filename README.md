# discord 채팅을 이용한 자동응답 bot 프로젝트
#### 소프트웨어학부 성동진 2022016844, 소프트웨어학부 최정현 2022042179
## 1. 디스코드에서 반복적으로 나오는 질문에 대한 답변을 자동화 하여 사용자의 시간을 아껴준다.
## 2.	개발 시스템
서버PC사용 -> 호스팅 서버이용(24시간 구동)으로 발전
## 3.	핵심기술
 -Discord 봇 서버구축(기본 작동)
 -서버 호스팅
 -크롤링

## 4.	결과물
<img width="887" alt="학생식당" src="https://user-images.githubusercontent.com/87527275/205844411-9e4b500e-4f11-45e6-b2c4-bba21a253594.png">

```js

if (message.content == "오늘학식" || message.content == "학식" || message.content == "ㅎㅅ" || message.content == "학생식당") {
    getHtml('https://www.hanyang.ac.kr/web/www/re12')
      .then((html) => {
        const $ = cheerio.load(html.data);
        const data = {
          //첫번째 학식
          mainContents: $('#messhall1 > div:nth-child(1) > div > div > div > ul > li:nth-child(1) > a > h3')
            .text()
            .replace(/[\n\t\&amp;]/g, ''),
          //두번째 학식
          secondContents: $('#messhall1 > div:nth-child(1) > div > div > div > ul > li:nth-child(2) > a > h3')
            .text()
            .replace(/[\n\t\&amp;]/g, ''),
          //공통찬
          thirdContents: $('#messhall1 > div:nth-child(2) > table')
            .text()
            .replace(/[\n\t\&amp;\공통찬]/g, '')
          ,
        };
        if (data.mainContents == '') {
          data.mainContents = "오늘은 학식이 없습니다.";
          data.secondContents = "오늘은 학식이 없습니다.";
        }
        return data;
      }) //학식, 공통찬 출력
      .then((res) => message.reply({ content: ("(학식) 운영시간 : 11:30 ~ 13:30\n" + 
      res.mainContents + "\n" + res.secondContents + "\n[공통] " + res.thirdContents) }));

  }

```
<img width="871" alt="창의인재원식당" src="https://user-images.githubusercontent.com/87527275/205844407-35dfbffb-4400-4373-bad2-151a4cf36c10.png">
<img width="873" alt="교직원식당" src="https://user-images.githubusercontent.com/87527275/205844391-861874b3-3840-4cf5-aa46-4de167788c40.png">



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

