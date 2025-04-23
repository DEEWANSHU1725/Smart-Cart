
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingCart, UserCircle, Home, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-brand-purple">SmartCart</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-brand-purple"
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-brand-purple"
            >
              <ShoppingBag className="mr-1 h-4 w-4" />
              Shop
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-brand-purple"
            >
              <UserCircle className="mr-1 h-4 w-4" />
              Login
            </Link>
            <Link
              to="/register"
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-purple hover:bg-brand-dark-purple"
            >
              Register
            </Link>
            <Link to="/cart" className="ml-4 relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-brand-purple" />
              {items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-brand-purple text-white">
                  {items.length}
                </Badge>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="mr-4 relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-brand-purple text-white">
                  {items.length}
                </Badge>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-purple hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-brand-purple hover:text-brand-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Home
              </div>
            </Link>
            <Link
              to="/shop"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-brand-purple hover:text-brand-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop
              </div>
            </Link>
            <Link
              to="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-brand-purple hover:text-brand-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <UserCircle className="mr-2 h-5 w-5" />
                Login
              </div>
            </Link>
            <Link
              to="/register"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-brand-purple hover:text-brand-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
