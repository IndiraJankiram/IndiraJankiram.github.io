let chart = 0;
let firstTime = 1;
    const labels =[];
//    console.log("labels");
//    console.log(labels);

let superSector = {
"00" : "Total nonfarm",
"05" :	"Total private",
"06" :	"Goods-producing",
"07" :	"Service-providing",
"08" :	"Private service-providing",
"10" :	"Mining and logging",
"20" :	"Construction",
"30" : "Manufacturing",
"31" : "Durable Goods",
"32" :	"Nondurable Goods",
"40" : 	"Trade, transportation, and utilities",
"41" :	"Wholesale trade",
"42" : 	"Retail trade",
"43" :	"Transportation and warehousing",
"44" :	"Utilities",
"50" :	"Information",
"55" : 	"Financial activities",
"60" :	"Professional and business services",
"65" :	"Education and health services",
"70" :	"Leisure and hospitality",
"80" :	"Other services",
"90" :	"Government"
};
let SuperSectorKeys = Object.keys(superSector);

// These are colors from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      red2: 'rgb(139, 0, 0)',
      red3: 'rgb(220, 20, 60)',
      orange: 'rgb(255, 159, 64)',
      orange2: 'rgb(255, 160, 122)',
      orange3: 'rgb(255, 127, 80)',
      yellow: 'rgb(255, 205, 86)',
      yellow2: 'rgb(255, 215, 0)',
      yellow3: 'rgb(255, 550, 205)',
      green: 'rgb(75, 192, 192)',
      green2: 'rgb(34, 139, 34)',
      green3: 'rgb(124, 252, 0)',
      blue: 'rgb(54, 162, 235)',
      blue2: 'rgb(0, 191, 255)',
      blue3: 'rgb(135, 206, 250)',
      purple: 'rgb(153, 102, 255)',
      purple2: 'rgb(138, 43, 226)',
      purple3: 'rgb(186, 85, 211)',
      grey: 'rgb(201, 203, 207)',
      pink: 'rgb(255, 105, 180)',
      pink2: 'rgb(123, 104, 238)',
      pink3: 'rgb(255, 0, 255)',
    };
    let colorspt1 = Object.keys(CHART_COLORS);
//    console.dir(CHART_COLORS);

    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      red2: 'rgb(139, 0, 0, 0.5)',
      red3: 'rgb(220, 20, 60, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      orange2: 'rgb(255, 160, 122, 0.5)',
      orange3: 'rgb(255, 127, 80, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      yellow2: 'rgb(255, 215, 0, 0.5)',
      yellow3: 'rgb(255, 550, 205, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      green2: 'rgb(34, 139, 34, 0.5)',
      green3: 'rgb(124, 252, 0, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      blue2: 'rgb(0, 191, 255, 0.5)',
      blue3: 'rgb(135, 206, 250)',
      purple: 'rgba(153, 102, 255, 0.5)',
      purple2: 'rgb(138, 43, 226, 0.5)',
      purple3: 'rgb(186, 85, 211, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)', 
      pink: 'rgb(255, 105, 180, 0.5)',
      pink2: 'rgb(123, 104, 238, 0.5)',
      pink3: 'rgb(255, 0, 255, 0.5)',
    };

    let colorspt2 = Object.keys(CHART_COLORS_50_Percent);


//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: labels,
      datasets: []
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);
    function drawChart(){
    const myChart = new Chart(
      document.getElementById('myChart'),
        config);
//    console.dir(myChart);
//    console.log("Ending");
    }
function responseReceivedHandler() {
  if (this.status == 200) {
    let datasetElement = {
      label: 'Sample Label',
      data: [],
      borderColor: CHART_COLORS[colorspt1[chart]],
      backgroundColor: CHART_COLORS_50_Percent[colorspt2[chart]],
      hidden: true
    }
    let superSectorID = this.response.Results.series[0].seriesID.substring(3, 5);
    datasetElement.label = superSector[superSectorID];
// Series id identifies the supersector for the data

    //console.log(this.response.Results.series[0]);
    let dataArray = this.response.Results.series[0].data;
  
    
    for (let i = dataArray.length-1; i>=0; i--){
      if (firstTime == 1){
        labels.push(dataArray[i].periodName + " " + dataArray[i].year);
      }
      datasetElement.data.push(dataArray[i].value);
    }
    firstTime = 0;
    data.datasets.push(datasetElement);
    chart += 1;
    if (chart == SuperSectorKeys.length){
      drawChart()
    }
  }else {
    console.log ("error");
  }
}


for (let i = 0; i<SuperSectorKeys.length; i++){
// need a loop to send one request for each superSector code
let xhr = new XMLHttpRequest();
xhr.responseType = "json"
xhr.addEventListener("load", responseReceivedHandler);
// construct the right query string by adding https through ceu on one string + the SuperSectorKey + everything after 65 to the end. 
let startquery = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
endquery =  "00000001?registrationkey=2403498e41de42d2bee017a165524a7f"
xhr.open("GET", startquery + SuperSectorKeys[i] + endquery);
//console.log(startquery + SuperSectorKeys[i] + endquery);
xhr.send();
}