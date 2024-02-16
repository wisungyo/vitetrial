import Link from "next/link";

type TypeCategory = {
  title: string;
  image: string;
  path?: string;
};

export default function CategoryCard({
  title,
  image,
  path = "#",
}: TypeCategory) {
  return (
    <div
      className="relative min-w-[100px] flex-col max-w-[100px] group"
      key={title}
    >
      <Link
        className="absolute w-full h-full z-1 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"
        href={path}
        aria-label={title}
      />
      <img
        className="rounded-full bg-neutral-100 group-hover:shadow-xl group-active:shadow-none"
        src={image}
        alt={title}
        width="100"
        height="100"
        style={{ width: "100px", height: "100px" }}
      />
      <div className="flex justify-center">
        <a className="mt-4 font-semibold no-underline text-normal-900 typography-text-base group-hover:underline group-hover:text-primary-800 group-hover:font-normal group-active:text-primary-800 group-active:font-normal">
          {title}
        </a>
      </div>
    </div>
  );
}
