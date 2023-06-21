import React from 'react';
import './statsoverlay.css';
import { Firebase } from "../../global";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FaTimes } from 'react-icons/fa';

const StatsOverlay = ({ close }) => {
    const [hookahBowls, setHookahBowls] = React.useState(null);
    const [hookahBowlsAllTime, setHookahBowlsAllTime] = React.useState(0);
    const [hookahBowlsThisMonth, setHookahBowlsThisMonth] = React.useState(0);
    const [hookahBowlsLastMonth, setHookahBowlsLastMonth] = React.useState(0);
    const [hookahBowlsThisYear, setHookahBowlsThisYear] = React.useState(0);
    const [hookahBowlsLastYear, setHookahBowlsLastYear] = React.useState(0);
    const db = getFirestore(Firebase);

    React.useEffect(() => {
        const getStats = async () => {
            const querySnapshot = await getDocs(collection(db, "hookahBowlsSold"));
            if (!querySnapshot.empty) {
                setHookahBowls(JSON.parse(querySnapshot.docs[0].data().hookahBowls));                
            }
        };
        getStats();
    }, []);

    React.useEffect(() => {
        const currentDate = new Date();
        let counterThisMonth = 0;
        let counterLastMonth = 0;
        let counterThisYear = 0;
        let counterLastYear = 0;
        if (hookahBowls) {
            setHookahBowlsAllTime(hookahBowls.length);
            hookahBowls.forEach(e => {
                const dateParts = e.date.split('/');
                const day = parseInt(dateParts[0], 10);
                const month = parseInt(dateParts[1], 10);
                const year = parseInt(dateParts[2], 10);
                const otherDate = new Date(year, month - 1, day);
                if ((currentDate.getMonth() === otherDate.getMonth()) && (currentDate.getFullYear() === otherDate.getFullYear())) {
                    counterThisMonth++;
                }
                if ((currentDate.getMonth() === otherDate.getMonth() + 1) && (currentDate.getFullYear() === otherDate.getFullYear())) {
                    counterLastMonth++;
                }
                if (currentDate.getFullYear() === otherDate.getFullYear()) {
                    counterThisYear++;
                }                
                if (currentDate.getFullYear() === otherDate.getFullYear() + 1) {
                    counterLastYear++;
                }
            });
            setHookahBowlsThisMonth(counterThisMonth);
            setHookahBowlsLastMonth(counterLastMonth);
            setHookahBowlsThisYear(counterThisYear);
            setHookahBowlsLastYear(counterLastYear);            
        }
    }, [hookahBowls]);

    return (
        <div className = 'statsoverlay'>
            <h1>Stats</h1>
            <p>Bowls sold since { hookahBowls !== null ? (hookahBowls[0].date) : null }: { hookahBowlsAllTime }</p>
            <p>Bowls sold this month: { hookahBowlsThisMonth }</p>
            <p>Bowls sold last month: { hookahBowlsLastMonth }</p>
            <p>Bowls sold this year: { hookahBowlsThisYear }</p>
            <p>Bowls sold last year: { hookahBowlsLastYear }</p>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
};

export default StatsOverlay;