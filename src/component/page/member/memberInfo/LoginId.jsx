import React, { useState } from "react";
import LoginChangeButton from "../LoginIdChangeButton";
import { useDispatch, useSelector } from "react-redux";
import { setLoginIdChgError } from "../../../../redux/reducer/userSlice";
import { Button } from "react-bootstrap";

const LoginId = (props) => {

    const dispatch = useDispatch();

    const { memberData } = props

    const [ buttonTitle, setButtonTitle ] = useState("변경하기");
    const [ inputIsVisible, setInputIsVisible ] = useState(false);
    const [ newLoginId, setNewLoginId ] = useState('');

    const { loginChgError } = useSelector(state => state.user);


    const chgButtonHandler = () => {
            if (inputIsVisible) {
                setInputIsVisible(false);
                setButtonTitle("변경하기");
            } else {
                setInputIsVisible(true);
                setButtonTitle("변경취소");
                dispatch(setLoginIdChgError());
            }
        };

    return (
        <div>
            <div className="member-info d-flex justify-content-between">
                <p>{memberData ? memberData.loginId : ""}</p> <Button  onClick={chgButtonHandler}>{buttonTitle}</Button>
            </div>

            {inputIsVisible &&
                <>
                    <div style={{display: "flex", marginTop: "15px"}}>
                        <input className="form-control" type="text"
                        onChange={(e) => setNewLoginId(e.target.value)}
                        style={{width: "auto", marginRight: "10px"}} />
                        <LoginChangeButton 
                            newLoginId={newLoginId}
                        />
                    </div>

                    {loginChgError && 
                        <div style={{marginTop: "10px"}}>
                            {loginChgError.newLoginId.map((error, index) => (
                                <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                            ))}
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default LoginId;