const React = require('react');

const VideoSearch = ({ handleVideoSearch, handleVideoSearchInputChange }) => {
  return (
    <form onSubmit={handleVideoSearch}>
      <input className="form-control" type="text" placeholder="Search YouTube" onChange={handleVideoSearchInputChange} />
    </form>
  )
}

module.exports = VideoSearch;