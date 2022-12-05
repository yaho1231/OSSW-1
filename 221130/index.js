// melon : https://latte1114.tistory.com/463

/*
const Discord = require('discord.js');	// discord.js 라이브러리 호출
const Client = new Discord.Client();	// Client 객체 생성
*/
const dotenv = require("dotenv");
dotenv.config()

const { Client, GatewayIntentBits } = require('discord.js');
const client = (module.exports = new Client({intents:[131071]}));

const date = new Date();

// 봇과 서버를 연결해주는 부분
client.login('MTA0MjMwODY0MzcyODY2NjY4NA.Ga2byG.wxiGRMLVD6ba_fMYvQinJdRPlY5TZXHO3LNnCU');

// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once('ready', () => {
	console.log('Ready!');
});



var melon ="";


const axios = require('axios');
const cheerio = require('cheerio');

var crawledMusic = []


  const URL = `https://www.melon.com/chart/`;

  axios.get(URL).then(res => {
    console.log(res.status)
    if(res.status == 200) {

      // empty array
      let crawledMusic= [];

      // res.data에 있는 tag를 cheerio로 검색하여 변수에 담기
      const $ = cheerio.load(res.data);
      const $musicList = $('#lst50');

      $musicList.each(function(i) {
        crawledMusic[i] ={
          title : $(this).find('#lst50 > td > div > div > div.ellipsis.rank01 > span > a').text().trim(),
          artist : $(this).find('#lst50 > td > div > div > div.ellipsis.rank02 > a').text(),
          img : $(this).find('#lst50 > td > div > a > img').attr('src')
        };
      });
      for (var i = 0; i < 50; i++){
        // console.log("<<" + (i+1) + "위>>\n" + "제목 : " + crawledMusic[i].title + "\n가수 : " + crawledMusic[i].artist + "\n")
		melon = melon + (`<<${i+1}위>>\n제목 : ${crawledMusic[i].title}\n가수 : ${crawledMusic[i].artist}\n\n`);
	  }
    } else {
      console.log("server response error")
    }
  })


// 디스코드 서버에 작성되는 모든 메시지를 수신하는 리스너
client.on("messageCreate", (message) => {
	if ((message.content == "안녕") || (message.content == "hi")){
		message.reply({content:`안녕하세요`});
	}
	if (message.content == "지금 몇시야" || message.content == "몇시" || message.content == "time"){
		message.reply({content:(date.toLocaleString('ko-kr'))});
	}
	if ((message.content == "멜론") || (message.content == "음악") || (message.content == "차트")){
		message.reply({content:(melon)});
	}
});
