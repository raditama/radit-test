import React, { useEffect, useState } from 'react';
import { Container, Card, Button, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios';
import './styles.css';
import { UserService } from '../../services/user-service';

const STYLES = {
    container: {
        height: '390px',
        width: '700px'
    },
    // Title
    containerTitle: {
        backgroundImage: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
        width: '100%',
        height: '50px',
        display: 'flex',
        borderRadius: '12px 12px 0 0'
    },
    textTitle: {
        fontSize: '12px',
        fontWeight: 500,
        color: '#FFFFFF'
    },
    // List
    containerList: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '300px',
        overflow: 'auto'
    },
    containerText1: {
        height: '100%',
        width: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    containerText2: {
        height: '100%',
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
    },
    containerText3: {
        height: '100%',
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
    },
    containerText4: {
        height: '100%',
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    listData: {
        backgroundColor: 'rgba(102, 126, 234, 0.10)',
        width: '100%',
        height: '50px',
        display: 'flex',
        margin: '5px 0'
    },
    textList: {
        fontSize: '10px'
    },
    // Footer
    footer: {
        backgroundImage: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
        width: '100%',
        height: '40px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: '0 0 12px 12px'
    },
    textFooter: {
        color: '#ffffff',
        fontSize: '10px',
        fontWeight: 400
    }
}

function UserTable() {
    const [dataUsers, setDataUsers] = useState({ data: [] })
    const [page, setPage] = useState(1)
    const [isDeleted, setIsDeleted] = useState(null)

    useEffect(() => {
        UserService.read(page).then(res => {
            console.log(res)
            setDataUsers(res.data)
        })
    }, [page])

    useEffect(() => {
        setTimeout(
            function () { setIsDeleted(null) }.bind(this), 2000
        );
    }, [isDeleted])

    const handleDelete = (id) => {
        UserService.delete(id).then(res => {
            console.log(res)
            res.status == 204 ? setIsDeleted(true) : setIsDeleted(false)
        })
    }

    return (
        <div style={STYLES.container}>
            {isDeleted == true ? <Alert severity="success" style={{ position: 'absolute', top: '40px' }}>Delete User Success!</Alert> : null}
            {isDeleted == false ? <Alert severity="error" style={{ position: 'absolute', top: '40px' }}>Delete User Error!</Alert> : null}

            <div style={STYLES.containerTitle}>
                <div style={STYLES.containerText1}>
                    <p style={STYLES.textTitle}>Id</p>
                </div>
                <div style={STYLES.containerText2}>
                    <p style={STYLES.textTitle}>Email</p>
                </div>
                <div style={STYLES.containerText3}>
                    <p style={STYLES.textTitle}>First Name</p>
                </div>
                <div style={STYLES.containerText3}>
                    <p style={STYLES.textTitle}>Last Name</p>
                </div>
                <div style={STYLES.containerText4}>
                    <p style={STYLES.textTitle}>Avatar</p>
                </div>
                <div style={STYLES.containerText4}>
                    <p style={STYLES.textTitle}>Action</p>
                </div>
            </div>

            <div className='body-table' style={STYLES.containerList}>
                {dataUsers.data.map((value, index) => {
                    return (
                        <div className="list-data" style={STYLES.listData}>
                            <div style={STYLES.containerText1}>
                                <p style={STYLES.textList}>{value.id}</p>
                            </div>
                            <div style={STYLES.containerText2}>
                                <p style={STYLES.textList}>{value.email}</p>
                            </div>
                            <div style={STYLES.containerText3}>
                                <p style={STYLES.textList}>{value.first_name}</p>
                            </div>
                            <div style={STYLES.containerText3}>
                                <p style={STYLES.textList}>{value.last_name}</p>
                            </div>
                            <div style={STYLES.containerText4}>
                                <img src={value.avatar} style={{ height: '30px' }} />
                            </div>
                            <div style={STYLES.containerText4}>
                                <IconButton onClick={() => handleDelete(value.id)}>
                                    <DeleteIcon fontSize='small' />
                                </IconButton>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div style={STYLES.footer}>
                <p style={STYLES.textFooter}>Page:</p>
                <IconButton onClick={() => page > 1 ? setPage(page - 1) : null}>
                    <ArrowBackIosRoundedIcon style={STYLES.textFooter} />
                </IconButton>
                <p style={STYLES.textFooter}>{page} of {dataUsers.total_pages}</p>
                <IconButton onClick={() => page < dataUsers.total_pages ? setPage(page + 1) : null}>
                    <ArrowForwardIosRoundedIcon style={{ color: '#ffffff', fontSize: '10px', marginRight: '10px' }} />
                </IconButton>
            </div>
        </div>
    )
}

export default UserTable;