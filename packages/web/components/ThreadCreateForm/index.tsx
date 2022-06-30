import { TAG_GROUPS, TAG_ITEMS } from '@shared/constants/thread'

import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  form,
  onSubmit,
}) => (
  <form className={`${className}`} onSubmit={form.onSubmit(onSubmit)}>
    <TextInput
      required
      label="タイトル"
      placeholder="タイトルを入力してください"
      {...form.getInputProps('title')}
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
      <Button type="submit">作成</Button>
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
      title: (value) => (value ? null : 'タイトルを入力してください'),
      tags: (value) => {
        if (value.length === 0) return 'タグを入力してください'
        if (value.length > 5) return 'タグは5つまでです'
        return null
      },
      capacity: (value) =>
        value <= 20 && 1 < value ? null : '2~20人の範囲で指定してください',
    },
  })

  //作成リクエストを送信する
  const onSubmit = (values: typeof form.values) =>
    fetch('/api/v1/thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

  const presenterProps = {
    form,
    onSubmit,
  }
  return { ...props, ...presenterProps }
}

export default function ThreadCreateForm(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
