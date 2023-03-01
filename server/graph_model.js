const Pool = require('pg').Pool
const pool = new Pool({
	user: 'nikita',
	host: 'localhost',
	database: 'my_database',
	password: 'nikita1947',
	port: 5432,
})

const getEdges = () => {
	return new Promise(function (resolve, reject) {
		pool.query('SELECT * FROM edges', (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(results.rows)
		})
	})
}
const createEdge = (body) => {
	return new Promise(function (resolve, reject) {
		const { from, to, weight } = body
		pool.query(
			'INSERT INTO edges (from_id, to_id, weight) VALUES ($1, $2, $3) RETURNING *',
			[from, to, weight],
			(error, results) => {
				if (error) {
					reject(error)
				}
				resolve(`${body}`)
			}
		)
	})
}

module.exports = {
	getEdges,
	createEdge,
}
