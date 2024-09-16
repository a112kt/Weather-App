var search_input = document.getElementById("search")
var btn = document.getElementById("btn_find")

//Today data
var today_date_name = document.getElementById("today-date-name")
var today_date_num = document.getElementById("today-date-num")
var today_date_month = document.getElementById("today-date-month")

var today_location = document.getElementById("today-location")
var today_tem = document.getElementById("today-tem")
var today_img = document.getElementById("today-img")
var today_text = document.getElementById("today-text")


var humidity = document.getElementById("humidity")
var wind = document.getElementById("wind")
var direction = document.getElementById("direction")

//**************************************************************************************** */

//Tomorrow data
var tomorrowName = document.getElementsByClassName("tomorrowName")
var tomorrowImag = document.getElementsByClassName("tomorrowImag")
var tomorrowTemMax = document.getElementsByClassName("tomorrowTemMax")
var tomorrowTemMin = document.getElementsByClassName("tomorrowTemMin")
var tomorrowText = document.getElementsByClassName("tomorrowText")

//**************************************************************************************** */




async function getData(cityName){
   var data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4acdf60bc8c64c47894155941241107&q=${cityName}&days=3`)
   var res = await data.json()
   return res
 
}


// Display today data
function displayToDayData(data){

   let date = new Date()
   today_date_name.innerHTML= date.toLocaleDateString("en-US",{weekday:"long"})
   today_date_num.innerHTML= date.getDate()
   today_date_month.innerHTML=date.toLocaleDateString("en-US",{month:"long"})

   today_location.innerHTML = data.location.name;
   today_tem.innerHTML = data.current.temp_c;
   console.log(data.current.condition.icon)
   today_img.setAttribute("src", "https:" +  data.current.condition.icon) 
   today_text.innerHTML =  data.current.condition.text

   humidity.innerHTML= data.current.humidity+"%"
   wind.innerHTML=data.current.wind_degree+"km/h"
   direction.innerHTML=data.current.wind_dir
}




// Display next data
function displayTomorrowData(data){

   let forecastData= data.forecast.forecastday
   console.log(forecastData);
   console.log(tomorrowTemMax);
   
   for(var i = 0 ; i < 2 ; i++)
      {

      let nextData = new Date(forecastData[i+1].date)
      console.log(nextData)
      tomorrowName[i].innerHTML=nextData.toLocaleDateString("en-US",{weekday:"long"})
    
      
      tomorrowTemMax[i].innerHTML=forecastData[i+1].day.maxtemp_c
      tomorrowTemMin[i].innerHTML=forecastData[i+1].day.mintemp_c
      tomorrowText[i].innerHTML=forecastData[i+1].day.condition.text
      tomorrowImag[i].setAttribute("src","https:" + forecastData[i+1].day.condition.icon) 
    

   }
   

}


async function startApp(city="cairo"){
  let weatherData = await getData(city)
//   if(!weatherData.error){
   displayToDayData(weatherData)
   displayTomorrowData(weatherData)
   console.log(weatherData)
//   }
 
  

}
startApp()


btn.addEventListener("click",function(){
   startApp(search_input.value)
})
