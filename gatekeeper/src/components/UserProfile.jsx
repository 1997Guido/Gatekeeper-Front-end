import 'bootstrap/dist/css/bootstrap.css';
import './../css/style.css';
import './../css/userprofile.css';
import { useEffect, useState } from 'react';
import axiosinstance from './../api/axiosApi';

function UserProfile() {

    const [data, setData] = useState([]);

    const getProfile = () => {
        axiosinstance.get('profileapi')
        .then(function(response){
            const Actualdata = response.data
            setData(Actualdata)
            console.log(Actualdata)
        });
    }
      useEffect(() => {
        getProfile();
      }, []);
    return ( 
        <>
                    <div className='UserProfileContainer'>
                    <div className='row'>
                        <div className='col-profile'>
                            <h1 className='text-center'>Profile:</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-name'>
                            <h2 className='text-left'>{data.first_name} {data.last_name}</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-age'>
                            <h2 className='text-left'>{data.age}</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-gender'>
                            <h2 className='text-left'>{data.gender}</h2>
                        </div>
                    </div>
                </div>
    </>
     );
}

export default UserProfile;