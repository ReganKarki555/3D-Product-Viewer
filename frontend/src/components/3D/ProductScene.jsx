	import React, { useState } from 'react';

	function ProductScene({ src, alt, title, subtitle, badge }) {
		const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
		const [hovered, setHovered] = useState(false);

		const handleMouseMove = (event) => {
			const bounds = event.currentTarget.getBoundingClientRect();
			const pointerX = (event.clientX - bounds.left) / bounds.width;
			const pointerY = (event.clientY - bounds.top) / bounds.height;
			const rotateY = (pointerX - 0.5) * 28;
			const rotateX = (0.5 - pointerY) * 22;

			setTilt({
				rotateX,
				rotateY,
				glowX: pointerX * 100,
				glowY: pointerY * 100,
			});
		};

		const handleMouseLeave = () => {
			setHovered(false);
			setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
		};

		return (
			<div
				className={`product-scene ${hovered ? 'is-hovered' : ''}`}
				onMouseEnter={() => setHovered(true)}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					'--scene-rotate-x': `${tilt.rotateX}deg`,
					'--scene-rotate-y': `${tilt.rotateY}deg`,
					'--scene-glow-x': `${tilt.glowX}%`,
					'--scene-glow-y': `${tilt.glowY}%`,
				}}
			>
				<div className="product-scene-stage">
					<div className="product-scene-shadow" aria-hidden="true" />
					<div className="product-scene-plate">
						<div className="product-scene-backdrop" aria-hidden="true" />
						<img className="product-scene-image product-scene-image--back" src={src} alt="" aria-hidden="true" />
						<img className="product-scene-image product-scene-image--front" src={src} alt={alt} />
						<div className="product-scene-edge product-scene-edge--left" aria-hidden="true" />
						<div className="product-scene-edge product-scene-edge--bottom" aria-hidden="true" />
						<div className="product-scene-glare" aria-hidden="true" />
						<div className="product-scene-overlay">
							{badge && <span className="product-scene-badge">{badge}</span>}
							<div>
								<h3>{title}</h3>
								<p>{subtitle}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	export default ProductScene;
    