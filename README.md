# Discord 채팅을 이용한 디스코드 자동응답 bot 프로젝트
#### 소프트웨어학부 성동진 2022016844, 소프트웨어학부 최정현 2022042179
## 1. 개발 목적
디스코드에서 반복적으로 나오는 질문에 대한 답변을 자동화 하여 사용자의 시간을 아껴준다.
## 2.	개발 시스템
서버PC사용 -> 호스팅 서버이용(24시간 구동)으로 발전
## 3.	핵심기술
 -Discord 봇 서버구축(기본 작동)
 -서버 호스팅
 -크롤링

## 4.	결과물
### 4-1. 학생식당
<img width="887" alt="학생식당" src="https://user-images.githubusercontent.com/87527275/205844411-9e4b500e-4f11-45e6-b2c4-bba21a253594.png">

```js

client.on("messageCreate", (message) => {
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
}

```
### 4-2. 기숙사식당
<img width="871" alt="창의인재원식당" src="https://user-images.githubusercontent.com/87527275/205844407-35dfbffb-4400-4373-bad2-151a4cf36c10.png">

```js

client.on("messageCreate", (message) => {
if (message.content == "기숙사식당" || message.content == "긱식" || message.content == "오늘기식" || message.content == "기식" || message.content == "ㄱㅅ" || message.content == "창의인재원식당") {
    getHtml('https://www.hanyang.ac.kr/web/www/re13')
      .then((html) => {
        const $ = cheerio.load(html.data);
        const data = {
          //조식
          firstContents: $('#messhall1 > div:nth-child(1) > div > div > div > ul > li > a > h3')
            .text()
            .replace(/[\n\t]/g, '')
            .replace(/[\[특식\]]/g, ''),
          //중식1
          secondContents: $('#messhall1 > div:nth-child(2) > div > div > div > ul > li:nth-child(1) > a > h3')
            .text()
            .replace(/[\n\t]/g, '')
            .replace(/[\[특식\]]/g, ''),
          //중식2
          thirdContents: $('#messhall1 > div:nth-child(2) > div > div > div > ul > li:nth-child(2) > a > h3')
            .text()
            .replace(/[\n\t]/g, '')
            .replace(/[\[특식\]]/g, ''),
          // 석식
          forthContents: $('#messhall1 > div:nth-child(3) > div > div > div > ul > li > a > h3')
            .text()
            .replace(/[\n\t]/g, '')
            .replace(/[\[특식\]]/g, '')
          ,
        };
        if (data.firstContents == '') {
          data.firstContents = "오늘은 조식이 없습니다.";
        }
        else if (data.secondContents == '') {
          data.secondContents = "오늘은 중식 A 이/가 없습니다."
        }
        else if (data.thirdContents == '') {
          data.thirdContents = "오늘은 중식 B 이/가 없습니다."
        }
        else if (data.forthContents == '') {
          data.forthContents = "오늘은 석식이 없습니다."
        }
        return data;
      }) //학식, 공통찬 출력
      .then((res) => message.reply({ content: ("(창의인재원 식당)\n[조식 07:40~09:00]\n" + res.firstContents + "\n[중식 A 11:30~13:20]\n" + res.secondContents + "\n[중식 B 11:30~13:20]\n" + res.thirdContents + "\n[석식 17:10~18:40]\n" + res.forthContents) }));

  }
}

```
### 4-3. 교직원식당
<img width="873" alt="교직원식당" src="https://user-images.githubusercontent.com/87527275/205844391-861874b3-3840-4cf5-aa46-4de167788c40.png">

```js

client.on("messageCreate", (message) => {
if (message.content == "교직" || message.content == "교식" || message.content == "교직원식" || message.content == "ㄱㅈ" || message.content == "교직원식당") {
    getHtml('https://www.hanyang.ac.kr/web/www/re11')
      .then((html) => {
        const $ = cheerio.load(html.data);
        const data = {
          //첫번째 교식
          mainContents: $('#messhall1 > div:nth-child(1) > div > div > div > ul > li:nth-child(1) > a > h3')
            .text()
            .replace(/[\n\t]/g, '')
            .replace(/[*]/g, ' '),
        };
        if (data.mainContents == '') {
          data.mainContents = "오늘은 교식이 없습니다.";
        }
        return data;
      }) //학식, 공통찬 출력
      .then((res) => message.reply({ content: ("(교직원 식당) 운영시간 : 11:30 ~ 13:30\n" + res.mainContents) }));

  }
}

```
### 4-4. 멜론차트
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
client.on("messageCreate", (message) => {
if ((message.content == "멜론") || (message.content == "음악") || (message.content == "차트")) {
    message.reply({ content: (melon) });
  }
}

```
### 4-5. 셔틀버스 
<img width="877" alt="셔틀버스시간" src="https://user-images.githubusercontent.com/87527275/205844398-2db0cf4d-afc3-4596-90ee-fbe190532d00.png">
 
```js

var h = date.getHours();

var t7 = ["7:50"];
var t8 = ["8:00", "8:10", "8:15", "8:20", "8:23", "8:26", "8:29", "8:32", "8:35", "8:38", "8:41", "8:44", "8:47", "8:50", "8:55"];
var t9 = ["9:00", "9:05", "9:10", "9:15", "9:20", "9:23", "9:26", "9:29", "9:32", "9:35", "9:38", "9:41", "9:44", "9:47", "9:50", "9:55"];
var t10 = ["10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:40", "10:50"];
var t11 = ["11:00", "11:15", "11:30", "11:45"];
var t12 = ["12:00", "12:10", "12:20", "12:25", "12:30", "12:40", "12:50"];
var t13 = ["13:00", "13:15", "13:30", "13:45"];
var t14 = ["14:00", "14:15", "14:25", "14:35", "14:45"];
var t15 = ["15:00", "15:10", "15:20", "15:30", "15:40", "15:50"];
var t16 = ["16:00", "16:06", "16:12", "16:18", "16:24", "16:30", "16:36", "16:42", "16:48", "16:54"];
var t17 = ["17:00", "17:06", "17:12", "17:18", "17:24", "17:30", "17:36", "17:42", "17:48", "17:54"];
var t18 = ["18:00", "18:06", "18:12", "18:18", "18:24", "18:30", "18:40", "18:50"];
var t19 = ["19:00", "19:10", "19:20", "19:30", "19:40", "19:50"];
var t20 = ["20:00", "20:10", "20:20", "20:30", "20:40", "20:50"];
var t21 = ["21:00", "21:10", "21:20", "21:30", "21:45"];
var t22 = ["22:00", "22:15", "22:30", "22:40", "22:50"];
var t23 = ["23:00"];

var arr = [t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22, t23];
client.on("messageCreate", (message) => {
if ((message.content == "집") || (message.content == "셔틀") || (message.content == "언제와")) {
    var timetable = "";
    for (var i = 0; i <= 24; i++) {
      if ((i == h - 7) || (i == h - 6)) {
        var len = arr[i].length;
        for (var j = 0; j < len; j++) {
          timetable = timetable + arr[i][j] + "\n";
        }
      }
    }
    message.reply({ content: ("셔틀시간표 2시간치") });
    message.reply({ content: (timetable) });
  }
 }
 ```
 ### 4-6. 현재 시간
<img width="876" alt="시간" src="https://user-images.githubusercontent.com/87527275/205844402-2e146929-fb2d-4857-8727-60edb4b660c2.png">
 
```js

client.on("messageCreate", (message) => {
if (message.content == "지금 몇시야" || message.content == "몇시" || message.content == "time") {
    message.reply({ content: (date.toLocaleString('ko-kr')) });
  }
}

 ```
 ### 4-7. 점심 메뉴 추천
<img width="878" alt="점심메뉴추천" src="https://user-images.githubusercontent.com/87527275/205844405-a891e3cd-2972-4a4b-8a00-311bd6db64af.png">

```js

var lunch = new Array("가락지빵", "가래떡", .... , "후식");
var num = (Math.floor((Math.random() * 10000))) % 400;
client.on("messageCreate", (message) => {
if ((message.content == "점메추") || (message.content == "점심") || (message.content == "뭐먹지")) {
    message.reply({ content: (lunch[num]) });
  }
}

 ```
### 4-8. 봇 24시간 구동
#### 4-8-1. replit.com
<img width="1392" alt="uptimerobot" src="https://user-images.githubusercontent.com/87527275/205859958-06330ce4-2258-4bc4-81ec-fd3866afad0c.png">
웹사이트에서 코드를 구동할 수 있게 도와줌
#### 4-8-2. uptimerobot.com
<img width="1384" alt="replit" src="https://user-images.githubusercontent.com/87527275/205859964-6dda63a3-b175-4dbf-abc2-5a0c2f38068a.png">
주기적으로 웹사이트를 방문하여 서버의 상태를 모니터링함

#### 4-8-3. 활용법
replit.com 사이트를 활용하여 서버를 구동하고 사이트가 다운되지 않도록 uptimerobot.com 사이트를 활용해 주기적으로 서버에 핑을 보내주어 24시간 구동이 가능하도록 함

## 참고 라이센스
### dicord.js 
### cheerio
### axios
## 참고사이트 모음

[디코 기초세팅(토큰발급)](https://velog.io/@junsugi/Discord.js%EB%A1%9C-Bot-%EB%A7%8C%EB%93%A4%EA%B8%B0#3-discordjs-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

[Client code (개발자 문서)](https://github.com/discordjs/discord.js) 

[멜론차트 크롤링](https://latte1114.tistory.com/463)

[한국시간 객체생성](https://velog.io/@sunn3842/JS-new-Date-)

[음식 리스트 참고](https://ko.wiktionary.org/wiki/분류:한국어_음식)

[배열 생성 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)

[랜덤상수 뽑는 함수(Math.floor(), Math.random())](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

[셔틀시간표 data 출처](https://www.hanyang.ac.kr/web/www/shuttle_bus_timetable)

[현재Hour 추출법 (var h)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)

[웹 크롤링](https://velog.io/@yesdoing/Node.js-%EC%97%90%EC%84%9C-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0-wtjugync1md)

[웹 크롤링 replace](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

[웹 크롤링](https://onlydev.tistory.com/103)

[웹 크롤링](https://velog.io/@jehjong/nodejs-%ED%81%AC%EB%A1%A4%EB%A7%81-1%EC%9E%A5.-%EC%9B%B9%ED%81%AC%EB%A1%A4%EB%9F%AC-%ED%8C%8C%EC%8B%B1#1-4-axios-cheerio%EB%A1%9C-%ED%81%AC%EB%A1%A4%EB%A7%81)

[학식 정보](https://www.hanyang.ac.kr/web/www/re12)

[디코봇 초기세팅](https://www.youtube.com/watch?v=4LAGhoYQl4o)

[디코개발자 사이트](https://discord.com/developers/applications/1039799527202361384/bot)

[디코봇 초기세팅](https://velog.io/@junsugi/Discord.js%EB%A1%9C-Bot-%EB%A7%8C%EB%93%A4%EA%B8%B0#3-discordjs-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

[24시간구동에 사용](https://replit.com/@yaho1231/UnrulyStrictInstructionset)

[24시간구동에 사용](https://uptimerobot.com/dashboard#mainDashboard)
