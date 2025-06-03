import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks/hook';
import { setCredentials } from '../../feature/auth/authSlice';
import { useLoginMutation } from '../../feature/auth/authapi';

const LoginPage: React.FC = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
    const response = await login({ email:userName, password }).unwrap();
      dispatch(setCredentials({ token: response.token }));
      navigate('/dashboard'); // Navigate to home or role-based route
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
