import React from 'react';
import "./post.css";
import { Row, Col } from 'react-bootstrap';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ItemListing from '../itemListing/ItemListing';
import Comment from '../comment/Comment';

export default function Post() {
    return (
        <div className="postWrapper">
            <div className="postContainer">
                <div className="postTop">
                    {/* <div className="postTopContainer"> */}
                        <Row className="postTopContainerWrapper">
                            <Col className="postTopContainerLeft">
                                <img className="postProfileImg" src="/assests/EugeneTan.png" alt=""/>
                                <span className="postProfileText">Username Here</span>
                            </Col>
                            <Col className="postTopContainerRight">
                                {/* Swap Away Button */}
                                <div className="postSwapButtonWrapper">
                                    <div className="postSwapButton">
                                        <TextsmsOutlinedIcon className="chatIcon"/>
                                        <span className="postSwapButtonText">Swap Away!</span>
                                    </div>
                                </div> 
                                {/* Delete Button */}
                                {/* <div className="deleteButtonWrapper">
                                    <div className="deleteButton">
                                        <span className="deleteButtonText">Delete</span>
                                    </div>
                                </div> */}
                            </Col>
                        </Row>
                    {/* </div> */}
                </div>
                <div className="postMiddle">
                    <div className="postMiddleDescription">
                        <div className="postMiddleDescriptionContainer">
                            (Post Description Here) Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Nam massa dui, tincidunt at augue in, mollis consequat felis. 
                            Vestibulum eget laoreet erat. Mauris eu mollis nisi. 
                            Curabitur et ipsum leo. Quisque eu luctus mauris, a consectetur neque. 
                            Nulla velit justo, varius eget sagittis eu, egestas non neque. 
                            Duis at leo eget sem rhoncus vehicula nec varius urna. 
                            Proin a consectetur tellus, vel feugiat leo. 
                            Nam condimentum hendrerit velit auctor feugiat.
                        </div>
                    </div>
                    <div className="postMiddleItemListing">
                        <ItemListing />
                    </div>
                    <div className="postMiddleItemLikesComments">
                        <div className="postMiddleItemLikesCommentsContainer">
                            <div className="postMiddleItemLikes">
                                <FavoriteIcon />
                                <span className="numberLikes">10</span>
                            </div>
                            <div className="postMiddleItemComments">
                                <ChatBubbleOutlineIcon />
                                <span className="numberComments">333 comments</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="postBottom">
                        <div className="postCommentInputWrapper">
                            <input className="postCommentInput" placeholder="Write a comment..."/>
                        </div>
                        <div className="postCommentContentSection">
                            <Comment />
                            <Comment />
                        </div>
                </div>
            </div>
        </div>
    )
}
