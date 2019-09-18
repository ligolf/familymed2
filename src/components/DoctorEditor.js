import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '90%',
    maxWidth: 500,
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
  }
  ,
  marginTop: {
    marginTop: 2 * theme.spacing.unit,
  },
});

const DoctorEditor = ({ classes, post, onSave, history }) => (
  <Form initialValues={post} onSubmit={onSave}>
    {({ handleSubmit }) => (
      <Modal
        className={classes.modal}
        onClose={() => history.goBack()}
        open
      >
        <Card className={classes.modalCard}>
          <form onSubmit={handleSubmit}>
            <CardContent className={classes.modalCardContent}>
              <Field name="userName">
                {({ input }) => <TextField label="User Name" autoFocus {...input} />}
              </Field>
              <Field name="drName">
                {({ input }) => <TextField label="Doctors Name" autoFocus {...input} />}
              </Field>
              <Field name="drAddress">
                {({ input }) => <TextField label="Doctors Address" autoFocus {...input} />}
              </Field>
              <Field name="drPhone">
                {({ input }) => <TextField label="Doctors Phone" autoFocus {...input} />}
              </Field>
              <Field name="drEmail">
                {({ input }) => <TextField label="Doctors Email" autoFocus {...input} />}
              </Field>
              <Field name="drSpeciality">
                {({ input }) => <TextField label="Doctors Speciality" autoFocus {...input} />}
              </Field>
              <Field name="drNotes">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Doctors Notes"
                    multiline
                    rows={4}
                    {...input}
                  />
                )}
              </Field>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit">Save</Button>
              <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    )}
  </Form>
);

export default compose(
  withRouter,
  withStyles(styles),
)(DoctorEditor);
