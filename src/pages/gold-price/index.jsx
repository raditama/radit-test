import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Moment from 'moment';
import GOLDIMG from '../../assets/images/gold-img.png';
import SILVERIMG from '../../assets/images/silver-img.png';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { Line } from "react-chartjs-2";

const STYLES = {
    background: {
        backgroundImage: 'linear-gradient(90deg, #29323C 0%, #485563 100%)',
        width: '100%',
        height: 'auto',
        minHeight: '100vh',
        padding: '40px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    // Header
    header: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: '40px',
        width: '100%',
        top: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBack: {
        position: 'absolute',
        left: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowBack: {
        color: '#FFFFFF',
        fontSize: '14px',
        margin: '0 5px'
    },
    textBack: {
        color: '#FFFFFF',
        fontSize: '10px',
        fontWeight: 400,
        margin: '0 5px'
    },
    titleHeader: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 500
    },
    // Content
    containerTime: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: '500px',
        borderRadius: '10px',
        flexDirection: 'column',
        margin: '20px'
    },
    textTime: {
        color: '#FFFFFF',
        fontSize: '12px',
        fontWeight: 400
    },
    containerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px'
    },
    boxBack: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
        margin: '0 10px',
        borderRadius: '15px'
    },
    boxGold: {
        backgroundColor: '#F9FFE0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '200px',
        borderRadius: '10px',
        flexDirection: 'column'
    },
    boxSilver: {
        backgroundColor: '#DCE5EA',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '200px',
        borderRadius: '10px',
        flexDirection: 'column'
    },
    textContent: {
        fontSize: '14px',
        fontWeight: 500,
        color: '#485563'
    }
}

function GoldPrice() {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [day, setDay] = useState('-');
    const [time, setTime] = useState('-');
    const [listLable, setListLable] = useState([]);
    const [listGold, setListGold] = useState([]);
    const [listSilver, setListSilver] = useState([]);


    useEffect(() => {
        setInterval(() => {
            var options = {
                method: 'GET',
                url: 'https://gold-price-live.p.rapidapi.com/get_metal_prices',
                headers: {
                    'x-rapidapi-key': '1da52211bemshb084014feec7731p1a37a2jsn2b9be954bd7e',
                    'x-rapidapi-host': 'gold-price-live.p.rapidapi.com'
                }
            };

            var tempLabel = listLable;
            var tempGold = listGold;
            var tempSilver = listSilver;

            Axios.request(options).then(function (res) {
                console.log(res);
                setData(res.data)

                tempGold.push(res.data.gold)
                tempSilver.push(res.data.silver)
                tempLabel.push(Moment(new Date()).format("ss"))
                if (tempLabel.length > 7) {
                    tempLabel.splice(0, 1);
                    tempGold.splice(0, 1);
                    tempSilver.splice(0, 1);
                }
            }).catch(function (error) {
                console.error(error);
            });

            setListLable(tempLabel)
            setListGold(tempGold)
            setListSilver(tempSilver)

            setDay(Moment(new Date()).format("dddd, DD MMMM YYYY"))
            setTime(Moment(new Date()).format("HH : mm : ss"))
        }, 1000)
    }, [])

    return (
        <div style={STYLES.background}>
            <div style={STYLES.header}>
                <div className='button-back' onClick={() => history.push("/")} style={STYLES.buttonBack}>
                    <ArrowBackIcon className='arrow-back' style={STYLES.arrowBack} />
                    <p className='text-back' style={STYLES.textBack}>Back to Home</p>
                </div>
                <h1 style={STYLES.titleHeader}>Gold & Silver Price - Live API Documentation</h1>
            </div>
            <div style={STYLES.containerTime}>
                <p style={STYLES.textTime}>{day}</p>
                <div style={{ backgroundColor: '#FFFFFF', height: '0.5px', width: '90%' }} />
                <p style={STYLES.textTime}>{time}</p>
            </div>
            <div style={STYLES.containerContent}>
                <div style={STYLES.boxBack}>
                    <div className='box-content' style={STYLES.boxGold}>
                        <img className='img-content' src={GOLDIMG} style={{ height: '60px' }} />
                        <p className='text-content' style={STYLES.textContent}>Price: $ {data.gold}</p>
                    </div>
                </div>
                <div style={STYLES.boxBack}>
                    <div className='box-content' style={STYLES.boxSilver}>
                        <img className='img-content' src={SILVERIMG} style={{ height: '60px' }} />
                        <p className='text-content' style={STYLES.textContent}>Price: $ {data.silver}</p>
                    </div>
                </div>
            </div>

            <div style={STYLES.containerContent}>
                <div style={{ backgroundColor: 'black', width: '500px' }}>
                    <Line data={{
                        labels: listLable,
                        datasets: [
                            {
                                label: 'Gold Price',
                                data: listGold,
                                fill: true,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'gold'
                            },
                            {
                                label: 'Silver Price',
                                data: listSilver,
                                fill: true,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'silver'
                            }
                        ]
                    }} />
                </div>
            </div>

        </div>
    );
}

export default GoldPrice;
