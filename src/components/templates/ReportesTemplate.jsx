import styled from 'styled-components'
import {
	ContentFiltro,
	Header,
	Title,
	v as _v,
	useFechasInventariosStore,
	ContainerSelector,
	Selector,
	ListaGenerica,
	Btnsave,
	ExportarInventarios,
	Device,
} from '../../autoBarrell'
import { useState } from 'react'

export function ReportesTemplate({ data, dataempresa }) {
	const [state, setState] = useState(false)
	const [stateFecha, setStateFecha] = useState(false)
	const { selectFechasInventarios, fechasinventariosItemSelect } =
		useFechasInventariosStore()

	return (
		<Container>
			<header className="header">
				<Header
					stateConfig={{ state: state, setState: () => setState(!state) }}
				/>
			</header>
			<section className="area1">
				<ContentFiltro>
					<Title>Reportes</Title>
				</ContentFiltro>
			</section>
			{/* <section className="area2">
				<h1>Area 2</h1>
			</section> */}
			<section className="main">
				<ContainerSelector>
					<div className="desplegableInventario">
						<label>Fecha inventario: </label>
						<Selector
							color="#fc6027"
							// texto1="🍿"
							texto2={fechasinventariosItemSelect?.fecha}
							state={stateFecha}
							funcion={() => setStateFecha(!stateFecha)}
						/>
					</div>
					{stateFecha && (
						<ListaGenerica
							bottom="-260px"
							data={data}
							scroll="scroll"
							setState={() => setStateFecha(!stateFecha)}
							funcion={selectFechasInventarios}
							fechaType
						/>
					)}
					<Btnsave
						titulo="Descargar"
						bgcolor="#ef552b"
						funcion={() => {
							if (fechasinventariosItemSelect) {
								ExportarInventarios({
									_id_empresa: dataempresa.id,
									id_fecha_inventario: fechasinventariosItemSelect.id,
									fecha_inventario: fechasinventariosItemSelect.fecha,
								})
							}
						}}
					/>
				</ContainerSelector>
			</section>
		</Container>
	)
}
const Container = styled.div`
	min-height: 100vh;
	width: 100%;
	background-color: ${({ theme }) => theme.bgtotal};
	color: ${({ theme }) => theme.text};
	display: grid;
	padding: 15px;
	grid-template:
		'header' 100px
		'area1' 100px
		/* 'area2' 100px */
		'main' auto;
	.header {
		grid-area: header;
		/* background-color: blue; */
		display: flex;
		align-items: center;
	}
	.area1 {
		grid-area: area1;
		/* background-color: red; */
		display: flex;
		align-items: center;
	}
	/* .area2 {
		grid-area: area2;
		background-color: green;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	} */
	.main {
		width: 100%;
		margin-top: 60px;
		grid-area: main;
		display: flex;
		align-items: start;
		justify-content: center;
		/* background-color: purple; */
		.desplegableInventario {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 30px;
			gap: 10px;
			@media ${Device.tablet} {
				flex-direction: row;
				margin-bottom: 0;
			}
		}
	}
`
