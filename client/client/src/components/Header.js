import React, {Component} from 'react';
import '../css/main.css';
import GoogleLogin from 'react-google-login';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var user_id = localStorage.getItem("ck_user_id");
    return (
      <div className="header">
        <div className="logo_text">
          The creativity kernel
        </div>
        {!user_id ?
        (<GoogleLogin clientId="747584954544-1qnj29p7cp9s9i6ind8jegnracl1tihq.apps.googleusercontent.com"
          onSuccess={this.googleResponse}
          render={renderProps => (<button className="login_button"
            onClick={renderProps.onClick}>Log In</button>)}
        />) :
        (
          <div>
            <p class="profileName">{localStorage.getItem("ck_user_givenName")}</p>
            <img class="profileImage" src={localStorage.getItem("ck_user_imageUrl")}/>
          </div>
        )}
    </div>);
  };

  googleResponse = (gresponse) => {
        console.log(gresponse.profileObj);
        fetch('/auth/',
          { method:'POST',
            body:JSON.stringify(gresponse.profileObj),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Mode' : "CORS"
            }
          }).then(response => response.json())
          .then(data =>
            {
              localStorage.setItem('ck_user_id', data._id);
              localStorage.setItem('ck_user_givenName', data.givenName);
              localStorage.setItem('ck_user_imageUrl', data.imageUrl);
              this.forceUpdate();
            }
          );

    }

}

export default Header;
