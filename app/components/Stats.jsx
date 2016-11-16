const React = require('react');

class Stats extends React.Component {
  constructor(props) {
    super(props);

    const mostUsedCommands = this.mostUsedCommands(this.props.commandHistory);

    this.state = {
      commandHistory: this.props.commandHistory,
      mostUsedCommands: mostUsedCommands
    }
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
    return (
        <div>
          <div className="card-container">
            <div className="title">
              STATS
            </div>
            <div className="title">
              Top Ten Commands
            </div>
            <div className="info">
              {this.state.mostUsedCommands}
            </div>
          </div>
        </div>
      );
  }
}

module.exports = Stats;