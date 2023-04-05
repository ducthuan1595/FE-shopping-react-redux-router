import { useState } from 'react';

const FormUser = () => {
  return (
    <>
      <form>
        <h2>Sign Up</h2>
        <input type='text' name='fullName' placeholder='Full Name' onChange={handleChangeInput.bind(e, 'name')} />
        <input type='email' name='email' placeholder='Email' onChange={handleChangeInput.bind(e, 'email')} />
        <input type='password' name='password' placeholder='Password' onChange={handleChangeInput.bind(e, 'password')} />
        <input type='text' name='phone' placeholder='Phone' onChange={handleChangeInput.bind(e, 'phone')} />
        <button>SIGN UP</button>
        <div>Login? Click</div>
      </form>
    </>
  )
}