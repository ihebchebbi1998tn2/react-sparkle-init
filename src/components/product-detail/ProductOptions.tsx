import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductOptionsProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductOptions = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity
}: ProductOptionsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="size" className="text-sm font-medium text-gray-700">Size</Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-full bg-white border-gray-200 hover:border-[#700100] transition-colors">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
              <SelectItem key={size} value={size} className="cursor-pointer hover:bg-gray-50">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color" className="text-sm font-medium text-gray-700">Color</Label>
        <Select value={selectedColor} onValueChange={setSelectedColor}>
          <SelectTrigger className="w-full bg-white border-gray-200 hover:border-[#700100] transition-colors">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
              <SelectItem key={color} value={color} className="cursor-pointer hover:bg-gray-50">
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</Label>
        <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number(value))}>
          <SelectTrigger className="w-full bg-white border-gray-200 hover:border-[#700100] transition-colors">
            <SelectValue placeholder="Select quantity" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()} className="cursor-pointer hover:bg-gray-50">
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductOptions;