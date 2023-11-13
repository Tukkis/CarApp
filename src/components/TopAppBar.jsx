import { AppBar, Typography } from '@mui/material'

export default function TopAppBar() {
  return (
    <>
      <AppBar position='static'>
        <Typography variant='h6'>
          Carshop
        </Typography>
      </AppBar>
    </>
  );
}