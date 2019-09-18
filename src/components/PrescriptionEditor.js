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
  },
  marginTop: {
    marginTop: 2 * theme.spacing.unit,
  },
});

const PrescriptionEditor = ({ classes, post, onSave, history }) => (
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
              <Field name="rxName">
                {({ input }) => <TextField label="Prescription Name" autoFocus {...input} />}
              </Field>
              <Field name="drPrescribed">
                {({ input }) => <TextField label="Doctor Prescribed" autoFocus {...input} />}
              </Field>
              <Field name="rxDosage">
                {({ input }) => <TextField label="Dosage" autoFocus {...input} />}
              </Field>
              <Field name="rxUOM">
                {({ input }) => <TextField label="Unit Of Measure" autoFocus {...input} />}
              </Field>
              <Field name="rxFrequency">
                {({ input }) => <TextField label="Frequency" autoFocus {...input} />}
              </Field>
              <Field name="rxPrescribedDate">
                {({ input }) => <TextField label="Prescribed Date" autoFocus {...input} />}
              </Field>
              <Field name="rxNextRefill">
                {({ input }) => <TextField label="Next Refill" autoFocus {...input} />}
              </Field>
              <Field name="rxdrNotes">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Prescription Notes"
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
)(PrescriptionEditor);
