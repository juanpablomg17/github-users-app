module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['standard-with-typescript', 'plugin:react/recommended'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    ignorePatterns: ['tailwind.config.js', 'postcss.config.js'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json']
    },
    plugins: ['react'],
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'no-tabs': 0,
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/no-absolute-path': 'off',
        'padded-blocks': ['error', 'always'],
        'react/prop-types': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
    }
}
