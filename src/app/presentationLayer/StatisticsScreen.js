import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity, Dimensions} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import colors from '../config/colors';

import {VictoryPie} from 'victory-native'

const onPress = (option) => {console.log(option)};

const TimeOptionsBtn = (props) => {
    return (
        <TouchableOpacity onPress={onPress.bind(this, props.option)} style={styles.btn}>
            <Text style={styles.btnText}>{props.value}</Text>
        </TouchableOpacity>
    )
}


function renderOptions() {
    return (
        <View style={styles.containerBtn}>
            <TimeOptionsBtn option={'1'} value='Last 24h'/>                
            <TimeOptionsBtn option={'2'} value='Last Week'/>                
            <TimeOptionsBtn option={'3'} value='Last Month'/>                
            <TimeOptionsBtn option={'4'} value='Last Year'/> 
        </View>
    )
}

function renderLinearChart() {
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => "#8bc34a",
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const screenWidth = Dimensions.get("window").width;
    const data = {
        labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"],
        datasets: [
          {
            data: [2,2,2,2,3,3,3,4,4,3,2,2],
            color: (opacity = 1) => "#4d4d4d", // optional
            strokeWidth: 2 // optional
          }
        ],
        //legend: ["Rainy Days"] // optional
    };
    return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <LineChart
                data={data}
                width={screenWidth}
                height={180}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    )
}

function renderChart() {
    
    let chartData = [ 526, 520, 470, 440, 250, 240, 170, 150, 120, 110, 80, 40 ]
    let labels = ["NO2", "NO", "O3", "SO2", "CO", "NOX", "PM10", "H2S", "HCT", "PS", "HNCM", "C6H6"]
    const reducer = (accumulator, curr) => accumulator+curr;
    let totalPollution = chartData.reduce(reducer);

    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <VictoryPie
                data={chartData}
                innerRadius={70}
                //labels={chartData}
                labels={labels}
                style={{
                    labels: { fontWeight: 'bold'},
                    parent: {
                        ...styles.shadow
                    }
                }}
                width={350}
                height={350}
        />
        <View style={{position: 'absolute', top: '42%', left: '41%'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>
                {totalPollution}</Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>Total</Text>
        </View>
        </View>
    )
}

function StatisticsScreen(props) {

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Text style={styles.title}> Statistics</Text>
            <View style={styles.stroke}/>
            <Text style={styles.subtitle}> Location-based data recorded over time</Text>
            {renderOptions()}
            {/*Com posar marges*/}
            <View style={{justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 10}} >
                <Text style={styles.subtitle}> POLLUTION EVOLUTION</Text>
            </View>
            <View style={{justifyContent: "center", alignItems: "center",}} >
                {renderLinearChart()}
            </View> 
    </SafeAreaView>        
    );      
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        position: 'absolute',
        flex: 1,     
        flexDirection: "column",
        justifyContent: "flex-start", //main
        alignItems: "flex-start", //secondary
        alignItems: "center"
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    CircleShape: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 150 / 2,
        backgroundColor: colors.secondary,
    },
    btn: {
        marginStart: 5,
        marginEnd: 5,
        justifyContent: 'center',
        borderRadius: 5,
        borderBottomWidth: 5,
        borderRadius: 5,
        width: 80,
        height: 35,
        borderBottomColor: colors.green2,
        backgroundColor: colors.green1,
    },
    containerBtn: {
        //backgroundColor: colors.green1,
        alignSelf: "center",
        marginTop: 25,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        //padding: 10,
    },
    stroke: {
        backgroundColor: "black",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "80%",
        height: "0.5%",
    },
    title: { 
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 30,
        paddingTop: 35,
        fontWeight: 'bold',
        color: '#12161b',
    },
    subtitle: { 
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 15,
        paddingTop: 10,
        paddingStart: 25,
        fontWeight: 'bold',
        color: '#12161b',
    },
    text: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 10,
        //paddingTop: 10,
        //paddingStart: 25,
        fontWeight: 'bold',
        color: '#12161b',
    }
})

export default StatisticsScreen;