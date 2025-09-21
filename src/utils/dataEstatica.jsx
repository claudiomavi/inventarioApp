import { v as _v } from '../autoBarrell'
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai'

export const DesplegableUser = [
	// {
	// 	text: 'Mi perfil',
	// 	icono: <v.iconoUser />,
	// 	tipo: 'miperfil',
	// },
	// {
	// 	text: 'Configuracion',
	// 	icono: <v.iconoSettings />,
	// 	tipo: 'configuracion',
	// },
	{
		text: 'Cerrar sesión',
		icono: <_v.iconoCerrarSesion />,
		tipo: 'cerrarsesion',
	},
]

//data SIDEBAR
export const LinksArray = [
	{
		label: 'Home',
		icon: <AiOutlineHome />,
		to: '/',
	},
	{
		label: 'Kardex',
		icon: <_v.iconocategorias />,
		to: '/kardex',
	},
	{
		label: 'Reportes',
		icon: <_v.iconoreportes />,
		to: '/reportes',
	},
]
export const SecondarylinksArray = [
	{
		label: 'Configuración',
		icon: <AiOutlineSetting />,
		to: '/configurar',
	},
]
//temas
export const TemasData = [
	{
		icono: '🌞',
		descripcion: 'light',
	},
	{
		icono: '🌚',
		descripcion: 'dark',
	},
]

//data configuracion
export const DataModulosConfiguracion = [
	{
		title: 'Productos',
		subtitle: 'registra tus productos',
		icono: 'https://i.ibb.co/85zJ6yG/caja-del-paquete.png',
		link: '/configurar/productos',
	},
	{
		title: 'Personal',
		subtitle: 'ten el control de tu personal',
		icono: 'https://i.ibb.co/5vgZ0fX/hombre.png',
		link: '/configurar/personal',
	},
	{
		title: 'Categoria de productos',
		subtitle: 'asigna categorias a tus productos',
		icono: 'https://i.ibb.co/VYbMRLZ/categoria.png',
		link: '/configurar/categorias',
	},
	{
		title: 'Marca de productos',
		subtitle: 'gestiona tus marcas',
		icono: 'https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png',
		link: '/configurar/marca',
	},
	{
		title: 'Colores',
		subtitle: 'gestiona los colores',
		icono: 'https://i.ibb.co/jjNp9qZ/circulo-de-color.png',
		link: '/configurar/colores',
	},
	{
		title: 'Fechas inventarios',
		subtitle: 'gestiona fechas de inventarios',
		icono: 'https://i.ibb.co/C5ggmwG1/fechas-inventarios.png',
		link: '/configurar/fechas-inventarios',
	},
	{
		title: 'Categorias Merceologicas',
		subtitle: 'gestiona tus categorías contables',
		icono: 'https://i.ibb.co/m5qGC0VW/merceologica.png',
		link: '/configurar/categorias-merceologicas',
	},
]
//tipo usuario
export const TipouserData = [
	{
		descripcion: 'empleado',
		icono: '🪖',
	},
	{
		descripcion: 'admin',
		icono: '👑',
	},
]
//tipodoc
export const TipoDocData = [
	{
		descripcion: 'dni',
		icono: '🪖',
	},
	{
		descripcion: 'nie',
		icono: '👑',
	},
	{
		descripcion: 'cif',
		icono: '👑',
	},
	{
		descripcion: 'otros',
		icono: '👑',
	},
]
