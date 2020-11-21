import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import UIStore from "../../store/UIStore";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
  Navbar,
  Container,
  Media,
} from "reactstrap";
import { toast } from "react-toastify";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {UIStore.user.firstName + " " + UIStore.user.lastName}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bienvenue!</h6>
                  </DropdownItem>
                  <NavLink to="/admin/company_profile">
                    <DropdownItem>
                      <span>Profil Entreprise</span>
                    </DropdownItem>
                  </NavLink>
                  <NavLink to="/admin/profile">
                    <DropdownItem>
                      <span>Profil</span>
                    </DropdownItem>
                    </NavLink>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }

  logout = async () => {
    try {
      await UIStore.logout();
    } catch (e) {
      toast.error("une erreur est survenue");
    }
  };
}

export default AdminNavbar;
