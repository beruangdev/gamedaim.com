"use client"
import * as React from "react"
import { useForm } from "react-hook-form"

import { TopicDataProps, LanguageTypeData } from "@/lib/data-types"
import {
  postTopicWithPrimaryAction,
  searchTopicsDashboardByLangAction,
} from "@/lib/api/server/topic"
import { toast } from "../UI/Toast"
import { Button } from "../UI/Button"
import { FormErrorMessage, Input } from "../UI/Form"

interface FormValues {
  title: string
  content: string
  excerpt?: string
  meta_title?: string
  meta_description?: string
}

interface AddTopicsProps extends React.HTMLAttributes<HTMLDivElement> {
  topics: string[]
  lang: LanguageTypeData
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
    const { topics, addTopics, selectedTopics, addSelectedTopics, lang } = props

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
        const { data } = await searchTopicsDashboardByLangAction(
          lang,
          value.title,
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
          const { data } = await postTopicWithPrimaryAction(value)

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
      [addSelectedTopics, addTopics, assignTopic, lang, reset, selectedTopics],
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
          lang,
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
          <h3 className="text-base">Topics</h3>
          <div className="border-theme-300 bg-theme-100 dark:border-theme-700 dark:bg-theme-700 rounded-md border">
            <div className="parent-focus flex max-w-[300px] flex-row flex-wrap items-center justify-start gap-2 p-2">
              {selectedTopics.length > 0 &&
                selectedTopics.map((topic) => {
                  return (
                    <div
                      className="bg-theme-200 dark:bg-theme-800 flex items-center gap-2 px-2 py-1 text-[14px] text-black dark:text-white"
                      key={topic.id}
                    >
                      <span>{topic.title}</span>
                      <Button
                        disabled={selectedTopics.length === 1}
                        aria-label="Delete Topic"
                        onClick={() => handleRemoveValue(topic)}
                        className="h-auto min-w-0 bg-transparent p-0 text-inherit"
                      >
                        <div>
                          <svg
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                          </svg>
                        </div>
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
              <ul className="border-theme-300 border-t">
                {searchResults.map((searchTopic: TopicDataProps) => {
                  const dataTopics = {
                    id: searchTopic.id,
                    title: searchTopic.title,
                  }
                  return (
                    <li
                      key={searchTopic.id}
                      className="hover:bg-theme-500 p-2"
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
