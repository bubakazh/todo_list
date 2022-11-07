
const TodoList = (props) => {
  const todoClasses = ["bold"];

  if (props.todo.complete) {
    todoClasses.pop()
    todoClasses.push("line-thru", "greyOut")
  }

  return (
    <div style = {{ padding: 7 }}>
        <input onChange = {(e) => {
            props.handleTodoCompletion(props.i);
        }}  type="checkbox" checked = {props.todo.complete}/>

        {/* initially used p-tags here, but the delete button appears below the p tags, so span it is, to have the button to the side */}
        
        <span className = {todoClasses.join(" ")} style = {{ marginTop: 5, marginRight: 7 }}> { props.todo.text } </span>
        <button onClick = {(e) => {
            props.handleDeleteTodo(props.i)
        }}>Delete</button>
    </div>
  )
}

export default TodoList;