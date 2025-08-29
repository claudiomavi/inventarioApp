import styled from 'styled-components'
import { AccionTabla } from '../../autoBarrell'
import { v } from '../../styles/variables'

export function ContentAccionesTabla({ funcionEditar, funcionEliminar }) {
	return (
		<Container>
			<AccionTabla
				funcion={funcionEditar}
				fontSize="18px"
				color="#d7d7d7"
				icono={<v.iconeditarTabla />}
			/>
			<AccionTabla
				funcion={funcionEliminar}
				fontSize="18px"
				color="#f76e8e"
				icono={<v.iconeliminarTabla />}
			/>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	justify-content: center;
	@media (max-width: 48em) {
		justify-content: end;
	}
`
