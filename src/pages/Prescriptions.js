import React, { Component, Fragment } from 'react';
import { withAuth } from '@okta/okta-react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Container, Row, Col } from 'reactstrap';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import PrescriptionEditor from '../components/PrescriptionEditor';
import ErrorSnackbar from '../components/ErrorSnackbar';

const styles = theme => ({
  prescriptions: {
    marginTop: 2 * theme.spacing.unit,
    boxShadow: '0 5px 7px 2px rgba(255, 105, 135, .3)',
    background: 'linear-gradient(45deg, #B3B7F6 30%, #222FF3 90%)',
    padding: '0 30px',

  },
  fab: {
    position: 'absolute',
    bottom: 3 * theme.spacing.unit,
    right: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      bottom: 2 * theme.spacing.unit,
      right: 2 * theme.spacing.unit,
    },
  },
});

const API = process.env.REACT_APP_API || 'http://localhost:3001';

class Prescriptions extends Component {
  state = {
    loading: false,
    prescriptions: [],
    error: null,
  };

  componentDidMount() {
    this.getPrescriptions();
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${await this.props.auth.getAccessToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);

      this.setState({ error });
    }
  }

  async getPrescriptions() {
    this.setState({ loading: false, prescriptions: (await this.fetch('get', '/prescriptions')) || [] });
  }

  savePrescriptions = async (prescriptions) => {
    if (prescriptions.id) {
      await this.fetch('put', `/prescriptions/${prescriptions.id}`, prescriptions);
    } else {
      await this.fetch('post', '/prescriptions', prescriptions);
    }

    this.props.history.goBack();
    this.getPrescriptions();
  }

  async deletePrescriptions(prescriptions) {
    if (window.confirm(`Are you sure you want to delete "${prescriptions.rxName}"`)) {
      await this.fetch('delete', `/doctors/${prescriptions.id}`);
      this.getDoctors();
    }
  }

  renderPrescriptionEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const prescriptions = find(this.state.prescriptions, { id: Number(id) });

    if (!prescriptions && id !== 'new') return <Redirect to="/prescriptions" />;

    return <PrescriptionEditor prescriptions={prescriptions} onSave={this.savePrescriptions} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Fragment>
          <Typography variant="display1">Prescriptions</Typography>
          <br>
          </br>

          <Row>
            <Col>
              <Typography variant="display1">Mom</Typography>
              {this.state.prescriptions.length > 0 ? (
                <Paper elevation={1} className={classes.prescriptions}>
                  <List>
                    {orderBy(this.state.prescriptions, ['updatedAt', 'userName', 'rxName'], ['drPrescribed', 'rxDosage', 'rxUOM', 'rxFrequency'], ['rxPrescribedDate', 'rxNextRefill', 'rxdrNotes']).map(prescriptions => (
                      <ListItem key={prescriptions.id} button component={Link} to={`/prescriptions/${prescriptions.id}`}>
                        <ListItemText
                          primary={prescriptions.rxName}
                          secondary={prescriptions.drPrescribed}
                        // updatedAt && `Updated ${moment(prescriptions.updatedAt).fromNow()}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => this.deletePrescriptions(prescriptions)} color="inherit">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              ) : (
                  !this.state.loading && <Typography variant="subheading">No prescriptions to display</Typography>
                )}
            </Col>
          </Row>
          <Row>
            <Col>
              <br>
              </br>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography variant="display1">Sister</Typography>
              {this.state.prescriptions.length > 0 ? (
                <Paper elevation={1} className={classes.prescriptions}>
                  <List>
                    {orderBy(this.state.prescriptions, ['updatedAt', 'userName', 'rxName'], ['drPrescribed', 'rxDosage', 'rxUOM', 'rxFrequency'], ['rxPrescribedDate', 'rxNextRefill', 'rxdrNotes']).map(prescriptions => (
                      <ListItem key={prescriptions.id} button component={Link} to={`/prescriptions/${prescriptions.id}`}>
                        <ListItemText
                          primary={prescriptions.rxName}
                          secondary={prescriptions.updatedAt && `Updated ${moment(prescriptions.updatedAt).fromNow()}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => this.deletePrescriptions(prescriptions)} color="inherit">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              ) : (
                  !this.state.loading && <Typography variant="subheading">No prescriptions to display</Typography>
                )}
            </Col>
          </Row>
          <Button
            variant="fab"
            color="secondary"
            aria-label="add"
            className={classes.fab}
            component={Link}
            to="/prescriptions/new"
          >
            <AddIcon />
          </Button>
          <Route exact path="/prescriptions/:id" render={this.renderPrescriptionEditor} />
          {this.state.error && (
            <ErrorSnackbar
              onClose={() => this.setState({ error: null })}
              message={this.state.error.message}
            />

          )
          }
        </Fragment>
      </Container>
    )
  }
}

export default compose(
  withAuth,
  withRouter,
  withStyles(styles),
)(Prescriptions);
