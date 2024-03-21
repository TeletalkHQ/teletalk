module.exports = {
	"*": "prettier --write --list-different",
	"*.{js,jsx,ts,tsx,json}": "eslint --fix --no-ignore --max-warnings 0",
};
