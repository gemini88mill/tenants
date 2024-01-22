import { useCallback, useState } from "react";


const initialPersonal = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  email: "",
  phone: "",
};

export type PersonalInputData = {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
};

export const usePersonal = () => {
  const [personal, setPersonal] = useState<PersonalInputData>(initialPersonal);

  const updatePersonal = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string) => {
    setPersonal((prev) => ({...prev, [key]: e.target.value}));
  }, []);

  const getPersonal = useCallback(() => {
    return personal;
  }, [personal]);

  const clearPersonal = useCallback(() => {
    setPersonal(initialPersonal);
  }, []);

  return { personal, updatePersonal, getPersonal, clearPersonal };
};