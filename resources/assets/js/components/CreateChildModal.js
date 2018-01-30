import React from 'react'
import {Modal} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form'
import ReduxField from "../ReduxField";

class CreateChildModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  submit(values) {
    const {onHide, parent} = this.props;

    return axios.post(`/parents/${parent.id}/children`, values).then(({data}) => {
      onHide()
    })
  }

  render() {
    const {show, onHide, handleSubmit, submitting} = this.props;

    return <Modal show={show} onHide={onHide}>
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Modal.Header closeButton>
          <Modal.Title>Create Child</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Field
            name="num"
            label="Which number would you like to create?"
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

const validate = (values, props) => {
  let errors = {}

  if (!values.num)
    return {num: "Please enter a value"}

  const n = parseInt(values.num)

  if (isNaN(n) || n < props.parent.min || n > props.parent.max)
    return {num: `Please enter a value between ${props.parent.min} and ${props.parent.max}`}

}

export default reduxForm({
  form: 'runFactoryForm',
  validate
})(CreateChildModal)