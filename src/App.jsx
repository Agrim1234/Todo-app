import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";



function App() {
    //const [count, setCount] = useState(0)
    const [todos, settodos] = useState([])
    const [name, setName] = useState("enter your todo")
    const curId = useRef("")
    const [showfinished, setshowfinished] = useState(true)
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


    // function generateString(length) {
    //     let result = ' ';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }

    useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if (todoString) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            settodos(todos)
        }
    }, [])


    const saveToLS = (params) => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }



    const handleChange = (e) => {
        //if (e.target.value) {

        setName(e.target.value)
        //}
    }

    const handleEdit = (e, id) => {
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        curId.current = id
        setName(todos[index].desc)
        saveToLS()
    }

    // const checkId = (itemTodo) => {
    //     return id !== itemTodo.id
    // }

    const handleDelete = (e, id) => {
        // let newTodos = [...todos]
        // console.log(newTodos)
        let newTodos = todos.filter(itemTodo => {
            return itemTodo.id !== id
        });
        //console.log(newTodos)
        settodos(newTodos)
        saveToLS()
    }

    const togglefinished = () => {
        if (showfinished) {
            let newTodos = [...todos]
            newTodos = newTodos.filter((item) => {
                return item.isCompleted === false
            })
            setshowfinished(false)
            settodos(newTodos)
        } else {
            let todos = JSON.parse(localStorage.getItem("todos"))
            setshowfinished(true)
            settodos(todos)
        }

    }

    const addTodo = () => {
        //console.log(curId)
        if (curId.current === "") {
            let todoItem = {
                "id": uuidv4(),
                "desc": name,
                "isCompleted": false
            }

            settodos([...todos, todoItem])
            saveToLS()
        } else {
            let index = todos.findIndex(item => {
                return item.id === curId.current;
            })
            let newTodos = [...todos]
            newTodos[index].desc = name
            curId.current = ""
            settodos(newTodos)
            saveToLS()
        }
    }

    const handleCheckbox = (e) => {
        let id = e.target.name
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodos = [...todos]
        newTodos[index].isCompleted = !newTodos[index].isCompleted
        //console.log(newTodos[index])
        settodos(newTodos)
        saveToLS()
    }



    return (
        <>
            <div className="container h-5/6 w-screen">
                <Navbar />
                <div className='flex m-2 justify-around border-cyan-800 w-screen'>
                    <input type="text" name='todoDesc' value={name ? name : ""} onChange={handleChange} className='border-2 border-indigo-600 p-1 w-4/6' />
                    <button className=' bg-indigo-600 px-2 text-white disabled:bg-gray-400 w-1/6' disabled={name.length <= 3} onClick={addTodo}>SAVE</button>
                </div>
                <input type="checkbox" checked={showfinished} onChange={togglefinished} className='m-4' /> show finished todos
                <div className='border-2 bg-violet-300 m-4 p-2 overflow-auto w-screen'> your TODOs</div>
                <div className='max-h-screen overflow-auto w-screen'>

                    {todos.length === 0 && <div className='m-5'>no todos to display</div>}
                    {todos.map(item => {
                        // return <Todo key={todo.title} todo={todo}/>
                        return <div key={item.id} className="m-4 border border-1 border-purple-400 flex justify-between items-center">
                            {/* {console.log(item.isCompleted)} */}
                            <div className='flex gap-4 m-3'>
                                <input type="checkbox" checked={item.isCompleted} name={item.id} id="" onChange={handleCheckbox} />
                                <div className={item.isCompleted ? "line-through" : ""}>{item.desc}</div>
                            </div>
                            <div className='flex'>
                                <button className='bg-indigo-700 m-2 p-2 text-white' onClick={(e) => { handleEdit(e, item.id) }}><FaEdit /></button>
                                <button className='bg-indigo-700 m-2 p-2 text-white' onClick={(e) => { handleDelete(e, item.id) }}><MdDeleteForever /></button>
                            </div>
                        </div>
                    })}
                </div>

            </div>
        </>
    )
}

export default App
