/*
 * @Author: maggot-code
 * @Date: 2021-05-11 16:03:02
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 13:16:30
 * @Description: file content
 */
import {
    Aside, Breadcrumb, BreadcrumbItem, Button,
    ButtonGroup, Card, Checkbox,
    CheckboxButton,
    CheckboxGroup, Col, Collapse,
    CollapseItem, Container, DatePicker, Dialog,
    // others
    Divider, Dropdown, DropdownItem, DropdownMenu, Footer, Form,
    FormItem, Header, Image, InfiniteScroll,
    // form
    Input,
    // notice
    Alert, Loading, Main,
    // navigation
    Menu, MenuItem,
    MenuItemGroup, Notification, Option,
    OptionGroup, Popover, Radio, RadioButton, RadioGroup,
    // basic
    Row, Scrollbar, Select, Slider, Submenu, TabPane, Tabs, Tag,
    // data
    Tree, Result
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import { SetNotify, SetNotifyError, SetNotifySuccess, SetNotifyWarning } from './notify';

// basic
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
// form
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Slider)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
// data
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Result)
// notice
Vue.use(Alert)
Vue.use(Loading.directive)
// navigation
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
// others
Vue.use(Divider)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Scrollbar)
Vue.use(InfiniteScroll)
Vue.use(Image)
Vue.use(Card)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;

export const notify = (title, type, msg) => Notification(SetNotify(title, type, msg));
export const notifyS = (msg) => Notification(SetNotifySuccess(msg));
export const notifyW = (msg) => Notification(SetNotifyWarning(msg));
export const notifyE = (msg) => Notification(SetNotifyError(msg));

export default {}
