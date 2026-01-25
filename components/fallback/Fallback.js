import classes from './Fallback.module.css';
export default function Fallback(){
    return(
        <div className={classes.container}><p className={classes.loading}>Oczekiwanie<span className={classes.span}>. . . .</span></p></div>
    )
}