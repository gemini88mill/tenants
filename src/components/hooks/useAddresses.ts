import { useEffect, useState } from "react";
import { getAddressTypes } from "../../clients/addressTypes";
import { PostgrestError } from "@supabase/supabase-js";

export type AddressInput = {
  streetAddress: string;
  streetAddress2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  addressType: string;
};

const initialAddress = [{
  streetAddress: "",
  streetAddress2: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  addressType: "",
}];

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<AddressInput[]>(initialAddress);
  const [addressTypes, setAddressTypes] = useState<Array<{id: number; address_type: string;}> | PostgrestError | null>(null);

  const getAddressTypesAsync = async () => {
    const response = await getAddressTypes();
    setAddressTypes(response);
  };

  useEffect(() => {
    getAddressTypesAsync();
  }, []);

  const addAddress = () => {
    setAddresses((prev) => [...prev, {
      streetAddress: "",
      streetAddress2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      addressType: "",
    }]);
  };

  const updateAddress = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string, index:number) => {
    setAddresses((prev) => {
      const newAddresses = [...prev];
      newAddresses[index] = {...newAddresses[index], [key]: e.target.value}
      return newAddresses;
    });
  };

  const removeAddress = (index:number) => {
    setAddresses((prev) => {
      const newAddresses = [...prev];
      newAddresses.splice(index, 1);
      return newAddresses;
    });
  };

  const clearAddresses = () => {
    setAddresses(initialAddress);
  };

  const getAddresses = () => {
    return addresses;
  };

  const getAddress = (index:number) => {
    return addresses[index];
  };

  return { addAddress, updateAddress, removeAddress, clearAddresses, getAddresses, getAddress, addressTypes };
};