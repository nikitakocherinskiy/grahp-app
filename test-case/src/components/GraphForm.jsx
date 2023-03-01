import React, { useState, useEffect } from 'react'
import GraphInput from './GraphInput'
import MyButton from './MyButton'
import axios from 'axios'

function GraphForm() {
	const [fromId, setFromId] = useState('')
	const [toId, setToId] = useState('')
	const [weight, setWeight] = useState('')

	const createEdge = async (e) => {
		e.preventDefault()
		await fetch('http://localhost:3001/edges', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fromId, toId, weight }),
		})
			.then((response) => {
				return response.text()
			})
			.then(() => {
				console.log(fromId, toId)
			})
			.then(() => {
				setFromId('')
				setToId('')
				setWeight('')
			})
	}

	return (
		<div>
			<form className='flex flex-col gap-y-4' onSubmit={createEdge}>
				<GraphInput
					header='Начальная'
					type='text'
					value={fromId}
					onChange={(e) => setFromId(+e.target.value)}
				/>
				<GraphInput
					header='Конечная'
					type='text'
					value={toId}
					onChange={(e) => setToId(+e.target.value)}
				/>
				<GraphInput
					header='Вес'
					type='number'
					value={weight}
					onChange={(e) => setWeight(+e.target.value)}
				/>
				<MyButton type='submit'>Добавить</MyButton>
			</form>
		</div>
	)
}

export default GraphForm
