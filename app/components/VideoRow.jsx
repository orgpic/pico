const React = require('react');
const VideoEntry = require('./VideoEntry.jsx');


var VideoRow = ({row, onVideoClick}) => (
	<div>
	{
		row.map(video => <VideoEntry key={video.id} video={video} onVideoClick={onVideoClick}/>)
	}
	</div>
)

module.exports = VideoRow;