import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import './../css/register.css'




function Register() {
    return ( 
        <>
            <div className="row">
                <div className="col">
                    <div class="mb-3">
                      <label for="" class="form-label">Name</label>
                      <input type="text"
                        class="form-control" name="" id="" aria-describedby="helpId" placeholder=""/>
                      <small id="helpId" class="form-text text-muted">Help text</small>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Register;