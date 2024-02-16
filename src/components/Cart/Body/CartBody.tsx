import { useQuery } from "@apollo/client";
import CartListing from "../Section/CartListing";
import { ACTIVE_ORDER } from "@/graphql/documents/orders";

export default function CartBody() {
  const { data, loading, error } = useQuery(ACTIVE_ORDER);
  const activeOrderLines = data?.activeOrder?.lines || [];

  if (error) return null;

  return <>{!loading && <CartListing products={activeOrderLines} />}</>;
}
