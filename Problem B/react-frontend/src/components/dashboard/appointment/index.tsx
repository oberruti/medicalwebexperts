import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { noop } from "utils/utils"
import { getValueOrDefault, nil } from "utils/checks"
import Select from "react-select"
import { Style, StyleMap } from 'utils/tsTypes'
import { VerticalStack } from 'common/components/flex'
import DatePicker from 'react-date-picker'
import { HourModel } from '../hourPicker/model'
import { AppointmentTypeModel } from '../appointmentType/model'
import { AppointmentModel } from './model'
import { AppointmentType } from '../appointmentType/common'
import { backgroundColor } from 'style'

interface MaybeAddAppointmentProps {
    isAppointmentTypeSelected: boolean
    appointmentTypeSelected: number
    accessToken: string
    email: string | nil
    cleanScreen: () => void
}

export const MaybeAddAppointment = (props: MaybeAddAppointmentProps): JSX.Element => {
    if (!props.isAppointmentTypeSelected) {
        return <></>
    }
    return <AddAppointment
        email={props.email}
        appointmentTypeSelected={props.appointmentTypeSelected}
        accessToken={props.accessToken}
        cleanScreen={props.cleanScreen}
    />
}

const AddAppointment = (props: {appointmentTypeSelected: number, accessToken: string, 
    cleanScreen: () => void,
    email: string | nil}): JSX.Element => {
    const style: Style = {
        backgroundColor: 'white',
        color: 'black',
        width: '145px',
        alignSelf: 'center',
    }

    const [isDatePicked, setIsDatePicked] = useState(false)
    const [date, setDate] = useState(new Date())

    return (
        <VerticalStack style={{
            color: 'black',
            fontSize: '20px',
            fontFamily: 'Arial',
            }}>
            Please select a day:
                <div style={style}>
                    <DatePicker
                        onChange={(date: Date | Date[]) => {
                            if (Array.isArray(date)) {
                                noop()
                                setIsDatePicked(false)
                            } else {
                                setDate(date)
                                setIsDatePicked(true)
                            }
                        }}
                        value={date}
                        format={'MM/dd/y'}
                        required={true}
                        clearIcon={null}
                        minDate={new Date()}
                    />
                </div>
                <MaybeHourPicker email={props.email} cleanScreen={props.cleanScreen} accessToken={props.accessToken} isDatePicked={isDatePicked} date={date} appointmentTypeSelected={props.appointmentTypeSelected}/>
        </VerticalStack>
    )
}

interface MaybeHourPickerProps {
    appointmentTypeSelected: number
    isDatePicked: boolean
    date: Date
    accessToken: string
    email: string | nil
    cleanScreen: () => void
}

const MaybeHourPicker = (props: MaybeHourPickerProps): JSX.Element => {
    if (!props.isDatePicked) {
        return <></>
    }
    return <HourPicker email={props.email} cleanScreen={props.cleanScreen} accessToken={props.accessToken} date={props.date} appointmentTypeSelected={props.appointmentTypeSelected} />
}

interface HourPickerProps {
    appointmentTypeSelected: number
    date: Date
    accessToken: string
    email: string | nil
    cleanScreen: () => void
}

const HourPicker = (props: HourPickerProps): JSX.Element => {
    const hourModel = new HourModel()

    const appointmentTypesModel = new AppointmentTypeModel(props.accessToken)

    const appointmentModel = new AppointmentModel(props.accessToken)

    const emptyAppointmentTypes: AppointmentType[] = []
    const [appointmentTypes, setAppointmentTypes] = useState(emptyAppointmentTypes)

    const emptyHour = {
        minutes: -1,
        hour: '',
    }
    const [hourSelected, setHourSelected] = useState(emptyHour)

    const [message, setMessage] = useState('')

    const loadAppointmentTypes = useCallback(async () => {
        const backendAppointmentTypes = await appointmentTypesModel.getAppointmentTypes()
        setAppointmentTypes(backendAppointmentTypes)
    }, [setAppointmentTypes])

    /*
     * Load the information
     */
    useEffect(() => {
        void loadAppointmentTypes()
    }, [loadAppointmentTypes])

    const appointmentTypeSelected = appointmentTypes.find(appointmentType => appointmentType.id == props.appointmentTypeSelected)


    const saveAppointment = async () => {
        const day = props.date.toString()
        const initial_hour = hourSelected.minutes.toString()
        const final_hour = (hourSelected.minutes + parseInt(getValueOrDefault(appointmentTypeSelected?.duration, '0'))).toString()
        const appointment_type_name = getValueOrDefault(appointmentTypeSelected?.name, '')


            const savedAppointment = await appointmentModel.tryToSaveAppointment(
                day,
                initial_hour,
                final_hour,
                appointment_type_name,
                props.email,
                setMessage,
            )
            if (!savedAppointment) {
                return
            }
            props.cleanScreen()
        }

    const tryToSaveTaskWithEffect = () => {
        void saveAppointment()
    }

    if (appointmentTypes === emptyAppointmentTypes) {
        return <></>
    }
    
    const hoursAvailable = hourModel.getHoursAvailable(props.date, appointmentTypeSelected)
    const hoursToShow = hourModel.getHoursToShow(hoursAvailable)

    const isHourSelected = hourSelected.minutes != emptyHour.minutes

    return (
        <VerticalStack>
            <HourDropdown 
                hours={hoursToShow}
                setHourSelected={setHourSelected}
            />
            <MaybeSaveButton onClickSave={tryToSaveTaskWithEffect} isHourSelected={isHourSelected}  />
        </VerticalStack>
    )
}

interface HourDropdownInterface {
    hours: {minutes: number, hour: string}[]
    setHourSelected: React.Dispatch<React.SetStateAction<{
        minutes: number;
        hour: string;
    }>>
}

const HourDropdown = (props: HourDropdownInterface): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState('')

    /*
     * Rendering
     */
    const styles: StyleMap = {
        container: {
            margin: '0',
            padding: '30px',
            display: 'flex',
            placeItems: 'center',
            alignItems: 'center',
            background: backgroundColor,
        },
        dropdown: {
            width: '350px',
            marginTop: '10px',
            marginBottom: '0px',
            fontFamily: 'Arial',
            color: 'black',
        },
        title: {
            marginTop: '5%',
            textAlign: 'center',
            color: 'black',
            fontSize: '20px',
            fontFamily: 'Arial',
        },
    }

    const isDropdownDisabled = props.hours.length === 0
    const onHourSelected = useCallback(
        (maybeValue: any) => {
            const value = getValueOrDefault(maybeValue, { value: '' })
            const hourSelected = {
                minutes: value.value,
                hour: value.label,
            }
            props.setHourSelected(hourSelected)

        },
        [props.setHourSelected]
    )

    return (
            <VerticalStack style={styles.container}>
                <label style={styles.title}>Select an hour:</label>
                <Dropdown
                    style={styles.dropdown}
                    isDisabled={isDropdownDisabled}
                    hours={props.hours}
                    onChange={onHourSelected}
                />
                <label style={styles.title}>{errorMessage}</label>
            </VerticalStack>
    )
}

interface DropdownProps {
    isDisabled: boolean
    hours: any
    style: Style
    onChange: (value: any) => void
}

const Dropdown = (props: DropdownProps): JSX.Element => {
    const options = props.hours.map((hour: {minutes: number, hour: string}) => {
        return {
            label: hour.hour,
            value: hour.minutes,
        }
    })
    const errorMessage = props.isDisabled
        ? 'There is not hour available, please select another date.'
        : ''
    const style: Style = {
        color: 'white',
        marginTop: '5%',
        display: 'flex',
        marginLeft: '10%',
    }
    
    return (
        <div style={props.style}>
            <Fragment>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={props.isDisabled}
                    isClearable={true}
                    isSearchable={true}
                    name="Hours"
                    options={options}
                    onChange={props.onChange}
                />
                <div style={style}> {errorMessage} </div>
            </Fragment>
        </div>
    )
}

const MaybeSaveButton = (props: {onClickSave: any, isHourSelected: boolean}): JSX.Element => {
    if (!props.isHourSelected) {
        return <></>
    }
    return <SaveButton onClickSave={props.onClickSave}/>
}

const SaveButton = (props: {onClickSave: any}): JSX.Element => {
    const style: Style = {
        background: '#4caf50',
        width: '100px',
        height: '35px',
        alignSelf: 'center',
        borderRadius: '4px',
        border: '3px',
        fontSize: '20px',
    }
    return <button style={style} onClick={props.onClickSave}>Save</button>
}