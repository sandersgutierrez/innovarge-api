'use strict'

import process from 'node:process'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { load } from 'js-yaml'
import { name } from './environment.js'

const fileConfig = readFileSync(join(process.cwd(), '/src/config/config.yml'))
const loadConfig = load(fileConfig, { encode: 'utf-8' })

export const Config = () => loadConfig[name] || {}
