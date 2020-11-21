import React from "react";

import { toast } from "react-toastify";
import axios from "axios";

// reactstrap components
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
// core components
import Header from "components/Headers/Header.js";
import history from "../../../service/history.service";

class ListJobs extends React.Component {
  state = {
    name: "",
    description: "",
    wages: 0,
    working_time: 0,
    id_company: 1,
    contract: "",
    city: "",
    country: "",
  };

  async componentDidMount() {
    try {
      let job = await axios.get("/jobs/" + this.props.match.params.id);
      this.setState({
        name: job.data[0].name,
        description: job.data[0].description,
        wages: job.data[0].wages,
        working_time: job.data[0].working_time,
        contract: job.data[0].contract,
        city: job.data[0].city,
        country: job.data[0].country,
        id_company: 1,
        loading: false,
      });
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  }
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
      id_company: this.state.id_company,
      country: this.state.country,
      city: this.state.city,
      contract: this.state.contract,
    };

    axios
      .put(`/jobs/` + this.props.match.params.id, job)
      .then(() => {
        toast.success("Job mit à jour");
        history.push("/admin/list");
      })
      .catch(() => {
        toast.error("Vous n'avez pas rensigné des données correctes");
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
                  <h3 className="mb-0">Modifier un job</h3>
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
                            value={this.state.name}
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
                            value={this.state.wages}
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
                            value={this.state.working_time}
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
                            value={this.state.contract}
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
                            value={this.state.city}
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
                            value={this.state.country}
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
                            value={this.state.description}
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
