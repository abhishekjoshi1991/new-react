import React, {useState}   from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MoneyIcon from '@mui/icons-material/Money';
import SellIcon from '@mui/icons-material/Sell';
import { useLocation } from 'react-router-dom'

const drawerWidth = 240;

export default function Sidenav() {
  const [url, setUrl] =  useState()
  const location = useLocation();


  return (
    <div id="layoutSidenav_nav">
    <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
          <ListItem disablePadding style={location.pathname=='/'  ? {backgroundColor: "#E3E3DB"} : {}}>
            <ListItemButton>
                <HomeIcon/>
            <Link className="nav-link" to="/"><ListItemText primary='Dashboard' /></Link>
            
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={location.pathname=='/user_income'  ? {backgroundColor: "#E3E3DB"} : {}}>
            <ListItemButton>
                <MoneyIcon/>
            <Link className="nav-link" to="/user_income"><ListItemText primary='My Income' /></Link>
            
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={location.pathname=='/user_expense'  ? {backgroundColor: "#E3E3DB"} : {}}>
            <ListItemButton>
                <MoneyIcon/>
            <Link className="nav-link" to="/user_expense"><ListItemText primary='My Expense' /></Link>
            
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding style={location.pathname=='/income_category'  ? {backgroundColor: "#E3E3DB"} : {}}>
            <ListItemButton>
                <MoneyIcon/>
            <Link className="nav-link" to="/income_category"><ListItemText primary='Income Category' /></Link>
            
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={location.pathname=='/expense_category'  ? {backgroundColor: "#E3E3DB"} : {}}>
            <ListItemButton>
                <SellIcon/>
            <Link className="nav-link" to="/expense_category"><ListItemText primary='Expense Category' /></Link>
            
            </ListItemButton>
          </ListItem>
        
      </List>
      
    </Box>
  </Drawer>
  </div>

        // <div id="layoutSidenav_nav">
        //     <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        //         <div className="sb-sidenav-menu">
        //             <div className="nav">
                        
        //                 <Link className="nav-link" to="/">Dashboard</Link>

                            
                        
        //                 <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
        //                     <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
        //                     Categories
        //                     <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
        //                 </a>
        //                 <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
        //                     <nav className="sb-sidenav-menu-nested nav">
        //                         <Link className="nav-link" to="/income_category">Income Category</Link>
                                
        //                         <Link className="nav-link" to="/expense_category">Expense Category</Link>
                                
        //                     </nav>
        //                 </div>
        //             </div>
        //         </div>    
        //         <div className="sb-sidenav-footer">
        //             <div className="small">Logged in as:</div>
        //             Start Bootstrap
        //         </div>
        //     </nav>
        // </div>
  )
}
