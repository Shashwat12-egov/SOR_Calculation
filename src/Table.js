import React, { useState } from 'react';
import './Table.css';

const Table=()=> {
  const initialData = [{ id: 1, description: '', rate: '', quantity: '', amount: 0 }];

  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [total, settotal] = useState(0);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const filterrows=data.filter(item => item.description.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredData(filterrows);
    let tot=0;
    filterrows.forEach(ele=> {
      tot+=ele.amount;
    })
    settotal(tot);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    let updatedData = data.map(item => 
      item.id === id ? { ...item, [name]: (name === 'rate' || name==='quantity') ? parseInt(value) : value } : item
    );
    for(let element=0;element<updatedData.length;element++) {
      let rate=updatedData[element].rate;
      let quantity=updatedData[element].quantity;
  
      if(isNaN(rate)) {
        rate=0;
      }
      if(isNaN(quantity)) {
        quantity=0;
        console.log(quantity);
      }

      let amt=total-updatedData[element].amount;
      updatedData[element].amount=rate*quantity;
      settotal(amt+updatedData[element].amount);
    }
    setData(updatedData);
    setFilteredData(updatedData.filter(item => item.description.toLowerCase().includes(filter.toLowerCase())));
    
  };

  const handleAddRow = () => {
    const newRow = { id: data.length + 1, description: '', rate: '', quantity: '', amount: 0 };
    const newData = [...data, newRow];
    setData(newData);
    setFilteredData(newData.filter(item => item.description.toLowerCase().includes(filter.toLowerCase())));
  };

  const handleDeleteRow = (id) => {
    data.forEach(ele=> {
      if(ele.id===id) {
        settotal(total-ele.amount);
      }
    })
    const updatedData = data.filter(item => item.id !== id);

    updatedData.map((element,index)=> {
      return element.id=index+1;
    })
    setData(updatedData);
    setFilteredData(updatedData.filter(item => item.description.toLowerCase().includes(filter.toLowerCase())));
  };

  return (
    <div className="container">
      <main>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={handleFilterChange}
            className="input"
          />
          <button onClick={handleAddRow} className="button">Add Row</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="thTd th">S.No.</th>
              <th className="thTd th">Description</th>
              <th className="thTd th">Rate</th>
              <th className="thTd th">Estimated Quantity</th>
              <th className="thTd th">Estimated Amount</th>
              <th className="thTd th"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="thTd">{item.id}</td>
                <td className="thTd">
                  <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleInputChange(e, item.id)}
                    className="input"
                  />
                </td>
                <td className="thTd">
                  <input
                    type="number"
                    name="rate"
                    value={item.rate}
                    onChange={(e) => handleInputChange(e, item.id)}
                    className="input"
                  />
                </td>
                <td className="thTd">
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, item.id)}
                    className="input"
                  />
                </td>
                <td className="thTd">
                  {item.amount}
                </td>
                <td className="thTd">
                  <button
                    onClick={() => handleDeleteRow(item.id)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <h4>
        Total amount: {total}
      </h4>
    </div>
  );
}

export default Table;