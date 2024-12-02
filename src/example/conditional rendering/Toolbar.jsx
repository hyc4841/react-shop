import React from "react";

const styles = {
    wrapper: {
        padding: 16,
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid grey",
    },
    greeting: {
        marginRight: 8,
    },
};

function Toolbar(props) {
    // props로 함수도 전달이 가능하다. onClickLogin과 onClickLogout은 함수임.
    const { isLoggedIn, onClickLogin, onClickLogout } = props;

    // 단축 평가와 3항 연산자를 이용한 조건부 랜더링
    return (
        <div style={styles.wrapper}>
            {isLoggedIn && <span style={styles.greeting}>환영합니다</span>}
            {isLoggedIn ? (<button onClick={onClickLogout}>로그아웃</button>) : (<button onClick={onClickLogin}>로그인</button>)}
        </div>
    );
}

export default Toolbar;