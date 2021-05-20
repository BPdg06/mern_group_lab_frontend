import React from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";


function App() {

  const url = "http://localhost:3000";

  const [songs, setSongs] = React.useState([])

  const emptySong = {
    name:"",
    artist: "",
    time: ""
  }

  const [selectedSong, setSelectedSong] = React.useState(emptySong);

  const getSongs = () => {
    fetch(url + "/songs/")
    .then((response) => response.json())
    .then((data) => {
      setSongs(data)
    })
  }

  React.useEffect(() => {
    getSongs()
  }, [])

  // create form
  const handleCreate = (newSong) => {
    fetch(url + "/songs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    }).then(() => getSongs());
  };

  // delete form
  const deleteSong = (song) => {
    fetch(url + "/songs/" + song._id, {
      method: "delete"
    })
    .then(() => {
      getSongs()
    })
  }

  return (
    <div className="App">
      <h1>TUNR</h1>
      <h3>For ALL YOUR PLAYLIST NEEDS</h3>
      <hr />
      <main>
      <Switch>
          <Route exact path="/" render={(rp) => (
            <Display 
            {...rp} 
            songs={songs} 
            deleteSong={deleteSong} 
            />
            )} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" song={emptySong} handleSubmit={handleCreate} />
            )}
          />
        </Switch>
      </main>
      <Link to="/create">
        <button>Add New Song</button>
      </Link>
    </div>
  );
}

export default App;
