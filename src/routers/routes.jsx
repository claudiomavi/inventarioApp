import { Routes, Route, Navigate } from 'react-router-dom'
import {
	Categorias,
	Configuracion,
	ErrorMolecula,
	Home,
	Login,
	Marca,
	Usuarios,
	Productos,
	ProtectedRoute,
	SpinnerLoader,
	useEmpresaStore,
	UserAuth,
	useUsuariosStore,
} from '../autoBarrell'
import { useQuery } from '@tanstack/react-query'

export function MyRoutes() {
	const { user } = UserAuth()
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
		<Routes>
			<Route
				path="/login"
				element={<Login />}
			/>

			<Route
				element={
					<ProtectedRoute
						user={user}
						redirectTo="/login"
					/>
				}
			>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/configurar"
					element={<Configuracion />}
				/>
				<Route
					path="/configurar/marca"
					element={<Marca />}
				/>
				<Route
					path="/configurar/categorias"
					element={<Categorias />}
				/>
				<Route
					path="/configurar/productos"
					element={<Productos />}
				/>
				<Route
					path="/configurar/personal"
					element={<Usuarios />}
				/>
			</Route>
		</Routes>
	)
}
