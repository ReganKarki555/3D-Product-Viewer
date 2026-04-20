import React from 'react';

const ProductCard = ({ product, onProductClick }) => {
	return (
		<div
			className="group cursor-pointer rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
			onClick={() => onProductClick(product.id)}
		>
			{/* Image Container */}
			<div className="relative bg-slate-100 w-full aspect-video overflow-hidden">
				<img
					src={product.imageUrl || 'https://via.placeholder.com/320x180?text=3D+Product'}
					alt={product.name}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
					<span className="text-slate-900 text-sm font-medium">View 3D</span>
				</div>
				{product.category && (
					<div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
						{product.category}
					</div>
				)}
			</div>

			{/* Content Container */}
			<div className="p-3 bg-white">
				<h3 className="text-slate-900 font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
					{product.name}
				</h3>
				<p className="text-slate-600 text-xs line-clamp-2 mt-1">{product.description}</p>

				{/* Stats Footer */}
				<div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200">
					<div className="flex gap-3 text-xs text-slate-500">
						<span className="flex items-center gap-1">
							<span className="text-blue-600">👁</span>
							{product.views || 0} views
						</span>
						{product.price && (
							<span className="text-emerald-600 font-semibold">${product.price}</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
