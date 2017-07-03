import React from 'react';

const Contact = (props) => 
<a href={props.link} target="_blank"><img src={props.logo}/>{props.name}</a>;

export default Contact;