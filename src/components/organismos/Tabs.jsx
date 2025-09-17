import { useState } from 'react'
import styled from 'styled-components'
import { v as _v, Device, TablaKardex } from '../../autoBarrell'

export function Tabs({ data }) {
	const [activeTab, setActiveTab] = useState(0)

	const handleClick = (index) => {
		setActiveTab(index)
	}

	return (
		<Container
			className="container"
			activeTab={`${activeTab}00%`}
		>
			<ul className="tabs">
				<li
					className={activeTab === 0 && 'active'}
					onClick={() => handleClick(0)}
				>
					{<_v.iconopie />}Kardex
				</li>
				{/* <li
					className={activeTab === 1 && 'active'}
					onClick={() => handleClick(1)}
				>
					{<_v.iconopie />}Titulo 2
				</li> */}
				<span className="glider"></span>
			</ul>
			<div className="tab-content">
				{activeTab === 0 && (
					<span>
						<TablaKardex data={data} />
					</span>
				)}
				{activeTab === 1 && <span>tab{activeTab + 1}</span>}
			</div>
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	border: 1px solid #6a6b6c;
	border-radius: 15px;
	.tabs {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		list-style: none;
		top: 0;
		left: 0;
		border-radius: 100px;
		@media ${Device.tablet} {
			flex-direction: row;
		}
		li {
			font-size: 1.25rem;
			font-weight: 500;
			border-radius: 99px;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			width: 180px;
			height: 54px;
			cursor: pointer;
			transition: color 0.15s ease-in;
		}
		.glider {
			position: absolute;
			color: '#fff';
			display: flex;
			height: 54px;
			width: 4px;
			background-color: #e05024;
			z-index: 1;
			border-radius: 15px;
			transition: 0.25s ease-out;
			transform: translateY(${(props) => props.activeTab});
			box-shadow: Opx 10px 20px -3px #ff5722;
			top: 0;
			@media ${Device.tablet} {
				height: 4px;
				width: 180px;
				transform: translateX(${(props) => props.activeTab});
				top: 100%;
			}
		}
	}
	.tab-content {
		margin-top: 20px;
		height: 100%;
		width: 100%;
	}
`
