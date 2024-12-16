import React, { useState } from "react";

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    // 로그인 버튼 눌렀을 때 호출할 함수
    const loginSubmit = (e) => {
        e.preventDefault();
        // 로그인 처리 로직
        console.log("로그인 정보 : ", { loginId, password });
    };

    return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>로그인</h2>
      <form onSubmit={loginSubmit}>
        <div>
          <label>아이디:</label>
          <input 
            type="text" 
            value={loginId} 
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div>
          <label>비밀번호:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
    );
};