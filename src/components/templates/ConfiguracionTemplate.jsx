import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { DataModulosConfiguracion, MensajeNoPermiso } from '../../autoBarrell'

export function ConfiguracionTemplate() {
	return (
		<Container>
			<div className="svg-container">
				<svg
					className="h-full w-full transform-gpu transition-all ease-in-out scale-135 duration-800 will-cahnge-auto md:scale-100 lg:scale-80 group-hover:rotate-45 lg:group-hover:scale-100"
					viewBox="0 0 492 317"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						opacity="0.40"
						d="M526 1L-34 1.00005M526 27.25L-34 27.2501M526 53.5L-34 53.5001M526 79.75L-34 79.7501M526 106L-34 106M526 132.25L-34 132.25M526 158.5L-34 158.5M526 184.75L-34 184.75M526 211L-34 211M526 237.25L-34 237.25M526 263.5L-34 263.5M526 289.75L-34 289.75M526 316L-34 316M-29.625 1V316M-3.375 1V316M22.875 1V316M49.125 1V316M75.375 1V316M101.625 1V316M127.875 1V316M154.125 1V316M180.375 1V316M206.625 1V316M232.875 1V316M259.125 1V316M285.375 1V316M311.625 1V316M337.875 1V316M364.125 1V316M390.375 1V316M416.625 1V316M442.875 1V316M469.125 1V316M495.375 1V316M521.625 1V316"
						stroke="url(#paint0_radial_932_3040)"
						strokeWidth="0.5"
					/>
					<defs>
						<radialGradient
							id="paint0_radial_932_3040"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(246 158.5) rotate(90) scale(212.625 212.625)"
						>
							<stop
								offset="0.343728"
								stopColor="white"
							/>
							<stop
								offset="1"
								stopOpacity="0"
							/>
						</radialGradient>
					</defs>
				</svg>
			</div>
			<div className="cards">
				{DataModulosConfiguracion.map((item, index) => {
					return (
						<Link
							to={item.state ? item.link : ''}
							className={item.state ? 'card' : 'card false'}
							key={index}
						>
							<MensajeNoPermiso state={item.state} />
							<div className="card-content">
								<div className="card-image">
									<img src={item.icono} />
								</div>

								<div className="card-info-wrapper">
									<div className="card-info">
										<i className="fa-duotone fa-unicorn"></i>
										<div className="card-info-title">
											<h3>{item.title}</h3>
											<h4>{item.subtitle}</h4>
										</div>
									</div>
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</Container>
	)
}
const Container = styled.div`
	--bg-color: rgb(20, 20, 20);
	--card-color: rgb(23, 23, 23);
	align-items: center;
	background-color: ${({ theme }) => theme.bgtotal};
	display: flex;
	height: 100vh;
	justify-content: center;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
	.svg-container {
		position: absolute;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&::-webkit-scrollbar {
		width: 6px;
		border-radius: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #484848;
		border-radius: 10px;
	}
	.cards {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		max-width: 916px;
		width: calc(100% - 20px);
	}

	.cards:hover > .card::after {
		opacity: 1;
	}

	.card {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		cursor: pointer;
		display: flex;
		height: 260px;
		flex-direction: column;
		position: relative;
		width: 300px;
		transition: 0.3s;
		border: 0.5px solid transparent;
		&:hover {
			border: 1px solid ${(props) => props.theme.bg5};
			.card-image {
				img {
					filter: grayscale(0);
				}
			}
		}
		&.false {
			&:hover {
				border: 1px solid red;
				.card-image {
					img {
						filter: grayscale(0);
					}
				}
			}
		}
	}

	.card:hover::before {
		opacity: 1;
	}

	.card::before,
	.card::after {
		border-radius: inherit;
		content: '';
		height: 100%;
		left: 0px;
		opacity: 0;
		position: absolute;
		top: 0px;
		transition: opacity 500ms;
		width: 100%;
	}

	.card::before {
		z-index: 3;
	}

	.card::after {
		background: radial-gradient(
			600px circle at var(--mouse-x) var(--mouse-y),
			rgba(255, 255, 255, 0.4),
			transparent 40%
		);
		z-index: 1;
	}

	.card > .card-content {
		background-color: ${({ theme }) => theme.bgcards};
		border-radius: inherit;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		inset: 1px;
		padding: 10px;
		position: absolute;
		z-index: 2;
	}

	h1,
	h2,
	h3,
	h4,
	span {
		color: ${({ theme }) => theme.colorsubtitlecard};
		font-family: 'Rubik', sans-serif;
		font-weight: 600;
		margin: 0px;
	}

	i {
		color: ${({ theme }) => theme.colorsubtitlecard};
	}

	.card-image {
		align-items: center;
		display: flex;
		height: 140px;
		justify-content: center;

		img {
			transition: 0.3s;
			height: 70%;
			filter: grayscale(100%);
		}
	}

	.card-info-wrapper {
		align-items: center;
		display: flex;
		flex-grow: 1;
		justify-content: flex-start;
		padding: 0px 20px;
	}

	.card-info {
		align-items: flex-start;
		display: flex;
		gap: 10px;
	}

	.card-info > i {
		font-size: 1em;
		height: 20px;
		line-height: 20px;
	}

	.card-info-title > h3 {
		font-size: 1.1em;
		line-height: 20px;
	}

	.card-info-title > h4 {
		color: ${({ theme }) => theme.colortitlecard};
		font-size: 0.85em;
		margin-top: 8px;
		font-weight: 500;
	}

	@media (max-width: 1000px) {
		body {
			align-items: flex-start;
			overflow: auto;
		}

		.cards {
			max-width: 1000px;
			padding: 10px 0px;
		}

		.card {
			flex-shrink: 1;
			width: calc(50% - 4px);
		}
	}

	@media (max-width: 500px) {
		.card {
			height: 180px;
		}

		.card-image {
			height: 80px;
		}

		.card-info-wrapper {
			padding: 0px 10px;
		}

		.card-info > i {
			font-size: 0.8em;
		}

		.card-info-title > h3 {
			font-size: 0.9em;
		}

		.card-info-title > h4 {
			font-size: 0.8em;
			margin-top: 4px;
		}
	}

	@media (max-width: 320px) {
		.card {
			width: 100%;
		}
	}

	.youtube-link {
		bottom: 10px;
	}
`
