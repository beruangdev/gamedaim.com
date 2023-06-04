"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "@/components/UI/Toast"
import { Button } from "@/components/UI/Button"
import { FormErrorMessage, Input } from "@/components/UI/Form"
import { ScrollArea } from "@/components/UI/ScrollArea"
import { Icon } from "@/components/UI/Icon"

import { UserDataProps } from "@/lib/data-types"
import { searchUsersAction } from "@/lib/api/server/user"

interface FormValues {
  name: string
  content: string
  excerpt?: string
  meta_title?: string
  meta_description?: string
}

interface AddAuthorsProps extends React.HTMLAttributes<HTMLDivElement> {
  authors: string[]

  addAuthors: React.Dispatch<React.SetStateAction<string[]>>
  selectedAuthors: {
    id: string
    name: string
  }[]
  addSelectedAuthors: React.Dispatch<
    React.SetStateAction<
      {
        id: string
        name: string
      }[]
    >
  >
}

interface FormValues {
  name: string
}

export function AddAuthorsAction(props: AddAuthorsProps) {
  const { authors, addAuthors, selectedAuthors, addSelectedAuthors } = props

  const [searchResults, setSearchResults] = React.useState<UserDataProps[]>([])
  const [inputValue, setInputValue] = React.useState<string>("")
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: "all", reValidateMode: "onChange" })

  const assignAuthor = React.useCallback(
    (id: string | never) => {
      const checkedAuthors = [...authors]
      const index = checkedAuthors.indexOf(id as never)
      if (index === -1) {
        checkedAuthors.push(id as never)
      } else {
        checkedAuthors.splice(index, 1)
      }
      addAuthors(checkedAuthors)
    },
    [addAuthors, authors],
  )

  const onSubmit = React.useCallback(
    async (value: FormValues) => {
      const { data } = await searchUsersAction(value.name)
      const searchResult = data?.find(
        (author) =>
          author.name === value.name && author.role === ("ADMIN" || "AUTHOR"),
      )

      if (searchResult) {
        if (
          !selectedAuthors.some((author) => author.name === searchResult.name)
        ) {
          const resultValue = {
            id: searchResult.id,
            name: searchResult.name,
          }

          assignAuthor(searchResult.id)
          addSelectedAuthors((prev) => [...prev, resultValue])
        }
        setInputValue("")
        setSearchResults([])
      } else {
        toast({
          variant: "danger",
          description: "Author not found",
        })
      }
    },
    [addSelectedAuthors, assignAuthor, selectedAuthors],
  )

  const handleFormSubmit = React.useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault()
      setValue("name", inputValue)
      handleSubmit(onSubmit)()
    },
    [handleSubmit, inputValue, onSubmit, setValue],
  )

  const handleKeyDown = (event: {
    key: string
    preventDefault: () => void
  }) => {
    if (event.key === "Enter") {
      setValue("name", inputValue)
      event.preventDefault()
      handleSubmit(onSubmit)()
      setInputValue("")
    }
  }

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)
    if (e.target.value.length > 1) {
      const { data } = await searchUsersAction(e.target.value)

      if (data) {
        setSearchResults(data as UserDataProps[])
      }
    } else if (e.target.value.length < 1) {
      setSearchResults([])
    }
  }

  const handleSelectandAssign = (value: { id: string; name: string }) => {
    if (!selectedAuthors.some((author) => author.name === value.name)) {
      setInputValue("")
      setSearchResults([])
      assignAuthor(value.id)
      addSelectedAuthors((prev) => [...prev, value])
    } else {
      toast({
        variant: "danger",
        description: value.name + " telah dikirimkan",
      })
      setInputValue("")
      setSearchResults([])
    }
  }

  const handleRemoveValue = (value: { id: string }) => {
    const filteredResult = selectedAuthors.filter(
      (item) => item.id !== value.id,
    )

    const filteredData = authors.filter((item) => item !== value.id)
    addSelectedAuthors(filteredResult)
    addAuthors(filteredData)
  }
  return (
    <div>
      <h3 className="text-base">Authors</h3>
      {selectedAuthors.length > 0 && (
        <ScrollArea className="mb-2 mt-2 max-h-72 rounded-md border">
          <div>
            {selectedAuthors.map((author) => {
              return (
                <div
                  className="bg-muted/80 text-foreground flex items-center gap-2 px-2 py-1 text-[14px]"
                  key={author.id}
                >
                  <span>{author.name}</span>
                  <Button
                    disabled={selectedAuthors.length === 1}
                    aria-label="Delete Author"
                    onClick={() => handleRemoveValue(author)}
                    className="h-auto min-w-0 bg-transparent p-0 text-inherit"
                  >
                    <Icon.Delete />
                  </Button>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      )}
      <div className="border-muted/30 bg-muted/10 rounded-md border">
        <div className="parent-focus flex max-w-[300px] flex-row flex-wrap items-center justify-start gap-2 p-2">
          <Input
            type="text"
            {...register("name", {
              required: selectedAuthors.length === 0 && "Author is Required",
            })}
            className="h-auto w-full min-w-[50px] max-w-full shrink grow basis-0 border-none !bg-transparent p-0 focus:border-none focus:ring-0"
            name="name"
            onKeyDown={handleKeyDown}
            id="searchAuthor"
            value={inputValue}
            placeholder="Find authors"
            onChange={handleSearchChange}
            onSubmit={handleFormSubmit}
          />

          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </div>
        {searchResults.length > 0 && (
          <ul className="border-muted/30 border-t">
            {searchResults.map((searchAuthor: UserDataProps) => {
              const dataAuthors = {
                id: searchAuthor.id,
                name: searchAuthor.name,
              }
              return (
                <li
                  key={searchAuthor.id}
                  className="hover:bg-muted/50 p-2"
                  onClick={() => handleSelectandAssign(dataAuthors)}
                >
                  {searchAuthor.name}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
