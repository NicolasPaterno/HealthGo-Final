import { createContext, useContext, useState, type ReactNode, useMemo } from 'react';
import { toast } from "sonner";

// Interfaces
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
    orderId: string;
    date: Date;
    items: CartItem[];
    total: number;
}

interface ICartContext {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  purchaseHistory: Order[]; // Novo
  completePurchase: () => void; // Novo
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<Order[]>([]); // Novo

  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
    toast.success(`${itemToAdd.name} foi adicionado ao carrinho!`);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.info("Item removido do carrinho.");
  };

  const increaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const completePurchase = () => {
      if (cartItems.length === 0) return;
      const newOrder: Order = {
          orderId: `order-${Date.now()}`,
          date: new Date(),
          items: [...cartItems],
          total: cartTotal,
      };
      setPurchaseHistory(prevHistory => [newOrder, ...prevHistory]);
      setCartItems([]);
      closeCart();
      toast.success("Compra finalizada com sucesso!");
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
    cartTotal,
    isCartOpen,
    openCart,
    closeCart,
    purchaseHistory,
    completePurchase,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};