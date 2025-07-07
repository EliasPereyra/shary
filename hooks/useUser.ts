import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

import { getCurrentUser } from "@/services/appwrite";

/**
 * El hook devuelve el documento de un usuario que esta relacionado con la cuenta con la que se registro.
 * La cuenta de Appwrite no devuelve datos personalizados, para ello hay que relacionarlo con un documento en la base de datos.
 *
 * @returns user
 */
export const useUser = () => {
  const [user, setUser] = useState<Models.Document>({} as Models.Document);

  const getUser = async () => {
    try {
      const user = await getCurrentUser();

      setUser(user as Models.Document);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return user;
};
