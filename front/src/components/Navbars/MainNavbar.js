import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import UIStore from "../../store/UIStore";
import { observer } from "mobx-react";

// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

@observer class MyNavbar extends React.Component {

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/argon-react-white.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-right" navbar>
                  <Link to="/job">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                    >
                      <span className="nav-link-inner--text ml-">Job</span>
                    </Button>
                  </Link>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  &nbsp;&nbsp;&nbsp;
                  {this.props.store.user.id == null ?
                    <>
                      <Link to="/auth/login">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                        >
                          <span className="nav-link-inner--text ml-">
                            Login
                          </span>
                        </Button>
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <Link to="/auth/register">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                        >
                          <span className="nav-link-inner--text ml-">
                            Register
                          </span>
                        </Button>
                      </Link>
                    </>
                    : this.props.store.user.role == 'entreprise' ? (
                    <>
                      <Link to="/admin/index">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                        >
                          <span className="nav-link-inner--text ml-">
                            Tableau de bord
                          </span>
                        </Button>
                      </Link>
                      <Button className="btn-neutral btn-icon" color="default">
                        <span className="nav-link-inner--text ml-">
                          Se déconnecter
                        </span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/profil">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                        >
                          <span className="nav-link-inner--text ml-">
                            Mon profil
                          </span>
                        </Button>
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <Button className="btn-neutral btn-icon" color="default" onClick={() => {this.props.store.logout(false)}}>
                        <span className="nav-link-inner--text ml-">Se déconnecter</span>
                      </Button>
                    </>
                  )}
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default ( observer(() => (<MyNavbar store={UIStore} />)));
