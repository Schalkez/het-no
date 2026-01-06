import { createStartHandler, defaultRenderHandler } from '@tanstack/react-start/server'
import '@/lib/i18n'

const handler = createStartHandler(defaultRenderHandler)
export default handler
