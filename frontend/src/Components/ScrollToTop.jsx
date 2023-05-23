// disable eslint for this file
/* eslint-disable */

import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

const ScrollToTop = (props) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    // if navigation type is pop, do not scroll to top
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
