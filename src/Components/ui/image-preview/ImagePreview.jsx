import React from 'react';

const ImagePreview = ({ previewUrls, onDelete }) => {
	console.log('Preview URLs:', previewUrls);
	return (
		<div className="grid grid-cols-2 gap-4">
			{previewUrls.map((url, index) => (
				<div key={index} className="relative">
					<img src={url} alt={`Preview ${index}`} className="w-full h-auto border rounded-md" />
					<button
						onClick={() => onDelete(index)}
						className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
					>
						✕
					</button>
				</div>
			))}
		</div>
	);
};

export default ImagePreview;
