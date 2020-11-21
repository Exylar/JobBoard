import React from "react";

// reactstrap components
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
  Modal,
  Row,
  Col,
} from "reactstrap";

import axios from "axios";
import { toast } from "react-toastify";
import UIStore from "../../store/UIStore";
import { NavLink } from "react-router-dom";

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cvfile = React.createRef();
    this.lmfile = React.createRef();
  }
  state = {
    exampleModal: false,
    data: null,
    loading: true,
    hasSubscribed: false,
    description: '',
  };

  updateData = async () => {
    if (UIStore.user.id != null) {
      try {
        let apply = await axios.get("/apply/" + this.props.id + "/" + UIStore.user.id);
        this.setState({ data: apply.data, loading: false });
      } catch (e) {
        toast.error("Une erreur est survenue");
      }
    }
    else {
      this.state.loading = false
    }

  }
  async componentDidMount() {
    this.updateData();
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const apply = {
      id_user: UIStore.user.id,
      id_job: this.props.id,
      description: this.state.description
    };
    axios.post(`/apply`, apply).then((res) => {
      this.toggleModal("exampleModal");
      this.state.hasSubscribed = true;
      this.updateData();
      toast.success("Vous avez souscrit à l'offre");
    });
  }

  render() {
    return (
      <>
        {UIStore.user.role == "enterprise" ? (
          <Button color="warning" className="disabled btn-block" type="button">
            Vous ne pouvez souscrire
          </Button>
        ) : this.state.loading ? (
          <Button color="" className="btn-block" type="butto">
            Waiting
          </Button>
        ) : UIStore.user.id == null ? (
          <NavLink to="/auth/login">
            <Button color="primary" className="btn-block" type="button">
              Connectez-vous
            </Button>
          </NavLink>
        ) : this.state.data.length != 0 || this.state.hasSubscribed ? (
          <Button color="warning" className="disabled btn-block" type="button">
            Vous avez déjà souscrit
          </Button>
        ) : (
          <Button
            color="success"
            className="btn-block"
            type="button"
            onClick={() => this.toggleModal("exampleModal")}
          >
            Souscrire à l'offre
          </Button>
        )}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Souscrire à l'offre
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
              <label style={{width: '100%'}}>
                Décrivez vous:<br></br>
                <textarea name='description' style={{width: '100%', minHeight: '150px'}}
                value={this.state.description} onChange={e => {this.setState({description: e.target.value})}}></textarea>
              </label>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              Fermer
            </Button>
            <Button color="success" type="button" onClick={this.handleSubmit}>
              Postuler
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Modals;
