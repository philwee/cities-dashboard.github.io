// disable eslint for this file
/* eslint-disable */
import { styled } from '@mui/material/styles';
import { MenuList } from '@mui/material';

import MenuItemAsNavLink from './MenuItemAsNavLink';

import jsonData from '../../home_data.json';

export const NavLinkBehavior = {
    toNewPage: "toNewPage",
    scrollTo: "scrollTo"
}

const StyledMenuList = styled(MenuList)(({ theme }) => ({
    // Make these items display on the same line on large display
    "& .MuiMenuItem-root": {
        [theme.breakpoints.up("lg")]: {
            display: "inline-flex !important",
            height: "100%",
        },
    }
}));

export default function NavBar(props) {
    const { currentPage } = props;

    return (
        <StyledMenuList sx={{ height: "100%", p: 0 }}>
            {
                // If the current page is homepage, then display ABOUT link
                // If not homepage (implies in project page at this point), display Back to Home link and the name of this project
                currentPage === "home" ?
                    <MenuItemAsNavLink
                        behavior={NavLinkBehavior.scrollTo}
                        scrollToSectionID={jsonData.about.id}
                        analyticsOriginID="navbar"
                    />
                    :
                    <MenuItemAsNavLink
                        behavior={NavLinkBehavior.toNewPage}
                        to="/"
                        analyticsOriginID="navbar"
                    />
            }
            <MenuItemAsNavLink
                behavior={NavLinkBehavior.scrollTo}
                scrollToSectionID={jsonData.getInTouch.id}
                analyticsOriginID="navbar"
            />
        </StyledMenuList>
    );
}