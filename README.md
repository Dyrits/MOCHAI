# MOCHAI

## About The Project

A back-end project for freeCodeCamp's "Quality Assurance" certification, per the repository description: an Express application used for the Quality Assurance and Testing with Chai lessons, with automated tests written with Mocha and Chai.

### Built With

- Node.js
- Express
- Mocha and Chai

## Getting Started

### Prerequisites

- Node.js 26 LTS and npm

### Installation

```sh
npm ci
```

### Running

```sh
npm start
```

### Validation and remaining work

```sh
npm run test:unit
npm run test:smoke
```

The 18 completed unit lessons pass. The original functional lessons are unfinished: four HTTP exercises deliberately call `assert.fail`, two browser exercises call `assert.fail`, and one references an undefined `browser`. They are retained as exercises, not rewritten to manufacture a green certification report. Starting the app therefore reports 18 passed and 7 failed tests. The smoke check verifies that known report plus the real HTTP endpoints; it is not a claim that the unfinished lessons pass.

Mocha 12 uses scoped patched discovery dependencies. Node's built-in watch replaces nodemon. The obsolete Zombie 6 browser lesson dependency is still present to preserve the exercise. Its request/tough-cookie/uuid dependency chain still has three moderate advisories in the current audit. Do not use this tutorial as a production service or treat it as security-clear.

## License

MIT is declared in package.json; no license file is present in this repository.

## Contact

Dyrits - https://github.com/Dyrits
