import styled from 'styled-components'

export function MensajeNoPermiso({ state }) {
	return (
		<Container className={state ? '' : 'visible'}>
			<span className="icono">💀</span>
			<span className="texto">No tienes permisos para este módulo</span>
		</Container>
	)
}

const Container = styled.div`
	position: absolute;
	z-index: 10;
	background: rgba(26, 9, 9, 0.9);
	border: 1px solid rgba(248, 42, 45, 0.5);
	border-radius: 10px;
	padding: 15px;
	display: flex;
	gap: 15px;
	width: 100%;
	height: 100%;
	opacity: 0;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	transition: 0.3s;
	color: #fff;
	&:hover {
		&.visible {
			opacity: 1;
		}
	}
	.icono {
		font-size: 30px;
	}
`
