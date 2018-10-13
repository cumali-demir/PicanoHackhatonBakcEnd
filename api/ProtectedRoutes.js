import {RouteConfig} from "./RouteConfig";
import express from "express";
import jwt from "jsonwebtoken";
import AdvertiseModel from "./../models/AdvertiseModel";


let protectedRoutes = express.Router();

protectedRoutes.use(function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, RouteConfig.AppSecret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                return next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

protectedRoutes.post('/check', function (req, res) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, RouteConfig.AppSecret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                return res.json({success: true, user: decoded.user });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
  });

  protectedRoutes.post('/advertise/create', function (req, res) {
    let advertiseModel = req.body;
    advertiseModel.user = req.decoded.user._id;
    AdvertiseModel.create(advertiseModel, function(err, advertiseModel) {
            if (err){
               return res.json({success: false, message: 'Something went wrong: ' + err});
            } else {
              return res.json({ success: true, advertise: advertiseModel });
            }
        });
  });

export default protectedRoutes;
