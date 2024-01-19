// # main/frontend/src/pages/CreateMember.jsx
import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './form.css'

const CreateMember = () => {
    const [username, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용

    const resetInput = () => {
        setName("");
        setAge("");
        setAddress("");
        document.getElementById('input_name').value = '';
        document.getElementById('input_age').value = '';
        document.getElementById('input_address').value = '';
    }
    const handleInputClick = async (e) => {
        document.getElementById('input_name').value = '';
        document.getElementById('input_age').value = '';
        console.log('writeBoard');
        const request_data = { username: username, age: age, address: address };
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
                method: 'post',
                url: '/api/create-member',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            navigate("/", {});
        } catch (err) {
            console.log('CreateMember/handleInput/err: ', err);
            resetInput();
        }
    }

    // 목록으로
    const handleListBtnClick = async (e) => {
        e.preventDefault();
        navigate("/", { });
    }

    return (
        <>
            <div className="title">멤버 등록 폼</div>
            <div className="form-container">
                <Form className="custom-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이름</Form.Label>
                        <Form.Control id='input_name' type="text" placeholder="이름을 입력하세요" onChange={(e) => setName(e.target.value) } value={username}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>나이</Form.Label>
                        <Form.Control id='input_age' type="number" placeholder="나이를 입력하세요" onChange={(e) => setAge(e.target.value) } value={age}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>주소</Form.Label>
                        <Form.Control id='input_address' type="text" placeholder="주소를 입력하세요" onChange={(e) => setAddress(e.target.value) } value={address}/>
                    </Form.Group>
                    <br/>
                    <Button variant="primary" className="create-member-button" type="button" onClick={handleInputClick}>
                        멤버 등록
                    </Button>
                    <Button variant="secondary" className="create-member-button-back" type="button" onClick={handleListBtnClick}>
                        취소
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default CreateMember;