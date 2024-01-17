// # main/frontend/src/componets/MemberList/MemberList.jsx

import React from "react";
import MemberBox from "../MemberBox/MemberBox";


const MemberList = (props) => {
    console.log('boardList/props: ', props);
    console.log('boardList/props.data: ', props.data);
    return (
        <>
            {Array.isArray(props.data) && props.data.length !== 0 ?
                props.data.map((i) => (
                    <MemberBox
                        key = {i.id}
                        id = {i.id}
                        username = {i.username}
                        age = {i.age}
                        address = {i.address}
                    />
                ))
                : <p>게시글이 존재하지 않습니다</p>}
        </>
    );
};
export default MemberList;