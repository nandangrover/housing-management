import { useState, useEffect } from "react";

export const DataProvider: any = (url: string) => {
  const [data, setData] = useState<Array<any> | Array<any>>([]);

  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};