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

import axios from "axios";
import { toast } from "react-toastify";

import UserHeader from "components/Headers/UserHeader.js";
import UIStore from "../../store/UIStore";

class Profile extends React.Component {
  state = { name: "", email: "", phone: 0, loading: true };

  async componentDidMount() {
    try {
      let company = await axios.get(`/companies/${UIStore.user.id_company}`);
      console.log(company.data[0]);
      this.setState({
        name: company.data[0].name,
        email: company.data[0].email,
        phone: company.data[0].phone,
        loading: false,
      });
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
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
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
    };

    axios
      .put(`/companies/${UIStore.user.id_company}`, info)
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
        <UserHeader />
        <Container className="mt--3" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Profil Entreprise </h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Information de contact de l'entreprise
                    </h6>
                    {this.state.loading ? (
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="12">
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
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Nom
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={this.state.name}
                                id="input-first-name"
                                placeholder="Nom"
                                type="text"
                                onChange={this.handleChangeName}
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
