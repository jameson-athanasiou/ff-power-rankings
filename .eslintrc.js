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
    "rules": {
        "comma-dangle": ["error", "never"],
        "import/first": ["off"],
        "import/order": ["off"],
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
