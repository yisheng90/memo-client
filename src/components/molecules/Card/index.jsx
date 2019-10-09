import React, {useState, useCallback} from 'react'
import * as PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import './style.css'

import {Textarea} from '../../atoms/Textarea'
import {Input} from '../../atoms/Input'
import {Modal} from "../../atoms/Modal";
import {Button} from "../../atoms/Button";

export const Card = ({idea, onDelete, onUpdate, enableSort, disableSort}) => {
    const [isDelectable, setIsDeletable] = useState(false)
    const [formValues, setFormValues] = useState(idea)
    const [isModalVisible, setModalVisible] = useState(false)
    const createdDate = new Date(idea.created_date).toLocaleString()

    const handleFieldChange = useCallback(value => setFormValues(prevValues => ({...prevValues, ...value})), [])

    const handleFieldUpdate = () => {
        if (idea.title !== formValues.title || idea.body !== formValues.body) {
            onUpdate(formValues)
        }
        enableSort &&  enableSort()
    }

    const handleBodyFieldUpdate = () => {
        if (!formValues.title && !formValues.body) {
            setModalVisible(true)
        } else {
            handleFieldUpdate()
        }
    }

    const handleModalClose = removeIdea => {
        if (removeIdea === true) {
            onDelete(formValues.id)
        }
        enableSort &&  enableSort()
        setModalVisible(false)
    }

    return (<>
            <div
                id={idea.id}
                data-testid="card__container"
                className="card__container"
                onPointerMove={() => setIsDeletable(true)}
                onPointerLeave={() => setIsDeletable(false)}>

                <Input
                    value={formValues.title}
                    onFocus={disableSort}
                    onBlur={handleFieldUpdate}
                    placeholder="Untitled"
                    onChange={(value) => handleFieldChange({title: value})}
                />

                <span className="card__details--date" data-testid="card__details--date">
                {createdDate}
            </span>

                <Textarea
                    value={formValues.body}
                    onBlur={handleBodyFieldUpdate}
                    onFocus={disableSort}
                    onChange={(value) => handleFieldChange({body: value})}
                />

                {isDelectable && (
                    <FontAwesomeIcon
                        icon={faTrash}
                        size="xs"
                        className="card__action--delete"
                        data-testid="card__action--delete"
                        onClick={() => onDelete(idea.id)}
                    />
                )}
            </div>

            <Modal isVisible={isModalVisible} onCancel={() => handleModalClose(false)}>
                <div className="modal__body">
                    <h3>This idea is empty.</h3>
                    <strong>Do you want to remove it?</strong>
                </div>
                <div className="modal__action--container">
                    <Button block onClick={() => handleModalClose(false)}>No. Keep it.</Button>
                    <Button type="danger" block onClick={() => handleModalClose(true)}>Yes. Remove it.</Button>
                </div>
            </Modal>
        </>
    )
}

Card.propType = {
    idea: PropTypes.shape({
        id: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        title: PropTypes.string,
        body: PropTypes.string
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    enableSort: PropTypes.func,
    disableSort: PropTypes.func,
}