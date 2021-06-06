import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Component } from "react";

const api_instance = axios.create({
  baseURL: "http://localhost/anil/react/react-axios/php",
});
class Index extends Component {
  state = {
    tasks: [],
    newtask: "",
    updatetask: "",
    showedit: false,
    edit_id: "",
  };
  constructor() {
    super();
    this.getTasklist();
  }

  newtaskChange = (event) => {
    this.setState({ newtask: event.target.value });
  };

  updatetaskChange = (event) => {
    this.setState({ updatetask: event.target.value });
  };

  editTask(id) {
    var task_list = this.state.tasks;
    var edit_task = task_list.find((task) => task.id === id).task;
    this.setState({ edit_id: id });
    this.setState({ updatetask: edit_task });
    this.setState({ showedit: true });
  }

  getTasklist = async () => {
    try {
      let data = await api_instance
        .get("api.php?action=show")
        .then(({ data }) => data);
      this.setState({ tasks: data });
    } catch (err) {
      console.log(err);
    }
  };

  createTask = async () => {
    let res = await api_instance.post("api.php?action=create", {
      task: this.state.newtask,
    });
    console.log(res);
    this.getTasklist();
  };

  deleteTask = async (id) => {
    console.log(id);
    let res = await api_instance.post("api.php?action=delete", { id: id });
    console.log(res);
    this.getTasklist();
  };

  updateTask = async (id) => {
    let res = await api_instance.post("api.php?action=update", {
      id: id,
      task: this.state.updatetask,
    });
    console.log(res);
    this.setState({ showedit: false });
    this.getTasklist();
  };

  render() {
    return (
      <div>
        <input type="text" name="newtask" onChange={this.newtaskChange} />
        <button onClick={this.createTask}>Create task</button>
        <h6>Task list</h6>
        {this.state.tasks.map((task) => (
          <li key={task.id}>
            {task.task}
            <button
              onClick={() => {
                this.editTask(task.id);
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                this.deleteTask(task.id);
              }}
            >
              x
            </button>
          </li>
        ))}
        {this.state.showedit ? (
          <div>
            <input
              type="text"
              value={this.state.updatetask}
              onChange={this.updatetaskChange}
              name="updatetask"
            />
            <button
              onClick={() => {
                this.updateTask(this.state.edit_id);
              }}
            >
              save
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
ReactDOM.render(<Index />, document.getElementById("root"));
//called Arrow Function, which was introduced in ES6, and will be supported on React 0.13.3 or upper.
