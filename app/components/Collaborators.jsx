const React = require('react');

class Collaborators extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
        <div>
          <div>Current Collaborator: {this.props.curCollab}</div>
          <div>
            Collaborating With You:
            {this.props.collabWith.map(function(colab, index) {
              return (
                  <div key={index}>{colab}</div>
                );
            })}
          </div>
        </div>
      );
  }
}

module.exports = Collaborators;