'use client';

import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function TopSlideModal({ open, onClose, children }: Props) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1300,
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* Overlay */}
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: open ? 'rgba(0,0,0,0.5)' : 'transparent',
          transition: '0.3s',
        }}
      />

      {/* Sliding Panel */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          p: 4,
          maxHeight: '80vh',
          overflowY: 'auto',
          transform: open ? 'translateY(0%)' : 'translateY(-100%)',
          transition: 'transform 0.4s ease',
          boxShadow: 6,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Box>
  );
}