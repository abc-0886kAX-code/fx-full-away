import { provide, nextTick, unref, ref, computed } from "@vue/composition-api";
import { Load } from "@/biz/share/entify/Load";
import { getNowTime, getYear } from "@/composables/biz-search/share";
import { startupCalculusForm } from "@/pages/basin-flood/api/calculus.api";

export const CalculusFormSymbolName = "CalculusForm";

export const calculuSchemaJson = [
    {
        field: "year",
        uiSchema: {
            col: 24,
            label: "年份",
            format: "yyyy"
        },
        ruleSchema: [
            {
                message: "请选择年份",
                required: true
            }
        ],
        mold: "year",
        componentName: "mg-time",
        value: getYear()
    },
    {
        field: "tm",
        mold: "datetime",
        uiSchema: {
            col: 24,
            label: "时间",
            format: "yyyy-MM-dd HH:mm"
        },
        ruleSchema: [
            {
                message: "请选择时间",
                required: true
            }
        ],

        componentName: "mg-time",
        value: getNowTime()
    },
    {
        field: "area",
        uiSchema: {
            col: 12,
            minus: false,
            min: 1.0,
            label: "流域面积"
        },
        ruleSchema: [
            {
                message: "请填写流域面积",
                required: true
            }
        ],
        mold: "float",
        componentName: "mg-input",
        value: 1.0
    },
    {
        field: "cqif",
        uiSchema: {
            col: 12,
            minus: false,
            min: 0.1,
            label: "径流系数"
        },
        ruleSchema: [
            {
                message: "请填写径流系数",
                required: true
            }
        ],
        mold: "float",
        componentName: "mg-input",
        value: 0.1
    },
    {
        field: "k",
        uiSchema: {
            col: 12,
            minus: false,
            min: 0,
            label: "流域汇流时间参数"
        },
        ruleSchema: [
            {
                message: "请填写汇流时间参数",
                required: true
            }
        ],
        mold: "number",
        componentName: "mg-input",
        value: 0
    },
    {
        field: "n",
        uiSchema: {
            col: 12,
            minus: false,
            min: 0,
            label: "流域调蓄能力参数"
        },
        ruleSchema: [
            {
                message: "请填写调蓄能力参数",
                required: true
            }
        ],
        mold: "number",
        componentName: "mg-input",
        value: 0
    },
    {
        field: "maxflood",
        uiSchema: {
            col: 12,
            minus: false,
            min: 0.0,
            label: "洪水总量预警值"
        },
        ruleSchema: [
            {
                message: "请填写洪水总量预警值",
                required: false
            }
        ],
        mold: "float",
        componentName: "mg-input",
        value: 0.0
    },
    {
        field: "maxflood_peak",
        uiSchema: {
            col: 12,
            minus: false,
            min: 0.0,
            label: "洪峰预警值"
        },
        ruleSchema: [
            {
                message: "请填写洪峰预警值",
                required: false
            }
        ],
        mold: "float",
        componentName: "mg-input",
        value: 0.0
    },
];

export const setup24HourRainfall = (schema) => {
    const data = [...schema];
    for (let index = 0; index < 24; index++) {
        data.push({
            field: `rainfall${index}`,
            uiSchema: {
                col: 12,
                minus: false,
                min: 0.0,
                label: `${index}时雨量`
            },
            ruleSchema: [
                {
                    message: `请填写${index}时雨量`,
                    required: false
                }
            ],
            mold: "float",
            componentName: "mg-input",
            value: 0.0
        });
    }

    return data;
}

export function usecalculus(schema, props) {
    const { loading, loadStyle, setupLoading } = Load(false);
    const formRefs = ref();
    const formSchema = computed(() => {
        return {
            formSchema: {
                inline: false,
                labelWidth: "160px",
            },
            cellSchema: schema,
        }
    });

    async function outputFormData() {
        await nextTick();
        const { validate, data } = unref(formRefs).formOutput();
        try {
            await validate();
            return { status: true, data };
        } catch (error) {
            return { status: false, data: {} };
        }
    }

    // 运行演算，并获取结果
    async function startupCalculus() {
        const { status, data } = await outputFormData();
        if (!status) return;

        setupLoading(true);
        const params = { ...data, stcd: unref(props)?.info?.stcd };
        // const params = { ...data, stcd: "30401400" };
        try {
            const response = await startupCalculusForm(params).finally(setupLoading);
            return [response];
        } catch (error) {
            return [
                {
                    maxtm: 0,
                    area: 0,
                    flood_peak: 0,
                    flood: 0,
                    k: 0,
                    maxflood: "",
                    maxflood_peak: "",
                    county: "",
                    tm: "",
                    times: getNowTime(),
                    flows: [],
                    rains: []
                }
            ]
        }
    }

    function resetForm() {
        unref(formRefs).resetForm();
    }

    provide(CalculusFormSymbolName, {
        formRefs,
        outputFormData,
        startupCalculus,
        resetForm
    });

    return {
        loadStyle,
        formLoad: loading,
        formRefs,
        formSchema,
        outputFormData,
        startupCalculus,
        resetForm
    }
}
