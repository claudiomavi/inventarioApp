import styled from 'styled-components'
import { v } from '../../../autoBarrell'

export function Paginacion({ table, irinicio, pagina, maximo }) {
	return (
		<Container>
			<button
				disabled={!table.getCanPreviousPage()}
				onClick={() => irinicio()}
			>
				<span className="iconos">
					<v.iconotodos />
				</span>
			</button>
			<button
				disabled={!table.getCanPreviousPage()}
				onClick={() => table.previousPage()}
			>
				<span className="iconos izquierda">
					<v.iconoflechaderecha />
				</span>
			</button>
			<span>{pagina}</span>
			<p>de {maximo}</p>
			<button
				disabled={!table.getCanNextPage()}
				onClick={() => table.nextPage()}
			>
				<span className="iconos">
					<v.iconoflechaderecha />
				</span>
			</button>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15px;
	button {
		background-color: #ff7800;
		border: none;
		padding-top: 4px;
		border-radius: 3px;
		height: 40px;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		text-align: center;
		transition: 0.3s;
		&:hover {
			box-shadow: 0px 10px 15px -3px #ff7800;
		}
		.iconos {
			color: #fff;
			&.izquierda {
				margin-top: -7px;
				transform: rotate(-180deg);
			}
		}
	}
	button[disabled] {
		background-color: #646464;
		cursor: no-drop;
		box-shadow: none;
	}
`
