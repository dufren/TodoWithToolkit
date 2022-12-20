import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoAsync } from '../redux/todos/todosSlice'


const Header = () => {

	const dispatch = useDispatch()

	const [title, setTitle] = useState("")

	const handleInput = (e) => setTitle(e.target.value)

	const handleSubmit = async (e) => {
		if (!title) return;
		e.preventDefault();
		await dispatch(addTodoAsync({ title }))
		setTitle("")
	}
	return (
		<header className="header">
			<h1>todos</h1>
			<form onSubmit={handleSubmit}>
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					value={title}
					onChange={handleInput} />
			</form>
		</header>
	)
}

export default Header