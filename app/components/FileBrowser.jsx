const React = require('react');
const axios = require('axios');

class FileBrowser extends React.Component {
  constructor(props) {
    super(props);
    console.log('this is props of file browser', props);
    this.socket = io();
    this.state = {
      containerName: this.props.containerName,
      curDir: '/picoShell',
      contents: []
    };
    this.doubleClick = this.doubleClick.bind(this);
    this.updateFileBrowser = this.updateFileBrowser.bind(this);
  }

  updateFileBrowser(path) {
    const context = this;
    axios.post('/docker/cmd', { cmd: 'ls ' + path + ' -al', containerName: context.state.containerName })
    .then(function(res) {
      const contents = res.data.split('\n');

      let contentsArr = [];

      for (var i = 0; i < contents.length; i++) {
        const arr = contents[i].split(" ");
        let type;
        if (arr[0].substring(0, 1) === "d") {
          type = "folder"
        } else if (arr[0].substring(0, 2) === "-r") {
          type = "file"
        }
        const name = arr[arr.length - 1];
        if(name !== '.pico') contentsArr.push({type: type, name: name});
      }
      //remove the last element, which is ''
      //remove the first element, which is '.'
      contentsArr.shift();
      contentsArr.pop();
      context.setState({
        contents: contentsArr,
        curDir: path
      });
    });
  }

  componentWillMount() {
    const context = this;
    this.setState({
      containerName: this.state.containerName
    });
    this.updateFileBrowser('/picoShell');
  }


  componentWillReceiveProps(nextProps) {
    const context = this;
    this.setState({
      containerName: nextProps.containerName
    });
    this.updateFileBrowser('/picoShell');
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
          console.log('newDir', newDir);
          console.log('sliced', sliced);
          context.updateFileBrowser(sliced);
        } else {
          var newDir = context.state.curDir + '/' + resp.data.newDir;
          if(newDir.startsWith('//')) newDir = newDir.slice(1);
          context.updateFileBrowser(newDir);
        }
      } else if (resp.data.type === 'file') {
        //alert(resp.data.fileContents);

        context.socket.emit('/TE/', {filePath: context.state.curDir, fileName: entry, fileOpen: true, containerName: context.state.containerName, username: 'FILEBROWSER', code: resp.data.fileContents});
      }
    });
  }



  render() {
    const context = this;
    return (
        <div>
          {this.state.contents.map(function(entry) {
            if (entry.type === "file") {
              return (
                <div className="fileBrowser" onDoubleClick={(e) => {context.doubleClick(e, entry.name)}}><i className="ion-ios-paper-outline">{" " + entry.name}</i></div>
              )
            } else if (entry.type === "folder" && entry.name !== ".") {
              return (
                <div id={entry.name} className="fileBrowser" onDoubleClick={(e) => {context.doubleClick(e, entry.name)}}>
                  { entry.name === ".." ? <i className="ion-ios-arrow-up">{entry.name}</i> : <i className="ion-ios-arrow-down">{" " + entry.name}</i> }
                </div>
              )
            }
          })}
        </div>
      );
  }
}

module.exports = FileBrowser;