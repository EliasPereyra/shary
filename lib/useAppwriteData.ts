import { useEffect, useState } from "react";

/**
 * El hook es para hacer un fetch y refetch de los datos, ofreciendo tambien la posibilidad de ver si estan cargando los datos.
 *
 * @param fn
 * @returns data, isLoading, reFetchData
 */
export const useAppwriteData = (fn: () => Promise<any>) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fn();
      setData(res);
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
