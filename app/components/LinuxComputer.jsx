const React = require('react');
const ReactDOM = require('react-dom');
const CodeEditor = require('./CodeEditor.jsx')
const Terminal = require('./Terminal.jsx')
const axios = require('axios');
const NavBar = require('./NavBar.jsx');
const Chatbox = require('./Chatbox.jsx');
const FileBrowser = require('./FileBrowser.jsx');
const SplitPane = require('react-split-pane');
const YoutubeVideo = require('./YoutubeVideo.jsx');

class LinuxComputer extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      username: '',
      containerName: '',
      collabWith: [],
      toggle: false
    }

    this.selectChange = this.selectChange.bind(this);
  }


componentWillMount() {
  var context = this;
  const user = JSON.parse(localStorage['user']);
  context.setState({
    containerName: user.username,
    username: user.username,
    collabWith: []
  });
  axios.post('/users/collaboratingWith', {username: user.username})
  .then(function(res) {
    const acceptedUsernames = res.data.map(function(accepted) {
    return accepted.requesterUsername;
    });
    context.setState({
      collabWith: acceptedUsernames
    });
  });
  this.socket.on('/DASH/REMOVE/COLLABWITH/' + user.username, function(rejection) {
    if(rejection.remover === context.state.containerName) {
      window.location.reload();
    } else {
      var collabWith = context.state.collabWith;
      collabWith.splice(collabWith.indexOf(rejection.remover), 1);
      context.setState({
        collabWith: collabWith
      });
    }
  });

  this.socket.on('/TERM/SHOW/' + user.username, function(show) {
    console.log('SHOWING');
    context.setState({
      toggle: false
    });
  });
} 

  selectChange(event) {
    //alert(event.target.value);
    const context = this;
    this.socket.off('/TERM/SHOW/' + this.state.containerName);
    this.setState({
      containerName: event.target.value
    });
    this.socket.on('/TERM/SHOW/' + event.target.value, function(show) {
      console.log('SHOWING1');
      context.setState({
        toggle: false
      });
    });
  }

  handleToggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }
    render() {
      const context = this;
      if (this.state.containerName.length) {
           return (
            <div className="linux-computer-container">
              <NavBar username={this.state.username} />
              <div className="collaborator-bar"> 
                  <i className="ion-ios-monitor-outline"></i>
                <select id="thisSelect" className="form-control" onChange={this.selectChange}>
                  <optgroup label="Collaborators">
                  <option value={this.state.username}>{this.state.username}</option>
                  {
                    this.state.collabWith.map(function(user) {
                    return (
                        <option value={user}>{user}</option>
                      );
                  })}
                  </optgroup>
                </select>
              </div>

              <div className="row">
                <SplitPane split="vertical" defaultSize='50%'>
                   <CodeEditor username={this.state.username} containerName={this.state.containerName}/>
                    <div className="file-browser-container">
                      <div className="terminal-menu">
                       <i className="ion-ios-folder-outline" onClick={this.handleToggle.bind(this)}></i>
                      </div>
                      <FileBrowser containerName={this.state.containerName} hidden={!this.state.toggle}/>
                      <Terminal username={this.state.username} containerName={this.state.containerName} hidden={this.state.toggle}/>
                    </div>
                </SplitPane>
              </div>
                <Chatbox username={this.state.username} containerName={this.state.containerName}/>
              <footer></footer>
            </div>
          );
   } else {
    return (
      <div>
        Loading...
      </div>
    );
	}
}
}


module.exports = LinuxComputer;