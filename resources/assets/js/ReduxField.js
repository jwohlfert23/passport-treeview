import React, {PropTypes, Component} from 'react';
import {HelpBlock, ControlLabel, FormControl, FormGroup} from 'react-bootstrap'

const renderInput = (field) => {

  const onBlur = (e) => {
    field.input.onBlur(e);

    if (field.customBlur)
      field.customBlur(e.target.value);
  }

  if (field.inputEl)
    return React.cloneElement(field.inputEl, {...field.input, onBlur});

  return <FormControl
    {...field.input}
    style={field.style || {}}
    type={['email', 'number', 'password', 'date'].indexOf(field.type) > -1 ? field.type : 'text'}
    componentClass={['textarea', 'select'].indexOf(field.type) > -1 ? field.type : 'input'}
    placeholder={field.placeholder}
    onBlur={onBlur}
  />
}

const ReduxField = (field) => {
  if (!field.meta)
    return null;


  let {label, success, help, showState, showHelp, required, showSuccess} = field
  showHelp = showHelp !== false;

  let state = null;
  if (field.meta.valid && field.meta.touched && showSuccess)
    state = 'success';
  else if (!field.meta.valid && field.meta.touched && showState !== false)
    state = 'error';

  return <FormGroup validationState={state}>

    {label ?
      <div><ControlLabel>{label}{required && <span className="text-danger"> *</span>}</ControlLabel></div> : null}

    {field.renderInput ? field.renderInput(field) : renderInput(field)}

    {state == null && help && renderHelp(help, field)}

    {state == 'error' && showHelp ?
      <HelpBlock>{field.meta.error}</HelpBlock>
      : null}

    {state == 'success' && success && showHelp ?
      <HelpBlock>{success}</HelpBlock>
      : null}
  </FormGroup>

}
const renderHelp = (help, field) => {

  if (typeof help === 'string' || help instanceof String)
    return <HelpBlock>{help}</HelpBlock>

  if (typeof help === "function") {
    return <HelpBlock>{help(field)}</HelpBlock>
  }

  return null;
}
ReduxField.Input = renderInput;
export default ReduxField;