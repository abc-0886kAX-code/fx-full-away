<!--
 * @FilePath: \undefinede:\前端\fx-full-away\README.md
 * @Author: zhangxin
 * @Date: 2022-09-02 09:46:03
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-19 16:07:13
 * @Description:
-->

# fx-PullAway

## 项目名称更换

`关键字` **防汛作战业务化应用平台**
`需修改路径 login.vue index.html home.vue`
`头部项目名称是背景图 - home.scss header.png`

## 接口地址更换

```
基础域名更换: .env : VUE_APP_BASE_URL
请求URL前缀更换:src/config/axios.conf.js
arcgis图层服务地址 : .env : VUE_APP_ARCGIS_SERVER
本地遮罩层JSON数据 ： .env : VUE_APP_MASK_URL
```

## 系统对应权限文件 context.js /src/biz/User/share/context.js

```
用户身份类型 Identity.js /src/biz/User/entity/Identity.js
身份定位配置 location.js /src/biz/User/share/location.js
用户身份对应图层 layers.js /scr/biz/User/share/layers.js
```

## 新增或修改权限相关

### 身份类型

```
1.context.js 增加自定义身份类型（定位、图层等都会根据自定义身份类型进行匹配）
2.Identity.js IdentityType对象中新增键值对，键名为自定义身份类型，值为登录时接口返回的layers
```

### 身份定位

```
1./share/locations.js 增加定位配置
2./entity/Locations.js LocationGroup对象中新增键值对，键名为根据自定义身份类型获取到当前用户layers类型，值为定位配置
```

### 身份图层

```
1.context.js 增加图层对应的名称
2./share/layers.js 新建身份图层对象，key值为context.js映射的key，value值为arcgis.conf.js中服务名称
3./entity/Lyaer.js LayerGroup对象中新增键值对，键名为根据自定义身份类型获取到当前用户layers类型，值为新建身份图层对象
```

### 身份遮罩层

_[各地编码 JSON-id](https://gist.github.com/axiaoxin/51f32349802b199323b7)_
_[将上面复制的 id 替换到此路径中](http://data.mars3d.cn/file/geojson/areas/341100.json)_

```
1.获取JSON的基础地址 Mask.js UserMaskURI 根据用户addvcd(地区编码)拼接地址获取JSON
2.useUserMask.js 实现方法
```

## homeindex 六个模块的权限以及菜单的权限增加

### 六个模块权限增加

```
homeIndex/business-module.json JSON文件中power字段代表着权限列表，会根据用户权限layers(已经将String转为Number)过滤出最终列表
```

### 菜单权限增加

_对应文件中找到 menu 菜单数组，每一个对象中增加或修改 power 数组，增加对应用户权限映射的 value 即可_

```
降雨预报 rainfall-forecast-menu.json
实时监测 real-time-monitor-menu.json
数字孪生 digital-twin.vue (not menu)
流域洪水 basin-flood-menu.js
城市内涝 city-waterlogging-menu.json
山洪防御 flash-flood-defense-menu.json
```

## 系统 socket

_连接与断开/地址的替换/用法_

```
地址更换：.env : VUE_APP_SOCKET_URL
连接与断开:/src/biz/Socket/usecase/useSocketClient.js onMounted生命周期中的代码打开或隐藏
类型添加: Socket/shared/context.js 增加类型常量
用法:对应功能模块下 使用`const { setupSocketMessage } = useSocketMessage()`方法,setupSocketMessage('增加的类型常量','需要建立长连接的请求方法')
```

## 系统新增 ArcGis 图层

### 增加默认展示图层

```
1.arcgis.conf.js文件中,增加对应图层服务名称
2.主页(homeindex.vue)中引入上述增加的图层服务名称,在setup return的layers参数中增加
3.el :
import 'BJ_AREA_SERVICE'
layers:[
  {
    type: "arcgis",
    name: "BJ_AREA_SERVICE",
    enablePickFeatures: false,
    url: BJ_AREA_SERVICE,
    zIndex: 101,
  }
]
```

### 功能模块中增加图层服务(包括事件等)

```
1.arcgis.conf.js文件中,增加对应图层服务名称
2.功能模块组件中引入上述对应图层服务名称
3.在功能模块中通过useMars3d()方法获取到地图实例
4.将地图实例丢到useLayer()方法中得到setupLayer方法，创建矢量数据图层
5.调用对应类型的矢量数据方法(/src/biz/ArcGIS)，将配置项(上述对应图层服务以及创建的矢量数据图层等)丢到对应烈性的矢量数据方法中，对应类型的矢量数据方法在内部获取ArcGIS图层服务信息，创建矢量数据并挂载到创建好的矢量数据图层
6.el: dike-danger-worker.vue
```

## 点位方法

_el: real-time-rainfall.vue_
