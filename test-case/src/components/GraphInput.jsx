import React from 'react'

function GraphInput({ header, ...props }) {
	return (
		<div className='flex justify-between'>
			<label className='mr-5 text-white'>{header}</label>
			<input {...props} className='rounded-md outline-0 px-2 py-1' />
		</div>
	)
}

export default GraphInput
