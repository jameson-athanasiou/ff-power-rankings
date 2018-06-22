module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    "globals": {
        "google": true
    },
    "settings": {
        "import/resolver": {
            "babel-module": {},
            "extensions": [
                ".js",
                ".json"
            ]
        }
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "jsx": true,
        "ecmaVersion": "2018"
    },
    "rules": {
        "class-methods-use-this": ["off"],
        "comma-dangle": ["error", "never"],
        "import/first": ["off"],
        "import/order": ["off"],
        "import/prefer-default-export": ["off"],
        "indent": ["error", 4],
        "jsx-a11y/label-has-for": [ "error", {
            "components": [ "Label" ],
            "required": {
                "every": [ "id" ]
            },
            "allowChildren": false
        }],
        "linebreak-style": ["off"],
        "max-len": ["error", 200],
        "no-console": ["off"],
        "no-plusplus": ["off"],
        "no-unused-vars": "error",
        "react/forbid-prop-types": ["off"],
        "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/no-array-index-key": ["off"],
        "react/require-default-props": ["off"],
        "react/sort-comp": ["off"]
    }
};
