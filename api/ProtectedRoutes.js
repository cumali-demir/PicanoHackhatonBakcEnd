import {RouteConfig} from "./RouteConfig";
import express from "express";
import jwt from "jsonwebtoken";
import AdvertiseModel from "./../models/AdvertiseModel";
import OfferModel from "./../models/OfferModel";



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

  protectedRoutes.post('/advertise/one', function (req, res) {

    let advertiseID = req.body ._id;
  
    AdvertiseModel.findOne({'_id': advertiseID}).populate('category').populate('user').exec()
    .then(function (advertiseModel) {
      return res.json({success: true, advertise: advertiseModel});
    })
  });

  protectedRoutes.get('/advertise', function (req, res) {

    AdvertiseModel.find().populate('category').populate('user').exec()
    .then(function (advertiseModel) {
      return res.json({success: true, advertise: advertiseModel});
    })
  });

  protectedRoutes.post('/advertise/user', function (req, res) {

    let userID = req.decoded.user._id;
  
    AdvertiseModel.find({'user': userID}).populate('category').populate('user').exec()
    .then(function (advertiseModel) {
      return res.json({success: true, advertise: advertiseModel});
    })
  });

  protectedRoutes.post('/offer/create', function (req, res) {
    let offerModel = req.body;
    offerModel.offererID = req.decoded.user._id;
    OfferModel.create(offerModel, function(err, offerModel) {
            if (err){
               return res.json({success: false, message: 'Something went wrong: ' + err});
            } else {
              return res.json({ success: true, offer: offerModel });
            }
        });
  });

  //return all offers for a specific advertise
  protectedRoutes.post('/offer/advertise', function (req, res) {

    let advertiseID = req.body ._id;
  
    OfferModel.find({'advertiseID': advertiseID}).populate('advertiseID').populate('offererID').exec()
    .then(function (offerModel) {
      return res.json({success: true, offer: offerModel});
    })
  });

  //return all offers for a specific user
  protectedRoutes.post('/offer/user', function (req, res) {

    let userID = req.decoded.user._id;

    console.log(userID);
  
    OfferModel.find({'offererID': userID}).populate('advertiseID').populate('offererID').exec()
    .then(function (offerModel) {
      return res.json({success: true, offer: offerModel});
    })
  });

  protectedRoutes.post('/offer/one', function (req, res) {

    let offerID = req.body ._id;
  
    OfferModel.findOne({'_id': offerID}).populate('advertiseID').populate('offererID').exec()
    .then(function (offerModel) {
      return res.json({success: true, offer: offerModel});
    })
  });

  protectedRoutes.post('/offer/update', function (req, res) {

    let offerID = req.body ._id;
    let advertiseID = req.body .advertiseID;
    let status = req.body.status;

    console.log(offerID);
    console.log(advertiseID);
    console.log(status);



    if (status == '1') {
        OfferModel.update({'advertiseID': advertiseID},{$set: {status: 2}}, { multi : true } ,function (err,info) {
            //TODO: Handle error
              console.log('offer');
        });
        AdvertiseModel.update({'_id': advertiseID}, {$set: {status: 1}},function (err,info) {
              //TODO: Handle error            
              console.log('advertise');

        });
    }

    OfferModel.update({'_id': offerID}, { $set: { status: status }}, function (err, info) {
        console.log('onay')
        if (err) {
          return res.json({success: false, message: 'Something went wrong: ' + err});
        }
        else {
          return res.json({success: true,info: info});
        }
      });
});
/*
protectedRoutes.post('/offer/advertise', function (req, res) {

    let advertiseID = req.body ._id;  
    OfferModel.find({'advertiseID': advertiseID}, function (err, info) {
    if (err) {
      return res.json({success: false, message: 'Something went wrong: ' + err});
    }
    else {
      return res.json({success: true, offer: info});
    }
  });
}); */

export default protectedRoutes;
