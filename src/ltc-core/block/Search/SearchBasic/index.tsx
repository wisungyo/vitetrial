import {
  type ChangeEvent,
  type KeyboardEvent,
  type FormEvent,
  useState,
  useRef,
} from "react";
import { useDebounce } from "react-use";
import { offset } from "@floating-ui/react-dom";
import {
  SfInput,
  SfIconSearch,
  SfIconCancel,
  useDisclosure,
  SfListItem,
  SfLoaderCircular,
  useTrapFocus,
  useDropdown,
} from "@storefront-ui/react";

type TypeSearchProduct = {
  id: string;
  name: string;
};

type TypeSearchBasicResult = {
  highlight: string;
  rest: string;
  product: TypeSearchProduct;
};

type TypeSearchHandle = (term: string) => Promise<any>;

type TypeSearchBasic = {
  query?: string;
  handleSearch: TypeSearchHandle;
  searchProducts: TypeSearchProduct[];
  handleOnItemClick?: (title: string) => void;
};

export type {
  TypeSearchBasicResult,
  TypeSearchBasic,
  TypeSearchProduct,
  TypeSearchHandle,
};

export default function SearchBasic({
  query = "",
  handleSearch,
  searchProducts,
  handleOnItemClick = () => {},
}: TypeSearchBasic) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownListRef = useRef<HTMLUListElement>(null);
  const [searchValue, setSearchValue] = useState(query);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(false);
  const [snippets, setSnippets] = useState<{ product: TypeSearchProduct }[]>(
    []
  );
  const { isOpen, close, open } = useDisclosure();
  const { refs, style } = useDropdown({
    isOpen,
    onClose: close,
    placement: "bottom-start",
    middleware: [offset(4)],
  });
  const { focusables: focusableElements, updateFocusableElements } =
    useTrapFocus(dropdownListRef, {
      trapTabs: false,
      initialFocus: false,
      arrowKeysUpDown: true,
      activeState: isOpen,
    });
  const isResetButton = Boolean(searchValue);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    close();
    handleOnItemClick(searchValue);
    setIsFocus(false);
  };

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setSearchValue("");
    setSnippets([]);
    close();
    handleFocusInput();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phrase = event.target.value;
    if (phrase) {
      setSearchValue(phrase);
    } else {
      handleReset();
    }
  };

  const handleSelect = (phrase: string) => () => {
    setSearchValue(phrase);
    close();
    handleFocusInput();
    handleOnItemClick(phrase);
    setIsFocus(false);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") handleReset();
    if (event.key === "ArrowUp") {
      open();
      updateFocusableElements();
      if (isOpen && focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
      }
    }
    if (event.key === "ArrowDown") {
      open();
      updateFocusableElements();
      if (isOpen && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  };

  useDebounce(
    () => {
      if (searchValue) {
        const getSnippets = async () => {
          open();
          setIsLoadingSnippets(true);
          try {
            // const data = await mockAutocompleteRequest(searchValue);
            const data = await handleSearch(searchValue);
            if (data) {
              setSnippets(data);
            }
          } catch (error) {
            close();
            console.error(error);
          }
          setIsLoadingSnippets(false);
        };

        getSnippets();
      }
    },
    500,
    [searchValue]
  );

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      ref={refs.setReference}
      className="relative"
    >
      <SfInput
        ref={inputRef}
        value={searchValue}
        onChange={handleChange}
        onFocus={() => {
          open;
          setIsFocus(true);
        }}
        aria-label="Search"
        placeholder="Search"
        onKeyDown={handleInputKeyDown}
        slotPrefix={<SfIconSearch />}
        slotSuffix={
          isResetButton && (
            <button
              type="reset"
              onClick={handleReset}
              aria-label="Reset search"
              className="flex rounded-md focus-visible:outline focus-visible:outline-offset"
            >
              <SfIconCancel />
            </button>
          )
        }
      />
      {isOpen && isFocus && (
        <div
          ref={refs.setFloating}
          style={style}
          className="left-0 right-0 z-10"
        >
          {isLoadingSnippets ? (
            <div className="flex items-center justify-center w-full h-20 py-2 bg-white border border-solid rounded-md border-neutral-100 drop-shadow-md">
              <SfLoaderCircular />
            </div>
          ) : (
            snippets.length > 0 && (
              <ul
                ref={dropdownListRef}
                className="py-2 bg-white border border-solid rounded-md border-neutral-100 drop-shadow-md"
              >
                {snippets.map(({ product }) => (
                  <li key={product.id + Math.random()}>
                    <SfListItem
                      as="button"
                      type="button"
                      onClick={handleSelect(product.name)}
                      className="flex justify-start"
                    >
                      <p className="text-left">
                        <span>{product.name}</span>
                      </p>
                    </SfListItem>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      )}
    </form>
  );
}
