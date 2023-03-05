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

const DoctorSchedule = ({doctorId}) => {
  const [allDay, setAllDay] = React.useState([]);

  React.useEffect(() => {
    const arrDate = [];

    for (let i = 0; i < 7; i++) {
      let object = {};

      object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      object.value = moment(new Date()).add(i, "days").startOf("day").format('YYYY-MM-DD HH:mm:ss');

      arrDate.push(object);
    }

    setAllDay(arrDate);
  }, []);

  const getScheduleByDate = async (option) => {
    console.log("date", option)
    const data = await userService.getScheduleByDate(doctorId, option.value);
    console.log("🚀 ~ data:", data)
  }

  return (
    <div className="doctor_schedule_container">
      <div className="all_schedule">
        <Select
          // value={selectedOption}
          onChange={getScheduleByDate}
          options={allDay}

          // className="mt_15"
        />
      </div>
    </div>
  );
};

export default DoctorSchedule;
