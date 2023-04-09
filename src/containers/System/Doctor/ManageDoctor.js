import React from 'react';
import { FormattedMessage } from 'react-intl';
import "./ManageDoctor.scss";

import Select from 'react-select';
import { userService } from '../../../services/index';
import DatePicker from '../../../components/Input/DatePicker';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { isEmpty } from 'lodash';
import moment from 'moment';

const ManageDoctor = () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [doctors, setDoctors] = React.useState([]);
    const [currentDate, setCurrentDate] = React.useState('');
    const [timer, setTimer] = React.useState([]);
    const [timeRanger, setTimeRanger] = React.useState([]);

    const language = useSelector((state) => state.app.language);

    const handleChange = async (selectedOption) => {
        try {
            const { errCode, data } = await userService.getDetailDocTor(selectedOption.value);
            if (errCode === 0) {
                setSelectedOption(selectedOption)
            }
        } catch (e) {
            throw new Error(e)
        }
    };

    const handleSetDate = (date) => {
        setCurrentDate(date[0])
    }

    const handleGetAllCode = async (type) => {
        try {
            const result = await userService.getAllCodeService(type);
            return result.data;
        } catch (e) {
            console.log("error", e)
        }
    }

    React.useEffect(() => {
        handleGetAllCode("time")
        .then((time) => {
            setTimer(time);
        })
    }, [])

    React.useEffect(() => {
        new Promise(async (resolve, reject) => {
            try {
                const { data, errCode } = await userService.getAllDoctor();
    
                const doctors = data.map((item) => {
                    return { value: item.id, label: `${item.firstName} ${item.lastName}` }
                })
    
                if (errCode === 0) {
                    setDoctors(doctors)
                }
    
            } catch (e) {
                throw new Error(e);
            }
        })
    }, [])

    const handleTimer = (item) => {
        const timeRangers = [...timeRanger];
        const key = item.keyMap;

        const isExits = timeRangers.includes(key);

        if(isExits) {
            const indexOf = timeRangers.indexOf(key);
            timeRangers.splice(indexOf, 1);
        } else {
            timeRangers.push(key);
        }

        setTimeRanger(timeRangers)
    }

    const checkItem = (item) => {
        return timeRanger.includes(item)
    }

    const handleSubmit = async () => {
        if(isEmpty(selectedOption) || !currentDate || isEmpty(timeRanger)) {
            toast.error("Missing parameter");
        } else {
            const { value } = selectedOption;
            const date =  moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

            const submitValue = timeRanger.map((item) => {
                return {
                    doctorId: value,
                    time: item,
                    date: date
                }
            })
            
           const data = await userService.postBulkCreateSchedule(submitValue);

           if(data.errCode === 0) {
            toast.success(data.message);
           } else {
            toast.error(data.message);
           }
        }     
    }
        return (
            <div className="manage_shedule-container">
                <div className='title'>
                    <FormattedMessage id="manage-schedult.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>  <FormattedMessage id="manage-schedult.choose-doctor"/></label>
                            <Select
                            value={selectedOption}
                            onChange={handleChange}
                            options={doctors}
                            // className="mt_15"
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedult.choose-date"/></label>
                            <DatePicker 
                            value={currentDate}
                            className="form-control"
                            minDate={new Date()}
                            onChange={handleSetDate}/>
                        </div>
                        <div className='col-12 pick_hour-container'>
                            {timer.map((item, index) => {
                                return (
                                    <button 
                                        className={`${checkItem(item.keyMap) && "active"} btn btn-schedule`} 
                                        onClick={() => handleTimer(item)}
                                        key={index}>{item[language === "vi" ? "valueVi" : "valueEn"]}
                                    </button>
                                )
                            })}
                        </div>
                        <button 
                            style={{width: "120px"}} 
                            className='btn btn-primary mt_15'
                            onClick={handleSubmit}
                        >
                                Lưu thông tin
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default ManageDoctor;
