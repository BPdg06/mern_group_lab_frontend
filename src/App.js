import React from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";


function App() {

  const url = "https://songs-backend.herokuapp.com";

  const [songs, setSongs] = React.useState({
    status: 0,
    data: []
  })

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

  // update form
  const handleUpdate = (song) => {
    fetch(url + "/songs/" + song._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    }).then(() => getSongs());
  };

  // function of specify which song we are updated
  const selectSong = (song) => {
    setSelectedSong(song);
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
      <h3>FOR ALL YOUR PLAYLIST NEEDS</h3>
      <hr />
      <main>
      <Switch>
          <Route exact path="/" render={(rp) => (
            <Display 
            {...rp} 
            songs={songs}
            selectSong={selectSong}
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
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" song={selectedSong} handleSubmit={handleUpdate} />
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
