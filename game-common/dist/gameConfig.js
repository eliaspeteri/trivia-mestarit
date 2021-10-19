"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeToAnswerQuestion = exports.totalTimeEachQuestion = void 0;
/**
 * Time how long one questions total last
 * (including showing correct answer)
 * For example: This variable 60 s, timeEachAnswersShowed 50 s --> 10 s
 * is correct question showed
 * Give time in ms
 */
exports.totalTimeEachQuestion = 80 * 1000;
/**
 * Time how long correct answer is showed
 * Give time in ms
 */
exports.timeToAnswerQuestion = 5 * 1000;
