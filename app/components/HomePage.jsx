const React = require('react');
const NavBar = require('./NavBar.jsx');

const HomePage = ({username, mostPopularVideos}) => {
	return (
		<div className="homepage-container">
		  <div className="header">
		    <NavBar username={username} />
		    <div className="title">
		      <img className="mini-logo" src="/images/whitelogo.svg"></img> <span className="logo-text"></span>
		    </div>
		    <div className="subtitle">
		      What's Hot at picoShell
		    </div>
		    <div className="subsubtitle">
		      Start Coding on picoShell's Top 8
		    </div>
		    <div className="most-popular-videos">
		      {mostPopularVideos.map((video, i) => {
		        return (
		          <div className="video-entry-home-page" key = {i}>
		              <a href={'/video/' + video.videoId}><img src={video.videoImage}/></a>
		          </div>
		        )
		      })}
		    </div>
		  </div>
		  <div className="info">
		    <div className="info-header">Why picoShell?</div>
		    <div className="sub-header">
		      picoShell is for educators, students, developers, and interviewers who want to collaborate through code remotely
		    </div>
		    <div className="info-container">
		      <img src="/images/header.gif"></img>
		      <div className="description-left">
		        <span className="title">Powerful</span><br/>
		        Gain full access to your own linux terminal emulator and code editor with ruby, node, python, gcc, git, and more installed
		      </div>
		    </div>
		    <div className="info-container">
		      <div className="description-right">
		      <span className="title" id="educational">Educational</span><br/>
		      Add videos from YouTube to picoShell and instantly code alongside of it. 
		      picoShell remembers the file you create with each video, so you can always pick up
		      where you left off
		      </div>
		      <img src="/images/codeable.gif"></img>
		    </div>
		    <div className="info-container">
		      <img src="/images/header.gif"></img>
		      <div className="description-left">
		        <span className="title">Collaborative</span><br/>
		          Easily give read or write access to your computer to work on projects, assignments,
		          or to conduct interviews
		      </div>
		    </div>
		    <div className="info-container">
		      <div className="description-right">
		      <span className="title">Convenient</span><br/>
		        You could just push your code up to git...or you could use picoShell's download button
		        to export all your files to your local filesystem
		      </div>
		      <img src="/images/codeable.gif"></img>
		    </div>
		  </div>
		  <div className="footer">
		    <div className="footer-column">
		        <p className="footer-header">picoShell</p>
		        <ul>
		          <li><img src="/images/whitelogo.svg"></img>About</li>
		          <li><i className="ion-ios-world-outline"></i>FAQ</li>
		        </ul>
		    </div>
		    <div className="footer-column">
		      <p className="footer-header">Contact Us</p>
		      <ul>
		        <li><i className="ion-ios-email-outline"></i>bianca.subion@gmail.com</li>
		      </ul>
		  </div>
		</div>
		</div>
	)
}


module.exports = HomePage;