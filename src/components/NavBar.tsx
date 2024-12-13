import React from 'react';


import homeIcon from "@/assets/images/icons/li_home.png";
import dollarIcon from "@/assets/images/icons/dollar-sign.png";
import favorisIcon from "@/assets/images/icons/book-marked.png";
import profilIcon from "@/assets/images/icons/li_user.png"; 



const Navbar: React.FC = () => {
  return (
    <nav style={navbarStyle}>
      <NavItem iconSrc={homeIcon} label="Accueil" />
      <NavItem iconSrc={dollarIcon} label="Transactions" />
      <NavItem iconSrc={favorisIcon} label="Favoris" />
      <NavItem iconSrc={profilIcon} label="Profil" />
    </nav>
  );
};

interface NavItemProps {
  iconSrc: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ iconSrc, label }) => {
  return (
    <div style={navItemContainerStyle}>
      <img 
        src={iconSrc} 
        alt={label} 
        style={navItemIconStyle} 
      />
      <span style={navItemLabelStyle}>{label}</span>
    </div>
  );
};

const navbarStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  padding: '8px 0',
  width: '100%',
  maxWidth: '320px',
  borderRadius: '8px',
  zIndex: 9999,
};

const navItemContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const navItemIconStyle: React.CSSProperties = {
  width: '22px',
  height: '22px',
  objectFit: 'contain',
};

const navItemLabelStyle: React.CSSProperties = {
  color: '#000',
  fontSize: '12px',
  marginTop: '3px',
};

export default Navbar;