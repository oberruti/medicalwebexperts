import { VerticalStack } from "common/components/flex"
import React, { useCallback, useState, useEffect, Fragment } from "react"
import { Cookies } from "react-cookie/lib"
import Select from "react-select"
import { getValueOrDefault } from "utils/checks"
import { Style, StyleMap } from "utils/tsTypes"
import { AppointmentTypeModel } from "./model"

interface AppointmentTypeDropdownProps {
    cookies: Cookies
    setIsAppointmentTypeSelected: React.Dispatch<React.SetStateAction<boolean>>
    setAppointmentTypeSelected: React.Dispatch<React.SetStateAction<string>>
}

export const AppointmentTypeDropdown = (props: AppointmentTypeDropdownProps): JSX.Element => {
    const accessToken = props.cookies.get('access_token')
    const [errorMessage, setErrorMessage] = useState('')

    /*
     * TaskModel
     */
    const model = new AppointmentTypeModel(accessToken)
    const emptyAppointmentTypes: any = []
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
            padding: '0',
            display: 'flex',
            gridTemplateColumns: '1fr',
            gridRow: '1fr',
            placeItems: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            background: '#222',
        },
        dropdown: {
            width: '350px',
            marginTop: '50px',
            marginBottom: '0px',
            fontFamily: 'Arial',
        },
        title: {
            marginTop: '5%',
            textAlign: 'center',
            color: 'white',
            fontSize: '20px',
            fontFamily: 'Arial',
        },
    }

    const [isOptionSelected, setIsOptionSelected] = useState(false)
    const isDropdownDisabled = appointmentTypes.length === 0
    const onOptionSelected = useCallback(
        (maybeValue: any) => {
            const value = getValueOrDefault(maybeValue, { value: '' })
            props.setAppointmentTypeSelected(value.value)
            setIsOptionSelected(value.value !== '')
            props.setIsAppointmentTypeSelected(value.value !== '')

        },
        [setIsOptionSelected, props.setIsAppointmentTypeSelected, props.setAppointmentTypeSelected]
    )

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
    const options = props.appointmentTypes.map((appointmentType: any) => {
        return {
            label: appointmentType.name,
            value: appointmentType.id,
        }
    })
    const errorMessage = props.isDisabled
        ? 'There is not appointment type available.'
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
                    name="Subjects"
                    options={options}
                    onChange={props.onChange}
                />
                <div style={style}> {errorMessage} </div>
            </Fragment>
        </div>
    )
}