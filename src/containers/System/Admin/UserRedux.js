import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './userRedux.scss';
import { userService } from '../../../services/index';
import { useSelector } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import UserManage from './TableManageUser';
import { toast } from 'react-toastify';
import toBase64 from '../../../utils/convertBase64';

const UserRedux = () => {
    const [genderList, setGenderList] = React.useState([]);
    const [role, setRole] = React.useState([]);
    const [previewImg, setPreviewImg] = React.useState(null);
    const [position, setPosition] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const language = useSelector((state) => state.app.language);
    const [isEdit, setIsEdit] = React.useState(false);
    const [infomation, setInfomation] = React.useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "", 
        roleId: "", 
        positionId: "",
        id: "",
    })
    const [avatar, setAvatar] = React.useState(null);

    const [userList, setUserList] = React.useState(null);

    React.useEffect(() => {
        handleGetListUser()
    }, [])

    React.useEffect(() => {
        const gender = genderList?.[0]?.keyMap;
        const roleF = role?.[0]?.keyMap;
        const positn = position?.[0]?.keyMap;

        setInfomation((prev) => {
            return {
                ...prev,
                gender: gender,
                roleId: roleF,
                positionId: positn
            }
        })
    }, [genderList, role, position])

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

    const handleChangeImage = async (e) => {
        const data = e.target.files;
        const file = data[0];
        const image = await toBase64(file);
      
        const objectURL = URL.createObjectURL(file);
     
        setAvatar(image)
        setPreviewImg(objectURL);
    }

    const handleGetListUser = async () => {
        try {
            const response = await userService.getAllUser("ALL");
            if (response && response.errCode === 0) {
                setUserList(response.users)
            }
        } catch (e) {
            console.log("e", e)
        }
    }

    const handleSumbit = async () => {
        let isValid = true;
        
        for(let ele in infomation) {
            if(!infomation[ele]) {
                if(ele === "id") continue;
                alert(`${ele} is missing!`);
                isValid = false;
                return;
            }
        }

        if(isValid) {
            const res = await userService.addNewUser(infomation, avatar);
            if(res.errCode === 0) {
                toast.success("Create user succes ");
                handleGetListUser()
            } else {
                alert(res.message);
            }
            console.log("🚀 ~ res", res)
        }
    }

    const handleUpdateUser = async () => {
        let isValid = true;
        
        for(let ele in infomation) {
            if(!infomation[ele]) {
                alert(`${ele} is missing!`);
                isValid = false;
                return;
            }
        }

        if(isValid) {
            const res = await userService.handleUpdateUser(infomation, previewImg);
            if(res.errCode === 0) {
                toast.success("Update user succes ");
                handleGetListUser()
            } else {
                alert(res.message);
            }
            console.log("🚀 ~ res", res)
        }

        const dataInfo = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: genderList?.[0]?.keyMap, 
            roleId: role?.[0]?.keyMap, 
            positionId: position?.[0]?.keyMap,
            id: "",
            // image: ""
        }
        setInfomation(dataInfo)
        setPreviewImg('')
        setIsEdit(false);
    }
    
    const handleChangeInput = (e, key) => {
        const val = e.target.value;
        setInfomation((prev) => {
            return {
                ...prev,
                [key]: val,
            }

        })
    }

    const handleSetEdit = (data) => {

        let imageBase64 = '';
       
        if(data.image) {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary');
        }

        setPreviewImg(imageBase64)
      
        const dataInfo = {
            email: data.email,
            // password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            gender: data.gender, 
            roleId: data.roleId, 
            positionId: data.positionId,
            id: data.id,
            // image: ""
        }
        setInfomation(dataInfo);
        setIsEdit(true)
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
                            <input disabled={isEdit} onChange={(e) => handleChangeInput(e, "email")} value={infomation.email} type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                            <input disabled={isEdit} onChange={(e) => handleChangeInput(e, "password")} value={infomation.password}  type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputAddress"><FormattedMessage id="manage-user.firstName" /></label>
                            <input onChange={(e) => handleChangeInput(e, "firstName")} value={infomation.firstName}  type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputAddress2"><FormattedMessage id="manage-user.lastName" /></label>
                            <input onChange={(e) => handleChangeInput(e, "lastName")}  value={infomation.lastName}  type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputCity"><FormattedMessage id="manage-user.phoneNumber" /></label>
                            <input onChange={(e) => handleChangeInput(e, "phoneNumber")} value={infomation.phoneNumber}  type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="form-group col-md-8">
                            <label for="inputCity"><FormattedMessage id="manage-user.address" /></label>
                            <input onChange={(e) => handleChangeInput(e, "address")} value={infomation.address}  type="text" className="form-control" id="inputCity" />
                        </div>

                        <div className="form-group col-md-3">
                            <label for="inputState"><FormattedMessage id="manage-user.gender" /></label>
                            <select onChange={(e) => handleChangeInput(e, "gender")} alue={infomation.gender}  id="inputState" className="form-control">
                                {genderList && genderList.map((item, index) => {
                                    return <option key={index} value={item.keyMap}> {language === "vi" ? item.valueVi : item.valueEn}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState"><FormattedMessage id="manage-user.roleId" /></label>
                            <select onChange={(e) => handleChangeInput(e, "roleId")} value={infomation.roleId}  id="inputState" className="form-control">
                                {role && role.map((item, index) => {
                                    return <option key={index} value={item.keyMap}> {language === "vi" ? item.valueVi : item.valueEn}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState"><FormattedMessage id="manage-user.positionId" /></label>
                            <select onChange={(e) => handleChangeInput(e, "positionId")}  value={infomation.positionId}  id="inputState" className="form-control">
                                {position && position.map((item, index) => {
                                    return <option key={index} value={item.keyMap}> {language === "vi" ? item.valueVi : item.valueEn}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputZip"><FormattedMessage id="manage-user.image" /></label>
                            <div className='preview_container'>
                                <input value={infomation.image}  type="file" className="form-control" id="previewImg" hidden onChange={(e) => {
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
                        />}
                    </div>
                    {isEdit ?
                    <button type="submit" className='btn_submit' style={{backgroundColor: "orange"}} onClick={handleUpdateUser}>Submit Edit</button> :
                    <button type="submit" className='btn_submit' onClick={handleSumbit}>Submit</button>}
                    <UserManage userList={userList} handleGetListUser={handleGetListUser} setEdit={handleSetEdit}/>
                </div>
            </div>
        </div>
    )

}


export default UserRedux;
