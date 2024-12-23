import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { useCart } from '@/components/cart/CartProvider';
import PersonalizationInput from '@/components/cart/PersonalizationInput';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import { playTickSound } from '@/utils/audio';
import ProductImage from '@/components/product-detail/ProductImage';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductOptions from '@/components/product-detail/ProductOptions';

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#700100]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <ProductImage image={product.image} name={product.name} />

          <div className="space-y-8">
            <ProductInfo 
              name={product.name}
              description={product.description}
              price={product.price}
            />

            <ProductOptions
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <PersonalizationInput itemId={product.id} onUpdate={() => {}} />

            <AnimatePresence>
              <motion.div
                initial={false}
                animate={{ scale: isAdded ? 0.95 : 1 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-[#700100] hover:bg-[#590000] text-white transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg"
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;