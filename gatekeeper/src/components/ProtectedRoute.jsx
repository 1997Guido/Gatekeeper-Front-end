import { Component } from "react";
import validateUserLoggedIn from 'ValidateUserloggedin.jsx'



const ProtectedRoute = ({component:Component, ...rest}) => {
    const [isLoggedIn, setLoggedIn] = useState({loggedIn:'', loaded:false})
    useEffect(async () => {
        const userStatus = await validateUserLoggedIn();
        setLoggedIn((prevState) => {return {loggedIn:userStatus, loaded:true}})
    }, [])

    return(
        <Route {...rest} render={(routerProps) => {
            if(isLoggedIn.loaded){
                if(isLoggedIn.loggedIn ==='success'){
                    return(
                        <Component {...rest} {...routerProps}/>
                    )
                }else{
                    return(
                        <Redirect to={{
                            pathname:'/login',
                            state:{from : routerProps.location}
                        }} />
                    )
                }
            }else{
                return(
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                      (<CustomLoader />)
                    </Row>
                )
            }
        }}
        />
    )
}

<ProtectedRoute exact path="/admin" component={Admin} />
