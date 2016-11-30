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
/*
class Dropzone extends React.Component {
    constructor(props) {
        super(props);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            acceptedFiles: "text/plain",
            addRemoveLinks: true,
            params: {
                myParam: 'Hello from a parameter!',
                anotherParam: 43
            },
            autoProcessQueue: true,
            uploadMultiple: false
        };

        this.componentConfig = {
            iconFiletypes: ['.txt'],
            showFiletypeIcon: true,
            postUrl: '/uploadHandler'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            drop: this.callbackArray,
            addedfile: this.callback,
        }

        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    }
}
*/

module.exports = Dropzone;