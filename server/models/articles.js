'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

const User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define('article', {
    title: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    version: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        get() {
            console.log('TAGS', this.getDataValue('tags'))
            return this.getDataValue('tags').join(', ')
        }
    }
});

Article.afterValidate(art => {
    if (!art.title) {
        throw new Error('Validation error')
    }
})

Article.prototype.truncate = function(leng) {
    this.content = this.content.substring(0,leng)
}

Article.findByTitle = async function(search) {
    const found = await Article.findOne({
        where: {
            title: search
        }
    })
    return found;
}

Article.belongsTo(User, {as: 'author'})

Article.beforeUpdate(art => {
    art.version = art.version + 1;
})

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
