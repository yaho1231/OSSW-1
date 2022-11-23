const convert = require('xml-js');
const request = require('request');


const HOST = 'http://openapi.animal.go.kr/openapi/service/rest'
const SERVICE_KEY = 'mySecretKey'

var requestUrl = `${HOST}/abandonmentPublicSrvc/sigungu?upr_cd=6500000&ServiceKey=${SERVICE_KEY}`

request.get(requestUrl, (err,res,body) =>{
    if(err){
        console.log(`err => ${err}`)
    }
    else {
        if(res.statusCode == 200){
            var result = body
            console.log(`body data => ${result}`)
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            console.log(`xml to json => ${xmlToJson}`)

        }

    }
    if (msg == "/코로나") {
        var data = org.jsoup.Jsoup.connect("http://ncov.mohw.go.kr/")
            .get();
        var data0 = data.select("div.occurrenceStatus");
        data = data.select("tbody").select("td");
        var died = data.get(0).text();
        var conf = data.get(3).text();
        data = data0.select("div.occur_num").select("div.box");
        var diedTotal = data.get(0).ownText();
        var confTotal = data.get(1).ownText();
        replier.reply("[코로나 확진 정보]\n" +
            "확진 : " + confTotal + "명 (+" + conf + ")\n" +
            "사망 : " + diedTotal + "명 (+" + died + ")");
    }
})
