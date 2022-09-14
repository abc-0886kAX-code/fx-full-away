/*
 * @Author: zhangyang
 * @Date: 2021-05-13 15:00:58
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-13 15:47:57
 * @Description: file content
 */
import MovieList from './movie-list.vue';

/* istanbul ignore next */
MovieList.install = function (Vue) {
    Vue.component(MovieList.name, MovieList);
};

export default MovieList;