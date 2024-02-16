import { useEffect, useState } from "react";
import ProductDetailBidding from "../Section/ProductDetailBidding";
import ProductDetailButtons from "../Section/ProductDetailButtons";
import ProductDetailDescription from "../Section/ProductDetailDescription";
import ProductDetailGallery from "../Section/ProductDetailGallery";
import ProductDetailHeadline from "../Section/ProductDetailHeadline";
import ProductDetailBiddingModal from "../Section/ProductDetailBiddingModal";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { PRODUCT_BY_ID } from "@/graphql/documents/products";
import { ADD_ITEM_TO_ORDER } from "@/graphql/documents/orders";
import { useAlert } from "@/utils/hooks/useAlert";
import { useNavigation } from "@/utils/hooks/useNavigation";
import { useModal } from "@/utils/hooks/useModal";

type Product = {
  id: string;
  variantId: string;
  name: string;
  description: string;
  currencyCode: string;
  bidPrice: number;
  buyPrice: number;
  biddingRound: number;
  totalBid: number;
  condition: string;
  color: string;
  brand: string;
  storage: string;
};

export default function ProductDetailBody() {
  const router = useRouter();
  const { id } = router.query;
  const [getProduct, getProductProps] = useLazyQuery(PRODUCT_BY_ID);
  const [addToCart, addToCartProps] = useMutation(ADD_ITEM_TO_ORDER);
  const { openAlert, closeAlert } = useAlert();
  const { checkIsLogin } = useNavigation();
  const { openLoginModal } = useModal();
  const [images, setImages] = useState<any>([]);
  const [product, setProduct] = useState<Product>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady, id]);

  const getData = async () => {
    try {
      const productId = id as string;
      const response = await getProduct({ variables: { id: productId } });
      const data = response.data;
      const product = data?.product;
      const images = product?.assets.map((item: any) => ({
        imageSrc: item.preview,
        alt: item.id,
      }));

      const simplifiedData: Product = {
        id: product?.id as string,
        variantId: product?.variantList.items[0]?.id as string,
        name: product?.name as string,
        description: product?.description as string,
        currencyCode: "USG",
        bidPrice: 988,
        buyPrice: 1080,
        biddingRound: new Date().getTime() + 1000000,
        totalBid: 10,
        condition: "Brand New",
        color: "Deep Purple",
        brand: "Apple",
        storage: "258GB",
      };

      if (images) setImages(images);
      setProduct(simplifiedData);
    } catch (error: any) {
      openAlert(error.message, "error");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOnBuy = async () => {
    try {
      const isLogin = await checkIsLogin();
      if (!isLogin) {
        openLoginModal();
        return;
      }

      const response = await addToCart({
        variables: { quantity: 1, variantId: product?.variantId as string },
      });
      const status = response.data?.addItemToOrder.__typename;

      if (
        status === "InsufficientStockError" ||
        status === "OrderModificationError" ||
        status === "NegativeQuantityError" ||
        status === "OrderLimitError"
      ) {
        openAlert(response.data?.addItemToOrder.message, "error");
        return;
      }

      if (response.data)
        openAlert("Item added to cart successfully!", "positive");
    } catch (error: any) {
      openAlert(error.message, "error");
    }
  };

  return (
    <>
      <ProductDetailGallery images={images} />
      <ProductDetailHeadline
        name={product?.name}
        shipping="Free Shipping"
        estimatedArrival="Wed, Feb 7 - Wed, Feb 12"
      />
      <ProductDetailDescription description={product?.description} />
      <ProductDetailBidding
        biddingRound={product?.biddingRound}
        totalBid={product?.totalBid}
        currentBid={product?.bidPrice}
        currencyCode={product?.currencyCode}
      />
      <ProductDetailButtons
        currencyCode={product?.currencyCode}
        bidPrice={product?.bidPrice}
        buyPrice={product?.buyPrice}
        handleOnBid={toggleModal}
        handleOnBuy={handleOnBuy}
      />
      <ProductDetailBiddingModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
}
