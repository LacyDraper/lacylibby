
import Axios from 'axios';
import React, { useState } from 'react';

const sendEmailURL = '<YOUR_FUNCTION_URL>';
  
function App() {
  const [state, setState] = useState({
    message: '',
    name: '',
    subject: '',
  });

  const { message, name, subject } = state;
  
  const handleState = ({ target: { id, value } }) =>
    setState({ ...state, [id]: value });

  const sendEmail = (e) => {
    e.preventDefault();
    Axios.get(sendEmailURL, {
      params: {
        message,
        name,
        subject,
      },
    });
  };

  return (
    <form
      onSubmit={sendEmail}
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label htmlFor={'name'}>Name</label>
      <input id={'name'} onChange={handleState} value={name} />

      <label htmlFor={'message'}>Message</label>

      <input
        id={'message'}
        onChange={handleState}
        value={message}
      />

      <label htmlFor={'subject'}>Subject</label>

      <input
        id={'subject'}
        onChange={handleState}
        value={subject}
      />

      <input type={'submit'} value={'Send Email'} />
    </form>
  );
}

export default App;