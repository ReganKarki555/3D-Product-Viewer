import React from 'react';

const ProductCard = ({ product, onProductClick }) => {
	return (
		<div
			className="product-tile product-card-3d group cursor-pointer"
			onClick={() => onProductClick(product.id)}
		>
			<div className="product-tile-media product-tile-media--image">
				<img
					src={product.imageUrl || 'https://via.placeholder.com/320x180?text=3D+Product'}
					alt={product.name}
					className="product-tile-image"
				/>
				<div className="product-tile-media-overlay">
					<span>View 3D</span>
					<span>Rotate / Inspect</span>
				</div>
				{product.category && (
					<div className="product-tile-badge">
						{product.category}
					</div>
				)}
			</div>

			<div className="product-tile-copy">
				<h3>
					{product.name}
				</h3>
				<p>{product.description}</p>

				<div className="product-tile-meta">
					<span>👁 {product.views || 0} views</span>
					{product.price && <span>${product.price}</span>}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
