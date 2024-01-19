// # frontend/src/pages/UpdateMember.jsx
import { React, useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateMember = () => {
    const [username, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    let location = useLocation();
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
    console.log('UpdateMember/location.state: ', location.state);
    const id = location.state.id;  // 게시글 수정 이후 돌아갈 게시글의 id
    const old_name = location.state.username;
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

    // 수정하기
    const handleInputClick = async (e) => {
        e.preventDefault();
        document.getElementById('input_name').value = '';
        document.getElementById('input_age').value = '';
        document.getElementById('input_address').value = '';
        console.log('writeBoard');
        const request_data = {id: id, username: username, age: age, address: address};
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
            //navigate("/detail", { state : { id: id } });
            if(response.status == 200) {
                alert("게시글 수정 완료!")
                navigate("/", { });
            }
            else {
                alert("게시글 수정 실패ㅠ")
            }
        } catch (err) {
            console.log('CreateMember/handleInput/err: ', err);
            resetInput();
        }
    }

    // 취소하기
    const handleListBtnClick = async (e) => {
        e.preventDefault();
        navigate("/detail", { state : { id: id } });
    }

    useEffect(() => {
        console.log('UpdateMember/useEffect()');
        setName(old_name);
        setAge(old_age);
        setAddress(old_address);
        console.log('username: ', username);
        console.log('age: ', age);
        console.log('address: ', address);
    }, [])

    return (
        <>
            <div className="title">멤버 수정 폼</div>
            <div className="form-container">
                <Form className="custom-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>멤버 ID</Form.Label>
                        <Form.Control id='input_name' type="number" value={id} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이름</Form.Label>
                        <Form.Control id='input_name' type="text" placeholder="이름을 입력하세요" value={username} onChange={(e) => setName(e.target.value) } />
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
                    <Button variant="primary" className="create-member-button" type="button" onClick={handleInputClick}>
                        수정 완료
                    </Button>
                    <Button variant="secondary" className="create-member-button-back" type="button" onClick={handleListBtnClick}>
                        취소하기
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateMember;