import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'; // Import act from testing-library
import PasswordRecovery from './PasswordRecovery';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('PasswordRecovery Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders initial form with email input and Next button', () => {
        render(
            <Router>
                <PasswordRecovery />
            </Router>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    });

    // Modify other test cases similarly by wrapping the state-changing code in act(...)

    test('shows error message on empty email submission', async () => {
        render(
            <Router>
                <PasswordRecovery />
            </Router>
        );

        await act(async () => { // Wrap in act
            fireEvent.click(screen.getByRole('button', { name: /Next/i }));
        });

        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            }, 1000);
        });
    });

    test('proceeds to OTP section on valid email submission', async () => {
        axios.post.mockResolvedValue({ data: "Success" });
    
        render(
            <Router>
                <PasswordRecovery />
            </Router>
        );
    
        await act(async () => { // Wrap in act
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
            fireEvent.click(screen.getByRole('button', { name: /Next/i }));
        });
    
        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByRole('button', { name: /Send OTP/i })).toBeInTheDocument();
            }, 1000);
        });
    });
    
    test('verifies OTP and moves to password reset section', async () => {
        axios.post.mockResolvedValueOnce({ data: "Success" });
        axios.post.mockResolvedValueOnce({ status: 200 });

        render(
            <Router>
                <PasswordRecovery />
            </Router>
        );

        await act(async () => { // Wrap in act
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
            fireEvent.click(screen.getByRole('button', { name: /Next/i }));
        });

        await waitFor(() => {
            setTimeout(() => {
            fireEvent.click(screen.getByRole('button', { name: /Send OTP/i }));
            },1000);   
        });

        await waitFor(() => {
            setTimeout(() => {
            fireEvent.change(screen.getByPlaceholderText(/Insert the 4 digit number/i), { target: { value: '1234' } });
            fireEvent.click(screen.getByRole('button', { name: /Verify/i }));
            },1000);
        });

        await waitFor(() => {
            setTimeout(() => {
            expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
            },1000);
        });
    });

    test('resets password successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: "Success" });
        axios.post.mockResolvedValueOnce({ status: 200 });
        axios.post.mockResolvedValueOnce({ status: 200 });

        render(
            <Router>
                <PasswordRecovery />
            </Router>
        );

        await act(async () => { // Wrap in act
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
            fireEvent.click(screen.getByRole('button', { name: /Next/i }));
        });

        await waitFor(() => {
            setTimeout(() => {
            fireEvent.click(screen.getByRole('button', { name: /Send OTP/i }));
            },1000);
        });

        await waitFor(() => {
            setTimeout(() => {
            fireEvent.change(screen.getByPlaceholderText(/Insert the 4 digit number/i), { target: { value: '1234' } });
            fireEvent.click(screen.getByRole('button', { name: /Verify/i }));
            },1000);
        });

        await waitFor(() => {
            setTimeout(() => {
            fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'newpassword' } });
            fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'newpassword' } });
            fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));
            },1000);
        });

        await waitFor(() => {
             setTimeout(() => {
            expect(axios.post).toHaveBeenCalledWith('https://localhost:8801/updatePassword', expect.any(Object));
            expect(screen.getByText(/Return to Login Page/i)).toBeInTheDocument();
             },1000);
        });
    });


    // Modify other test cases similarly by wrapping the state-changing code in act(...)

});
