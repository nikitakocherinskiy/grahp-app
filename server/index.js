const express = require('express')
const app = express()
const port = 3001

const graph_model = require('./graph_model')

app.use(express.json())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Access-Control-Allow-Headers'
	)
	next()
})

app.get('/', (req, res) => {
	graph_model
		.getEdges()
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.post('/edges', (req, res) => {
	graph_model
		.createEdge(req.body)
		.then(() => {
			console.log(req.body + '1dasda')
		})
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
