import React, { Component } from 'react';
import { Form, Header, Icon, Input, Segment } from 'semantic-ui-react'

class FractionForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dureeStr: "00:35:00",
            // duree
            distance: "6.50",
            boucles: 6,
            vitesse: 0.0,

            startDureeStr: "00:05:00",
            startDuree: 0,
            // startDistance : 0,
            // startVitesse : 0,

            // boucleDuree
            boucleDureeStr: "--:--:--",
            boucleDistance: 0.0,


            fastDureeStr: "00:01:00",
            fastDuree: 0,
            fastVitesse: 12.0,
            fastDistance: 0,
            // fastDistance


            // slowDuree
            // slowDistance
            // slowVitesse            
        }

    }

    componentWillMount() {
        this.handleDuree();
        this.handleStartDuree();
        this.handleFastDuree();
    }
    componentDidMount() {
        //this.calcvitesse();
    }

    render() {
        return (
            <Segment>
            <Header>
                <Icon name="trophy"/>
                Fractionné sur Tapis
            </Header>
            <Form>
                <Form.Group>
                    <Form.Field>
                        <label>Durée totale</label>
                        <input type="time" step="1" placeholder="hh:mm:ss" value={this.state.dureeStr} onChange={(e)=>this.handleDuree(e)}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Distance totale</label>
                        <Input label={{basic:true,content:"km"}} labelPosition="right" type="number" step="0.01" value={this.state.distance} onChange={(e)=>this.handleDistance(e)}/>
                    </Form.Field>
{/*
                    <Form.Field>
                        <label>Vitesse Moyenne</label>
                        <Input label={{basic:true,content:"km/h"}} labelPosition="right" type="number" step="0.1" value={this.state.vitesse} readOnly/>
                    </Form.Field> 
*/}
                </Form.Group>


                <Form.Group>
                    <Form.Field>
                        <label>Nb de boucles</label>
                        <input type="number" step="1" value={this.state.boucles} onChange={(e)=>this.handleBoucles(e)}/>
                    </Form.Field>
{/*}
                    <Form.Field>
                        <label>Durée d'une boucle</label>
                        <input type="time" step="1" placeholder="hh:mm:ss" value={this.state.boucleDureeStr} readOnly/>
                    </Form.Field>

                    <Form.Field>
                        <label>Distance / Boucle</label>
                        <Input label={{basic:true,content:"km"}} labelPosition="right" type="number" step="0.01" value={this.state.boucleDistance} readOnly/>
                    </Form.Field>
*/}
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Vitesse (rapide)</label>
                        <Input label={{basic:true,content:"km/h"}} labelPosition="right" type="number" step="0.1" value={this.state.fastVitesse} onChange={(e)=>this.handleFastVitesse(e)}/>
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Durée (rapide)</label>
                        <input type="time" step="1" max={this.state.boucleDureeStr} placeholder="hh:mm:ss" value={this.state.fastDureeStr} onChange={(e)=>this.handleFastDuree(e)}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Distance (rapide)</label>
                        <Input label={{basic:true,content:"km"}} labelPosition="right" type="number" step="0.01" value={this.state.fastDistance} readOnly/>
                    </Form.Field>


                </Form.Group>

            </Form>
        </Segment>
        )
    }

    calcBoucle() {

        this.setState((old) => {

            const boucleDureeTotale = old.duree - old.startDuree;
            const boucleDuree = Math.floor(boucleDureeTotale / old.boucles);
            const boucleDureeStr = this.formatSecsToTime(boucleDuree);
            const boucleDistance = this.getDistanceFromDuree(boucleDuree, old.vitesse);

            return {
                boucleDureeTotale,
                boucleDuree,
                boucleDureeStr,
                boucleDistance
            }
        }, () => {
            this.calcFast();
        });
    }

    calcFast() {
        console.log('calcFast');
        console.log(this.state.boucleDistance, " / ", this.state.boucleDuree, " * ", this.state.fastDuree);

        const fastDistance = this.getDistanceFromDuree(this.state.fastDuree, this.state.fastVitesse); // this.state.boucleDistance / this.state.boucleDuree * this.state.fastDuree;

        console.log(fastDistance);
        this.setState({
            fastDistance
        });
    }

    calcVitesse() {

        this.setState({
            vitesse: this.getVitesse()
        }, () => {
            this.calcBoucle();
        });
    }



    /*
        calcule un timestamp type 00:00:00 en nombre de secs pour facilité le calcul
    */
    formatTimeToSecs(_time) {

        return _time.split(':').reverse().reduce((acc, v, i, a) => {
            var pow = i;
            if (a.length == 2) {
                acc = parseInt(acc) * 60;
                pow++;
            }
            var total = parseInt(acc) + parseInt(v) * Math.pow(60, pow)
            return total;
        });
    }

    formatSecsToTime(_secs) {
        var dt = new Date(null);
        dt.setSeconds(_secs);
        return "" + dt.toISOString().slice(11, 19);
    }

    getDureeBoucle() {

        // vitesse en km/h
        // boucles
        //this.state.boucleDureeTotale = this.formatsSecsToTime(this.formatTimeToSecs(this.state.duree) - this.formatTimeToSecs(this.state.startDuree));
        // boucleDureeTotale = duree - startDuree
        return 0;

    }

    getDistanceFromDuree(duree, vitesse) {
        var distance = vitesse / 3600 * duree;
        return Math.round(distance * 100) / 100;
    }

    getVitesse(distance, duree) {
        var distance = distance || this.state.distance;
        var duree = duree || this.state.duree;

        var vm = distance / duree * 3600;
        //console.log(distance, duree, vm);
        // arrondit
        return Math.round(vm * 10) / 10;
    }

    handleBoucles(e) {
        this.setState({
            boucles: e.target.value,
        }, () => this.calcBoucle());

    }

    handleDistance(e) {
        this.setState({
            distance: e.target.value,
        }, () => this.calcVitesse());

    }

    handleDuree(e) {
        var dureeStr = this.state.dureeStr;
        if (typeof e !== "undefined") {
            dureeStr = e.target.value;
        }
        var duree = this.formatTimeToSecs(dureeStr);

        this.setState({ dureeStr, duree }, () => { this.calcVitesse() });
    }

    handleFastDuree(e) {
        var fastDureeStr = this.state.fastDureeStr;
        if (typeof e !== "undefined") {
            fastDureeStr = e.target.value;
        }
        var fastDuree = this.formatTimeToSecs(fastDureeStr);

        this.setState({ fastDureeStr, fastDuree }, () => { this.calcFast() });
    }

    handleFastVitesse(e) {
        this.setState({
            fastVitesse: e.target.value,
        }, () => this.calcFast());

    }

    handleStartDuree(e) {
        var startDureeStr = this.state.startDureeStr;
        if (typeof e !== "undefined") {
            startDureeStr = e.target.value;
        }
        var startDuree = this.formatTimeToSecs(startDureeStr);

        this.setState({ startDureeStr, startDuree }, () => {});
    }



}

const FractionTable = () => {
    return <Segment>table</Segment>;
}

class Fraction extends Component {
    render() {
        return (
            <Segment.Group horizontal>
                <FractionForm/>
                <FractionTable/>
                <Segment>
                    result 
                </Segment>
            </Segment.Group>
        );
    }
}


export default Fraction;
