import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import React from "react";
export default function TodoList() {
  let [item, setItem] = React.useState("");
  let [addItem, setAddItem] = React.useState("");
  let [countTask, setCountTask] = React.useState(0);
  let [username, setUsername] = React.useState("");
  React.useEffect(() => {
    fetch("/api/lists/")
      .then((response) => response.json())
        .then(result => {
          if(result.length > 0){
            task(result);
            setCountTask(result.length);
          }
          else {
            task(result);
          }
        })
      // .then((result) => {
      //   if (result.length > 0) {
      //     task(result);
      //     setCountTask(result.length);
      //   } else {
      //     task(result);
      //   }
      .catch(err => console.log(err));
  });
  React.useEffect(() => {
    fetch("/api/users/check", {
      method: "PUT"
    }).then(response => response.json()).then(result => {
      setUsername(result.username);
    }
    ).catch(err => console.log(err));
  })
  

  // function task to manage all the task
  function task(result) {
    let tasktodo = (
      <div className="ListGroup">
        {result.map((item) => (
          <div className="ListGroupItem" key={item._id}>
            <Button
              className="remove-btn"
              color="danger"
              onClick={() => {
                let id = item._id;
                let url = "/api/lists/" + id;
                fetch(url, {
                  method: "DELETE",
                  body: JSON.stringify(item),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    if (result.length > 0) {
                      task(result);
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              &times;
            </Button>
            <div className="item">{item.todo}</div>
          </div>
        ))}
        <div className="addTaskForm">
          <form className="ListGroupItem">
            <button
              className="add-btn"
              onClick={() => {
                let url = "/api/lists/add";
                fetch(url, {
                  method: "POST",
                  body: JSON.stringify({ todo: addItem }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    if (result.length > 0) {
                      task(result);
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              +
            </button>
            <input
              className="add-input"
              type="text"
              placeholder="Add new task"
              onChange={(e) => setAddItem(e.target.value)}
            />
          </form>
        </div>
      </div>
    );
    setItem(tasktodo);
  }

  return (
    <Container>
      <div className="content">
        <div className="header">
          <div className="header__text">To do</div>
        </div>
        <div className="todo-list">{item}</div>
      </div>

      <div className="sidebar-todo">
        <div className="profile">
          <div className="profile-icon">Profile</div>
          <div className="profile-name">{username}</div>
        </div>
        <div className="all-task-list">
          <div className="task-list">ALL TASK ({countTask})</div>
        </div>
        <div className="logout">
          <button className="logout-btn" onClick={() => {
            fetch("/api/users/logout", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              response.json()
              window.location.href = "/";})
            .then((result) => console.log('logout'));

          }}>LOG OUT</button>
        </div>
      </div>
    </Container>
  );
}
