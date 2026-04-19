import React from 'react';

const ProductCard = ({ product, onProductClick }) => {
	return (
		<div
			className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gray-900"
			onClick={() => onProductClick(product.id)}
		>
			{/* Image Container */}
			<div className="relative bg-gray-800 w-full aspect-video overflow-hidden">
				<img
					src={product.imageUrl || 'https://via.placeholder.com/320x180?text=3D+Product'}
					alt={product.name}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
					<span className="text-white text-sm font-medium">View 3D</span>
				</div>
				{product.category && (
					<div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
						{product.category}
					</div>
				)}
			</div>

			{/* Content Container */}
			<div className="p-3 bg-gray-900">
				<h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
					{product.name}
				</h3>
				<p className="text-gray-400 text-xs line-clamp-2 mt-1">{product.description}</p>

				{/* Stats Footer */}
				<div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-700">
					<div className="flex gap-3 text-xs text-gray-400">
						<span className="flex items-center gap-1">
							<span className="text-blue-400">👁</span>
							{product.views || 0} views
						</span>
						{product.price && (
							<span className="text-green-400 font-semibold">${product.price}</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
