import { useQuery } from '@tanstack/react-query'
import {
	ProductosTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useMarcaStore,
	useProductosStore,
} from '../autoBarrell'

export function Productos() {
	const { mostrarProductos, dataproductos, buscarProductos, buscador } =
		useProductosStore()
	const { mostrarMarca } = useMarcaStore()
	const { dataempresa } = useEmpresaStore()

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar productos', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarProductos({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: datamarcas } = useQuery({
		queryKey: ['mostrar marca', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarMarca({ id_empresa: dataempresa?.id }),
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
