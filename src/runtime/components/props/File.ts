import {
  color,
  placeholder,
  title,
  text,
  size,
  error,
  required,
} from './common'

export default {
  ...error,
  ...color(),
  ...placeholder('choose file'),
  ...title('file'),
  ...text('No file has been selected'),
  ...size(),
  ...required(),
}
