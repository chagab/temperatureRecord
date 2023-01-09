'use strict';
import {getTemperaturesFromPinsBetweenDates} from "../services/temperature-service.js";
import express from "express";

export const router = express.Router();

router.get('/temperature', async (req, res) => {
    const {pins, startDate, endDate} = req.query;
    const temp = await getTemperaturesFromPinsBetweenDates(pins.split(','), startDate, endDate);
    return res.send(temp);
});

router.get('/pins', async (req, res) => {
    // TODO: get the number of pins and their names?
});
