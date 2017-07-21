
var WeatherType =
	["Sunny",
	"Partly Sunny",
	"Cloudy",
	"Rainy"
	];
var WeatherEffect =
	["100",
	"75",
	"50",
	"25",
	];
var WeatherPriority = 0;
var WeatherNum = Math.floor((Math.random()*100));
var WeatherState = 0;
var WeatherPastState = WeatherState;
var Day = 0;
var Hour = 0;
var Minute = 0;
var NumSolarEssence = 0;
var GainRate = WeatherEffect[WeatherState]/25;
var MirrorCost = 1;
ObtainWeatherA();
BaseClock();
SolarEssenceGain();
document.getElementById("MirrorUpgradeCost").innerHTML = MirrorCost;

function NumtoPriorityWeather() {
	WeatherNum = Math.floor((Math.random()*100));
	if (WeatherNum >= 0 &&  WeatherNum <=29) { //Highest Chance
		WeatherPriority = 0;
		//Sunny 30%
	}
	else if (WeatherNum >= 30 && WeatherNum <= 56) { //Second Highest Chance
		WeatherPriority = 1;
		//Partly Sunny 27%
	}
	else if (WeatherNum >= 57 && WeatherNum <= 79) { //Second Lowest Chance
		WeatherPriority = 2;
		//Cloudy 23%
	}
	else { //Lowest Chance
		WeatherPriority = 3;
		//Rainy 20%
	}
}
function PrioritytoStateWeather() {
	if (WeatherPastState == 0) { //Sunny Yesterday
		WeatherState = WeatherPriority;
	}
	else if (WeatherPastState == 1) { //Partly Sunny Yesterday
		if (WeatherPriority == 0) {
			WeatherState = 1;
			//Partly Sunny
		}
		else if (WeatherPriority == 1) {
			WeatherState = 0;
			//Sunny
		}
		else {
			WeatherState = WeatherPriority;
			//If 2:Cloudy, 3:Rainy
		}
	}
	else if (WeatherPastState == 2) { //Cloudy Yesterday
		if (WeatherPriority == 0) {
			WeatherState = 2;
			//Cloudy
		}
		else if (WeatherPriority == 1) {
			WeatherState = 1;
			//Partly Sunny
		}
		else if (WeatherPriority == 2) {
			WeatherState = 3;
			//Rainy
		}
		else {
			WeatherState = 0;
			//Sunny
		}
	}
	else { //Rainy Yesterday
		if (WeatherPriority == 0) {
			WeatherState = 3;
			//Rainy
		}
		else if (WeatherPriority == 1) {
			WeatherState = 2;
			//Cloudy
		}
		else if (WeatherPriority == 2) {
			WeatherState = 1;
			//Partly Sunny
		}
		else {
			WeatherState = 0;
			//Sunny
		}
	}
}
function ObtainWeatherA() {
	document.getElementById("WeatherType").innerHTML = "";
	setTimeout(ObtainWeatherB, 250); //Visual change even if weather is the same
}
function ObtainWeatherB() {
	WeatherPastState = WeatherState;
	NumtoPriorityWeather();
	PrioritytoStateWeather();
	document.getElementById("WeatherType").innerHTML = WeatherType[WeatherState] + " <em>" + WeatherEffect[WeatherState] + "% Efficiency </em>";
	GainRate = WeatherEffect[WeatherState]/25;
}

function BaseClock() {
	Minute++;
	if (Minute < 10) { //Keeping two digits all the time
		Minute = "0" + Minute;
	}
	else {
		Minute = Minute;
	}
	if (Minute == 60) { //Increasing hour value
		Hour++;
		Minute -= 60;
	}
	if (Hour == 24) { //Increasing day value
		Day++;
		Hour -= 24;
		ObtainWeatherA();
	}
	document.getElementById("TimeMinute").innerHTML = Minute;
	document.getElementById("TimeHour").innerHTML = Hour;
	document.getElementById("Day").innerHTML = Day;
	setTimeout(BaseClock, 250);
}

function SolarEssenceGain() {
	NumSolarEssence += GainRate;
	document.getElementById("SolarEssenceTotal").innerHTML = NumSolarEssence;
	document.getElementById("SolarEssenceSec").innerHTML = GainRate;
	setTimeout(SolarEssenceGain, 1000);
}

function UpgradeMirror() {
	if (NumSolarEssence >= MirrorCost) {
		NumSolarEssence -= MirrorCost;
		MirrorCostIncrease();
	}
	document.getElementById("SolarEssenceTotal").innerHTML = NumSolarEssence;
}
function MirrorCostIncrease() {
	MirrorCost ++;
	document.getElementById("MirrorUpgradeCost").innerHTML = MirrorCost;
}



