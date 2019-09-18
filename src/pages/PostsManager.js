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
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import PostEditor from '../components/PostEditor';
import ErrorSnackbar from '../components/ErrorSnackbar';

const styles = theme => ({
  posts: {
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

class PostsManager extends Component {
  state = {
    loading: false,
    posts: [],
    error: null,
  };

  componentDidMount() {
    this.getPosts();
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

  async getPosts() {
    this.setState({ loading: false, posts: (await this.fetch('get', '/posts')) || [] });
  }

  savePost = async (post) => {
    if (post.id) {
      await this.fetch('put', `/posts/${post.id}`, post);
    } else {
      await this.fetch('post', '/posts', post);
    }

    this.props.history.goBack();
    this.getPosts();
  }

  async deletePost(post) {
    if (window.confirm(`Are you sure you want to delete "${post.title}"`)) {
      await this.fetch('delete', `/posts/${post.id}`);
      this.getPosts();
    }
  }

  renderPostEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const post = find(this.state.posts, { id: Number(id) });

    if (!post && id !== 'new') return <Redirect to="/posts" />;

    return <PostEditor post={post} onSave={this.savePost} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Fragment>
          <Typography variant="display1">Notes</Typography>
          <Row>
            <Col>
              <Typography variant="display2">Mom</Typography>
              {this.state.posts.length > 0 ? (
                <Paper elevation={1} className={classes.posts}>
                  <List>
                    {orderBy(this.state.posts, ['updatedAt', 'title'], ['desc', 'asc']).map(post => (
                      <ListItem key={post.id} button component={Link} to={`/posts/${post.id}`}>
                        <ListItemText
                          primary={post.title}
                          secondary={post.updatedAt && `Updated ${moment(post.updatedAt).fromNow()}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => this.deletePost(post)} color="inherit">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              ) : (
                  !this.state.loading && <Typography variant="subheading">No posts to display</Typography>
                )}
            </Col>
            <Col>
              <Typography variant="display2">Sister</Typography>
              {this.state.posts.length > 0 ? (
                <Paper elevation={1} className={classes.posts}>
                  <List>
                    {orderBy(this.state.posts, ['updatedAt', 'title'], ['desc', 'asc']).map(post => (
                      <ListItem key={post.id} button component={Link} to={`/posts/${post.id}`}>
                        <ListItemText
                          primary={post.title}
                          secondary={post.updatedAt && `Updated ${moment(post.updatedAt).fromNow()}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => this.deletePost(post)} color="inherit">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              ) : (
                  !this.state.loading && <Typography variant="subheading">No posts to display</Typography>
                )}
            </Col>
          </Row>
          <Button
            variant="fab"
            color="secondary"
            aria-label="add"
            className={classes.fab}
            component={Link}
            to="/posts/new"
          >

            <AddIcon />
          </Button>
          <Route exact path="/posts/:id" render={this.renderPostEditor} />
          {this.state.error && (
            <ErrorSnackbar
              onClose={() => this.setState({ error: null })}
              message={this.state.error.message}
            />

          )}
        </Fragment>
      </Container>
    );
  }
}

export default compose(
  withAuth,
  withRouter,
  withStyles(styles),
)(PostsManager);
