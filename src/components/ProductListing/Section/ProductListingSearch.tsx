import SearchBasic from "@/ltc-core/block/Search/SearchBasic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { PRODUCT_LIST } from "@/graphql/documents/products";

export default function ProductListingSearch() {
  const router = useRouter();
  const { search } = router.query;
  const [getProductList, { data, loading, error }] = useLazyQuery(PRODUCT_LIST);
  const [searchTerm, setSearchTerm] = useState((search as string) || "");
  const [searchProducts, setSearchProducts] = useState<any>([]);

  useEffect(() => {
    if (router.isReady) {
      setSearchTerm(search as string);
    }
  }, [router.isReady]);

  const handleSearch = async (phrase: string) => {
    try {
      const response = await getProductList({ variables: { term: phrase } });
      const products = response.data?.search.items;
      setSearchProducts(products);

      const result = products?.map((product: any) => {
        return {
          product: { id: product.productId, name: product.productName },
        };
      });

      return result;
    } catch (error) {
      console.error("Error during search:", error);
      return undefined;
    }
  };

  const handleOnItemClick = (title: string) => {
    const param = router.push({
      pathname: "/products",
      query: { search: title },
    });
  };

  return (
    <div className="px-4 mt-4">
      <SearchBasic
        handleSearch={handleSearch}
        searchProducts={searchProducts}
        handleOnItemClick={handleOnItemClick}
        query={searchTerm}
      />
    </div>
  );
}
