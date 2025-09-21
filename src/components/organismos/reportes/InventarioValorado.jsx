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
import { useEmpresaStore, useProductosStore } from '../../../autoBarrell'
import { useQuery } from '@tanstack/react-query'

export default function InventarioValorado() {
	const { reportInventarioValorado } = useProductosStore()
	const { dataempresa } = useEmpresaStore()

	const { data } = useQuery({
		queryKey: ['reporte inventario valorado', { _id_empresa: dataempresa?.id }],
		queryFn: () => reportInventarioValorado({ _id_empresa: dataempresa?.id }),
		enabled: !!dataempresa.id,
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

	const totalGeneral = data?.reduce((acc, item) => acc + item.total, 0) || 0

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
				<Text style={[styles.cell, isHeader && styles.headercell]}>
					{rowData.preciocompra}
				</Text>
				<Text style={[styles.cell, isHeader && styles.headercell]}>
					{rowData.total} {dataempresa?.simbolomoneda}
				</Text>
			</View>
		)
	}

	return (
		<Container>
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
									Inventario Valorado
								</Text>
								<Text>
									Total: {totalGeneral} {dataempresa.simbolomoneda}
								</Text>
								<Text>Fecha y hora del reporte: {formattedDate}</Text>
								<View style={styles.table}>
									{renderTableRow(
										{
											descripcion: 'Producto',
											stock: 'Stock',
											preciocompra: 'Precio compra',
											total: 'Total',
										},
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
	.pdfviewer {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		border: none;
	}
`
