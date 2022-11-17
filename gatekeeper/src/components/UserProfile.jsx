import 'bootstrap/dist/css/bootstrap.css';
import './../css/style.css';
import './../css/userprofile.css';




function UserProfile() {
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
                    <h2 className='text-left'>Full name: Mike Vermeer</h2>
                </div>
            </div>
            <div className='row'>
                <div className='col-age'>
                    <h2 className='text-left'>Age: 20</h2>
                </div>
            </div>
            <div className='row'>
                <div className='col-gender'>
                    <h2 className='text-left'>Gender: Male</h2>
                </div>
            </div>
        </div>
    </>
     );
}

export default UserProfile;