const React = require('react');
const axios = require('axios');
// const BarChart = require('react-d3-basic').BarChart;
const PieChart = require('react-chartjs').Pie;
const Chart = require('chartjs');  

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.mostUsedCommands = this.mostUsedCommands(this.props.commandHistory);

    this.state = {
      commandHistory: this.props.commandHistory,
      mostUsedCommands: this.mostUsedCommands,
      containerName: this.props.containerName,
      usage: '',
    }
  }

  componentWillMount() {
    this.getStats();
  }

  getStats() {
    const context = this;
    axios.post('/cmd', { cmd: 'df -h', containerName: this.state.containerName })
      .then(function(res) {
        const data = "`" + res.data + "`";
        const usage = parseInt(data.split("\n")[1].split('G')[3].split('%')[0].trim());
        context.setState({
          usage: usage
        });
      })
    }

  mostUsedCommands(commandHistory) {
    const set = {};
    const arr = [];

    commandHistory.forEach(command => {
      if (set.hasOwnProperty(command)) {
        set[command] += 1;
      } else {
        set[command] = 1;
      }
    });

    for (var key in set) {
      arr.push([key, set[key]]);
    }
    console.log(set);

    arr.sort(function(a, b) {
      return b[1] - a[1];
    });

    return arr;
  }



  render() {
    const used = 42;
    const free = 100 - 42;
    var data = [
        {color:"#b2baef", label:"used",value:used},
        {color:"#03CEA1", label:"free", value:free}
    ];

    var options = {
        animateRotate:true
    }
    return (
        <div>
          <div className="card-container">
            <div className="title">
              STATS
            </div>
            <div className="title">
              Usage
            </div>
            <div className="info">
              <PieChart data={data} options={options} />
            </div>
          </div>
        </div>
      );
  }
}

module.exports = Stats;