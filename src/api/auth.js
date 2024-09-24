import { endpoints } from './config';

// Components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = `${endpoints.googleAuth}`;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
  
    if (code) {
      fetch(`${url}?code=${code}`)
        .then(response => response.text())
        .then(data => {
          const jsonStart = data.indexOf('{');
          const jsonString = data.slice(jsonStart);
          try {
            const jsonData = JSON.parse(jsonString);
  
            if (jsonData.status === 'success') {
              const userRole = jsonData.user.role;

              if (userRole === 'pending') {
                toast.error('Your account is not approved yet');
              } else{
                sessionStorage.setItem('user', JSON.stringify(jsonData.user));
                navigate(`/${userRole}`); 
                toast.success('Login successful!');
              }
            } else {
              toast.error(jsonData.message || 'Google Login Failed');
            }
          } catch (e) {
            toast.error('An error occurred during Google login. Please try again.');
          }
        })
        .catch(error => {
          toast.error(error);
        });
    }
  }, [location]);

  return null;
};

export const registerUser = async (userData) => {
  const url = `${endpoints.register}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { status: 'error', message: 'An error occurred during registration. Please try again.' };
  }
};

export const loginUser = async (userData) => {
  const url = `${endpoints.login}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message, user: data.user };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during logging in:', error);
    return { status: 'error', message: 'An error occurred during loggin in. Please try again.' };
  }
};

export const forgotPassword = async (userData) => {
  const url = `${endpoints.forgotPassword}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message, user: data.user };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during forgot password:', error);
    return { status: 'error', message: 'An error occurred during forgot password. Please try again.' };
  }
};

export const resetPassword = async (userData) => {
  const { email, token, new_password, confirm_password } = userData;
  const url = `${endpoints.resetPassword}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_password, confirm_password }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during resetting your password:', error);
    return { status: 'error', message: 'An error occurred during resetting your password. Please try again.' };
  }
};
