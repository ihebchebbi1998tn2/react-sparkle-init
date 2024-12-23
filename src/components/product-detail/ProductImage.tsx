import React from 'react';
import { motion } from 'framer-motion';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage = ({ image, name }: ProductImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-contain mix-blend-normal p-4"
      />
    </motion.div>
  );
};

export default ProductImage;