// # frontend/src/pages/Detail.jsx
import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useNavigate, useLocation, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Detail = () => {
    const [username, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.id; // 상세보기하려는 게시글의 id값
    console.log('Detail/id: ', id);

    // 삭제하기
    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();
        if(window.confirm("게시글을 삭제하시겠습니까?")){
            const request_data = {id: id};
            let response = await axios({
                method: 'delete',
                url: '/api/delete-member',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('Detail/handleDeleteBtnClick/response: ', response);
            if(response.status == 204) {
                alert("게시글 삭제 완료!")
                navigate("/", { });
            }
            else {
                alert("게시글 삭제 실패ㅠ")
            }
        } else {
            return
        }
    };

    // 수정하기
    const handleEditBtnClick = async (e) => {
        e.preventDefault();
        navigate("/update-member", { state : { id: id, username: username, age: age, address: address } });
    }

    // 목록으로
    const handleListBtnClick = async (e) => {
        e.preventDefault();
        navigate("/", { });
    }

    useEffect(() => {
        const getDetailBoard = async () => {
            let response = await axios.get(`/api/member-detail/${id}`);
            console.log('Detail/response: ', response);
            console.log('Detail/response.data: ', response.data);

            setName(response.data.username);
            setAge(response.data.age);
            setAddress(response.data.address);
        }
        getDetailBoard();
    }, [])

    return (
        <>
            <div className="title">멤버 상세</div>

            <div className="form-container">
                <Form className="custom-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>멤버 ID</Form.Label>
                        <Form.Control id='input_name' type="number" value={id} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이름</Form.Label>
                        <Form.Control id='input_name' type="text" value={username} disabled/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>나이</Form.Label>
                        <Form.Control id='input_age' type="number" value={age} disabled/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>주소</Form.Label>
                        <Form.Control id='input_address' type="text" value={address} disabled/>
                    </Form.Group>
                    <br/>
                    <Button variant="primary" className="detail-member-button-edit" type="button" onClick={handleEditBtnClick}>
                        멤버 수정
                    </Button>
                    <Button variant="secondary" className="detail-member-button-list" type="button"onClick={handleListBtnClick}>
                        목록으로
                    </Button>
                    <Button variant="primary" className="detail-member-button-delete" type="button" onClick={handleDeleteBtnClick}>
                        삭제 하기
                    </Button>
                </Form>
            </div>

        </>
    )
}

export default Detail;