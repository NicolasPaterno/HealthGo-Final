import { createContext, useContext, useState, type ReactNode, useMemo } from 'react';
import { toast } from "sonner";
import api from "@/services/api"; // Importar o módulo api

// Interfaces
export interface BaseCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface HotelCartItem extends BaseCartItem {
  type: "hotel";
  checkInDate: string; // ou Date, dependendo de como você armazena
  checkOutDate: string; // ou Date
}

export interface FlightCartItem extends BaseCartItem {
  type: "flight";
  class: string; // Classe do voo
  voo_Id?: number; // ID do voo (agora opcional)
  flightNumber: string; // Número do voo original para buscar o Voo_Id
}

export interface ServiceProviderCartItem extends BaseCartItem {
  type: "serviceProvider";
  prestadorId: number;
  especialidadeId: number; // ID da especialidade do prestador de serviço
  especialidade: string; // Adicionar o nome da especialidade
  dataInicio: string; // ou Date
  dataFim: string; // ou Date
}

export type CartItem = HotelCartItem | FlightCartItem | ServiceProviderCartItem;

export interface Order {
  orderId: number;
  date: Date;
  items: CartItem[];
  total: number;
}

interface ICartContext {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  purchaseHistory: Order[];
  completePurchase: (ordemServico_Id: number) => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<Order[]>([]);

  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToCart = (itemToAdd: CartItem) => {

    if (itemToAdd.type === "serviceProvider" && new Date(itemToAdd.dataInicio) < new Date()) {
      toast.error("Não é possível agendar serviços para datas e horários passados.");
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => {
        if (item.id === itemToAdd.id && item.type === itemToAdd.type) {
          if (item.type === "serviceProvider" && itemToAdd.type === "serviceProvider") {
            return item.prestadorId === itemToAdd.prestadorId && item.dataInicio === itemToAdd.dataInicio && item.especialidadeId === itemToAdd.especialidadeId;
          }
          if (item.type === "hotel" && itemToAdd.type === "hotel") {
            return item.checkInDate === itemToAdd.checkInDate && item.checkOutDate === itemToAdd.checkOutDate;
          }
          if (item.type === "flight" && itemToAdd.type === "flight") {
            return item.voo_Id === itemToAdd.voo_Id && item.class === itemToAdd.class;
          }
          return true;
        }
        return false;
      });

      if (existingItem) {
        return prevItems.map(item =>
          (item.id === itemToAdd.id && item.type === itemToAdd.type &&
          (item.type === "serviceProvider" && itemToAdd.type === "serviceProvider" && item.prestadorId === itemToAdd.prestadorId && item.dataInicio === itemToAdd.dataInicio && item.especialidadeId === itemToAdd.especialidadeId) ||
          (item.type === "hotel" && itemToAdd.type === "hotel" && item.checkInDate === itemToAdd.checkInDate && item.checkOutDate === itemToAdd.checkOutDate) ||
          (item.type === "flight" && itemToAdd.type === "flight" && item.voo_Id === itemToAdd.voo_Id && item.class === itemToAdd.class)
          )
            ? { ...item, quantity: item.quantity + 1 }
            : item
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

  const completePurchase = async (ordemServico_Id: number) => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      orderId: ordemServico_Id,
      date: new Date(),
      items: [...cartItems],
      total: cartTotal,
    };

    // Processar passagens se houver
    const flightItems = cartItems.filter(item => item.type === "flight") as FlightCartItem[];

    for (const flightItem of flightItems) {
      try {
        // 1. Obter voo_Id
        console.log("Buscando voo_Id para o número de voo:", flightItem.flightNumber);
        const vooIdResponse = await api.get(`/Voo/numero/${flightItem.flightNumber}`);
        console.log("Resposta da busca do voo_Id:", vooIdResponse.data);
        const voo_Id = vooIdResponse.data.id; // Corrigido: o endpoint retorna { id: number }

        if (voo_Id) {
          // 2. Registrar Passagem
          const passagemData = {
            voo_Id: voo_Id,
            ordemServico_Id: newOrder.orderId,
          };
          console.log("Enviando para /Passagem:", passagemData);
          const passagemResponse = await api.post("/Passagem", passagemData);
          console.log("Resposta de /Passagem:", passagemResponse.data);
          toast.success(`Passagem para o voo ${flightItem.flightNumber} registrada com sucesso!`);
        } else {
          toast.error(`Falha ao obter ID do voo ${flightItem.flightNumber}.`);
        }
      } catch (error: any) {
        console.error(`Erro ao processar passagem para o voo ${flightItem.flightNumber}:`, error.response?.data || error.message);
        toast.error(`Erro ao registrar passagem para o voo ${flightItem.flightNumber}.`);
      }
    }

    setPurchaseHistory(prevHistory => [newOrder, ...prevHistory]);
    setCartItems([]);
    closeCart();
    closeCheckout();
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
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};