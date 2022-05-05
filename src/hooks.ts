import { useEffect, useState } from "react";

export const useApi = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErrored(false);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch(() => {
        setLoading(false);
        setErrored(true);
      });
  }, [url]);

  return { data, loading, errored };
};
