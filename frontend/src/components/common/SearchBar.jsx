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
		<div style={{ width: '100%', margin: '24px 0' }}>
			{/* Search Bar */}
			<div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
				<div
					style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						background: 'rgba(10, 16, 48, 0.6)',
						borderRadius: '12px',
						padding: '12px 16px',
						border: '1px solid rgba(132, 165, 255, 0.3)',
						backdropFilter: 'blur(10px)',
					}}
				>
					<span style={{ color: '#6a8eff', marginRight: '8px' }}>🔍</span>
					<input
						type="text"
						placeholder="Search 3D products..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyPress={handleKeyPress}
						style={{
							width: '100%',
							background: 'transparent',
							color: '#f4f8ff',
							border: 'none',
							outline: 'none',
							fontSize: '0.95rem',
							fontFamily: 'inherit',
						}}
					/>
				</div>
				<button
					onClick={handleSearch}
					className="button button-primary"
					style={{
						background: 'linear-gradient(120deg, #2ce1ff 0%, #6a8eff 100%)',
						color: '#051124',
						fontWeight: '600',
					}}
				>
					Search
				</button>
			</div>

			{/* Category Filter */}
			<div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
				<button
					onClick={() => handleCategoryChange('')}
					className="workflow-card"
					style={{
						padding: '8px 16px',
						borderRadius: '999px',
						whiteSpace: 'nowrap',
						cursor: 'pointer',
						background:
							selectedCategory === ''
								? 'linear-gradient(120deg, rgba(44, 225, 255, 0.2) 0%, rgba(106, 142, 255, 0.2) 100%)'
								: 'rgba(10, 16, 48, 0.6)',
						border:
							selectedCategory === ''
								? '1px solid rgba(44, 225, 255, 0.6)'
								: '1px solid rgba(132, 165, 255, 0.3)',
						color:
							selectedCategory === ''
								? '#2ce1ff'
								: '#b6c4f5',
						fontWeight: '600',
						transition: 'all 0.2s ease',
					}}
					onMouseEnter={(e) => {
						if (selectedCategory === '') {
							e.target.style.boxShadow = '0 0 16px rgba(44, 225, 255, 0.3)';
						}
					}}
					onMouseLeave={(e) => {
						e.target.style.boxShadow = 'none';
					}}
				>
					All
				</button>
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => handleCategoryChange(category)}
						className="workflow-card"
						style={{
							padding: '8px 16px',
							borderRadius: '999px',
							whiteSpace: 'nowrap',
							cursor: 'pointer',
							background:
								selectedCategory === category
									? 'linear-gradient(120deg, rgba(44, 225, 255, 0.2) 0%, rgba(106, 142, 255, 0.2) 100%)'
									: 'rgba(10, 16, 48, 0.6)',
							border:
								selectedCategory === category
									? '1px solid rgba(44, 225, 255, 0.6)'
									: '1px solid rgba(132, 165, 255, 0.3)',
							color:
								selectedCategory === category
									? '#2ce1ff'
									: '#b6c4f5',
							fontWeight: '600',
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							if (selectedCategory !== category) {
								e.target.style.transform = 'translateY(-2px)';
							}
						}}
						onMouseLeave={(e) => {
							e.target.style.transform = 'translateY(0)';
						}}
					>
						{category}
					</button>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
