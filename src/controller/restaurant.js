import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';
import { getHashes } from 'crypto';

export default({ config, db}) => {
    let api = Router();
    // '/v1/restaurant/add' -> CREATE
    api.post('/add', (req, res) => {
        let newRest = new Restaurant();
        newRest.name = req.body.name;

        newRest.save(err => {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Restaurant saved successfully'});
        });
    });

    // '/v1/restaurant' -> READ
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurants) => { //empty curly means get all
            if(err) {
                res.send(err);
            }
            res.json(restaurants);
        }); 
    });

    // '/v1/restaurant/:id -> READ ONE
    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => { //empty curly means get all
            if(err) {
                res.send(err);
            }
            res.json(restaurant);
        }); 
    });

    //'v1/restaurant/:id' -> UPDATE
    api.put('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if(err) {
                res.send(err);
            }
            restaurant.name = req.body.name;
            restaurant.save(err => {
                if(err) {
                    res.send(err);
                }
                res.json({message: "Restaurant information updated"});
            });
        });
    });
    return api;
}