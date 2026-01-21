'use client';

import { useActionState } from "react";
import {registerUser} from '@/lib/actions';

export default function Rejestracja(){
    const [state, formAction, isPending] = useActionState(registerUser, {message: null, values: {}});
    console.log(state.message);
    return(
        <>
         <h1>Zarejestruj się już dziś!</h1>

        <form action={formAction}>
          
            <p>
              <label htmlFor="login">Login</label>
              <input
                type="text"
                id="login"
                name="login"
                // required
                defaultValue={state.values?.login || ''}
              />
            </p>
            <p>
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                name="email"
                // required
                defaultValue={state.values?.email || ''}
              />
            </p>
          
          <p>
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              id="password"
              name="password"
              // required
               defaultValue={state.values?.password_hash || ''}
            />
          </p>
          
          
          <p>
            <button disabled={isPending}>{isPending === true ? 'Oczekiwanie' : 'Zarejestruj'}</button>
          </p>
        </form>
        </>
       
    )
}