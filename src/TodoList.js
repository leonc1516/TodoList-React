import './TodoList.css';
import { useState } from 'react'

const TodoItem = ({ item, handleDelete }) => {
    const [checked, setChecked] = useState('')

    const handleChange = () => {
        if (checked === 'Checked') {
            setChecked('');
        } else {
            setChecked('Checked')
        }
    }

    return (
        <div className={checked}>
            <label>
                <button onClick={handleDelete}>X</button>
                {item} <input type="checkbox" onChange={handleChange}/>
            </label>
        </div>
    )
}

const TodoList = () => {
    const [item, setItem] = useState('')
    const [items, setItems] = useState([])

    const handleChange = (e) => {
        setItem(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item !== '') {
            setItems([...items, {id: items.length, item: item}]);
            setItem('');
        } else {
            alert("Please enter a value")
        }
    }
    
    const handleDelete = (id) => {
        setItems(items.filter((x) => x.id !== id));
    }

    const todoItems = items.map((x) => <TodoItem item={x.item} handleDelete={() => handleDelete(x.id)} key={x.id}/>);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Add Item: <input type="text" value = {item} onChange={handleChange} />
                    <button onClick={handleSubmit}>Add</button>
                </label>
            </form>
            {todoItems}
        </div>
    )
}

export default TodoList;