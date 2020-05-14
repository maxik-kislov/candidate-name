import { useEffect, useState } from 'react';

const API_BASE_URL =
  'https://magiclab-twitter-interview.herokuapp.com/andreupifarre';

const useFetchData = (trigger, count = 20, resetFromId = null) => {
  const [results, setResults] = useState([]);
  const [afterId, setAfterId] = useState(0);

  // stop fething on scrolling
  // start fetching when on top
  // bottom request for tweetsbefore that id

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';
        if (afterId > 0) {
          url = `${API_BASE_URL}/api?count=${count}&afterId=${afterId}`;
        } else {
          url = `${API_BASE_URL}/api?count=${count}`;
        }
        const response = await fetch(url);

        // if (afterId >= resetFromId) {
        //   await fetch(`${API_BASE_URL}/reset`);
        //   setAfterId(0);
        //   setResults([]);
        //   return;
        // }

        if (response.ok) {
          const data = await response.json();

          if (data.length > 0) {
            setAfterId(data[0].id);
          }
          setResults([...data, ...results]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [trigger, count]);

  return results;
};

export default useFetchData;
