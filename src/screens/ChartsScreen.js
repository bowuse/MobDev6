import React, {useState} from "react";
import {ScrollView, Dimensions} from "react-native";
import {Card, ButtonGroup} from "react-native-elements";

import {LineChart, PieChart} from "react-native-chart-kit";

import {useOrientation} from "../hooks";

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: () => '#60ace8',
    barPercentage: 1,
    useShadowColorFromDataset: false
};


const DEFAULT_HEIGHT = 300;
const PI  = "\u03a0";
const VERTICAL_OFFSET = 30;
const HORIZONTAL_OFFSET = 250;
const CHART_LABEL = "Графік";
const PIE_LABEL = "Діаграма";

const chartData = () => {
    return {
        labels: [`-${PI}`, "0", PI],
        datasets: [
            {
                data: [-1, 1, -1],
            }
        ],
    };
};

const pieData = () => {
    const data = [[45, "skyblue"], [5, "violet"], [25, "yellow"], [25, "grey"]]
    return data.map(([value, color]) =>
        ({name: "", legendFontColor: "black", value, color}));
};

export const ChartsScreen = () => {
    const charts = [CHART_LABEL, PIE_LABEL];
    const [currentChartIndex, setChartIndex] = useState(0);
    const orientation = useOrientation();

    const onPress = index => {
        setChartIndex(index);
    };

    const {width} = Dimensions.get("window");
    const offset = orientation === 'PORTRAIT' ? VERTICAL_OFFSET : HORIZONTAL_OFFSET;
    const data = currentChartIndex === 0 ? chartData() : pieData();

    return (
        <ScrollView>
            <Card>
                <ButtonGroup
                    onPress={onPress}
                    selectedIndex={currentChartIndex}
                    buttons={charts}
                />
                <Card.Divider />
                {currentChartIndex === 0 ?
                    <LineChart
                        data={data}
                        height={DEFAULT_HEIGHT}
                        width={width + offset}
                        chartConfig={chartConfig}
                        withDots={false}
                        withInnerLines={false}
                        withOuterLines={false}
                        bezier
                    />
                    :
                    <PieChart
                        data={data}
                        width={width}
                        height={DEFAULT_HEIGHT}
                        accessor={"value"}
                        backgroundColor={"transparent"}
                        paddingLeft={17}
                        chartConfig={chartConfig}
                    />
                }

            </Card>
        </ScrollView>
    );
};
