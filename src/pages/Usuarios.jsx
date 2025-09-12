import { useQuery } from '@tanstack/react-query'
import {
	UsuariosTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useUsuariosStore,
	useMarcaStore,
} from '../autoBarrell'

export function Usuarios() {
	const { mostrarUsuarios, datausuarios, buscador, mostrarModulos } =
		useUsuariosStore()
	const { buscarMarca } = useMarcaStore()
	const { dataempresa } = useEmpresaStore()

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar usuarios', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarUsuarios({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: buscardata } = useQuery({
		queryKey: [
			'buscar Marca',
			{ id_empresa: dataempresa.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarMarca({ id_empresa: dataempresa.id, descripcion: buscador }),
		enabled: dataempresa.id != null,
	})

	const { data: datamodulos } = useQuery({
		queryKey: ['mostrar modulos'],
		queryFn: mostrarModulos,
	})

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <UsuariosTemplate data={datausuarios} />
}
