import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './userRedux.scss';
import { userService } from '../../../services/index';
import { useSelector } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const UserRedux = () => {
    const [genderList, setGenderList] = React.useState([]);
    const [role, setRole] = React.useState([]);
    const [previewImg, setPreviewImg] = React.useState(null);
    const [position, setPosition] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const language = useSelector((state) => state.app.language);

    React.useEffect(() => {
        handleGetAllCode("gender")
            .then(res => {
                setGenderList(res)
            })

        handleGetAllCode("role")
            .then(res => {
                setRole(res)
            })
        handleGetAllCode("position")
            .then(res => {
                setPosition(res)
            })
    }, [])

    const handleGetAllCode = async (type) => {
        try {
            const result = await userService.getAllCodeService(type);
            return result.data;
        } catch (e) {
            console.log("error", e)
        }
    }

    const handleChangeImage = (e) => {
        const data = e.target.files;
        const file = data[0];

        const objectURL = URL.createObjectURL(file);
        setPreviewImg(objectURL);
    }

    return (
        <div className='user-redux-container'>
            <div className='title'>User redux</div>
            <div className='body'>
                <div><FormattedMessage id="manage-user.add" /></div>
            </div>
            <div className='user-redux-body'>
                <div className='container'>
                    <div className='row'>
                        <div className="form-group col-md-3">
                            <label for="inputEmail4"><FormattedMessage id="manage-user.email" /></label>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputAddress"><FormattedMessage id="manage-user.firstName" /></label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputAddress2"><FormattedMessage id="manage-user.lastName" /></label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputCity"><FormattedMessage id="manage-user.phoneNumber" /></label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="form-group col-md-8">
                            <label for="inputCity"><FormattedMessage id="manage-user.address" /></label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>

                        <div className="form-group col-md-3">
                            <label for="inputState"><FormattedMessage id="manage-user.gender" /></label>
                            <select id="inputState" className="form-control">
                                {genderList && genderList.map((item, index) => {
                                    return <option key={index}> {language === "vi" ? item.valueVi : item.valueEn}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState"><FormattedMessage id="manage-user.roleId" /></label>
                            <select id="inputState" className="form-control">
                                {role && role.map((item, index) => {
                                    return <option key={index} value={item.key}> {language === "vi" ? item.valueVi : item.valueEn}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState"><FormattedMessage id="manage-user.positionId" /></label>
                            <select id="inputState" className="form-control">
                                {position && position.map((item, index) => {
                                    return <option key={index} value={item.key}> {language === "vi" ? item.valueVi : item.valueEn}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputZip"><FormattedMessage id="manage-user.image" /></label>
                            <div className='preview_container'>
                                <input type="file" className="form-control" id="previewImg" hidden onChange={(e) => {
                                    handleChangeImage(e)
                                }} />
                                <label htmlFor='previewImg' className='label_upload' >Tai anh &nbsp;<i className="fas fa-upload"></i></label>
                                <div
                                    className='privew-image'
                                    style={{ backgroundImage: `url(${previewImg})` }}
                                    onClick={() => {
                                     previewImg && setIsOpen(true)   
                                    }}
                                >
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        {isOpen && <Lightbox
                            mainSrc={previewImg}
                            onCloseRequest={() => setIsOpen(false)}
                        />}</div>

                    <button type="submit" className='btn_submit'>Submit</button>
                </div>
            </div>
        </div>
    )

}


export default UserRedux;
