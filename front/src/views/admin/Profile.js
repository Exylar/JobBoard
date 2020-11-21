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

import UserHeader from "components/Headers/UserHeader.js";

class Profile extends React.Component {
  state = { data: null, loading: true };
  async componentDidMount() {
    try {
      let user = await axios.get("/user/" + this.props.match.params.id);
      this.setState({ data: user.data, loading: false });
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  }
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--3" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Profil</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Information Utilisateur
                    </h6>
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                defaultValue={this.state.data[0].lastname}
                                id="input-first-name"
                                placeholder="Nom"
                                type="text"
                                disabled
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
                                defaultValue={this.state.data[0].firstname}
                                id="input-last-name"
                                placeholder="Prénom"
                                type="text"
                                disabled
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
                                defaultValue={this.state.data[0].email}
                                id="input-username"
                                placeholder="Email"
                                type="email"
                                disabled
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
                                defaultValue={this.state.data[0].phone}
                                id="input-email"
                                placeholder="Téléphone"
                                type="text"
                                disabled
                              />
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
