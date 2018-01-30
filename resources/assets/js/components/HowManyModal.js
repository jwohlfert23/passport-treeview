import React from 'react'
import {Modal} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form'
import ReduxField from "../ReduxField";

class HowManyModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  submit(values) {
    const {onHide, parent} = this.props;

    return axios.put(`/parents/${parent.id}`, values).then(({data}) => {
      onHide()
    })
  }

  render() {
    const {show, onHide, handleSubmit, submitting} = this.props;

    return <Modal show={show} onHide={onHide}>
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Modal.Header closeButton>
          <Modal.Title>Run Generator</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Field
            name="n"
            label="How many children would you like to create?"
            component={ReduxField}
          />

        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary" disabled={submitting}>Run</button>
        </Modal.Footer>
      </form>
    </Modal>
  }
}

const validate = (values) => {
  let errors = {}

  if (!values.n)
    return {n: "Please enter a value"}

  const n = parseInt(values.n)

  if (isNaN(n) || n < 1 || n > 15)
    return {n: "Please enter a value between 1 and 15"}

}

export default reduxForm({
  form: 'runFactoryForm',
  validate
})(HowManyModal)