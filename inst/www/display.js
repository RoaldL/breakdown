function renderPlot(){

  var x_selection = document.getElementById('x_selection')
  var y_selection = document.getElementById('y_selection')
  var z_selection = document.getElementById('z_selection')

  var csv_lookup = {
    ground_water_capex: {
      transfer_capex: {
        cumulative_costs: null,
        total_transfers: null
      },
      reservoir_opex:{
        cumulative_costs: null,
        total_transfers: 'Second.csv'
      },
      ground_water_capex: {
        cumulative_costs: null,
        total_transfers: null
      }
    },
    surface_water_capex: {
      transfer_capex: {
        cumulative_costs: null,
        total_transfers: null
      },
      reservoir_opex:{
        cumulative_costs: 'First.csv',
        total_transfers: null
      },
      ground_water_capex: {
        cumulative_costs: null,
        total_transfers: null
      }
    },
    transfer_capex: {
      transfer_capex: {
        cumulative_costs: null,
        total_transfers: null
      },
      reservoir_opex:{
        cumulative_costs: null,
        total_transfers: null
      },
      ground_water_capex: {
        cumulative_costs: null,
        total_transfers: null
      }
    },
    reservoir_opex: {
      transfer_capex: {
        cumulative_costs: null,
        total_transfers: null
      },
      reservoir_opex:{
        cumulative_costs: null,
        total_transfers: null
      },
      ground_water_capex: {
        cumulative_costs: null,
        total_transfers: null
      }
    }
  }

  console.log(csv_lookup)

  csv_file = csv_lookup[x_selection.value][y_selection.value][z_selection.value]

  if (csv_file != null) {
    document.getElementById("myDiv").innerHTML = "";
    Plotly.d3.csv('datasets/' + csv_file, function(err, rows){
      
      console.log('Start plot')
      console.log(rows)

      function x_values(rows) {
        console.log('Start getting x');
        x_values = Object.keys(rows[0])
        x_values.splice(0,1)
        console.log(x_values)
        return x_values;
      }

      function y_values(rows) {
        console.log('Start getting y');
        y_values = []
        for (var i = 0; i<rows.length; i++) {
          y_values.push(rows[i][""])
        }
        console.log(y_values)
        return y_values;
      }
      
      function z_values(rows) {
        console.log('Start getting z');
        z_values = []
        for (var i = 0; i<rows.length; i++) {
          value = Object.values(rows[i]);
          value.splice(0,1);
          z_values.push(value);
        }
        console.log(z_values);
        return z_values;
      }

      var data = [{
        x: x_values(rows),
        y: y_values(rows),
        z: z_values(rows),
        type: 'surface'
      }];
        
      var layout = {
        title: 'Plot',
        autosize: false,
        width: 1200,
        height: 800,
        margin: {
          l: 65,
          r: 50,
          b: 65,
          t: 90,
        }
      };
      console.log(data)
      Plotly.newPlot('myDiv', data, layout);
      console.log('plot done');
    });
  }
  else {
    document.getElementById("myDiv").innerHTML = "Plot is not available";
  }
}