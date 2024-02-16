// import SearchBasic from "@/ltc-core/block/Search/SearchBasic";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { PRODUCT_LIST } from "@/graphql/documents/products";
// import { useLazyQuery } from "@apollo/client";

// import { SearchBasic } from "../../../ltc-core/block";

export default function HomeSearch() {
  // const router = useRouter();
  // const [getProductList, { data, loading, error }] = useLazyQuery(PRODUCT_LIST);
  // const [searchProducts, setSearchProducts] = useState<any>([]);

  // const handleSearch = async (phrase: string) => {
  //   try {
  //     const response = await getProductList({ variables: { term: phrase } });
  //     const products = response.data?.search.items;
  //     setSearchProducts(products);

  //     const result = products?.map((product: any) => {
  //       return {
  //         product: { id: product.productId, name: product.productName },
  //       };
  //     });

  //     return result;
  //   } catch (error) {
  //     console.error("Error during search:", error);
  //     return undefined;
  //   }
  // };

  // const handleOnItemClick = (title: string) => {
  //   router.push({
  //     pathname: "/products",
  //     query: { search: title },
  //   });
  // };

  return <div className="px-4 mt-4"></div>;
}
