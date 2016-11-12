const React = require('react');
const jQueryTerminal = require('jquery.terminal');
const axios = require('axios');

class Terminal extends React.Component {
	constructor(props) {
		super(props);
    var context = this;
		this.state = {
			command: null
		}
    this.renderTerminal();
	}

  renderTerminal() {
    // console.log('render terminal');
    console.log($);
    console.log($.terminal);

    $(function($, undefined) {
      $('#terminal').terminal(function(command, term) {
        console.log('command', command);
        if (command !== '') {

          axios.post('/cmd', { cmd: command })
            .then(function(res) {
              console.log(res);
              console.log(res.data);
              term.echo(String(res.data));
            })
            .catch(function(err) {
              console.error(err);
              term.echo(String(err));
            })

            // var result = window.eval(command);
            // console.log('result', result);
            // if (result != undefined) {
            //     term.echo(String(result));
            // }
        }
      }, {
          greetings: '',
          name: '',
          height: 600,
          width: 650,
          prompt: '>> '
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