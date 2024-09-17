"use client";

import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SideNav,
  SideNavItems,
  SideNavLink,
  Content,
} from "@carbon/react";
import { Switcher } from "@carbon/icons-react";

interface UIShellProps {
  children: React.ReactNode;
}

const UIShell: React.FC<UIShellProps> = ({ children }) => {
  return (
    <HeaderContainer
      render={() => (
        <>
          <Header aria-label="Carbon App">
            <HeaderName href="/" prefix="Carbon">
              App
            </HeaderName>
            <HeaderNavigation aria-label="Carbon App">
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            </HeaderNavigation>
          </Header>
          <SideNav
            aria-label="Side navigation"
            expanded={true}
            isPersistent
            className="fixed left-0 top-12 h-full"
          >
            <SideNavItems>
              <SideNavLink renderIcon={Switcher} href="#">
                Link 1
              </SideNavLink>
              <SideNavLink renderIcon={Switcher} href="#">
                Link 2
              </SideNavLink>
              <SideNavLink renderIcon={Switcher} href="#">
                Link 3
              </SideNavLink>
            </SideNavItems>
          </SideNav>
          <Content className="ml-64 pt-12 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Commitments</h1>
            {children}
          </Content>
        </>
      )}
    />
  );
};

export default UIShell;
