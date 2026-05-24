import { useReducer } from "react";

const cartReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "Add": {
      const existing = state[action.payload.id];
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    }
    case "Remove": {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case "Increase": {
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          quantity: state[action.payload.id].quantity + 1,
        },
      };
    }
    case "Decrease": {
      const quantity = state[action.payload.id].quantity;
      if (quantity === 1) {
        const newState = { ...state };
        delete newState[action.payload.id];
        return newState;
      } else {
        return {
          ...state,
          [action.payload.id]: {
            ...action.payload,
            quantity: state[action.payload.id].quantity - 1,
          },
        };
      }
    }
    default: {
      return state;
    }
  }
};

const useCart = () => {
  const [items, dispatch] = useReducer(cartReducer, {});
  return { items, dispatch };
};

export default useCart;
