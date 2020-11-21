import React from "react";

import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  CardText,
} from "reactstrap";

import Modals from "../../components/Elements/Modals.js";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./advert.scss";

class Advert extends React.Component {
  state = { data: null, loading: true };

  convertToDate(value) {
    const date = new Date(value);

    return (
      date.getDay().toString() +
      "/" +
      date.getMonth().toString() +
      "/" +
      date.getFullYear().toString() +
      " " +
      date.getHours().toString() +
      ":" +
      date.getMinutes().toString() +
      ":" +
      date.getSeconds().toString()
    );
  }

  async componentDidMount() {
    try {
      let job = await axios.get("/jobs/" + this.props.match.params.id);
      let company = await axios.get("/companies/" + job.data[0].id_company);

      this.setState({ data: job.data, company: company.data, loading: false });
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  }
  render() {
    return (
      <>
        <main ref="main">
          <div className="position-relative">
            <section className="section section-lg section-shaped pb-100">
              <div className="shape shape-style-1 shape-primary">
                <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
                <span /> <span />
              </div>
              <br></br>
              <Container className="d-flex align-items-center">
                <div className="col px-0">
                  <Row className="align-items-center justify-content-center">
                    {this.state.loading ? (
                      <h2 className="mb-0">Loading</h2>
                    ) : (
                      <h1 className="text-white  font-weight-bolder">
                        {this.state.data[0].name}
                      </h1>
                    )}
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
              <Row>
                <Col lg="8">
                  <FormGroup>
                    <Card className="shadow">
                      <CardBody>
                        <CardTitle className="font-weight-bold">
                          {" "}
                          Information du poste
                        </CardTitle>
                        {this.state.loading ? (
                          <CardText>Loading</CardText>
                        ) : (
                          <div>
                            <CardText>
                              Temps de travail:{" "}
                              {this.state.data[0].working_time}h
                            </CardText>
                            <CardText>
                              Salaire: {this.state.data[0].wages} €
                            </CardText>
                            <CardText>
                              {this.state.data[0].contract} |{" "}
                              {this.state.data[0].city} (
                              {this.state.data[0].country}) | Publié le{" "}
                              {this.convertToDate(this.state.data[0].createdAt)}
                            </CardText>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <Card className="shadow">
                      <CardBody>
                        <CardTitle className="font-weight-bold">
                          Information entreprises
                        </CardTitle>
                        {this.state.loading ? (
                          <CardText>Loading</CardText>
                        ) : (
                          <div>
                            <CardText>
                              Nom : {this.state.company[0].name}
                            </CardText>
                            <CardText>
                              Contact : {this.state.company[0].email}
                            </CardText>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="8">
                  <FormGroup>
                    <Card className="shadow">
                      <CardBody>
                        <CardTitle className="font-weight-bold">
                          Description du poste
                        </CardTitle>
                        {this.state.loading ? (
                          <CardText>Loading</CardText>
                        ) : (
                          <CardText className="test">{this.state.data[0].description}</CardText>
                        )}
                      </CardBody>
                    </Card>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="5"></Col>
                <Col lg="3">
                  <Modals id={this.props.match.params.id}></Modals>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Advert;
