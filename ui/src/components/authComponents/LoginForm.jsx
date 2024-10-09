
import React, { useState } from 'react';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
          Email address*
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
          Password*
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {/* {loading && <p>Loading...</p>} */}

      <div>
        <button type="submit" className="btn-fullwidth" disabled={loading}>
          Log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
