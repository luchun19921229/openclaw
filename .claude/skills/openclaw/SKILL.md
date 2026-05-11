```markdown
# openclaw Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `openclaw` TypeScript codebase. You'll learn how to structure files, organize imports and exports, write commits, and create tests in a consistent and maintainable way. This guide is ideal for contributors aiming to align with the established practices of the repository.

## Coding Conventions

### File Naming
- Use **kebab-case** for all file names.
  - Example: `my-component.ts`, `user-service.test.ts`

### Import Style
- Use **relative imports** for referencing modules within the codebase.
  - Example:
    ```typescript
    import { fetchData } from './utils/fetch-data';
    ```

### Export Style
- Use **named exports** instead of default exports.
  - Example:
    ```typescript
    // In utils/fetch-data.ts
    export function fetchData() { ... }

    // In another file
    import { fetchData } from './utils/fetch-data';
    ```

### Commit Messages
- Follow the **Conventional Commits** standard.
- Use the `feat` prefix for new features.
  - Example: `feat: add user authentication`

## Workflows

### Feature Development
**Trigger:** When adding a new feature  
**Command:** `/feature-development`

1. Create a new TypeScript file using kebab-case.
2. Implement the feature using named exports.
3. Use relative imports for any dependencies.
4. Write a corresponding test file (`*.test.ts`).
5. Commit your changes using the conventional commit format:
   ```
   feat: short description of the feature
   ```
6. Open a pull request for review.

### Testing
**Trigger:** When verifying code functionality  
**Command:** `/run-tests`

1. Ensure all test files are named with the `.test.` pattern (e.g., `user-service.test.ts`).
2. Run the test suite using the project's test runner (framework unknown; refer to project documentation or package.json).
3. Address any failing tests before committing.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `math-utils.test.ts`
- The specific testing framework is not detected; check the project documentation or configuration files for details.
- Place test files alongside the modules they test or in a dedicated test directory, as per project structure.

## Commands
| Command               | Purpose                                           |
|-----------------------|---------------------------------------------------|
| /feature-development  | Guide for adding a new feature                    |
| /run-tests            | Steps to run and verify tests                     |
```
