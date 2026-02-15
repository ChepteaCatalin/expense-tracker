import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import NavLink from './NavLink';
import SavingsIcon from '@mui/icons-material/Savings';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function NavBar() {
  return (
    <AppBar
      component="nav"
      position="fixed"
      color="primary"
      sx={{
        top: 'auto',
        bottom: 0,
        background: 'linear-gradient(to top, #1a1a1a, #212121)',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Toolbar
        sx={{ '&.MuiToolbar-root': { minHeight: '64px', p: '8px 16px' } }}
      >
        <Grid container justifyContent="center" flex="1" spacing={2}>
          <NavLink href="/expenses" Icon={MonetizationOnIcon} text="Expenses" />
          <NavLink href="/savings" Icon={SavingsIcon} text="Savings" />
          <NavLink href="/settings" Icon={SettingsIcon} text="Settings" />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
