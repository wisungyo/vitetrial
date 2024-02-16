import { Button, Modal, Radio, Select } from "@/ltc-core/ui";
import { SfIconAdd, SfIconClose, SfIconCloseSm } from "@storefront-ui/react";
import { useEffect, useState } from "react";
import { TextInput } from "@/ltc-core/block";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CUSTOMER_ADDRESS } from "@/graphql/documents/accounts";
import {
  AVAILABLE_COUNTRIES,
  SET_ORDER_SHIPPING_ADDRESS,
} from "@/graphql/documents/payment";
import { useAlert } from "@/utils/hooks/useAlert";

type TypeAddress = {
  fullName: String;
  company: String;
  streetLine1: String;
  streetLine2: String;
  city: String;
  province: String;
  postalCode: String;
  countryCode: String;
  phoneNumber: String;
};

type TypeCheckoutAddress = {
  data: any;
  handleSetAddress: (params: TypeAddress) => void;
};

export default function CheckoutAddress({
  data,
  handleSetAddress,
}: TypeCheckoutAddress) {
  const { openAlert } = useAlert();
  const [createCustomerAddress, createCustomerAddressProps] = useMutation(
    CREATE_CUSTOMER_ADDRESS
  );
  const [setOrderShippingAddress, setOrderShippingAddressProps] = useMutation(
    SET_ORDER_SHIPPING_ADDRESS
  );
  const availableCountriesProps = useQuery(AVAILABLE_COUNTRIES);
  const availableCountries =
    availableCountriesProps?.data?.availableCountries || [];
  const [addresses, setAddresses] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetLine1, setStreetLine1] = useState("");
  const [streetLine2, setStreetLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    prepareAddress();
  }, [data]);

  const prepareAddress = () => {
    const addressesWithIsActive = data.map((address: any) => ({
      ...address,
      isActive: false,
    }));
    setAddresses(addressesWithIsActive);
  };

  const handleClickAddress = async (id: string) => {
    const updatedAddresses = addresses.map((address: any) => ({
      ...address,
      isActive: address.id === id,
    }));

    setAddresses(updatedAddresses);

    const choosenAddress = updatedAddresses.find(
      (address: any) => address.isActive === true
    );

    console.log(choosenAddress);

    const response = await setOrderShippingAddress({
      variables: {
        fullName: choosenAddress.fullName,
        company: choosenAddress.company,
        streetLine1: choosenAddress.streetLine1,
        streetLine2: choosenAddress.streetLine2,
        city: choosenAddress.city,
        province: choosenAddress.province,
        postalCode: choosenAddress.postalCode,
        countryCode:
          choosenAddress.country.code || choosenAddress.country.countryCode,
        phoneNumber: choosenAddress.phoneNumber,
      },
    });
    const status = response.data?.setOrderShippingAddress.__typename;

    if (status === "NoActiveOrderError") {
      openAlert(response.data?.setOrderShippingAddress.message, "error");
      return;
    }

    handleSetAddress({
      fullName: choosenAddress.fullName,
      company: choosenAddress.company,
      streetLine1: choosenAddress.streetLine1,
      streetLine2: choosenAddress.streetLine2,
      city: choosenAddress.city,
      province: choosenAddress.province,
      postalCode: choosenAddress.postalCode,
      countryCode: choosenAddress.country.countryCode,
      phoneNumber: choosenAddress.phoneNumber,
    });
  };

  if (availableCountriesProps.error) return null;

  const createAddress = async () => {
    try {
      if (
        !fullName ||
        !phoneNumber ||
        !streetLine1 ||
        !streetLine2 ||
        !city ||
        !province ||
        !postalCode
      ) {
        setErrorMessage("Cannot empty");
        return;
      }

      const variables = {
        fullName,
        phoneNumber,
        company: "",
        streetLine1,
        streetLine2,
        city,
        province,
        postalCode,
        countryCode: country || availableCountries[0].code,
      };

      const response = await createCustomerAddress({
        variables,
      });

      const newVariables = {
        ...variables,
        country: {
          code: country || availableCountries[0].code,
          name: country || availableCountries[0].code,
        },
      };
      const newAddressId = new Date().getTime().toString();
      const newAddress = { id: newAddressId, ...newVariables };
      setAddresses((prevState: any) => [...prevState, newAddress]);

      setErrorMessage("");
      setIsModalOpen(false);
      openAlert("Address added successfully!", "positive");
    } catch (error: any) {
      openAlert(error.message, "error");
    }
  };

  return (
    <>
      {!availableCountriesProps.loading && availableCountries.length > 0 && (
        <div className="flex flex-col gap-4 px-4 mt-6">
          <p className="font-bold text-xl">Address</p>
          <div className="flex flex-col gap-6">
            {addresses.length > 0
              ? addresses.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-row items-center gap-4"
                  >
                    <Radio
                      key={item.id}
                      name={item.fullName}
                      value={item.name}
                      className="block mb-4"
                      checked={item.isActive}
                      onChange={() => {
                        handleClickAddress(item.id);
                      }}
                    />
                    <div>
                      <div className="font-medium">{item.fullName}</div>
                      <div className="text-sm">
                        {item.streetLine1}, {item.streetLine2}, {item.city},{" "}
                        {item.province}, {item.postalCode}, {item.country.name}
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            className="flex flex-row gap-2 mt-4 justify-end items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <SfIconAdd size="sm" color="#71717A" />
            <div className="text-neutral-500">Add new address</div>
          </div>

          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            as="section"
            className="min-w-[90%] max-w-[90%] md:min-w-lg md:max-w-lg"
          >
            <header>
              <Button
                square
                variant="tertiary"
                className="absolute right-2 top-2"
                onClick={() => setIsModalOpen(false)}
              >
                <SfIconClose />
              </Button>
              <h3
                id="promoModalTitle"
                className="font-bold typography-headline-4 md:typography-headline-3 text-center"
              >
                Add New Address
              </h3>
            </header>

            <div className="flex flex-col gap-2 mt-2">
              <TextInput
                label="Full Name"
                size="sm"
                placeholder=""
                value={fullName}
                handleChange={setFullName}
                invalid={errorMessage && !fullName ? true : false}
                errorText={errorMessage}
              />
              <TextInput
                label="Phone"
                size="sm"
                placeholder=""
                value={phoneNumber}
                handleChange={setPhoneNumber}
                invalid={errorMessage && !phoneNumber ? true : false}
                errorText={errorMessage}
              />
              <TextInput
                label="Street Address"
                size="sm"
                placeholder=""
                value={streetLine1}
                handleChange={setStreetLine1}
                invalid={errorMessage && !streetLine1 ? true : false}
                errorText={errorMessage}
              />
              <TextInput
                label="Unit Number"
                size="sm"
                placeholder=""
                value={streetLine2}
                handleChange={setStreetLine2}
                invalid={errorMessage && !streetLine2 ? true : false}
                errorText={errorMessage}
              />
              <div className="flex flex-row gap-4 w-full">
                <div>
                  <TextInput
                    label="Postal Code"
                    size="sm"
                    placeholder=""
                    value={postalCode}
                    handleChange={setPostalCode}
                    invalid={errorMessage && !postalCode ? true : false}
                    errorText={errorMessage}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    label="City"
                    size="sm"
                    placeholder=""
                    value={city}
                    handleChange={setCity}
                    invalid={errorMessage && !city ? true : false}
                    errorText={errorMessage}
                  />
                </div>
              </div>
              <TextInput
                label="Province"
                size="sm"
                placeholder=""
                value={province}
                handleChange={setProvince}
                invalid={errorMessage && !province ? true : false}
                errorText={errorMessage}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-neutral-900 font-body">
                  Country
                </span>
                <Select onChange={(event) => setCountry(event.target.value)}>
                  {availableCountries.map((option: any) => (
                    <option value={option.code} key={option.code}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <footer className="flex gap-2 mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={createAddress} className="flex-1">
                Save
              </Button>
            </footer>
          </Modal>
        </div>
      )}
    </>
  );
}
