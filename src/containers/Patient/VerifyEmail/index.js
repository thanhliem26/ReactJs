import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { toast } from 'react-toastify';
import { userService } from '../../../services'

const VerifyEmail = () => {
    const location = useLocation();
    const history = useHistory();

    React.useEffect(() => {
        return new Promise(async (resolve, reject) => {
            const urlParam = new URLSearchParams(location.search)
            const token =  urlParam.get("token");
            const doctorId = urlParam.get("doctorId");
    
            const response = await userService.VerifyEmailBooking({token, doctorId});

            if(response.errCode === 0) {
                toast.success(response.message);
                history.push('/home')
            } else {
                toast.error(response.message);
                history.push('/home')
            }
        })
       
    }, [location])
    
    
  return (
    <div>VerifyEmail</div>
  )
}

export default VerifyEmail