import React, { useState, useEffect, useRef } from 'react';
import List from '../List/List';
import useFetchData from '../../hooks/useFetchData';
import useInterval from '../../hooks/useInterval';
import './Feed.scss';

const Feed = () => {
  const [stop, setStop] = useState(false);
  const refFeed = useRef(null);
  const interval = useInterval(2000, stop);
  const tweets = useFetchData(interval);

  useEffect(() => {
    window.addEventListener('scroll', e => {
      // console.log(window.scrollY);
      setStop(window.scrollY > 0);
      console.log(
        window.scrollY,
        refFeed.current.clientHeight,
        window.scrollY - refFeed.current.clientHeight,
      );
    });
  }, []);

  return (
    <div className="feed" ref={refFeed}>
      <h2 className="feed__title">Twitter-like feed</h2>
      <List tweets={tweets} />
    </div>
  );
};

export default Feed;
