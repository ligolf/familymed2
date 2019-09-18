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
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import DoctorEditor from '../components/DoctorEditor';
import ErrorSnackbar from '../components/ErrorSnackbar';
// import { userInfo } from 'os';

const styles = theme => ({
  doctors: {
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

class Doctors extends Component {
  state = {
    loading: false,
    doctors: [],
    error: null,
  };

  componentDidMount() {
    this.getDoctors();
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

  async getDoctors() {
    this.setState({ loading: false, doctors: (await this.fetch('get', '/doctors')) || [] });
  }

  saveDoctors = async (doctors) => {
    if (doctors.id) {
      await this.fetch('put', `/doctors/${doctors.id}`, doctors);
    } else {
      await this.fetch('post', '/doctors', doctors);
    }

    this.props.history.goBack();
    this.getDoctors();
  }

  async deleteDoctors(doctors) {
    if (window.confirm(`Are you sure you want to delete "${doctors.drName}"`)) {
      await this.fetch('delete', `/doctors/${doctors.id}`);
      this.getDoctors();
    }
  }

  renderDoctorEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const doctors = find(this.state.doctors, { id: Number(id) });

    if (!doctors && id !== 'new') return <Redirect to="/doctors" />;

    return <DoctorEditor doctors={doctors} onSave={this.saveDoctors} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="display1">Doctors</Typography>
        {this.state.doctors.length > 0 ? (
          <Paper elevation={1} className={classes.doctors}>
            <List>
              {orderBy(this.state.doctors, ['updatedAt', 'userName', 'drName'], ['drAddress', 'drPhone', 'drEmail', 'drSpeciality'], ['drNotes', 'date']).map(doctors => (
                <ListItem key={doctors.id} button component={Link} to={`/doctors/${doctors.id}`}>
                  <ListItemText
                    primary={doctors.drName}
                    secondary={doctors.updatedAt && `Updated ${moment(doctors.updatedAt).fromNow()}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.deleteDoctors(doctors)} color="inherit">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
            !this.state.loading && <Typography variant="subheading">No doctors to display</Typography>
          )}
        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/doctors/new"
        >
          <AddIcon />
        </Button>
        <Route exact path="/doctors/:id" render={this.renderDoctorEditor} />
        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  withAuth,
  withRouter,
  withStyles(styles),
)(Doctors);
