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
client.login('보안상 토큰이름은 못올린데요');

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
});


