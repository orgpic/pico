const React = require('react');
const NewVideoForm = require('./NewVideoForm.jsx');

class YoutubeVideo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentVideo: null
		}
	}

	handleNewVideoSubmit(e) {
		const video = e.target.value;

		this.setState({
			currentVideo: video
		});
	}

	render() {
		if (this.state.currentVideo) {
			return (
        <div className="youtube-video-container">
  				<div className="embed-responsive embed-responsive-16by9">
  					<iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.state.video.videoId} allowFullScreen></iframe>
  				</div>
          <div>
            <NewVideoForm handleNewVideoSubmit={this.handleNewVideoSubmit.bind(this)}/>
          </div>
        </div>
			)
		} else {
      return (
        <div className="youtube-video-container">
          <NewVideoForm handleNewVideoSubmit={this.handleNewVideoSubmit.bind(this)}/>
        </div>
      )
    }
	}
} 

module.exports = YoutubeVideo;