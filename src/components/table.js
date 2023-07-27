import React, { useState, useEffect } from "react";
//import Main from "./main";
import dbs from "./db.json";
import Modal from "./Modal.css"
import Edit from "./edit";
import Select from 'react-select';


const option = [
  { value: 'todo', label: 'Todo' },
  { value: 'inprogress', label: 'Inprogress' },
  { value: 'done', label: 'Done' },
];



function Table({ inputs, setInputs }) {
  const [todo, setTodo] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
  const [modalTodo, setModalTodo] = useState(false);
  const [modalInprogress, setModalInprogress] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState(null);


  const deleteInput = (id) => {
    const newInputs = inputs.filter((input) => input.id !== id);
    setInputs(newInputs);
    findStatus();
  };

  const saveEditTodo = () => {
    
      const updatedInput = {
        ...editTodo,
        status: selectedOption.value
      };
  
      const updatedInputs = inputs.map((input) =>
        input.id === editTodo.id ? updatedInput : input
      );
  
      setInputs(updatedInputs);
      setSelectedOption(null);

  };
  
  

  const editInput = (todo) => {
    setEditTodo(todo);

  };

  const toggleModalTodo = () => {
    setModalTodo(!modalTodo)
    if (!modalTodo) {
      setEditTodo(null);
    }
    
  }

  const toggleModalInprogress = () => {
    setModalInprogress(!modalInprogress)
    if (!modalInprogress) {
      setEditTodo(null);
    }
  }

  const toggleModalDone = () => {
    setModalDone(!modalDone)
    if (!modalDone) {
      setEditTodo(null);
    }
  }

  const findStatus = () => {
    const todoInputs = inputs.filter((input) => input.status === "todo");
    setTodo(todoInputs);

    const inprogressInputs = inputs.filter(
      (input) => input.status === "inprogress"
    );
    setInprogress(inprogressInputs);

    const doneInputs = inputs.filter((input) => input.status === "done");
    setDone(doneInputs);


  };

  useEffect(() => {
    findStatus();
    console.log("a");
  }, [inputs]);

  


  return (
    <div>
      <div className="box">
        <div className="todo-wrapper">
          <div>
            <h1 className="status-header"> todo</h1>
            <ul>
              {todo.map((todo) => {
                return (
                  <li key={todo.id}>
                    {todo.title}
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteInput(todo.id);
                      }}
                    >
                      Delete
                    </button>

                    <button className="editButton" onClick={() => {
                      toggleModalTodo();
                      editInput(todo);

                    }} >Edit
                    </button>

                    {modalTodo && (
                        <div className="modal">
                          <div onClick={toggleModalTodo} className="overlay"></div>
                          <div className="modal-content">

                            <input
                              type="text"
                              placeholder="Enter"
                              onChange={(e) => setEditTodo(e.target.value)}
                              value={todo.title}
                            />
                            <Select
                              value={selectedOption}
                              onChange={setSelectedOption}
                              options={option}
                            />
                            <button type="submit" className="add-button" onClick={saveEditTodo} >
                              Submit
                            </button>


                            <button className='close-modal' onClick={toggleModalTodo}>
                              CLOSE
                            </button>
                          </div>
                          </div>
                    )}

                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h1 className="status-header"> inprogress</h1>
            <ul>
              {inprogress.map((inprogress) => {
                return (
                  <li key={inprogress.id}>
                    {inprogress.title}
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteInput(inprogress.id);
                      }}
                    >
                      Delete
                    </button>

                    <button className="editButton" onClick={() => {
                      toggleModalInprogress();
                      editInput(inprogress);

                    }} >Edit
                    </button>

                    {modalInprogress && (
                      
                        <div className="modal">
                          <div onClick={toggleModalInprogress} className="overlay"></div>
                          <div className="modal-content">

                            <input
                              type="text"
                              placeholder="Enter"
                              onChange={(e) => setEditTodo(e.target.value)}
                              value={inprogress.title}
                            />
                            <Select
                              value={selectedOption}
                              onChange={setSelectedOption}
                              options={option}
                            />
                            <button type="submit" className="add-button" onClick={saveEditTodo} >
                              Submit
                            </button>


                            <button className='close-modal' onClick={toggleModalInprogress}>
                              CLOSE
                            </button>
                          </div>
                          </div>
                    )}

                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h1 className="status-header"> done</h1>
            <ul>
              {done.map((done) => {
                return (
                  <li key={done.id}>
                    {done.title}
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteInput(done.id);
                      }}
                    >
                      Delete
                    </button>

                    <button className="editButton" onClick={() => {
                      toggleModalDone();
                      editInput(done);

                    }} >Edit
                    </button>
                    {modalDone && (
                      
                      <div className="modal">
                        <div onClick={toggleModalDone} className="overlay"></div>
                        <div className="modal-content">

                          <input
                            type="text"
                            placeholder="Enter"
                            onChange={(e) => setEditTodo(e.target.value)}
                            value={done.title}
                          />
                          <Select
                            value={selectedOption}
                            onChange={setSelectedOption}
                            options={option}
                          />
                          <button type="submit" className="add-button" onClick={saveEditTodo} >
                            Submit
                          </button>


                          <button className='close-modal' onClick={toggleModalDone}>
                            CLOSE
                          </button>
                        </div>
                        </div>
                  )}

                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
