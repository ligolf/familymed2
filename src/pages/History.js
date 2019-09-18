import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { withRouter, Redirect } from 'react-router-dom';
import {
  Typography,
} from '@material-ui/core';

import { find } from 'lodash';
import { compose } from 'recompose';
import HistoryFormat from '../components/HistoryEditor';

const API = process.env.REACT_APP_API || 'http://localhost:3001';

class History extends Component {
  state = {
    loading: false,
    history: [],
    error: null,
  };

  componentDidMount() {
    this.getHistory();
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

  async getHistory() {
    this.setState({ loading: false, history: (await this.fetch('get', '/history')) || [] });
  }

  saveHistory = async (history) => {
    if (history.id) {
      await this.fetch('put', `/history/${history.id}`, history);
    } else {
      await this.fetch('post', '/history', history);
    }

    this.props.history.goBack();
    this.getHistory();
  }

  // async deleteHistory(history) {
  //   if (window.confirm(`Are you sure you want to delete "${history.drName}"`)) {
  //     await this.fetch('delete', `/history/${history.id}`);
  //     this.getHistory();
  //   }
  // }

  renderHistoryEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const history = find(this.state.history, { id: Number(id) });

    if (!history && id !== 'new') return <Redirect to="/history" />;

    // return <HistoryEditor history={hist} onSave={this.saveHist} />;
  };

  render() {

    return (
      <div>
        <Typography variant="display1">Family History</Typography>

        <HistoryFormat />

      </div>
    );
  }
}

export default compose(
  withAuth,
  withRouter,
)(History);
