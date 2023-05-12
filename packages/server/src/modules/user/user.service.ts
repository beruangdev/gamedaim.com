import { hashPassword } from "../../utils/password"
import db from "../../utils/db"
import { CreateUserInput, UpdateUserInput } from "./user.schema"

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input
  const hashedPassword = hashPassword(password)

  return await db.user.create({
    data: { ...rest, password: hashedPassword },
  })
}

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  })
}

export async function findUserByUsername(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
      phoneNumber: true,
      about: true,
      role: true,
      profilePicture: {
        select: {
          url: true,
        },
      },
      // articles: {
      //   take: 6,
      //   orderBy: {
      //     updatedAt: "desc",
      //   },
      //   select: {
      //     id: true,
      //     excerpt: true,
      //     title: true,
      //     slug: true,
      //     featuredImage: {
      //       select: {
      //         url: true,
      //       },
      //     },
      //   },
      // },
      createdAt: true,
    },
  })
}

// export async function findUserByUsernameAndGetArticles(
//   username: string,
//   userPage: number,
//   perPage: number,
// ) {
//   return await db.user.findUnique({
//     where: {
//       username,
//     },
//     select: {
//       id: true,
//       username: true,
//       name: true,
//       metaTitle: true,
//       metaDescription: true,
//       profilePicture: {
//         select: {
//           url: true,
//         },
//       },
//       articles: {
//         skip: (userPage - 1) * perPage,
//         take: perPage,
//         orderBy: {
//           updatedAt: "desc",
//         },
//         select: {
//           id: true,
//           title: true,
//           excerpt: true,
//           slug: true,
//           featuredImage: {
//             select: {
//               url: true,
//             },
//           },
//         },
//       },
//       _count: {
//         select: {
//           articles: true,
//         },
//       },
//     },
//   })
// }

export async function findUserById(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
      phoneNumber: true,
      about: true,
      role: true,
      profilePicture: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  })
}

export async function findUsers(userPage: number, perPage: number) {
  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (userPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })
}

export async function updateUser(userId: string, data: UpdateUserInput) {
  return await db.user.update({
    where: { id: userId },
    data,
  })
}

export async function searchUsers(searchUserQuery: string) {
  return await db.user.findMany({
    where: {
      OR: [
        { email: { contains: searchUserQuery } },
        { name: { contains: searchUserQuery } },
        { username: { contains: searchUserQuery } },
      ],
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })
}

export async function deleteUserById(userId: string) {
  return await db.user.delete({
    where: {
      id: userId,
    },
  })
}

export async function getTotalUsers() {
  return await db.user.count()
}
