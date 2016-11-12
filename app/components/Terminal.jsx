const React = require('react');
const jQueryTerminal = require('jquery.terminal');
const axios = require('axios');

class Terminal extends React.Component {
	constructor(props) {
		super(props);
    var context = this;
		this.state = {
			command: null,
      prompt: null,
      containerName: 'juice' // change this to refer to user name when login is done
		}
    this.renderTerminal();
	}



  renderTerminal() {
    // console.log($);
    // console.log($.terminal);

    var prompt = this.state.prompt ? this.state.prompt + '>> ' : '>> ';
    var containerName = this.state.containerName;

    $(function($, undefined) {
      $('#terminal').terminal(function(command, term) {
        console.log('command', command);
        if (command !== '') {

          axios.post('/cmd', { cmd: command, containerName: containerName })
            .then(function(res) {
              console.log(res);
              console.log(res.data);
              term.echo(String(res.data));
            })
            .catch(function(err) {
              console.error(err);
              term.echo(String(err));
            });

            // var result = window.eval(command);
        }
      }, {
          greetings: '',
          name: '',
          height: 500,
          width: 650,
          prompt: prompt,
          onInit: function(term) {
            console.log('started terminal');
            var command = 'cd /picoShell';
            axios.post('/cmd', { cmd: command, containerName: containerName })
              .then(function(res) {
                console.log(res);
                term.echo(String(res.data));
              })
              .catch(function(err) {
                console.error(err);
                term.echo(String(err));
              });
          }
      });
    });
  }

	render() {
		return (
      <div>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/0.11.13/css/jquery.terminal.min.css" rel="stylesheet"></link>
        <div id="terminal"></div><br/>
			</div>
		)
	}
}

module.exports = Terminal;