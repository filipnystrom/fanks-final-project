


/*import {EmployeeContext} from '../contexts/EmployeeContext';
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useState} from 'react';

const EditForm = () =>{
    
    const { user, isAuthenticated} = useAuth0();
    const [email, setEmail] = useState(user.email);

 
     

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail(email)   
    }
    
    
     return (
<div>
        <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
           
            <button variant="success" type="submit" block>
                Edit 
            </button>
        </form>
        </div>
     )
}

export default EditForm;*/