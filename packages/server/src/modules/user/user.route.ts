import { FastifyInstance } from "fastify"

import {
  deleteUserHandler,
  getTotalUsersHandler,
  getUserByIdHandler,
  getUserByUsernameAndGetArticlesHandler,
  getUserByUsernameAndGetDownloadsHandler,
  getUserByUsernameHandler,
  getUsersByRoleHandler,
  getUsersHandler,
  loginHandler,
  registerUserHandler,
  searchUsersHandler,
  updateUserByAdminHandler,
  updateUserHandler,
} from "./user.controller"
import { $ref } from "./user.schema"

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/signup",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("userResponseSchema"),
        },
      },
    },
    registerUserHandler,
  )

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler,
  )

  server.put(
    "/:userId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    updateUserHandler,
  )

  server.put(
    "/update-by-admin/:userId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    updateUserByAdminHandler,
  )

  server.delete(
    "/:userId",
    { preHandler: [server.authenticate] },
    deleteUserHandler,
  )

  server.get(
    "/page/:userPage",
    {
      preHandler: [server.authenticate],
    },
    getUsersHandler,
  )

  server.get(
    "/:userRole/page/:userPage",
    {
      preHandler: [server.authenticate],
    },
    getUsersByRoleHandler,
  )

  server.get(
    "/:userId",
    {
      schema: {
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    getUserByIdHandler,
  )

  server.get(
    "/username/:username",
    {
      schema: {
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    getUserByUsernameHandler,
  )

  server.get(
    "/username/:username/articles/:userPage",
    {
      schema: {
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    getUserByUsernameAndGetArticlesHandler,
  )


  server.get(
    "/username/:username/downloads/:userPage",
    {
      schema: {
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    getUserByUsernameAndGetDownloadsHandler,
  )

  server.get(
    "/count",
    { preHandler: [server.authenticate] },
    getTotalUsersHandler,
  )

  server.get(
    "/search/:searchUserQuery",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    searchUsersHandler,
  )
}

export default userRoutes
