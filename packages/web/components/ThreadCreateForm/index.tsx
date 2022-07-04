import { useLoadingScreen } from '@web/hooks/useLoadingScreen'
import { APIRouteRepository } from '@web/repository/apiRoute'
import { notify } from '@web/utils/notification'

import {
  MAX_TAGS_LENGTH,
  MAX_TITLE_LENGTH,
  TAG_GROUPS,
  TAG_ITEMS,
} from '@shared/constants/thread'

import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  form,
  onSubmit,
  canSubmit,
}) => (
  <form className={`${className}`} onSubmit={form.onSubmit(onSubmit)}>
    <TextInput
      required
      label="タイトル"
      placeholder="タイトルを入力してください"
      {...form.getInputProps('title')}
      onInput={form.validate}
    />
    <MultiSelect
      label="タグ"
      placeholder="タグを選択してください"
      searchable
      nothingFound="見つかりませんでした"
      maxSelectedValues={5}
      data={TAG_ITEMS.map((item) => ({
        ...item,
        value: item.slug,
        group:
          TAG_GROUPS.find((group) => group.slug === item.group)?.label ||
          'その他',
      }))}
      {...form.getInputProps('tags')}
    />
    <NumberInput
      required
      label="参加可能人数"
      max={20}
      min={2}
      {...form.getInputProps('capacity')}
    />
    <Group position="center" mt="md">
      <Button disabled={!canSubmit} type="submit">
        作成
      </Button>
    </Group>
  </form>
)

const Container = (props: ContainerProps) => {
  const form = useForm({
    initialValues: {
      title: '',
      tags: [],
      capacity: 7,
    },
    validate: {
      title: (value) => {
        if (value.length === 0) return 'タイトルを入力してください'
        if (value.length > MAX_TITLE_LENGTH) return 'タイトルが長すぎます'
        return null
      },
      tags: (value) => {
        if (value.length === 0) return 'タグを入力してください'
        if (value.length > MAX_TAGS_LENGTH) return 'タグは5つまでです'
        return null
      },
      capacity: (value) =>
        value <= 20 && 1 < value ? null : '2~20人の範囲で指定してください',
    },
  })

  const [canSubmit, setCanSubmit] = useState(true)
  const { enableLoading, disableLoading } = useLoadingScreen()
  const router = useRouter()

  //作成リクエストを送信する
  const onSubmit = (values: typeof form.values) => {
    setCanSubmit(false)
    enableLoading('作成中...')
    APIRouteRepository.createThread(values)
      .then(async ({ ID }) => {
        //スレッドページへ移動
        router.push(`/threads/${ID}/`).then(disableLoading)
      })
      .catch(() => {
        setCanSubmit(true)
        disableLoading()
        notify('onCreateThreadFailed')
      })
  }

  const presenterProps = {
    form,
    onSubmit,
    canSubmit,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadCreateForm(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}