import React from 'react'
import {Modal} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form'
import ReduxField from "../ReduxField";

class CreateParentModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  submit(values) {
    const {actions, onHide, reset} = this.props;

    return axios.post(`/parents`, values).then(({data}) => {
      reset()
      onHide()
    })
  }

  render() {
    const {show, onHide, handleSubmit, submitting} = this.props;

    return <Modal show={show} onHide={onHide}>
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Modal.Header closeButton>
          <Modal.Title>Create Factory</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Field
            name="name"
            label="Factory Name"
            component={ReduxField}
          />

          <Field
            name="min"
            label="Min Value"
            component={ReduxField}
          />

          <Field
            name="max"
            label="Max Value"
            component={ReduxField}
          />

        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary" disabled={submitting}>Create</button>
        </Modal.Footer>
      </form>
    </Modal>
  }
}

const validate = (values) => {
  let errors = {}

  if (!values.name)
    errors.name = "Please enter a name"

  if (!values.min)
    errors.min = "Please enter a min value"

  if (!values.max)
    errors.max = "Please enter a max value"

  if (!errors.min && !errors.max) {
    if (values.min > values.max)
      errors.min = "Please enter a value that is less than your max value"
  }

  return errors
}

export default reduxForm({
  form: 'createFactoryForm',
  validate
})(CreateParentModal)