"use strict"

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        return strapi.services.menu.find(ctx.query, {
            path: "navigations",
            populate: {
                path: "pages",
            },
        })
    },
}
