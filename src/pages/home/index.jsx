import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import LocalAtm from '@material-ui/icons/LocalAtm';
import Alert from '@material-ui/lab/Alert';
import './styles.css';
import Table from '../../components/user-table/index';
import { UserService } from '../../services/user-service';

const STYLES = {
    background: {
        width: '100%',
        height: 'auto',
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(90deg, #E6E9F0 0%, #EEF1F5 100%)',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert: {
        position: 'absolute',
        top: '40px'
    },
    // Header
    containerHeader: {
        position: 'absolute',
        top: '0px',
        width: '100%',
        height: '40px',
        display: 'flex'
    },
    headerActive: {
        height: '100%',
        flexGrow: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '3px solid #764BA2',
        boxSizing: 'border-box'
    },
    headerNonactive: {
        flexGrow: 1,
        height: '100%',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerEmpty: {
        flexGrow: 7,
        height: '100%',
        backgroundColor: 'rgba(102, 126, 234, 0.1)'
    },
    titleHeader: {
        fontSize: '10px',
        fontWeight: 500,
        color: '#764BA2'
    },
    // Content
    boxBack: {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '20px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxFront: {
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    textField: {
        margin: '10px 40px',
        width: '300px'
    },
    buttonSubmit: {
        margin: '10px 0 40px 0',
        backgroundColor: '#764BA2',
        fontSize: '10px'
    },
    textRequired: {
        justifySelf: 'flex-start',
        margin: '0 45px 10px 45px',
        fontSize: '10px',
        color: '#A8A8A8'
    },
    headerContent: {
        backgroundImage: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
        width: '100%',
        height: '50px',
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30px'
    },
    titleContent: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 500
    }
}

function Home() {
    const history = useHistory();
    const [menuSelected, setMenuSelected] = useState(2)
    const [inputId, setInputId] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputJob, setInputJob] = useState('')
    const [isCreated, setIsCreated] = useState(null)
    const [isUpdated, setIsUpdated] = useState(null)
    const [isDeleted, setIsDeleted] = useState(null)

    useEffect(() => {
        setTimeout(
            function () {
                setIsCreated(null)
                setIsUpdated(null)
                setIsDeleted(null)
            }.bind(this), 2000
        );
    }, [isCreated, isUpdated, isDeleted])

    useEffect(() => {
        setInputId('')
        setInputName('')
        setInputJob('')
    }, [menuSelected])

    const handleCreate = () => {
        const data = {
            name: inputName,
            job: inputJob
        }
        UserService.create(data).then(res => {
            console.log(res)
            res.status == 201 ? setIsCreated(true) : setIsCreated(false)
        })
    }

    const handleUpdate = () => {
        const data = {
            name: inputName,
            job: inputJob
        }
        UserService.update(inputId, data).then(res => {
            console.log(res)
            res.status == 200 ? setIsUpdated(true) : setIsUpdated(false)
        })
    }

    const handleDelete = () => {
        UserService.delete(inputId).then(res => {
            console.log(res)
            res.status == 204 ? setIsDeleted(true) : setIsDeleted(false)
        })
    }

    return (
        <div style={STYLES.background}>
            <div style={STYLES.containerHeader}>
                <div className='header-home' style={menuSelected == 1 ? STYLES.headerActive : STYLES.headerNonactive} onClick={() => setMenuSelected(1)}>
                    <p style={STYLES.titleHeader}>Create User</p>
                </div>
                <div className='header-home' style={menuSelected == 2 ? STYLES.headerActive : STYLES.headerNonactive} onClick={() => setMenuSelected(2)}>
                    <p style={STYLES.titleHeader}>Read User</p>
                </div>
                <div className='header-home' style={menuSelected == 3 ? STYLES.headerActive : STYLES.headerNonactive} onClick={() => setMenuSelected(3)}>
                    <p style={STYLES.titleHeader}>Update User</p>
                </div>
                <div className='header-home' style={menuSelected == 4 ? STYLES.headerActive : STYLES.headerNonactive} onClick={() => setMenuSelected(4)}>
                    <p style={STYLES.titleHeader}>Delete User</p>
                </div>
                <div style={STYLES.headerEmpty}></div>
                <div className='header-home' style={STYLES.headerNonactive} onClick={() => history.push("/gold-price")}>
                    <LocalAtm style={{ color: 'gold' }} />
                    <p style={STYLES.titleHeader}>&nbsp;&nbsp;Gold Price</p>
                    <ArrowRightIcon style={{ color: '#764BA2' }} />
                </div>
            </div>

            {isCreated == true ? <Alert severity="success" style={STYLES.alert}>Create User Success!</Alert> : null}
            {isCreated == false ? <Alert severity="error" style={STYLES.alert}>Create User Error!</Alert> : null}
            {isUpdated == true ? <Alert severity="success" style={STYLES.alert}>Update User Success!</Alert> : null}
            {isUpdated == false ? <Alert severity="error" style={STYLES.alert}>Update User Error!</Alert> : null}
            {isDeleted == true ? <Alert severity="success" style={STYLES.alert}>Delete User Success!</Alert> : null}
            {isDeleted == false ? <Alert severity="error" style={STYLES.alert}>Delete User Error!</Alert> : null}

            {menuSelected == 2 ?
                <div style={STYLES.boxBack}>
                    <div style={STYLES.boxFront}>
                        <Table />
                    </div>
                </div> : null
            }

            {menuSelected == 1 ?
                <div style={STYLES.boxBack}>
                    <div style={STYLES.boxFront}>
                        <div style={STYLES.headerContent}>
                            <p style={STYLES.titleContent}>Create User</p>
                        </div>

                        <TextField
                            label="Name" variant="outlined" size='small'
                            style={STYLES.textField}
                            onChange={(e) => setInputName(e.target.value)}
                        />

                        <TextField
                            label="Job" variant="outlined" size='small'
                            style={STYLES.textField}
                            onChange={(e) => setInputJob(e.target.value)}
                        />

                        <div style={{ width: '100%' }}>
                            <p style={STYLES.textRequired}>*all fields are required</p>
                        </div>

                        <Button
                            variant='contained' color='primary'
                            style={STYLES.buttonSubmit}
                            disabled={inputName == '' || inputJob == '' ? true : false}
                            onClick={() => { handleCreate() }}
                        >Create</Button>
                    </div>
                </div> : null
            }

            {menuSelected == 3 ?
                <div style={STYLES.boxBack}>
                    <div style={STYLES.boxFront}>
                        <div style={STYLES.headerContent}>
                            <p style={STYLES.titleContent}>Update User</p>
                        </div>

                        <TextField
                            label="Id" variant="outlined" type="number" size='small'
                            style={STYLES.textField}
                            onChange={(e) => setInputId(e.target.value)}
                        />

                        <TextField
                            label="Name" variant="outlined" size='small'
                            style={STYLES.textField}
                            onChange={(e) => setInputName(e.target.value)}
                        />

                        <TextField
                            label="Job" variant="outlined" size='small'
                            style={STYLES.textField}
                            onChange={(e) => setInputJob(e.target.value)}
                        />

                        <div style={{ width: '100%' }}>
                            <p style={STYLES.textRequired}>*all fields are required</p>
                        </div>

                        <Button
                            variant='contained' color='primary'
                            style={STYLES.buttonSubmit}
                            disabled={inputId == '' || inputName == '' || inputJob == '' ? true : false}
                            onClick={() => { handleUpdate() }}
                        >Update</Button>
                    </div>
                </div> : null
            }

            {menuSelected == 4 ?
                <div style={STYLES.boxBack}>
                    <div style={STYLES.boxFront}>
                        <div style={STYLES.headerContent}>
                            <p style={STYLES.titleContent}>Delete User</p>
                        </div>

                        <TextField
                            label="Id" variant="outlined" type="number" size='small'
                            style={STYLES.textField}
                            onChange={(e) => setInputId(e.target.value)}
                        />

                        <div style={{ width: '100%' }}>
                            <p style={STYLES.textRequired}>*all fields are required</p>
                        </div>

                        <Button
                            variant='contained' color='primary'
                            style={STYLES.buttonSubmit}
                            disabled={inputId == '' ? true : false}
                            onClick={() => { handleDelete() }}
                        >Delete</Button>
                    </div>
                </div> : null
            }
        </div>
    )
}

export default Home;