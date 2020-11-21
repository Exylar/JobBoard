import React from "react";

import { toast } from "react-toastify";
import axios from "axios";
import UIStore from "../../../store/UIStore";

import {
  Button,
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { NavLink } from "react-router-dom";

class ListApplications extends React.Component {
  state = { data: null, loading: true };
  async componentDidMount() {
    try {
      let jobs = await axios.get(
        `/companies/${UIStore.user.id_company}/applications`
      );
      this.setState({ data: jobs.data, loading: false });
    } catch (e) {
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
                  <h3 className="mb-0">List des applications</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nom de l'offre</th>
                      <th scope="col">Nom de l'applicataitre</th>
                      <th scope="col">Voir l'offre</th>
                      <th scope="col">Voir le profil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loading ? (
                      <tr>
                        <th>Loading</th>
                      </tr>
                    ) : (
                      this.state.data.map((job) => (
                        <tr>
                          <th scope="row">
                            <Media className="align-items-center">
                              <span className="mb-0 text-sm">
                                {job.id_job.name}
                              </span>
                            </Media>
                          </th>
                          <td>
                            {job.id_user.firstname + " " + job.id_user.lastname}
                          </td>
                          <td>
                            <NavLink to={"/ad/" + job.id_job.id}>
                              <Button className="btn-1 btn btn-primary">
                                Voir l'offre
                              </Button>
                            </NavLink>
                          </td>
                          <td>
                            <NavLink to={"/admin/profile/" + job.id_user.id}>
                              <Button className="btn-1 btn btn-primary">
                                Voir le profil
                              </Button>
                            </NavLink>
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

export default ListApplications;
