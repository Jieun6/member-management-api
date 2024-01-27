// # main/frontend/src/pages/Write.jsx
import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './form.css'

const CreateMember = () => {
    const [id, setId] = useState(""); // 멤버 넘버
    const [title, setTitle] = useState(""); // 제목
    const [content, setContent] = useState(""); // 내용
    const [password, setPassword] = useState(""); // 사용자가 입력한 비밀번호 저장
    const [showPassword, setShowPassword] = useState(false); // 비밀번호를 텍스트 형태로 보여줄지 여부 결정
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용
git
    const resetInput = () => {
        setId("");
        setTitle("");
        setContent("");
        setPassword("");
        document.getElementById('input_id').value = '';
        document.getElementById('input_title').value = '';
        document.getElementById('input_content').value = '';
        document.getElementById('input_password').value = '';
    }

    // 저장
    const handleInputClick = async (e) => {
        document.getElementById('input_id').value = '';
        document.getElementById('input_title').value = '';
        console.log('write');
        const request_data = { id: id, title: title, content: content, password: password };
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
                method: 'post',
                url: '/api/create-board',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('write/response: ', response);
            console.log('write/response.status: ', response.status);
            navigate("/", {});
            if(response.status == 200) {
                alert("게시글 작성 완료!")
                navigate("/", { });
            }
            else {
                alert("게시글 작성 실패ㅠ")
            }
        } catch (err) {
            resetInput();
        }
    }

    // 취소
    const handleListBtnClick = async (e) => {
        e.preventDefault();
        navigate("/", { });
    }

    // 비밀번호 토글 함수
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="title">글 작성</div>
            <div className="form-container">
                <Form className="custom-form">
                    <Form.Group className="formGroupStyle" controlId="formBasicEmail">
                        <Form.Label className="labelStyle">멤버 넘버</Form.Label>
                        <Form.Control size="lg" id='input_id' type="text" placeholder="멤버 넘버를 입력하세요" onChange={(e) => setId(e.target.value) } value={id}/>
                    </Form.Group>
                    <Form.Group className="formGroupStyle" controlId="formBasicPassword">
                        <Form.Label className="labelStyle">제목</Form.Label>
                        <Form.Control size="lg" id='input_title' type="text" placeholder="제목을 입력하세요" onChange={(e) => setTitle(e.target.value) } value={title}/>
                    </Form.Group>
                    <Form.Group className="formGroupStyle" controlId="formBasicPassword">
                        <Form.Label className="labelStyle">내용</Form.Label>
                        <Form.Control id='input_content' as="textarea" rows={3} placeholder="내용을 작성하세요" onChange={(e) => setContent(e.target.value) } value={content}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="labelStyle">비밀번호</Form.Label>
                        <Form.Control id='input_password' size="lg" type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value) } value={password}/>
                        <Form.Check type="checkbox" label="비밀번호 보기" onClick={toggleShowPassword} />
                    </Form.Group>
                    <br/>
                    <Button variant="primary" className="create-member-button" type="button" onClick={handleInputClick}>
                        저장
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