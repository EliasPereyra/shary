import { getAccount } from "@/services/appwrite";
import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

/**
 * El hook devuelve el documento de un usuario que esta relacionado con la cuenta con la que se registro.
 * La cuenta de Appwrite no devuelve datos personalizados, para ello hay que relacionarlo con un documento en la base de datos.
 *
 * @returns user
 */
export const useUser = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | undefined>(
    undefined
  );

  useEffect(() => {
    getAccount()
      .then((res) => {
        if (res) {
          setUser(res);
        } else {
          setUser(undefined);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return user;
};
