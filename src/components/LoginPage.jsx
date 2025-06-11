import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        aria-label="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </form>
  );
}
