import React from "react";
import { FormattedMessage } from "react-intl";
import "./DoctorSchedule.scss";
import { userService } from "../../../services/index";
import DatePicker from "../../../components/Input/DatePicker";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Select from "react-select";
import { isEmpty } from "lodash";
import moment from "moment";

const DoctorSchedule = ({ doctorId, handleSelected }) => {
  const [allDay, setAllDay] = React.useState([]);
  const [timer, setTimer] = React.useState([]);

  const language = useSelector((state) => state.app.language);

  React.useEffect(() => {
    const arrDate = [];

    for (let i = 0; i < 7; i++) {
      let object = {};

      object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      object.value = moment(new Date())
        .add(i, "days")
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");

      arrDate.push(object);
    }

    setAllDay(arrDate);
  }, []);


  const getScheduleByDate = async (option) => {
    try {
      const { errCode, data} = await userService.getScheduleByDate(doctorId, option.value);
      if(errCode === 0) {
        setTimer(data)
      }
    } catch(e) {
      throw new Error(e)
    }
    
  };

  return (
    <div className="doctor_schedule_container">
      <div className="all_schedule">
        <Select
          onChange={getScheduleByDate}
          options={allDay}
        />
      </div>
      <div className="col-12 pick_hour-container">
          {!isEmpty(timer) ? timer.map((item, index) => {
            const { timeData } = item;
            return (
              <button
                className="active btn btn-schedule"
                key={index}
                onClick={() => handleSelected(item)}
              >
                {timeData[language === "vi" ? "valueVi" : "valueEn"]}
              </button>
            );
          }) : "Ngày này hiện chưa có lịch hẹn"}
        </div>
    </div>
  );
};

export default DoctorSchedule;
