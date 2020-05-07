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
      <div className="left">
        {userList.map((u) => (
          <div key={u.id}>
            <button className="btn" onClick={() => handleClick(u.id)}>{u.name}</button>
          </div>
        ))}
      </div>
      <div className="right">
        {postList.map((p) => (
          <div className="post" key={p.id}>
            <div>{p.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
