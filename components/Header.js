import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import Nprogress from 'nprogress';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import Search from '../components/blog/Search'
import '.././node_modules/nprogress/nprogress.css';

Router.onRouteChangeStart=url=>Nprogress.start()
Router.onRouteChangeComplete=url=>Nprogress.done()
Router.onRouteChangeError=url=>Nprogress.done()

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>Blogs</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/contact">
                  <NavLink>Contact</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>
            
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
      {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <>
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink>
              </NavItem>
               <NavItem>
               <Link href="/user/crud/blog">
                 <NavLink className="btn btn-primary text-light">Write a blog</NavLink>
               </Link>
             </NavItem>
            </>
            )}

            
          </Nav>
        </Collapse>
      </Navbar>
      <Search/>
    </>
  );
};

export default Header;