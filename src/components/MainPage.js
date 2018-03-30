import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Card, Row } from './common';
import { 
    getData,
    startTimeout,
    stepTimeout
} from '../actions';
import { Actions } from 'react-native-router-flux';

class MainPage extends Component {

    _interval = 0;

    componentWillMount() {
        this.props.getData();
    }

    componentDidMount() {
        //Запускаем отсчет таймера 
        this._interval = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        if (this._interval) {
            clearInterval(this._interval);
        }
    }

    tick() {
        this.props.stepTimeout();
    }

    onScroll() {
        //сброс таймера
        this.props.startTimeout();
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.timeout != this.props.timeout) {
            if (nextProps.timeout == 0) {
                //по истечении 15 сек обновляем данные
                this.props.getData();
                return false;
            }
        }

        if ( nextProps.loading != this.props.loading  ) {
            if (nextProps.loading) {
                Actions.refresh( 
                    { 
                        rightTitle: null,
                        onRight: () => {} 
                    }
                );
            } else {
                Actions.refresh( 
                    { 
                        rightTitle: 'Refresh',
                        onRight: () => {
                            this.props.getData();
                        } 
                    }
                );
            }
        }
        return true;
    }
    
    _keyExtractor = (item, index) => item.name;
  
    renderItem({item}) {
        return (
            <Row
                name={item.name}
                volume={item.volume}
                amount={(Math.round(item.price.amount * 100) / 100).toFixed(2)}
            />
        );
    }
  
    renderList() {
  
        if (this.props.error) {

            return (<Text style={styles.errorStyle}>{this.props.error}</Text>);

        } else {
            if (this.props.loading) {
                return <Text style={styles.msgStyle}>Loading ...</Text>;
            }
            else {
                if (this.props.rows.length == 0) {
                    return (<Text style={styles.msgStyle}>No data</Text>);
                }
                else {
                    return <FlatList
                        data={this.props.rows}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        onScroll={this.onScroll.bind(this)}
                    />;
                }
            }
        }
    }

    render() {
        return (
            <View style={ { flex: 1 } }>
                <Row style = { styles.headerStyle } name="Name" volume="Volume" amount="Amount" textStyle={ { color:'#fff', textAlign: 'center', fontWeight: '600' } }/>
                <View style={ { paddingBottom: 50 } }>
                    {this.renderList()}
                </View> 
            </View>
        );
    }

};

const styles = {
    headerStyle: {
        backgroundColor: '#080',
    },
    errorStyle: {
        padding: 20,
        color: '#f00',
        textAlign: 'center'
    },
    msgStyle: {
        padding: 20,
        color: '#aaa',
        textAlign: 'center'
    },
};

const mapStateToProps = (state) => {
    const { rows, loading, error } = state.dataReducer.data;  
    const { timeout } = state.dataReducer;
    console.log(timeout);
    return { timeout, rows, loading, error };
};

export default connect(mapStateToProps, { getData, startTimeout, stepTimeout })(MainPage);
