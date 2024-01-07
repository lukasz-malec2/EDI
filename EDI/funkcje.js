//show scheme view
function show_scheme() {
  scheme_view = `
    <img src="vscheme.JPG" style="width: 1200px" alt="Scheme_used">
  `
  document.getElementById("scheme").innerHTML = scheme_view
}

//hide scheme view
function hide_scheme() {
  scheme_view = ""
  document.getElementById("scheme").innerHTML = scheme_view
}



//Fetch API to concole only
async function Fetch_and_log_to_console() {
  const response = await fetch("https://my.api.mockaroo.com/volleyballplayers.json?key=c097ba40");
  datapoints = await response.json(); //parsing json for js
  console.log(datapoints);
  return datapoints
  }



//Use existing data and display as list
function Display_data_as_list1() {
  async function reload_data() {
    return datapoints
  };
      reload_data().then(function (datapoints) {
          appendData(datapoints);
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });
  function appendData(data) {
      var mainContainer = document.getElementById("Fetch_retrieved_data");
          for (var i = 0; i < data.length; i++) {
              var div = document.createElement("div");
              div.innerHTML = 'Player: ' + data[i].first_name +" "+ data[i].last_name +'  Born: ' + data[i].date_of_birth +" in " + data[i].country_of_birth + ". Curently playing for "+data[i].curent_club + " with no. "+data[i].jersey_number// this can be build up with more info from dataset
              mainContainer.appendChild(div);
      }
  }
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
              div.innerHTML = 'Player: ' + data[i].first_name +" "+ data[i].last_name +'  Born: ' + data[i].date_of_birth +" in " + data[i].country_of_birth + ". Curently playing for "+data[i].curent_club + " with no. "+data[i].jersey_number// this can be build up with more info from dataset
              mainContainer.appendChild(div);
      }
  }
}


//Use existing data and display in a table
function Display_data_in_table1() {
  async function reload_data() {
    return datapoints;
  };
  reload_data().then(function(datapoints) {
    let placeholder = document.getElementById("Fetch_retrieved_data_table");
    let out = "";
    for (let datapoint of datapoints) {
      out += `
        <tr>
          <td>${datapoint.first_name}</td>
          <td>${datapoint.last_name}</td>
          <td>${datapoint.date_of_birth}</td>
          <td>${datapoint.country_of_birth}</td>
          <td>${datapoint.height_cm}</td>
          <td>${datapoint.weight_kg}</td>
          <td>${datapoint.position_in_field}</td>
          <td>${datapoint.range_in_block}</td>
          <td>${datapoint.range_in_attack}</td>
          <td>${datapoint.curent_club}</td>
        <tr>
      `;
    };
    placeholder.innerHTML = out
  })
}

//Fetch NEW data and display in a table
function Fetch_and_display_table() {
  fetch("https://my.api.mockaroo.com/volleyballplayers.json?key=c097ba40")
    .then(function(response){
      return response.json()
    })
  .then(function(datapoints) {
    let placeholder = document.getElementById("Fetch_retrieved_data_table");
    let out = "";
    for (let datapoint of datapoints) {
      out += `
        <tr>
          <td>${datapoint.first_name}</td>
          <td>${datapoint.last_name}</td>
          <td>${datapoint.date_of_birth}</td>
          <td>${datapoint.country_of_birth}</td>
          <td>${datapoint.height_cm}</td>
          <td>${datapoint.weight_kg}</td>
          <td>${datapoint.position_in_field}</td>
          <td>${datapoint.range_in_block}</td>
          <td>${datapoint.range_in_attack}</td>
          <td>${datapoint.curent_club}</td>
        <tr>
      `;
    };
    placeholder.innerHTML = out
  })
}






//chart.js function for count of players from particular countries
//https://www.youtube.com/watch?v=mw5i_QGDomw



//Use existing data and display in diagram
function chart_js_method_old_data() {

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
      plugins: {
        legend: {
          display: false,
        },
        title: {
          position: "top",
          display: true,
          text: "Distribution of top 100 players by country",
          font: {
            size: 25,
          },
          color: "#00FF00",
        },
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  const players_by_country_chart = new Chart(document.getElementById("players_by_country_chart"),config);
  
  //Fetch block
    async function reload_data() {
      return datapoints
    };
  
    reload_data().then(datapoints => {
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



//Fetch data and display in diagram
function chart_js_method() {

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
    plugins: {
      legend: {
        display: false,
      },
      title: {
        position: "top",
        display: true,
        text: "Distribution of top 100 players by country",
        font: {
          size: 25,
        },
        color: "#00FF00",
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}
const players_by_country_chart = new Chart(document.getElementById("players_by_country_chart"),config);

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



//Use existing data and create doughnut diagram
function chart_js_method2_old_data() {

  //chart2 placeholder
  const data_pos = {
    labels: ['Position Placeholder'],
    datasets: [{
      label: '#Label Placeholder',
      data: [1],
      borderWidth: 2,
  //    backgroundColor: Object.values(Utils.CHART_COLORS),
      }],
    }
  const config_pos = {
    type: 'doughnut',
    data: data_pos,
    options: {
      plugins: {
        legend: {
          position: "right",
          display: true,
          labels: {
            font: {
              size:20,
            },
          },
        },
        title: {
          position: "top",
          display: true,
          text: "Distribution of top 100 players by field position",
          font: {
            size:25,
          },
          color: "#00FF00",
        },
        colors: {
          forceOverride: true
        }
      }
    }
  }
  const players_by_position_chart = new Chart(document.getElementById("players_by_position_chart"),config_pos);
  
    //Fetch block
      async function reload_data() {
        return datapoints
      };
      reload_data().then(datapoints => {
        const position = datapoints.map(
          function(index){
            return index.position_in_field;
          });
        const uniqueposition = [...new Set(position)]; //filterining all positions to only unique ones
        //console.log(country);
        console.log(uniqueposition);
        console.log(uniqueposition.length);
  
        var pos_dict = {};
        var position_count_array = []
          for (var i = 0; i < uniqueposition.length; i++) {
              var position_counter = 0
            for (var j = 0; j < datapoints.length; j++) {
              if (uniqueposition[i] == datapoints[j].position_in_field) {
                position_counter = position_counter + 1
              };
            };
            pos_dict[uniqueposition[i]] = position_counter;
            position_count_array[i]=position_counter;
          };
          console.log(pos_dict);
          console.log(position_count_array);
  
        //update the labels in chart placeholder
        players_by_position_chart.config.data.datasets[0].label = "No. of players in TOP 100";
        players_by_position_chart.config.data.labels = uniqueposition;
        players_by_position_chart.config.data.datasets[0].data = position_count_array;
        players_by_position_chart.update()
        console.log(players_by_position_chart.config)
  
      });
    }




//Fetch new data and create doughnut diagram
function chart_js_method2() {

//chart2 placeholder
const data_pos = {
  labels: ['Position Placeholder'],
  datasets: [{
    label: '#Label Placeholder',
    data: [1],
    borderWidth: 2,
//    backgroundColor: Object.values(Utils.CHART_COLORS),
    }],
  }
const config_pos = {
  type: 'doughnut',
  data: data_pos,
  options: {
    plugins: {
      legend: {
        position: "right",
        display: true,
        labels: {
          font: {
            size:20,
          },
        },
      },
      title: {
        position: "top",
        display: true,
        text: "Distribution of top 100 players by field position",
        font: {
          size:25,
        },
        color: "#00FF00",
      },
      colors: {
        forceOverride: true
      }
    }
  }
}
const players_by_position_chart = new Chart(document.getElementById("players_by_position_chart"),config_pos);

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
      const position = datapoints.map(
        function(index){
          return index.position_in_field;
        });
      const uniqueposition = [...new Set(position)]; //filterining all positions to only unique ones
      //console.log(country);
      console.log(uniqueposition);
      console.log(uniqueposition.length);

      var pos_dict = {};
      var position_count_array = []
        for (var i = 0; i < uniqueposition.length; i++) {
            var position_counter = 0
          for (var j = 0; j < datapoints.length; j++) {
            if (uniqueposition[i] == datapoints[j].position_in_field) {
              position_counter = position_counter + 1
            };
          };
          pos_dict[uniqueposition[i]] = position_counter;
          position_count_array[i]=position_counter;
        };
        console.log(pos_dict);
        console.log(position_count_array);

      //update the labels in chart placeholder
      players_by_position_chart.config.data.datasets[0].label = "No. of players in TOP 100";
      players_by_position_chart.config.data.labels = uniqueposition;
      players_by_position_chart.config.data.datasets[0].data = position_count_array;
      players_by_position_chart.update()
      console.log(players_by_position_chart.config)

    });
  }

  

//Use existing data and display in bubble diagram
function chart_js_method3_old_data() {

  //chart placeholder
  const data = {
    datasets: [{
      label: 'Placeholder',
      data: [],
      }],
    };
  const config = {
    type: 'bubble',
    data,
    options: {
      plugins: {
        legend: {
          position: "bottom",
          display: true,
          labels:{
            usePointStyle: true,
          },
        },
        title: {
          position: "top",
          display: true,
          text: "Combination of range in attack and range in block for each player in top 100",
          font: {
            size:25,
          },
          color: "#00FF00",
        },
      },
      scales: {
        x: {
          border: {
            display: true,
            color: "#BEBDB8"
          },
          grid:{
            display: true,
            color: "#3E424B"
          }
        },
        y: {
          border: {
            display: true,
            color: "#BEBDB8"
          },
          grid:{
            display: true,
            color: "#3E424B"
          },
         beginAtZero: false
       }
      }
    }
  }

  const players_bubble_chart = new Chart(document.getElementById("bubble_chart_range"),config)
  
 //Fetch block
 async function reload_data() {
  return datapoints
};

reload_data().then(datapoints => {
  const range_in_attack_arr = datapoints.map(
    function(index){
      return index.range_in_attack;
    });

  const range_in_block_arr = datapoints.map(
    function(index){
      return index.range_in_block;
    });

  const first_name_arr = datapoints.map(
    function(index){
      return index.first_name;
    });

  const last_name_arr = datapoints.map(
    function(index){
      return index.last_name;
    });

  var range_dataset_arr = [];
    for (var i = 0; i < 100; i++) {
      range_dataset_arr[i] = {
        label: first_name_arr[i] + " " + last_name_arr[i],
        data: [{
          x: range_in_attack_arr[i],
          y: range_in_block_arr[i],
          r: 5,
      }],
        backgroundColor: 'rgb(255, 99, 132)',
      };
    }
  //update the labels in chart placeholder
  players_bubble_chart.config.data.datasets = range_dataset_arr;
  players_bubble_chart.update()
    });

}



//Fetch new data and display in bubble diagram
function chart_js_method3() {

  //chart placeholder
  const data = {
    datasets: [{
      label: 'Placeholder',
      data: [],
      }],
    };
  const config = {
    type: 'bubble',
    data,
    options: {
      plugins: {
        legend: {
          position: "bottom",
          display: true,
          labels:{
            usePointStyle: true,
          },
        },
        title: {
          position: "top",
          display: true,
          text: "Combination of range in attack and range in block for each player in top 100",
          font: {
            size:25,
          },
          color: "#00FF00"
        },
      },
      scales: {
        x: {
          border: {
            display: true,
            color: "#BEBDB8"
          },
          grid:{
            display: true,
            color: "#3E424B"
          }
        },
        y: {
          border: {
            display: true,
            color: "#BEBDB8"
          },
          grid:{
            display: true,
            color: "#3E424B"
          },
         beginAtZero: false
       }
      }
    }
  }

  const players_bubble_chart = new Chart(document.getElementById("bubble_chart_range"),config)
  
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
  const range_in_attack_arr = datapoints.map(
    function(index){
      return index.range_in_attack;
    });

  const range_in_block_arr = datapoints.map(
    function(index){
      return index.range_in_block;
    });

  const first_name_arr = datapoints.map(
    function(index){
      return index.first_name;
    });

  const last_name_arr = datapoints.map(
    function(index){
      return index.last_name;
    });

  var range_dataset_arr = [];
    for (var i = 0; i < 100; i++) {
      range_dataset_arr[i] = {
        label: first_name_arr[i] + " " + last_name_arr[i],
        data: [{
          x: range_in_attack_arr[i],
          y: range_in_block_arr[i],
          r: 5,
      }],
        backgroundColor: 'rgb(255, 99, 132)',
      };
    }
  //update the labels in chart placeholder
  players_bubble_chart.config.data.datasets = range_dataset_arr;
  players_bubble_chart.update()
    });

}