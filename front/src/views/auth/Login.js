import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UIStore from "../../store/UIStore";

import styles from "./login.module.scss";

class Login extends React.Component {
  state = {
    email: "",
    pass: "",
    remember: true,
    emailErr: false,
    passErr: false,
    emailErrText: "",
    passErrText: "",
  };

  render() {
    const { email, pass, remember } = this.state;

    return (
      <>
        <Col lg="5" md="7">
          <div className={styles.login}>
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent">
                <h2 style={{ marginBottom: "0" }}>Se connecter</h2>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={this.onSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={email}
                        onChange={this.emailChange}
                        onKeyPress={this.inputKeyPressed}
                        placeholder="Email"
                        type="email"
                        autoComplete="new-email"
                        invalid={this.state.emailErr}
                      />
                      <FormFeedback>{this.state.emailErrText}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={pass}
                        onChange={this.passChange}
                        onKeyPress={this.inputKeyPressed}
                        invalid={this.state.passErr}
                        placeholder="Mot de passe"
                        type="password"
                        autoComplete="new-password"
                      />
                      <FormFeedback>{this.state.passErrText}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <div
                    onClick={this.rememberChange}
                    className="custom-control custom-control-alternative custom-checkbox"
                  >
                    <input
                      style={{ marginRight: "10px" }}
                      id=" customCheckLogin"
                      type="checkbox"
                      checked={remember}
                      onChange={() => {}}
                    />
                    <label className="" htmlFor="customCheckLogin">
                      <span className="text-muted">Se souvenir de moi</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={this.onSubmit}
                      className="my-4"
                      color="primary"
                      type="button"
                    >
                      Se connecter
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Mot de passe oublié ?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <Link to="/auth/register">
                <small>Créer un compte</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
  //---------------------------------------------------------//
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  passChange = (e) => {
    this.setState({ pass: e.target.value });
  };
  rememberChange = (e) => {
    this.setState({ remember: !this.state.remember });
  };
  inputKeyPressed = (e) => {
    if (e.key == "Enter") {
      this.onSubmit();
    }
  };
  onSubmit = async (e) => {
    const { email, pass, remember } = this.state;
    let counter = 0;
    this.setState({ emailErr: false, passErr: false });
    if (e) e.preventDefault();

    if (!email) {
      counter++;
      this.setState({ emailErr: true, emailErrText: "Mail invalide" });
    }
    if (!pass) {
      counter++;
      this.setState({ passErr: true, passErrText: "Mot de passe invalide" });
    }
    if (counter > 0) return;

    try {
      await UIStore.login(email, pass, remember);
      this.setState({ email: "", pass: "", remember: false });
    } catch (e) {
      if (e.status === 403 || e.status === 404)
        this.setState({
          passErr: true,
          passErrText: "Mail ou mot de passe invalide",
        });
      else toast.error("Une erreur est survenue");
    }
  };
}

export default Login;
