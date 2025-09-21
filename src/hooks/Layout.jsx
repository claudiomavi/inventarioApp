import styled from 'styled-components'
import {
	Device,
	MenuHambur,
	Sidebar,
	SpinnerLoader,
	useEmpresaStore,
	useUsuariosStore,
} from '../autoBarrell'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function Layout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const { mostrarUsuarios, idusuario, mostrarPermisos } = useUsuariosStore()
	const { mostrarEmpresa } = useEmpresaStore()

	const {
		data: datausuarios,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['mostrar usuarios'],
		queryFn: mostrarUsuarios,
	})

	const { data: _dataempresa } = useQuery({
		queryKey: ['mostrar empresa'],
		queryFn: () => mostrarEmpresa({ idusuario }),
		enabled: !!datausuarios,
	})

	const { data: _datapermisos } = useQuery({
		queryKey: ['mostrar permisos', { id_usuario: idusuario }],
		queryFn: () => mostrarPermisos({ id_usuario: idusuario }),
		enabled: !!datausuarios,
	})

	if (isLoading) return <SpinnerLoader />

	if (error)
		return (
			<Navigate
				replace
				to="/login"
			/>
		)

	return (
		<Container className={sidebarOpen ? 'active' : ''}>
			<section className="ContentSidebar">
				<Sidebar
					state={sidebarOpen}
					setState={() => setSidebarOpen(!sidebarOpen)}
				/>
			</section>
			<section className="ContentMenuambur">
				<MenuHambur />
			</section>
			<section className="ContentRoutes">{children}</section>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	background-color: ${({ theme }) => theme.bgtotal};
	.ContentSidebar {
		display: none;
	}
	.ContentMenuambur {
		display: block;
		position: absolute;
		left: 20px;
	}
	@media ${Device.tablet} {
		grid-template-columns: 65px 1fr;
		&.active {
			grid-template-columns: 220px 1fr;
		}
		.ContentSidebar {
			display: initial;
		}
		.ContentMenuambur {
			display: none;
		}
	}
	.ContentRoutes {
		grid-column: 1;
		width: 100%;
		@media ${Device.tablet} {
			grid-column: 2;
		}
	}
`
