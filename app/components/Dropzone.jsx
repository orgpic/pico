const React = require('react');
const ReactDOM = require('react-dom');
const DropzoneComponent = require('react-dropzone');
const request = require('superagent');

var Dropzone = React.createClass({

  componentWillReceiveProps: function(nextProps) {
    console.log('DZ PROPS', nextProps);
    this.setState({
      curDir: nextProps.curDir,
      containerName: nextProps.containerName
    });
  },

  render: function() {
    return (
      <div>
        <DropzoneComponent disableClick={false} multiple={false} onDrop={this.dropHandler}>
          <div> Drop a photo, or click to add. </div>
        </DropzoneComponent>
      </div>
    );
  },

  dropHandler: function(file, filerej) {
    if(file.length === 0) return;
    if(file[0].size > 2000000) {
      alert('Sorry, but the maximum file upload size is 2 MB. Cloning a git repository does not have this limit.');
      return;
    }
    var fileData = new FormData();
    var options = JSON.stringify({fileName: file[0].name, containerName: this.state.containerName, curDir: this.state.curDir});
    fileData.append('file', file[0]);
    fileData.append('opts', options);

    request.post('/uploadHandler')
      .send(fileData)
      .end(function(err, resp) {
        if(err) {console.error(err);}
        console.log(resp);
        return resp;
      });
  }
});

module.exports = Dropzone;