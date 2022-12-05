const dotenv = require("dotenv").config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = (module.exports = new Client({intents:[131071]}));
const axios = require('axios');
const cheerio = require('cheerio');
const date = new Date();
const keepAlive = require('./server.js')
const getHtml = async () => {
    try {
      return await axios.get('https://www.hanyang.ac.kr/web/www/re12');
    } catch (error) {
      console.error(error);
    }
  };


// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once('ready', () => {
  client.user.setActivity('opensourcebot',{type:'WATCHING'})
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
            if(data.mainContents == ''){
              data.mainContents = "오늘은 학식이 없습니다.";
              data.secondContents = "오늘은 학식이 없습니다.";
            }
            return data;
        }) //학식, 공통찬 출력
        .then((res) => message.reply({content:("(학식) 운영시간 : 11:30 ~ 13:30\n" +res.mainContents + "\n" +res.secondContents + "\n[공통] " + res.thirdContents)}));
		
	}
});
keepAlive();
// 봇과 서버를 연결해주는 부분
client.login(process.env['TOKEN']);