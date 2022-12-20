import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFilter, clearCompleted, selectTodos } from '../redux/todos/todosSlice'


const Footer = () => {
	const dispatch = useDispatch()

	const items = useSelector(selectTodos)

	const activeButtonHandle = (active) => {
		dispatch(changeActiveFilter(active))
	}

	const clearCompletedHandle = () => {
		dispatch(clearCompleted())
	}

  return (
    <footer className="footer">
		<span className="todo-count">
			<strong>{items.length} {items.length > 0 ? "items" : "item"} left</strong>
		</span>

		<ul className="filters">
			<li>
				<button onClick={() => activeButtonHandle("all")}>All</button>
			</li>
			<li>
				<button onClick={() => activeButtonHandle("active")} >Active</button>
			</li>
			<li>
				<button onClick={() => activeButtonHandle("completed")} >Completed</button>
			</li>
		</ul>

		<button className="clear-completed" onClick={clearCompletedHandle}>
			Clear completed
		</button>
	</footer>
  )
}

export default Footer