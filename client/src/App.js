import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4002/users/")
      .then((res) => {
        //console.log(res.data);
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (id) => {
    // console.log("clicked!")
    axios
      .get(`http://localhost:4002/users/${id}/posts/`)
      .then((res) => setPostList(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {userList.map((u) => (
        <div key={u.id}>
          <button onClick={() => handleClick(u.id)}>{u.name}</button>
        </div>
      ))}
      {postList.map((p) => (
        <div>
          <div>{p.text}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
