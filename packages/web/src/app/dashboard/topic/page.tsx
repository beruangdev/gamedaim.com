import * as React from "react"
import NextLink from "next/link"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import toast from "react-hot-toast"
// import { useRouter } from "next/navigation"

import {
  HiPlus,
  // HiChevronLeft,
  // HiChevronRight,
  HiOutlineSearch,
} from "react-icons/hi"
import {
  Badge,
  Button,
  // IconButton,
  Input,
  Table,
  Tbody,
  Th,
  Tr,
  Td,
  Thead,
} from "ui"

import { DashboardContainer } from "@/components/Navigation"
import { TopicDataProps } from "@/lib/data-types"
import { deleteTopic, getTopics } from "@/lib/topic"
import { ActionDashboard } from "@/components/Action"

export default async function TopicDashboard() {
  // const router = useRouter()

  dayjs.extend(relativeTime)

  const handleDelete = async (item: TopicDataProps) => {
    const data = await deleteTopic(item.id)
    if (data) {
      toast.success("Topic deleted successfully")
    }
  }

  const data = await getTopics(1, "id_ID")

  console.log(data)

  return (
    <DashboardContainer>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink href="/dashboard/topic/new">
            <Button variant="ghost" leftIcon={<HiPlus />}>
              Add New
            </Button>
          </NextLink>
        </div>
        <form>
          <Input.Group>
            <Input type="text" name="search" />
            <Input.RightElement className="w-2">
              <button
                type="submit"
                className="inset-y-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
              >
                <HiOutlineSearch />
              </button>
            </Input.RightElement>
          </Input.Group>
        </form>
      </div>

      <div className="mb-[80px] mt-6 rounded">
        {data && (
          <Table className="table-fixed border-collapse border-spacing-0">
            <Thead>
              <Tr isTitle>
                <Th>Title</Th>
                <Th>Type</Th>
                <Th>Published Date</Th>
                <Th>Last Modified</Th>
                <Th align="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.map((topic: any) => (
                  <Tr key={topic.id}>
                    <Td className="line-clamp-3 max-w-[120px]">
                      <div className="flex">
                        <span className="font-medium">
                          {topic.translations.title}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex">
                        <Badge>{topic.type}</Badge>
                      </div>
                    </Td>
                    <Td>{dayjs(topic.createdAt).fromNow()}</Td>
                    <Td>{dayjs(topic.updatedAt).fromNow()}</Td>
                    <Td align="right">
                      <ActionDashboard
                        viewLink={`/topic/${topic.transaltions.slug}`}
                        onDelete={() => handleDelete(topic)}
                        editLink={`/dashboard/topic/${topic.id}`}
                        content={topic.transaltions.title}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </div>
    </DashboardContainer>
  )
}
