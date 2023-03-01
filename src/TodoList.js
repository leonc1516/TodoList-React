import "./TodoList.css";
import { useState, useEffect, useRef } from "react";

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
};

const EditMenu = ({ item, handleChange, handleSubmit }) => {
  return (
    <div className="DeleteMenu">
        <label>
          <input
            className="TodoListInput"
            type="text"
            placeholder="Edit Item:"
            value={item}
            onChange={handleChange}
          />
          <button
            type="button"
            className="TodoListSubmit"
            onClick={handleSubmit}
          >
            Edit
          </button>
        </label>
    </div>
  );
};

const PopUpMenu = ({ ref, isComponentVisible, handleEdit, handleDelete }) => {
  return (
    <ul className="drop-down">
      <li onClick={handleEdit}>Edit</li>
      <li onClick={handleDelete}>Delete</li>
    </ul>
  );
};

const TodoItem = ({ item, handleEdit, handleDelete }) => {
  const [checked, setChecked] = useState("SpanText");
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleChange = () => {
    if (checked === "SpanText Checked") {
      setChecked("SpanText");
    } else {
      setChecked("SpanText Checked");
    }
  };
  return (
    <div>
      <div className="TodoItem">
        <label>
          <div className={checked} onClick={handleChange}>
            {item}
          </div>
        </label>
      </div>
      <div
        className="ListButton"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        &#8942;
      </div>
      <div ref={ref}>
        {isComponentVisible && (
          <PopUpMenu handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

const TodoList = () => {
  const [editMenu, setEditMenu] = useState(false);
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [edited, setEdited] = useState("");
  const [id, setId] = useState(0);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item !== "") {
      setItems([...items, { id: items.length, item: item }]);
      setItem("");
    } else {
      // alert("Please enter a value")
    }
  };

  const handleEditSubmit = (id) => {
    const newItems = items.slice();
    newItems[id].item = edited;
    setItems(newItems);
    setEditMenu(!editMenu);
  };

  const handleEditChange = (e) => {
    setEdited(e.target.value);
  };

  const handleDelete = (id) => {
    console.log(id)
    setItems(items.filter((x) => x.id !== id));
  };

  const handleEdit = (id) => {
    setEdited(items[id].item);
    setEditMenu(!editMenu);
    setId(id);
  };

  const todoItems = items.map((x) => (
    <li className="TodoItemText" key={x.id}>
      <TodoItem
        item={x.item}
        handleDelete={() => handleDelete(x.id)}
        handleEdit={() => handleEdit(x.id)}
      />
    </li>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="TodoListInput"
            type="text"
            placeholder="Add Item:"
            value={item}
            onChange={handleChange}
          />
          <button className="TodoListSubmit" onClick={handleSubmit}>
            Add
          </button>
        </label>
      </form>
      <ul className="TodoList">{todoItems}</ul>
      {editMenu && (
        <EditMenu
          item={edited}
          handleChange={handleEditChange}
          handleSubmit={() => handleEditSubmit(id)}
        />
      )}
    </div>
  );
};

export default TodoList;
