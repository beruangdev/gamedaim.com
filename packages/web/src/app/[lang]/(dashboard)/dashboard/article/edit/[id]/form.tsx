"use client"

import * as React from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import { EditorContent, useEditor } from "@tiptap/react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

import { ArticleDashboardLayout } from "@/components/Layout/ArticleDashboardLayout"
import {
  AddAuthorsAction,
  AddEditorsAction,
  AddTopicsAction,
} from "@/components/Action"
import { EditorKitExtension, EditorMenu } from "@/components/Editor"
import { ModalSelectMedia } from "@/components/Modal"
import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { ScrollArea } from "@/components/UI/ScrollArea"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { useDisclosure } from "@/hooks/use-disclosure"
import { getArticleByIdAction, putArticle } from "@/lib/api/server/article"
import {
  LanguageTypeData,
  TopicDataProps,
  UserDataProps,
} from "@/lib/data-types"

interface FormValues {
  title: string
  content: string
  excerpt?: string
  slug: string
  language: string
  metaTitle?: string
  metaDescription?: string
}
export const EditArticleForm = (props: {
  lang: LanguageTypeData
  articleId: string
}) => {
  const { lang, articleId } = props

  const router = useRouter()

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
  const [article, setArticle] = React.useState<FormValues & { id: string }>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    language: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
  })
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

  const loadArticle = async () => {
    const { data } = await getArticleByIdAction(articleId as string)
    if (data) {
      setArticle({
        id: data?.id,
        title: data?.title,
        slug: data?.slug,
        content: data?.content,
        excerpt: data?.excerpt,
        metaTitle: data?.metaTitle,
        metaDescription: data?.metaDescription,
        language: data?.language,
      })
      setSelectedTopics(data?.topics)
      setSelectedFeaturedImageId(data?.featuredImage.id as string)
      setSelectedFeaturedImageUrl(data?.featuredImage.url as string)
      setEditorContent(data?.content as string)
      setAuthors(data?.authors.map((author: UserDataProps) => author.id))
      setSelectedAuthors(
        data?.authors.map((author: UserDataProps) => {
          return { id: author.id, name: author.name }
        }),
      )
      setEditorIds(data?.editors.map((editor: UserDataProps) => editor.id))
      setSelectedEditors(
        data?.editors.map((editor: UserDataProps) => {
          return { id: editor.id, name: editor.name }
        }),
      )
      setTopics(data?.topics.map((topic: TopicDataProps) => topic.id))
      editor?.commands.setContent(data?.content as string)
    }
  }

  React.useEffect(() => {
    reset(article)
  }, [article, reset])

  React.useEffect(() => {
    loadArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

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
    const { data } = await putArticle(article.id, mergedValues)
    if (data) {
      toast({
        variant: "success",
        description: "Article successfully created ",
      })
      router.push("/dashboard/article")
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
        <div className="bg-background sticky top-[0px] z-[90] flex items-center justify-between px-3 py-5">
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
            <div className="fixed bottom-0 right-0 top-0 mt-[85px]">
              <ScrollArea className="h-[calc(100vh-80px)] max-w-[300px] rounded border py-4 max-md:min-w-full">
                <div className="bg-background flex flex-col px-4 py-2">
                  <div className="my-2 px-4">
                    <AddTopicsAction
                      lang={lang}
                      topics={topics}
                      addTopics={setTopics}
                      selectedTopics={selectedTopics}
                      addSelectedTopics={setSelectedTopics}
                      topicType={"ARTICLE"}
                    />
                  </div>
                  <div className="my-2 px-4">
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
                                  className="border-muted/30 !relative mt-2 aspect-video h-[120px] cursor-pointer rounded-sm border-2 object-cover"
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
                              <div className="bg-muted text-success relative m-auto flex aspect-video h-[120px] items-center justify-center">
                                <p>Select Featured Image</p>
                              </div>
                            </>
                          }
                        />
                      </>
                    )}
                  </div>
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
                                  <SelectItem value="id">Indonesia</SelectItem>
                                  <SelectItem value="en">English</SelectItem>
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
                    <FormControl invalid={Boolean(errors.metaTitle)}>
                      <Input
                        {...register("metaTitle")}
                        placeholder="Enter Meta Title (Optional)"
                      />
                      {errors?.metaTitle && (
                        <FormErrorMessage>
                          {errors.metaTitle.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </div>
                  <div className="my-2 flex flex-col px-4">
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl invalid={Boolean(errors.metaDescription)}>
                      <Textarea
                        {...register("metaDescription")}
                        placeholder="Enter Meta Description (Optional)"
                      />
                      {errors?.metaDescription && (
                        <FormErrorMessage>
                          {errors.metaDescription.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </div>
                </div>
              </ScrollArea>
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
