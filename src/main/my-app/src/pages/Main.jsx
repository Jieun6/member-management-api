// # main/frontend/src/pages/Main.jsx

import { React, useEffect, useState } from "react";
import MemberList from "../components/MemberList/MemberList";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Main = () => {
    const [data, setData] = useState("")

    //return이 렌더링 되고 끝났을 때 마지막으로 불리는 함수
    useEffect(() => {
        const getMemberList = async () => {
            console.log('getMemberList()');
            let response = await axios.get("/api/member-list");
            console.log('main/response: ', response);
            setData(response.data);
        };
        getMemberList();
    }, []) //괄호 안에 변수가 바뀔 때마다 함수 호출되기도 함

    return (
        <div className="container">
            <div className="title">멤버 목록</div>

            <div className="button-container">
                <Link to={"/write"} >
                    <Button variant="warning" className="custom-button">글쓰기</Button>
                </Link>

                <Link to={"/create-member"} >
                    <Button variant="primary" className="custom-button">멤버 등록</Button>
                </Link>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>주소</th>
                    </tr>
                    </thead>
                    <tbody>
                        <MemberList data={data}/>
                    </tbody>
                </table>
            </div>


        </div>
    );
};
export default Main;