export const RealTimeChartsOptions = {
    color: [
        "#25F0A3",
        "#F3B421",
        "#F25A0E",
        "#28D97E",
        "#0666BA",
        "#FCF300",
        "#9B2CF8",
    ],
    toolbox: {
        top: "20",
        show: true,
        iconStyle: {
            color: "white",
        },
        feature: {

            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
                show: true,
                type: ["stack", "line", "bar", "pictorialBar"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    },
    grid: {
        top: "20%",
        left: "4%",
        right: "4%",
        bottom: "5%",
        containLabel: true,
    },
    legend: {
        top: "10px",
        data: ["实时降雨量(mm)"],
        textStyle: {
            color: "#fff",
        },
    },
    dataset: {
        dimensions: ["tm", "realTimeData"],
        source: [],
    },
    dataZoom: [
        {
            start: 0,
            end: 100,
            zoomOnMouseWheel: true,
            type: "inside",
        },
        {
            type: "slider",
            start: 0,
            end: 100,
            show: false,
        },
    ],
    xAxis: [
        {
            type: "category",
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: "#fff",
            },
        },
    ],
    yAxis: [
        {
            type: "value",
            name: "实时降雨量(mm)",
            position: "left",
            axisLabel: {
                // formatter: "{value} mm",
                color: "#fff",
            },
            splitLine: {
                show: false,
            },
            nameTextStyle: {
                color: "#fff",
            },
            min: (value) => {
                const min = Math.round(value.min - 10);
                return min <= 0 ? 0 : min;
            },
        },
    ],
    series: [
        {
            name: "实时降雨量(mm)",
            type: "bar",
            yAxisIndex: 0,
        },
    ],
};



export const ForecastChartsOptions = {
    color: [
        "#25F0A3",
        "#F3B421",
        "#F25A0E",
        "#28D97E",
        "#0666BA",
        "#FCF300",
        "#9B2CF8",
    ],
    toolbox: {
        top: "20",
        iconStyle: {
            color: "white",
        },
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
                show: true,
                type: ["stack", "line", "bar", "pictorialBar"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    },
    grid: {
        top: "20%",
        left: "4%",
        right: "4%",
        bottom: "5%",
        containLabel: true,
    },
    legend: {
        top: "10px",
        data: ["预报降雨量(mm)"],
        textStyle: {
            color: "#fff",
        },
    },
    dataset: {
        dimensions: ["tm", "forecastdata"],
        source: [],
    },
    dataZoom: [
        {
            start: 0,
            end: 100,
            zoomOnMouseWheel: true,
            type: "inside",
        },
        {
            type: "slider",
            start: 0,
            end: 100,
            show: false,
        },
    ],
    xAxis: [
        {
            type: "category",
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: "#fff",
            },
        },
    ],
    yAxis: [
        {
            type: "value",
            name: "预报降雨量(mm)",
            position: "left",
            axisLabel: {
                // formatter: "{value} mm",
                color: "#fff",
            },
            splitLine: {
                show: false,
            },
            nameTextStyle: {
                color: "#fff",
            },
            min: (value) => {
                const min = Math.round(value.min - 10);
                return min <= 0 ? 0 : min;
            },
        },
    ],
    series: [
        {
            name: "预报降雨量(mm)",
            type: "bar",
            yAxisIndex: 0,
        },
    ],
};