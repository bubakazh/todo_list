
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {

  // useState is a function call that returns an array with two items. we are never going to use the array, we just care about the two items in the array, named however we want.
  const [ newTodo, setNewTodo ] = useState("")
  // the "" gives us the default value. we can also set it to []. "" for a form with input fields, where the user will input a string.
  const [ Todos, setTodos ] = useState([])
  // [] is useful for when we maybe need to use the map function. null is useful for... when we need to differentiate between perhaps an empty array that we start with or an empty array that the api call gave us. (if we use null and then try to map, the app will break, so we need to make a conditional statement, if null, don't ".map" ie display something else.)

  // TODO - SENSEI CHALLENGE: persist the list in spite of page refreshes.
  // localStorage.setItem('persist', Todos)
  // console.log(localStorage)
  // useEffect(() => {
  //   localStorage.getItem('persist')
  // }, [])

  //first thing we always do is prevent default behavior (refreshing the page) when a form is submitted
  const handleFormSubmission = (e) => {
    e.preventDefault();
    // console.log(newTodo);

    // if the field is blank, do not add an item in the array OR if the field contains only spaces, do not add anything to the array (then set the input/state back to an empty string.)
    // if (newTodo.length == 0 || newTodo.trim().length == 0){
    // the second part of the above if statement will handle strings that are only spaces AND an empty input field.
    if (newTodo.trim().length == 0){
      setNewTodo("");
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    };

    // review the spread operator. it takes the array and separates the values.
    // we make a new array, add those values that were "spread apart" and the new value.
    setTodos([...Todos, todoItem]);
    setNewTodo("");
  };

  const handleDeleteTodo = (delIndex) => {
    const filteredTodos = Todos.filter((_todo, i) => i !== delIndex);
    setTodos(filteredTodos);
  }

  const handleTodoCompletion = (finIndex) => {
    const updatedTodos = Todos.map((todo, i) => {
      if(finIndex == i) {
        // in this case, manipulating state directly is fine, but
        // . todo.complete = !todo.complete;

        // use the following to avoid maniputlating state directly, if you really want to.
        const updatedTodo = {...todo, complete: !todo.complete};
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div style = {{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: 32, marginBottom: 10}}>
      {/* styling. why are there two sets of {{}}? outer set means js is happening? inner set is because styling is an object? recall how the styling is formatted in CSS files. */}
      <form onSubmit = {(e) => {
          handleFormSubmission(e);
        }}
      >
        <input onChange = {(e) => {
            setNewTodo(e.target.value);
          }} 
          type="text"
          // setting value to {newTodo} clears the input box. without assigning the value, when we click submit, we are changing state, "code-side," and this won't affect the input box, so whatever the user inputted will remain. 
          value = {newTodo}
          // now with the value on this input box assigned to newTodo, when state is cleared (when newTodo is cleared), the input box also gets cleared.
        />
        <button style = {{marginLeft: 10}}>Submit</button>
      </form>
      <h3>Todo List</h3>
      {/* JSX is HTML written in a javascript, like this ARRAY of HTML. we are going to display what's in state, which is an array. */}
      {
        Todos.map((todo, i) => {
          return(
              <TodoList 
                i = { i } 
                key = { i }
                todo = {todo} 
                handleTodoCompletion = {handleTodoCompletion}
                handleDeleteTodo = {handleDeleteTodo}
              />
            )
          })
      }
    </div>
  );
}

export default App;
