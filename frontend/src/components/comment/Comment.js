import React from 'react';
import "./comment.css";

export default function Comment() {
    return (
        <div className="commentWrapper">
            <div className="commentContainer">
                <div className="commentUserDetails">
                    <img className="commentProfileImg" src="/assests/AmeliaNg.jpeg" alt=""/>
                    <span className="commentProfileText">Username Here</span>
                </div>
                <div className="commentUserContent">
                    sdadssasdasdasdjaksdjaksdjapjdskjdkajsdlkjaskdjaskldjaklsjdkalsjdklajsdjaskldjasjdklasjdlasjkdasdasd
                    kfjkdfjsdfsdkfjdkfjklasdjfasdjfsdjafjasdfjsdajfasjdfasjfjsadfjasjfhjgjfghjhjasdfadsfsfsdfdsfasfsd
                hahsddasdaasdadadadadadadsadd
                </div>
            </div>
        </div>
    )
}
