const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-column">
            <p className="footer-header">picoShell</p>
            <ul>
              <li><img src="/images/whitelogo.svg"></img><a href="/about">About</a></li>
              <li><i className="ion-ios-world-outline"></i><a href='/faq'>FAQ</a></li>
              <li><i className="ion-ios-home-outline"></i><a href='/'>Home</a></li>
            </ul>
        </div>
        <div className="footer-column">
          <p className="footer-header">Contact Us</p>
          <ul>
            <li><i className="ion-ios-email-outline"></i>picoShellTeam@gmail.com</li>
          </ul>
        </div>
      </div>
    );
  }
}
module.exports = Footer;  