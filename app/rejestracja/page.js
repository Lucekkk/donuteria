'use client';

import { useActionState } from "react";
import {registerUser} from '@/lib/actions';

export default function Rejestracja(){
    const [state, formAction] = useActionState(registerUser, {message: null});
    console.log(state.message);
    return(
        <>
         <h1>Zarejestruj się już dziś!</h1>

        <form  action={formAction}>
          
            <p>
              <label htmlFor="login">Login</label>
              <input
                type="text"
                id="login"
                name="login"
                required
                
              />
            </p>
            <p>
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                
              />
            </p>
          
          <p>
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              
            />
          </p>
          
          
          <p>
            <button>Zarejestruj</button>
          </p>
        </form>
        </>
       
    )
}