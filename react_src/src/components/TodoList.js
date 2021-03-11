import React,{useState} from "react";

import './TodoList.css';
import Task from "./Task";

export default function TodoList(props) {


    /*Variables*/
    const [todoItems,seTodoItems] = useState([]);
    const [titleTask, setTitleTask] = useState();

    /*Fonctions*/

    let addTask = () =>{
        //console.log(titleTask);
        let newItems = {done:false, titleTask:titleTask};
        let newlist = [... todoItems, newItems];
        seTodoItems(newlist);
    }

    let removeTask = (index) =>{
        let newlist2 = [... todoItems];
        newlist2.splice(index, 1)
        seTodoItems(newlist2);
    }

    let endTask = (index) =>{
        let updateTask = {... todoItems[index]};
        updateTask.done = !updateTask.done;
        let newlist3 = [... todoItems];
        newlist3.splice(index,1,updateTask);
        seTodoItems(newlist3);
    }
    //console.log(todoItems);
    return (
        <div className='component__todoList'>
            <h2>To Do List</h2>
            <div>
                <label>
                    <input type="text" placeholder="Intitulé de la tache" onChange={(e)=>setTitleTask(e.target.value)}/>
                </label>
                <button className="button__addTodoTask" onClick={addTask}>Ajouter</button>
            </div>
            <div className="list__todoList">
                <ul>
                    {todoItems.map((item,index)=>
                        <li key={index}
                            id={`liTask_${index+1}`} >
                            <div className="container__todoTask">
                                <Task obj={item}/>
                                <div className="container__buttonsTodoTask">
                                    <button  className="button__endTodoTask" onClick={()=>endTask(index)}>Tache terminée !</button>
                                    <button className="button__removeTodoTask" onClick={()=>removeTask(index)}>Supprimer</button>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
