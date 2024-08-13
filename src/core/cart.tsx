import React, { createContext, useContext, useState, ReactNode } from "react";

// 상품 데이터 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  description: string;
  saleEndTime: string;
  createdAt: string;
  updatedAt: string;
}

// 장바구니 항목 타입 정의
interface CartItem {
  product: Product;
  quantity: number;
}

// CartContext 타입 정의
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

// CartContext 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider 컴포넌트
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 장바구니에 상품 추가
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      // 기존 장바구니에서 상품 찾기
      const existingProduct = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingProduct) {
        // 이미 장바구니에 있는 경우, 수량 업데이트
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 새로운 상품을 장바구니에 추가
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // 장바구니에서 상품 제거
  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// useCart 훅
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};