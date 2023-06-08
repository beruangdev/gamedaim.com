"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { useGetSettingValue } from "@/lib/api/client/setting"
import { postSettingAction } from "@/lib/api/server/setting"
import { CheckSuccessResponse } from "@/lib/data-types"

interface FormValues {
  key: string
  value: string
}

export function SettingForm() {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [formStatus, setFormStatus] = React.useState<CheckSuccessResponse[]>([])

  const { settingValue: title } = useGetSettingValue("siteTitle")
  const { settingValue: tagline } = useGetSettingValue("siteTagline")
  const { settingValue: description } = useGetSettingValue("siteDescription")
  const { settingValue: metaTitle } = useGetSettingValue("siteMetaTitle")
  const { settingValue: metaDescription } = useGetSettingValue(
    "siteMetaDescription",
  )
  const { settingValue: domain } = useGetSettingValue("siteDomain")
  const { settingValue: email } = useGetSettingValue("email")
  const { settingValue: supportEmail } = useGetSettingValue("supportEmail")
  const { settingValue: facebook } = useGetSettingValue("facebookUsername")
  const { settingValue: twitter } = useGetSettingValue("twitterUsername")
  const { settingValue: instagram } = useGetSettingValue("instagramUsername")
  const { settingValue: pinterest } = useGetSettingValue("pinterestUsername")
  const { settingValue: youtube } = useGetSettingValue("youtubeChannel")

  const {
    register: registerTitle,
    formState: { errors: errorsTitle },
    handleSubmit: handleSubmitTitle,
    reset: resetTitle,
  } = useForm<FormValues>({
    defaultValues: {
      key: "siteTitle",
    },
  })

  const {
    register: registerTagline,
    formState: { errors: errorsTagline },
    handleSubmit: handleSubmitTagline,
    reset: resetTagline,
  } = useForm<FormValues>({
    defaultValues: {
      key: "siteTagline",
    },
  })

  const {
    register: registerDescription,
    formState: { errors: errorsDescription },
    handleSubmit: handleSubmitDescription,
    reset: resetDescription,
  } = useForm<FormValues>({
    defaultValues: {
      key: "siteDescription",
    },
  })

  const {
    register: registerMetaTitle,
    formState: { errors: errorsMetaTitle },
    handleSubmit: handleSubmitMetaTitle,
    reset: resetMetaTitle,
  } = useForm<FormValues>({
    defaultValues: {
      key: "metaTitle",
    },
  })

  const {
    register: registerMetaDescription,
    formState: { errors: errorsMetaDescription },
    handleSubmit: handleSubmitMetaDescription,
    reset: resetMetaDescription,
  } = useForm<FormValues>({
    defaultValues: {
      key: "siteMetaDescription",
    },
  })

  const {
    register: registerDomain,
    formState: { errors: errorsDomain },
    handleSubmit: handleSubmitDomain,
    reset: resetDomain,
  } = useForm<FormValues>({
    defaultValues: {
      key: "siteDomain",
    },
  })

  const {
    register: registerEmail,
    formState: { errors: errorsEmail },
    handleSubmit: handleSubmitEmail,
    reset: resetEmail,
  } = useForm<FormValues>({
    defaultValues: {
      key: "email",
    },
  })

  const {
    register: registerSupportEmail,
    formState: { errors: errorsSupportEmail },
    handleSubmit: handleSubmitSupportEmail,
    reset: resetSupportEmail,
  } = useForm<FormValues>({
    defaultValues: {
      key: "supportEmail",
    },
  })

  const {
    register: registerFacebook,
    formState: { errors: errorsFacebook },
    handleSubmit: handleSubmitFacebook,
    reset: resetFacebook,
  } = useForm<FormValues>({
    defaultValues: {
      key: "facebookUsername",
    },
  })

  const {
    register: registerTwitter,
    formState: { errors: errorsTwitter },
    handleSubmit: handleSubmitTwitter,
    reset: resetTwitter,
  } = useForm<FormValues>({
    defaultValues: {
      key: "twitterUsername",
    },
  })

  const {
    register: registerInstagram,
    formState: { errors: errorsInstagram },
    handleSubmit: handleSubmitInstagram,
    reset: resetInstagram,
  } = useForm<FormValues>({
    defaultValues: {
      key: "instagramUsername",
    },
  })

  const {
    register: registerPinterest,
    formState: { errors: errorsPinterest },
    handleSubmit: handleSubmitPinterest,
    reset: resetPinterest,
  } = useForm<FormValues>({
    defaultValues: {
      key: "pinterestUsername",
    },
  })

  const {
    register: registerYoutube,
    formState: { errors: errorsYoutube },
    handleSubmit: handleSubmitYoutube,
    reset: resetYoutube,
  } = useForm<FormValues>({
    defaultValues: {
      key: "youtubeChannel",
    },
  })

  React.useEffect(() => {
    resetTitle(title)
    resetTitle(tagline)
    resetDescription(description)
    resetMetaTitle(metaTitle)
    resetMetaDescription(metaDescription)
    resetDomain(domain)
    resetEmail(email)
    resetSupportEmail(supportEmail)
    resetTagline(supportEmail)
    resetFacebook(facebook)
    resetInstagram(instagram)
    resetPinterest(pinterest)
    resetTwitter(twitter)
    resetYoutube(youtube)
  }, [
    description,
    facebook,
    instagram,
    metaDescription,
    metaTitle,
    pinterest,
    tagline,
    title,
    twitter,
    domain,
    youtube,
    email,
    resetTitle,
    resetDescription,
    resetMetaTitle,
    resetMetaDescription,
    resetDomain,
    resetEmail,
    resetTagline,
    supportEmail,
    resetFacebook,
    resetInstagram,
    resetPinterest,
    resetTwitter,
    resetYoutube,
    resetSupportEmail,
  ])

  const onSubmitTitle = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetTitle(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "siteTitle",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitTagline = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetTagline(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "siteTagline",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitDescription = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetDescription(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "siteDescription",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitMetaTitle = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetMetaTitle(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "siteMetaTitle",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitMetaDescription = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetMetaDescription(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "siteMetaDescription",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitDomain = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetDomain(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "siteDomain",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitEmail = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetEmail(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "email",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitSupportEmail = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetEmail(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "supportEmail",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitFacebook = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetFacebook(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "facebookUsername",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitInstagram = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetInstagram(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "instagramUsername",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitTwitter = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetTwitter(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "twitterUsername",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitPinterest = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetPinterest(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "pinterestUsername",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitYoutube = async (values: FormValues) => {
    const { data } = await postSettingAction(values)
    if (data) {
      resetYoutube(data)
      const checkSuccess = {
        success: true,
        message: "success",
        name: "youtubeChannel",
      }
      setFormStatus((prevStatus) => [...prevStatus, checkSuccess])
    }
  }

  const onSubmitAll = () => {
    setLoading(true)
    handleSubmitTitle(onSubmitTitle)()
    handleSubmitTagline(onSubmitTagline)()
    handleSubmitDescription(onSubmitDescription)()
    handleSubmitMetaTitle(onSubmitMetaTitle)()
    handleSubmitMetaDescription(onSubmitMetaDescription)()
    handleSubmitDomain(onSubmitDomain)()
    handleSubmitEmail(onSubmitEmail)()
    handleSubmitSupportEmail(onSubmitSupportEmail)()
    handleSubmitFacebook(onSubmitFacebook)()
    handleSubmitTwitter(onSubmitTwitter)()
    handleSubmitInstagram(onSubmitInstagram)()
    handleSubmitPinterest(onSubmitPinterest)()
    handleSubmitYoutube(onSubmitYoutube)()
    setFormStatus([])
    setLoading(false)
  }

  React.useEffect(() => {
    if (
      formStatus.length === 12 &&
      formStatus.every((successStatus) => successStatus.success === true)
    ) {
      toast({
        variant: "success",
        description: "Settings submitted successfully!",
      })
      setFormStatus([])
      setLoading(false)
    }
  }, [formStatus])

  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsTitle.value)}>
            <FormLabel>
              Site Title
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerTitle("value", {
                required: "Title is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Title"
            />
            {errorsTitle?.value && (
              <FormErrorMessage>{errorsTitle.value.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsTagline.value)}>
            <FormLabel>
              Site Tagline
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerTagline("value", {
                required: "Tagline is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Tagline Username"
            />
            {errorsTagline?.value && (
              <FormErrorMessage>{errorsTagline.value.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsDescription.value)}>
            <FormLabel>
              Site Description
              <RequiredIndicator />
            </FormLabel>
            <Textarea
              {...registerDescription("value", {
                required: "Description is Required",
              })}
              className="max-w-xl"
              placeholder="Description"
            />
            {errorsDescription?.value && (
              <FormErrorMessage>
                {errorsDescription.value.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsMetaTitle.value)}>
            <FormLabel>
              Site Meta Title
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerMetaTitle("value", {
                required: "Meta Title is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Meta Title"
            />
            {errorsMetaTitle?.value && (
              <FormErrorMessage>
                {errorsMetaTitle.value.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsMetaDescription.value)}>
            <FormLabel>
              Site Meta Description
              <RequiredIndicator />
            </FormLabel>
            <Textarea
              {...registerMetaDescription("value", {
                required: "Meta Description is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Meta Description"
            />
            {errorsMetaDescription?.value && (
              <FormErrorMessage>
                {errorsMetaDescription.value.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsDomain.value)}>
            <FormLabel>
              Domain
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerDomain("value", {
                required: "Domain is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Domain"
            />
            {errorsDomain?.value && (
              <FormErrorMessage>{errorsDomain.value.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsEmail.value)}>
            <FormLabel>
              Email
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerEmail("value", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email tidak valid",
                },
              })}
              className="max-w-xl"
              placeholder="Enter Email"
            />
            {errorsEmail?.value && (
              <FormErrorMessage>{errorsEmail.value.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsSupportEmail.value)}>
            <FormLabel>
              Support Email
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerSupportEmail("value", {
                required: "Support Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Support Email is not valid",
                },
              })}
              className="max-w-xl"
              placeholder="Enter Support Email"
            />
            {errorsSupportEmail?.value && (
              <FormErrorMessage>
                {errorsSupportEmail.value.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsFacebook.value)}>
            <FormLabel>
              Facebook Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerFacebook("value", {
                required: "Facebook username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Facebook Username"
            />
            {errorsFacebook?.value && (
              <FormErrorMessage>
                {errorsFacebook.value.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsTwitter.value)}>
            <FormLabel>
              Twitter Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerTwitter("value", {
                required: "Twitter username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Twitter Username"
            />
            {errorsTwitter?.value && (
              <FormErrorMessage>{errorsTwitter.value.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsInstagram.value)}>
            <FormLabel>
              Instagram Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerInstagram("value", {
                required: "Instagram username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Instagram Username"
            />
            {errorsInstagram?.value && (
              <FormErrorMessage>
                {errorsInstagram.value.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsPinterest.value)}>
            <FormLabel>
              Pinterest Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerPinterest("value", {
                required: "Pinterest username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Pinterest Username"
            />
            {errorsPinterest?.value && (
              <FormErrorMessage>
                {errorsPinterest.value.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errorsYoutube.value)}>
            <FormLabel>
              Youtube Channel
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...registerYoutube("value", {
                required: "Youtube channel is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Youtube Channel"
            />
            {errorsYoutube?.value && (
              <FormErrorMessage>{errorsYoutube.value.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <Button aria-label="Submit" onClick={onSubmitAll} loading={loading}>
          Submit
        </Button>
      </div>
    </div>
  )
}
