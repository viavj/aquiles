import React from 'react';
import './Form.css';
import Aux from '../HOC/Aux';
import * as msgTypes from '../shared/messageTypes';


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            [msgTypes.MAX_LENGTH_MSG]: { isValid: true, msg: 'The limit is 1200sm' },
            [msgTypes.END_SYNBOL_MSG]: { isValid: true, msg: '2nd "#" means the end of the code' },
        }
    }


    changeState = (property, isValid) => {
        this.setState((prevState) => {
            return {
                [property]: { isValid: isValid, msg: prevState[property].msg }
            }
        }, () => console.log(this.state))
    }


    render() {

        const maxLengthMsg = this.state.maxLengthMsg.isValid ? null
        : <div className="snackbar">{this.state[msgTypes.MAX_LENGTH_MSG].msg}</div>

        const endSynbolMsg = this.state.endSynbolMsg.isValid ? null
            : <div className="snackbar">{this.state[msgTypes.END_SYNBOL_MSG].msg}</div>

        const validationReport = this.props.form.validations.map((validationItem, index) => {

            return (
                <div key={index}>
                    <p>
                        Parameter: {validationItem.key} {validationItem.value ? <span style={{ color: "green" }}> is correct</span>
                            : <span style={{ color: 'red' }}>incorrect</span>
                        }
                    </p>
                </div>
            )
        })
        return (
            <Aux>
                <div className='formContainer'>
                    <div>
                        <input data-input-id={this.props.form.id} type='text' value={this.props.form.coords} onChange={(e) => this.props.getCoords(e)} />
                        {validationReport}
                        {endSynbolMsg}
                        {maxLengthMsg}
                    </div>
                    <canvas data-canvas-id={this.props.form.id} width="600" height="300">
                    </canvas>
                </div>
            </Aux>
        )
    }

}



export default Form;