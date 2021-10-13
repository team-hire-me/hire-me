import React, { useState, useEffect } from 'react';


const ToDo = (props) => {
function handleSubmit(e){
fetch('/todo',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
         todo,
    }),
)}.then(res => {


})

}
    let todo = "";
    return(

    )
}