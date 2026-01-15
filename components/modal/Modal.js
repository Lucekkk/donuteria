import { createPortal } from "react-dom";
import classes from './Modal.module.css';

export default function Modal(){
    return createPortal(
        <>
            <div className={classes.modal}>modal</div>
            {/* UMIESCIC NAV WRAZ Z LINKAMI */}
        
        </>, 
        document.getElementById('modal')
    );
}