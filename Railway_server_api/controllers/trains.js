const asyncHandler = require('express-async-handler');
const Train = require('../models/trainModel')
const Comapany = require('../models/companyModel');

const getAllTrains = asyncHandler(async (req,res) => {
    const trains = await Train.find();
    res.status(200).json(trains);
});

const getTrain = asyncHandler(async (req,res) => {
    const train = await Train.findById(req.params.id);
    if (!train) {
      res.status(404);
      throw new Error('Train Not Found');
    }
    res.status(200).json(train);
});

const auth = asyncHandler(async (req,res) => {
    const { companyName, clientID, ownerName, ownerEmail, rollNo, clientSecret } = req.body;
    if(!companyName || !clientID || !ownerName || !ownerEmail || !rollNo || !clientSecret) {
        res.status(400);
        throw new Error(`Given information is insufficient`);
    }
    const Comapany = await Train.findOne({ ownerEmail });
    const accessToken = jwt.sign({
            token_type: "Bearer",
            access_token: process.env.SECRET_ACCESS_KEY,
            expires_in: 1682629264
        }, { expiresIn: '10m'}
    );
    res.status(200).json({ accessToken });
});

const register = asyncHandler(async (req,res) => {
    const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;
    if(!companyName || !ownerName || !ownerEmail || !accessCode ) {
        res.status(400);
        throw new Error(`Given information is insufficient`);
    };
    const companyAvailable = await User.findOne({ rollNo });
    if(companyAvailable) {
        res.status(400);
        throw new Error(`Company already registered`);
    }
    const company = await Train.create({ companyName, ownerName, rollNo, ownerEmail, accessCode });
    if(company) {
        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }
        const clientSecret = await makeid(10);
        res.status(200).json({ companyName, clientID: Comapany.id, clientSecret })
    }
    else {
        res.status(400);
        throw new Error(`Company data is not valid`);
    }
});

module.exports = { getAllTrains, getTrain, auth, register };