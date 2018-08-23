const User = sequelize.define('user', {
    id: Sequelize.INTEGER,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            is: /^[a-zA-Z0-9]+$/i,
        }
    },


    isActivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },

    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },

    birthday: Sequelize.DATEONLY,
    // location:
})
