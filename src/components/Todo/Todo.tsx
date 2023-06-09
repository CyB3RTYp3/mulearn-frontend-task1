import './Todo.css'
import {useState,useEffect} from 'react'


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProps {
  handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Todo = ({ handleLogout }: TodoProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    alert("todo deleted")
  };

  const toggleTodoStatus = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const updateTodo = () => {
    if (newTodo.trim() === '') return;
    const updatedTodos = todos.map((todo) =>
      todo.id === selectedTodo!.id ? { ...todo, text: newTodo } : todo
    );
    setTodos(updatedTodos);
    setSelectedTodo(null);
    setNewTodo('');
    alert("todo updated")
  };

  const cancelUpdate = () => {
    setSelectedTodo(null);
    setNewTodo('');
  };

  const countActiveTodos = () => {
    return todos.filter((todo) => !todo.completed).length;
  };

  const countCompletedTodos = () => {
    return todos.filter((todo) => todo.completed).length;
  };

    return (
    <div className='todo'>
        
          <div className='image-todo'>
            <div className='log-div'>
          <button className='logout' onClick={handleLogout}>Log out</button>  
            </div>
        <div className='header'>
         {/* <h1 className='h1'>Todo-List</h1> */}
         
        </div>
        <div className="todo-div">
        {selectedTodo ? (
          <>
            <input
              type="text"
              placeholder="Update Todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="input-todo"
            />
            <button onClick={updateTodo} className="button-todo">
              Update
            </button>
            <button onClick={cancelUpdate} className="button-todo cancel-button">
              Cancel
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="New Todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="input-todo"
            />  
            <button onClick={addTodo} className="button-todo">
              Add Todo
            </button>
          </>
          )}
        </div>
        <br />
        <br />
        </div>

         <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <label className="todo-label">
              <input
                type="radio"
                checked={todo.completed}
                onChange={() => toggleTodoStatus(todo.id)}
                className="radio-button"
              />
              <span className="checkmark"></span>
            </label>
            <span
              onClick={() => toggleTodoStatus(todo.id)}
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
            >
              {todo.text}
            </span>
            {!selectedTodo ? (
              <button
                onClick={() => setSelectedTodo(todo)}
                className="button-todo update-button"
              >
                Update
              </button>
            ) : (
              <button disabled className="button-todo update-button">
                Update
              </button>
            )}
            <button onClick={() => deleteTodo(todo.id)} className="button-todo cancel-button">
              delete
            </button>
          </li>
          
          ))}
          <li className='task'>
          <div className="footer">
          <span>{countActiveTodos()} todos left</span>
          <span>{countCompletedTodos()} completed</span>
        </div>
          </li>
        </ul>
       
    </div>
   
  )
}

export default Todo
