import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import NavLink from './NavLink';
import SavingsIcon from '@mui/icons-material/Savings';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Suspense } from 'react';
import ExpensesNavLink from './ExpensesNavLink';
import IncomeNavLink from './IncomeNavLink';
import styles from './NavLink.module.css';

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
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'center', flex: '1' }}
        >
          <Suspense fallback={<NavBarFallback />}>
            <NavLink href="/dashboard" Icon={DashboardIcon} text="Dashboard" />
            <ExpensesNavLink />
            <IncomeNavLink />
            <NavLink href="/savings" Icon={SavingsIcon} text="Savings" />
            <NavLink href="/settings" Icon={SettingsIcon} text="Settings" />
          </Suspense>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

function NavBarFallback() {
  return (
    <a className={styles.link} aria-hidden style={{ visibility: 'hidden' }}>
      <MonetizationOnIcon className={styles.icon} />
      <span className={styles.label}>Expenses</span>
    </a>
  );
}
