import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const Logo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '0.5rem' : '1rem',
        textAlign: 'center',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}
    >
      {/* Main HIZE Logo */}
      <Box
        sx={{
          position: 'relative',
          width: isMobile ? '120px' : '180px',
          height: isMobile ? '120px' : '180px',
          marginBottom: '0.5rem',
        }}
      >
        {/* Outer Circle */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `4px solid ${theme.palette.primary.main}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner Circle */}
          <Box
            sx={{
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              border: `3px solid ${theme.palette.secondary.main}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="span"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}
            >
              HIZE
            </Typography>
            <Typography
              variant={isMobile ? 'caption' : 'body2'}
              component="span"
              sx={{
                fontWeight: 'medium',
                color: theme.palette.text.secondary,
                lineHeight: 1,
              }}
            >
              IEEE CS KPRIET
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tagline */}
      <Typography
        variant={isMobile ? 'caption' : 'body2'}
        sx={{
          color: theme.palette.text.secondary,
          fontStyle: 'italic',
          maxWidth: '300px',
          margin: '0 auto',
        }}
      >
        Empowering Innovation Through Technology
      </Typography>
    </Box>
  );
};

export default Logo;
