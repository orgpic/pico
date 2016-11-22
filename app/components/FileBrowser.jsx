const React = require('react');
const axios = require('axios');

class FileBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerName: this.props.containerName,
      curDir: '/picoShell',
      contents: []
    };
    this.doubleClick = this.doubleClick.bind(this);
  }

  doubleClick(e, entry) {
    alert(entry);
  }

  componentWillReceiveProps(nextProps) {
    console.log('FB GOT PROPS', nextProps);
    const context = this;
    axios.post('/docker/cmd', { cmd: 'ls -a', containerName: nextProps.containerName })
    .then(function(res) {
      const contents = res.data.split('\n');
      //remove the last element, which is ''
      contents.pop();
      context.setState({
        contents: contents
      });
    });
  }

  render() {
    const context = this;
    return (
        <div>
          {this.state.contents.map(function(entry) {
            return (
                <div onDoubleClick={(e) => {context.doubleClick(e, entry)}}>{entry}</div>
              );
          })}
        </div>
      );
  }
}

module.exports = FileBrowser;