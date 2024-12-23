import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Size</Label>
        <RadioGroup
          value={selectedSize}
          onValueChange={setSelectedSize}
          className="grid grid-cols-6 gap-2"
        >
          {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
            <div key={size}>
              <RadioGroupItem
                value={size}
                id={`size-${size}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 border-gray-200 bg-white text-sm font-medium transition-all peer-checked:border-[#700100] peer-checked:bg-[#700100] peer-checked:text-white hover:bg-gray-50"
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Color</Label>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="grid grid-cols-4 gap-2"
        >
          {['Black', 'White', 'Red', 'Blue'].map((color) => (
            <div key={color}>
              <RadioGroupItem
                value={color}
                id={`color-${color}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`color-${color}`}
                className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 border-gray-200 bg-white text-sm font-medium transition-all peer-checked:border-[#700100] peer-checked:bg-[#700100] peer-checked:text-white hover:bg-gray-50"
              >
                {color}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Quantity</Label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10 rounded-md border-2 border-gray-200"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-lg font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="h-10 w-10 rounded-md border-2 border-gray-200"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;