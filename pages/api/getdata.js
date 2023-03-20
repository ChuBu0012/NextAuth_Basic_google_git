import React from 'react';
import connectMongoDB from '../../databases/conn';
import Users from '../../model/schema';

const Getdata = (req, res) => {
    connectMongoDB()

    const result = Users.find({})
    .then((data) => res.json(data))
}

export default Getdata;
