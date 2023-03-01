import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'
import MyButton from './MyButton'
import CytoscapeComponent from 'react-cytoscapejs'

export const cy = cytoscape()
cytoscape.use(cola)

function Graph() {
	const [edges, setEdges] = useState([])

	const getEdges = useCallback(async () => {
		const response = await axios.get('http://localhost:3001')
		setEdges(response.data)
	}, [])

	// const handleClick = async () => {
	// 	await getEdges().then((response) => {})
	// 	console.log(edges)
	// }

	// useEffect(() => {
	// 	return () => {
	// 		cy.destroy()
	// 	}
	// }, [])

	useEffect(() => {
		getEdges()
		console.log(edges)
	}, [getEdges])

	const buildGraph = () => {
		const fromNodes = edges.map(({ id, from_id, to_id, weight }) => ({
			data: { id: `${from_id}`, label: `Node ${from_id}` },
			position: {
				x: Math.ceil(Math.random() * 200),
				y: Math.ceil(Math.random() * 200),
			},
		}))
		const targetNodes = edges.map(({ id, from_id, to_id, weight }) => ({
			data: { id: `${to_id}`, label: `Node ${to_id}` },
			position: {
				x: Math.ceil(Math.random() * 200),
				y: Math.ceil(Math.random() * 200),
			},
		}))
		const nodesEdges = edges.map(({ id, from_id, to_id, weight }) => ({
			data: {
				source: `${from_id}`,
				target: `${to_id}`,
				label: `Edge from ${from_id} to ${to_id}`,
				weight: weight,
			},
		}))
		return [...fromNodes, ...targetNodes, ...nodesEdges]
	}
	const elements = buildGraph()
	const layout = { name: 'cola' }

	return (
		<div id='cy' className='bg-rose-300 flex flex-col'>
			{/* <div id='cy'></div> */}
			<CytoscapeComponent
				elements={elements}
				layout={layout}
				style={{ width: '600px', height: '600px' }}
				stylesheet={[
					{
						selector: 'node',
						style: {
							content: 'data(label)',
							'font-family': 'helvetica',
							'font-size': 14,
							'background-color': '#818CF8',
							color: '#334155',
						},
					},
					{
						selector: 'edge',
						style: {
							content: 'data(weight)',
							'font-family': 'helvetica',
							'font-size': 14,
							color: '#334155',
							'line-color': '#fcd34d',
							'text-margin-y': 15,
							'text-rotation': 'autorotate',
							'target-arrow-color': '#fcd34d',
							'target-arrow-shape': 'triangle',
							'curve-style': 'bezier',
						},
					},
				]}
			/>
			<MyButton
				onClick={() => {
					getEdges()
				}}
			>
				Обновить
			</MyButton>
		</div>
	)
}

export default Graph
