import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { useCart } from '@/components/cart/CartProvider';
import PersonalizationInput from '@/components/cart/PersonalizationInput';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import { playTickSound } from '@/utils/audio';

const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green'];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const product = products?.find(p => p.id === Number(id));

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection required",
        description: "Please select both size and color",
        variant: "destructive",
      });
      return;
    }

    playTickSound();
    addToCart({
      id: product!.id,
      name: product!.name,
      price: product!.price,
      quantity: quantity,
      image: product!.image,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    toast({
      title: "Added to cart",
      description: "Product has been added to your cart",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#700100]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-white rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-normal"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-['WomanFontBold'] text-[#591C1C] mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-black mb-4">
                {product.price} TND
              </p>
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <Select onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <Select onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <Select 
                value={quantity.toString()} 
                onValueChange={(value) => setQuantity(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Personalization */}
            <PersonalizationInput itemId={product.id} onUpdate={() => {}} />

            {/* Add to Cart Button */}
            <AnimatePresence>
              <motion.div
                initial={false}
                animate={{ scale: isAdded ? 0.95 : 1 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-[#700100] hover:bg-[#590000] text-white transition-all duration-300 relative overflow-hidden"
                  disabled={isAdded}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                In Stock
              </div>
              <p className="text-sm text-gray-600">
                Free shipping on orders over 500 TND
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;