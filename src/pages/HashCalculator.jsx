import React, { useState } from 'react';
import { keccak_512 } from 'js-sha3';

const HashPasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to compute first 10 characters of the SHA3-512 hash
  const keccakHash = (pwd) => {
    const hash = keccak_512(pwd);
    return hash.substring(0, 10); // First 10 characters
  };

  // Function to check password safety
  const checkPassword = async (password) => {
    if (password.trim() !== '') {
      try {
        const pwdHash = keccakHash(password);
        const encodedPwdHash = encodeURIComponent(pwdHash);
        const url = `https://passwords.xposedornot.com/api/v1/pass/anon/${encodedPwdHash}`;

        const response = await fetch(url);

        if (response.status === 200) {
          const data = await response.json();
          setResult(data);  // Password found in breach
          setError(null);
        } else if (response.status === 404) {
          setResult('Password is safe');
          setError(null);
        } else {
          setError(`Error: ${response.status}`);
          setResult(null);
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    } else {
      setError('Oops! Try again with a valid password.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPassword(password);
  };

  return (
    <div>
      <h2>Password Hash Checker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Check Password</button>
      </form>

      {result && <p>Result: {JSON.stringify(result)}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HashPasswordChecker;
