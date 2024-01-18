// # main/frontend/src/compoents/MemberBox/MemberBox.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MemberBox = (props) => {
    console.log('beerBox/props: ', props);
    console.log('beerBox/props.title: ', props.title);
    return(
        <>
            <tr key={props.key}>
                <Link to={"/detail"} state={{id:props.id}}>
                <td>{props.id}</td>
                </Link>
                <td>{props.username}</td>
                <td>{props.age}</td>
                <td>{props.address}</td>
            </tr>
        </>
    )
}
export default MemberBox;