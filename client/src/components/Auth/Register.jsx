import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmation, setConfirmation] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmation(true);
    setPasswordMatch(password === e.target.value);
  };

  const handleRegister = () => {

    console.log('Registering with:', { name, email, password, confirmPassword });
    //API call to register the user
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                confirmation
                  ? passwordMatch
                    ? 'border-green-500'
                    : 'border-red-500'
                  : ''
              }`}
            />
            {confirmation && (
              <span className={`${passwordMatch ? 'text-green-500' : 'text-red-500'} ml-2`}>
                {passwordMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleRegister}
            disabled={!passwordMatch} // Disable button if passwords don't match
            className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ${
              !passwordMatch && 'cursor-not-allowed opacity-50'
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
