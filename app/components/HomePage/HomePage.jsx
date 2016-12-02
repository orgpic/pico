const React = require('react');
const NavBar = require('../NavBar.jsx');
const Footer = require('../Footer.jsx');

const HomePage = ({username,mostPopularVideos}) => {
  const showInfo = ({target}) => {
    const {className} = target;
    const target0 = 'overlay' + className;
    const target1 = 'front-layer' + className;

    document.getElementById(target0).style.visibility = 'visible';
    document.getElementById(target1).style.visibility = 'visible';
  };
  const hideInfo = ({target}) => {
    const {id} = target;
    const target0 = 'overlay' + id.split("front-layer")[1];
    const target1 =id;

    document.getElementById(target0).style.visibility = 'hidden';
    document.getElementById(target1).style.visibility = 'hidden';

  }

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
		            <img className={i} onMouseEnter={showInfo} src={video.videoImage}/>
    	          	<div className="overlay" id={'overlay' + i} data-key={i}>
    	          		<a href={'/video/' + video.videoId}><div className="front-layer" id={'front-layer' + i} onMouseOut={hideInfo}>{video.videoTitle}</div></a>
              		</div>
		          </div>
		        )
		      })}
		    </div>
		  </div>
		  <div className="info">
		    <div className="info-header">Javascript Videos</div>
    	</div>
		  <div className="info">
		    <div className="info-header">Python Videos</div>
    	</div>
		  <div className="info">
		    <div className="info-header">Ruby Videos</div>
    	</div>
		   <Footer/>
		</div>
  )
}


module.exports = HomePage;