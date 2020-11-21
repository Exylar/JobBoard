import React from "react";

import { toast } from "react-toastify";
import axios from "axios";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Media,
  Form,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";

import history from "../../../service/history.service";

import Header from "components/Headers/Header.js";

class ListJobs extends React.Component {
  state = {
    name: "",
    description: "",
    wages: 0,
    working_time: 0,
    contract: "",
    city: "",
    country: "",
  };
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };
  handleChangeDescripiton = (event) => {
    this.setState({ description: event.target.value });
  };
  handleChangeWages = (event) => {
    this.setState({ wages: event.target.value });
  };
  handleChangeWorkingTime = (event) => {
    this.setState({ working_time: event.target.value });
  };
  handleChangeContract = (event) => {
    this.setState({ contract: event.target.value });
  };
  handleChangeCity = (event) => {
    this.setState({ city: event.target.value });
  };
  handleChangeCountry = (event) => {
    this.setState({ country: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const job = {
      name: this.state.name,
      description: this.state.description,
      wages: this.state.wages,
      working_time: this.state.working_time,
      country: this.state.country,
      city: this.state.city,
      contract: this.state.contract,
    };

    axios
      .post(`/jobs`, job)
      .then((res) => {
        history.push("/admin/list");
        toast.success("Job ajouté");
      })
      .catch((e) => {
        toast.error("Vous n'avez pas renseigné toutes les données");
      });
  };

  render() {
    return (
      <>
        <Header />
        <Container className="mt--3" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Ajouter un job</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label> Intitulé du poste </label>
                          <Input
                            className="form-control-alternative shadow"
                            name="name"
                            placeholder="Intitulé du post"
                            type="text"
                            onChange={this.handleChangeName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label> Salaire </label>
                          <Input
                            className="form-control-alternative shadow"
                            name="wages"
                            placeholder="Salaire"
                            type="number"
                            onChange={this.handleChangeWages}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label> Temps de travail </label>
                          <Input
                            className="form-control-alternative shadow"
                            name="working_time"
                            placeholder="Temps de travail"
                            type="number"
                            onChange={this.handleChangeWorkingTime}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label> Type de contrat </label>
                          <Input
                            className="form-control-alternative shadow"
                            name="contract"
                            placeholder="Type de contrat"
                            type="text"
                            onChange={this.handleChangeContract}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label> Ville </label>
                          <Input
                            className="form-control-alternative shadow"
                            name="city"
                            placeholder="Ville"
                            type="text"
                            onChange={this.handleChangeCity}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label> Pays </label>
                          <Input
                            className="form-control-alternative shadow"
                            name="country"
                            placeholder="Pays"
                            type="text"
                            onChange={this.handleChangeCountry}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label> Description</label>
                          <Input
                            className="form-control-alternative shadow"
                            name="descritpion"
                            placeholder="Description"
                            type="textarea"
                            rows="10"
                            onChange={this.handleChangeDescripiton}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="10"></Col>
                      <Col lg="2">
                        <Button
                          className="btn-block"
                          color="success"
                          type="button"
                          onClick={this.handleSubmit}
                        >
                          Valider
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ListJobs;
