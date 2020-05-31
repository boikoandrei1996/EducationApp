'use strict';

const { User } = require('../models');

exports.getAllUsers = async function (req, res)
{
    try
    {
        const docs = await User.find({});
        return res.send(docs);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.createUser = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const { name, role } = req.body;

    const user = new User({
        name: name,
        role: role
    });

    try
    {
        await user.save();
        return res.send(user);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};