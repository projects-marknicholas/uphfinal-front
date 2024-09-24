import { endpoints } from './config';

// React
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const fetchSecurityKey = async () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user ? user.user_id : '';
  const bearerToken = 'ZgnJxCp7R2i95Y3Y7wMN6VTryZ0Ro3a1letBoUyYi5MyKIyW5EQTTvwDqsJU5xVG';
  const url = `${endpoints.securityKey}?user_id=${userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': bearerToken,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 'success') {
      sessionStorage.setItem('security_key', data.security_key);
      return { status: 'success', message: data.message, security_key: data.security_key };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    return { status: 'error', message: 'An error occurred while fetching the security key.' };
  }
};

// Scholarship Types
export const getScholarshipType = async (page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.getScholarshipType}?page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching applications:', error);
    return { status: 'error', message: 'An error occurred while fetching applications. Please try again.' };
  }
};

export const addScholarshipType = async (userData) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.addScholarshipType}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
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
    console.error('Error during inserting data:', error);
    return { status: 'error', message: 'An error occurred during inserting data. Please try again.' };
  }
};

export const updateScholarshipType = async (scholarshipTypeId, formData) => {
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.updateScholarshipType}?stid=${scholarshipTypeId}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during updating scholarship type:', error);
    return { status: 'error', message: error.message || 'An error occurred while updating the scholarship type. Please try again.' };
  }
};

export const deleteScholarshipType = async (scholarshipTypeId) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deleteScholarshipType}?stid=${scholarshipTypeId}`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during deleting scholarhip type:', error);
    return { status: 'error', message: 'An error occurred while deleting the scholarhip type. Please try again.' };
  }
};

// Applications
export const getApplications = async (page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.getApplications}?page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching applications:', error);
    return { status: 'error', message: 'An error occurred while fetching applications. Please try again.' };
  }
};

export const searchApplications = async (query, page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const encodedQuery = encodeURIComponent(query);
  const url = `${endpoints.searchApplications}?query=${encodedQuery}&page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching applications:', error);
    return { status: 'error', message: 'An error occurred while fetching applications. Please try again.' };
  }
};

export const updateApplication = async (applicationId, newStatus) => {
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.updateApplications}?aid=${applicationId}&status=${newStatus}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during updating application:', error);
    return { status: 'error', message: 'An error occurred while updating the application. Please try again.' };
  }
};

// Scholars
export const getScholars = async (page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.getScholars}?page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching applications:', error);
    return { status: 'error', message: 'An error occurred while fetching applications. Please try again.' };
  }
};

export const searchScholars = async (query, page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const encodedQuery = encodeURIComponent(query);
  const url = `${endpoints.searchScholars}?query=${encodedQuery}&page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching applications:', error);
    return { status: 'error', message: 'An error occurred while fetching applications. Please try again.' };
  }
};

export const deleteScholars = async (applicationId) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deleteScholars}?aid=${applicationId}`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during deleting scholar:', error);
    return { status: 'error', message: 'An error occurred while deleting the scholar. Please try again.' };
  }
};

// Account Approval
export const getAccountApproval = async (page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.getAccountApprovals}?page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching accounts:', error);
    return { status: 'error', message: 'An error occurred while fetching accounts. Please try again.' };
  }
};

export const searchAccountApproval = async (query, page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const encodedQuery = encodeURIComponent(query);
  const url = `${endpoints.searchAccountApprovals}?query=${encodedQuery}&page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching accounts:', error);
    return { status: 'error', message: 'An error occurred while fetching accounts. Please try again.' };
  }
};

export const updateAccountApproval = async (userId, role) => {
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.updateAccountApprovals}?uid=${userId}&role=${role}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during updating accounts:', error);
    return { status: 'error', message: 'An error occurred while updating the accounts. Please try again.' };
  }
};

export const deleteAccountApproval = async (userId) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deleteAccountApprovals}?uid=${userId}`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during deleting accounts:', error);
    return { status: 'error', message: 'An error occurred while deleting the accounts. Please try again.' };
  }
};

// Active Accounts
export const getActiveAccount = async (page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.getAccounts}?page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching accounts:', error);
    return { status: 'error', message: 'An error occurred while fetching accounts. Please try again.' };
  }
};

export const searchActiveAccount = async (query, page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const encodedQuery = encodeURIComponent(query);
  const url = `${endpoints.searchAccounts}?query=${encodedQuery}&page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching accounts:', error);
    return { status: 'error', message: 'An error occurred while fetching accounts. Please try again.' };
  }
};

export const deleteActiveAccount = async (userId) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deleteAccounts}?uid=${userId}`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during deleting accounts:', error);
    return { status: 'error', message: 'An error occurred while deleting the accounts. Please try again.' };
  }
};