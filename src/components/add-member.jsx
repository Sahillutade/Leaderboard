import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';

export function AddMember()
{

    const [message, setMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.username) {
                errors.username = 'Name is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }
            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post('https://leaderboard-1bon.onrender.com/users', values);
                console.log('User added:', res.data);
                setMessage('Member added successfully!');
                resetForm();
            } catch (err) {
                console.error('Error adding user:', err);
                setMessage('Failed to add member.');
            }
        }
    });

    return(
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Member</h2>
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Name"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={inputStyle}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div style={errorStyle}>{formik.errors.username}</div>
                    )}
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={inputStyle}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div style={errorStyle}>{formik.errors.email}</div>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={inputStyle}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={errorStyle}>{formik.errors.password}</div>
                    )}
                </div>

                <button type="submit" style={buttonStyle}>Add Member</button>
            </form>

            {message && <p style={{ textAlign: 'center', marginTop: '15px', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </div>
    )
}

const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%'
};

const buttonStyle = {
    padding: '12px',
    backgroundColor: 'gold',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px'
};