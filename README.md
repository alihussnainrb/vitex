# Getting Started

## How to use

Create new repositry from above use this template button or [click here](https://github.com/new?template_name=vitex&template_owner=alihussnainrb) to create new repo.

##### OR

Clone repo using git

```bash
git clone 'https://github.com/alihussnainrb/vitex.git'
```

##### If you don't have git installed

You can checkout [degit](https://github.com/Rich-Harris/degit)

## Creating new page

node vitex.mjs create [Page Name]

```js
node vitex.mjs create hello
```

## Creating dynamic page

Creating dynamic pages are same as above but page name starts with $ i.e /posts/postId will be posts/$id.
node vite.mjs create [$Page Name]. Make sure to wrap page name inside quotes i.e 'posts/$id'

```js
node vitex.mjs create 'posts/$id'
```
