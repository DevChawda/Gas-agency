import { useEffect, useState } from "react";

// Type the endpoint as a string and the interval as an optional number (default value of 30000)
export function useLiveData(endpoint: string, interval: number = 30000) {
  const [data, setData] = useState<any>(null); // You can replace `any` with a more specific type if known

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endpoint);
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [endpoint, interval]);

  return data;
}
