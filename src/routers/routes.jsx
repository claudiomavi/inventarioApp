import { Routes, Route } from 'react-router-dom'
import {
	Categorias,
	Configuracion,
	Home,
	Login,
	Marca,
	Usuarios,
	Productos,
	ProtectedRoute,
	Kardex,
	Reportes,
	Layout,
	Colores,
	CategoriasMerceologicas,
	FechasInventarios,
} from '../autoBarrell'
import StockActualTodos from '../components/organismos/reportes/StockActualTodos'
import StockActualPorProducto from '../components/organismos/reportes/StockActualPorProducto'
import StockBajoMinimo from '../components/organismos/reportes/StockBajoMinimo'
import KardexEntradasSalidas from '../components/organismos/reportes/KardexEntradasSalidas'
import InventarioValorado from '../components/organismos/reportes/InventarioValorado'

export function MyRoutes() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<ProtectedRoute accessBy="non-authenticated">
						<Login />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/"
				element={
					<ProtectedRoute
						ProtectedRoute
						accessBy="authenticated"
					>
						<Layout>
							<Home />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Configuracion />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar/marca"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Marca />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar/categorias"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Categorias />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar/productos"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Productos />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar/personal"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Usuarios />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar/colores"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Colores />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar/categorias-merceologicas"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<CategoriasMerceologicas />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/configurar/fechas-inventarios"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<FechasInventarios />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/kardex"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Kardex />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/reportes"
				element={
					<ProtectedRoute accessBy="authenticated">
						<Layout>
							<Reportes />
						</Layout>
					</ProtectedRoute>
				}
			>
				<Route
					path="stock-actual-todos"
					element={<StockActualTodos />}
				/>
				<Route
					path="stock-actual-por-producto"
					element={<StockActualPorProducto />}
				/>
				<Route
					path="stock-actual-bajo-minimo"
					element={<StockBajoMinimo />}
				/>
				<Route
					path="entradas-salidas-por-producto"
					element={<KardexEntradasSalidas />}
				/>
				<Route
					path="inventario-valorado"
					element={<InventarioValorado />}
				/>
			</Route>
		</Routes>
	)
}
