import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [toDosList, setToDosList] = useState([])

  const inputRef = useRef(null);

  useEffect(() => {
    const retrievedArrayAsString = localStorage.getItem('toDoArray');
    const retrievedArray = JSON.parse(retrievedArrayAsString);
    setToDosList(retrievedArray);
  }, [])


  const handleAddTodo = (event) => {
    if (todo.length > 0) {
      event.preventDefault();
      const uid = uuidv4();
      setToDosList([...toDosList, { uid, todo, isCompleted: false }]);
      setTodo("")
      const arrayAsString = JSON.stringify(toDosList);
      localStorage.setItem('toDoArray', arrayAsString);
    }
  }

  const handleInputChange = (event) => {
    setTodo(event.target.value)
  }

  const deleteTodoById = (id) => {
    let newToDos = [...toDosList];
    const ind = newToDos.findIndex(toDo => toDo.uid === id);
    if (ind >= 0 && ind < newToDos.length) {
      newToDos.splice(ind, 1);
    }
    setToDosList(newToDos);

    const arrayAsString = JSON.stringify(newToDos);
    localStorage.setItem('toDoArray', arrayAsString);
  }

  const handleDelete = (e) => {
    deleteTodoById(e.target.id);
  }

  const handleEdit = (e) => {
    setTodo(toDosList.find(toDo => toDo.uid === e.target.id).todo)
    deleteTodoById(e.target.id)
  }

  const handleCheckbox = (event) => {
    let newToDos = [...toDosList];
    const ind = newToDos.findIndex(element => element.uid === event.target.id);
    newToDos[ind].isCompleted = !newToDos[ind].isCompleted;
    setToDosList(newToDos)
  }

  return (
    <>
      <Navbar />
      <div className='flex w-screen items-center justify-center mt-10'>

        <div className="md:w-3/4 p-10 bg-slate-100 rounded-2xl">
          <div>
            <form className="flex justify-between overflow-auto m-1" onSubmit={handleAddTodo}>
              <input
                ref={inputRef}
                type="text"
                value={todo}
                onChange={handleInputChange}
                placeholder="Enter Task Details"
                className='w-1/2 rounded-lg p-3'
              />
              <button className='hover:font-extrabold font-bold hover:cursor-pointer bg-slate-300 p-2 rounded-lg' type="submit">Save</button>
            </form>
          </div>

          <div className="showToDos mt-10">
            {toDosList.length ? <div className='font-bold'>TASKS YET TO BE COMPLETED</div> : <></>}
            {toDosList.map(toDo => {
              return (
                <div>
                  {!toDo.isCompleted &&
                    <div key={toDo.uid} className="flex justify-between w-full overflow-auto m-1 bg-slate-200 p-2 rounded-xl">
                      <div className={toDo.isCompleted ? "line-through" : ""}>{toDo.todo}</div>
                      <div className="buttons flex justify-between gap-2">
                        <button className='hover:font-bold bg-slate-300 p-2 rounded-lg h-10 self-center' onClick={handleDelete} type="button" id={toDo.uid}>Delete</button>
                        <button className='hover:font-bold bg-slate-300 p-2 rounded-lg h-10 self-center' onClick={handleEdit} type="button" id={toDo.uid}>Edit</button>
                        <input onChange={handleCheckbox} type="checkbox" name="" id={toDo.uid} value={toDo.isCompleted} />
                      </div>
                    </div>
                  }
                </div>
              )
            })}
            {toDosList.length ? <div className='font-bold'>COMPLETED TASKS</div> : <></>}
            {toDosList.map(toDo => {
              return (
                <div>
                  {toDo.isCompleted &&
                    <div key={toDo.uid} className="flex justify-between w-full overflow-auto m-1 bg-slate-200 p-2 rounded-xl">
                      <div className={toDo.isCompleted ? "line-through" : ""}>{toDo.todo}</div>
                      <div className="buttons flex justify-between gap-2">
                        <button className='hover:font-bold bg-slate-300 p-2 rounded-lg h-10 self-center' onClick={handleDelete} type="button" id={toDo.uid}>Delete</button>
                        <button className='hover:font-bold bg-slate-300 p-2 rounded-lg h-10 self-center' onClick={handleEdit} type="button" id={toDo.uid}>Edit</button>
                        <input onChange={handleCheckbox} type="checkbox" name="" id={toDo.uid} value={toDo.isCompleted} />
                      </div>
                    </div>
                  }
                </div>
              )
            })}
          </div>
        </div>
        <img src="" alt="" />
      </div>
    </>
  )
}

export default App
