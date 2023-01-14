const response = require('../Functions/validateResponse')
const jwt = require('jsonwebtoken')
const userFuncs = require('../Functions/userFunctions.js')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.signUp = async (req, res) => {
  try {
    const emailCheck = await userFuncs.fetchUser(req.body)
    if (emailCheck) {
      return response.failResponse(req, res, 'this email already exists')
    }
    const result = await userFuncs.registerUser(req.body)
    return response.successResponse(req, res, result)
  } catch (error) {
    return response.errorResponse(req, res, error)
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userModel.find()
    console.log('data', data)
    let filteredDta = data.filter((elm) => elm.role == 'creator')
    const filters = req.query

    // console.log("req.query", req.query);

    res.setHeader('content-type', 'application/json')
    res.status(200).json({
      status: 'success',
      count: filteredDta.length,
      // pages:   parseInt(req.query.page, 10),
      // pages: page,
      data: filteredDta,
    })
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: { msg: 'error to fetch data' },
    })
    console.log(error.message)
  }
}

exports.signIn = async (req, res) => {
  try {
    const result = await userFuncs.fetchUser(req.body)
    if (!result) {
      return response.failResponse(req, res, 'no user found with this email!')
    }
    // if (result.password !== req.body.password) {
    //     return response.failResponse(req, res, "incorrect password ");
    // };
    let compare = await bcrypt.compare(
      req.body.password,
      result.password,
      (err, match) => {
        if (match) {
          const token = jwt.sign(
            {
              id: result.id,
              email: result.email,
              username: result.name,
            },
            'MERN.test',
            { expiresIn: '5d' },
          )
          console.log('result', result)
          const data = { token: token, user: result }
          return response.successResponse(req, res, data)
        } else {
          return response.failResponse(req, res, 'incorrect password ')
        }
      },
    )
  } catch (error) {
    return response.errorResponse(req, res, error)
  }
}
