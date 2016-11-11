const React = require('react');
// const jQuery = require('jQuery');
const jQueryTerminal = require('jquery.terminal');

class CodeEditor extends React.Component {
	constructor(props) {
		super(props);
    var context = this;
		this.state = {
			command: null
		}
    console.log(':-)');
    this.renderTerminal();
	}

	sendCommand(e) {

	}

  renderTerminal() {
    console.log('render terminal');
    // console.log(jQuery);
    // console.log(jQuery.terminal);
    console.log($);
    console.log($.terminal);
    // console.log(jQueryTerminal);

    $(function($, undefined) {
      $('#terminal').terminal(function(command, term) {
        console.log('command', command);
          if (command !== '') {
              var result = window.eval(command);
              console.log('result', result);
              if (result != undefined) {
                  term.echo(String(result));
              }
          }
      }, {
          greetings: 'Javascript Interpreter',
          name: 'js_demo',
          height: 300,
          width: 450,
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

module.exports = CodeEditor;