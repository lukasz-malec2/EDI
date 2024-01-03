
//Fetch API to concole only
async function Fetch_and_log_to_console() {
    const response = await fetch("https://my.api.mockaroo.com/VolleyballPlayers2.json?key=c097ba40");
    datapoints = await response.json(); //parsing json for js
    console.log(datapoints);
    return datapoints
    }


//sprawdzenie danych w konsoli - w zasadzie zbędne
function doit2() {
        console.log(datapoints);
    };


    

function chart_js_method() {

//chart placeholder
const data2 = {
  labels: ['Country Placeholder'],
  datasets: [{
    label: '#Label Placeholder',
    data: [1],
    borderWidth: 2
    }],
  }
const config = {
  type: 'bar',
  data: data2,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      colors: {
        forceOverride: true
      }
    }
  }
};

let players = new Chart(document.getElementById("players_by_country_chart"),config);


//wykres nie jest nigdzie niszczony wiec jak się przeładuje dane fetchem to drugi raz sie nie zrobi.

//Fetch block
  async function reload_data() {
//    pozostałość po fetchu co tu był
    return datapoints
  };

  reload_data().then(datapoints => {
    const country = datapoints.map(
      function(index){
        return index.country_of_birth;
      });
    const uniquecountry = [...new Set(country)]; //filterining all countires to only unique ones
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
    players.config.data.datasets[0].label = "No. of players in TOP 100";
    players.config.data.labels = uniquecountry;
    players.config.data.datasets[0].data = country_count_array;
    players.update()

  });
  return players
};


function render(players){
    players.destroy();
}