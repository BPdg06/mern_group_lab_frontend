import React from "react";

const Display = (props) => {
  // destruct the dogs from props
  const {songs, selectSong, history} = props

  // Returns the JSX for when you have songs
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {songs.map((song) => (
        <article key={song._id}>
          <img src={song.img} alt=""/>
          <h1>{song.name}</h1>
          <h3>{song.age}</h3>
          <button onClick={() => {
            selectSong(song)
            history.push("/edit")
          }}>
            edit
          </button>
          <button onClick={() => {
            props.deleteSong(song)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )

  const loading = () => <h1>Loading</h1>

  return songs.length > 0 ? loaded() : loading()
};

export default Display;