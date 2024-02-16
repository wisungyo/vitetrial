// import { useQuery } from "@apollo/client";
// import CategoryCard from "@/ltc-core/block/Card/CategoryCard";
// import { COLLECTIONS } from "@/graphql/documents/collections";

export default function HomeCategory() {
  // const { loading, error, data } = useQuery(COLLECTIONS);

  // const categories = data?.collections.items.map(
  //   ({ id, name, slug, featuredAsset }) => ({
  //     id: id,
  //     title: name,
  //     image: featuredAsset?.preview,
  //     slug: slug,
  //   })
  // );

  // if ((categories && categories.length < 1) || error) {
  //   return <></>;
  // }

  return (
    <div className="mt-6">
      <p className="px-4 font-bold text-[20px]">Shop by Category</p>
      <div className="mt-[19px]">
        <div
          className="flex overflow-x-scroll gap-4"
          style={{ scrollbarWidth: "none" }}
        >
          {/* {categories?.map(({ title, image, slug }, index) => (
            <div key={index} className={index === 0 ? "pl-4" : ""}>
              <CategoryCard
                title={title}
                image={image as string}
                path={`/products?slug=${slug}`}
              />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
