import { useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import { useVisibility } from '../../ContextProviders/VisibilityContext';

// eslint-disable-next-line import/prefer-default-export
export function FadeInButtonForSpeedDial(props) {
  const { children, distanceFromBottomOfWindow } = props;

  // Get the visibility state from the context.
  const { isVisible } = useVisibility();

  useEffect(() => {
    console.log('isVisible', isVisible);
  }, [isVisible]);

  return (
    <Fade in={isVisible}>
      <Box
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: distanceFromBottomOfWindow,
          left: 'calc(100vw - 5rem)',
          zIndex: 999
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}
