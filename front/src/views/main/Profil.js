import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { toast } from "react-toastify";
import axios from "axios";

class Profil extends React.Component {
  state = { firstname: "", lastname: "", email: "", phone: 0, loading: true };

  async componentDidMount() {
    try {
      let user = await axios.get(`/user/${UIStore.user.id}`);
      this.setState({
        firstname: user.data[0].firstname,
        lastname: user.data[0].lastname,
        email: user.data[0].email,
        phone: user.data[0].phone,
        loading: false,
      });
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  }

  handleChangeFirstname = (event) => {
    this.setState({ firstname: event.target.value });
  };
  handleChangeLastname = (event) => {
    this.setState({ lastname: event.target.value });
  };
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  handleChangePhone = (event) => {
    this.setState({ phone: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const info = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
    };

    axios
      .put(`/user/${UIStore.user.id}`, info)
      .then(() => {
        toast.success("Profil mit à jour");
      })
      .catch(() => {
        toast.error("Erreur de données");
      });
  };

  render() {
    return (
      <>
        <main ref="main">
          <div className="position-relative">
            <section className="section section-lg section-shaped pb-150">
              <div className="shape shape-style-1 shape-primary">
                <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
                <span /> <span />
              </div>
              <Container className="d-flex align-items-center">
                <div className="col px-0">
                  <Row className="align-items-center justify-content-center">
                    <h1 className="text-white font-weight-bolder">
                      Mon profil
                    </h1>
                  </Row>
                </div>
              </Container>
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
          </div>

          <section className="section section-components">
            <Container>
              <Form>
                {this.state.loading ? (
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Nom"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Prénom"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Téléphone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Téléphone"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={this.state.lastname}
                            id="input-first-name"
                            placeholder="Nom"
                            type="text"
                            onChange={this.handleChangeLastname}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={this.state.firstname}
                            id="input-last-name"
                            placeholder="Prénom"
                            type="text"
                            onChange={this.handleChangeFirstname}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={this.state.email}
                            id="input-username"
                            placeholder="Email"
                            type="email"
                            onChange={this.handleChangeEmail}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Téléphone
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={this.state.phone}
                            id="input-email"
                            placeholder="Téléphone"
                            type="text"
                            onChange={this.handleChangePhone}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="9" lg="10"></Col>
                      <Col md="3" lg="2">
                        <FormGroup>
                          <Button
                            className="btn-block"
                            color="success"
                            type="button"
                            onClick={this.handleSubmit}
                          >
                            Valider
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Profil;
