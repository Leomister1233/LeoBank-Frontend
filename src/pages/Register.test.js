import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as MockBrowserRouter } from 'react-router-dom'; 
import Register from './Register';

// Mock axios to prevent actual API calls during testing
import axios from 'axios'; 
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: 'Success' })),
    get: jest.fn(() => Promise.resolve({ data: 'Mocked Data' })),
  }));

describe('Register Component', () => {
  it('renders register form correctly', () => {
    render(
        <MockBrowserRouter>
        <Register />
      </MockBrowserRouter>
    );

    const loginElements = screen.queryAllByText('Register');
    expect(loginElements.length).toBe(2);

    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth:')).toBeInTheDocument();
    expect(screen.getByText('You are ?')).toBeInTheDocument();
    expect(screen.getByText('Return to Login Page')).toBeInTheDocument();
  });

  it('submits register form with valid data', async () => {
    render(
        <MockBrowserRouter>
        <Register />
      </MockBrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Username:'),{target:{value:'testuser'}})
    fireEvent.change(screen.getByLabelText('Password:'),{target:{value:'testpassword'}})
    fireEvent.change(screen.getByLabelText('Email:'),{target:{value:'testemail'}})
    fireEvent.change(screen.getByLabelText('Full Name:'),{target:{value:'testfullname'}})
    fireEvent.change(screen.getByLabelText('Date of Birth:'),{target:{value:'1999-12-12'}})
    fireEvent.click(screen.getByText('You are ?'));
    axios.post.mockResolvedValueOnce({data:"Success"})

    fireEvent.click(screen.getByText('Register', { selector: '#register' }));

    await waitFor(() => {
        setTimeout(() => {
            expect(screen.getByText('Please check your email box')).toBeInTheDocument();
            expect(axios.post).toHaveBeenCalledWith('https://localhost:8801/users', {
            username: 'testuser',
            password: 'testpassword',
            email:'test@email.com',
            full_name:'testname',
            date_of_birth:'1999-12-23'
            });
        }, 1000);    
    })

   
  });

  it('handles register form submission with invalid credentials',async () =>{
    render(
      <MockBrowserRouter>
        <Register />
      </MockBrowserRouter>
    );

    fireEvent.click(screen.getByText('Register', { selector: '#register' }));

    expect(await screen.findByText('username should not be empty')).toBeInTheDocument();
    expect(await screen.findByText('Password should not be empty')).toBeInTheDocument();
    expect(await screen.findByText('Email should not be empty')).toBeInTheDocument();
    expect(await screen.findByText('Full name should not be empty')).toBeInTheDocument();
    expect(await screen.findByText('Birth date should not be empty')).toBeInTheDocument();
    expect(await screen.findByText('Please choose a role')).toBeInTheDocument();
    
  })

  // Add more test cases as needed
});
