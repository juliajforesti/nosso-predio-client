import React, { Component } from 'react';
import MainService from '../MainService'

class InvitePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.service = new MainService();
        this.inviteCode = this.inviteCode.bind(this)
    }

    inviteCode(){
        const {invitationCode} = this.props.match.params
        this.service.buildingInvite(invitationCode).then(response => {
        //   this.props.getUser(response)
          this.props.history.push(`/pagina-principal`);
        })
      }

    render() { 
        this.inviteCode()
        return ( <div>
            <h1>Encontrando seu predio</h1>
        </div> );
    }
}
 
export default InvitePage;