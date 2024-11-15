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
client.login('MTA0MjMwODY0MzcyODY2NjY4NA.G3JMMj.RBKlds051XWjbC4nEE_pkUCU9WIchRO781UKKY');

// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once('ready', () => {
	console.log('Ready!');
});

var mesage;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'f6%2B0u8pldX%2F4bPwQqddtTvQW0C2fqS%2Fz7sDnvcnip8H8C1aLxeDoOBMlwlALphnOhdpRiVknPXMudeX9PwDEeA%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); /**/
queryParams += '&' + encodeURIComponent('dataCd') + '=' + encodeURIComponent('ASOS'); /**/
queryParams += '&' + encodeURIComponent('dateCd') + '=' + encodeURIComponent('HR'); /**/
queryParams += '&' + encodeURIComponent('startDt') + '=' + encodeURIComponent('20100101'); /**/
queryParams += '&' + encodeURIComponent('startHh') + '=' + encodeURIComponent('01'); /**/
queryParams += '&' + encodeURIComponent('endDt') + '=' + encodeURIComponent('20100601'); /**/
queryParams += '&' + encodeURIComponent('endHh') + '=' + encodeURIComponent('01'); /**/
queryParams += '&' + encodeURIComponent('stnIds') + '=' + encodeURIComponent('108'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function f() {
    if (this.readyState == 4) {
        mesage = ('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send();


// 디스코드 서버에 작성되는 모든 메시지를 수신하는 리스너
client.on("messageCreate", (message) => {
	if ((message.content == "안녕") || (message.content == "hi")){
		message.reply({content:`안녕하세요`});
	}
	if (message.content == "지금 몇시야" || message.content == "몇시" || message.content == "time"){
		message.reply({content:(date.toLocaleString('ko-kr'))});
	}
	if (message.content == "날씨"){
		message.reply({content:(mesage)});
	}
});


