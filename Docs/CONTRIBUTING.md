## Contributing

### Workflow

All contributions follow this flow — no exceptions:

```
main → your branch → commits → PR → review → merge → delete branch
```

**Step by step:**

**1. Always branch off from `main`**

Make sure your local `main` is up to date before creating a new branch:

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

**2. Make your changes and commit**

Commits must follow the pattern `<type>: <subject>`:

```bash
git add .
git commit -m "feat: add pinterest share button"
```

**3. Push your branch**

```bash
git push origin feature/your-feature-name
```

**4. Open a Pull Request**

- Go to the repository on GitHub
- Open a PR from your branch targeting `main`
- Fill in the PR title and description explaining what changed and why
- Request at least one reviewer before marking it as ready

**5. Wait for review**

- Do not merge your own PR
- Address all comments left by reviewers
- Push new commits to the same branch to update the PR — do not open a new one

**6. Merge and delete the branch**

Once the PR is approved:

- Merge it into `main` using **Squash and Merge** to keep the history clean
- Delete the remote branch immediately after merging — GitHub shows a "Delete branch" button right after the merge
- (OPTIONAL) Delete your local branch too:

```bash
git checkout main
git pull origin main
git branch -d feature/your-feature-name
```

---

### Branch Naming

Branches must always start with one of the following prefixes:

| Prefix      | When to use                              |
| ----------- | ---------------------------------------- |
| `feature/`  | Adding a new feature                     |
| `bugfix/`   | Fixing a bug                             |
| `hotfix/`   | Urgent fix for a production issue        |
| `chore/`    | Maintenance, dependencies, configuration |
| `doc/`      | Documentation changes only               |

**Examples:**

```
feature/add-pinterest-button
bugfix/fix-whatsapp-url-encoding
hotfix/broken-facebook-share-link
chore/update-dependencies
doc/add-readme-examples
```

> Commits will be blocked on any branch that does not follow this convention.

---

### Commit Messages

Commits must follow the pattern `<type>: <subject>` in lowercase:

| Type      | When to use                              |
| --------- | ---------------------------------------- |
| `feat`    | A new feature                            |
| `bugfix`  | A bug fix                                |
| `hotfix`  | An urgent production fix                 |
| `chore`   | Maintenance, dependencies, configuration |
| `doc`     | Documentation changes                    |

**Examples:**

```
feat: add pinterest share button
bugfix: fix whatsapp url encoding
hotfix: correct broken facebook share link
chore: update dependencies
doc: add usage examples to readme
```

> Commits with an invalid message format will be rejected automatically by the commit hook.

---