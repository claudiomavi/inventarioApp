import styled from 'styled-components'
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Font,
	PDFViewer,
} from '@react-pdf/renderer'
import {
	Buscador,
	ListaGenerica,
	useEmpresaStore,
	useProductosStore,
} from '../../../autoBarrell'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function StockActualPorProducto() {
	const [stateListaProductos, setStateListaProductos] = useState(false)

	const { dataempresa } = useEmpresaStore()
	const {
		reportStockPorProducto,
		buscarProductos,
		buscador,
		setBuscador,
		selectProductos,
		productosItemSelect,
	} = useProductosStore()

	const { data } = useQuery({
		queryKey: [
			'reporte stock por productos',
			{ id_empresa: dataempresa?.id, id: productosItemSelect?.id },
		],
		queryFn: () =>
			reportStockPorProducto({
				id_empresa: dataempresa?.id,
				id: productosItemSelect?.id,
			}),
		enabled: !!dataempresa,
	})

	const { data: dataproductosbuscador } = useQuery({
		queryKey: [
			'buscar productos',
			{ id_empresa: dataempresa?.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarProductos({
				id_empresa: dataempresa?.id,
				descripcion: buscador,
			}),
		enabled: !!dataempresa,
	})

	const styles = StyleSheet.create({
		page: {
			flexDirection: 'row',
			position: 'relative',
		},
		section: {
			margin: 10,
			padding: 10,
			flexGrow: 1,
		},
		table: {
			width: '100%',
			margin: 'auto',
			marginTop: 10,
		},
		row: {
			flexDirection: 'row',
			borderBottom: 1,
			borderBottomcolor: '#121212',
			alignItems: 'stretch',
			height: 24,
			borderLeftColor: '#000',
			borderLeft: 1,
			textAlign: 'left',
			justifyContent: 'flex-start',
		},
		cell: {
			flex: 1,
			textAlign: 'center',
			borderLeftColor: '#000',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
		headercell: {
			flex: 1,
			backgroundColor: '#dcdcdc',
			fontweight: 'bold',
			textAlign: 'center',
			justifycontent: 'flex-start',
			alignItems: 'center',
		},
	})

	const currentDate = new Date()
	const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`

	const renderTableRow = (rowData, isHeader = false) => {
		return (
			<View
				style={styles.row}
				key={rowData.id}
			>
				<Text style={[styles.cell, isHeader && styles.headercell]}>
					{rowData.descripcion}
				</Text>
				<Text style={[styles.cell, isHeader && styles.headercell]}>
					{rowData.stock}
				</Text>
			</View>
		)
	}

	return (
		<Container>
			<Buscador
				setBuscador={setBuscador}
				funcion={() => setStateListaProductos(!stateListaProductos)}
			/>
			{stateListaProductos && (
				<ListaGenerica
					funcion={(p) => {
						selectProductos(p)
						setBuscador('')
					}}
					setState={() => setStateListaProductos(!stateListaProductos)}
					data={dataproductosbuscador}
				/>
			)}

			<PDFViewer className="pdfviewer">
				<Document title="Reporte de stock todos">
					<Page
						size="a4"
						orientation="landscape"
					>
						<View style={styles.page}>
							<View style={styles.section}>
								<Text
									style={{
										fontSize: 18,
										fontWeight: 'ultrabold',
										marginBottom: 10,
									}}
								>
									Stock actual por producto
								</Text>
								<Text>Fecha y hora del reporte: {formattedDate}</Text>
								<View style={styles.table}>
									{renderTableRow(
										{ descripcion: 'Producto', stock: 'Stock' },
										true
									)}
									{data?.map((item) => renderTableRow(item))}
								</View>
							</View>
						</View>
					</Page>
				</Document>
			</PDFViewer>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 80vh;
	display: flex;
	flex-direction: column;
	gap: 15px;
	.pdfviewer {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		border: none;
	}
`
