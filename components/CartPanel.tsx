import { ActionDispatch } from "react";
import { ProductCard } from "./ProductList";
import { Product } from "@/data/ProductData";

const CartPanel = ({
  items,
  dispatch,
}: {
  items: any;
  dispatch: ActionDispatch<[action: any]>;
}) => {
  const cartItems: Product[] = Object.values(items);
  if (cartItems.length === 0) return <div>Cart is empty</div>;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div>
      Total : {total}
      {cartItems.map((item: Product) => {
        return (
          <ProductCard
            dispatch={dispatch}
            key={item?.id}
            product={item}
            fromCart={true}
          />
        );
      })}
    </div>
  );
};

export default CartPanel;
