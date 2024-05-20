import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as MockBrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Login from './Login';

import axios from 'axios'; // Import axios directly, no need for require
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: 'Success' })),
    get: jest.fn(() => Promise.resolve({ data: 'Mocked Data' })),
  }));
  
describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
        <MockBrowserRouter>
        <Login />
      </MockBrowserRouter>
    );

    // Use queryAllByText instead of getByText
    const loginElements = screen.queryAllByText('Login');
    expect(loginElements.length).toBe(2); // Adjust the count based on your actual component

    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account yet? Register here!")).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });

  it('submits login form with valid credentials', async () => {
   
    render(
        <MockBrowserRouter>
        <Login />
      </MockBrowserRouter>
    );

    
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });

    axios.post.mockResolvedValueOnce({ data: 'Success' });

    fireEvent.click(screen.getByText('Login', { selector: '#loginBtn' }));

    await waitFor(() => {
        // Add a delay to allow the axios request to complete
        setTimeout(() => {
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith('https://localhost:8801/login', {
            username: 'testuser',
            password: 'testpassword',
          });
          // Add more assertions based on your component behavior after successful login
        }, 1000); // Adjust the delay time as needed
      });
  });

  it('handles login form submission with invalid credentials', async () => {
    const mockErrorResponse = { response: { data: { message: 'Error, Username or Password are incorrect' } } };
    axios.post.mockRejectedValueOnce(mockErrorResponse);

    render(
        <MockBrowserRouter>
        <Login />
      </MockBrowserRouter>
    );


    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'invalidpassword' } });
    fireEvent.click(screen.getByText('Login', { selector: '#loginBtn' }));

    await waitFor(() => {
        setTimeout(() => {
            expect(screen.getByText('Error, Username or Password are incorrect')).toBeInTheDocument();
        }, 1000);
    });

  });

  // Add more test cases as needed for different scenarios
});
