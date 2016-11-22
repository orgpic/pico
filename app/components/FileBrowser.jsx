const React = require('react');
const axios = require('axios');

class FileBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      containerName: this.props.containerName,
      curDir: '/picoShell',
      contents: []
    };
    this.doubleClick = this.doubleClick.bind(this);
  }

  doubleClick(e, entry) {
    const context = this;
    axios.post('/docker/handleFileBrowserChange', {containerName: this.state.containerName, dir: this.state.curDir, entry: entry})
    .then(function(resp) {
      if(resp.data.type === 'dir') {
        if(resp.data.newDir === '..') {
          const newDir = context.state.curDir;
          var sliced;
          if(newDir.indexOf('/') !== newDir.lastIndexOf('/')) {
            sliced = newDir.slice(0, newDir.lastIndexOf('/'));
          } else {
            sliced = '/';
          }
          console.log('sliced', sliced);
          axios.post('/docker/cmd', { cmd: 'ls ' + sliced + ' -a', containerName: context.state.containerName })
          .then(function(res) {
            const contents = res.data.split('\n');
            //remove the last element, which is ''
            //remove the first element, which is '.'
            contents.shift();
            contents.pop();
            context.setState({
              contents: contents,
              curDir: sliced
            });
          });
        } else {
          const newDir = context.state.curDir + '/' + resp.data.newDir;
          axios.post('/docker/cmd', { cmd: 'ls ' + newDir + ' -a', containerName: context.state.containerName })
          .then(function(res) {
            const contents = res.data.split('\n');
            //remove the last element, which is ''
            //remove the first element, which is '.'
            contents.shift();
            contents.pop();
            context.setState({
              contents: contents,
              curDir: newDir
            });
          });
        }
      } else if (resp.data.type === 'file') {
        //alert(resp.data.fileContents);
        context.socket.emit('/TE/', {filePath: context.state.curDir, fileName: entry, fileOpen: true, containerName: context.state.containerName, username: 'FILEBROWSER', code: resp.data.fileContents});
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('FB GOT PROPS', nextProps);
    const context = this;
    this.setState({
      containerName: nextProps.containerName
    });
    axios.post('/docker/cmd', { cmd: 'ls -a', containerName: nextProps.containerName })
    .then(function(res) {
      const contents = res.data.split('\n');
      //remove the last element, which is ''
      //remove the first element, which is '.'
      contents.shift();
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
                <div className="fileBrowser" onDoubleClick={(e) => {context.doubleClick(e, entry)}}>{entry}</div>
              );
          })}
        </div>
      );
  }
}

module.exports = FileBrowser;