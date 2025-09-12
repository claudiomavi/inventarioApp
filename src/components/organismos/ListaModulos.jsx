import styled from 'styled-components'
import { useUsuariosStore } from '../../autoBarrell'
import { useEffect, useState } from 'react'

export function ListaModulos({ checkbox, setCheckbox, accion }) {
	const [isChecked, setIsChecked] = useState(true)

	const { datamodulos, datapermisos } = useUsuariosStore()

	useEffect(() => {
		if (accion === 'Editar') {
			let allDocs = []

			datamodulos.map((item) => {
				const statePermiso = datapermisos?.some(
					(objeto) => objeto.modulos.nombre
				)

				console.log(statePermiso)

				if (statePermiso) {
					allDocs.push({ ...item, check: true })
				} else {
					allDocs.push({ ...item, check: false })
				}
			})

			setCheckbox(allDocs)
		} else {
			setCheckbox(datamodulos)
		}
	}, [])

	const handleCheckBox = (id) => {
		setCheckbox((prev) => {
			return prev?.map((item) => {
				if (item.id === id) {
					return { ...item, check: !item.checked }
				} else {
					return { ...item }
				}
			})
		})
	}

	const seleccionar = (e) => {
		let check = e.target.checked
		setIsChecked(check)
	}

	return (
		<Container>
			{checkbox?.map((item, index) => {
				return (
					<div
						className="content"
						key={index}
						onClick={() => handleCheckBox(item.id)}
					>
						<input
							checked={item.check}
							type="checkbox"
							className="checkbox"
							onChange={(e) => seleccionar(e)}
						/>
						<span>{item.nombre}</span>
					</div>
				)
			})}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 2px dashed #414244;
	border-radius: 15px;
	padding: 20px;
	gap: 15px;
	.content {
		display: flex;
		gap: 20px;
		align-items: center;
	}
	.checkbox {
		appearance: none;
		overflow: hidden;
		min-width: 30px;
		aspect-ratio: 1/1;
		border-radius: 30% 70% 70% 30%/30% 30% 70% 70%;
		border: 2px solid rgb(255, 102, 0);
		position: relative;
		transition: all 0.2s ease-in-out;
		&::before {
			position: absolute;
			inset: 0;
			content: '';
			font-size: 35px;
			transition: all 0.2s ease-in-out;
		}

		&:checked {
			border: 2px solid rgb(255, 212, 59);
			background: linear-gradient(
				135deg,
				rgb(255, 212, 59) 0%,
				rgb(255, 102, 0) 100%
			);
			box-shadow: -5px -5px 30px rgba(255, 212, 59, 1),
				5px 5px 30px rgba(255, 102, 0, 1);
			&::before {
				background: linear-gradient(
					135deg,
					rgb(255, 212, 59) 0%,
					rgb(255, 102, 0) 100%
				);
			}
		}
	}
`
