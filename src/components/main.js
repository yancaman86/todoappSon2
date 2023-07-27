import React, { useState, useEffect } from "react";
import Table from "./table";
import dbs from "./db.json";
import Select from 'react-select';

const option = [
  { value: 'todo', label: 'Todo' },
  { value: 'inprogress', label: 'Inprogress' },
  { value: 'done', label: 'Done' },
];

function Main() {
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [status, setStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const addInput = () => {
    if (input !== "" && selectedOption !== null) {
      const newInput = {
        id: nextId,
        title: input,
        status: selectedOption.value,
      };
      setInputs([...inputs, newInput]);
      setInput("");
      setNextId(nextId + 1);
      setSelectedOption(null);
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  var num = 0;

  useEffect(() => {
    
    if(num === 0) {
      setInputs(dbs);
       num = 1;
       const maxId = dbs.reduce(
        (max, input) => (input.id > max ? input.id : max),
        
      );
      setNextId(maxId + 1);
       
    }

  }, []);

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <div className= "under-search box">
        <h1 className="search-box-baslık">Search Box</h1>
        <div>
          <input
            type="text"
            placeholder="Enter"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={option}
          />
          <button className="add-button" onClick={addInput}>
            Submit
          </button>

          <Table inputs={inputs} setInputs={setInputs} />
        </div>
      </div>
    </form>
  );
}

export default Main;


          


