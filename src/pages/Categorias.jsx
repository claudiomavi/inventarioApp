import { useQuery } from '@tanstack/react-query'
import {
	CategoriasTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useCategoriasStore,
} from '../autoBarrell'

export function Categorias() {
	const { mostrarCategorias, datacategorias, buscarCategorias, buscador } =
		useCategoriasStore()
	const { dataempresa } = useEmpresaStore()

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar categorias', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarCategorias({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: buscardata } = useQuery({
		queryKey: [
			'buscar categorias',
			{ id_empresa: dataempresa.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarCategorias({ id_empresa: dataempresa.id, descripcion: buscador }),
		enabled: dataempresa.id != null,
	})

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <CategoriasTemplate data={datacategorias} />
}
