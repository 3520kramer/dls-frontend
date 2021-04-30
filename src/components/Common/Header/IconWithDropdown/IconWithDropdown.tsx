import React, { useState, useEffect } from 'react';
import MenuMUI from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

interface IProps{
  children: React.ReactNode,
  buttonIcon: React.ReactNode,
  buttonAriaLabel: string,
  className: string,
}

const Menu: React.FC<IProps> = (props: IProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    
    useEffect(() => {
        console.log("anchorEl", anchorEl);
    },[anchorEl]);
    
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
            <IconButton
                aria-label={props.buttonAriaLabel}
                color="inherit"
                className={props.className}
                onClick={handleMenu}
            >
                {props.buttonIcon}
            </IconButton>
            <MenuMUI
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                open={isOpen}
                onClose={handleClose}
            >
                {props.children}
            </MenuMUI>
        </>
    )
}

export default Menu;
