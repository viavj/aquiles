import React from 'react';
import Form from '../components/Form';
import * as identifiers from '../shared/identifiers';
import * as standarts from '../shared/standarts';
import * as msgTypes from '../shared/messageTypes';
import './Layout.css';

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: [
                { id: 0, coords: 'AQW#@0L100@90L50#', validations: [] },
                { id: 1, coords: 'AQW#@45L100#', validations: [] },
                { id: 2, coords: "AQW#@45L100@-90L50#", validations: [] },
                { id: 3, coords: "AQW#@0L100@90L50@90L50#", validations: [] },
                { id: 4, coords: "AQW#@0L100@90L50@90L50@90L150#", validations: [] },
                { id: 5, coords: "AQW#@45L100@-90L100@90L100@-90L100@90L100@-90L100@90L100#", validations: [] },
                { id: 6, coords: "AQW#@0L500@35L500@-120L500#", validations: [] },
                { id: 7, coords: "AQW#@0L500@35L500@-179L500#", validations: [] },
                { id: 8, coords: "AQW#@0L50@35L50@185L50#", validations: [] },
            ],
        }
    }

    componentDidMount() {
        this.state.forms.map(form => this.draw(form.id, this.filterCoords(form.coords, form.id)))
    }


    createForm = () => {
        this.setState((prevState) => {
            return {
                forms: prevState.forms.concat({
                    id: prevState.forms.length,
                    coords: identifiers.CHAIN_START,
                    validations: []
                })
            }
        }, () => console.log(this.state))
    }

    // if the code coincides with standards
    compareToPathStandards = (coord) => {
        return coord.indexOf(identifiers.LENGTH) >= 0 ?
            coord.split(identifiers.LENGTH)[0]
                &&
                coord.split(identifiers.LENGTH)[0] <= standarts.MAX_DEGREE
                &&
                coord.split(identifiers.LENGTH)[0] >= standarts.MIN_DEGREE ?
                coord.split(identifiers.LENGTH)[1] > 0
                    &&
                    coord.split(identifiers.LENGTH)[1] <= standarts.MAX_LENGTH ?
                    true
                    : false
                : false
            : false;
    }

    // if there are symbols after closing sign '#'
    checkIfCodeIsInsideHashTags = (id, str) => {
        let coords = str.split(identifiers.CHAIN_END).slice(2);
        if (coords.join(identifiers.CHAIN_END)) this.refs[id].changeState(msgTypes.END_SYNBOL_MSG, false)
        else this.refs[id].changeState(msgTypes.END_SYNBOL_MSG, true)
    }

    // if the total length of path is less or equals to 1200
    checkIfTotalLenghtIsWithinLimit = (id, coords) => {
        let totalLength = 0;
        coords.map(coord => {
            if (coord) totalLength += parseInt(coord.split(identifiers.LENGTH)[1])
        })
        if (totalLength <= 1200) this.refs[id].changeState(msgTypes.MAX_LENGTH_MSG, true)
        else if(Number.isInteger(totalLength)) this.refs[id].changeState(msgTypes.MAX_LENGTH_MSG, false)
    }


    filterCoords = (str, id) => {
        // code equals 'AQW#@', start validation
        if (str.indexOf(identifiers.CHAIN_START + identifiers.DEGREE) >= 0) {
            this.checkIfCodeIsInsideHashTags(id, str);

            // get the part of the code after firt '#' symbol till the second one
            // and check for total length
            const coords = str.split(identifiers.CHAIN_END)[1];
            let splitedCoords = coords.split(identifiers.DEGREE);
            this.checkIfTotalLenghtIsWithinLimit(id, splitedCoords);

            // reset form's validation results
            this.setState((prevState) => {
                prevState.forms[id].validations = [];
                return { forms: prevState.forms }
            })
            
            // comparing to standards, and set validations of the form 
            // i.e. segment[2] is valid
            // according total length is less or equals to 1200 and degree is between 165 and -165
            const filteredCoords = splitedCoords.filter((coord, index) => {
                let isValid;
                if (coord) {
                    isValid = this.compareToPathStandards(coord);
                    this.setState((prevState) => {
                        prevState.forms[id].validations[index] = { key: index, value: isValid }
                        return { forms: prevState.forms }
                    })
                }
                return isValid;
            });

            return filteredCoords;
        }
        return [];
    }


    getCoords = (e) => {
        e.persist();
        const str = e.target.value;
        const id = e.target.attributes.getNamedItem('data-input-id').value;
        let coords = this.filterCoords(str, id);

        this.setState((prevState) => {
            prevState.forms[id].coords = str;
            return {
                forms: prevState.forms
            }

        }, () => {
            if (coords.length) {
                this.draw(id, coords)
            }
        })

    }


    draw = (id, coords) => {

        const canvas = document.querySelector(`[data-canvas-id='${id}']`);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let initialPoint = {
            x: 150,
            y: 150
        }

        let segment;

        ctx.beginPath();

        // draw all segments
        coords.map(path => {

                segment = {
                    degrees: path.split(identifiers.LENGTH)[0],
                    length: path.split(identifiers.LENGTH)[1]
                }

                ctx.moveTo(initialPoint.x, initialPoint.y);

                let angle = segment.degrees * Math.PI / 180;
                let _x = Math.cos(angle) * segment.length;
                let _y = Math.sin(angle) * segment.length;
                initialPoint.x += _x;
                initialPoint.y += _y;

                ctx.lineTo(initialPoint.x, initialPoint.y);

        })

        ctx.stroke();
    }


    render() {

        const forms = this.state.forms.map((form) => {
            return <Form key={form.id}
                ref={form.id}
                form={form}
                getCoords={(e) => this.getCoords(e)}
            />
        })

        return (
            <div className='container'>
                <div className='btn-container'>
                    <button onClick={this.createForm}>New Form</button>
                </div>
                <div>
                    {forms.reverse()}
                </div>

            </div>
        )
    }
}



export default Layout;