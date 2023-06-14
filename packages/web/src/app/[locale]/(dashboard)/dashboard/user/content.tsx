"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Badge } from "@/components/UI/Badge"
import { Button, IconButton } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import {
  useGetUsers,
  useGetUsersCount,
  useSearchUsers,
} from "@/lib/api/client/user"
import { UserDataProps } from "@/lib/data-types"
import { formatDate } from "@/utils/date"
import { handleDeleteUser } from "./actions"
import { Input } from "@/components/UI/Form"

const ActionDashboard = dynamic(() =>
  import("@/components/Action").then((mod) => mod.ActionDashboard),
)

export function UserDashboardContent() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [page, setPage] = React.useState<number>(1)
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [usersData, setUsersData] = React.useState<UserDataProps[]>([])
  const { usersCount } = useGetUsersCount()
  const lastPage = usersCount && Math.ceil(usersCount / 10)

  const { users, updatedUsers } = useGetUsers(page)
  const { users: searchResults, updatedUsers: updateSearchResults } =
    useSearchUsers(searchQuery)

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  React.useEffect(() => {
    if (searchQuery) {
      setUsersData(searchResults)
    } else {
      setUsersData(users)
    }
  }, [searchQuery, searchResults, users])

  React.useEffect(() => {
    if (page > lastPage) {
      setPage((old) => Math.max(old - 1, 0))
    }
  }, [lastPage, page])

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink href="/dashboard/user/new">
            <Button variant="ghost">
              <Icon.Add />
              Add New
            </Button>
          </NextLink>
        </div>
        <Input.Group className="max-w-[200px]">
          <Input
            value={searchQuery}
            onChange={handleSearchOnChange}
            type="text"
          />
          <Input.RightElement>
            <Button variant={null}>
              <Icon.Search />
            </Button>
          </Input.RightElement>
        </Input.Group>
      </div>
      <div className="mb-[80px] mt-6 rounded">
        {!isLoading &&
          (usersData !== undefined && usersData.length > 0 ? (
            <>
              <Table className="table-fixed border-collapse border-spacing-0">
                <Thead>
                  <Tr isTitle>
                    <Th>Username</Th>
                    <Th>Name</Th>
                    <Th className="hidden md:table-cell">Email</Th>
                    <Th>Role</Th>
                    <Th className="hidden md:table-cell">Date Joined</Th>
                    <Th align="center">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {usersData.map((user: UserDataProps) => (
                    <Tr key={user.id}>
                      <Td className="line-clamp-3 max-w-[120px]">
                        <div className="flex">
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </Td>
                      <Td className="white-space-nowrap">
                        <div className="flex">
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </Td>
                      <Td className="hidden whitespace-nowrap md:table-cell">
                        <div className="flex">
                          <span className="font-medium">{user.email}</span>
                        </div>
                      </Td>
                      <Td className="whitespace-nowrap">
                        <div className="flex">
                          <span className="font-medium">
                            <Badge>{user.role}</Badge>
                          </span>
                        </div>
                      </Td>
                      <Td className="hidden md:table-cell">
                        {formatDate(user.createdAt, "LL")}
                      </Td>
                      <Td align="right">
                        <ActionDashboard
                          viewLink={`/user/${user.username}`}
                          onDelete={() => {
                            handleDeleteUser(user.id, () => {
                              updateSearchResults
                              updatedUsers
                            })
                          }}
                          editLink={`/dashboard/user/edit/${user.id}`}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {page && !searchQuery && (
                <div className="align-center mt-2 flex items-center justify-center space-x-2">
                  {page !== 1 && (
                    <IconButton
                      variant="ghost"
                      onClick={() => setPage((old) => Math.max(old - 1, 0))}
                      disabled={page === 1}
                      className="rounded-full"
                    >
                      <Icon.ChevronLeft />
                    </IconButton>
                  )}
                  {page !== lastPage && (
                    <IconButton
                      variant="ghost"
                      onClick={() => {
                        setPage((old) => old + 1)
                      }}
                      className="rounded-full"
                    >
                      <Icon.ChevronRight />
                    </IconButton>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="my-48 flex items-center justify-center">
              <h3 className="text-center text-4xl font-bold">
                Users Not found
              </h3>
            </div>
          ))}
      </div>
    </>
  )
}
