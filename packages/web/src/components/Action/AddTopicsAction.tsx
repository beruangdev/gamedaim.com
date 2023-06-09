"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "@/components/UI/Toast"
import { Button } from "@/components/UI/Button"
import { FormErrorMessage, FormLabel, Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { TopicDataProps, LanguageTypeData } from "@/lib/data-types"
import {
  postTopicWithPrimaryAction,
  searchTopicsByLangAndTopicTypeAction,
  searchTopicsDashboardByLangAction,
} from "@/lib/api/server/topic"

interface FormValues {
  title: string
  content: string
  excerpt?: string
  meta_title?: string
  meta_description?: string
}

interface AddTopicsProps extends React.HTMLAttributes<HTMLDivElement> {
  topics: string[]
  topicType: string
  locale: LanguageTypeData
  addTopics: React.Dispatch<React.SetStateAction<string[]>>
  selectedTopics: {
    id: string
    title: string
  }[]
  addSelectedTopics: React.Dispatch<
    React.SetStateAction<
      {
        id: string
        title: string
      }[]
    >
  >
}

interface FormValues {
  title: string
}

export const AddTopicsAction = React.forwardRef<HTMLDivElement, AddTopicsProps>(
  (props, ref) => {
    const {
      topics,
      topicType,
      addTopics,
      selectedTopics,
      addSelectedTopics,
      locale,
    } = props

    const [searchResults, setSearchResults] = React.useState<TopicDataProps[]>(
      [],
    )
    const [inputValue, setInputValue] = React.useState<string>("")

    const {
      register,
      setValue,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm<FormValues>({ mode: "all", reValidateMode: "onChange" })

    const assignTopic = React.useCallback(
      (id: string | never) => {
        const checkedTopics = [...topics]
        const index = checkedTopics.indexOf(id as never)
        if (index === -1) {
          checkedTopics.push(id as never)
        } else {
          checkedTopics.splice(index, 1)
        }
        addTopics(checkedTopics)
      },
      [addTopics, topics],
    )

    const onSubmit = React.useCallback(
      async (value: FormValues) => {
        const { data } = await searchTopicsByLangAndTopicTypeAction(
          locale,
          value.title,
          topicType,
        )
        const searchResult = data?.find((topic) => topic.title === value.title)

        if (searchResult) {
          if (
            !selectedTopics.some((topic) => topic.title === searchResult.title)
          ) {
            const resultValue = {
              id: searchResult.id,
              title: searchResult.title,
            }

            assignTopic(searchResult.id)
            addSelectedTopics((prev) => [...prev, resultValue])
          }
          setInputValue("")
          setSearchResults([])
        } else {
          const { data } = await postTopicWithPrimaryAction({
            ...value,
            type: topicType,
          })

          if (data) {
            addSelectedTopics((prev) => [
              ...prev,
              { ...data, title: value.title },
            ])
            addTopics((prev: string[]) => [...prev, data.id])
            reset()
            toast({
              variant: "success",
              description: "Topic Successfully created",
            })
          }
        }
      },
      [
        addSelectedTopics,
        addTopics,
        assignTopic,
        locale,
        reset,
        selectedTopics,
        topicType,
      ],
    )

    const handleFormSubmit = React.useCallback(
      (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setValue("title", inputValue)
        handleSubmit(onSubmit)()
      },
      [handleSubmit, inputValue, onSubmit, setValue],
    )

    const handleKeyDown = (event: {
      key: string
      preventDefault: () => void
    }) => {
      if (event.key === "Enter") {
        setValue("title", inputValue)
        event.preventDefault()
        handleSubmit(onSubmit)()
        setInputValue("")
      }
    }

    const handleSearchChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      e.preventDefault()
      setInputValue(e.target.value)
      if (e.target.value.length > 1) {
        const { data } = await searchTopicsDashboardByLangAction(
          locale,
          e.target.value,
        )

        if (data) {
          setSearchResults(data as TopicDataProps[])
        }
      } else if (e.target.value.length < 1) {
        setSearchResults([])
      }
    }

    const handleSelectandAssign = (value: { id: string; title: string }) => {
      if (!selectedTopics.some((topic) => topic.title === value.title)) {
        setInputValue("")
        setSearchResults([])
        assignTopic(value.id)
        addSelectedTopics((prev) => [...prev, value])
      } else {
        toast({
          variant: "danger",
          description: value.title + " telah dikirimkan",
        })
        setInputValue("")
        setSearchResults([])
      }
    }

    const handleRemoveValue = (value: { id: string }) => {
      const filteredResult = selectedTopics.filter(
        (item) => item.id !== value.id,
      )

      const filteredData = topics.filter((item) => item !== value.id)
      addSelectedTopics(filteredResult)
      addTopics(filteredData)
    }
    return (
      <>
        <div ref={ref}>
          <FormLabel>Topics</FormLabel>
          <div className="border-muted/30 bg-muted/100 rounded-md border">
            <div className="parent-focus flex max-w-[300px] flex-row flex-wrap items-center justify-start gap-2 p-2">
              {selectedTopics.length > 0 &&
                selectedTopics.map((topic) => {
                  return (
                    <div
                      className="bg-muted/20 text-foreground flex items-center gap-2 px-2 py-1 text-[14px]"
                      key={topic.id}
                    >
                      <span>{topic.title}</span>
                      <Button
                        aria-label="Delete Topic"
                        onClick={() => handleRemoveValue(topic)}
                        className="text-foreground hover:bg-warning h-auto min-w-0 bg-transparent p-0"
                      >
                        <Icon.Close />
                      </Button>
                    </div>
                  )
                })}
              <Input
                type="text"
                {...register("title", {
                  required: selectedTopics.length === 0 && "Topic is Required",
                })}
                className="h-auto w-full min-w-[50px] max-w-full shrink grow basis-0 border-none !bg-transparent p-0 focus:border-none focus:ring-0"
                name="title"
                onKeyDown={handleKeyDown}
                id="searchTopic"
                value={inputValue}
                placeholder="Enter topics"
                onChange={handleSearchChange}
                onSubmit={handleFormSubmit}
              />

              {errors?.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </div>
            {searchResults.length > 0 && (
              <ul className="border-muted/30 border-t">
                {searchResults.map((searchTopic: TopicDataProps) => {
                  const dataTopics = {
                    id: searchTopic.id,
                    title: searchTopic.title,
                  }
                  return (
                    <li
                      key={searchTopic.id}
                      className="hover:bg-muted/50 p-2"
                      onClick={() => handleSelectandAssign(dataTopics)}
                    >
                      {searchTopic.title}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  },
)
