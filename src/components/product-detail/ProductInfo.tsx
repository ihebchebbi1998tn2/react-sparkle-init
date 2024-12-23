import React from 'react';
import { motion } from 'framer-motion';

interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
}

const ProductInfo = ({ name, description, price }: ProductInfoProps) => {
  return (
    <div className="space-y-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-['WomanFontBold'] text-[#591C1C]"
      >
        {name}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-600"
      >
        {description}
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-black"
      >
        {price} TND
      </motion.div>
    </div>
  );
};

export default ProductInfo;