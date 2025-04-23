
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from "lucide-react";
import { Product, useCart } from "@/hooks/use-cart";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-60 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-bold text-brand-purple">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        
        <div className="mt-4 flex items-center space-x-2">
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-brand-purple hover:bg-brand-dark-purple"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          
          <Link to={`/product/${product.id}`}>
            <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-light-purple/10">
              <Info className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
