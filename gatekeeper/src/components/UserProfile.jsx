import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './../css/style.css';
import './../css/userprofile.css';




function UserProfile() {
    return ( 
        <>
        <div className='UserProfileContainer'>
            <div className='row'>
                <div className='col-profile'>
                    <p className='text-center textbox'>Profile:</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-name'>
                    <p className='text-left textbox'>Full name: Mike Vermeer</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-age'>
                    <p className='text-left textbox'>Age: 20</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-gender'>
                    <p className='text-left textbox'>Gender: Male</p>
                </div>
            </div>
        </div>
    </>
     );
}

export default UserProfile;