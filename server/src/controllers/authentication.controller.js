
export const userLogin = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        throwError({ message: "All the fields are required", statusCode: HttpStatus.BAD_REQUEST })
    }

    // checking is user exists or not
    const user = await User.findOne({ email });

    if (!user) {
        throwError({ message: "User not found", statusCode: HttpStatus.NOT_FOUND })
    }

    // Comparing the password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throwError({ message: "Wrong password, please check your password", statusCode: HttpStatus.UNAUTHORIZED })
    }

    // Cannot send password to frontend because of security issues
    user.password = null;

    // return res.status(HttpStatus.OK).json({ message: `Authentication successful, Welcome ${user.fullName}` })
    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: `Authentication successful, Welcome ${user.name}`,
        data: user
    })

})


export const changePassword = asyncErrorHandler(async (req, res) => {

    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'User not found' })
    }

    // Compare oldPassword with stored hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Incorrect old password.' })
    }

    user.password = newPassword;
    await user.save();

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: "Password is changes successfully"
    })

})

