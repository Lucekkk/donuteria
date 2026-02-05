import UserProfileLayout from "@/components/user-profile/UserProfileLayout";
import classes from './layout.module.css';
/* eslint-disable react/prop-types */
export default async function ProfileLayout({ children }) {
  return (
        <>
           <div className={classes.layout}>
                <UserProfileLayout/>
                {children}
            
            </div> 
        </>
        );
}
