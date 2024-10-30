import React, {useState} from 'react';
import './Tudo.css';

const Tudo = () => {
    const[tudos,setTudos] = useState([]);
    const [inputValue,setInputValue] = useState('');
    const [editMode,setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const addTudo = () =>{
        if(inputValue.trim()!== ''){
            const newTudo = {
                id: new Date().getTime(),
                text: inputValue,
            }
            setTudos([...tudos,newTudo]);
            setInputValue('');
        }
    }

    const deleteTudo = (id) => {
        const updateTudos = tudos.filter((tudo) => tudo.id !== id);
        setTudos(updateTudos)
    }

    const enterEditMode = (id,text) => {
        setEditMode(true);
        setEditId(id);
        setEditValue(text);
    }

    const updateTudo = () => {
        const updateTudos = tudos.map((tudo) => {
            if(tudo.id === editId){
                return {...tudo, text: editValue};
            }
            return tudo;
        })

        setTudos(updateTudos);
        setEditMode(false);
        setEditId(null);
        setEditValue('');
    }
  return (
    <div className='tudo-container'>
        <h2>ToDo List</h2>
        <input type='text' value={inputValue}
        onChange={(e) =>
            setInputValue(e.target.value)}/>

            {
                editMode ? (
                    <div>
                        <input type='text' value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}/>
                        <button onClick={updateTudo}>Update</button>
                        </div>
                ):(
                    <button onClick={addTudo}>Add</button>
                )
            }
        <ul>
            {tudos.map((tudo) => (
                <li key={tudo.id}>
                    {tudo.text}
                    <div>
                    <button onClick={() => 
                        deleteTudo(tudo.id)}>Delete</button>
                        <button onClick={() => 
                        enterEditMode(tudo.id,tudo.text)}>Edit</button>
                        </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Tudo
