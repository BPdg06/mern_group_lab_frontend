import React from "react";

const Display = (props) => {
  // destruct the dogs from props
  const { songs } = props


  // Returns the JSX for when you have songs
  const loaded = () => (
    <div style={{textAlign: "center"}}>
        {songs.data.map((song) => (
            <article key={song._id}>
                <h1>{song.name}</h1>
                <h3>{song.artist}</h3>
                <h3>{song.time}</h3>
                <button onClick={() => {
                    props.selectSong(song)
                    props.history.push("/edit")
                }}>
                Add to Favorite
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

  return songs.data.length > 0 ? loaded() : loading()
};

export default Display;