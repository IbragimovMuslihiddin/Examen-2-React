import React, { useState } from "react";
import "./App.css";
import todo from "./img/TODO.png";
import group from "./img/Group 7.png"

const App = () => {
  const [data, setData] = useState([
    {
      task: "The first task title",
      id: 1,
      child: "Lorem ipsum dolor sit amet, consectetur adipcing elit. Maur sit amet eumod nulla.",
      status: false,
    },
  ]);
  const [text, setText] = useState("");
  const [childText, setChildText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editChildText, setEditChildText] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [AddModalOpen, setAddModalOpen] = useState(false);

  function addTodo() {
    let newUser = {
      id: Date.now(),
      task: text,
      child: childText,
      status: false,
    };
    setData([...data, newUser]);
    setText("");
    setChildText("");
    setAddModalOpen(false);
  }

  function deleteUser(id) {
    setData(data.filter((e) => e.id !== id));
  }

  function checked(elem) {
    let newData = data.map((e) => {
      if (e.id === elem.id) {
        return {
          ...e,
          status: !e.status,
        };
      }
      return e;
    });
    setData(newData);
  }

  function editUser(id, task, child) {
    setEditId(id);
    setEditText(task);
    setEditChildText(child);
    setModalOpen(true);
  }

  function saveEdit() {
    let newData = data.map((e) => {
      if (e.id === editId) {
        return { ...e, task: editText, child: editChildText };
      }
      return e;
    });
    setData(newData);
    setEditId(null);
    setEditText("");
    setEditChildText("");
    setModalOpen(false);
  }

  return (
    <>
    <div className="glavdiv">
        <button className="add" onClick={() => setAddModalOpen(true)}>ADD +</button>
      <div className="startone">
         <img className="imageone" src={todo} alt="" />
         <img className="imagetwo" src={group} alt="" />
    </div>
    <div className="starttwo">
      <div className="starttwoTask">
      {data.map((item, index) => (
  <div key={index} className="task-card">
    <h1 style={{ textDecoration: item.status ? "line-through" : "" }}>{item.task}</h1>
    <p style={{ textDecoration: item.status ? "line-through" : "" }}>{item.child}</p>
    <button className="delete" onClick={() => deleteUser(item.id)}>🗑️</button>
    <button className="check" onClick={() => checked(item)}>✅</button>
    <button className="edit" onClick={() => editUser(item.id, item.task, item.child)}>✏️</button>
  </div>
))}
      </div>

      {AddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="h1Task">Add New Task</h2>
            <p className="title">Title</p>
            <input className="inputone" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter title" /> <br />
            <p className="Des">Description</p>
            <input className="inputtwo" value={childText} onChange={(e) => setChildText(e.target.value)} placeholder="Enter description" /> <br/>
            <button className="save" onClick={addTodo}>Save</button>
            <button className="cancle" onClick={() => setAddModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {ModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="h2Task">Task</h2>
            <p className="title">Title</p>
            <input className="inputone" value={editText} onChange={(e) => setEditText(e.target.value)} placeholder="Edit title" /> <br />
            <p className="Des">Description</p>
            <input className="inputtwo" value={editChildText} onChange={(e) => setEditChildText(e.target.value)} placeholder="Edit description" /> <br/>
            <button className="save" onClick={saveEdit}>Save</button>
            <button className="cancle" onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    </div>
    
      
    </>
  );
};

export default App;
