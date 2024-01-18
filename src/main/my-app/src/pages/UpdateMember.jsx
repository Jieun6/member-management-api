// # frontend/src/pages/UpdateMember.jsx
import { React, useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateMember = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    let location = useLocation();
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    console.log('UpdateMember/location.state: ', location.state);
    const id = location.state.id;  // 게시글 수정 이후 돌아갈 게시글의 id
    const old_name = location.state.name;
    const old_age = location.state.age;
    const old_address = location.state.address;

    const resetInput = () => {
        setName("");
        setAge("");
        setAddress("");
        document.getElementById('input_name').value = '';
        document.getElementById('input_age').value = '';
        document.getElementById('input_address').value = '';
    }

    const handleInputClick = async (e) => {
        e.preventDefault();
        document.getElementById('input_name').value = '';
        document.getElementById('input_age').value = '';
        document.getElementById('input_address').value = '';
        console.log('writeBoard');
        const request_data = {id: id, username: name, age: age, address: address};
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
                method: 'put',
                url: '/api/update-member',
                headers: {'Content-Type': 'application/json' },
                data: JSON.stringify(request_data)
            });
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            navigate("/detail", { state : { id: id } });
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

    useEffect(() => {
        console.log('UpdateMember/useEffect()');
        setName(old_name);
        setAge(old_age);
        setAddress(old_address);
        console.log('name: ', name);
        console.log('age: ', age);
        console.log('address: ', address);
    }, [])

    return (
        <>
            <div className="title">멤버 수정 폼</div>
            <Form className="custom-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>멤버 ID</Form.Label>
                    <Form.Control id='input_name' type="number" value={id} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이름</Form.Label>
                    <Form.Control id='input_name' type="text" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value) } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>나이</Form.Label>
                    <Form.Control id='input_age' type="number" placeholder="나이를 입력하세요" value={age} onChange={(e) => setAge(e.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>주소</Form.Label>
                    <Form.Control id='input_address' type="text" placeholder="주소를 입력하세요" value={address} onChange={(e) => setAddress(e.target.value) }/>
                </Form.Group>
                <br/>
                <Button variant="primary" className="custom-button" type="button" onClick={handleInputClick}>
                    멤버 수정
                </Button>
                <Button variant="secondary" className="custom-button" type="button" onClick={handleListBtnClick}>
                    목록으로
                </Button>
            </Form>
        </>
    )
}

export default UpdateMember;