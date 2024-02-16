import Header from "../../Shared/Header";

export default function ProductListingLayout(props: any) {
  const { children } = props;
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
