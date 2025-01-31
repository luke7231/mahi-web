import React, { createContext, useContext, useState, ReactNode } from "react";

interface Store {
  title: string;
  closingHours: string;
  address: string;
}
// 상품 데이터 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  userPrice: number;
  quantity: number;
  description: string;
  saleEndTime: string;
  createdAt: string;
  updatedAt: string;
  store: {
    id: number;
  };
  menus:
    | {
        id: number;
        img: string;
      }[]
    | null;
  img: string;
}

// 장바구니 항목 타입 정의
interface CartItem {
  product: Product;
  quantity: number;
  store: Store;
}

// CartContext 타입 정의
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, store: Store) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

// CartContext 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider 컴포넌트
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 장바구니에 상품 추가
  const addToCart = (product: Product, quantity: number, store: Store) => {
    if (cart.length > 0 && cart[0].product.store.id !== product.store.id) {
      // 사용자에게 다른 매장의 제품을 추가할지 확인
      const confirmReset = window.confirm(
        "다른 매장의 상품은 함께 담을 수 없습니다. 카트를 초기화하고 새 상품을 담으시겠습니까?"
      );

      if (confirmReset) {
        // 카트를 초기화하고 새 상품을 추가
        const newCart = [{ product, quantity, store }];
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
        return;
      } else {
        // 사용자가 취소한 경우 아무 작업도 하지 않음
        return;
      }
    }
    // 기존 장바구니에서 상품 찾기
    const existingProduct = cart.find((item) => item.product.id === product.id);
    const total = (existingProduct?.quantity as number) + quantity;

    if (total > product.quantity) {
      alert("이미 최대 수량을 담으셨네요!");
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        // 이미 장바구니에 있는 경우, 수량 업데이트
        const resultCart = prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, ...store, quantity: item.quantity + quantity }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(resultCart));
        return resultCart;
      } else {
        // 새로운 상품을 장바구니에 추가
        const resultCart = [...prevCart, { product, quantity, store }];
        localStorage.setItem("cart", JSON.stringify(resultCart));
        return resultCart;
      }
    });
  };

  // 장바구니에서 상품 제거
  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
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
