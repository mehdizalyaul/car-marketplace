import { useContext } from "react";
import { WishlistContext } from "../contexts/myContexts";

export default function useWishlist() {
  return useContext(WishlistContext);
}
