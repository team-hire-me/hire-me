import React from 'react';

const AppCard = props => {


    return( 

    < div id="app-card" className ="app-card card mb-3"> 
      <div className="row g-0">
        <div className="col-md-8 col-lg-9">
          <div className="card-body">
            <h5 className="card-title">Title: {props.title} </h5>
            <h5 className="card-CompanyName">Company Name: {props.company_name} </h5>
            <h5 className="card-CompanyName">Location: {props.location} </h5>
            <h5 className="card-CompanyName" style={{ overflow: 'hidden' }}>Link: {props.link}) </h5>
            
          </div>
        </div>

      </div>
    </div>)}
export default AppCard;
