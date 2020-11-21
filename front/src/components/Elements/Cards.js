import React from "react";
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./test.scss";


class Cards extends React.Component {
  convertToDate(value) {
    const date = new Date(value)

    return (date.getDay().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString() + " " + date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString())
  }

  render() {
    const { data } = this.props;
    return (
      <>
        {!data ? (
          <Card className="shadow load loadingCell">
            <CardBody>
              <CardTitle>Loading</CardTitle>
              <CardText>Loading</CardText>
            </CardBody>
          </Card>
        ) : (
          <Card className="shadow">
            <CardBody>
              <CardTitle className="font-weight-bold">{this.props.data.name}</CardTitle>
              <CardText className="font-weight-bold">{this.props.data.id_company.name}</CardText>
              <CardText className="font-weight-bold">{this.props.data.contract} | {this.props.data.city} ({this.props.data.country}) | Publié le {this.convertToDate(this.props.data.createdAt)}
              </CardText>
              <Link to={"/ad/" + this.props.data.id}>
                <Button color="primary">Voir le poste</Button>
              </Link>
            </CardBody>
          </Card>
        )}
      </>
    );
  }
}

export default Cards;
