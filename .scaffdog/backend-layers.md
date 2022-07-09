---
name: '[@backend] Core layers'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter core name.'
---

<!-- Entity -->

# `packages/backend/src/entity/{{ inputs.name | camel }}/{{ inputs.name | camel }}.model.ts`

```ts
export class {{ inputs.name | pascal }}Model {}

```

<!-- Repository -->

# `packages/backend/src/repository/{{ inputs.name | camel }}/{{ inputs.name | camel }}.service.ts`

```ts
import { Firebase } from '@backend/src/infrastructure/firebase/firebase.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class {{ inputs.name | pascal }}Repository {
  constructor(private firebase: Firebase) {}
}

```

# `packages/backend/src/repository/{{ inputs.name | camel }}/{{ inputs.name | camel }}.module.ts`

```ts
import { FirebaseModule } from '@backend/src/infrastructure/firebase/firebase.module'

import { Module } from '@nestjs/common'

import { {{ inputs.name | pascal }}Repository } from './{{ inputs.name | camel }}.service'

@Module({
  imports: [FirebaseModule],
  providers: [{{ inputs.name | pascal }}Repository],
  exports: [{{ inputs.name | pascal }}Repository],
})
export class {{ inputs.name | pascal }}RepositoryModule {}

```

<!-- Usecase -->

# `packages/backend/src/usecase/{{ inputs.name | camel }}/{{ inputs.name | camel }}.service.ts`

```ts
import { {{ inputs.name | pascal }}Repository } from '@backend/src/repository/{{ inputs.name | camel }}/{{ inputs.name | camel }}.service'

import { Injectable } from '@nestjs/common'

@Injectable()
export class {{ inputs.name | pascal }}Usecase {
  constructor(private {{ inputs.name | camel }}Repository: {{ inputs.name | pascal }}Repository) {}
}

```

# `packages/backend/src/usecase/{{ inputs.name | camel }}/{{ inputs.name | camel }}.module.ts`

```ts
import { {{ inputs.name | pascal }}RepositoryModule } from '@backend/src/repository/{{ inputs.name | camel }}/{{ inputs.name | camel }}.module'

import { Module } from '@nestjs/common'

import { {{ inputs.name | pascal }}Usecase } from './{{ inputs.name | camel }}.service'

@Module({
  imports: [{{ inputs.name | pascal }}RepositoryModule],
  providers: [{{ inputs.name | pascal }}Usecase],
  exports: [{{ inputs.name | pascal }}Usecase],
})
export class {{ inputs.name | pascal }}UsecaseModule {}

```

<!-- Controller -->

# `packages/backend/src/controller/{{ inputs.name | camel }}/{{ inputs.name | camel }}.controller.ts`

```ts
import { {{ inputs.name | pascal }}Model } from '@backend/src/entity/{{ inputs.name | camel }}/{{ inputs.name | camel }}.model'
import { {{ inputs.name | pascal }}Usecase } from '@backend/src/usecase/{{ inputs.name | camel }}/{{ inputs.name | camel }}.service'

import { Body, Controller, Get, Param, Post } from '@nestjs/common'

@Controller('{{ inputs.name | kebab }}s')
export class {{ inputs.name | pascal }}Controller {
  constructor(private {{ inputs.name | camel }}Usecase: {{ inputs.name | pascal }}Usecase) {}
}

```

# `packages/backend/src/controller/{{ inputs.name | camel }}/{{ inputs.name | camel }}.module.ts`

```ts
import { {{ inputs.name | pascal }}UsecaseModule } from '@backend/src/usecase/{{ inputs.name | camel }}/{{ inputs.name | camel }}.module'

import { Module } from '@nestjs/common'

import { {{ inputs.name | pascal }}Controller } from './{{ inputs.name | camel }}.controller'

@Module({
  imports: [{{ inputs.name | pascal }}UsecaseModule],
  controllers: [{{ inputs.name | pascal }}Controller]
})
export class {{ inputs.name | pascal }}Module {}

```
