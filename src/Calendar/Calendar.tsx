import React, { useState ,useEffect} from 'react';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as Back } from './back.svg'
import { ReactComponent as Forward } from './forward.svg';
import './Calendar.css';

interface Props{
    onChange:(val:Date)=>void
}

const Calendar: React.FC<Props> = ({onChange}) => {
    const [date, setDate] = useState<Date>(new Date());

    const [selectDate, setSelectDate] = useState<number | undefined>(new Date().getDate());
    date.setDate(1);

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const months: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];


    const weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    function renderWeekDays() {
        return weekDays.map(el => <div key={el} className="weekDay">{el}</div>)
    }

    function createPrevDate() {
        const days = [];
        for (let x = firstDayIndex; x > 0; x--) {
            days.push(
                <div key={x} className="invisible"> </div>
            );
        }
        return days;
    }


    function renderDays() {
        const days: JSX.Element[] = [];
        for (let i = 1; i <= lastDay; i++) {
            if (
                i === new Date().getDate() &&
                date.getMonth() === new Date().getMonth()
                && date.getFullYear()=== new Date().getFullYear()
            ) {
                days.push(<div key={i} onClick={(e: React.MouseEvent<HTMLDivElement>) => setSelectDate(parseInt((e.target as HTMLDivElement).innerHTML!))} className="day today">{i}</div>);
            }else if (i === selectDate) {
                days.push(
                    <div key={i} className="day selected">
                        {i}
                    </div>
                );
            } else {
                days.push(
                    <div className="day" key={i} onClick={(e: React.MouseEvent<HTMLDivElement>) => setSelectDate(parseInt((e.target as HTMLDivElement).innerHTML!))}>{i}</div>
                );
            }
        }
        return days;
    }

    if(!onChange){
        throw(new Error("Calendar must have an 'onChange' property!!!"))
    }

    useEffect(()=>{
        onChange(new Date(date.getFullYear(),date.getMonth(),selectDate));
    },[selectDate,date,onChange])


    return (
        <div className="calendar">
            <div className="calendar__header">
                <IconButton color="#ffffff" size="large" onClick={() =>{
                                        setDate(
                                            (prev) =>
                                                new Date(
                                                    prev.getFullYear(),
                                                    prev.getMonth() - 1,
                                                   prev.getDate()
                                               )
                                       )}
                   }><Back/></IconButton>
                
                {months[date.getMonth()]} {date.getFullYear()}
                <IconButton color="#ffffff" size="large" onClick={() =>{
                                        setDate(
                                            (prev) =>
                                                new Date(
                                                    prev.getFullYear(),
                                                    prev.getMonth() + 1,
                                                    prev.getDate()
                                                )
                                        )}
                    }><Forward/></IconButton>
            </div>
            <div className="calendar__weekDays">
                {renderWeekDays()}
            </div>
            <div className="calendar__daysContainer">
                {createPrevDate()}
                {renderDays()}
            </div>
        </div>
    );
}

export default Calendar;