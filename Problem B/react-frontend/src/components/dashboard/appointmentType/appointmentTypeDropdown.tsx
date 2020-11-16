import { VerticalStack } from "common/components/flex"
import React, { useCallback, useState, useEffect, Fragment } from "react"
import { Cookies } from "react-cookie/lib"
import Select from "react-select"
import { backgroundColor } from "style"
import { getValueOrDefault, nil } from "utils/checks"
import { Style, StyleMap } from "utils/tsTypes"
import { AppointmentType } from './common';
import { AppointmentTypeModel } from "./model"

interface AppointmentTypeDropdownProps {
    cookies: Cookies
    email: string | nil
    setIsAppointmentTypeSelected: React.Dispatch<React.SetStateAction<boolean>>
    setAppointmentTypeSelected: React.Dispatch<React.SetStateAction<number>>
}

export const AppointmentTypeDropdown = (props: AppointmentTypeDropdownProps): JSX.Element => {
    const accessToken = props.cookies.get('access_token')
    const [errorMessage, setErrorMessage] = useState('')

    /*
     * Appointment Type Model
     */
    const model = new AppointmentTypeModel(accessToken)
    const emptyAppointmentTypes: AppointmentType[] = []
    const [appointmentTypes, setAppointmentTypes] = useState(emptyAppointmentTypes)

    const loadAppointmentTypes = useCallback(async () => {
        const backendAppointmentTypes = await model.getAppointmentTypes(setErrorMessage)
        setAppointmentTypes(backendAppointmentTypes)
    }, [setAppointmentTypes])

    /*
     * Load the information
     */
    useEffect(() => {
        void loadAppointmentTypes()
    }, [loadAppointmentTypes])

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
            marginTop: '20px',
            marginBottom: '0px',
            fontFamily: 'Arial',
        },
        title: {
            marginTop: '5%',
            textAlign: 'center',
            color: 'black',
            fontSize: '20px',
            fontFamily: 'Arial',
        },
    }

    const [isOptionSelected, setIsOptionSelected] = useState(false)
    const isDropdownDisabled = appointmentTypes.length === 0
    const onOptionSelected = useCallback(
        (maybeValue: any) => {
            const value = getValueOrDefault(maybeValue, { value: '' })
            setIsOptionSelected(value.value !== '')
            props.setIsAppointmentTypeSelected(value.value !== '')
            props.setAppointmentTypeSelected(value.value)

        },
        [setIsOptionSelected, props.setIsAppointmentTypeSelected]
    )

    if (props.email === '') {
        return <></>
    }

    return (
            <VerticalStack style={styles.container}>
                <label style={styles.title}>Select an appointment type:</label>
                <Dropdown
                    style={styles.dropdown}
                    isDisabled={isDropdownDisabled}
                    appointmentTypes={appointmentTypes}
                    onChange={onOptionSelected}
                />
                <label style={styles.title}>{errorMessage}</label>
            </VerticalStack>
    )
}

interface DropdownProps {
    isDisabled: boolean
    appointmentTypes: any
    style: Style
    onChange: (value: any) => void
}

const Dropdown = (props: DropdownProps): JSX.Element => {
    const options = props.appointmentTypes.map((appointmentType: AppointmentType) => {
        return {
            label: appointmentType.name,
            value: appointmentType.id,
        }
    })
    const errorMessage = props.isDisabled
        ? 'There is not appointment type available.'
        : ''
    const style: Style = {
        color: 'black',
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
                    name="Appointments"
                    options={options}
                    onChange={props.onChange}
                />
                <div style={style}> {errorMessage} </div>
            </Fragment>
        </div>
    )
}