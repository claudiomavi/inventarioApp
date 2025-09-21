import styled from 'styled-components'
import {
	ContentFiltro,
	Header,
	Title,
	v as _v,
	Device,
} from '../../autoBarrell'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export function ReportesTemplate() {
	const [state, setState] = useState(false)

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
				<PageContainer>
					<Sidebar>
						<SidebarSection>
							<SidebarTitle>Stock Actual</SidebarTitle>
							<SidebarItem to="stock-actual-por-producto">
								Por producto
							</SidebarItem>
							<SidebarItem to="stock-actual-todos">Todos</SidebarItem>
							<SidebarItem to="stock-actual-bajo-minimo">
								Bajo mínimo
							</SidebarItem>
						</SidebarSection>
						<SidebarSection>
							<SidebarTitle>Entradas y salidas</SidebarTitle>
							<SidebarItem to="entradas-salidas-por-producto">
								Por producto
							</SidebarItem>
						</SidebarSection>
						<SidebarSection>
							<SidebarTitle>Valorado</SidebarTitle>
							<SidebarItem to="inventario-valorado">Inventario</SidebarItem>
						</SidebarSection>
					</Sidebar>
					<Content>
						<Outlet />
					</Content>
				</PageContainer>
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
		grid-area: main;
		/* background-color: purple; */
	}
`

const PageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	max-width: 1200px;
	justify-content: center;
	width: 100%;
	@media ${Device.tablet} {
		flex-direction: row;
	}
`

const Content = styled.div`
	padding: 20px;
	border-radius: 8px;
	margin: 20px;
	flex: 1;
`

const Sidebar = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	@media ${Device.tablet} {
		width: 250px;
		order: 2;
	}
`

const SidebarSection = styled.div`
	margin-bottom: 20px;
	border-radius: 10px;
	border: 2px solid ${({ theme }) => theme.color2};
	padding: 12px;
`

const SidebarTitle = styled.h3`
	margin-bottom: 20px;
	font-size: 1.2em;
`

const SidebarItem = styled(NavLink)`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px;
	border-radius: 12px;
	cursor: pointer;
	margin: 5px 0;
	padding: 0 5%;
	text-decoration: none;
	color: ${({ theme }) => theme.text};
	height: 60px;
	&:hover {
		color: ${({ theme }) => theme.colorSubtitle};
	}
	&.active {
		background: ${({ theme }) => theme.bg6};
		border: 2px solid ${({ theme }) => theme.bg5};
		color: ${({ theme }) => theme.color1};
		font-weight: 600;
	}
`
