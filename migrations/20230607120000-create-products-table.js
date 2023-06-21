/*'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // Додайте інші поля таблиці products тут
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        productCategoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sellerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        projectCategoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        deadline: {
            type: Sequelize.TIME,
        },
        beginning: {
            type: Sequelize.TIME,
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
}
*/