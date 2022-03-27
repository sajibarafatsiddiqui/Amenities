import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, error }) => {
  return <Alert variant={variant}>{error}</Alert>
}
Message.defaultProps = { variant: 'info' }
export default Message
