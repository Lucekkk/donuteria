import { createPortal } from "react-dom";
import classes from './Modal.module.css';

export default function Modal(){
    return createPortal(
        <>
            <div className={classes.modal}>modal</div>
        
        </>, 
        document.getElementById('modal')
    );
}