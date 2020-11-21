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
  Col
} from "reactstrap";
import {toast} from 'react-toastify'
import UIStore from '../../store/UIStore'
import styles from './register.module.scss'

class Register extends React.Component {
  state = {pass: '', passConfirm: '', firstName: '', lastName: '', email: '', isEnterprise: false,
           entrepriseName: '', entrepriseMail: ''};

  render() {
    const {firstName, lastName, email, pass, passConfirm, isEnterprise} = this.state;
    return (
      <>
        <Col lg="6" md="8">
          <div className={styles.register}>
            <Card className="bg-secondary shadow border-0">
              <CardHeader>
                <h2 style={{marginBottom: '0px'}}>Inscription</h2>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input value={firstName} onChange={(e) => this.setState({firstName: e.target.value})} onKeyPress={this.onEnterPressed}
                            invalid={this.state.firstNameErr} placeholder="Prénom" type="text" />
                      <FormFeedback>{this.state.firstNameErrText}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input value={lastName} onChange={(e) => this.setState({lastName: e.target.value})} onKeyPress={this.onEnterPressed}
                            invalid={this.state.lastNameErr} placeholder="Nom" type="text" />
                      <FormFeedback>{this.state.lastNameErrText}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input invalid={this.state.emailErr} value={email} onChange={this.emailChange} onKeyPress={this.onEnterPressed} placeholder="Email" type="email" autoComplete="new-email"/>
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
                      <Input invalid={this.state.passErr} value={pass} onChange={this.passChange} onKeyPress={this.onEnterPressed} placeholder="Mot de passe" type="password" autoComplete="new-password"/>
                      <FormFeedback>{this.state.passErrText}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input invalid={this.state.passConfirmErr} value={passConfirm} onChange={this.passConfirmChange} onKeyPress={this.onEnterPressed} placeholder="Confirmation" type="password" autoComplete="new-password"/>
                      <FormFeedback>{this.state.passConfirmErrText}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  {isEnterprise &&
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input invalid={this.state.entrepriseNameErr} value={this.state.entrepriseName}
                             onChange={(e) => {this.setState({entrepriseName: e.target.value})}} 
                             onKeyPress={this.onEnterPressed} placeholder="Nom de l'entreprise" type="text" />
                      <FormFeedback>{this.state.entrepriseNameErr}</FormFeedback>
                    </InputGroup>                 
                  </FormGroup>
                  }
                  <FormGroup>
                    <input style={{margin: "10px"}} type="checkbox" name="is-enterprise" checked={isEnterprise} onChange={() => {this.setState({isEnterprise: !isEnterprise})}}/>
                    <label>Je suis une entreprise</label>
                  </FormGroup>
                  <div className="text-center">
                    <Button onClick={this.onSubmit} className="mt-4" color="primary" type="button">
                      Créer un compte
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Col>
      </>
    );
  }

  passChange = (e) => {this.setState({pass: e.target.value})};
  passConfirmChange = (e) => {this.setState({passConfirm: e.target.value})};
  nameChange = (e) => {this.setState({name: e.target.value})};
  emailChange = (e) => {this.setState({email: e.target.value})};
  onEnterPressed = (e) => {
    if (e.key == 'Enter') {
      this.onSubmit();
    }
  }
  onSubmit = async (e) => {
    if (e) e.preventDefault();
    let counter = 0;
    const {firstName, lastName, email, pass, passConfirm, isEnterprise, entrepriseName} = this.state;
    this.setState({nameErr: false, emailErr: false, passErr: false, passConfirmErr: false})

    if (!firstName) {counter++; this.setState({firstNameErr: true, firstNameErrText: 'Nom Invalide'});}
    if (!lastName) {counter++; this.setState({lastNameErr: true, lastNameErrText: 'Nom Invalide'});}
    if (!email) {counter++; this.setState({emailErr: true, emailErrText: 'Mail invalide'});}
    if (!pass) {counter++; this.setState({passErr: true, passErrText: 'Mot de passe invalide'});}
    if (pass != passConfirm) {counter++; this.setState({passConfirmErr: true, passConfirmErrText: 'Les mots de passe sont différents'})}
    if (counter) return;

    try {
      await UIStore.register(firstName, lastName, email, pass, isEnterprise, entrepriseName)
    } catch (e) {
      if (e.status === 500) {
        toast.error('Une erreur est survenue');
      } else if (e.status === 400) {
        if (e.data === 'Username exists') {
          this.setState({nameErr: true, nameErrText: 'Ce nom est déjà utilisé'});
        } else if (e.data === 'Mail exists') {
          this.setState({emailErr: true, emailErrText: 'Cette addresse email est déjà utilisée'});
        }
      } else {
        toast.error('Une erreur est survenue');
      }
    }
  }
}

export default Register;
