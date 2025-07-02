import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

/**
 * El hook es para hacer un fetch y refetch de los datos, ofreciendo tambien la posibilidad de ver si estan cargando los datos.
 *
 * @param fn
 * @returns data, isLoading, reFetchData
 */
export const useAppwriteData = (
  documents: Promise<Models.Document[] | undefined>
) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const docs = await documents;
      setData(docs!);
    } catch (error) {
      throw new Error("Error al obtener los datos", {
        cause: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetchData = () => fetchData();

  return {
    data,
    isLoading,
    reFetchData,
  };
};
