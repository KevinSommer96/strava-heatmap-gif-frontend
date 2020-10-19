import React, { useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  useEffect(() => {
    axios
      .get('http://localhost:8000/')
      .then((res) => window.location.replace(res.data.url));
  }, []);

  return <div>not authorised</div>;
};

export default Test;
