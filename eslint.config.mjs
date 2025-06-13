import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  vue: true,
  tailwindcss: true,
  weapp: true,
  rules: {
    'vue/no-v-html': 'off',
    // 允许使用 console.log
    'no-console': [{ allow: ['log', 'error'] }],
    // 允许使用 async/await
    'require-await': 'off',
    // 允许使用type定义
    '@typescript-eslint/consistent-type-definitions': { allow: ['log', 'error'] },
  },
})
