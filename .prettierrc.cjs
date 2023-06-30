module.exports = {
	plugins: [require.resolve('prettier-plugin-astro'), require.resolve('prettier-plugin-tailwindcss')],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
	tabWidth: 4,
	printWidth: 110,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: 'consistent',
	trailingComma: 'all',
	bracketSpacing: true,
	arrowParens: 'always',
	bracketSameLine: false,
};
