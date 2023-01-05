// let url="api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=7&appid=5cefa08b315b8704e7c3f71b52721ca8";

// fetch("https://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=4&appid=5cefa08b315b8704e7c3f71b52721ca8").then((response)=>{
//     return response.json();
// }).then((data)=>{
//     console.log(data);
// })

// fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=5cefa08b315b8704e7c3f71b52721ca8").
// then((response)=>{
//     return response.json();
// }).
// then((data)=>{
//     console.log(data);
// })
// fetch("https://api.openweathermap.org/data/2.5/forecast?q=London&cnt=16&appid=5cefa08b315b8704e7c3f71b52721ca8").
// then((response)=>{
//     return response.json();
// }).
// then((data)=>{
//     console.log(data);
// })
let headerList=document.querySelectorAll(".city-flex-1");
headerList.forEach((el)=>{
    let countryNmae=el.querySelector("h3").getAttribute("name");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryNmae}&units=metric&appid=5cefa08b315b8704e7c3f71b52721ca8`).
    then((response)=>{
        return response.json();
    }).
    then((data)=>{
        header(data,el);
    })

})


function header(data,el){
    let degree=el.querySelector("p:nth-of-type(2)");
    let climate=el.querySelector("p:nth-of-type(1)");
    climate.innerHTML=data.weather[0].main;
    let temperature=data.main.temp;
    degree.innerHTML=temperature+" "+"&#8451";
}



let inputButton=document.querySelector("#input");
inputButton.addEventListener("keyup",search);


function search(e){
    e.preventDefault();
    if(e.key!="Enter"){
       return false
    }
    else{
 
        let value=inputButton.value;
        cityUpdate(value);
     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&cnt=16&appid=5cefa08b315b8704e7c3f71b52721ca8`).
then((response)=>{
    return response.json();
}).
then((data)=>{
    timeList(data);
})       
}
}
function timeList(data){
    let timeForecast=data.list;
    let hourForecast=timeForecast.map((el)=>{
        let hour=el.dt_txt.split(" ");
        let date=new Date(hour[0]).toDateString();
        let time=hour[1];
        let weather=el.weather[0].main;
        let temperatur=el.main.temp;
        return {date:date,time:time,weather:weather,temperature:temperatur};
    });

 timely(hourForecast);
 dayily(hourForecast);

}
function timely(hourForecast){
    let date=new Date().toDateString();
    let todayForecast=hourForecast.filter((el)=>{
        return el.date==date
    });
    let parentDiv=document.querySelector(".hour-forecast");
    let childrenDiv=[...parentDiv.children].forEach((el)=>{
        el.remove()
    })
    todayForecast.forEach((el)=>{
        let time=el.time.split(":")[0];
        let timeNum=Number(time);
        let am;
        if(timeNum>11){
            am="PM"
            timeNum-=12;
        }
        else{
            am="AM"
        }
        let childDiv=document.createElement("div");
        childDiv.className="hour-forecast-1";
        let Para=document.createElement("p");
        Para.innerHTML=timeNum+" "+am;
        childDiv.append(Para);
        let sP=document.createElement("P");
        sP.innerHTML=el.weather;
        childDiv.append(sP);
        let tP=document.createElement("P");
        tP.innerHTML=el.temperature+" "+"&#8451";
        childDiv.append(tP);
        parentDiv.append(childDiv);
    })
   

}
function  dayily(hourForecast){
    let days=["sunday","monday","tuesday","wednesday","thursday","firday","saturday"];
    let dayForecast=hourForecast.map((el)=>{
        let d=el.date;
        let h=d.split("/").reverse().join("-");
        let date=new Date(h);
        let day=days[date.getDay()];
        el.date=day;
        return el;
    });
   let dummyO={};
   let originalArray=[];
   for(i=0;i<dayForecast.length;i++){
    dummyO[dayForecast[i].date]=dayForecast[i];
   }
   for(let j in dummyO){
    originalArray.push(dummyO[j]);
   }
let dayParent=document.querySelector(".days ul");
let dayChildren=[...dayParent.children].forEach((el)=>{
    el.remove();
})
originalArray.forEach((el)=>{
    let li=document.createElement("li");
    let fp=document.createElement("p");
    fp.innerHTML=el.date;
    li.append(fp);
    let sp=document.createElement("p");
    sp.innerHTML=el.temperature+" "+"&#8451";
    li.append(sp);
    dayParent.append(li);
})
}

function cityUpdate(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5cefa08b315b8704e7c3f71b52721ca8`).
    then((response)=>{
        return response.json();
    }).
    then((data)=>{
        mainData(data);
    })
}

function mainData(data){
    let cityName=data.name;
    let temperature=data.main.temp;
    let t=new Date();
    let time=t.toLocaleTimeString();
    let date=t.toDateString();
    let parent=document.querySelector(".current-head");
    parent.querySelector("h1").innerHTML=cityName;
    parent.querySelector("p:nth-child(2)").innerHTML=time;
    parent.querySelector("p:nth-child(3)").innerHTML=date;
    parent.querySelector("p:nth-child(5)").innerHTML=temperature+"&#8451";

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '5903ee2002msh887229eaa184167p124f4cjsna011e70ba967',
    //         'X-RapidAPI-Host': 'world-time2.p.rapidapi.com'
    //     }
    // };
    
    // fetch('https://world-time2.p.rapidapi.comtimezone/europe', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
}