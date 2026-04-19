import React, { useState } from 'react';

const SearchBar = ({ onSearch, onCategoryFilter }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	const categories = ['Electronics', 'Furniture', 'Vehicles', 'Art', 'Jewelry', 'Fashion'];

	const handleSearch = () => {
		onSearch(searchQuery);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category === selectedCategory ? '' : category);
		onCategoryFilter(category === selectedCategory ? '' : category);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className="w-full bg-gray-900 border-b border-gray-700 sticky top-0 z-40">
			{/* Search Bar */}
			<div className="px-6 py-4">
				<div className="flex gap-3 items-center">
					<div className="flex-1 flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700 hover:border-blue-500 transition-colors">
						<span className="text-gray-400">🔍</span>
						<input
							type="text"
							placeholder="Search 3D products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyPress={handleKeyPress}
							className="w-full bg-transparent text-white placeholder-gray-500 outline-none ml-2"
						/>
					</div>
					<button
						onClick={handleSearch}
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200"
					>
						Search
					</button>
				</div>
			</div>

			{/* Category Filter */}
			<div className="px-6 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
				<button
					onClick={() => handleCategoryChange('')}
					className={`px-4 py-1 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
						selectedCategory === ''
							? 'bg-blue-600 text-white'
							: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
					}`}
				>
					All
				</button>
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => handleCategoryChange(category)}
						className={`px-4 py-1 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
							selectedCategory === category
								? 'bg-blue-600 text-white'
								: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
						}`}
					>
						{category}
					</button>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
