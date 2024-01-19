import { useCallback, useState } from "react";

type PersonalInput = {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
};

export const usePersonal = () => {
  const [personal, setPersonal] = useState<PersonalInput>({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phone: "",
  });

  const updatePersonal = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string) => {
    setPersonal((prev) => ({...prev, [key]: e.target.value}));
  }, []);

  const getPersonal = useCallback(() => {
    return personal;
  }, [personal]);

  const clearPersonal = useCallback(() => {
    setPersonal({
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      email: "",
      phone: "",
    });
  }, []);

  return { personal, updatePersonal, getPersonal, clearPersonal };
};