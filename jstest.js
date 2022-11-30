const dotenv = require("dotenv").config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = (module.exports = new Client({intents:[131071]}));
const axios = require('axios');
const cheerio = require('cheerio');
const date = new Date();
const getHtml = async () => {
    try {
      return await axios.get('https://www.hanyang.ac.kr/web/www/re12');
    } catch (error) {
      console.error(error);
    }
  };
// 봇과 서버를 연결해주는 부분
client.login('MTAzOTc5OTUyNzIwMjM2MTM4NA.Gl4e64.gyPrZ2-iWsWlBycwvIq8MiwdEJ7QbdroF7G6oo');

// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once('ready', () => {
	console.log('Ready!');
});


// 디스코드 서버에 작성되는 모든 메시지를 수신하는 리스너
client.on("messageCreate", (message) => {
	if ((message.content == "안녕") || (message.content == "hi")){
		message.reply({content:`안녕하세요`});
	}
	if (message.content == "지금 몇시야" || message.content == "몇시" || message.content == "time"){
		message.reply({content:(date.toLocaleString('ko-kr'))});
	}
    // 학식 정보 출력
    if (message.content == "밥"|| message.content == "학식" || message.content == "ㅎㅅ" || message.content == "학생식당"){
        getHtml()
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
              thirdContents : $('#messhall1 > div:nth-child(2) > table')
              .text()
              .replace(/[\n\t\&amp;\공통찬]/g, '')
              ,
            };
            return data;
        }) //학식, 공통찬 출력
        .then((res) => message.reply({content:("(학식)\n" +res.mainContents + "\n" +res.secondContents + "\n[공통] " + res.thirdContents)}));
		
	}
    //코로나 api 시도했으나 실패
    // if ((message.content == "코")){
    //     fetch('https://api.corona-19.kr/korea/beta/?serviceKey={shlPLJDHSB2XoigwjUK1x65YbyZ3W47v9}')
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log( "=== [ " + data.updateTime + "상황 ] ===\n\n" + 
    //         "국내 확진자: " + data.TotalCase + "\n" + 
    //         "국내 완치자: " + data.TotalRecovered + "\n" + 
    //         "국내 사망자: " + data.TotalDeath + "\n" + 
    //         "국내 치료중: " + data.NowCase + "\n\n" +
    //         "더 자세한 정보는 https://corona-19.kr/ 에서 확인하세요.");
    //         // message.reply({content:결과});
    //     })
    //     .catch(() => {
    //         message.reply({content:`error`});
    //     })
	// }
});
/*
thumbnail-list-wrap container
    thumbnails
        span3
        #yui_patched_v3_11_0_1_1669794498888_201 > h3
*/