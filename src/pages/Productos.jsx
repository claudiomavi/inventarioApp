import { useQuery } from '@tanstack/react-query'
import {
	ProductosTemplate,
	SpinnerLoader,
	useCategoriasStore,
	useEmpresaStore,
	useMarcaStore,
	useProductosStore,
} from '../autoBarrell'

export function Productos() {
	const { mostrarProductos, dataproductos, buscarProductos, buscador } =
		useProductosStore()
	const { mostrarMarca } = useMarcaStore()
	const { mostrarCategorias } = useCategoriasStore()
	const { dataempresa } = useEmpresaStore()

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar productos', { _id_empresa: dataempresa?.id }],
		queryFn: () => mostrarProductos({ _id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: datamarcas } = useQuery({
		queryKey: ['mostrar marca', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarMarca({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: datacategorias } = useQuery({
		queryKey: ['mostrar categorias', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarCategorias({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: buscardata } = useQuery({
		queryKey: [
			'buscar productos',
			{ id_empresa: dataempresa.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarProductos({ id_empresa: dataempresa.id, descripcion: buscador }),
		enabled: dataempresa.id != null,
	})

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <ProductosTemplate data={dataproductos} />
}
