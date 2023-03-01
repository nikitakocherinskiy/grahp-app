import React from 'react'
import Graph from './components/Graph'
import GraphForm from './components/GraphForm'

function App() {
	return (
		<div className='flex justify-around bg-indigo-400 h-screen items-center'>
			<GraphForm />
			<Graph />
		</div>
	)
}

export default App
