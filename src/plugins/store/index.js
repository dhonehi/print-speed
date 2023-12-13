import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        statistics: {
            charsPerSecond: [],
            charsPerMinute: []
        },
        speed: {
            onSecond: 0,
            onMinute: 0
        },
        loadingQuote: false,
        quoteTextLang: 'en',
        timerDuration: 60000,
        endOfTheTest: false,
        isStarted: false,
    },
    mutations: {
        refreshTestData(state) {
            state.statistics = {
                charsPerSecond: [],
                charsPerMinute: []
            }

            state.speed = {
                onSecond: 0,
                onMinute: 0
            }

            state.timerDuration = 60000
        },
        setLoadingQuote(state, value) {
            state.loadingQuote = value
        },
        setQuoteTextLang(state, value) {
            state.quoteTextLang = value
        },
        setTimerDuration(state, duration) {
            state.timerDuration = duration
        },
        setIsStarted(state, value) {
            state.isStarted = value
        },
        setSpeed(state, speed) {
            state.speed = speed

            state.statistics.charsPerSecond.push(speed.onSecond)
            state.statistics.charsPerMinute.push(speed.onMinute)
        },
        setEndOfTheTest(state, value) {
            state.endOfTheTest = value
        }
    }
})