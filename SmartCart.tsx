import { X, ShoppingBag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem, Product, useCart } from "@/hooks/use-cart";
import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { getRecommendations } from "@/data/products";

export function SmartCart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [showRecommendations, setShowRecommendations] = useState(true);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;
  
  // Get AI recommendations based on cart items
  const recommendations = getRecommendations(items);

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-medium text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-8 bg-brand-purple hover:bg-brand-dark-purple">
          <a href="/shop">Start Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Smart Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-7">
            <div className="border rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900">Cart Items ({items.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 ml-0 sm:ml-6 mt-4 sm:mt-0">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-lg font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gray-900"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gray-900"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-800"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="border rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
                
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <dt className="text-sm text-gray-600">Tax (5%)</dt>
                    <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </dd>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <dt className="text-base font-medium text-gray-900">Total</dt>
                    <dd className="text-base font-medium text-brand-purple">${total.toFixed(2)}</dd>
                  </div>
                </dl>
                
                <div className="mt-6">
                  <Button asChild className="w-full bg-brand-purple hover:bg-brand-dark-purple">
                    <a href="/checkout">Proceed to Checkout</a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-brand-purple text-brand-purple hover:bg-brand-light-purple/10"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommendations */}
        {showRecommendations && recommendations.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-brand-purple" />
                Smart Recommendations
              </h2>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowRecommendations(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
