import React from 'react'

export default function MyButton({ children, ...props }) {
	return (
		<button className='mt-5 0 rounded bg-white text-indigo-400 p-1' {...props}>
			{children}
		</button>
	)
}
