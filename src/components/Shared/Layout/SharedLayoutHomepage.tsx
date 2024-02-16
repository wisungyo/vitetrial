import BottomNavigation from "../BottomNavigation";
import Header from "../Header";

export default function SharedLayoutHomepage(props: any) {
  const { children } = props;
  return (
    <main>
      <Header />
      {children}
      <BottomNavigation />
    </main>
  );
}
