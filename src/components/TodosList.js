import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTodos, getTodosAsync, toggleTodoAsync, deleteTodoAsync, markAllCompleted } from '../redux/todos/todosSlice'

const TodosList = () => {

	const dispatch = useDispatch()

	let items = useSelector(selectTodos)
	const activeFilter = useSelector((store) => store.todos.activeFilter)

	useEffect(() => {
		dispatch(getTodosAsync())
	}, [dispatch])

	if (activeFilter !== "all") {
		items = items.filter(todo => activeFilter === "active"
			? todo.completed === false : todo.completed === true)
	}

	const handleToggle = async (id) => {
		await dispatch(toggleTodoAsync({ id }))
	}

	const handleDestroy = async (id) => {
		await dispatch(deleteTodoAsync(id))
	}

	const handleMarkAll = () => {
		dispatch(markAllCompleted())
	}

	return (
		<section className="main">
			<input className="toggle-all" type="checkbox" onClick={handleMarkAll()} />
			<label htmlFor="toggle-all" >
				Mark all as complete
			</label>

			<ul className="todo-list">
				{
					items.map(item =>
						<li key={item.id} className={item.completed ? "completed" : ""}>
							<div className="view">
								<input
									className="toggle"
									type="checkbox"
									onClick={() => handleToggle(item.id)}
								/>
								<label>{item.title}</label>
								<button className="destroy" onClick={() => handleDestroy(item.id)}></button>
							</div>
						</li>
					)}
			</ul>
		</section>
	)
}

export default TodosList