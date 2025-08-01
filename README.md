# Rewards Redemption
Please make sure to read the [Assumptions](#assumptions) and [Technical Decisions](#technical-decisions) sections before analyzing the code.


### Prerequisites
- **Ruby** `3.4.3`
- **Bundler** (`gem install bundler`)
- **Yarn**

### Setup
```bash
bundle install
yarn install
bin/rails db:setup
```

### Starting the application
```bash
bin/dev
```
This will run both the Rails server (port 3000) and the Vite server (frontend)

Visit the app: `localhost:3000`

### Running tests
#### Backend and E2E specs
I'm using RSpec for backend specs. And for end-to-end specs I'm using Capybara. Running the following command will run
all the backend and E2E specs.
```bash
bundle exec rspec
```

#### Frontend (jest)
For component tests, I'm using `@testing-library/react`. The command below will run all frontend tests.
```bash
yarn jest
```

### Running code checker
```bash
rubocop
rubocop --auto-gen-config
```

### Technical Decisions
#### Why Vite?
[Vite](https://vitejs.dev/) was chosen as the frontend build tool for its blazing-fast hot module replacement,
modern ES module support, and great integration with React and Rails via `vite-plugin-ruby`.
It significantly improves developer experience over Webpacker and other traditional Rails asset pipelines.

#### Why TanStack Query (React Query)?
[@tanstack/react-query](https://tanstack.com/query/latest) is used to manage API state and server-side caching in a
clean, declarative way. It provides:
- Automatic caching and background refreshing of data.
- Built-in loading and error handling states.
- Mutations with optimistic updates and side effect tracking.
- A clean abstraction away from `useEffect` + `useState` data fetching logic.

This keeps components lean and focused on UI, not data fetching logic.

#### Why Bootstrap?
[Bootstrap 5](https://getbootstrap.com/) was chosen for:
- Rapid prototyping and mobile responsiveness.
- A familiar utility-first CSS system for layout and spacing.
- A professional look without investing time in custom styling.

It allowed the project to remain visually clean and usable, without requiring a heavy frontend design phase.
