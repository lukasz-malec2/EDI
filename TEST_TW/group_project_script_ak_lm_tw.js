//scripts to Group Project

function show_tw_data() {
  document.getElementById("TW_details").style.visibility = "visible";
//  document.getElementById("TW_details_button").classList.replace("btn btn-primary","btn btn-secondary"); nie działa?
  document.getElementById("TW_details_button").innerHTML = "Details below - Double click to hide details"               
}

function hide_tw_data() {
  document.getElementById("TW_details").style.visibility = "hidden";
//  document.getElementById("TW_details_button").style.class = "btn btn-primary"; nie działa?
  document.getElementById("TW_details_button").innerHTML = "Click for more information about Tomek"               
}

//Fetch API to concole only
async function Fetch_and_log_to_console() {
  const response = await fetch("https://my.api.mockaroo.com/volleyballplayers.json?key=c097ba40");
  const datapoints = await response.json(); //parsing json for js
  console.log(datapoints);
  }

//Fetch API to display as list
function Fetch_and_display_data() {
  fetch("https://my.api.mockaroo.com/volleyballplayers.json?key=c097ba40") //full API - 100 records
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData(data);
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });
  function appendData(data) {
      var mainContainer = document.getElementById("Fetch_retrieved_data");
          for (var i = 0; i < data.length; i++) {
              var div = document.createElement("div");
              div.innerHTML = 'Player: ' + data[i].first_name +" "+ data[i].last_name // this can be build up with more info from dataset
              mainContainer.appendChild(div);
      }
  }
}


//chart placeholder
const data = {
  labels: ['Country Placeholder'],
  datasets: [{
    label: '#Label Placeholder',
    data: [1],
    borderWidth: 2
    }],
  }
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}
const players_by_country_chart = new Chart(document.getElementById("players_by_country_chart"),config);



//chart.js function for count of players from particular countries
//https://www.youtube.com/watch?v=mw5i_QGDomw

function chart_js_method() {
//Fetch block
  async function fetch_data() {
    const url = "https://my.api.mockaroo.com/volleyballplayers.json?key=c097ba40"; // full API 100 records
//    const url = "https://my.api.mockaroo.com/VolleyballPlayers2.json?key=c097ba40"; //simplified API 10 records less countries
    const response = await fetch(url);
    //wait until the request has been completed
    const datapoints = await response.json(); //parsing json for js
    console.log(datapoints)
    return datapoints
  };

  fetch_data().then(datapoints => {
    const country = datapoints.map(
      function(index){
        return index.country_of_birth;
      });
    const uniquecountry = [...new Set(country)]; //filterining all countires to only unique ones
    //console.log(country);
    console.log(uniquecountry);
    console.log(uniquecountry.length);

    var cp_dict = {};
    var country_count_array = []
      for (var i = 0; i < uniquecountry.length; i++) {
          var country_counter = 0
        for (var j = 0; j < datapoints.length; j++) {
          if (uniquecountry[i] == datapoints[j].country_of_birth) {
            country_counter = country_counter + 1
          };
        };
        cp_dict[uniquecountry[i]] = country_counter;
        country_count_array[i]=country_counter;
      };
      console.log(cp_dict);
      console.log(country_count_array);

    //update the labels in chart placeholder
    players_by_country_chart.config.data.datasets[0].label = "No. of players in TOP 100";
    players_by_country_chart.config.data.labels = uniquecountry;
    players_by_country_chart.config.data.datasets[0].data = country_count_array;
    players_by_country_chart.update()

  });
}



