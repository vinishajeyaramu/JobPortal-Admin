const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (user && btoa(password) === user.password) {
      // Store user info in localStorage
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);
      localStorage.setItem('role', user.role);
      
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login failed. Please try again.');
  }
};