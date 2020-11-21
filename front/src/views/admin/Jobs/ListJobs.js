import React from "react";
import UIStore from "../../../store/UIStore";
import { toast } from "react-toastify";
import axios from "axios";

import {
  Button,
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { NavLink } from "react-router-dom";
import history from "../../../service/history.service";

class ListJobs extends React.Component {
  state = { data: null, loading: true };
  async componentDidMount() {
    this.refreshList();
  }

  handleClick = async (e) => {
    try {
      axios
        .delete("/apply/" + e.target.value)
        .then((res) => {
          toast.success("Applications supprimés");
        })
        .catch((e) => {
          toast.error("Erreur dans la suppressions des applications");
        });
      await axios.delete("/jobs/" + e.target.value).then((res) => {
        toast.success("Job supprimé");
      });
      this.refreshList();
      UIStore.header.refresh();
    } catch (e) {
      toast.error("Une erreur est survenue");
    }
  };

  async refreshList() {
    try {
      let jobs = await axios.get(`/companies/${UIStore.user.id_company}/jobs`);
      this.setState({ data: jobs.data, loading: false });
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue");
    }
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--3" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col sm="9" lg="9">
                      <h3 className="mb-0">List des jobs</h3>
                    </Col>
                    <Col sm="3" lg="3">
                      <NavLink to={"/admin/form"}>
                        <Button className="btn-1 btn-block btn btn-success">
                          {" "}
                          Ajouter
                        </Button>
                      </NavLink>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nom de l'offre</th>
                      <th scope="col">Salaire</th>
                      <th scope="col">Temps de travail</th>
                      <th scope="col">Type de contrat</th>
                      <th scope="col">Modifier</th>
                      <th scope="col">Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loading ? (
                      <tr>
                        <th>Loading</th>
                      </tr>
                    ) : (
                      this.state.data.map((job) => (
                        <tr key={job.id}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <span className="mb-0 text-sm">{job.name}</span>
                            </Media>
                          </th>
                          <td>{job.wages}</td>
                          <td>{job.working_time}</td>
                          <td>{job.contract}</td>
                          <td>
                            <NavLink to={"/admin/modifier/" + job.id}>
                              <Button className="btn-1 ml-1 btn btn-warning">
                                Modifier
                              </Button>
                            </NavLink>
                          </td>
                          <td>
                            <Button
                              onClick={this.handleClick}
                              className="btn-1 ml-1 btn btn-danger"
                              value={job.id}
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ListJobs;
