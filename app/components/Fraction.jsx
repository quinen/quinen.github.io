import React, { Component } from 'react';
import { Form, Header, Icon, Input, Segment } from 'semantic-ui-react'

class Fraction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            duree: "00:35:00",
            distance: "6.5",
            boucles: 6
        }

    }
    componentWillMount() {
        this.handleVitesseMoyenne();
    }
    componentDidMount() {
        //this.handleVitesseMoyenne();
    }

    render() {
        console.log('render');
        return (
            <Segment>
                <Header>
                    <Icon name="trophy"/>
                    Fractionné sur Tapis
                </Header>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Cumul durée</label>
                            <input type="time" step="1" placeholder="hh:mm:ss" value={this.state.duree} onChange={(e)=>this.handleDuree(e)}/>
                        </Form.Field>

                        <Form.Field>
                            <label>Cumul distance</label>
                            <Input label={{basic:true,content:"km"}} labelPosition="right" type="number" step="0.1" value={this.state.distance} onChange={(e)=>this.handleDistance(e)}/>
                        </Form.Field>

                        <Form.Field>
                            <label>Vitesse Moyenne</label>
                            <Input label={{basic:true,content:"km/h"}} labelPosition="right" type="number" step="0.1" value={this.state.vitesseMoyenne} onChange={(e)=>this.handleVitesseMoyenne(e)} readOnly/>
                        </Form.Field> 

                        <Form.Field>
                            <label>Nb de boucles</label>
                            <input type="number" step="1" value={this.state.boucles} onChange={(e)=>this.handleBoucle(e)}/>
                        </Form.Field>

                    </Form.Group>           
                </Form>
            </Segment>
        );
    }

    /*
        calcule un timestamp type 00:00:00 en nombre de secs pour facilité le calcul
    */
    formatTimeToSecs(time) {

        return time.split(':').reverse().reduce((acc, v, i, a) => {
            var pow = i;
            if (a.length == 2) {
                acc = parseInt(acc) * 60;
                pow++;
            }
            var total = parseInt(acc) + parseInt(v) * Math.pow(60, pow)
            return total;
        });
    }

    getVitesseMoyenne(distance, duree) {
        var distance = distance || this.state.distance;
        var duree = duree || this.state.duree;
        var vm = distance / this.formatTimeToSecs(duree) * 3600;
        // arrondit
        return Math.round(vm * 10) / 10;
    }

    handleDistance(e) {
        this.setState({
            distance: e.target.value,
        }, () => this.handleVitesseMoyenne());

    }

    handleDuree(e) {
        this.setState({
            duree: e.target.value,
        }, () => this.handleVitesseMoyenne());
    }

    handleVitesseMoyenne() {
        this.setState({
            vitesseMoyenne: this.getVitesseMoyenne()
        });
    }
}


export default Fraction;
