"use client"
import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"
import { Controller, useForm } from "react-hook-form"
import { useDisclosure } from "@/hooks/use-disclosure"
import { postArticleWithPrimaryAction } from "@/lib/api/server/article"
import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@/components/UI/Form"
import { LanguageTypeData } from "@/lib/data-types"

import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { ModalSelectMedia } from "@/components/Modal/ModalSelectMedia"
import { ArticleDashboardLayout } from "@/layouts/ArticleDashboard"
import {
  AddAuthorsAction,
  AddEditorsAction,
  AddTopicsAction,
} from "@/components/Action"
import { useCurrentUser } from "@/hooks/use-current-user"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { EditorContent, useEditor } from "@tiptap/react"
import { EditorKitExtension, EditorMenu } from "@/components/Editor"
import { Icon } from "@/components/UI/Icon"

interface FormValues {
  title: string
  content: string
  excerpt?: string
  language: string
  meta_title?: string
  meta_description?: string
}
export const AddArticleForm = (props: { lang: LanguageTypeData }) => {
  const { lang } = props
  const { user } = useCurrentUser()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [editorContent, setEditorContent] = React.useState<string>("")
  const [topics, setTopics] = React.useState<string[]>([])
  const [authors, setAuthors] = React.useState<string[]>([])
  const [editorIds, setEditorIds] = React.useState<string[]>([])
  const [selectedFeaturedImageId, setSelectedFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  const [selectedTopics, setSelectedTopics] = React.useState<
    { id: string; title: string }[] | []
  >([])
  const [selectedAuthors, setSelectedAuthors] = React.useState<
    { id: string; name: string }[] | []
  >([])
  const [selectedEditors, setSelectedEditors] = React.useState<
    { id: string; name: string }[] | []
  >([])
  const { isOpen, onToggle } = useDisclosure()

  const editor = useEditor({
    extensions: [EditorKitExtension],
    content: "<p></p>",
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML())
    },
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormValues>({ mode: "onBlur" })

  React.useEffect(() => {
    if (user) {
      setAuthors((prevAuthors) => [...prevAuthors, user.user.id])
      setSelectedAuthors((prevSelectedAuthors) => [
        ...prevSelectedAuthors,
        { id: user.user.id, name: user.user.name },
      ])
      setEditorIds((prevEditorIds) => [...prevEditorIds, user.user.id])
      setSelectedEditors((prevSelectedEditors) => [
        ...prevSelectedEditors,
        { id: user.user.id, name: user.user.name },
      ])
    }
  }, [user])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      content: editorContent,
      topicIds: topics,
      featuredImageId: selectedFeaturedImageId,
      authorIds: authors,
      editorIds: editorIds,
    }
    const { data } = await postArticleWithPrimaryAction(mergedValues)
    if (data) {
      reset()
      editor?.commands.clearContent()
      setSelectedTopics([])
      setSelectedFeaturedImageUrl("")
      toast({
        variant: "success",
        description: "Article successfully created ",
      })
    }
    setLoading(false)
  }

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedFeaturedImageId(data.id)
    setSelectedFeaturedImageUrl(data.url)
    setOpenModal(false)
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="space-y-4"
      >
        <div className="dark:bg-theme-800 sticky top-[0px] z-[90] flex items-center justify-between bg-white px-3 py-5">
          <Button aria-label="Back To Articles" variant="ghost">
            <NextLink aria-label="Back To Articles" href="/dashboard/articles">
              Articles
            </NextLink>
          </Button>
          <div>
            <Button
              aria-label="Publish"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="ghost"
              loading={loading}
            >
              Publish
            </Button>
            <Button
              aria-label="View Sidebar"
              variant="ghost"
              onClick={onToggle}
            >
              <Icon.Menu />
            </Button>
          </div>
        </div>
        <ArticleDashboardLayout
          isOpen={isOpen}
          sidebar={
            <div className="scollbarhide scrollbar fixed bottom-0 right-0 top-0 mt-[70px] flex min-w-[300px] max-w-[300px] flex-col space-y-4 overflow-auto bg-white p-4 dark:bg-[inherit] max-sm:min-w-full max-sm:max-w-full">
              <AddTopicsAction
                lang={lang}
                topics={topics}
                addTopics={setTopics}
                selectedTopics={selectedTopics}
                addSelectedTopics={setSelectedTopics}
              />
              {selectedFeaturedImageUrl ? (
                <>
                  <FormLabel>Featured Image</FormLabel>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <div className="relative">
                          <NextImage
                            src={selectedFeaturedImageUrl}
                            className="border-theme-300 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
                            fill
                            alt="Featured Image"
                            onClick={() => setOpenModal(true)}
                            sizes="(max-width: 768px) 30vw,
            (max-width: 1200px) 20vw,
            33vw"
                            quality={60}
                          />
                        </div>
                      </>
                    }
                  />
                </>
              ) : (
                <>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <FormLabel>Featured Image</FormLabel>
                        <div className="bg-theme/90 relative m-auto flex aspect-video h-[150px] items-center justify-center text-green-500">
                          <p>Select Featured Image</p>
                        </div>
                      </>
                    }
                  />
                </>
              )}
              <div className="my-2 flex flex-col px-4">
                <AddAuthorsAction
                  authors={authors}
                  addAuthors={setAuthors}
                  selectedAuthors={selectedAuthors}
                  addSelectedAuthors={setSelectedAuthors}
                />
              </div>
              <div className="my-2 flex flex-col px-4">
                <AddEditorsAction
                  editors={editorIds}
                  addEditors={setEditorIds}
                  selectedEditors={selectedEditors}
                  addSelectedEditors={setSelectedEditors}
                />
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormControl invalid={Boolean(errors.language)}>
                  <Controller
                    control={control}
                    name="language"
                    render={({ field }) => (
                      <>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Language</SelectLabel>
                              <SelectItem value="id_ID">Indonesia</SelectItem>
                              <SelectItem value="en_US">English</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors?.language && (
                          <FormErrorMessage>
                            {errors.language.message}
                          </FormErrorMessage>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Meta Title</FormLabel>
                <FormControl invalid={Boolean(errors.meta_title)}>
                  <Input
                    {...register("meta_title")}
                    placeholder="Enter Meta Title (Optional)"
                  />
                  {errors?.meta_title && (
                    <FormErrorMessage>
                      {errors.meta_title.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Meta Description</FormLabel>
                <FormControl invalid={Boolean(errors.meta_description)}>
                  <Textarea
                    {...register("meta_description")}
                    placeholder="Enter Meta Description (Optional)"
                  />
                  {errors?.meta_description && (
                    <FormErrorMessage>
                      {errors.meta_description.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
            </div>
          }
        >
          <div className="relative mt-4 flex items-center justify-center">
            <div className="flex-1 space-y-4">
              <FormControl invalid={Boolean(errors.title)}>
                <Input
                  type="text"
                  size="4xl"
                  variant="plain"
                  className="font-bold"
                  {...register("title", {
                    required: "Title is Required",
                  })}
                  placeholder="Title"
                />
                {errors?.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl invalid={Boolean(errors.content)}>
                <EditorMenu editor={editor} />
                <EditorContent editor={editor} />
                <p className="absolute bottom-0 right-0">
                  {editor?.storage.characterCount.words()} words
                </p>
              </FormControl>
            </div>
          </div>
        </ArticleDashboardLayout>
      </form>
    </>
  )
}
