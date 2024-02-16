import ProductCardVertical from "@/ltc-core/block/ProductCard/ProductCardVertical";
import Masonry from "react-masonry-css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  PRODUCT_LIST,
  PRODUCT_LIST_BY_SLUG,
} from "@/graphql/documents/products";

const breakpointColumnsObj = {
  default: 3,
  608: 2,
  374: 1,
};

export default function ProductListingItems() {
  const router = useRouter();
  const { slug, search } = router.query;
  const [getProductListBySlug, getProductListBySlugProps] =
    useLazyQuery(PRODUCT_LIST_BY_SLUG);
  const [getProductList, getProductListProps] = useLazyQuery(PRODUCT_LIST);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      search || !slug ? searchProduct() : getCollection();
    }
  }, [router.isReady, search]);

  const getCollection = async () => {
    try {
      const response = await getProductListBySlug({
        variables: { collectionSlug: slug as string },
      });

      const items = response.data?.search.items;
      const simplifiedData: any = items?.map((item: any) => ({
        id: item.productId,
        image: item.productAsset.preview,
        title: item.productName,
        description: item.description,
        currencyCode: item.currencyCode,
        price: item.priceWithTax.value,
      }));

      setProducts(simplifiedData);
    } catch (error) {}
  };

  const searchProduct = async () => {
    try {
      const response = await getProductList({
        variables: { term: search as string },
      });

      const items = response.data?.search.items;
      const simplifiedData: any = items?.map((item: any) => ({
        id: item.productId,
        image: item.productAsset.preview,
        title: item.productName,
        description: item.description,
        currencyCode: item.currencyCode,
        price: item.priceWithTax.value,
      }));

      setProducts(simplifiedData);
    } catch (error) {}
  };

  const handleOnClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="px-4 pb-4 mt-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((data: any) => (
          <div key={data.id}>
            <ProductCardVertical
              image={data.image}
              title={data.title}
              description="Brand New • Free Shipping"
              currencyCode={data.currencyCode}
              price={data.price}
              flag="Sale"
              handleOnClick={() => handleOnClick(data.id)}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
