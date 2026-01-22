'use client';

import { useActionState } from "react";
import {registerUser} from '@/lib/actions';
import classes from './page.module.css';

export default function Rejestracja(){
    const [state, formAction, isPending] = useActionState(registerUser, {message: null, values: {}});
    console.log(state.message);
    return(
        <>
        <main className={classes.main}>
          <div className={classes.registerPanel}>

              <div className={classes.registerHeaderBox}>
                <h1>Rejestracja</h1>
                <p>Zarejestruj się już dziś i zgarnij dodatkowe donuty!</p>
              </div>
                
                <form action={formAction}>
                  
                    <div className={classes.labelAndInputBox}>
                      <label htmlFor="login">Login</label>
                      <input
                        type="text"
                        id="login"
                        name="login"
                        defaultValue={state.values?.login || ''}
                        placeholder="Podaj login"
                        required
                        
                      />
                      {state.message === "Login musi mieć długość między 1 a 35 znaków" && <p className={classes.errorMessage}>{state.message}</p>}
                      {state.message === "Nazwa loginu jest już zarezerowana" && <p className={classes.errorMessage}>{state.message}</p>}
                    </div>
                    <div className={classes.labelAndInputBox}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={state.values?.email || ''}
                        placeholder="Podaj email"
                        required
                      />
                      {state.message === "Wpisz poprawny email" && <p className={classes.errorMessage}>{state.message}</p>}
                      {state.message === "Ten email jest już zajęty" && <p className={classes.errorMessage}>{state.message}</p>}
                    </div>
                  
                  <div className={classes.labelAndInputBox}>
                    <label htmlFor="password">Hasło</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      defaultValue={state.values?.password_hash || ''}
                      required
                      placeholder="Podaj hasło"
                    />
                     {state.message === 'Hasło musi mieć od 8 do 20 znaków, oraz posiadać jedną cyfrę i jedną, wielką literę' && <p className={classes.errorMessage}>{state.message}</p>}
                  </div>
                 

                  <div className={classes.checkboxContainer}>
                    <input 
                      type="checkbox"
                      id="regulations"
                      name="regulations"
                      className={classes.checkboxInput}
                      defaultChecked = {state.values?.isChecked || false}
                      required
                      />
                      <label htmlFor="regulations" className={classes.checkboxLabel}>*Zapoznałem się z regulaminem strony</label>
                  </div>
                      {state.message === "Uzupełnij dane" && <p className={classes.errorMessage}>{state.message}</p>}
                      {state.message === "Zaznacz, że zapoznałeś się z regulaminem" && <p className={classes.errorMessage}>{state.message}</p>}

                  <p className={classes.btnContainer}>
                    <button disabled={isPending}>{isPending === true ? 'Oczekiwanie' : 'Zarejestruj'}</button>
                  </p>
                </form>
              </div>
         </main>
        </>
       
    )
}