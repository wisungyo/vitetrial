export default function SharedLayoutStickyOnTop(props: any) {
  const { children } = props;
  return <div className="sticky top-0 bg-white z-20">{children}</div>;
}
