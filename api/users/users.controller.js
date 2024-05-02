
const { request, response } = require("express");
const  {create, updateUser, updatePassword, userLogin, getUserById, requestResetPassword, getUsers, updateUserRole} = require("./users.service");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUserAccount : (request, response) => 
    {
        const body = request.body;
        if(!body.email)
        {
            return response.status(400).json({
                success : false,
                message: "email is required to create user account"
            });
        }

        if(!body.password)
        {
            return response.status(400).json({
                success : false,
                message: "password is required to create user account"
            });
        }
        if(!body.roleId)
        {
            return response.status(400).json({
                success : false,
                message: "roleId is required to create user account"
            });
        }

        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to create user account"
            });
        }
        
        create(request, (error, result)=> {
            if(error)
            {
                if(error.toString().includes("exists"))
                {
                    return response.status(409).json({
                        success : false,
                        message : error
                    });
                }
                else{
                    return response.status(500).json({
                        success : false,
                        message : error
                    });
                }
            }

            return response.status(200).json({
                success : true,
                message : "user account successfully created"
            });
        });
    },

    updateUserAccount : (request, response) => {

        if(!request.body.userId)
        {
            return response.status(400).json({
                success : false,
                message: "userId is required to update data"
            });
        }

        updateUser(request, (error, results) => {
            if(error)
            {
                if(error.includes("exists"))
                {
                    return response.status(409).json({
                        success : false,
                        message : error
                    });
                }
                else{
                    return response.status(500).json({
                        success : false,
                        message : error
                    });
                }
            }

            return response.status(200).json({
                success : true,
                message : "User account successfully updated"
            });
        });
    },

    updateUserRole : (request, response) => {

        if(!request.body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to update data"
            });
        }

        updateUserRole(request, (error, results) => {
            if(error)
            {
                console.log(error);
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "User role successfully updated"
            });
        });
    },

    updatePassword: (request, response) => {

        if(!request.body.email)
        {
            return response.status(400).json({
                success : false,
                message: "email is required to update password"
            });
        }
        if(!request.body.otp)
        {
            return response.status(400).json({
                success : false,
                message: "otp is required to update password"
            });
        }
        if(!request.body.password)
        {
            return response.status(400).json({
                success : false,
                message: "password is required to update password"
            });
        }

        updatePassword(request.body, (error, results) => {
            if(error)
            {
                if(error.includes("already used")){
                    return response.status(403).json({
                        success : false,
                        message : "This password is previously used. Please set new password",
                        error: error
                    });
                }
                else if(error.includes("Invalid OTP")){
                    return response.status(400).json({
                        success : false,
                        message : "You entered wrong OTP. Please enter correct OTP to reset password",
                        error: error
                    });
                }
                else if(error.includes("No user found")){
                    return response.status(404).json({
                        success : false,
                        message : "No user account associated with the input email.",
                        error: error
                    });
                }
                else if(error.includes("expired")){
                    return response.status(403).json({
                        success : false,
                        message : "OTP is expired and invalid now.",
                        error: error
                    });
                }
                else {
                    return response.status(500).json({
                        success : false,
                        message : "Something went wrong while updating the password",
                        error: error
                    });
                }
            }

            return response.status(200).json({
                success : true,
                message : "User account password successfully updated"
            });
        });
    },

    userLogin : (request, response) => {
        var body = request.body;
        if(!body.email)
        {
            return response.status(400).json({
                success : false,
                message: "Email is required to login"
            });
        }

        if(!body.password)
        {
            return response.status(400).json({
                success : false,
                message: "Password is required to login"
            });
        }
        userLogin(body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "Error while login to system",
                    error : error
                });
            }

            if(!results)
            {
                return response.status(404).json(
                    {
                        success : false,
                        message : "user account not exists. Please create account"
                    }
                );
            }
            else
            {
                
                const jsonToken = sign({result : {
                    email: body.email,
                    password: body.password,
                    userId : results.userId,
                    displayName : results.displayName,
                }}, process.env.SECRET_KEY, {
                    expiresIn : "1400h"
                });
                return response.status(200).json({
                    success : true,
                    message : "You successfully login",
                    token: jsonToken,
                    data : results
                });
            }
        });
    },

    getUserById : (request, response) => {
        var body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : false,
                message: "userId is required to get user details"
            });
        }

        getUserById(body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "error while getting user details",
                    error : error
                });
            }

            if(!results)
            {
                return response.status(404).json(
                    {
                        success : false,
                        message : "user account not exists. Please create account"
                    }
                );
            }
            else
            {
                return response.status(200).json({
                    success : true,
                    message : "successfully read the user data",
                    data : results
                });
            }
        });
    },

     getUsers : (request, response) => {
        var body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to get users"
            });
        }

        getUsers(body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "error while getting users",
                    error : error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully read the users data",
                    data : results
                });
            }
        });
    },

    requestResetPassword : (request, response) => {
        var body = request.body;
        if(!body.email)
        {
            return response.status(400).json({
                success : false,
                message: "Email is required to reset password"
            });
        }
        
        requestResetPassword(body, (error, results)=> {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "error while sending email",
                    error : error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "password reset email sent",
                    data : results
                });
            }
        });
    },
};