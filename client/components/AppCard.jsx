import React from 'react';

const AppCard = props => {
    return( 
//     <div>
//   Title: {props.title}
//   <br />
//   Company Name: {props.company_name}
//   <br />
//   Loaction: {props.location}
//   <br />
//   Description: {props.description}
//   <br />
//   Link: {props.link}
// </div>;
// </div> 

    < div id="app-card" className ="app-card card mb-3"> 
      <div className="row g-0">
        <div className="col-md-8 col-lg-9">
          <div className="card-body">
            <h5 className="card-title">Title: {props.title} </h5>
            <h5 className="card-CompanyName">Company Name: {props.company_name} </h5>
            <h5 className="card-CompanyName">Location: {props.location} </h5>
            <h5 className="card-CompanyName">Description: {props.description} </h5>
            <h5 className="card-CompanyName">Link: {props.link}.link({props.link}) </h5>
            <div className="btn-group">
              <a className="btn btn-sm btn-primary">Edit App</a>
                <button type="button" className="btn btn-sm btn-info"> 
                </button>
            </div>
          </div>
        </div>

      </div>
    </div>)}
export default AppCard;
