import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Chip
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { TokenSelectProps } from '@/types';
import { tokenSelectStyles } from './TokenSelect.styles';
import { API_CONFIG } from '@/constants';

const TokenSelect: React.FC<TokenSelectProps> = ({ tokens, selectedToken, onChange, label }) => {
  const [open, setOpen] = React.useState(false);

  const handleTokenSelect = (token: any) => {
    onChange(token);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        fullWidth
        variant="outlined"
        sx={tokenSelectStyles.selectButton}
        endIcon={<KeyboardArrowDown />}
      >
        {selectedToken ? (
          <Box sx={tokenSelectStyles.selectedTokenContent}>
            <Avatar
              src={`${API_CONFIG.TOKEN_ICONS_BASE_URL}${selectedToken.currency}.svg`}
              alt={selectedToken.currency}
              sx={tokenSelectStyles.tokenAvatar}
            >
              {selectedToken.currency[0]}
            </Avatar>
            <Box sx={tokenSelectStyles.tokenInfo}>
              <Typography variant="h6" sx={tokenSelectStyles.tokenSymbol}>
                {selectedToken.currency}
              </Typography>
              <Typography variant="body2" sx={tokenSelectStyles.tokenPrice}>
                ${selectedToken.price}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Select token
          </Typography>
        )}
      </Button>

      <Menu
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: tokenSelectStyles.menuPaper,
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
      >
        {tokens.map((token) => (
          <MenuItem 
            key={token.currency} 
            onClick={() => handleTokenSelect(token)}
            sx={tokenSelectStyles.menuItem}
          >
            <ListItemIcon>
              <Avatar
                src={`${API_CONFIG.TOKEN_ICONS_BASE_URL}${token.currency}.svg`}
                alt={token.currency}
                sx={tokenSelectStyles.menuTokenAvatar}
              >
                {token.currency[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" sx={tokenSelectStyles.menuTokenSymbol}>
                  {token.currency}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={tokenSelectStyles.menuTokenPrice}>
                  ${token.price}
                </Typography>
              }
            />
            <Chip 
              label="Popular" 
              size="small" 
              sx={tokenSelectStyles.popularChip}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export { TokenSelect }; 