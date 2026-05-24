import { Product } from "@/data/ProductData";
import Image from "next/image";
import { ActionDispatch } from "react";
const ProductList = ({
  products,
  dispatch,
}: {
  products: Product[];
  dispatch: ActionDispatch<[action: any]>;
}) => {
  return (
    <div className="flex flex-col gap-3 m-3 w-fit">
      {products.map((product: Product) => {
        return (
          <ProductCard key={product.id} product={product} dispatch={dispatch} />
        );
      })}
    </div>
  );
};

export const ProductCard = ({
  product,
  fromCart = false,
  dispatch,
}: {
  product: Product;
  fromCart?: boolean;
  dispatch: ActionDispatch<[action: any]>;
}) => {
  return (
    <div className="flex gap-2 p-3 border rounded border-mauve-100 bg-mauve-400 ">
      <div className="w-30 h-30 relative ">
        <Image
          src={product.image}
          className="absolute"
          fill
          alt={product.description}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>{product.name}</span>
        <span>{product.description}</span>
        <span>{product.price}</span>
        <span>{product.quantity}</span>
        {fromCart && <button  onClick={() => dispatch({ type: "Increase", payload: product })} className="inc">+</button>}
        {fromCart && <button className="inc" onClick={() => dispatch({ type: "Decrease", payload: product })}>-</button>}
        {!fromCart && (
          <button
            className="p-1 border-mauve-50 bg-red-100 rounded-2xl"
            onClick={() => dispatch({ type: "Add", payload: product })}
          >
            Add to cart
          </button>
        )}
        {fromCart && (
          <button
            className="p-1 border-mauve-50 bg-red-100 rounded-2xl"
            onClick={() => dispatch({ type: "Remove", payload: product })}
          >
            Remove from cart
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductList;
