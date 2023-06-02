import React, { useEffect, useState } from 'react'
import './style.css'


const getLocalData = () => {
  const lists = localStorage.getItem('mytodolist')

  if (lists) {
    return JSON.parse(lists)
  }
  return [];
}


const ToDo = () => {


  const [inputData, setInputData] = useState('')
  const [items, setItems] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState('')
  const [toggleButton, setTogggleButton] = useState(false)



  const addItem = () => {
    if (!inputData) {
      alert('Please fill input data')
    } else if (inputData && toggleButton) {
      setItems(
        items.map((currElem) => {
          if (currElem.id === isEditItem) {
            return { ...currElem, name: inputData }
          }
          return currElem
        })
      )
      setInputData('')
      setIsEditItem(null)
      setTogggleButton(false)
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, myNewInputData])
      setInputData('')
    }
  }


  const deleteItem = (index) => {
    const updatedItem = items.filter((currElem) => {
      return currElem.id !== index
    })
    setItems(updatedItem)
  }


  const editItem = (index) => {
    const item_to_do_edited = items.find((currElem) => {
      return currElem.id === index

    });
    setInputData(item_to_do_edited.name)
    setIsEditItem(index)
    setTogggleButton(true);
  }



  const removeAll = () => {
    setItems([])
  }



  useEffect(() => {
    localStorage.setItem('mytodolist', JSON.stringify(items));
  }, [items])



  return (
    <>
      <div className='main-div'>
        <div className='child-div'>

          <figure>
            <img src='./images/check-mark-notepad-svgrepo-com.svg' alt="todologo" />
            <figcaption>Add Your List Here 📃</figcaption>
          </figure>

          <div className='addItems'>
            <input type='text' placeholder='✍🏻 Add Item'
              className='form-control'
              value={inputData}
              onChange={(event) => setInputData(event.target.value)} />

            {toggleButton ?
              <i className='fa fa-edit add-btn' onClick={addItem}></i> :
              <i className='fa fa-plus add-btn' onClick={addItem}></i>
            }
          </div>

          <div className='showItems'>
            {
              items.map((currElem) => {
                return (
                  <div className='eachItem' key={currElem.id}>
                    <h3>{currElem.name}</h3>
                    <div className='todo-btn'>
                      <i className='far fa-edit add-btn' onClick={() => { editItem(currElem.id) }}></i>
                      <i className='far fa-trash-alt add-btn' onClick={() => { deleteItem(currElem.id) }}></i>
                    </div>
                  </div>
                );
              })
            }
          </div>

          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>

        </div>
      </div>
    </>


  )
}

export default ToDo
