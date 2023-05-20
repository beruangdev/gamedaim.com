import fastify, { FastifyReply, FastifyRequest } from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import multipart from "@fastify/multipart"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { withRefResolver } from "fastify-zod"

import env from "env"
import { LoggerOption, loggerOption } from "@/utils/logger"
import { version } from "package.json"
import adRoutes from "@/modules/ad/ad.route"
import { adSchemas } from "@/modules/ad/ad.schema"
import articleRoutes from "@/modules/article/article.route"
import { articleSchemas } from "@/modules/article/article.schema"
import articleCommentRoutes from "@/modules/article-comment/article-comment.route"
import { articleCommentSchemas } from "@/modules/article-comment/article-comment.schema"
import mediaRoutes from "@/modules/media/media.route"
import { mediaSchemas } from "@/modules/media/media.schema"
import settingRoutes from "@/modules/setting/setting.route"
import { settingSchemas } from "@/modules/setting/setting.schema"
import topicRoutes from "@/modules/topic/topic.route"
import { topicSchemas } from "@/modules/topic/topic.schema"
import userRoutes from "@/modules/user/user.route"
import { userSchemas } from "@/modules/user/user.schema"

function buildServer() {
  const server = fastify({
    logger: loggerOption[env.NODE_ENV as keyof LoggerOption] ?? true,
  })

  const allowedOrigins = (env.ORIGIN?.split(",") ?? []).map((origin) => {
    if (origin.startsWith("https://")) {
      return origin
    } else {
      return `https://${origin}`
    }
  })

  server.register(cors, {
    origin: env.NODE_ENV === "production" ? allowedOrigins : true,
    credentials: true,
  })

  server.register(jwt, {
    secret: env.JWT_SECRET,
  })

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (e) {
        return reply.send(e)
      }
    },
  )

  server.register(multipart, {
    limits: {
      fieldNameSize: 100,
      fieldSize: 100,
      fields: 10,
      fileSize: 1000000,
      files: 1,
      headerPairs: 2000,
    },
  })

  server.get("/health-check", async () => {
    return { status: "OK" }
  })

  server.addHook("preHandler", (req, _reply, next) => {
    req.jwt = server.jwt
    return next()
  })

  for (const schema of [
    ...adSchemas,
    ...userSchemas,
    ...articleSchemas,
    ...articleCommentSchemas,
    ...mediaSchemas,
    ...topicSchemas,
    ...settingSchemas,
  ]) {
    server.addSchema(schema)
  }

  server.register(
    fastifySwagger,
    withRefResolver({
      openapi: {
        info: {
          title: "Gamedaim API",
          description: "Gamedaim API",
          version,
        },
      },
    }),
  )

  server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  })

  server.register(adRoutes, { prefix: "api/ad" })
  server.register(userRoutes, { prefix: "api/user" })
  server.register(articleRoutes, { prefix: "api/article" })
  server.register(articleCommentRoutes, { prefix: "api/article-comment" })
  server.register(topicRoutes, { prefix: "api/topic" })
  server.register(mediaRoutes, { prefix: "api/media" })
  server.register(settingRoutes, { prefix: "api/setting" })

  return server
}

export default buildServer
